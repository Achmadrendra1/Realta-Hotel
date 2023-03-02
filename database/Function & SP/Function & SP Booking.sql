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
END;$$
CALL booking.InsertBooking()

--Get Booking Invoice
CREATE OR REPLACE PROCEDURE booking.getBookingInvoice()
AS $$
BEGIN
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
	boor.boor_total_room,
	boor.boor_total_amount,
	borde.borde_adults,
	borde.borde_kids,
	borde.borde_price,
	borde.borde_discount,
	borde.borde_subtotal,
	faci.faci_name,
    patr.patr_trx_id,
	patr.patr_modified_date
	
	FROM users.users users
	JOIN users.user_members usme
	ON users.user_id = usme.usme_user_id
	JOIN booking.booking_orders boor
	ON users.user_id = boor.boor_user_id
	JOIN booking.booking_order_detail borde
	ON boor.boor_id = borde.border_boor_id
	JOIN hotel.facilities faci
	ON borde.borde_faci_id = faci.faci_id
    JOIN payment.payment_transaction patr
	ON boor.boor_order_number = patr.patr_order_number
END; $$
LANGUAGE plpgsql;
CALL booking.getBookingInvoice()


--Get Hotel
CREATE OR REPLACE PROCEDURE hotel.viewHotel()
AS $$
BEGIN
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
   (select (a.addr_id)hotel_addr_id, concat(a.addr_line1,' ',p.prov_name,' ',c.country_name,' ',r.region_name)place 
	from master.address a
	join master.proviences p on a.addr_prov_id = p.prov_id
	join master.country c on p.prov_country_id = c.country_id
	join master.regions r on r.region_code = c.country_region_id)addrees
	on h.hotel_addr_id = addrees.hotel_addr_id group by h.hotel_id, faci_group_rprice.faci_rateprice, faci_group.faci_hotelall,faci_group_lprice.faci_lowprice,faci_group_hprice.faci_highprice, addrees.place,faci_room_group.faci_hotelroom;
END; $$
LANGUAGE plpgsql;
CALL hotel.viewHotel()

--Get Facility
CREATE OR REPLACE PROCEDURE hotel.viewRoom()
AS $$
BEGIN
    CREATE VIEW hotel.viewRoom AS
	select *
	from hotel.hotels h join hotel.facilities f 
	on h.hotel_id = f.faci_hotel_id
	join (select fapho_faci_id, string_agg(fapho_url,', ')as fapho_url
			from hotel.facility_photos group by fapho_faci_id) fap
	on f.faci_id = fap.fapho_faci_id;
	where faci_cagro_id = 1
END; $$
LANGUAGE plpgsql;
CALL hotel.viewRoom()

--Get User Review
CREATE OR REPLACE PROCEDURE hotel.userreview()
AS $$
BEGIN
    CREATE VIEW hotel.userreview AS
	select hr.hore_hotel_id, u.user_full_name, u.user_email, hr.hore_user_review, hr.hore_created_on, hr.hore_rating
  	from hotel.hotel_reviews hr
	join users.users u
	on hr.hore_user_id = u.user_id;
END; $$
LANGUAGE plpgsql;
call hotel.user_review()
select * from hotel.userreview

--Payment Insert
CREATE OR REPLACE PROCEDURE  payment.insertPaymentTrx(
	userId				int,
	amount				int,
	sourceNumber		varchar,
	targetNumber		varchar,
	trxType    			text DEFAULT NULL,
	orderNumber			varchar DEFAULT NULL
)
AS $$
DECLARE
  result text;
  orderType text;
  currentDate date := NOW();
  orderDate date;
  lastCount int;
  currentCount int;
  newCount text;
  newCode text;
  debetAmount int := 0;
  creditAmount int := 0;
  note text;
  TransactionNumberRef text := FLOOR(RANDOM() * POWER(CAST(10 as BIGINT), 15))::text;
BEGIN
	IF orderNumber IS NULL THEN
		CASE
			WHEN trxType = 'TP'
				THEN 
				orderDate := (SELECT COALESCE(MAX(SUBSTRING(patr_trx_id, '#(.*)-')::date), now()::date) from payment.payment_transaction where patr_type = trxType);
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(MAX(SUBSTRING(patr_trx_id, '-(.*)'))::int, 0) from payment.payment_transaction where patr_type = trxType) +1;
				END IF;
				newCount := lpad(currentCount::text, 4, '0');
				newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
				note := 'Top Up';
				debetAmount := amount;
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;

			WHEN trxType = 'RF'
				THEN 
				orderDate := (SELECT COALESCE(MAX(SUBSTRING(patr_trx_id, '#(.*)-')::date), now()::date) from payment.payment_transaction where patr_type = trxType);
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(MAX(SUBSTRING(patr_trx_id, '-(.*)'))::int, 0) from payment.payment_transaction where patr_type = trxType) +1;
				END IF;
				newCount := lpad(currentCount::text, 4, '0');
				newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
				note := 'Refund';
				debetAmount := amount;
				UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;
				
			WHEN trxType = 'RPY'
				THEN 
				orderDate := (SELECT COALESCE(MAX(SUBSTRING(patr_trx_id, '#(.*)-')::date), now()::date) from payment.payment_transaction where patr_type = trxType);
				IF orderDate != currentDate
					THEN currentCount := 1;
				ELSE
					currentCount := (SELECT COALESCE(MAX(SUBSTRING(patr_trx_id, '-(.*)'))::int, 0) from payment.payment_transaction where patr_type = trxType) +1;
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
		orderDate := SUBSTRING(orderNumber, '#(.*)-')::date;
		lastCount := SUBSTRING(orderNumber, '-(.*)')::int;	
		IF orderDate != currentDate
			THEN currentCount := 1;
		ELSE 
			currentCount := lastCount + 1;
		END IF;
		newCount := lpad(currentCount::text, 4, '0');
		IF orderType = 'BO'::text
			THEN 
			trxType := 'TRB';
			newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
			note := 'Booking';
			creditAmount := amount;
			UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;	
		ELSE
			trxType := 'ORM';
		 	newCode := CONCAT(trxType, '#', TO_CHAR(currentDate::date, 'YYYYMMDD'), '-', newCount);
			note := 'Food Order';
			creditAmount := amount;
			UPDATE payment.user_accounts SET usac_saldo = usac_saldo - amount WHERE usac_account_number = sourceNumber;	
		END IF;
	END IF;
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
		newCode,
		debetAmount,
		creditAmount,
		trxType,
		note,
		OrderNumber,
		sourceNumber::numeric,
		targetNumber::numeric,
		TransactionNumberRef,
		userId,
		now()
	);
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
