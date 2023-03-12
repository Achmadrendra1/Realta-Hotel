SELECT setval(
		'resto."order_menu_detail_omde_id_seq"',
		(
			SELECT MAX(omde_id)
			FROM resto.order_menu_detail
		)
	);
SELECT setval(
		'resto."order_menus_orme_id_seq"',
		(
			SELECT MAX(orme_id)
			FROM resto.order_menus
		)
	);
SELECT setval(
		'resto."resto_menu_photos_remp_id_seq"',
		(
			SELECT MAX(remp_id)
			FROM resto.resto_menu_photos
		)
	);
SELECT setval(
		'resto."resto_menus_reme_id_seq"',
		(
			SELECT MAX(reme_id)
			FROM resto.resto_menus
		)
	);


-- // menampilkan menu makanan di dashboard
------------------------------------------- 1 --------------------------------------------
CREATE OR REPLACE FUNCTION resto.restomenu_dashboard(search_menu text, currentpage int )
	RETURNS TABLE (
		reme_id INT, hotel_name TEXT, faci_id INT, faci_name TEXT,
		reme_name TEXT, reme_description TEXT, reme_price MONEY, 
		reme_status TEXT, reme_modified_date DATE, 
		remp_id INT, remp_primary BIT, remp_url TEXT
	)
	AS
	$$
	
	DECLARE
		jumlah_row INT := 10;
		skip_row INT := (currentpage - 1) * jumlah_row;
		menu_dashboard CURSOR FOR (
			SELECT DISTINCT ON (resto.resto_menus.reme_id) resto.resto_menus.reme_id, hotel.hotels.hotel_name, hotel.facilities.faci_id, hotel.facilities.faci_name,
					resto.resto_menus.reme_name, resto.resto_menus.reme_description, resto.resto_menus.reme_price,
					resto.resto_menus.reme_status, resto.resto_menus.reme_modified_date,  
					resto.resto_menu_photos.remp_id, resto.resto_menu_photos.remp_primary, resto.resto_menu_photos.remp_url
			FROM resto.resto_menus
			LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
			LEFT JOIN hotel.facilities ON resto.resto_menus.reme_faci_id = hotel.facilities.faci_id
			LEFT JOIN hotel.hotels ON hotel.facilities.faci_hotel_id = hotel.hotels.hotel_id
-- 			WHERE 	resto_menu_photos.remp_primary = B'1'
			WHERE 	(
					LOWER(resto.resto_menus.reme_name) LIKE CONCAT('%',search_menu,'%') OR
					LOWER(resto.resto_menus.reme_description) LIKE CONCAT('%',search_menu,'%') OR
					LOWER(resto.resto_menus.reme_status) LIKE CONCAT('%',search_menu,'%') OR
					LOWER(hotel.hotels.hotel_name) LIKE CONCAT('%',search_menu,'%') OR
					LOWER(hotel.facilities.faci_name) LIKE CONCAT('%',search_menu,'%')
					
					)
			ORDER BY resto.resto_menus.reme_id
			LIMIT jumlah_row
			OFFSET skip_row 
		);
	
	BEGIN
		OPEN menu_dashboard;
			LOOP FETCH NEXT FROM menu_dashboard
				INTO 	reme_id, hotel_name, faci_id, faci_name,
						reme_name, reme_description, reme_price, 
						reme_status, reme_modified_date, 
						remp_id, remp_primary, remp_url;
				EXIT WHEN NOT FOUND;
				RETURN NEXT;
			END LOOP;
		CLOSE menu_dashboard;
	
	END;
	$$
	LANGUAGE PLPGSQl
 

------------------------------------------- 1 --------------------------------------------


------------------------------------------- 2 --------------------------------------------
CREATE OR REPLACE FUNCTION resto.count_menu_dashboard(search_menu varchar(50))
	RETURNS INT
	AS
	$$
	
	DECLARE
		counts int;
	
	BEGIN
		select count(*) 
		from resto.resto_menus 
		where 	LOWER(resto.resto_menus.reme_name) LIKE CONCAT('%',search_menu,'%') OR
				LOWER(resto.resto_menus.reme_description) LIKE CONCAT('%',search_menu,'%') OR
				LOWER(resto.resto_menus.reme_status) LIKE CONCAT('%',search_menu,'%')
		
		INTO counts;
		
		return counts;
	END;
	$$
	LANGUAGE PLPGSQL

