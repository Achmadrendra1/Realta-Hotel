-- database yang berubah untuk restaurant
-- 1. ada function resto.listMenu(faciid), untuk ambil hotel, restomenu, dan photo yg primary
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
-- drop function resto.listMenu(faciid int)
-- GET LIST MENU RESTO, PAKE FUNCTION UNTUK MENDAPATKAN DATA 
CREATE OR REPLACE FUNCTION resto.listMenu(faciid int) RETURNS TABLE (
		remeId int,
		remeName text,
		remeDescription text,
		remePrice money,
		remeDiscount money,
		remeStatus text,
		rempThumbnailFilename text,
		rempPhotoFilename text,
		rempPrimary bit,
		rempUrl text,
		remeFaciId int
	) AS $$
DECLARE dataMenu CURSOR FOR (
		SELECT DISTINCT ON (resto.resto_menus.reme_id) resto.resto_menus.reme_id,
			resto.resto_menus.reme_name,
			resto.resto_menus.reme_description,
			resto.resto_menus.reme_price,
			resto.resto_menus.reme_discount,
			resto.resto_menus.reme_status,
			resto.resto_menu_photos.remp_thumbnail_filename,
			resto.resto_menu_photos.remp_photo_filename,
			resto.resto_menu_photos.remp_primary,
			resto.resto_menu_photos.remp_url,
			resto.resto_menus.reme_faci_id
		FROM resto.resto_menus
			LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
		WHERE resto.resto_menus.reme_status = 'AVAILABLE'
			AND resto.resto_menus.reme_faci_id = faciid -- 					AND resto_menu_photos.remp_primary = B'1'
	);
BEGIN OPEN dataMenu;
LOOP FETCH NEXT
FROM dataMenu INTO remeId,
	remeName,
	remeDescription,
	remePrice,
	remeDiscount,
	remeStatus,
	rempThumbnailFilename,
	rempPhotoFilename,
	rempPrimary,
	rempUrl,
	remeFaciId;
EXIT
WHEN NOT FOUND;
RETURN NEXT;
END LOOP;
CLOSE dataMenu;
END;
$$ LANGUAGE PLPGSQL;
-- 2. ada function resto.getPhotoMenu(remeid), manmpilkan photo sesuai dengan remeid
-- get menu with photo
CREATE OR REPLACE FUNCTION resto.getPhotoMenu(remeId int) RETURNS TABLE (
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
BEGIN OPEN dataPhoto;
LOOP FETCH NEXT
FROM dataPhoto INTO rempId,
	rempThumbnailFilename,
	rempPhotoFilename,
	rempPrimary,
	rempUrl,
	rempReme,
	remeName;
EXIT
WHEN NOT FOUND;
RETURN NEXT;
END LOOP;
CLOSE dataPhoto;
END;
$$ LANGUAGE PLPGSQL;
set lc_monetary = 'Indonesian_Indonesia.1252';
-- 3. function resto.ordermenuscomplete(noorder,userid), ambil codenumber dan id user saat user order data
CREATE OR REPLACE FUNCTION resto.ordermenuscomplete(orderNumber text, user_id int) RETURNS TABLE (
		orme_id int,
		orme_order_number varchar(20),
		orme_order_date date,
		orme_total_item INT,
		orme_total_discount MONEY,
		orme_total_amount MONEY,
		orme_pay_type varchar(2),
		orme_cardnumber text,
		orme_is_paid varchar(2),
		orme_modified_date date,
		orme_user_id int,
		omde_id int,
		orme_price money,
		orme_qty int,
		orme_subtotal money,
		omde_orme_id int,
		omde_reme_id int,
		reme_name text
	) AS $$
DECLARE dataordermenus CURSOR FOR (
		SELECT resto.order_menus.orme_id,
			resto.order_menus.orme_order_number,
			resto.order_menus.orme_order_date,
			resto.order_menus.orme_total_item,
			resto.order_menus.orme_total_discount,
			resto.order_menus.orme_total_amount,
			resto.order_menus.orme_pay_type,
			resto.order_menus.orme_cardnumber,
			resto.order_menus.orme_is_paid,
			resto.order_menus.orme_modified_date,
			resto.order_menus.orme_user_id,
			resto.order_menu_detail.omde_id,
			resto.order_menu_detail.orme_price,
			resto.order_menu_detail.orme_qty,
			resto.order_menu_detail.orme_subtotal,
			resto.order_menu_detail.omde_orme_id,
			resto.order_menu_detail.omde_reme_id,
			resto.resto_menus.reme_name
		FROM resto.order_menus
			RIGHT JOIN resto.order_menu_detail ON resto.order_menus.orme_id = resto.order_menu_detail.omde_orme_id
			JOIN resto.resto_menus ON resto.resto_menus.reme_id = resto.order_menu_detail.omde_reme_id
		WHERE resto.order_menus.orme_order_number = orderNumber
			AND order_menus.orme_user_id = user_id
	);
BEGIN OPEN dataordermenus;
LOOP FETCH NEXT
FROM dataordermenus INTO orme_id,
	orme_order_number,
	orme_order_date,
	orme_total_item,
	orme_total_discount,
	orme_total_amount,
	orme_pay_type,
	orme_cardnumber,
	orme_is_paid,
	orme_modified_date,
	orme_user_id,
	omde_id,
	orme_price,
	orme_qty,
	orme_subtotal,
	omde_orme_id,
	omde_reme_id,
	reme_name;
EXIT
WHEN NOT FOUND;
RETURN NEXT;
END LOOP;
CLOSE dataordermenus;
END;
$$ LANGUAGE PLPGSQL;
-- select * from resto.ordermenuscomplete('MENUS#20230301-0002',1)
-- 4. function resto.resto_detail (-)
-- 5. SELECT ORDER MENU
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
-- ORDERS
CREATE OR REPLACE FUNCTION resto.orders(
		ormeOrderNumber text,
		ormeDate date,
		ormeTotalItem int,
		ormeTotalDiscount int,
		ormeTotalAmount int,
		orme_pay_type varchar(2),
		ormeIsPaid text,
		ormeUserId int
	) RETURNS int AS $$
DECLARE id_orme int;
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
$$ LANGUAGE PLPGSQL;
-- buat di dashboard
CREATE OR REPLACE VIEW resto.restomenu_dashboard AS
SELECT DISTINCT ON (resto.resto_menus.reme_id) hotel.hotels.hotel_name,
	hotel.facilities.faci_id,
	hotel.facilities.faci_name,
	resto.resto_menus.reme_id,
	resto.resto_menus.reme_name,
	resto.resto_menus.reme_description,
	resto.resto_menus.reme_price,
	resto.resto_menus.reme_status,
	resto.resto_menus.reme_modified_date,
	resto.resto_menus.reme_discount,
	resto.resto_menu_photos.remp_id,
	resto.resto_menu_photos.remp_primary,
	resto.resto_menu_photos.remp_url
FROM resto.resto_menus
	LEFT JOIN resto.resto_menu_photos ON resto.resto_menus.reme_id = resto.resto_menu_photos.remp_reme_id
	LEFT JOIN hotel.facilities ON resto.resto_menus.reme_faci_id = hotel.facilities.faci_id
	LEFT JOIN hotel.hotels ON hotel.facilities.faci_hotel_id = hotel.hotels.hotel_id -- 	WHERE 	resto_menu_photos.remp_primary = B'1'
ORDER BY resto.resto_menus.reme_id;
CREATE VIEW resto.resto_detail AS
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
WHERE hotel.facilities.faci_cagro_id = 2;