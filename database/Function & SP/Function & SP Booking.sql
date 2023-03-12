--Get Special Offers Coupons
CREATE VIEW booking.getSpecialOffers
AS
SELECT 
spof_id "spofId",
spof_name  "spofName",
spof_description "spofDescription",
spof_type "spofType",
spof_discount "spofDiscount",
spof_start_date "spofStartDate",
spof_end_date "spofEndDate",
spof_min_qty "spofMinQty",
spof_max_qty "spofMaxQty",
spof_modified_date "spofModifiedDate"
FROM booking.special_offers spof
LEFT JOIN (
	SELECT soco_spof_id, COUNT(soco_spof_id) AS socount
	FROM booking.special_offer_coupons
	GROUP BY soco_spof_id
) soco
ON spof.spof_id = soco.soco_spof_id
WHERE
spof.spof_start_date <= CURRENT_TIMESTAMP
AND spof.spof_end_date >= CURRENT_TIMESTAMP
AND (
	spof.spof_max_qty > COALESCE(soco.socount, 0)
	OR soco.socount IS NULL
)

--Booking.CreateBooking()
CREATE OR REPLACE PROCEDURE booking.InsertBooking(
    p_boor_user_id int,
    p_boor_hotel_id int,
    p_boor_order_number varchar (20),
    p_boor_order_date date,
    p_boor_arrival_date date,
    p_boor_total_room smallInt,
    p_boor_total_guest smallInt,
    p_boor_discount int,
    p_boor_total_tax int,
    p_boor_total_amount  int,
    p_boor_down_payment  int,
    p_boor_pay_type  varchar (2),
    p_boor_is_paid  varchar (2), 
    p_boor_type  varchar (15),
    p_boor_cardnumber varchar (25),
    p_boor_member_type varchar (15),
    p_boor_status varchar (15),
    p_borde_checkin date,
    p_borde_Checkout date,
    p_borde_adults int,
    p_borde_kids int,
    p_borde_price int,
    p_borde_extra int,
    p_borde_discount int,
    p_borde_tax int,
    p_borde_subtotal int,
    p_borde_faci_id int,
	p_soco_spof_id int
)
LANGUAGE plpgsql
AS $$
DECLARE 
    boor_id_val int; --Tambah ini
	borde_id_val int;
	cur_date date := p_borde_checkin;
BEGIN
    INSERT INTO booking.booking_orders(
        boor_user_id,
        boor_hotel_id,
        boor_order_number,
        boor_order_date,
        boor_arrival_date,
        boor_total_room,
        boor_total_guest,
        boor_discount,
        boor_total_tax,
        boor_total_amount,
        boor_down_payment,
        boor_pay_type,
        boor_is_paid,
        boor_type,
        boor_cardnumber,
        boor_member_type,
        boor_status
    )
    VALUES (
        p_boor_user_id,
        p_boor_hotel_id,
        p_boor_order_number,
        p_boor_order_date,
        p_boor_arrival_date,
        p_boor_total_room,
        p_boor_total_guest,
        p_boor_discount,
        p_boor_total_tax,
        p_boor_total_amount,
        p_boor_down_payment,
        p_boor_pay_type,
        p_boor_is_paid,
        p_boor_type,
        p_boor_cardnumber,
        p_boor_member_type,
        p_boor_status
    )RETURNING boor_id INTO boor_id_val; --Tambah Ini

    INSERT INTO booking.booking_order_detail(
        border_boor_id,
        borde_faci_id,
        borde_checkin,
        borde_checkout,
        borde_adults,
        borde_kids,
        borde_price,
        borde_extra,
        borde_discount,
        borde_tax,
        borde_subtotal
    )
    VALUES (
        boor_id_val,
        p_borde_faci_id,
        p_borde_checkin,
        p_borde_Checkout,
        p_borde_adults,
        p_borde_kids,
        p_borde_price,
        p_borde_extra,
        p_borde_discount,
        p_borde_tax,
        p_borde_subtotal
    )RETURNING borde_id INTO borde_id_val;
	
	INSERT INTO booking.special_offer_coupons(
		soco_borde_id,
		soco_spof_id
	)
	VALUES (
		borde_id_val,
		p_soco_spof_id
	);
	
	WHILE cur_date < p_borde_checkout LOOP
        cur_date := cur_date + 1;
		INSERT INTO booking.user_breakfeast(
            usbr_borde_id,
            usbr_modified_date,
            usbr_total_vacant
        )
        VALUES (
            borde_id_val,
            cur_date,
            p_boor_total_guest
        );
    END LOOP;
COMMIT;
END;$$;