------------------------------------------- 2 --------------------------------------------


------------------------------------------- 3--------------------------------------------
-- insert data order dari user
CREATE OR REPLACE FUNCTION resto.orders(
		ormeOrderNumber text,
		ormeDate date,
		ormeTotalItem int,
		ormeTotalDiscount int,
		ormeTotalAmount int,
		orme_pay_type varchar(2),
		ormeIsPaid text,
		ormeUserId int
	) 
	RETURNS int 
	AS 
	$$
	DECLARE 
		id_orme int;
		
	BEGIN
		INSERT INTO resto.order_menus(
				orme_order_number,
				orme_order_date,
				orme_total_item,
				orme_total_discount,
				orme_total_amount,
				orme_pay_type,
				orme_is_paid,
				orme_modified_date,
				orme_user_id
			)
		VALUES (
				ormeOrderNumber,
				ormeDate,
				ormeTotalItem,
				ormeTotalDiscount,
				ormeTotalAmount,
				orme_pay_type,
				ormeIsPaid,
				ormeDate,
				ormeUserId
			)
		RETURNING resto.order_menus.orme_id INTO id_orme;
	RETURN id_orme;
END;
$$ 
LANGUAGE PLPGSQL;

------------------------------------------- 3--------------------------------------------

------------------------------------------- 4--------------------------------------------
-- CREATE VIEW resto.resto_detail AS
-- SELECT hotel.hotels.hotel_id,
-- 	hotel.hotels.hotel_name,
-- 	hotel.facilities.faci_id,
-- 	hotel.facilities.faci_name,
-- 	hotel.facilities.faci_description,
-- 	hotel.facility_photo.fapho_thumbnail_filename,
-- 	hotel.facility_photo.fapho_primary,
-- 	hotel.facility_photo.fapho_url
-- FROM hotel.facilities
-- 	LEFT JOIN hotel.hotels ON hotel.facilities.faci_hotel_id = hotel.hotels.hotel_id
-- 	LEFT JOIN hotel.facility_photo ON hotel.facility_photo.fapho_faci_id = hotel.facilities.faci_id
-- WHERE hotel.facilities.faci_cagro_id = 2;

------------------------------------------- 4--------------------------------------------


------------------------------------------- 5--------------------------------------------
drop function resto.listMenuUser
CREATE OR REPLACE FUNCTION resto.listMenuUser(faciid int, search_menu varchar(50), currentpage int, sort varchar(10)) 
	RETURNS TABLE (
		remeId int,
		remeName text,
		remeDescription text,
		remePrice money,
		-- remeDiscount money,
		-- remeDiscount money,
		remeStatus text,
		rempThumbnailFilename text,
		rempPhotoFilename text,
		rempPrimary bit,
		rempUrl text,
		remeFaciId int
	) 
	AS 
	$$
DECLARE 
	jumlah_row INT := 9;
	skip_row INT := (currentpage - 1) * jumlah_row;
	dataMenu CURSOR FOR (
		SELECT resto.resto_menus.reme_id,
			resto.resto_menus.reme_name,
			resto.resto_menus.reme_description,
			resto.resto_menus.reme_price,
			-- resto.resto_menus.reme_discount,
			-- resto.resto_menus.reme_discount,
			resto.resto_menus.reme_status,
			resto.resto_menu_photos.remp_thumbnail_filename,
			resto.resto_menu_photos.remp_photo_filename,
			resto.resto_menu_photos.remp_primary,
			resto.resto_menu_photos.remp_url,
			resto.resto_menus.reme_faci_id
		FROM resto.resto_menus
			LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
		WHERE 	resto.resto_menus.reme_status = 'AVAILABLE'
				AND resto.resto_menus.reme_faci_id = faciid 
				AND resto.resto_menu_photos.remp_primary = B'1' 
				AND 
				(
					LOWER(resto.resto_menus.reme_name) LIKE CONCAT('%',search_menu,'%') OR
					LOWER(resto.resto_menus.reme_description) LIKE CONCAT('%',search_menu,'%') OR
					LOWER(resto.resto_menus.reme_status) LIKE CONCAT('%',search_menu,'%')
				)
		ORDER BY 
			CASE WHEN sort = 'DESC' THEN  resto.resto_menus.reme_price END DESC, 
			CASE WHEN sort = 'ASC' THEN  resto.resto_menus.reme_price END ASC,
			CASE WHEN sort = '' THEN  resto.resto_menus.reme_price END ASC
-- 		ORDER BY resto.resto_menus.reme_price || ' ' || CASE WHEN sort = 'DESC' THEN 'DESC' ELSE 'ASC' END
		LIMIT jumlah_row
		OFFSET skip_row
	);
BEGIN 
	OPEN dataMenu;
		LOOP FETCH NEXT FROM dataMenu 
			INTO remeId,
				remeName,
				remeDescription,
				remePrice,
				-- -- remeDiscount,
				remeStatus,
				rempThumbnailFilename,
				rempPhotoFilename,
				rempPrimary,
				rempUrl,
				remeFaciId;
			EXIT WHEN NOT FOUND;
			RETURN NEXT;
		END LOOP;
	CLOSE dataMenu;
END;
$$ 
LANGUAGE PLPGSQL;

------------------------------------------- 5--------------------------------------------


------------------------------------------- 6--------------------------------------------

CREATE OR REPLACE FUNCTION resto.ordermenuscomplete(orderNumber text) 
	RETURNS TABLE (
		orme_id int, orme_order_number varchar(20), orme_order_date date, orme_total_item INT, orme_total_discount MONEY,orme_total_amount MONEY,
		orme_pay_type varchar(2), orme_cardnumber text, orme_is_paid varchar(2), orme_modified_date date, orme_user_id int, omde_id int,
		orme_price money, orme_qty int, orme_subtotal money, omde_orme_id int, omde_reme_id int,
		reme_name text, trx_number text, payment_type text
	) 
	AS 
	$$
	
	DECLARE 
		dataordermenus CURSOR FOR (
			SELECT resto.order_menus.orme_id, resto.order_menus.orme_order_number,resto.order_menus.orme_order_date, resto.order_menus.orme_total_item,
				resto.order_menus.orme_total_discount, resto.order_menus.orme_total_amount, resto.order_menus.orme_pay_type,
				resto.order_menus.orme_cardnumber, resto.order_menus.orme_is_paid,resto.order_menus.orme_modified_date,resto.order_menus.orme_user_id,
				resto.order_menu_detail.omde_id,resto.order_menu_detail.orme_price,resto.order_menu_detail.orme_qty,resto.order_menu_detail.orme_subtotal,
				resto.order_menu_detail.omde_orme_id,resto.order_menu_detail.omde_reme_id,resto.resto_menus.reme_name,(
				select "transactionNumber"
				from payment.user_transactions
				where "orderNumber" = resto.order_menus.orme_order_number
			) "trx_number",
			(
				select "sourcePaymentName"
				from payment.user_transactions
				where "orderNumber" = resto.order_menus.orme_order_number
			) "payment_Type"
			FROM resto.order_menus
				RIGHT JOIN resto.order_menu_detail ON resto.order_menus.orme_id = resto.order_menu_detail.omde_orme_id
				JOIN resto.resto_menus ON resto.resto_menus.reme_id = resto.order_menu_detail.omde_reme_id
			WHERE resto.order_menus.orme_order_number = orderNumber
-- 			AND order_menus.orme_user_id = user_id
		);
BEGIN 
	OPEN dataordermenus;
		LOOP FETCH NEXT FROM dataordermenus 
			INTO orme_id,orme_order_number,orme_order_date,orme_total_item,orme_total_discount,
				orme_total_amount,orme_pay_type,orme_cardnumber,orme_is_paid,orme_modified_date,orme_user_id,
				omde_id,orme_price,orme_qty,orme_subtotal,omde_orme_id,omde_reme_id,reme_name, trx_number, payment_type;
		EXIT WHEN NOT FOUND;
		RETURN NEXT;
		END LOOP;
	CLOSE dataordermenus;
	END;
	
$$ 
LANGUAGE PLPGSQL;




------------------------------------------- 6--------------------------------------------