--Get Booking Invoice
CREATE VIEW booking.getBookingInvoice 
AS 
SELECT users.user_id, 
users.user_full_name, 
users.user_phone_number, 
usme.usme_memb_name, 
usme.usme_promote_date, 
usme.usme_points,
boor.boor_id,
boor.boor_order_number,
boor.boor_order_date,
boor.boor_is_paid,
boor.boor_pay_type,
boor.boor_status,
boor.boor_total_room,
boor.boor_total_amount,
borde.borde_id
TO_CHAR(borde.borde_checkin, 'DD Mon YYYY') "check_in_date",
TO_CHAR(borde.borde_checkout, 'DD Mon YYYY') "check_out_date",
(borde.borde_adults + borde.borde_kids) "total_guest",
borde.borde_adults,
borde.borde_kids,
borde.borde_price,
borde.borde_discount,
borde.borde_subtotal,
prit.prit_name,
boex.boex_price,
boex.boex_qty,
boex.boex_subtotal,
hotels.hotel_name,
faci.faci_name,
patr.patr_trx_id,
patr.patr_modified_date,
(
	select "sourcePaymentName"
	from payment.user_transactions
	where "orderNumber" = boor.boor_order_number
) "payment_Type",
(
	CASE
	WHEN boor.boor_is_paid = 'P'
	THEN 'Paid'
	WHEN boor.boor_is_paid = 'DP'
	THEN 'Down Payment'
	WHEN boor.boor_is_paid = 'R'
	THEN 'Refund'
	END
) AS "boor_paid"
FROM users.users users
JOIN users.user_members usme
ON users.user_id = usme.usme_user_id
JOIN booking.booking_orders boor
ON users.user_id = boor.boor_user_id
JOIN booking.booking_order_detail borde
ON boor.boor_id = borde.border_boor_id
JOIN booking.booking_order_detail_extra boex 
ON borde.borde_id = boex.boex_borde_id
JOIN master.price_items prit 
ON boex.boex_prit_id = prit.prit_id
JOIN hotel.facilities faci
ON borde.borde_faci_id = faci.faci_id
JOIN hotel.hotels hotels
ON boor.boor_hotel_id = hotels.hotel_id
JOIN payment.payment_transaction patr
ON boor.boor_order_number = patr.patr_order_number
ORDER BY boor.boor_order_date desc

SELECT * FROM booking.getBookingInvoice

--Get Hotel
CREATE VIEW hotel.viewHotel AS 
select h.hotel_id, h.hotel_name, h.hotel_description, h.hotel_rating_star, h.hotel_phonenumber,
		faci_group.faci_hotelall,faci_group_rprice.faci_rateprice,faci_group_lprice.faci_lowprice,faci_group_hprice.faci_highprice,string_agg(photo_hotel.url, ',')as url, addrees.place,faci_room_group.faci_hotelroom
from hotel.hotels h 
join 
(select faci_hotel_id, string_agg(faci_name, ', ')as faci_hotelall
from hotel.facilities group by faci_hotel_id)faci_group
on h.hotel_id = faci_group.faci_hotel_id
join
(select faci_hotel_id, string_agg(concat(' ',faci_rate_price), '- ')as faci_rateprice
from hotel.facilities 
where faci_cagro_id = 1
group by faci_hotel_id)faci_group_rprice
on h.hotel_id = faci_group_rprice.faci_hotel_id
join
(select faci_hotel_id, string_agg(concat(' ',faci_low_price), '- ')as faci_lowprice
from hotel.facilities 
where faci_cagro_id = 1
group by faci_hotel_id)faci_group_lprice
on h.hotel_id = faci_group_lprice.faci_hotel_id
join 
(select faci_hotel_id, string_agg(concat(' ',faci_high_price), '- ')as faci_highprice
from hotel.facilities
where faci_cagro_id = 1
group by faci_hotel_id)faci_group_hprice
on h.hotel_id = faci_group_hprice.faci_hotel_id
join 
(select (f.faci_hotel_id) as hotel_id, faci_cagro_id, f.faci_name, (ph.fapho_url) as url, ph.fapho_primary 
from hotel.facility_photo ph
join hotel.facilities f on ph.fapho_faci_id = f.faci_id 
where ph.fapho_primary = '1' and f.faci_cagro_id=1)photo_hotel
on h.hotel_id = photo_hotel.hotel_id
join
(select faci_hotel_id, string_agg(faci_name, ', ')as faci_hotelroom
from hotel.facilities 
where faci_cagro_id = 1
group by faci_hotel_id
)faci_room_group
on h.hotel_id = faci_room_group.faci_hotel_id
join
(select (a.addr_id)hotel_addr_id, concat(a.addr_line1, ', ', a.addr_line2, ', ', p.prov_name, ', ', c.country_name, ', ', r.region_name)place 
from master.address a
join master.proviences p on a.addr_prov_id = p.prov_id
join master.country c on p.prov_country_id = c.country_id
join master.regions r on r.region_code = c.country_region_id)addrees
on h.hotel_addr_id = addrees.hotel_addr_id
group by h.hotel_id, faci_group_rprice.faci_rateprice, faci_group.faci_hotelall,faci_group_lprice.faci_lowprice,faci_group_hprice.faci_highprice, addrees.place,faci_room_group.faci_hotelroom;

SELECT * FROM hotel.viewHotel

--Get Facility
CREATE VIEW hotel.viewRoom AS
select *
from hotel.hotels h join hotel.facilities f 
on h.hotel_id = f.faci_hotel_id
join (select fapho_faci_id, string_agg(fapho_url,', ')as fapho_url
		from hotel.facility_photos group by fapho_faci_id) fap
on f.faci_id = fap.fapho_faci_id;
where faci_cagro_id = 1

SELECT * FROM hotel.viewRoom

--Get User Review
CREATE VIEW hotel.userreview AS
select hr.hore_hotel_id, u.user_full_name, u.user_email, hr.hore_user_review, hr.hore_created_on, hr.hore_rating
from hotel.hotel_reviews hr
join users.users u
on hr.hore_user_id = u.user_id;

SELECT * FROM hotel.userreview


--Payment Insert
CREATE OR REPLACE PROCEDURE payment.insertOneTrx(
	patr_trx_id			varchar,
	patr_debet			int,
	patr_credit			int,
	patr_type			varchar,
	patr_note			varchar,
	patr_order_number	varchar,
	patr_source_id		numeric,
	patr_target_id		numeric,
	patr_user_id		int
) AS $$
BEGIN
	INSERT INTO payment.payment_transaction (
		patr_trx_id,
		patr_debet,
		patr_credit,
		patr_type,
		patr_note,
		patr_order_number,
		patr_source_id,
		patr_target_id,
		patr_trx_number_ref,
		patr_user_id,
		patr_modified_date
	) VALUES (
		patr_trx_id,
		patr_debet,
		patr_credit,
		patr_type,
		patr_note,
		patr_order_number,
		patr_source_id,
		patr_target_id,
		FLOOR(RANDOM() * POWER(CAST(10 as BIGINT), 15))::text,
		patr_user_id,
		now()
	);
END;$$
LANGUAGE plpgsql;

--Payment
CREATE OR REPLACE PROCEDURE  payment.insertPaymentTrx(
	userId				int,
	amount				int,
	sourceNumber		varchar,
	targetNumber		varchar,
	trxType    			text DEFAULT NULL,
	payType             text DEFAULT NULL,
	orderNumber			varchar DEFAULT NULL
)
AS $$
DECLARE
  lastOrderNumber text;
  orderType text;
  currentDate date := NOW();
  orderDate date;
  lastCount int;
  currentCount int;
  lastCode int;
  newCount text;
  newLastCount text;
  newCode text;
  newLastCode text;
  debetAmount int := 0;
  creditAmount int := 0;
  note text;
  TransactionNumberRef text;