------------------------------------------- 7 --------------------------------------------
-- CREATE OR REPLACE FUNCTION resto.listMenuUser(faciid int, search_menu varchar(50), currentpage int, sort varchar(10)) 
-- 	RETURNS TABLE (
-- 		remeId int,
-- 		remeName text,
-- 		remeDescription text,
-- 		remePrice money,
-- 		-- -- remeDiscount money,
-- 		remeStatus text,
-- 		rempThumbnailFilename text,
-- 		rempPhotoFilename text,
-- 		rempPrimary bit,
-- 		rempUrl text,
-- 		remeFaciId int
-- 	) 
-- 	AS 
-- 	$$
-- DECLARE 
-- 	jumlah_row INT := 9;
-- 	skip_row INT := (currentpage - 1) * jumlah_row;
-- 	dataMenu CURSOR FOR (
-- 		SELECT resto.resto_menus.reme_id,
-- 			resto.resto_menus.reme_name,
-- 			resto.resto_menus.reme_description,
-- 			resto.resto_menus.reme_price,
-- 			-- resto.resto_menus.reme_discount,
-- 			resto.resto_menus.reme_status,
-- 			resto.resto_menu_photos.remp_thumbnail_filename,
-- 			resto.resto_menu_photos.remp_photo_filename,
-- 			resto.resto_menu_photos.remp_primary,
-- 			resto.resto_menu_photos.remp_url,
-- 			resto.resto_menus.reme_faci_id
-- 		FROM resto.resto_menus
-- 			LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
-- 		WHERE 	resto.resto_menus.reme_status = 'AVAILABLE'
-- 				AND resto.resto_menus.reme_faci_id = faciid 
-- 				AND resto.resto_menu_photos.remp_primary = B'1' 
-- 				AND 
-- 				(
-- 					LOWER(resto.resto_menus.reme_name) LIKE CONCAT('%',search_menu,'%') OR
-- 					LOWER(resto.resto_menus.reme_description) LIKE CONCAT('%',search_menu,'%') OR
-- 					LOWER(resto.resto_menus.reme_status) LIKE CONCAT('%',search_menu,'%')
-- 				)
-- 		ORDER BY 
-- 			CASE WHEN sort = 'DESC' THEN  resto.resto_menus.reme_price END DESC, 
-- 			CASE WHEN sort = 'ASC' THEN  resto.resto_menus.reme_price END ASC,
-- 			CASE WHEN sort = '' THEN  resto.resto_menus.reme_price END ASC
-- -- 		ORDER BY resto.resto_menus.reme_price || ' ' || CASE WHEN sort = 'DESC' THEN 'DESC' ELSE 'ASC' END
-- 		LIMIT jumlah_row
-- 		OFFSET skip_row
-- 	);
-- BEGIN 
-- 	OPEN dataMenu;
-- 		LOOP FETCH NEXT FROM dataMenu 
-- 			INTO remeId,
-- 				remeName,
-- 				remeDescription,
-- 				remePrice,
-- 				-- remeDiscount,
-- 				remeStatus,
-- 				rempThumbnailFilename,
-- 				rempPhotoFilename,
-- 				rempPrimary,
-- 				rempUrl,
-- 				remeFaciId;
-- 			EXIT WHEN NOT FOUND;
-- 			RETURN NEXT;
-- 		END LOOP;
-- 	CLOSE dataMenu;
-- END;
-- $$ 
-- LANGUAGE PLPGSQL;


------------------------------------------- 7 --------------------------------------------



------------------------------------------- 8 --------------------------------------------

CREATE OR REPLACE FUNCTION resto.listMenu(faciid int)
	RETURNS TABLE (
		remeId int, remeName text, remeDescription text, remePrice money, 
		-- remeDiscount money, 
		remeStatus text,
		rempThumbnailFilename text, 
		rempPhotoFilename text, rempPrimary bit, rempUrl text, remeFaciId int
	)
	AS
	$$
	
	DECLARE
		dataMenu CURSOR FOR (
			SELECT  DISTINCT ON (resto.resto_menus.reme_id) resto.resto_menus.reme_id, resto.resto_menus.reme_name, 
					resto.resto_menus.reme_description, resto.resto_menus.reme_price,
					-- resto.resto_menus.reme_discount, 
					resto.resto_menus.reme_status,
					resto.resto_menu_photos.remp_thumbnail_filename, resto.resto_menu_photos.remp_photo_filename,
					resto.resto_menu_photos.remp_primary, resto.resto_menu_photos.remp_url, resto.resto_menus.reme_faci_id
			FROM resto.resto_menus
			LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
			WHERE 	resto.resto_menus.reme_status = 'AVAILABLE'
					AND resto.resto_menus.reme_faci_id = faciid 
-- 					AND resto_menu_photos.remp_primary = B'1'
		);
	BEGIN
		OPEN dataMenu;
			LOOP 
				FETCH NEXT FROM dataMenu
					INTO 	remeId, remeName, remeDescription, remePrice, 
							-- remeDiscount, 
							remeStatus,
							rempThumbnailFilename, 
							rempPhotoFilename, rempPrimary, rempUrl, remeFaciId;
				EXIT WHEN NOT FOUND;
				
				RETURN NEXT;
			END LOOP;
		CLOSE dataMenu;
	END;
	$$
	LANGUAGE PLPGSQL;
	
------------------------------------------- 8 --------------------------------------------

	
------------------------------------------- 9 --------------------------------------------



CREATE OR REPLACE FUNCTION resto.count_menu(faci_id int, search_menu varchar(50))
	RETURNS INT
	AS
	$$
	
	DECLARE
		counts int;
	
	BEGIN
		select count(*) 
		FROM resto.resto_menus
			LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
		WHERE 	resto.resto_menus.reme_status = 'AVAILABLE'
				AND resto.resto_menus.reme_faci_id = faci_id 
				AND resto.resto_menu_photos.remp_primary = B'1' 

		INTO counts;
		
		return counts;
	END;
	
	$$
	LANGUAGE PLPGSQL


------------------------------------------- 9 --------------------------------------------



------------------------------------------- 10 ------------------------------------------

CREATE OR REPLACE FUNCTION resto.resto_detail(currentpage int )
	RETURNS TABLE (
		hotel_id INT,hotel_name TEXT,faci_id INT,faci_name TEXT,faci_description TEXT,
		fapho_thumbnail_filename TEXT,fapho_primary BOOLEAN,fapho_url TEXT
	)
	AS
	$$
	
	DECLARE
		jumlah_row INT := 10;
		skip_row INT := (currentpage - 1) * jumlah_row;
		resto CURSOR FOR (
			SELECT hotel.hotels.hotel_id,
				hotel.hotels.hotel_name,
				hotel.facilities.faci_id,
				hotel.facilities.faci_name,
				hotel.facilities.faci_description,
				hotel.facility_photo.fapho_thumbnail_filename,
				hotel.facility_photo.fapho_primary,
				hotel.facility_photo.fapho_url
			FROM hotel.facilities
				LEFT JOIN hotel.hotels ON hotel.facilities.faci_hotel_id = hotel.hotels.hotel_id
				LEFT JOIN hotel.facility_photo ON hotel.facility_photo.fapho_faci_id = hotel.facilities.faci_id
			WHERE hotel.facilities.faci_cagro_id = 2
			ORDER BY hotel.hotels.hotel_name ASC
			LIMIT jumlah_row
			OFFSET skip_row 
		);
	
	BEGIN
		OPEN resto;
			LOOP FETCH NEXT FROM resto
				INTO 	hotel_id,hotel_name,faci_id,faci_name,faci_description,
						fapho_thumbnail_filename,fapho_primary,fapho_url;
				EXIT WHEN NOT FOUND;
				RETURN NEXT;
			END LOOP;
		CLOSE resto;
	
	END;
	$$
	LANGUAGE PLPGSQl

------------------------------------------- 10 ------------------------------------------



------------------------------------------- 11 ------------------------------------------
CREATE OR REPLACE FUNCTION resto.count_resto()
	RETURNS INT
	AS
	$$
	
	DECLARE
		counts int;
	
	BEGIN
		SELECT COUNT(*)
			FROM hotel.facilities
			WHERE hotel.facilities.faci_cagro_id = 2
		
		INTO counts;
		
		return counts;
	END;
	$$
	LANGUAGE PLPGSQL
 