BEGIN
	IF orderNumber IS NULL THEN
		CASE
			WHEN trxType = 'TP'
				THEN
				lastOrderNumber := (SELECT COALESCE(MAX(patr_trx_id)) from payment.payment_transaction where patr_type = trxType);
				orderDate := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '#(.*)-')::date, now()::date));
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '-(.*)')::int, 0)) +1;
				END IF;
				newCount := lpad(currentCount::text, 4, '0');
				newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
				note := 'Top Up';
				debetAmount := amount;
				call payment.insertOneTrx(
					newCode,
					debetAmount,
					creditAmount,
					trxType,
					note,
					OrderNumber,
					sourceNumber::numeric,
					targetNumber::numeric,
					userId
				);
				lastCode := currentCount + 1;
				newLastCount := lpad(lastCode::text, 4, '0');
				newLastCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newLastCount);
				note := 'Top Up';
				creditAmount := amount;
				debetAmount := 0;
				call payment.insertOneTrx(
					newLastCode,
					debetAmount,
					creditAmount,
					trxType,
					note,
					OrderNumber,
					sourceNumber::numeric,
					targetNumber::numeric,
					userId
				);
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;

			WHEN trxType = 'RF'
				THEN 
				lastOrderNumber := (SELECT COALESCE(MAX(patr_trx_id)) from payment.payment_transaction where patr_type = trxType);
				orderDate := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '#(.*)-')::date, now()::date));
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '-(.*)')::int, 0)) +1;
				END IF;
				newCount := lpad(currentCount::text, 4, '0');
				newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
				note := 'Refund';
				debetAmount := amount;
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;
				
			WHEN trxType = 'RPY'
				THEN 
				lastOrderNumber := (SELECT COALESCE(MAX(patr_trx_id)) from payment.payment_transaction where patr_type = trxType);
				orderDate := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '#(.*)-')::date, now()::date));
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '-(.*)')::int, 0)) +1;
				END IF;
				newCount := lpad(currentCount::text, 4, '0');
				newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
				note := 'Repayment';
				creditAmount := amount;
				
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;	
		END CASE;
	ELSE
		orderType := SUBSTRING(orderNumber, '(.*)#');
		IF orderType = 'BO'::text
			THEN 
			trxType := 'TRB';
			lastOrderNumber := (SELECT COALESCE(MAX(patr_trx_id)) from payment.payment_transaction where patr_type = trxType);
				orderDate := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '#(.*)-')::date, now()::date));
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '-(.*)')::int, 0)) +1;
				END IF;
			newCount := lpad(currentCount::text, 4, '0');
			newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
			note := 'Booking';
			creditAmount := amount;
			
			UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;	
		ELSE
			trxType := 'ORM';
			lastOrderNumber := (SELECT COALESCE(MAX(patr_trx_id)) from payment.payment_transaction where patr_type = trxType);
				orderDate := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '#(.*)-')::date, now()::date));
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(SUBSTRING(lastOrderNumber, '-(.*)')::int, 0)) +1;
				END IF;
			newCount := lpad(currentCount::text, 4, '0');
		 	newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
			note := 'Food Order';
			creditAmount := amount;
			UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;	
			UPDATE resto.order_menus SET orme_pay_type = payType, orme_cardnumber = sourceNumber, orme_is_paid = 'P' where orme_order_number = orderNumber;
		END IF;
		call payment.insertOneTrx(
				newCode,
				debetAmount,
				creditAmount,
				trxType,
				note,
				OrderNumber,
				sourceNumber::numeric,
				targetNumber::numeric,
				userId
			);
	END IF;
END; $$ 
LANGUAGE plpgsql;


SELECT setval('payment."entitys_entity_id_seq"', (SELECT MAX(entity_id) FROM payment.entitys));
SELECT setval('payment."payment_transaction_patr_id_seq"', (SELECT MAX(patr_id) FROM payment.payment_transaction));

-- Login Users with email
CREATE OR REPLACE FUNCTION users.getUserDetail(userEmail Varchar(225))
RETURNS TABLE(
	user_id INT,
	user_full_name VARCHAR(55),
	role_name varchar(35),
	user_type VARCHAR(15),
	user_company_name VARCHAR,
	uspro_job_title VARCHAR(15),
	user_email VARCHAR,
	user_phone_number VARCHAR(25),
	uspa_passwordhash VARCHAR(128),
	emp_photo VARCHAR(255),
	usme_memb_name varchar(35),
	ubpo_total_points smallint,
	ubpo_bonus_type char(1),
	ubpo_created_on timestamp,
	usme_promote_date timestamp,
	usme_points smallint,
	usme_type varchar(15),
	
	uspro_national_id VARCHAR(20),
	uspro_birth_date date,
	uspro_marital_status char(1),
	uspro_gender char(1)
	
	
) AS $$
DECLARE
BEGIN
	RETURN QUERY SELECT Distinct
		u.user_id, 
		u.user_full_name, 
		r.role_name, 
		u.user_type, 
		u.user_company_name,
		up.uspro_job_title,
		u.user_email, 
		u.user_phone_number,
		ui.uspa_passwordhash,
		e.emp_photo,
		um.usme_memb_name,
		ubp.ubpo_total_points,
		ubp.ubpo_bonus_type,
		ubp.ubpo_created_on,
		
		um.usme_promote_date,
		um.usme_points,
		um.usme_type,
		up.uspro_national_id,
		up.uspro_birt_date,
		up.uspro_martial_status,
		up.uspro_gender
		
	FROM users.roles r 
	FULL JOIN users.user_roles ur ON r.role_id = ur.usro_role_id
	FULL JOIN users.users u ON ur.usro_user_id = u.user_id
	FULL JOIN users.user_profiles up ON u.user_id = up.uspro_user_id
	FULL JOIN users.user_password ui ON ui.uspa_user_id = u.user_id
	FULL JOIN hr.work_orders wo ON u.user_id = wo.woro_user_id
	FULL JOIN hr.work_order_detail wod ON wo.woro_id = wod.wode_woro_id
	FULL JOIN hr.employee e ON e.emp_id = wod.wode_emp_id
	FULL JOIN users.user_members um ON um.usme_user_id = u.user_id
	FULL JOIN users.user_bonus_points ubp ON ubp.ubpo_user_id = u.user_id

	WHERE u.user_email = userEmail and   u.user_id > 0;

END; $$
LANGUAGE plpgsql;