------------------------------------------- 11 ------------------------------------------


------------------------------------------- 12 ------------------------------------------
CREATE OR REPLACE FUNCTION resto.isPrimary(remeid INT)
 	RETURNS INT
	AS
	$$
	
	DECLARE
		counts int;
	BEGIN
		SELECT COUNT(*) FROM resto.resto_menu_photos
		WHERE resto.resto_menu_photos.remp_reme_id = remeid
		INTO counts;
		
		return counts;
	END;
	$$
	LANGUAGE PLPGSQL

------------------------------------------- 12 ------------------------------------------


------------------------------------------- 13 ------------------------------------------

CREATE OR REPLACE FUNCTION resto.getPhotoMenu(remeId int) 
	RETURNS TABLE (
		rempId int,
		rempThumbnailFilename text,
		rempPhotoFilename text,
		rempPrimary bit,
		rempUrl text,
		rempReme int,
		remeName text
	) AS $$
DECLARE dataPhoto CURSOR FOR(
		SELECT resto.resto_menu_photos.remp_id,
			resto.resto_menus.reme_id,
			resto.resto_menus.reme_name
		FROM resto.resto_menu_photos
			JOIN resto.resto_menus ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
		WHERE resto.resto_menus.reme_id = remeId
	);
BEGIN 
	OPEN dataPhoto;
		LOOP FETCH NEXT
			FROM dataPhoto INTO rempId,
				rempThumbnailFilename,
				rempPhotoFilename,
				rempPrimary,
				rempUrl,
				rempReme,
				remeName;
			EXIT WHEN NOT FOUND;
			RETURN NEXT;
		END LOOP;
	CLOSE dataPhoto;
END;
$$ 
LANGUAGE PLPGSQL;

------------------------------------------- TERBARUUUUUU ------------------------------------------
CREATE OR REPLACE FUNCTION resto.getPhotoMenu(remeId int) 
	RETURNS TABLE (
		rempId int,
		rempThumbnailFilename text,
		rempPhotoFilename text,
		rempPrimary bit,
		rempUrl text,
		rempReme int,
		remeName text
	) AS $$
DECLARE dataPhoto CURSOR FOR(
		SELECT resto.resto_menu_photos.remp_id,
			resto.resto_menu_photos.remp_thumbnail_filename,
			resto.resto_menu_photos.remp_photo_filename,
			resto.resto_menu_photos.remp_primary,
			resto.resto_menu_photos.remp_url,
			resto.resto_menus.reme_id,
			resto.resto_menus.reme_name
		FROM resto.resto_menu_photos
			JOIN resto.resto_menus ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
		WHERE resto.resto_menus.reme_id = remeId
	);
BEGIN 
	OPEN dataPhoto;
		LOOP FETCH NEXT
			FROM dataPhoto INTO 
				rempId,
				rempThumbnailFilename,
				rempPhotoFilename,
				rempPrimary,
				rempUrl,
				rempReme,
				remeName;
			EXIT WHEN NOT FOUND;
			RETURN NEXT;
		END LOOP;
	CLOSE dataPhoto;
END;
$$ 
LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION resto.orders(
		ormeOrderNumber text,
		ormeDate date,
		ormeTotalItem int,
		ormeTotalDiscount int,
		ormeTotalAmount int,
		orme_pay_type varchar(2),
		ormeIsPaid text,
		ormeUserId int
	) 
	RETURNS int 
	AS 
	$$
	DECLARE 
		id_orme int;
		
	BEGIN
		INSERT INTO resto.order_menus(
				orme_order_number,
				orme_order_date,
				orme_total_item,
				orme_total_discount,
				orme_total_amount,
				orme_pay_type,
				orme_is_paid,
				orme_modified_date,
				orme_user_id
			)
		VALUES (
				ormeOrderNumber,
				now(),
				ormeTotalItem,
				ormeTotalDiscount,
				ormeTotalAmount,
				orme_pay_type,
				ormeIsPaid,
				now(),
				ormeUserId
			)
		RETURNING resto.order_menus.orme_id INTO id_orme;
	RETURN id_orme;
END;
$$ 
LANGUAGE PLPGSQL;