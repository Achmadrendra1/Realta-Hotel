--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: booking; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA booking;


ALTER SCHEMA booking OWNER TO postgres;

--
-- Name: hotel; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hotel;


ALTER SCHEMA hotel OWNER TO postgres;

--
-- Name: hr; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hr;


ALTER SCHEMA hr OWNER TO postgres;

--
-- Name: master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA master;


ALTER SCHEMA master OWNER TO postgres;

--
-- Name: payment; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA payment;


ALTER SCHEMA payment OWNER TO postgres;

--
-- Name: purchasing; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA purchasing;


ALTER SCHEMA purchasing OWNER TO postgres;

--
-- Name: resto; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA resto;


ALTER SCHEMA resto OWNER TO postgres;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: insertbooking(integer, integer, character varying, date, date, smallint, smallint, integer, integer, integer, integer, character varying, character varying, character varying, character varying, character varying, character varying, date, date, integer, integer, integer, integer, integer, integer, integer, integer, integer); Type: PROCEDURE; Schema: booking; Owner: postgres
--

CREATE PROCEDURE booking.insertbooking(IN p_boor_user_id integer, IN p_boor_hotel_id integer, IN p_boor_order_number character varying, IN p_boor_order_date date, IN p_boor_arrival_date date, IN p_boor_total_room smallint, IN p_boor_total_guest smallint, IN p_boor_discount integer, IN p_boor_total_tax integer, IN p_boor_total_amount integer, IN p_boor_down_payment integer, IN p_boor_pay_type character varying, IN p_boor_is_paid character varying, IN p_boor_type character varying, IN p_boor_cardnumber character varying, IN p_boor_member_type character varying, IN p_boor_status character varying, IN p_borde_checkin date, IN p_borde_checkout date, IN p_borde_adults integer, IN p_borde_kids integer, IN p_borde_price integer, IN p_borde_extra integer, IN p_borde_discount integer, IN p_borde_tax integer, IN p_borde_subtotal integer, IN p_borde_faci_id integer, IN p_soco_spof_id integer)
    LANGUAGE plpgsql
    AS $$DECLARE 
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
	
	
	IF p_soco_spof_id IS NOT null
	THEN
	INSERT INTO booking.special_offer_coupons(
		soco_borde_id,
		soco_spof_id
	)
	VALUES (
		borde_id_val,
		p_soco_spof_id
	);
	END IF;
	
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


ALTER PROCEDURE booking.insertbooking(IN p_boor_user_id integer, IN p_boor_hotel_id integer, IN p_boor_order_number character varying, IN p_boor_order_date date, IN p_boor_arrival_date date, IN p_boor_total_room smallint, IN p_boor_total_guest smallint, IN p_boor_discount integer, IN p_boor_total_tax integer, IN p_boor_total_amount integer, IN p_boor_down_payment integer, IN p_boor_pay_type character varying, IN p_boor_is_paid character varying, IN p_boor_type character varying, IN p_boor_cardnumber character varying, IN p_boor_member_type character varying, IN p_boor_status character varying, IN p_borde_checkin date, IN p_borde_checkout date, IN p_borde_adults integer, IN p_borde_kids integer, IN p_borde_price integer, IN p_borde_extra integer, IN p_borde_discount integer, IN p_borde_tax integer, IN p_borde_subtotal integer, IN p_borde_faci_id integer, IN p_soco_spof_id integer) OWNER TO postgres;

--
-- Name: addemployee(character varying, character varying, character varying, date, date, character varying, character varying, character varying, integer, integer, integer, integer, integer, integer, integer, date, integer, integer); Type: PROCEDURE; Schema: hr; Owner: postgres
--

CREATE PROCEDURE hr.addemployee(IN fullname character varying, IN photourl character varying, IN nationalid character varying, IN birthdate date, IN hiredate date, IN marital character varying, IN gender character varying, IN salariedflag character varying, IN status integer, IN vacation integer, IN sick integer, IN jobid integer, IN salary integer, IN frequentlypay integer, IN departmentid integer, IN startdept date, IN shiftid integer, IN bosid integer)
    LANGUAGE plpgsql
    AS $$
declare
	id_user int;
	id_work int;
	id_wode int;
	id_emp int;

begin 
	id_user := users.users();
	id_work := hr.woId();
	id_emp := hr.getId();
	id_wode := hr.wodeId();
	
	insert into users.users(
		user_id,
		user_full_name,
		user_type
	)values (
		id_user,
		fullName,
		'C'
	);
	
	insert into hr.employee(
		emp_id,
		emp_national_id,
		emp_birth_date,
		emp_marital_status,
		emp_gender,
		emp_hire_date,
		emp_salaried_flag,
		emp_vacation_hours,
		emp_sickleave_hourse,
		emp_current_flag,
		emp_photo,
		emp_joro_id,
		emp_emp_id,
		emp_user_id,
		emp_modified_date
	)values(
		id_emp,
		nationalId,
		birthDate,
		marital,
		gender,
		hireDate,
		salariedFlag,
		vacation,
		sick,
		status,
		photoUrl,
		jobId,
		bosId,
		id_user,
		now()
	);
	
	insert into hr.employee_pay_history(
		ephi_emp_id,
		ephi_rate_change_date,
		ephi_rate_salary,
		ephi_pay_frequence,
		ephi_modified_date
	) values(
		id_emp,
		now(),
		salary,
		frequentlyPay,
		now()
	);
	
	insert into hr.employee_department_history(
		edhi_emp_id,
		edhi_start_date,
		edhi_modified_date,
		edhi_dept_id,
		edhi_shift_id
	) values(
		id_emp,
		startDept,
		now(),
		departmentId,
		shiftId
	);
	commit;
end; $$;


ALTER PROCEDURE hr.addemployee(IN fullname character varying, IN photourl character varying, IN nationalid character varying, IN birthdate date, IN hiredate date, IN marital character varying, IN gender character varying, IN salariedflag character varying, IN status integer, IN vacation integer, IN sick integer, IN jobid integer, IN salary integer, IN frequentlypay integer, IN departmentid integer, IN startdept date, IN shiftid integer, IN bosid integer) OWNER TO postgres;

--
-- Name: empprofile(); Type: FUNCTION; Schema: hr; Owner: postgres
--

CREATE FUNCTION hr.empprofile() RETURNS TABLE(id integer, nationalid character varying, fullname character varying, birthdate date, hire timestamp without time zone, status smallint)
    LANGUAGE plpgsql
    AS $$
begin 
	return query
	select 
		emp_id,
		emp_national_id,
		user_full_name,
		emp_birth_date,
		emp_hire_date,
		emp_current_flag
	from
		users.users u join hr.work_orders wo on wo.woro_user_id = u.user_id
		join hr.work_order_detail wod on wod.wode_woro_id = wo.woro_id
		join hr.employee emp on emp.emp_id = wod.wode_emp_id;
end; $$;


ALTER FUNCTION hr.empprofile() OWNER TO postgres;

--
-- Name: getid(); Type: FUNCTION; Schema: hr; Owner: postgres
--

CREATE FUNCTION hr.getid() RETURNS integer
    LANGUAGE plpgsql
    AS $$
begin 
	return (
		select setval('hr."employee_emp_id_seq"',
					 (select coalesce(max(emp_id), 0) from hr.employee) + 1
					 )
	);
end; $$;


ALTER FUNCTION hr.getid() OWNER TO postgres;

--
-- Name: profiledetail(integer); Type: FUNCTION; Schema: hr; Owner: postgres
--

CREATE FUNCTION hr.profiledetail(id integer) RETURNS TABLE(userid integer, empid integer, nation character varying, fullname character varying, birthdate date, hiredate timestamp without time zone, marital character varying, gender character varying, salariedflag character varying, status smallint, vacationhours smallint, sickleave smallint, photourl character varying, jobname character varying, salary money, frequentlypay smallint, departname character varying, deptstart timestamp without time zone, deptend timestamp without time zone, shifting character varying, shiftstart time without time zone, shiftend time without time zone)
    LANGUAGE plpgsql
    AS $$
begin
	return query
	select
		user_id,
		emp_id,
		emp_national_id,
		user_full_name,
		emp_birth_date,
		emp_hire_date,
		emp_marital_status,
		emp_gender,
		emp_salaried_flag,
		emp_current_flag,
		emp_vacation_hours,
		emp_sickleave_hourse,
		emp_photo,
		joro_name,
		ephi_rate_salary,
		ephi_pay_frequence,
		dept_name,
		edhi_start_date,
		edhi_end_date,
		shift_name,
		shift_start_time,
		shift_end_time
	from
		users.users join hr.employee on user_id = emp_user_id
		join hr.employee_pay_history pay on emp_id = pay.ephi_emp_id
		join hr.employee_department_history edh on emp_id = edh.edhi_emp_id
		join hr.department dpt on edh.edhi_dept_id = dpt.dept_id
		join hr.shift sh on edh.edhi_shift_id = sh.shift_id
		join hr.job_role job on emp_joro_id = job.joro_id 
	where emp_id = id;
end; $$;


ALTER FUNCTION hr.profiledetail(id integer) OWNER TO postgres;

--
-- Name: updateemp(integer, integer, character varying, character varying, date, date, character varying, character varying, character varying, integer, integer, integer, integer, integer, integer, integer); Type: PROCEDURE; Schema: hr; Owner: postgres
--

CREATE PROCEDURE hr.updateemp(IN userid integer, IN empid integer, IN fullname character varying, IN nationalid character varying, IN birthdate date, IN hiredate date, IN marital character varying, IN gender character varying, IN salariedflag character varying, IN status integer, IN vacation integer, IN sick integer, IN jobid integer, IN salary integer, IN frequentlypay integer, IN departmentid integer)
    LANGUAGE plpgsql
    AS $$
begin
	update users.users
		set 
			user_full_name = fullName,
			user_modified_date = now()
		where user_id = userId;
	
	update hr.employee
		set
			emp_national_id = nationalId,
			emp_birth_date = birthDate,
			emp_marital_status = marital,
			emp_gender = gender,
			emp_hire_date = hireDate,
			emp_salaried_flag = salariedFlag,
			emp_vacation_hours = vacation,
			emp_sickleave_hourse = sick,
			emp_current_flag = status,
			emp_joro_id	= jobId,
			emp_modified_date = now()
		where emp_id = empId;
		
	update hr.employee_department_history
		set
			edhi_dept_id = departmentId,
			edhi_modified_date = now()
		where edhi_emp_id = empId;
	
	update hr.employee_pay_history
		set
			ephi_rate_salary = salary,
			ephi_pay_frequence = frequentlyPay,
			ephi_modified_date = now()
		where ephi_emp_id = empId;
end; $$;


ALTER PROCEDURE hr.updateemp(IN userid integer, IN empid integer, IN fullname character varying, IN nationalid character varying, IN birthdate date, IN hiredate date, IN marital character varying, IN gender character varying, IN salariedflag character varying, IN status integer, IN vacation integer, IN sick integer, IN jobid integer, IN salary integer, IN frequentlypay integer, IN departmentid integer) OWNER TO postgres;

--
-- Name: wodeid(); Type: FUNCTION; Schema: hr; Owner: postgres
--

CREATE FUNCTION hr.wodeid() RETURNS integer
    LANGUAGE plpgsql
    AS $$
begin 
	return (
		select setval('hr."work_order_detail_wode_id_seq"',
					 (select coalesce(max(wode_id), 0) from hr.work_order_detail) + 1
					 )
	);
end; $$;


ALTER FUNCTION hr.wodeid() OWNER TO postgres;

--
-- Name: woid(); Type: FUNCTION; Schema: hr; Owner: postgres
--

CREATE FUNCTION hr.woid() RETURNS integer
    LANGUAGE plpgsql
    AS $$
begin 
	return (
		select setval('hr."work_orders_woro_id_seq"',
					 (select coalesce(max(woro_id), 0) from hr.work_orders) + 1
					 )
	);
end; $$;


ALTER FUNCTION hr.woid() OWNER TO postgres;

--
-- Name: getcagroid(); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.getcagroid() RETURNS integer
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN (
		SELECT setval('master."category_group_cagro_id_seq"',
					  (SELECT COALESCE(MAX(cagro_id), 0) FROM master.category_group) + 1
		)
	);

END; $$;


ALTER FUNCTION master.getcagroid() OWNER TO postgres;

--
-- Name: getpoca(); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.getpoca() RETURNS TABLE(poca_poli_id integer, poli_id integer, poli_name character varying, poli_description character varying, poca_cagro_id integer, cagro_id integer, cagro_name character varying, cagro_description character varying, cagro_type character varying, cagro_icon character varying, cagro_icon_url character varying, poca_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
RETURN QUERY 
SELECT
pcg.poca_poli_id,
po.poli_id,
po.poli_name,
po.poli_description,
pcg.poca_cagro_id,
cg.cagro_id,
cg.cagro_name,
cg.cagro_description,
cg.cagro_type,
cg.cagro_icon,
cg.cagro_icon_url,
pcg.poca_id

FROM 
master.policy_category_group pcg
JOIN 
master.category_group cg ON pcg.poca_cagro_id = cg.cagro_id
JOIN
master.policy po ON pcg.poca_poli_id = po.poli_id;
END;
$$;


ALTER FUNCTION master.getpoca() OWNER TO postgres;

--
-- Name: locationsall(); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.locationsall() RETURNS TABLE(region_code integer, region_name character varying, country_id integer, country_name character varying, country_region_id integer, prov_id integer, prov_name character varying, prov_country_id integer, addr_id integer, addr_line2 character varying, addr_line1 character varying, addr_prov_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY 
		--LOCATIONS--
		SELECT rg.region_code, rg.region_name, co.country_id, co.country_name, co.country_region_id,
		pr.prov_id, pr.prov_name, pr.prov_country_id, ad.addr_id, ad.addr_line2, ad.addr_line1, ad.addr_prov_id
		FROM master.country co
		JOIN master.regions rg ON co.country_region_id = rg.region_code
		JOIN master.proviences pr ON pr.prov_country_id = co.country_id
		JOIN master.address ad ON ad.addr_prov_id = pr.prov_id;
END;
$$;


ALTER FUNCTION master.locationsall() OWNER TO postgres;

--
-- Name: locationsfunctionsrcpa(); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.locationsfunctionsrcpa() RETURNS TABLE(region_code integer, region_name character varying, country_id integer, country_name character varying, prov_id integer, prov_name character varying, addr_id integer, addr_line2 character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY 
		--LOCATIONS--
		SELECT rg.region_code, rg.region_name, co.country_id, co.country_name, pr.prov_id, pr.prov_name, ad.addr_id, ad.addr_line2
		FROM master.country co
		JOIN master.regions rg ON co.country_region_id = rg.region_code
		JOIN master.proviences pr ON pr.prov_country_id = co.country_id
		JOIN master.address ad ON ad.addr_prov_id = pr.prov_id;
END;
$$;


ALTER FUNCTION master.locationsfunctionsrcpa() OWNER TO postgres;

--
-- Name: locationsrc(); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.locationsrc() RETURNS TABLE(region_code integer, region_name character varying, country_id integer, country_name character varying, country_region_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY 
		--LOCATIONS--
		SELECT rg.region_code, rg.region_name,
		 co.country_id, co.country_name, co.country_region_id
		FROM master.country co
		JOIN master.regions rg ON co.country_region_id = rg.region_code

		order by region_code;
END;
$$;


ALTER FUNCTION master.locationsrc() OWNER TO postgres;

--
-- Name: locationsrcp(); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.locationsrcp() RETURNS TABLE(region_code integer, region_name character varying, country_id integer, country_name character varying, country_region_id integer, prov_id integer, prov_name character varying, prov_country_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY 
		--LOCATIONS--
		SELECT rg.region_code, rg.region_name, co.country_id, co.country_name,co.country_region_id,
		pr.prov_id, pr.prov_name, pr.prov_country_id
		FROM master.country co
		JOIN master.regions rg ON co.country_region_id = rg.region_code
		JOIN master.proviences pr ON pr.prov_country_id = co.country_id
		order by region_code;
END;
$$;


ALTER FUNCTION master.locationsrcp() OWNER TO postgres;

--
-- Name: getentityid(); Type: FUNCTION; Schema: payment; Owner: postgres
--

CREATE FUNCTION payment.getentityid() RETURNS integer
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN (
		SELECT setval('payment."entitys_entity_id_seq"',
					  (SELECT COALESCE(MAX(entity_id), 0) FROM payment.entitys) + 1
		)
	);

END; $$;


ALTER FUNCTION payment.getentityid() OWNER TO postgres;

--
-- Name: insertbank(text, text); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.insertbank(IN code text, IN name text)
    LANGUAGE plpgsql
    AS $$

DECLARE
	ID int;
	
BEGIN
	ID := payment.getEntityId();
	INSERT INTO payment.entitys(entity_id)
		VALUES (ID);
	INSERT INTO payment.bank(bank_entity_id, bank_code, bank_name, bank_modified_date)
		VALUES (ID, Code, Name, Now());

END; $$;


ALTER PROCEDURE payment.insertbank(IN code text, IN name text) OWNER TO postgres;

--
-- Name: insertonetrx(character varying, integer, integer, character varying, character varying, character varying, numeric, numeric, integer); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.insertonetrx(IN patr_trx_id character varying, IN patr_debet integer, IN patr_credit integer, IN patr_type character varying, IN patr_note character varying, IN patr_order_number character varying, IN patr_source_id numeric, IN patr_target_id numeric, IN patr_user_id integer)
    LANGUAGE plpgsql
    AS $$
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
END;$$;


ALTER PROCEDURE payment.insertonetrx(IN patr_trx_id character varying, IN patr_debet integer, IN patr_credit integer, IN patr_type character varying, IN patr_note character varying, IN patr_order_number character varying, IN patr_source_id numeric, IN patr_target_id numeric, IN patr_user_id integer) OWNER TO postgres;

--
-- Name: insertpaga(text, text); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.insertpaga(IN code text, IN name text)
    LANGUAGE plpgsql
    AS $$

DECLARE
	ID int;
	
BEGIN
	ID := payment.getEntityId();
	INSERT INTO payment.entitys(entity_id)
		VALUES (ID);
	INSERT INTO payment.payment_gateway(paga_entity_id, paga_code, paga_name, paga_modified_date)
		VALUES (ID, Code, Name, Now());

END; $$;


ALTER PROCEDURE payment.insertpaga(IN code text, IN name text) OWNER TO postgres;

--
-- Name: insertpaymenttrx(integer, integer, character varying, character varying, text, text, character varying); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.insertpaymenttrx(IN userid integer, IN amount integer, IN sourcenumber character varying, IN targetnumber character varying, IN trxtype text DEFAULT NULL::text, IN paytype text DEFAULT NULL::text, IN ordernumber character varying DEFAULT NULL::character varying)
    LANGUAGE plpgsql
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
			UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;	
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
			UPDATE payment.user_accounts SET usac_saldo = usac_saldo + amount WHERE usac_account_number = targetNumber;
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
END; $$;


ALTER PROCEDURE payment.insertpaymenttrx(IN userid integer, IN amount integer, IN sourcenumber character varying, IN targetnumber character varying, IN trxtype text, IN paytype text, IN ordernumber character varying) OWNER TO postgres;

--
-- Name: newemployee(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.newemployee() RETURNS TABLE(id integer, nationalid character varying, fullname character varying, birthdate date, hire timestamp without time zone, status smallint)
    LANGUAGE plpgsql
    AS $$
begin
	return query
	select 
		emp_id,
		emp_national_id,
		user_full_name,
		emp_birth_date,
		emp_hire_date,
		emp_current_flag
	from
		users.users u join hr.work_orders wo on wo.woro_user_id = u.user_id
		join hr.work_order_detail wod on wod.wode_woro_id = wo.woro_id
		join hr.employee emp on emp.emp_id = wod.wode_emp_id
	where emp_id = hr.getId() - 1;
end; $$;


ALTER FUNCTION public.newemployee() OWNER TO postgres;

--
-- Name: getallpode(); Type: FUNCTION; Schema: purchasing; Owner: postgres
--

CREATE FUNCTION purchasing.getallpode() RETURNS TABLE(podhe_id integer, podhe_pohe_number character varying, podhe_order_qty smallint, podhe_price money, podhe_line_total money, podhe_received_qty numeric, podhe_rejected_qty numeric, podhe_stocked_qty numeric, podhe_stock_name character varying)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY 
	SELECT 
		purchasing.purchase_order_detail.pode_id,
		purchasing.purchase_order_header.pohe_number,
		purchasing.purchase_order_detail.pode_order_qty,
		purchasing.purchase_order_detail.pode_price,
		purchasing.purchase_order_detail.pode_line_total,
		purchasing.purchase_order_detail.pode_received_qty,
		purchasing.purchase_order_detail.pode_rejected_qty,
		purchasing.purchase_order_detail.pode_stocked_qty,
		purchasing.stocks.stock_name
	FROM purchasing.purchase_order_detail
		JOIN purchasing.purchase_order_header on purchasing.purchase_order_detail.pode_pohe_id = purchasing.purchase_order_header.pohe_id
		JOIN purchasing.stocks on purchasing.purchase_order_detail.pode_stock_id = purchasing.stocks.stock_id
	GROUP BY 
		purchasing.purchase_order_detail.pode_id,
		purchasing.purchase_order_header.pohe_number,
		purchasing.purchase_order_detail.pode_order_qty,
		purchasing.purchase_order_detail.pode_price,
		purchasing.purchase_order_detail.pode_line_total,
		purchasing.purchase_order_detail.pode_received_qty,
		purchasing.purchase_order_detail.pode_rejected_qty,
		purchasing.purchase_order_detail.pode_stocked_qty,
		purchasing.stocks.stock_name;
END;$$;


ALTER FUNCTION purchasing.getallpode() OWNER TO postgres;

--
-- Name: getallpohevendor(); Type: FUNCTION; Schema: purchasing; Owner: postgres
--

CREATE FUNCTION purchasing.getallpohevendor() RETURNS TABLE(pove_id integer, pove_number character varying, pove_date timestamp without time zone, pove_name character varying, pove_status integer, pove_subtotal money, pove_total_amount money)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY 
	SELECT 
		purchasing.purchase_order_header.pohe_id,
		purchasing.purchase_order_header.pohe_number,
		purchasing.purchase_order_header.pohe_order_date,
		purchasing.vendor.vendor_name, 
		purchasing.purchase_order_header.pohe_status,
		purchasing.purchase_order_header.pohe_subtotal,
		purchasing.purchase_order_header.pohe_total_amount
	FROM purchasing.purchase_order_header
		JOIN purchasing.vendor on purchasing.purchase_order_header.pohe_vendor_id = purchasing.vendor.vendor_id
	GROUP BY 
		purchasing.purchase_order_header.pohe_id, 
		purchasing.vendor.vendor_name, 
		purchasing.purchase_order_header.pohe_number, 
		purchasing.purchase_order_header.pohe_order_date, 
		purchasing.purchase_order_header.pohe_total_amount;
END;$$;


ALTER FUNCTION purchasing.getallpohevendor() OWNER TO postgres;

--
-- Name: getallstod(); Type: FUNCTION; Schema: purchasing; Owner: postgres
--

CREATE FUNCTION purchasing.getallstod() RETURNS TABLE(stockdet_id integer, stockdet_name character varying, stockdet_number character varying, stockdet_status character varying, stockdet_notes character varying, stockdet_facilities character varying, stockdet_pohe_number character varying)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY 
	SELECT 
		purchasing.stock_detail.stod_id,
		purchasing.stocks.stock_name,
		purchasing.stock_detail.stod_barcode_number,
		purchasing.stock_detail.stod_status,
		purchasing.stock_detail.stod_notes,
		hotel.facilities.faci_name,
		purchasing.purchase_order_header.pohe_number
	FROM purchasing.stock_detail
		JOIN purchasing.stocks on purchasing.stock_detail.stod_stock_id = purchasing.stocks.stock_id
		JOIN hotel.facilities on purchasing.stock_detail.stod_faci_id = hotel.facilities.faci_id
		JOIN purchasing.purchase_order_header on purchasing.stock_detail.stod_pohe_id = purchasing.purchase_order_header.pohe_id
	GROUP BY 
		purchasing.stock_detail.stod_id,
		purchasing.stocks.stock_name,
		purchasing.stock_detail.stod_barcode_number,
		purchasing.stock_detail.stod_status,
		purchasing.stock_detail.stod_notes,
		hotel.facilities.faci_name,
		purchasing.purchase_order_header.pohe_number;
END;$$;


ALTER FUNCTION purchasing.getallstod() OWNER TO postgres;

--
-- Name: getallvendorstock(); Type: FUNCTION; Schema: purchasing; Owner: postgres
--

CREATE FUNCTION purchasing.getallvendorstock() RETURNS TABLE(vestock_id integer, vestock_vendor_id integer, vestock_name character varying, vestock_qty_stocked integer, vestock_qty_remaining integer, vestock_price money)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY 
	SELECT 
		purchasing.vendor_product.vepro_id,
		purchasing.vendor.vendor_id, 
		purchasing.stocks.stock_name, 
		purchasing.vendor_product.vepro_qty_stocked, 
		purchasing.vendor_product.vepro_qty_remaining, 
		purchasing.vendor_product.vepro_price
	FROM purchasing.vendor_product
		JOIN purchasing.vendor on purchasing.vendor_product.vepro_vendor_id = purchasing.vendor.vendor_id
		JOIN purchasing.stocks on purchasing.vendor_product.vepro_stock_id = purchasing.stocks.stock_id
	GROUP BY 
		purchasing.vendor_product.vepro_id,
		purchasing.vendor.vendor_id, 
		purchasing.stocks.stock_name, 
		purchasing.vendor_product.vepro_qty_stocked,
		purchasing.vendor_product.vepro_qty_remaining,
		purchasing.vendor_product.vepro_price;
END;$$;


ALTER FUNCTION purchasing.getallvendorstock() OWNER TO postgres;

--
-- Name: count_menu(integer, character varying); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.count_menu(faci_id integer, search_menu character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
	
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
	
	$$;


ALTER FUNCTION resto.count_menu(faci_id integer, search_menu character varying) OWNER TO postgres;

--
-- Name: count_menu_dashboard(character varying); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.count_menu_dashboard(search_menu character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
	
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
	$$;


ALTER FUNCTION resto.count_menu_dashboard(search_menu character varying) OWNER TO postgres;

--
-- Name: count_resto(); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.count_resto() RETURNS integer
    LANGUAGE plpgsql
    AS $$
	
	DECLARE
		counts int;
	
	BEGIN
		SELECT COUNT(*)
			FROM hotel.facilities
			WHERE hotel.facilities.faci_cagro_id = 2
		
		INTO counts;
		
		return counts;
	END;
	$$;


ALTER FUNCTION resto.count_resto() OWNER TO postgres;

--
-- Name: getphotomenu(integer); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.getphotomenu(remeid integer) RETURNS TABLE(rempid integer, rempthumbnailfilename text, rempphotofilename text, rempprimary bit, rempurl text, rempreme integer, remename text)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION resto.getphotomenu(remeid integer) OWNER TO postgres;

--
-- Name: isprimary(integer); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.isprimary(remeid integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
	
	DECLARE
		counts int;
	BEGIN
		SELECT COUNT(*) FROM resto.resto_menu_photos
		WHERE resto.resto_menu_photos.remp_reme_id = remeid
		INTO counts;
		
		return counts;
	END;
	$$;


ALTER FUNCTION resto.isprimary(remeid integer) OWNER TO postgres;

--
-- Name: listmenu(integer); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.listmenu(faciid integer) RETURNS TABLE(remeid integer, remename text, remedescription text, remeprice money, remestatus text, rempthumbnailfilename text, rempphotofilename text, rempprimary bit, rempurl text, remefaciid integer)
    LANGUAGE plpgsql
    AS $$
	
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
	$$;


ALTER FUNCTION resto.listmenu(faciid integer) OWNER TO postgres;

--
-- Name: listmenuuser(integer, character varying, integer, character varying); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.listmenuuser(faciid integer, search_menu character varying, currentpage integer, sort character varying) RETURNS TABLE(remeid integer, remename text, remedescription text, remeprice money, remestatus text, rempthumbnailfilename text, rempphotofilename text, rempprimary bit, rempurl text, remefaciid integer)
    LANGUAGE plpgsql
    AS $$
DECLARE 
	jumlah_row INT := 9;
	skip_row INT := (currentpage - 1) * jumlah_row;
	dataMenu CURSOR FOR (
		SELECT resto.resto_menus.reme_id,
			resto.resto_menus.reme_name,
			resto.resto_menus.reme_description,
			resto.resto_menus.reme_price,
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
				-- remeDiscount,
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
$$;


ALTER FUNCTION resto.listmenuuser(faciid integer, search_menu character varying, currentpage integer, sort character varying) OWNER TO postgres;

--
-- Name: ordermenuscomplete(text); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.ordermenuscomplete(ordernumber text) RETURNS TABLE(orme_id integer, orme_order_number character varying, orme_order_date date, orme_total_item integer, orme_total_discount money, orme_total_amount money, orme_pay_type character varying, orme_cardnumber text, orme_is_paid character varying, orme_modified_date date, orme_user_id integer, omde_id integer, orme_price money, orme_qty integer, orme_subtotal money, omde_orme_id integer, omde_reme_id integer, reme_name text, trx_number text, payment_type text)
    LANGUAGE plpgsql
    AS $$
	
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
	
$$;


ALTER FUNCTION resto.ordermenuscomplete(ordernumber text) OWNER TO postgres;

--
-- Name: orders(text, date, integer, integer, integer, character varying, text, integer); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.orders(ormeordernumber text, ormedate date, ormetotalitem integer, ormetotaldiscount integer, ormetotalamount integer, orme_pay_type character varying, ormeispaid text, ormeuserid integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION resto.orders(ormeordernumber text, ormedate date, ormetotalitem integer, ormetotaldiscount integer, ormetotalamount integer, orme_pay_type character varying, ormeispaid text, ormeuserid integer) OWNER TO postgres;

--
-- Name: resto_detail(integer); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.resto_detail(currentpage integer) RETURNS TABLE(hotel_id integer, hotel_name text, faci_id integer, faci_name text, faci_description text, fapho_thumbnail_filename text, fapho_primary boolean, fapho_url text)
    LANGUAGE plpgsql
    AS $$
	
	DECLARE
		jumlah_row INT := 10;
		skip_row INT := (currentpage - 1) * jumlah_row;
		resto CURSOR FOR (
			SELECT hotel.hotels.hotel_id,
				hotel.hotels.hotel_name,
				hotel.facilities.faci_id,
				hotel.facilities.faci_name,
				hotel.facilities.faci_description,
				hotel.facility_photo.fapho_photo_filename,
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
	$$;


ALTER FUNCTION resto.resto_detail(currentpage integer) OWNER TO postgres;

--
-- Name: restomenu_dashboard(text, integer); Type: FUNCTION; Schema: resto; Owner: postgres
--

CREATE FUNCTION resto.restomenu_dashboard(search_menu text, currentpage integer) RETURNS TABLE(reme_id integer, hotel_name text, faci_id integer, faci_name text, reme_name text, reme_description text, reme_price money, reme_status text, reme_modified_date date, remp_id integer, remp_primary bit, remp_url text)
    LANGUAGE plpgsql
    AS $$
	
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
	$$;


ALTER FUNCTION resto.restomenu_dashboard(search_menu text, currentpage integer) OWNER TO postgres;

--
-- Name: getuserdetail(character varying); Type: FUNCTION; Schema: users; Owner: postgres
--

CREATE FUNCTION users.getuserdetail(useremail character varying) RETURNS TABLE(user_id integer, user_full_name character varying, role_name character varying, user_type character varying, user_company_name character varying, uspro_job_title character varying, user_email character varying, user_phone_number character varying, uspa_passwordhash character varying, emp_photo character varying, usme_memb_name character varying, ubpo_total_points smallint, ubpo_bonus_type character, ubpo_created_on timestamp without time zone, usme_promote_date timestamp without time zone, usme_points smallint, usme_type character varying, uspro_national_id character varying, uspro_birth_date date, uspro_marital_status character, uspro_gender character)
    LANGUAGE plpgsql
    AS $$
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

END; $$;


ALTER FUNCTION users.getuserdetail(useremail character varying) OWNER TO postgres;

--
-- Name: register(character varying, character varying, character varying, character varying); Type: PROCEDURE; Schema: users; Owner: postgres
--

CREATE PROCEDURE users.register(IN userfullname character varying, IN useremail character varying, IN userphonenumber character varying, IN userpassword character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
  user_id integer;
  salt TEXT := gen_salt('bf');
    hashed_password TEXT := crypt(UserPassword, salt);
	
BEGIN
  INSERT INTO users.users ( user_full_name, user_email, user_phone_number,user_modified_date)
    VALUES ( UserFullName, UserEmail, UserPhoneNumber,now())
  RETURNING users.users.user_id INTO user_id;

  INSERT INTO users.user_password (
    uspa_user_id,
	  uspa_passwordhash,uspa_passwordsalt
  )
  VALUES (
    user_id,
    hashed_password,
    salt
  );
  
  INSERT INTO users.user_roles(
  usro_user_id,usro_role_id
  )
  VALUES (
  user_id,
	  1
  );
 INSERT INTO users.user_profiles (uspro_user_id, uspro_job_title, uspro_national_id, uspro_birt_date, uspro_martial_status, uspro_gender)
	VALUES (user_id, 'Unknown', '111111100011', now(), 'S', 'M');
	
 INSERT INTO users.user_members(usme_user_id,usme_memb_name,usme_promote_date,usme_points,usme_type )
	Values (user_id,'Silver',now(),00,'default');
	
 INSERT INTO users.user_bonus_points(ubpo_user_id,ubpo_total_points,ubpo_bonus_type,ubpo_created_on)
	values(user_id,5,'R',now());
	
	INSERT INTO hr.employee(emp_id)
	Values(user_id);
	
	
END;
$$;


ALTER PROCEDURE users.register(IN userfullname character varying, IN useremail character varying, IN userphonenumber character varying, IN userpassword character varying) OWNER TO postgres;

--
-- Name: users(); Type: FUNCTION; Schema: users; Owner: postgres
--

CREATE FUNCTION users.users() RETURNS integer
    LANGUAGE plpgsql
    AS $$
begin 
	return (
		select setval('users."users_user_id_seq"',
					 (select coalesce(max(user_id), 0) from users.users) + 1
					 )
	);
end; $$;


ALTER FUNCTION users.users() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: booking_order_detail; Type: TABLE; Schema: booking; Owner: postgres
--

CREATE TABLE booking.booking_order_detail (
    border_boor_id integer,
    borde_id integer NOT NULL,
    borde_checkin timestamp without time zone,
    borde_checkout timestamp without time zone,
    borde_adults integer,
    borde_kids integer,
    borde_price money,
    borde_extra money,
    borde_discount money,
    borde_tax money,
    borde_subtotal money,
    borde_faci_id integer
);


ALTER TABLE booking.booking_order_detail OWNER TO postgres;

--
-- Name: booking_order_detail_borde_id_seq; Type: SEQUENCE; Schema: booking; Owner: postgres
--

CREATE SEQUENCE booking.booking_order_detail_borde_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE booking.booking_order_detail_borde_id_seq OWNER TO postgres;

--
-- Name: booking_order_detail_borde_id_seq; Type: SEQUENCE OWNED BY; Schema: booking; Owner: postgres
--

ALTER SEQUENCE booking.booking_order_detail_borde_id_seq OWNED BY booking.booking_order_detail.borde_id;


--
-- Name: booking_order_detail_extra; Type: TABLE; Schema: booking; Owner: postgres
--

CREATE TABLE booking.booking_order_detail_extra (
    boex_id integer NOT NULL,
    boex_price money,
    boex_qty smallint,
    boex_subtotal money,
    boex_measure_unit character varying(50),
    boex_borde_id integer,
    boex_prit_id integer
);


ALTER TABLE booking.booking_order_detail_extra OWNER TO postgres;

--
-- Name: booking_order_detail_extra_boex_id_seq; Type: SEQUENCE; Schema: booking; Owner: postgres
--

CREATE SEQUENCE booking.booking_order_detail_extra_boex_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE booking.booking_order_detail_extra_boex_id_seq OWNER TO postgres;

--
-- Name: booking_order_detail_extra_boex_id_seq; Type: SEQUENCE OWNED BY; Schema: booking; Owner: postgres
--

ALTER SEQUENCE booking.booking_order_detail_extra_boex_id_seq OWNED BY booking.booking_order_detail_extra.boex_id;


--
-- Name: booking_orders; Type: TABLE; Schema: booking; Owner: postgres
--

CREATE TABLE booking.booking_orders (
    boor_id integer NOT NULL,
    boor_order_number character varying(20),
    boor_order_date timestamp without time zone,
    boor_arrival_date timestamp without time zone,
    boor_total_room smallint,
    boor_total_guest smallint,
    boor_discount money,
    boor_total_tax money,
    boor_total_amount money,
    boor_down_payment money,
    boor_pay_type character(2),
    boor_is_paid character(2),
    boor_type character varying(15),
    boor_cardnumber character varying(25),
    boor_member_type character varying(15),
    boor_status character varying(15),
    boor_user_id integer,
    boor_hotel_id integer
);


ALTER TABLE booking.booking_orders OWNER TO postgres;

--
-- Name: booking_orders_boor_id_seq; Type: SEQUENCE; Schema: booking; Owner: postgres
--

CREATE SEQUENCE booking.booking_orders_boor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE booking.booking_orders_boor_id_seq OWNER TO postgres;

--
-- Name: booking_orders_boor_id_seq; Type: SEQUENCE OWNED BY; Schema: booking; Owner: postgres
--

ALTER SEQUENCE booking.booking_orders_boor_id_seq OWNED BY booking.booking_orders.boor_id;


--
-- Name: facilities; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.facilities (
    faci_id integer NOT NULL,
    faci_name character varying(125),
    faci_description character varying(255),
    faci_max_number integer,
    faci_measure_unit character varying(15),
    faci_room_number character varying(6),
    faci_startdate timestamp without time zone,
    faci_enddate timestamp without time zone,
    faci_low_price money,
    faci_high_price money,
    faci_rate_price money,
    faci_discount money,
    faci_tax_rate money,
    faci_modified_date timestamp without time zone,
    faci_cagro_id integer,
    faci_hotel_id integer
);


ALTER TABLE hotel.facilities OWNER TO postgres;

--
-- Name: hotels; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.hotels (
    hotel_id integer NOT NULL,
    hotel_name character varying(85),
    hotel_description character varying(500),
    hotel_rating_star smallint,
    hotel_phonenumber character varying(25),
    hotel_modified_date timestamp without time zone,
    hotel_addr_id integer
);


ALTER TABLE hotel.hotels OWNER TO postgres;

--
-- Name: bank; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.bank (
    bank_entity_id integer NOT NULL,
    bank_code character varying(10),
    bank_name character varying(55),
    bank_modified_date timestamp without time zone
);


ALTER TABLE payment.bank OWNER TO postgres;

--
-- Name: payment_gateway; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.payment_gateway (
    paga_entity_id integer NOT NULL,
    paga_code character varying(10),
    paga_name character varying(55),
    paga_modified_date timestamp without time zone
);


ALTER TABLE payment.payment_gateway OWNER TO postgres;

--
-- Name: payment_transaction; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.payment_transaction (
    patr_id integer NOT NULL,
    patr_trx_id character varying(55),
    patr_debet numeric,
    patr_credit numeric,
    patr_type character(3),
    patr_note character varying(255),
    patr_modified_date timestamp without time zone,
    patr_order_number character varying(55),
    patr_source_id numeric,
    patr_target_id numeric,
    patr_trx_number_ref character varying(55),
    patr_user_id integer
);


ALTER TABLE payment.payment_transaction OWNER TO postgres;

--
-- Name: user_accounts; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.user_accounts (
    usac_entity_id integer NOT NULL,
    usac_user_id integer NOT NULL,
    usac_account_number character varying(25),
    usac_saldo numeric,
    usac_type character varying(15),
    usac_expmonth smallint,
    usac_expyear smallint,
    usac_secure_code character varying,
    usac_modified_date timestamp without time zone
);


ALTER TABLE payment.user_accounts OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users (
    user_id integer NOT NULL,
    user_full_name character varying(55),
    user_type character varying(15),
    user_company_name character varying(255),
    user_email character varying(255),
    user_phone_number character varying(25),
    user_modified_date timestamp without time zone
);


ALTER TABLE users.users OWNER TO postgres;

--
-- Name: user_payment_methods; Type: VIEW; Schema: payment; Owner: postgres
--

CREATE VIEW payment.user_payment_methods AS
 SELECT acc.usac_user_id AS "userId",
    u.user_full_name AS "fullName",
    acc.usac_type AS "paymentType",
        CASE
            WHEN ((acc.usac_type)::text <> 'Payment'::text) THEN b.bank_name
            ELSE dr.paga_name
        END AS "paymentName",
    acc.usac_account_number AS "accountNumber",
    acc.usac_saldo AS balance,
    acc.usac_expmonth AS "expMonth",
    acc.usac_expyear AS "expYear",
    acc.usac_secure_code AS "securedKey"
   FROM (((payment.user_accounts acc
     LEFT JOIN payment.payment_gateway dr ON ((acc.usac_entity_id = dr.paga_entity_id)))
     LEFT JOIN payment.bank b ON ((acc.usac_entity_id = b.bank_entity_id)))
     LEFT JOIN users.users u ON ((acc.usac_user_id = u.user_id)));


ALTER TABLE payment.user_payment_methods OWNER TO postgres;

--
-- Name: order_menus; Type: TABLE; Schema: resto; Owner: postgres
--

CREATE TABLE resto.order_menus (
    orme_id integer NOT NULL,
    orme_order_number character varying(20),
    orme_order_date timestamp without time zone,
    orme_total_item smallint,
    orme_total_discount money,
    orme_total_amount money,
    orme_pay_type character(2),
    orme_cardnumber character varying(25),
    orme_is_paid character(2),
    orme_modified_date timestamp without time zone,
    orme_user_id integer
);


ALTER TABLE resto.order_menus OWNER TO postgres;

--
-- Name: user_transactions; Type: VIEW; Schema: payment; Owner: postgres
--

CREATE VIEW payment.user_transactions AS
 SELECT p.patr_id AS "transactionId",
    p.patr_trx_id AS "transactionNumber",
    to_char(p.patr_modified_date, 'DD Mon YYYY'::text) AS "trxDate",
    to_char(p.patr_modified_date, 'HH12:MI AM'::text) AS "trxTime",
        CASE
            WHEN (p.patr_type = 'ORM'::bpchar) THEN ( SELECT order_menus.orme_is_paid
               FROM resto.order_menus
              WHERE ((order_menus.orme_order_number)::text = (p.patr_order_number)::text))
            WHEN (p.patr_type = 'BO'::bpchar) THEN ( SELECT booking_orders.boor_is_paid
               FROM booking.booking_orders
              WHERE ((booking_orders.boor_order_number)::text = (p.patr_order_number)::text))
            ELSE 'Completed'::bpchar
        END AS status,
        CASE
            WHEN (p.patr_type = 'ORM'::bpchar) THEN ( SELECT order_menus.orme_pay_type
               FROM resto.order_menus
              WHERE ((order_menus.orme_order_number)::text = (p.patr_order_number)::text))
            WHEN (p.patr_type = 'BO'::bpchar) THEN ( SELECT booking_orders.boor_is_paid
               FROM booking.booking_orders
              WHERE ((booking_orders.boor_order_number)::text = (p.patr_order_number)::text))
            ELSE NULL::bpchar
        END AS "payType",
    p.patr_debet AS debit,
    p.patr_credit AS credit,
    p.patr_type AS "transactionType",
    p.patr_note AS "transactionNote",
    p.patr_order_number AS "orderNumber",
    p.patr_source_id AS "sourceNumber",
    p.patr_target_id AS "targetNumber",
        CASE
            WHEN (p.patr_type = 'TP'::bpchar) THEN ( SELECT user_payment_methods."paymentName"
               FROM payment.user_payment_methods
              WHERE ((user_payment_methods."accountNumber")::text = (p.patr_target_id)::text))
            ELSE 'Realta Group'::character varying
        END AS "targetPaymentName",
    ( SELECT user_payment_methods."paymentName"
           FROM payment.user_payment_methods
          WHERE ((user_payment_methods."accountNumber")::text = (p.patr_source_id)::text)) AS "sourcePaymentName",
    p.patr_trx_number_ref AS "transactionRef",
    p.patr_user_id AS "userId",
    u.user_full_name AS "userFullName"
   FROM (payment.payment_transaction p
     JOIN users.users u ON ((u.user_id = p.patr_user_id)))
  ORDER BY p.patr_modified_date DESC;


ALTER TABLE payment.user_transactions OWNER TO postgres;

--
-- Name: user_members; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.user_members (
    usme_user_id integer NOT NULL,
    usme_memb_name character varying(15),
    usme_promote_date timestamp without time zone,
    usme_points smallint,
    usme_type character varying(15)
);


ALTER TABLE users.user_members OWNER TO postgres;

--
-- Name: getbookinginvoice; Type: VIEW; Schema: booking; Owner: postgres
--

CREATE VIEW booking.getbookinginvoice AS
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
    to_char(borde.borde_checkin, 'DD Mon YYYY'::text) AS check_in_date,
    to_char(borde.borde_checkout, 'DD Mon YYYY'::text) AS check_out_date,
    (borde.borde_adults + borde.borde_kids) AS total_guest,
    borde.borde_adults,
    borde.borde_kids,
    borde.borde_price,
    borde.borde_discount,
    borde.borde_subtotal,
    hotels.hotel_name,
    faci.faci_name,
    patr.patr_trx_id,
    patr.patr_modified_date,
    ( SELECT user_transactions."sourcePaymentName"
           FROM payment.user_transactions
          WHERE ((user_transactions."orderNumber")::text = (boor.boor_order_number)::text)) AS "payment_Type",
        CASE
            WHEN (boor.boor_is_paid = 'P'::bpchar) THEN 'Paid'::text
            WHEN (boor.boor_is_paid = 'DP'::bpchar) THEN 'Down Payment'::text
            WHEN (boor.boor_is_paid = 'R'::bpchar) THEN 'Refund'::text
            ELSE NULL::text
        END AS boor_paid
   FROM ((((((users.users users
     JOIN users.user_members usme ON ((users.user_id = usme.usme_user_id)))
     JOIN booking.booking_orders boor ON ((users.user_id = boor.boor_user_id)))
     JOIN booking.booking_order_detail borde ON ((boor.boor_id = borde.border_boor_id)))
     JOIN hotel.facilities faci ON ((borde.borde_faci_id = faci.faci_id)))
     JOIN hotel.hotels hotels ON ((boor.boor_hotel_id = hotels.hotel_id)))
     JOIN payment.payment_transaction patr ON (((boor.boor_order_number)::text = (patr.patr_order_number)::text)))
  ORDER BY patr.patr_modified_date DESC;


ALTER TABLE booking.getbookinginvoice OWNER TO postgres;

--
-- Name: special_offer_coupons; Type: TABLE; Schema: booking; Owner: postgres
--

CREATE TABLE booking.special_offer_coupons (
    soco_id integer NOT NULL,
    soco_borde_id integer,
    soco_spof_id integer
);


ALTER TABLE booking.special_offer_coupons OWNER TO postgres;

--
-- Name: special_offers; Type: TABLE; Schema: booking; Owner: postgres
--

CREATE TABLE booking.special_offers (
    spof_id integer NOT NULL,
    spof_name character varying(55),
    spof_description character varying(255),
    spof_type character varying(50),
    spof_discount money,
    spof_start_date timestamp without time zone,
    spof_end_date timestamp without time zone,
    spof_min_qty integer,
    spof_max_qty integer,
    spof_modified_date timestamp without time zone
);


ALTER TABLE booking.special_offers OWNER TO postgres;

--
-- Name: getspecialoffers; Type: VIEW; Schema: booking; Owner: postgres
--

CREATE VIEW booking.getspecialoffers AS
 SELECT spof.spof_id AS "spofId",
    spof.spof_name AS "spofName",
    spof.spof_description AS "spofDescription",
    spof.spof_type AS "spofType",
    spof.spof_discount AS "spofDiscount",
    spof.spof_start_date AS "spofStartDate",
    spof.spof_end_date AS "spofEndDate",
    spof.spof_min_qty AS "spofMinQty",
    spof.spof_max_qty AS "spofMaxQty",
    spof.spof_modified_date AS "spofModifiedDate"
   FROM (booking.special_offers spof
     LEFT JOIN ( SELECT special_offer_coupons.soco_spof_id,
            count(special_offer_coupons.soco_spof_id) AS socount
           FROM booking.special_offer_coupons
          GROUP BY special_offer_coupons.soco_spof_id) soco ON ((spof.spof_id = soco.soco_spof_id)))
  WHERE ((spof.spof_start_date <= CURRENT_TIMESTAMP) AND (spof.spof_end_date >= CURRENT_TIMESTAMP) AND ((spof.spof_max_qty > COALESCE(soco.socount, (0)::bigint)) OR (soco.socount IS NULL)));


ALTER TABLE booking.getspecialoffers OWNER TO postgres;

--
-- Name: special_offer_coupons_soco_id_seq; Type: SEQUENCE; Schema: booking; Owner: postgres
--

CREATE SEQUENCE booking.special_offer_coupons_soco_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE booking.special_offer_coupons_soco_id_seq OWNER TO postgres;

--
-- Name: special_offer_coupons_soco_id_seq; Type: SEQUENCE OWNED BY; Schema: booking; Owner: postgres
--

ALTER SEQUENCE booking.special_offer_coupons_soco_id_seq OWNED BY booking.special_offer_coupons.soco_id;


--
-- Name: special_offers_spof_id_seq; Type: SEQUENCE; Schema: booking; Owner: postgres
--

CREATE SEQUENCE booking.special_offers_spof_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE booking.special_offers_spof_id_seq OWNER TO postgres;

--
-- Name: special_offers_spof_id_seq; Type: SEQUENCE OWNED BY; Schema: booking; Owner: postgres
--

ALTER SEQUENCE booking.special_offers_spof_id_seq OWNED BY booking.special_offers.spof_id;


--
-- Name: user_breakfeast; Type: TABLE; Schema: booking; Owner: postgres
--

CREATE TABLE booking.user_breakfeast (
    usbr_borde_id integer NOT NULL,
    usbr_modified_date timestamp without time zone NOT NULL,
    usbr_total_vacant smallint
);


ALTER TABLE booking.user_breakfeast OWNER TO postgres;

--
-- Name: facilities_faci_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.facilities_faci_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hotel.facilities_faci_id_seq OWNER TO postgres;

--
-- Name: facilities_faci_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.facilities_faci_id_seq OWNED BY hotel.facilities.faci_id;


--
-- Name: facility_photo; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.facility_photo (
    fapho_faci_id integer,
    fapho_id integer NOT NULL,
    fapho_thumbnail_filename character varying(125),
    fapho_photo_filename character varying(125),
    fapho_primary boolean,
    fapho_url character varying(255),
    fapho_modified_date timestamp without time zone
);


ALTER TABLE hotel.facility_photo OWNER TO postgres;

--
-- Name: facility_photo_fapho_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.facility_photo_fapho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hotel.facility_photo_fapho_id_seq OWNER TO postgres;

--
-- Name: facility_photo_fapho_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.facility_photo_fapho_id_seq OWNED BY hotel.facility_photo.fapho_id;


--
-- Name: facility_price_history; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.facility_price_history (
    faph_faci_id integer,
    faph_id integer NOT NULL,
    faph_startdate timestamp without time zone,
    faph_enddate timestamp without time zone,
    faph_low_price money,
    faph_high_price money,
    faph_rate_price money,
    faph_discount money,
    faph_tax_rate money,
    faph_modified_date timestamp without time zone,
    faph_user_id integer
);


ALTER TABLE hotel.facility_price_history OWNER TO postgres;

--
-- Name: facility_price_history_faph_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.facility_price_history_faph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hotel.facility_price_history_faph_id_seq OWNER TO postgres;

--
-- Name: facility_price_history_faph_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.facility_price_history_faph_id_seq OWNED BY hotel.facility_price_history.faph_id;


--
-- Name: hotel_reviews; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.hotel_reviews (
    hore_id integer NOT NULL,
    hore_user_review character varying(125),
    hore_rating smallint,
    hore_created_on timestamp without time zone,
    hore_user_id integer,
    hore_hotel_id integer
);


ALTER TABLE hotel.hotel_reviews OWNER TO postgres;

--
-- Name: hotel_reviews_hore_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.hotel_reviews_hore_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hotel.hotel_reviews_hore_id_seq OWNER TO postgres;

--
-- Name: hotel_reviews_hore_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.hotel_reviews_hore_id_seq OWNED BY hotel.hotel_reviews.hore_id;


--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.hotels_hotel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hotel.hotels_hotel_id_seq OWNER TO postgres;

--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.hotels_hotel_id_seq OWNED BY hotel.hotels.hotel_id;


--
-- Name: userreview; Type: VIEW; Schema: hotel; Owner: postgres
--

CREATE VIEW hotel.userreview AS
 SELECT hr.hore_hotel_id,
    u.user_full_name,
    u.user_email,
    hr.hore_user_review,
    hr.hore_created_on,
    hr.hore_rating
   FROM (hotel.hotel_reviews hr
     JOIN users.users u ON ((hr.hore_user_id = u.user_id)));


ALTER TABLE hotel.userreview OWNER TO postgres;

--
-- Name: viewhotel; Type: VIEW; Schema: hotel; Owner: postgres
--

CREATE VIEW hotel.viewhotel AS
SELECT
    NULL::integer AS hotel_id,
    NULL::character varying(85) AS hotel_name,
    NULL::character varying(500) AS hotel_description,
    NULL::smallint AS hotel_rating_star,
    NULL::character varying(25) AS hotel_phonenumber,
    NULL::text AS faci_hotelall,
    NULL::text AS faci_rateprice,
    NULL::text AS faci_lowprice,
    NULL::text AS faci_highprice,
    NULL::text AS faci_taxrate,
    NULL::text AS url,
    NULL::text AS place,
    NULL::character varying(225) AS city;


ALTER TABLE hotel.viewhotel OWNER TO postgres;

--
-- Name: viewroom; Type: VIEW; Schema: hotel; Owner: postgres
--

CREATE VIEW hotel.viewroom AS
 SELECT h.hotel_id,
    h.hotel_name,
    h.hotel_description,
    h.hotel_rating_star,
    h.hotel_phonenumber,
    h.hotel_modified_date,
    h.hotel_addr_id,
    f.faci_id,
    f.faci_name,
    f.faci_description,
    f.faci_max_number,
    f.faci_measure_unit,
    f.faci_room_number,
    f.faci_startdate,
    f.faci_enddate,
    f.faci_low_price,
    f.faci_high_price,
    f.faci_rate_price,
    f.faci_discount,
    f.faci_tax_rate,
    f.faci_modified_date,
    f.faci_cagro_id,
    f.faci_hotel_id,
    fap.fapho_faci_id,
    fap.fapho_url
   FROM ((hotel.hotels h
     JOIN hotel.facilities f ON ((h.hotel_id = f.faci_hotel_id)))
     JOIN ( SELECT facility_photo.fapho_faci_id,
            string_agg((facility_photo.fapho_photo_filename)::text, ', '::text) AS fapho_url
           FROM hotel.facility_photo
          GROUP BY facility_photo.fapho_faci_id) fap ON ((f.faci_id = fap.fapho_faci_id)))
  WHERE (f.faci_cagro_id = 1);


ALTER TABLE hotel.viewroom OWNER TO postgres;

--
-- Name: department; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.department (
    dept_id integer NOT NULL,
    dept_name character varying(50),
    dept_modified_date timestamp without time zone
);


ALTER TABLE hr.department OWNER TO postgres;

--
-- Name: department_dept_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.department_dept_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.department_dept_id_seq OWNER TO postgres;

--
-- Name: department_dept_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.department_dept_id_seq OWNED BY hr.department.dept_id;


--
-- Name: employee; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee (
    emp_id integer NOT NULL,
    emp_national_id character varying(25),
    emp_birth_date date,
    emp_marital_status character varying(1),
    emp_gender character varying(1),
    emp_hire_date timestamp without time zone,
    emp_salaried_flag character varying(1),
    emp_vacation_hours smallint,
    emp_sickleave_hourse smallint,
    emp_current_flag smallint,
    emp_photo character varying(255),
    emp_modified_date timestamp without time zone,
    emp_emp_id integer,
    emp_joro_id integer,
    emp_user_id integer
);


ALTER TABLE hr.employee OWNER TO postgres;

--
-- Name: employee_department_history; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee_department_history (
    edhi_id integer NOT NULL,
    edhi_emp_id integer,
    edhi_start_date timestamp without time zone,
    edhi_end_date timestamp without time zone,
    edhi_modified_date timestamp without time zone,
    edhi_dept_id integer,
    edhi_shift_id integer
);


ALTER TABLE hr.employee_department_history OWNER TO postgres;

--
-- Name: employee_department_history_edhi_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.employee_department_history_edhi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.employee_department_history_edhi_id_seq OWNER TO postgres;

--
-- Name: employee_department_history_edhi_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.employee_department_history_edhi_id_seq OWNED BY hr.employee_department_history.edhi_id;


--
-- Name: employee_emp_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.employee_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.employee_emp_id_seq OWNER TO postgres;

--
-- Name: employee_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.employee_emp_id_seq OWNED BY hr.employee.emp_id;


--
-- Name: employee_pay_history; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee_pay_history (
    ephi_emp_id integer,
    ephi_rate_change_date timestamp without time zone NOT NULL,
    ephi_rate_salary money,
    ephi_pay_frequence smallint,
    ephi_modified_date timestamp without time zone
);


ALTER TABLE hr.employee_pay_history OWNER TO postgres;

--
-- Name: job_role; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.job_role (
    joro_id integer NOT NULL,
    joro_name character varying(55),
    joro_modified_date timestamp without time zone
);


ALTER TABLE hr.job_role OWNER TO postgres;

--
-- Name: job_role_joro_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.job_role_joro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.job_role_joro_id_seq OWNER TO postgres;

--
-- Name: job_role_joro_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.job_role_joro_id_seq OWNED BY hr.job_role.joro_id;


--
-- Name: shift; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.shift (
    shift_id integer NOT NULL,
    shift_name character varying(25),
    shift_start_time time without time zone,
    shift_end_time time without time zone
);


ALTER TABLE hr.shift OWNER TO postgres;

--
-- Name: shift_shift_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.shift_shift_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.shift_shift_id_seq OWNER TO postgres;

--
-- Name: shift_shift_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.shift_shift_id_seq OWNED BY hr.shift.shift_id;


--
-- Name: work_order_detail; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.work_order_detail (
    wode_id integer NOT NULL,
    wode_task_name character varying(255),
    wode_status character varying(15),
    wode_start_date timestamp without time zone,
    wode_end_date timestamp without time zone,
    wode_notes character varying(255),
    wode_emp_id integer,
    wode_seta_id integer,
    wode_faci_id integer,
    wode_woro_id integer
);


ALTER TABLE hr.work_order_detail OWNER TO postgres;

--
-- Name: work_order_detail_wode_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.work_order_detail_wode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.work_order_detail_wode_id_seq OWNER TO postgres;

--
-- Name: work_order_detail_wode_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.work_order_detail_wode_id_seq OWNED BY hr.work_order_detail.wode_id;


--
-- Name: work_orders; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.work_orders (
    woro_id integer NOT NULL,
    woro_start_date timestamp without time zone,
    woro_status character varying(15),
    woro_user_id integer
);


ALTER TABLE hr.work_orders OWNER TO postgres;

--
-- Name: work_orders_woro_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.work_orders_woro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.work_orders_woro_id_seq OWNER TO postgres;

--
-- Name: work_orders_woro_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.work_orders_woro_id_seq OWNED BY hr.work_orders.woro_id;


--
-- Name: address; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.address (
    addr_id integer NOT NULL,
    addr_line1 character varying(225),
    addr_line2 character varying(225),
    addr_postal_code character varying(5),
    addr_spatial_location json,
    addr_prov_id integer
);


ALTER TABLE master.address OWNER TO postgres;

--
-- Name: address_addr_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.address_addr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.address_addr_id_seq OWNER TO postgres;

--
-- Name: address_addr_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.address_addr_id_seq OWNED BY master.address.addr_id;


--
-- Name: category_group; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.category_group (
    cagro_id integer NOT NULL,
    cagro_name character varying(25),
    cagro_description character varying(225),
    cagro_type character varying(25),
    cagro_icon character varying(255),
    cagro_icon_url character varying(255)
);


ALTER TABLE master.category_group OWNER TO postgres;

--
-- Name: category_group_cagro_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.category_group_cagro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.category_group_cagro_id_seq OWNER TO postgres;

--
-- Name: category_group_cagro_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.category_group_cagro_id_seq OWNED BY master.category_group.cagro_id;


--
-- Name: country; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.country (
    country_id integer NOT NULL,
    country_name character varying(35),
    country_region_id integer
);


ALTER TABLE master.country OWNER TO postgres;

--
-- Name: country_country_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.country_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.country_country_id_seq OWNER TO postgres;

--
-- Name: country_country_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.country_country_id_seq OWNED BY master.country.country_id;


--
-- Name: members; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.members (
    memb_name character varying(15) NOT NULL,
    memb_description character varying(100)
);


ALTER TABLE master.members OWNER TO postgres;

--
-- Name: policy; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.policy (
    poli_id integer NOT NULL,
    poli_name character varying(55),
    poli_description character varying(255)
);


ALTER TABLE master.policy OWNER TO postgres;

--
-- Name: policy_category_group; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.policy_category_group (
    poca_id integer NOT NULL,
    poca_poli_id integer NOT NULL,
    poca_cagro_id integer NOT NULL
);


ALTER TABLE master.policy_category_group OWNER TO postgres;

--
-- Name: policy_category_group_poca_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.policy_category_group_poca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.policy_category_group_poca_id_seq OWNER TO postgres;

--
-- Name: policy_category_group_poca_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.policy_category_group_poca_id_seq OWNED BY master.policy_category_group.poca_id;


--
-- Name: policy_poli_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.policy_poli_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.policy_poli_id_seq OWNER TO postgres;

--
-- Name: policy_poli_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.policy_poli_id_seq OWNED BY master.policy.poli_id;


--
-- Name: price_items; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.price_items (
    prit_id integer NOT NULL,
    prit_name character varying(55),
    prit_price money,
    prit_description character varying(255),
    prit_type character varying(15),
    prit_modified_date timestamp without time zone
);


ALTER TABLE master.price_items OWNER TO postgres;

--
-- Name: price_items_prit_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.price_items_prit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.price_items_prit_id_seq OWNER TO postgres;

--
-- Name: price_items_prit_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.price_items_prit_id_seq OWNED BY master.price_items.prit_id;


--
-- Name: proviences; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.proviences (
    prov_id integer NOT NULL,
    prov_name character varying(85),
    prov_country_id integer
);


ALTER TABLE master.proviences OWNER TO postgres;

--
-- Name: proviences_prov_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.proviences_prov_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.proviences_prov_id_seq OWNER TO postgres;

--
-- Name: proviences_prov_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.proviences_prov_id_seq OWNED BY master.proviences.prov_id;


--
-- Name: regions; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.regions (
    region_code integer NOT NULL,
    region_name character varying(35)
);


ALTER TABLE master.regions OWNER TO postgres;

--
-- Name: regions_region_code_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.regions_region_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.regions_region_code_seq OWNER TO postgres;

--
-- Name: regions_region_code_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.regions_region_code_seq OWNED BY master.regions.region_code;


--
-- Name: service_task; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.service_task (
    seta_id integer NOT NULL,
    seta_name character varying(85),
    set_seq smallint
);


ALTER TABLE master.service_task OWNER TO postgres;

--
-- Name: service_task_seta_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.service_task_seta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.service_task_seta_id_seq OWNER TO postgres;

--
-- Name: service_task_seta_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.service_task_seta_id_seq OWNED BY master.service_task.seta_id;


--
-- Name: entitys; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.entitys (
    entity_id integer NOT NULL
);


ALTER TABLE payment.entitys OWNER TO postgres;

--
-- Name: entitys_entity_id_seq; Type: SEQUENCE; Schema: payment; Owner: postgres
--

CREATE SEQUENCE payment.entitys_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payment.entitys_entity_id_seq OWNER TO postgres;

--
-- Name: entitys_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: payment; Owner: postgres
--

ALTER SEQUENCE payment.entitys_entity_id_seq OWNED BY payment.entitys.entity_id;


--
-- Name: payment_transaction_patr_id_seq; Type: SEQUENCE; Schema: payment; Owner: postgres
--

CREATE SEQUENCE payment.payment_transaction_patr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payment.payment_transaction_patr_id_seq OWNER TO postgres;

--
-- Name: payment_transaction_patr_id_seq; Type: SEQUENCE OWNED BY; Schema: payment; Owner: postgres
--

ALTER SEQUENCE payment.payment_transaction_patr_id_seq OWNED BY payment.payment_transaction.patr_id;


--
-- Name: purchase_order_detail; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.purchase_order_detail (
    pode_pohe_id integer NOT NULL,
    pode_id integer NOT NULL,
    pode_order_qty smallint,
    pode_price money,
    pode_line_total money,
    pode_received_qty numeric(8,2),
    pode_rejected_qty numeric(8,2),
    pode_stocked_qty numeric(9,2),
    pode_modified_date timestamp without time zone,
    pode_stock_id integer
);


ALTER TABLE purchasing.purchase_order_detail OWNER TO postgres;

--
-- Name: purchase_order_detail_pode_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.purchase_order_detail_pode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.purchase_order_detail_pode_id_seq OWNER TO postgres;

--
-- Name: purchase_order_detail_pode_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.purchase_order_detail_pode_id_seq OWNED BY purchasing.purchase_order_detail.pode_id;


--
-- Name: purchase_order_header; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.purchase_order_header (
    pohe_id integer NOT NULL,
    pohe_number character varying(20),
    pohe_status integer,
    pohe_order_date timestamp without time zone,
    pohe_subtotal money,
    pohe_tax money,
    pohe_total_amount money,
    pohe_refund money,
    pohe_arrival_date timestamp without time zone,
    pohe_pay_type character varying(2),
    pohe_emp_id integer,
    pohe_vendor_id integer
);


ALTER TABLE purchasing.purchase_order_header OWNER TO postgres;

--
-- Name: purchase_order_header_pohe_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.purchase_order_header_pohe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.purchase_order_header_pohe_id_seq OWNER TO postgres;

--
-- Name: purchase_order_header_pohe_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.purchase_order_header_pohe_id_seq OWNED BY purchasing.purchase_order_header.pohe_id;


--
-- Name: stock_detail; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.stock_detail (
    stod_stock_id integer NOT NULL,
    stod_id integer NOT NULL,
    stod_barcode_number character varying(255),
    stod_status character varying(2),
    stod_notes character varying(1024),
    stod_faci_id integer,
    stod_pohe_id integer
);


ALTER TABLE purchasing.stock_detail OWNER TO postgres;

--
-- Name: stock_detail_stod_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.stock_detail_stod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.stock_detail_stod_id_seq OWNER TO postgres;

--
-- Name: stock_detail_stod_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.stock_detail_stod_id_seq OWNED BY purchasing.stock_detail.stod_id;


--
-- Name: stock_photo; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.stock_photo (
    spho_id integer NOT NULL,
    spho_thumbnail_filename character varying(50),
    spho_photo_filename character varying(50),
    spho_primary integer,
    spho_url character varying(255),
    spho_stock_id integer
);


ALTER TABLE purchasing.stock_photo OWNER TO postgres;

--
-- Name: stock_photo_spho_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.stock_photo_spho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.stock_photo_spho_id_seq OWNER TO postgres;

--
-- Name: stock_photo_spho_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.stock_photo_spho_id_seq OWNED BY purchasing.stock_photo.spho_id;


--
-- Name: stocks; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.stocks (
    stock_id integer NOT NULL,
    stock_name character varying(255),
    stock_description character varying(255),
    stock_quantity smallint,
    stock_reorder_point smallint,
    stock_used smallint,
    stock_scrap smallint,
    stock_size character varying(25),
    stock_color character varying(15),
    stock_modified_date timestamp without time zone
);


ALTER TABLE purchasing.stocks OWNER TO postgres;

--
-- Name: stocks_stock_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.stocks_stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.stocks_stock_id_seq OWNER TO postgres;

--
-- Name: stocks_stock_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.stocks_stock_id_seq OWNED BY purchasing.stocks.stock_id;


--
-- Name: vendor; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.vendor (
    vendor_id integer NOT NULL,
    vendor_name character varying(55),
    vendor_active integer,
    vendor_priority integer,
    vendor_register_date date,
    vendor_weburl character varying(1024),
    vendor_modified_date timestamp without time zone
);


ALTER TABLE purchasing.vendor OWNER TO postgres;

--
-- Name: vendor_product; Type: TABLE; Schema: purchasing; Owner: postgres
--

CREATE TABLE purchasing.vendor_product (
    vepro_id integer NOT NULL,
    vepro_qty_stocked integer,
    vepro_qty_remaining integer,
    vepro_price money,
    vepro_stock_id integer,
    vepro_vendor_id integer
);


ALTER TABLE purchasing.vendor_product OWNER TO postgres;

--
-- Name: vendor_product_vepro_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.vendor_product_vepro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.vendor_product_vepro_id_seq OWNER TO postgres;

--
-- Name: vendor_product_vepro_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.vendor_product_vepro_id_seq OWNED BY purchasing.vendor_product.vepro_id;


--
-- Name: vendor_vendor_id_seq; Type: SEQUENCE; Schema: purchasing; Owner: postgres
--

CREATE SEQUENCE purchasing.vendor_vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchasing.vendor_vendor_id_seq OWNER TO postgres;

--
-- Name: vendor_vendor_id_seq; Type: SEQUENCE OWNED BY; Schema: purchasing; Owner: postgres
--

ALTER SEQUENCE purchasing.vendor_vendor_id_seq OWNED BY purchasing.vendor.vendor_id;


--
-- Name: order_menu_detail; Type: TABLE; Schema: resto; Owner: postgres
--

CREATE TABLE resto.order_menu_detail (
    omde_id integer NOT NULL,
    orme_price money,
    orme_qty smallint,
    orme_subtotal money,
    orme_discount money,
    omde_orme_id integer,
    omde_reme_id integer
);


ALTER TABLE resto.order_menu_detail OWNER TO postgres;

--
-- Name: order_menu_detail_omde_id_seq; Type: SEQUENCE; Schema: resto; Owner: postgres
--

CREATE SEQUENCE resto.order_menu_detail_omde_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE resto.order_menu_detail_omde_id_seq OWNER TO postgres;

--
-- Name: order_menu_detail_omde_id_seq; Type: SEQUENCE OWNED BY; Schema: resto; Owner: postgres
--

ALTER SEQUENCE resto.order_menu_detail_omde_id_seq OWNED BY resto.order_menu_detail.omde_id;


--
-- Name: order_menus_orme_id_seq; Type: SEQUENCE; Schema: resto; Owner: postgres
--

CREATE SEQUENCE resto.order_menus_orme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE resto.order_menus_orme_id_seq OWNER TO postgres;

--
-- Name: order_menus_orme_id_seq; Type: SEQUENCE OWNED BY; Schema: resto; Owner: postgres
--

ALTER SEQUENCE resto.order_menus_orme_id_seq OWNED BY resto.order_menus.orme_id;


--
-- Name: resto_menu_photos; Type: TABLE; Schema: resto; Owner: postgres
--

CREATE TABLE resto.resto_menu_photos (
    remp_id integer NOT NULL,
    remp_thumbnail_filename character varying(50),
    remp_photo_filename character varying(50),
    remp_primary bit(1),
    remp_url character varying(255),
    remp_reme_id integer
);


ALTER TABLE resto.resto_menu_photos OWNER TO postgres;

--
-- Name: resto_menu_photos_remp_id_seq; Type: SEQUENCE; Schema: resto; Owner: postgres
--

CREATE SEQUENCE resto.resto_menu_photos_remp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE resto.resto_menu_photos_remp_id_seq OWNER TO postgres;

--
-- Name: resto_menu_photos_remp_id_seq; Type: SEQUENCE OWNED BY; Schema: resto; Owner: postgres
--

ALTER SEQUENCE resto.resto_menu_photos_remp_id_seq OWNED BY resto.resto_menu_photos.remp_id;


--
-- Name: resto_menus; Type: TABLE; Schema: resto; Owner: postgres
--

CREATE TABLE resto.resto_menus (
    reme_faci_id integer,
    reme_id integer NOT NULL,
    reme_name character varying(55),
    reme_description character varying(255),
    reme_price money,
    reme_status character varying(15),
    reme_modified_date timestamp without time zone
);


ALTER TABLE resto.resto_menus OWNER TO postgres;

--
-- Name: resto_menus_reme_id_seq; Type: SEQUENCE; Schema: resto; Owner: postgres
--

CREATE SEQUENCE resto.resto_menus_reme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE resto.resto_menus_reme_id_seq OWNER TO postgres;

--
-- Name: resto_menus_reme_id_seq; Type: SEQUENCE OWNED BY; Schema: resto; Owner: postgres
--

ALTER SEQUENCE resto.resto_menus_reme_id_seq OWNED BY resto.resto_menus.reme_id;


--
-- Name: roles; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.roles (
    role_id integer NOT NULL,
    role_name character varying(35)
);


ALTER TABLE users.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.roles_role_id_seq OWNED BY users.roles.role_id;


--
-- Name: user_bonus_points; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.user_bonus_points (
    ubpo_id integer NOT NULL,
    ubpo_user_id integer,
    ubpo_total_points smallint,
    ubpo_bonus_type character(1),
    ubpo_created_on timestamp without time zone
);


ALTER TABLE users.user_bonus_points OWNER TO postgres;

--
-- Name: user_bonus_points_ubpo_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.user_bonus_points_ubpo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.user_bonus_points_ubpo_id_seq OWNER TO postgres;

--
-- Name: user_bonus_points_ubpo_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.user_bonus_points_ubpo_id_seq OWNED BY users.user_bonus_points.ubpo_id;


--
-- Name: user_password; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.user_password (
    uspa_user_id integer NOT NULL,
    uspa_passwordhash character varying(128),
    uspa_passwordsalt character varying(128)
);


ALTER TABLE users.user_password OWNER TO postgres;

--
-- Name: user_password_uspa_user_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.user_password_uspa_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.user_password_uspa_user_id_seq OWNER TO postgres;

--
-- Name: user_password_uspa_user_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.user_password_uspa_user_id_seq OWNED BY users.user_password.uspa_user_id;


--
-- Name: user_profiles; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.user_profiles (
    uspro_id integer NOT NULL,
    uspro_national_id character varying(20),
    uspro_birt_date date,
    uspro_job_title character varying(50),
    uspro_martial_status character(1),
    uspro_gender character(1),
    uspro_addr_id integer,
    uspro_user_id integer
);


ALTER TABLE users.user_profiles OWNER TO postgres;

--
-- Name: user_profiles_uspro_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.user_profiles_uspro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.user_profiles_uspro_id_seq OWNER TO postgres;

--
-- Name: user_profiles_uspro_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.user_profiles_uspro_id_seq OWNED BY users.user_profiles.uspro_id;


--
-- Name: user_roles; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.user_roles (
    usro_user_id integer NOT NULL,
    usro_role_id integer
);


ALTER TABLE users.user_roles OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_user_id_seq OWNED BY users.users.user_id;


--
-- Name: booking_order_detail borde_id; Type: DEFAULT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail ALTER COLUMN borde_id SET DEFAULT nextval('booking.booking_order_detail_borde_id_seq'::regclass);


--
-- Name: booking_order_detail_extra boex_id; Type: DEFAULT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail_extra ALTER COLUMN boex_id SET DEFAULT nextval('booking.booking_order_detail_extra_boex_id_seq'::regclass);


--
-- Name: booking_orders boor_id; Type: DEFAULT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_orders ALTER COLUMN boor_id SET DEFAULT nextval('booking.booking_orders_boor_id_seq'::regclass);


--
-- Name: special_offer_coupons soco_id; Type: DEFAULT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.special_offer_coupons ALTER COLUMN soco_id SET DEFAULT nextval('booking.special_offer_coupons_soco_id_seq'::regclass);


--
-- Name: special_offers spof_id; Type: DEFAULT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.special_offers ALTER COLUMN spof_id SET DEFAULT nextval('booking.special_offers_spof_id_seq'::regclass);


--
-- Name: facilities faci_id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facilities ALTER COLUMN faci_id SET DEFAULT nextval('hotel.facilities_faci_id_seq'::regclass);


--
-- Name: facility_photo fapho_id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_photo ALTER COLUMN fapho_id SET DEFAULT nextval('hotel.facility_photo_fapho_id_seq'::regclass);


--
-- Name: facility_price_history faph_id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_price_history ALTER COLUMN faph_id SET DEFAULT nextval('hotel.facility_price_history_faph_id_seq'::regclass);


--
-- Name: hotel_reviews hore_id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotel_reviews ALTER COLUMN hore_id SET DEFAULT nextval('hotel.hotel_reviews_hore_id_seq'::regclass);


--
-- Name: hotels hotel_id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotels ALTER COLUMN hotel_id SET DEFAULT nextval('hotel.hotels_hotel_id_seq'::regclass);


--
-- Name: department dept_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.department ALTER COLUMN dept_id SET DEFAULT nextval('hr.department_dept_id_seq'::regclass);


--
-- Name: employee emp_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee ALTER COLUMN emp_id SET DEFAULT nextval('hr.employee_emp_id_seq'::regclass);


--
-- Name: employee_department_history edhi_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history ALTER COLUMN edhi_id SET DEFAULT nextval('hr.employee_department_history_edhi_id_seq'::regclass);


--
-- Name: job_role joro_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.job_role ALTER COLUMN joro_id SET DEFAULT nextval('hr.job_role_joro_id_seq'::regclass);


--
-- Name: shift shift_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.shift ALTER COLUMN shift_id SET DEFAULT nextval('hr.shift_shift_id_seq'::regclass);


--
-- Name: work_order_detail wode_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_order_detail ALTER COLUMN wode_id SET DEFAULT nextval('hr.work_order_detail_wode_id_seq'::regclass);


--
-- Name: work_orders woro_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_orders ALTER COLUMN woro_id SET DEFAULT nextval('hr.work_orders_woro_id_seq'::regclass);


--
-- Name: address addr_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address ALTER COLUMN addr_id SET DEFAULT nextval('master.address_addr_id_seq'::regclass);


--
-- Name: category_group cagro_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category_group ALTER COLUMN cagro_id SET DEFAULT nextval('master.category_group_cagro_id_seq'::regclass);


--
-- Name: country country_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country ALTER COLUMN country_id SET DEFAULT nextval('master.country_country_id_seq'::regclass);


--
-- Name: policy poli_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.policy ALTER COLUMN poli_id SET DEFAULT nextval('master.policy_poli_id_seq'::regclass);


--
-- Name: policy_category_group poca_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.policy_category_group ALTER COLUMN poca_id SET DEFAULT nextval('master.policy_category_group_poca_id_seq'::regclass);


--
-- Name: price_items prit_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.price_items ALTER COLUMN prit_id SET DEFAULT nextval('master.price_items_prit_id_seq'::regclass);


--
-- Name: proviences prov_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.proviences ALTER COLUMN prov_id SET DEFAULT nextval('master.proviences_prov_id_seq'::regclass);


--
-- Name: regions region_code; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.regions ALTER COLUMN region_code SET DEFAULT nextval('master.regions_region_code_seq'::regclass);


--
-- Name: service_task seta_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.service_task ALTER COLUMN seta_id SET DEFAULT nextval('master.service_task_seta_id_seq'::regclass);


--
-- Name: entitys entity_id; Type: DEFAULT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.entitys ALTER COLUMN entity_id SET DEFAULT nextval('payment.entitys_entity_id_seq'::regclass);


--
-- Name: payment_transaction patr_id; Type: DEFAULT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_transaction ALTER COLUMN patr_id SET DEFAULT nextval('payment.payment_transaction_patr_id_seq'::regclass);


--
-- Name: purchase_order_detail pode_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_detail ALTER COLUMN pode_id SET DEFAULT nextval('purchasing.purchase_order_detail_pode_id_seq'::regclass);


--
-- Name: purchase_order_header pohe_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_header ALTER COLUMN pohe_id SET DEFAULT nextval('purchasing.purchase_order_header_pohe_id_seq'::regclass);


--
-- Name: stock_detail stod_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_detail ALTER COLUMN stod_id SET DEFAULT nextval('purchasing.stock_detail_stod_id_seq'::regclass);


--
-- Name: stock_photo spho_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_photo ALTER COLUMN spho_id SET DEFAULT nextval('purchasing.stock_photo_spho_id_seq'::regclass);


--
-- Name: stocks stock_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stocks ALTER COLUMN stock_id SET DEFAULT nextval('purchasing.stocks_stock_id_seq'::regclass);


--
-- Name: vendor vendor_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.vendor ALTER COLUMN vendor_id SET DEFAULT nextval('purchasing.vendor_vendor_id_seq'::regclass);


--
-- Name: vendor_product vepro_id; Type: DEFAULT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.vendor_product ALTER COLUMN vepro_id SET DEFAULT nextval('purchasing.vendor_product_vepro_id_seq'::regclass);


--
-- Name: order_menu_detail omde_id; Type: DEFAULT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menu_detail ALTER COLUMN omde_id SET DEFAULT nextval('resto.order_menu_detail_omde_id_seq'::regclass);


--
-- Name: order_menus orme_id; Type: DEFAULT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menus ALTER COLUMN orme_id SET DEFAULT nextval('resto.order_menus_orme_id_seq'::regclass);


--
-- Name: resto_menu_photos remp_id; Type: DEFAULT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.resto_menu_photos ALTER COLUMN remp_id SET DEFAULT nextval('resto.resto_menu_photos_remp_id_seq'::regclass);


--
-- Name: resto_menus reme_id; Type: DEFAULT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.resto_menus ALTER COLUMN reme_id SET DEFAULT nextval('resto.resto_menus_reme_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles ALTER COLUMN role_id SET DEFAULT nextval('users.roles_role_id_seq'::regclass);


--
-- Name: user_bonus_points ubpo_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_bonus_points ALTER COLUMN ubpo_id SET DEFAULT nextval('users.user_bonus_points_ubpo_id_seq'::regclass);


--
-- Name: user_password uspa_user_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_password ALTER COLUMN uspa_user_id SET DEFAULT nextval('users.user_password_uspa_user_id_seq'::regclass);


--
-- Name: user_profiles uspro_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_profiles ALTER COLUMN uspro_id SET DEFAULT nextval('users.user_profiles_uspro_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users ALTER COLUMN user_id SET DEFAULT nextval('users.users_user_id_seq'::regclass);


--
-- Data for Name: booking_order_detail; Type: TABLE DATA; Schema: booking; Owner: postgres
--

COPY booking.booking_order_detail (border_boor_id, borde_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id) FROM stdin;
1	1	2023-03-30 00:00:00	2023-03-31 00:00:00	2	0	Rp650.000,00	Rp30.000,00	Rp325.000,00	Rp100.000,00	Rp1.005.000,00	1
2	2	2023-03-09 00:00:00	2023-03-11 00:00:00	3	0	Rp650.000,00	Rp0,00	Rp325.000,00	Rp100.000,00	Rp2.275.000,00	1
3	3	2023-03-10 00:00:00	2023-03-11 00:00:00	1	0	Rp650.000,00	Rp15.000,00	Rp175.000,00	Rp100.000,00	Rp490.000,00	1
4	4	2023-03-14 00:00:00	2023-03-15 00:00:00	1	0	Rp550.000,00	Rp0,00	\N	Rp45.000,00	Rp550.000,00	34
5	5	2023-03-14 00:00:00	2023-03-15 00:00:00	0	0	Rp500.000,00	Rp0,00	Rp325.000,00	Rp50.000,00	Rp175.000,00	35
6	6	2023-03-13 00:00:00	2023-03-15 00:00:00	2	2	Rp500.000,00	Rp450.000,00	Rp285.000,00	Rp50.000,00	Rp1.715.000,00	35
7	7	2023-03-13 00:00:00	2023-03-16 00:00:00	2	2	Rp500.000,00	Rp600.000,00	Rp485.000,00	Rp50.000,00	Rp2.515.000,00	35
8	8	2023-03-13 00:00:00	2023-03-15 00:00:00	2	2	Rp500.000,00	Rp450.000,00	Rp250.000,00	Rp50.000,00	Rp1.750.000,00	35
9	9	2023-03-13 00:00:00	2023-03-14 00:00:00	2	0	Rp550.000,00	Rp26.000,00	Rp250.000,00	Rp45.000,00	Rp300.000,00	34
10	10	2023-03-14 00:00:00	2023-03-16 00:00:00	0	0	Rp650.000,00	Rp0,00	Rp315.000,00	Rp100.000,00	Rp2.285.000,00	8
11	11	2023-03-14 00:00:00	2023-03-15 00:00:00	2	0	Rp500.000,00	Rp0,00	Rp325.000,00	Rp50.000,00	Rp175.000,00	35
\.


--
-- Data for Name: booking_order_detail_extra; Type: TABLE DATA; Schema: booking; Owner: postgres
--

COPY booking.booking_order_detail_extra (boex_id, boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_borde_id, boex_prit_id) FROM stdin;
1	Rp15.000,00	2	Rp30.000,00	Unit	\N	1
2	Rp15.000,00	1	Rp15.000,00	Unit	\N	1
3	Rp200.000,00	1	Rp200.000,00	People	1	12
4	Rp50.000,00	2	Rp100.000,00	People	1	13
5	Rp150.000,00	1	Rp150.000,00	People	1	14
6	Rp50.000,00	1	Rp50.000,00	People	1	13
7	Rp150.000,00	1	Rp150.000,00	People	1	14
8	Rp200.000,00	2	Rp400.000,00	People	1	12
9	Rp200.000,00	2	Rp400.000,00	People	1	12
10	Rp50.000,00	1	Rp50.000,00	People	1	13
11	Rp6.000,00	1	Rp6.000,00	Unit	1	4
12	Rp20.000,00	1	Rp20.000,00	Unit	1	2
\.


--
-- Data for Name: booking_orders; Type: TABLE DATA; Schema: booking; Owner: postgres
--

COPY booking.booking_orders (boor_id, boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id) FROM stdin;
1	BO#20230309-0001	2023-03-09 00:00:00	2023-03-30 00:00:00	2	2	Rp325.000,00	Rp100.000,00	Rp1.005.000,00	Rp0,00	C 	P 	T	131082287821697	Gold	Booking	7	1
2	BO#20230309-0002	2023-03-09 00:00:00	2023-03-09 00:00:00	2	3	Rp325.000,00	Rp100.000,00	Rp2.275.000,00	Rp0,00	D 	P 	T	8987827217828271	Gold	Booking	7	1
3	BO#20230310-0001	2023-03-10 00:00:00	2023-03-10 00:00:00	1	1	Rp175.000,00	Rp100.000,00	Rp490.000,00	Rp0,00	C 	P 	C		\N	Booking	55	1
4	BO#20230313-0001	2023-03-13 00:00:00	2023-03-14 00:00:00	1	0	\N	Rp45.000,00	Rp550.000,00	Rp0,00	PG	P 	T	82287821697	Gold	Booking	7	1
5	BO#20230313-0002	2023-03-13 00:00:00	2023-03-14 00:00:00	1	0	Rp325.000,00	Rp50.000,00	Rp175.000,00	Rp0,00	C 	P 	T		Gold	Booking	7	2
6	BO#20230313-0003	2023-03-13 00:00:00	2023-03-13 00:00:00	2	4	Rp285.000,00	Rp50.000,00	Rp2.165.000,00	Rp0,00	C 	P 	T		Gold	Booking	7	2
7	BO#20230313-0004	2023-03-13 00:00:00	2023-03-13 00:00:00	2	4	Rp485.000,00	Rp50.000,00	Rp3.115.000,00	Rp0,00	C 	P 	I		WIZARD	Booking	2	2
8	BO#20230313-0005	2023-03-13 00:00:00	2023-03-13 00:00:00	2	4	Rp250.000,00	Rp50.000,00	Rp2.200.000,00	Rp0,00	C 	P 	C		Gold	Booking	1	2
9	BO#20230313-0006	2023-03-13 00:00:00	2023-03-13 00:00:00	1	2	Rp250.000,00	Rp45.000,00	Rp326.000,00	Rp0,00	C 	P 	C		Gold	Booking	1	1
10	BO#20230313-0007	2023-03-13 00:00:00	2023-03-14 00:00:00	2	0	Rp315.000,00	Rp100.000,00	Rp2.285.000,00	Rp0,00	C 	P 	I		WIZARD	Booking	2	2
11	BO#20230314-0001	2023-03-14 00:00:00	2023-03-14 00:00:00	1	2	Rp325.000,00	Rp50.000,00	Rp175.000,00	Rp0,00	D 	P 	T	8987827217828271	Gold	Booking	7	2
\.


--
-- Data for Name: special_offer_coupons; Type: TABLE DATA; Schema: booking; Owner: postgres
--

COPY booking.special_offer_coupons (soco_id, soco_borde_id, soco_spof_id) FROM stdin;
1	1	25
2	2	25
3	3	24
4	5	25
5	6	28
6	7	31
7	8	27
8	9	27
9	10	29
10	11	25
\.


--
-- Data for Name: special_offers; Type: TABLE DATA; Schema: booking; Owner: postgres
--

COPY booking.special_offers (spof_id, spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) FROM stdin;
1	ImlekKelinci	Discount, Chinese New Year (Imlek)	Individual	Rp250.000,00	2023-01-13 00:00:00	2023-02-13 00:00:00	1	50	2023-03-09 16:19:18.846963
2	Nyepi1945Saka	Discount, Nyepi (Nyepi) Day	Individual	Rp125.000,00	2023-03-17 00:00:00	2023-04-02 00:00:00	1	30	2023-03-09 16:19:18.846963
3	BukbekStaycation	Discount, Ramadan and Staycation (BukberStaycation)	Individual	Rp125.000,00	2023-04-07 00:00:00	2023-04-16 00:00:00	1	15	2023-03-09 16:19:18.846963
4	IdulFitri1444H	Discount, Eid al-Fitr Lebaran	Individual	Rp300.000,00	2023-04-17 00:00:00	2023-05-07 00:00:00	1	70	2023-03-09 16:19:18.846963
5	IdulAdha1444H	Discount, Eid al-Adha	Individual	Rp200.000,00	2023-06-23 00:00:00	2023-07-02 00:00:00	1	50	2023-03-09 16:19:18.846963
6	CorporateBrainStorm2023	Discount, Staycation with Brainstorming Corporate 2023	Corporate	Rp150.000,00	2023-01-30 00:00:00	2023-12-04 00:00:00	1	30	2023-03-09 16:19:18.846963
7	CorporateClosing	Discount, Closing Corporate 2023	Corporate	Rp200.000,00	2023-12-18 00:00:00	2023-12-24 00:00:00	1	5	2023-03-09 16:19:18.846963
8	CorporateClosing	Discount, Closing Corporate 2023	Corporate	Rp200.000,00	2023-12-18 00:00:00	2023-12-24 00:00:00	1	10	2023-03-09 16:19:18.846963
9	Kemerdekaan	Discount, Independence Day 2023	Individual	Rp170.845,00	2023-08-14 00:00:00	2023-08-21 00:00:00	1	17	2023-03-09 16:19:18.846963
10	NatalDanTahunBaru	Discount, Christmas and New Year 2023	Individual	Rp150.000,00	2023-12-18 00:00:00	2024-01-07 00:00:00	1	50	2023-03-09 16:19:18.846963
11	NatalDanTahunBaruCorporate	Discount, Christmas and New Year 2023 for Corporate	Corporate	Rp175.000,00	2023-12-18 00:00:00	2024-01-07 00:00:00	1	25	2023-03-09 16:19:18.846963
12	NatalDanTahunBaruTravelAgent	Discount, Christmas and New Year 2023 for Travel Agents	Travel Agent	Rp200.000,00	2023-12-18 00:00:00	2024-01-07 00:00:00	1	15	2023-03-09 16:19:18.846963
13	MusimPanas	Discount, Summer Season 2023	Individual	Rp150.000,00	2023-07-13 00:00:00	2023-07-23 00:00:00	1	15	2023-03-09 16:19:18.846963
14	MusimPanas	Discount,Summer Season 2023 Corporate	Corporate	Rp100.000,00	2023-07-13 00:00:00	2023-07-23 00:00:00	1	5	2023-03-09 16:19:18.846963
15	MusimPanas	Discount, Summer Season 2023 for Travel Agents	Travel Agent	Rp125.000,00	2023-07-13 00:00:00	2023-07-23 00:00:00	1	10	2023-03-09 16:19:18.846963
16	LiburSekolah	Discount, School Holidays 2023 for Individuals	Individual	Rp250.000,00	2023-06-26 00:00:00	2023-07-08 00:00:00	1	45	2023-03-09 16:19:18.846963
17	LiburSekolah	Discount, Summer Season 2023 for Corporates	Corporate	Rp200.000,00	2023-07-26 00:00:00	2023-07-08 00:00:00	1	10	2023-03-09 16:19:18.846963
18	LiburSekolah	Discount, Summer Season 2023 for Travel Agents	Travel Agent	Rp150.000,00	2023-07-26 00:00:00	2023-07-08 00:00:00	1	25	2023-03-09 16:19:18.846963
19	WorkFromHotel	Discount, WFH 2023 Corporate	Corporate	Rp150.000,00	2023-02-06 00:00:00	2023-02-27 00:00:00	1	10	2023-03-09 16:19:18.846963
20	WorkFromHotel	Discount, WFH 2023 Travel Agent	Travel Agent	Rp125.000,00	2023-02-06 00:00:00	2023-02-27 00:00:00	1	25	2023-03-09 16:19:18.846963
22	STAYWITHCODEX	Diskon Staycation Code X - Travel Agent	Travel Agent	Rp200.000,00	2023-03-01 00:00:00	2023-04-01 00:00:00	1	10	2023-03-09 16:20:46.48838
23	CODEXHOLIDAY	Diskon Holiday Code X - Individual	Individual	Rp225.000,00	2023-03-02 00:00:00	2023-05-02 00:00:00	1	15	2023-03-09 16:20:46.48838
24	CODEXOUTING	Diskon Outing Code X - Corporate	Corporate	Rp175.000,00	2023-03-03 00:00:00	2023-04-03 00:00:00	1	7	2023-03-09 16:20:46.48838
25	CODEXRAMADHAN	Diskon Ramadhan Code X - Travel Agent	Travel Agent	Rp325.000,00	2023-03-01 00:00:00	2023-04-01 00:00:00	1	10	2023-03-09 16:20:46.48838
26	CODEXFASTING	Diskon Fasting Code X - Individual	Individual	Rp275.000,00	2023-03-02 00:00:00	2023-05-02 00:00:00	1	15	2023-03-09 16:20:46.48838
27	CODEXIEDFITR	Diskon Ied Fitr Code X - Corporate	Corporate	Rp250.000,00	2023-03-03 00:00:00	2023-04-03 00:00:00	1	7	2023-03-09 16:20:46.48838
28	CODEXYEAREND	Diskon Year End Code X - Travel Agent	Travel Agent	Rp285.000,00	2023-03-01 00:00:00	2023-04-01 00:00:00	1	10	2023-03-09 16:20:46.48838
29	CODEXYEAREND	Diskon Year End Code X - Individual	Individual	Rp315.000,00	2023-03-02 00:00:00	2023-05-02 00:00:00	1	15	2023-03-09 16:20:46.48838
30	CODEXYEAREND	Diskon Year End Code X - Corporate	Corporate	Rp245.000,00	2023-03-03 00:00:00	2023-04-03 00:00:00	1	7	2023-03-09 16:20:46.48838
31	CODEXBATCH#1	Diskon Batch#1 Code X - Individual	Individual	Rp485.000,00	2023-03-03 00:00:00	2023-04-03 00:00:00	1	7	2023-03-09 16:20:46.48838
\.


--
-- Data for Name: user_breakfeast; Type: TABLE DATA; Schema: booking; Owner: postgres
--

COPY booking.user_breakfeast (usbr_borde_id, usbr_modified_date, usbr_total_vacant) FROM stdin;
1	2023-03-31 00:00:00	2
2	2023-03-10 00:00:00	3
2	2023-03-11 00:00:00	3
3	2023-03-11 00:00:00	1
4	2023-03-15 00:00:00	0
5	2023-03-15 00:00:00	0
6	2023-03-14 00:00:00	4
6	2023-03-15 00:00:00	4
7	2023-03-14 00:00:00	4
7	2023-03-15 00:00:00	4
7	2023-03-16 00:00:00	4
8	2023-03-14 00:00:00	4
8	2023-03-15 00:00:00	4
9	2023-03-14 00:00:00	2
10	2023-03-15 00:00:00	0
10	2023-03-16 00:00:00	0
11	2023-03-15 00:00:00	2
\.


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.facilities (faci_id, faci_name, faci_description, faci_max_number, faci_measure_unit, faci_room_number, faci_startdate, faci_enddate, faci_low_price, faci_high_price, faci_rate_price, faci_discount, faci_tax_rate, faci_modified_date, faci_cagro_id, faci_hotel_id) FROM stdin;
1	Deluxe Room	The Deluxe Room is a spacious and comfortable room with modern amenities such as AC, TV, a work desk, and a private bathroom. Free internet access and a mini bar are available.	2	Beds	1-001	2022-01-12 00:00:00	2022-01-13 00:00:00	Rp450.000,00	Rp950.000,00	Rp650.000,00	Rp0,00	Rp100.000,00	2022-01-12 00:00:00	1	1
2	Indonesian Restaurant	The Indonesian Restaurant offers authentic dishes with high-quality ingredients. Experience the unique flavors of Indonesia in every dish.	250	People	2-001	2022-01-12 00:00:00	2022-03-12 00:00:00	Rp50.000,00	Rp450.000,00	Rp100.000,00	Rp20.000,00	Rp5.000,00	2022-01-12 00:00:00	2	1
4	Raya Gym	Fully equipped, with AC, the latest training equipment, a cardio area, a weight area, and personal trainers available.	25	People	4-001	2022-02-11 00:00:00	2022-02-12 00:00:00	Rp100.000,00	Rp250.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-11 00:00:00	4	1
5	Pasifik Hall	Spacious, modern, with AC, sound system, projector, ideal for seminars, training, and conferences.	150	People	5-001	2022-02-15 00:00:00	2022-02-16 00:00:00	Rp1.500.000,00	Rp3.500.000,00	Rp1.750.000,00	Rp0,00	Rp150.000,00	2022-02-15 00:00:00	5	1
6	Oceana Swimming Pool	Spacious, clean, with AC, breathtaking view, relaxation area, view of the surrounding area.	30	People	6-001	2022-02-17 00:00:00	2022-02-18 00:00:00	Rp100.000,00	Rp200.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-17 00:00:00	6	1
8	Deluxe Room	The Deluxe Room is a spacious and comfortable room with modern amenities such as AC, TV, a work desk, and a private bathroom.	2	Beds	1-002	2022-01-12 00:00:00	2022-01-13 00:00:00	Rp450.000,00	Rp950.000,00	Rp650.000,00	Rp0,00	Rp100.000,00	2022-01-12 00:00:00	1	2
9	Indonesian Restaurant	The Indonesian Restaurant offers authentic cuisine with high-quality ingredients. Experience the unique flavors of Indonesia in every dish.	250	People	2-002	2022-01-12 00:00:00	2022-03-12 00:00:00	Rp50.000,00	Rp450.000,00	Rp100.000,00	Rp20.000,00	Rp5.000,00	2022-01-12 00:00:00	2	2
10	Savana Meeting Room	Spacious, modern, fully equipped with AC, a projector, a sound system, and wifi. Ideal for meetings, seminars, and trainings.	50	People	3-002	2022-02-10 00:00:00	2022-02-10 00:00:00	Rp150.000,00	Rp1.500.000,00	Rp200.000,00	Rp0,00	Rp100.000,00	2022-02-10 00:00:00	3	2
11	Raya Gym	Fully equipped with AC, state-of-the-art workout equipment, a cardio area, a weight area, and personal trainers available.	25	People	4-002	2022-02-11 00:00:00	2022-02-12 00:00:00	Rp100.000,00	Rp250.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-11 00:00:00	4	2
12	Pasifik Aula	Spacious, modern, with AC, sound system, and a projector. Ideal for seminars, trainings, and conferences.	150	People	5-002	2022-02-15 00:00:00	2022-02-16 00:00:00	Rp1.500.000,00	Rp3.500.000,00	Rp1.750.000,00	Rp0,00	Rp150.000,00	2022-02-15 00:00:00	5	2
13	Oceana Swimming Pool	Spacious, clean, with AC, stunning views, relaxation area, and views of the surrounding area.	30	People	6-002	2022-02-17 00:00:00	2022-02-18 00:00:00	Rp100.000,00	Rp200.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-17 00:00:00	6	2
15	Deluxe Room	The Deluxe Room is a spacious and comfortable room with modern amenities such as air conditioning, TV, a work desk, and a private bathroom. 	2	Beds	1-003	2022-01-12 00:00:00	2022-01-13 00:00:00	Rp450.000,00	Rp950.000,00	Rp650.000,00	Rp0,00	Rp100.000,00	2022-01-12 00:00:00	1	3
16	Indonesian Restaurant	The Indonesian Restaurant offers authentic dishes made with high-quality ingredients. Experience the unique flavors of Indonesia in every dish.	250	People	2-003	2022-01-12 00:00:00	2022-03-12 00:00:00	Rp50.000,00	Rp450.000,00	Rp100.000,00	Rp20.000,00	Rp5.000,00	2022-01-12 00:00:00	2	3
17	Savana Meeting Room	Large, modern, fully equipped with air conditioning, projector, sound system, and wifi. Ideal for meetings, seminars, and training.	50	People	3-003	2022-02-10 00:00:00	2022-02-10 00:00:00	Rp150.000,00	Rp1.500.000,00	Rp200.000,00	Rp0,00	Rp100.000,00	2022-02-10 00:00:00	3	3
18	Raya Gym	Fully equipped with air conditioning, latest exercise equipment, cardio area, weight area, and personal trainers available.	25	People	4-003	2022-02-11 00:00:00	2022-02-12 00:00:00	Rp100.000,00	Rp250.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-11 00:00:00	4	3
19	Pasifik Aula	Large, modern, air conditioned, with sound system, projector, ideal for seminars, training, conferences.	150	People	5-003	2022-02-15 00:00:00	2022-02-16 00:00:00	Rp1.500.000,00	Rp3.500.000,00	Rp1.750.000,00	Rp0,00	Rp150.000,00	2022-02-15 00:00:00	5	3
20	Oceana Swimming Pool	Spacious, clean, air conditioned, with breathtaking views, relaxation area, and views of the surrounding area.	30	People	6-003	2022-02-17 00:00:00	2022-02-18 00:00:00	Rp100.000,00	Rp200.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-17 00:00:00	6	3
22	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-004	2023-03-12 15:18:49.248	2023-03-19 00:00:00	Rp350.000,00	Rp500.000,00	Rp450.000,00	Rp50.000,00	Rp35.000,00	2023-03-12 15:18:49.248	1	4
23	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-005	2023-03-12 15:21:07.777	2023-03-19 00:00:00	Rp300.000,00	Rp550.000,00	Rp400.000,00	Rp25.000,00	Rp40.000,00	2023-03-12 15:21:07.777	1	9
24	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access	1	BED	1-006	2023-03-12 15:22:38.063	2023-03-19 00:00:00	Rp400.000,00	Rp650.000,00	Rp550.000,00	Rp50.000,00	Rp45.000,00	2023-03-12 15:22:38.063	1	7
25	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-007	2023-03-12 15:23:58.009	2023-03-19 00:00:00	Rp450.000,00	Rp700.000,00	Rp600.000,00	Rp75.000,00	Rp50.000,00	2023-03-12 15:23:58.009	1	10
26	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-008	2023-03-12 15:24:46.842	2023-03-19 00:00:00	Rp350.000,00	Rp600.000,00	Rp500.000,00	Rp40.000,00	Rp30.000,00	2023-03-12 15:24:46.842	1	8
27	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-009	2023-03-12 15:26:36.323	2023-03-19 00:00:00	Rp450.000,00	Rp700.000,00	Rp600.000,00	Rp75.000,00	Rp50.000,00	2023-03-12 15:26:36.323	1	6
28	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-010	2023-03-12 15:28:18.87	2023-03-19 00:00:00	Rp400.000,00	Rp650.000,00	Rp550.000,00	Rp50.000,00	Rp45.000,00	2023-03-12 15:28:18.87	1	5
29	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-011	2023-03-12 18:55:44.677	2023-03-19 00:00:00	Rp350.000,00	Rp650.000,00	Rp450.000,00	Rp75.000,00	Rp45.000,00	2023-03-12 18:55:44.677	1	11
30	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-012	2023-03-12 19:00:52.61	2023-03-19 00:00:00	Rp300.000,00	Rp500.000,00	Rp450.000,00	Rp0,00	Rp35.000,00	2023-03-12 19:00:52.61	1	12
31	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-013	2023-03-12 19:10:48.024	2023-03-19 00:00:00	Rp350.000,00	Rp550.000,00	Rp400.000,00	Rp50.000,00	Rp30.000,00	2023-03-12 19:10:48.024	1	13
32	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-014	2023-03-12 20:31:39.491	2023-03-19 00:00:00	Rp350.000,00	Rp500.000,00	Rp450.000,00	Rp50.000,00	Rp35.000,00	2023-03-12 20:31:39.491	1	14
33	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-015	2023-03-12 20:32:51.179	2023-03-19 00:00:00	Rp300.000,00	Rp550.000,00	Rp400.000,00	Rp25.000,00	Rp40.000,00	2023-03-12 20:32:51.179	1	15
34	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-016	2023-03-12 20:36:22.428	2023-03-19 00:00:00	Rp400.000,00	Rp650.000,00	Rp550.000,00	Rp50.000,00	Rp45.000,00	2023-03-12 20:36:22.428	1	1
35	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-017	2023-03-12 20:37:45.919	2023-03-19 00:00:00	Rp450.000,00	Rp700.000,00	Rp500.000,00	Rp75.000,00	Rp50.000,00	2023-03-12 20:37:45.919	1	2
37	Superior Room	The Superior Room is a comfortable and spacious accommodation option featuring modern design, en-suite bathroom with a shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	1	BED	1-018	2023-03-12 20:42:18.333	2023-03-19 00:00:00	Rp300.000,00	Rp550.000,00	Rp400.000,00	Rp30.000,00	Rp40.000,00	2023-03-12 20:42:18.333	1	3
38	Deluxe Room	The Deluxe Room is a luxurious and elegantly designed accommodation featuring spacious layout, king-size bed or twin beds, large en-suite bathroom with a bathtub and separate shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access. 	2	BED	1-019	2023-03-12 20:59:59.252	2023-03-19 00:00:00	Rp500.000,00	Rp780.000,00	Rp650.000,00	Rp50.000,00	Rp75.000,00	2023-03-12 20:59:59.252	1	4
39	Deluxe Room	The Deluxe Room is a luxurious and elegantly designed accommodation featuring spacious layout, king-size bed or twin beds, large en-suite bathroom with a bathtub and separate shower, flat-screen TV, work desk, minibar, and complimentary Wi-Fi access.	2	BED	1-020	2023-03-12 21:02:30.099	2023-03-19 00:00:00	Rp550.000,00	Rp790.000,00	Rp700.000,00	Rp0,00	Rp80.000,00	2023-03-12 21:02:30.099	1	5
\.


--
-- Data for Name: facility_photo; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.facility_photo (fapho_faci_id, fapho_id, fapho_thumbnail_filename, fapho_photo_filename, fapho_primary, fapho_url, fapho_modified_date) FROM stdin;
34	1	linus-mimietz-p3UWyaujtQo-unsplash.jpg	linus-mimietz-p3UWyaujtQo-unsplash-1678692742561-552111374.jpg	t	public\\FacilitiesPhotos\\linus-mimietz-p3UWyaujtQo-unsplash-1678692742561-552111374.jpg	2023-03-13 00:00:00
34	2	linus-mimietz-sgIhwj4cSiU-unsplash.jpg	linus-mimietz-sgIhwj4cSiU-unsplash-1678692756224-263037656.jpg	f	public\\FacilitiesPhotos\\linus-mimietz-sgIhwj4cSiU-unsplash-1678692756224-263037656.jpg	2023-03-13 00:00:00
34	3	mark-champs-Id2IIl1jOB0-unsplash.jpg	mark-champs-Id2IIl1jOB0-unsplash-1678692756263-284835640.jpg	f	public\\FacilitiesPhotos\\mark-champs-Id2IIl1jOB0-unsplash-1678692756263-284835640.jpg	2023-03-13 00:00:00
1	4	febrian-zakaria-sjvU0THccQA-unsplash.jpg	febrian-zakaria-sjvU0THccQA-unsplash-1678692768621-210456400.jpg	t	public\\FacilitiesPhotos\\febrian-zakaria-sjvU0THccQA-unsplash-1678692768621-210456400.jpg	2023-03-13 00:00:00
1	5	kenny-eliason-iAftdIcgpFc-unsplash.jpg	kenny-eliason-iAftdIcgpFc-unsplash-1678692782681-605636346.jpg	f	public\\FacilitiesPhotos\\kenny-eliason-iAftdIcgpFc-unsplash-1678692782681-605636346.jpg	2023-03-13 00:00:00
1	6	sasha-kaunas-67-sOi7mVIk-unsplash.jpg	sasha-kaunas-67-sOi7mVIk-unsplash-1678692782710-561349646.jpg	f	public\\FacilitiesPhotos\\sasha-kaunas-67-sOi7mVIk-unsplash-1678692782710-561349646.jpg	2023-03-13 00:00:00
2	7	shawnanggg-nmpW_WwwVSc-unsplash.jpg	shawnanggg-nmpW_WwwVSc-unsplash-1678692867493-184273390.jpg	t	public\\FacilitiesPhotos\\shawnanggg-nmpW_WwwVSc-unsplash-1678692867493-184273390.jpg	2023-03-13 00:00:00
8	8	pranav-kumar-jain-pHcLOc_RzQ0-unsplash.jpg	pranav-kumar-jain-pHcLOc_RzQ0-unsplash-1678692897650-884973795.jpg	t	public\\FacilitiesPhotos\\pranav-kumar-jain-pHcLOc_RzQ0-unsplash-1678692897650-884973795.jpg	2023-03-13 00:00:00
8	9	visualsofdana-T5pL6ciEn-I-unsplash.jpg	visualsofdana-T5pL6ciEn-I-unsplash-1678692926588-315536453.jpg	f	public\\FacilitiesPhotos\\visualsofdana-T5pL6ciEn-I-unsplash-1678692926588-315536453.jpg	2023-03-13 00:00:00
8	10	andrew-neel-B4rEJ09-Puo-unsplash.jpg	andrew-neel-B4rEJ09-Puo-unsplash-1678692926613-27495111.jpg	f	public\\FacilitiesPhotos\\andrew-neel-B4rEJ09-Puo-unsplash-1678692926613-27495111.jpg	2023-03-13 00:00:00
35	11	albert-vincent-wu-fupf3-xAUqw-unsplash.jpg	albert-vincent-wu-fupf3-xAUqw-unsplash-1678692947073-603587246.jpg	t	public\\FacilitiesPhotos\\albert-vincent-wu-fupf3-xAUqw-unsplash-1678692947073-603587246.jpg	2023-03-13 00:00:00
35	12	ralph-ravi-kayden-FqqiAvJejto-unsplash.jpg	ralph-ravi-kayden-FqqiAvJejto-unsplash-1678692975168-436235541.jpg	f	public\\FacilitiesPhotos\\ralph-ravi-kayden-FqqiAvJejto-unsplash-1678692975168-436235541.jpg	2023-03-13 00:00:00
35	13	khach-s-n-tinh-nhan-venice-1-hotel-FL2cq-GgnWQ-unsplash.jpg	khach-s-n-tinh-nhan-venice-1-hotel-FL2cq-GgnWQ-unsplash-1678692975184-276814068.jpg	f	public\\FacilitiesPhotos\\khach-s-n-tinh-nhan-venice-1-hotel-FL2cq-GgnWQ-unsplash-1678692975184-276814068.jpg	2023-03-13 00:00:00
9	14	rezha-ramadhan-sV8M_Lkg60Y-unsplash.jpg	rezha-ramadhan-sV8M_Lkg60Y-unsplash-1678692987593-872059460.jpg	t	public\\FacilitiesPhotos\\rezha-ramadhan-sV8M_Lkg60Y-unsplash-1678692987593-872059460.jpg	2023-03-13 00:00:00
15	15	sasha-kaunas-Fk9d0cxYqC4-unsplash.jpg	sasha-kaunas-Fk9d0cxYqC4-unsplash-1678693177867-728284852.jpg	t	public\\FacilitiesPhotos\\sasha-kaunas-Fk9d0cxYqC4-unsplash-1678693177867-728284852.jpg	2023-03-13 00:00:00
15	16	steven-ungermann-aRT5UCf2MYY-unsplash.jpg	steven-ungermann-aRT5UCf2MYY-unsplash-1678693190446-293351553.jpg	f	public\\FacilitiesPhotos\\steven-ungermann-aRT5UCf2MYY-unsplash-1678693190446-293351553.jpg	2023-03-13 00:00:00
15	17	linus-mimietz-p3UWyaujtQo-unsplash.jpg	linus-mimietz-p3UWyaujtQo-unsplash-1678693190460-754682683.jpg	f	public\\FacilitiesPhotos\\linus-mimietz-p3UWyaujtQo-unsplash-1678693190460-754682683.jpg	2023-03-13 00:00:00
37	18	linus-mimietz-sgIhwj4cSiU-unsplash.jpg	linus-mimietz-sgIhwj4cSiU-unsplash-1678693201788-752529775.jpg	t	public\\FacilitiesPhotos\\linus-mimietz-sgIhwj4cSiU-unsplash-1678693201788-752529775.jpg	2023-03-13 00:00:00
37	19	mark-champs-Id2IIl1jOB0-unsplash.jpg	mark-champs-Id2IIl1jOB0-unsplash-1678693216056-773197504.jpg	f	public\\FacilitiesPhotos\\mark-champs-Id2IIl1jOB0-unsplash-1678693216056-773197504.jpg	2023-03-13 00:00:00
37	20	febrian-zakaria-sjvU0THccQA-unsplash.jpg	febrian-zakaria-sjvU0THccQA-unsplash-1678693216066-339228788.jpg	f	public\\FacilitiesPhotos\\febrian-zakaria-sjvU0THccQA-unsplash-1678693216066-339228788.jpg	2023-03-13 00:00:00
16	21	bayu-syaits-LiqMV2zj60c-unsplash.jpg	bayu-syaits-LiqMV2zj60c-unsplash-1678693231144-540511143.jpg	t	public\\FacilitiesPhotos\\bayu-syaits-LiqMV2zj60c-unsplash-1678693231144-540511143.jpg	2023-03-13 00:00:00
5	22	ed35bba622fe9611f04d1acb5604b4c8.jpg	ed35bba622fe9611f04d1acb5604b4c8-1678705592635-741501470.jpg	t	public\\FacilitiesPhotos\\ed35bba622fe9611f04d1acb5604b4c8-1678705592635-741501470.jpg	2023-03-13 00:00:00
5	23	Grand-Ballroom-InterContinental-Bandung-Dago-Pakar.jpg	Grand-Ballroom-InterContinental-Bandung-Dago-Pakar-1678705613410-92366782.jpg	f	public\\FacilitiesPhotos\\Grand-Ballroom-InterContinental-Bandung-Dago-Pakar-1678705613410-92366782.jpg	2023-03-13 00:00:00
5	24	Meeting_538.jpg	Meeting_538-1678705613422-441710217.jpg	f	public\\FacilitiesPhotos\\Meeting_538-1678705613422-441710217.jpg	2023-03-13 00:00:00
\.


--
-- Data for Name: facility_price_history; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.facility_price_history (faph_faci_id, faph_id, faph_startdate, faph_enddate, faph_low_price, faph_high_price, faph_rate_price, faph_discount, faph_tax_rate, faph_modified_date, faph_user_id) FROM stdin;
\N	1	2022-01-12 00:00:00	2022-01-13 00:00:00	Rp450.000,00	Rp950.000,00	Rp650.000,00	Rp0,00	Rp100.000,00	2022-01-12 00:00:00	1
\N	2	2022-01-12 00:00:00	2022-03-12 00:00:00	Rp50.000,00	Rp450.000,00	Rp100.000,00	Rp20.000,00	Rp5.000,00	2022-01-12 00:00:00	2
\N	3	2022-02-10 00:00:00	2022-02-10 00:00:00	Rp150.000,00	Rp1.500.000,00	Rp200.000,00	Rp0,00	Rp100.000,00	2022-02-10 00:00:00	3
\N	4	2022-02-11 00:00:00	2022-02-12 00:00:00	Rp100.000,00	Rp250.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-11 00:00:00	4
\N	5	2022-02-15 00:00:00	2022-02-16 00:00:00	Rp1.500.000,00	Rp3.500.000,00	Rp1.750.000,00	Rp0,00	Rp150.000,00	2022-02-15 00:00:00	5
\N	6	2022-02-17 00:00:00	2022-02-18 00:00:00	Rp100.000,00	Rp200.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-17 00:00:00	6
\N	7	2022-02-22 00:00:00	2022-02-23 00:00:00	Rp5.000.000,00	Rp7.000.000,00	Rp6.250.000,00	Rp500.000,00	Rp250.000,00	2022-02-22 00:00:00	7
\N	8	2022-01-12 00:00:00	2022-01-13 00:00:00	Rp450.000,00	Rp950.000,00	Rp650.000,00	Rp0,00	Rp100.000,00	2022-01-12 00:00:00	8
\N	9	2022-01-12 00:00:00	2022-03-12 00:00:00	Rp50.000,00	Rp450.000,00	Rp100.000,00	Rp20.000,00	Rp5.000,00	2022-01-12 00:00:00	9
\N	10	2022-02-10 00:00:00	2022-02-10 00:00:00	Rp150.000,00	Rp1.500.000,00	Rp200.000,00	Rp0,00	Rp100.000,00	2022-02-10 00:00:00	10
\N	11	2022-02-11 00:00:00	2022-02-12 00:00:00	Rp100.000,00	Rp250.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-11 00:00:00	11
\N	12	2022-02-15 00:00:00	2022-02-16 00:00:00	Rp1.500.000,00	Rp3.500.000,00	Rp1.750.000,00	Rp0,00	Rp150.000,00	2022-02-15 00:00:00	12
\N	13	2022-02-17 00:00:00	2022-02-18 00:00:00	Rp100.000,00	Rp200.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-17 00:00:00	13
\N	14	2022-02-22 00:00:00	2022-02-23 00:00:00	Rp5.000.000,00	Rp7.000.000,00	Rp6.250.000,00	Rp500.000,00	Rp250.000,00	2022-02-22 00:00:00	14
\N	15	2022-01-12 00:00:00	2022-01-13 00:00:00	Rp450.000,00	Rp950.000,00	Rp650.000,00	Rp0,00	Rp100.000,00	2022-01-12 00:00:00	15
\N	16	2022-01-12 00:00:00	2022-03-12 00:00:00	Rp50.000,00	Rp450.000,00	Rp100.000,00	Rp20.000,00	Rp5.000,00	2022-01-12 00:00:00	16
\N	17	2022-02-10 00:00:00	2022-02-10 00:00:00	Rp150.000,00	Rp1.500.000,00	Rp200.000,00	Rp0,00	Rp100.000,00	2022-02-10 00:00:00	17
\N	18	2022-02-11 00:00:00	2022-02-12 00:00:00	Rp100.000,00	Rp250.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-11 00:00:00	18
\N	19	2022-02-15 00:00:00	2022-02-16 00:00:00	Rp1.500.000,00	Rp3.500.000,00	Rp1.750.000,00	Rp0,00	Rp150.000,00	2022-02-15 00:00:00	19
\N	20	2022-02-17 00:00:00	2022-02-18 00:00:00	Rp100.000,00	Rp200.000,00	Rp150.000,00	Rp0,00	Rp10.000,00	2022-02-17 00:00:00	20
22	21	2023-03-12 15:18:49.446	2023-03-19 00:00:00	Rp350.000,00	Rp500.000,00	Rp450.000,00	Rp50.000,00	Rp35.000,00	2023-03-12 15:18:49.248	\N
23	22	2023-03-12 15:21:07.845	2023-03-19 00:00:00	Rp300.000,00	Rp550.000,00	Rp400.000,00	Rp25.000,00	Rp40.000,00	2023-03-12 15:21:07.777	\N
24	23	2023-03-12 15:22:38.268	2023-03-19 00:00:00	Rp400.000,00	Rp650.000,00	Rp550.000,00	Rp50.000,00	Rp45.000,00	2023-03-12 15:22:38.063	\N
25	24	2023-03-12 15:23:58.07	2023-03-19 00:00:00	Rp450.000,00	Rp700.000,00	Rp600.000,00	Rp75.000,00	Rp50.000,00	2023-03-12 15:23:58.009	\N
26	25	2023-03-12 15:24:46.903	2023-03-19 00:00:00	Rp350.000,00	Rp600.000,00	Rp500.000,00	Rp40.000,00	Rp30.000,00	2023-03-12 15:24:46.842	\N
27	26	2023-03-12 15:26:36.384	2023-03-19 00:00:00	Rp450.000,00	Rp700.000,00	Rp600.000,00	Rp75.000,00	Rp50.000,00	2023-03-12 15:26:36.323	\N
28	27	2023-03-12 15:28:18.927	2023-03-19 00:00:00	Rp400.000,00	Rp650.000,00	Rp550.000,00	Rp50.000,00	Rp45.000,00	2023-03-12 15:28:18.87	\N
29	28	2023-03-12 18:55:44.883	2023-03-19 00:00:00	Rp350.000,00	Rp650.000,00	Rp450.000,00	Rp75.000,00	Rp45.000,00	2023-03-12 18:55:44.677	\N
30	29	2023-03-12 19:00:52.678	2023-03-19 00:00:00	Rp300.000,00	Rp500.000,00	Rp450.000,00	Rp0,00	Rp35.000,00	2023-03-12 19:00:52.61	\N
31	30	2023-03-12 19:10:48.093	2023-03-19 00:00:00	Rp350.000,00	Rp550.000,00	Rp400.000,00	Rp50.000,00	Rp35.000,00	2023-03-12 19:10:48.024	\N
31	31	2023-03-12 19:12:31.434	2023-03-19 00:00:00	Rp350.000,00	Rp550.000,00	Rp400.000,00	Rp50.000,00	Rp30.000,00	2023-03-12 19:12:31.434	\N
32	32	2023-03-12 20:31:39.558	2023-03-19 00:00:00	Rp350.000,00	Rp500.000,00	Rp450.000,00	Rp50.000,00	Rp35.000,00	2023-03-12 20:31:39.491	\N
33	33	2023-03-12 20:32:51.249	2023-03-19 00:00:00	Rp300.000,00	Rp550.000,00	Rp400.000,00	Rp25.000,00	Rp40.000,00	2023-03-12 20:32:51.179	\N
34	34	2023-03-12 20:36:22.491	2023-03-19 00:00:00	Rp400.000,00	Rp650.000,00	Rp550.000,00	Rp50.000,00	Rp45.000,00	2023-03-12 20:36:22.428	\N
35	35	2023-03-12 20:37:45.982	2023-03-19 00:00:00	Rp450.000,00	Rp700.000,00	Rp500.000,00	Rp75.000,00	Rp50.000,00	2023-03-12 20:37:45.919	\N
37	36	2023-03-12 20:42:18.514	2023-03-19 00:00:00	Rp300.000,00	Rp550.000,00	Rp400.000,00	Rp30.000,00	Rp40.000,00	2023-03-12 20:42:18.333	\N
38	37	2023-03-12 20:59:59.331	2023-03-19 00:00:00	Rp500.000,00	Rp780.000,00	Rp650.000,00	Rp50.000,00	Rp75.000,00	2023-03-12 20:59:59.252	\N
39	38	2023-03-12 21:02:30.159	2023-03-19 00:00:00	Rp550.000,00	Rp790.000,00	Rp700.000,00	Rp0,00	Rp80.000,00	2023-03-12 21:02:30.099	\N
\.


--
-- Data for Name: hotel_reviews; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.hotel_reviews (hore_id, hore_user_review, hore_rating, hore_created_on, hore_user_id, hore_hotel_id) FROM stdin;
1	Very satisfied with the hotel service. Clean and comfortable rooms, friendly and helpful staff.	5	2023-03-09 16:16:29.398693	1	1
2	This hotel is located strategically close to tourist attractions. Spacious and clean rooms, good service	5	2023-03-09 16:16:29.398693	2	2
3	First impression not great, but staff and clean room improved stay	3	2023-03-09 16:16:29.398693	3	3
4	The experience of staying at this hotel is very enjoyable. Complete facilities and comfortable rooms	4	2023-03-09 16:16:29.398693	4	4
5	This hotel is suitable for business trips. Complete facilities and professional staff. 	5	2023-03-09 16:16:29.398693	5	5
6	Kamar hotel ini agak kecil namun bersih dan nyaman. Pelayanan cukup baik.	3	2023-03-09 16:16:29.398693	6	6
7	This hotel is very suitable for families. Spacious rooms, complete facilities, and safe environment	4	2023-03-09 16:16:29.398693	7	7
8	The experience of staying at this hotel is quite satisfying. Clean and comfortable rooms, friendly staff.	4	2023-03-09 16:16:29.398693	8	8
9	This hotel is highly recommended. Clean and comfortable rooms, complete facilities, and friendly staff	5	2023-03-09 16:16:29.398693	9	9
10	Initial impression of hotel not positive, but clean & comfy rooms for a good stay experience.	4	2023-03-09 16:16:29.398693	10	10
\.


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.hotels (hotel_id, hotel_name, hotel_description, hotel_rating_star, hotel_phonenumber, hotel_modified_date, hotel_addr_id) FROM stdin;
3	The Kana Hotel	Outstanding resort by the sandy beach, surrounded by lush tropical gardens. Private beach, pool & water activities.	4	(224) 9780440	2023-03-12 14:54:19.812	3
1	The Kayon Resort Hotel	A five-star hotel located in the heart of the city, with elegant rooms and suites, full spa services.	5	(875) 8996635	2023-03-12 14:55:43.492	1
9	Aethon Hotel	A four-star hotel that is ideal for business travel, with comfortable guest rooms, free Wi-Fi	4	(582) 3817514	2023-03-12 14:56:08.034	9
2	Pondok Sari Hotel	A boutique-style hotel located in a trendy neighborhood. Offers comfortable guest rooms	4	(608) 5033257	2023-03-12 14:56:22.305	2
10	Harmoni Suites Hotel	A three-star hotel with beautiful scenery, comfortable guest rooms, a swimming pool, restaurant.	4	(512) 3214821	2023-03-12 14:56:46.492	10
5	Zephyros Hotel	Four-star hotel located in the Prapatan area. Offers comfortable rooms, free Wi-Fi, restaurant, and swimming pool.	4	(190) 4746721	2023-03-12 14:57:33.995	5
4	Adiwana Resort	Exceptional resort on sandy beach surrounded by lush green tropical gardens. Private beach, pool & water activities.	5	(344) 9952640	2023-03-12 14:58:54.585	4
8	MaxOne Hotels	A three-star family-friendly hotel with spacious rooms, a kids play area, a safe swimming pool, and a restaurant.	3	(465) 6137176	2023-03-12 14:59:25.366	8
7	Ampera Suites Hotel	A five-star hotel with luxurious facilities and exclusive services, spacious guest rooms, a spa, fitness center.	5	(377) 1046498	2023-03-12 15:00:24.787	7
6	Pondok Sari Hotel	Three-star beach hotel with breathtaking ocean views, clean guest rooms, a swimming pool, beach activities.	3	(177) 9985789	2023-03-12 15:01:42.236	6
11	Britz Hotel	A four-star hotel that is ideal for business travel, with comfortable guest rooms, free Wi-Fi	4	(021)123456789	2023-03-12 18:13:17.352	10
12	Saga Hotels	A four-star hotel that is ideal for business travel, with comfortable guest rooms, free Wi-Fi	4	(021)234561234	2023-03-12 18:22:08.532	1
13	Parahyangan Resort	\tExceptional resort on sandy beach surrounded by lush green tropical gardens. Private beach, pool & water activities.	5	(022)1234234567	2023-03-12 18:25:33.901	1
14	Emerald Resort	\tA five-star hotel located in the heart of the city, with elegant rooms and suites, full spa services.	5	(0762)123456789	2023-03-12 18:40:39.497	8
15	Ruby Hotel	A three-star family-friendly hotel with spacious rooms, a kids play area, a safe swimming pool, and a restaurant.	3	(021)1122334455	2023-03-12 19:13:29.045	6
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.department (dept_id, dept_name, dept_modified_date) FROM stdin;
1	Front Office	2023-03-09 16:24:03.653015
2	Housekeeping	2023-03-09 16:24:03.653015
3	Executive Office	2023-03-09 16:24:03.653015
4	Maintenance	2023-03-09 16:24:03.653015
5	Food and Beverage	2023-03-09 16:24:03.653015
6	Sales and Marketing	2023-03-09 16:24:03.653015
7	Accounting	2023-03-09 16:24:03.653015
8	Human Resources	2023-03-09 16:24:03.653015
9	Event Planning	2023-03-09 16:24:03.653015
10	Guest Services	2023-03-09 16:24:03.653015
11	Security	2023-03-09 16:24:03.653015
12	Engineering	2023-03-09 16:24:03.653015
13	Spa and Fitness	2023-03-09 16:24:03.653015
14	Reservations	2023-03-09 16:24:03.653015
15	Concierge	2023-03-09 16:24:03.653015
16	Kitchen	2023-03-09 16:24:03.653015
17	Laundry	2023-03-09 16:24:03.653015
18	Pool and Beach	2023-03-09 16:24:03.653015
19	Gift Shop	2023-03-09 16:24:03.653015
21	Testings	2023-03-14 12:18:43.561
22	Testings	2023-03-14 12:18:43.554
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee (emp_id, emp_national_id, emp_birth_date, emp_marital_status, emp_gender, emp_hire_date, emp_salaried_flag, emp_vacation_hours, emp_sickleave_hourse, emp_current_flag, emp_photo, emp_modified_date, emp_emp_id, emp_joro_id, emp_user_id) FROM stdin;
2	IDN	2023-01-12	M	M	2017-01-01 22:09:54.390584	1	5	0	1	\N	2023-03-09 16:24:03.653015	1	5	2
3	IDN	2023-01-12	M	F	2018-04-11 22:09:31.194324	1	4	1	1	\N	2023-03-09 16:24:03.653015	2	5	3
4	IDN	2023-01-12	M	M	2018-05-11 22:09:31.194324	1	4	1	1	\N	2023-03-09 16:24:03.653015	2	5	4
5	IDN	2023-01-12	S	M	2019-07-11 22:13:15.547295	1	4	1	1	\N	2023-03-09 16:24:03.653015	2	5	5
6	IDN	2023-01-12	M	M	2019-07-11 22:25:14.906377	1	4	1	1	\N	2023-03-09 16:24:03.653015	2	5	6
7	IDN	2023-01-12	M	F	2019-07-11 22:25:14.906377	1	4	1	1	\N	2023-03-09 16:24:03.653015	2	5	7
8	IDN	2023-01-12	S	F	2017-01-01 22:09:54.390584	1	5	0	1	\N	2023-03-09 16:24:03.653015	1	7	8
9	IDN	2023-01-12	M	F	2018-04-11 22:09:31.194324	1	4	1	1	\N	2023-03-09 16:24:03.653015	8	7	9
10	IDN	2023-01-12	M	M	2018-05-11 22:09:31.194324	1	4	1	1	\N	2023-03-09 16:24:03.653015	8	7	10
11	IDN	2023-01-12	S	M	2019-07-11 22:13:15.547295	1	4	1	1	\N	2023-03-09 16:24:03.653015	8	7	11
12	IDN	2023-01-12	M	F	2017-01-01 22:09:54.390584	1	5	0	1	\N	2023-03-09 16:24:03.653015	1	6	12
13	IDN	2023-01-12	S	F	2018-04-11 22:09:31.194324	1	3	1	1	\N	2023-03-09 16:24:03.653015	12	6	13
14	IDN	2023-01-12	M	M	2018-05-11 22:09:31.194324	1	2	2	1	\N	2023-03-09 16:24:03.653015	12	6	14
15	IDN	2023-01-12	S	M	2019-07-11 22:13:15.547295	1	4	0	1	\N	2023-03-09 16:24:03.653015	12	6	15
16	IDN	2023-01-12	M	F	2017-01-01 22:09:54.390584	1	5	0	1	\N	2023-03-09 16:24:03.653015	1	8	16
17	IDN	2023-01-12	S	F	2018-04-11 22:09:31.194324	1	3	1	1	\N	2023-03-09 16:24:03.653015	16	8	17
18	IDN	2023-01-12	M	M	2018-05-11 22:09:31.194324	1	2	2	1	\N	2023-03-09 16:24:03.653015	1	3	18
19	IDN	2023-01-12	S	M	2019-07-11 22:13:15.547295	1	4	0	1	\N	2023-03-09 16:24:03.653015	18	3	19
20	IDN	2023-01-12	S	M	2019-07-11 22:13:15.547295	1	4	0	1	\N	2023-03-09 16:24:03.653015	18	11	20
1	IDN	2023-01-12	M	M	2016-01-11 20:35:11.679331	1	5	0	1	logoaja1678719356618.png	2023-03-09 16:24:03.653015	\N	20	1
21	123124124	2023-03-21		M	2023-03-14 00:00:00	1	0	0	0	WhatsApp Image 2023-01-13 at 161678774229792.jpeg	2023-03-14 13:09:46.117	2	11	56
\.


--
-- Data for Name: employee_department_history; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee_department_history (edhi_id, edhi_emp_id, edhi_start_date, edhi_end_date, edhi_modified_date, edhi_dept_id, edhi_shift_id) FROM stdin;
1	2	2023-01-02 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	6	1
2	3	2023-01-03 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	6	1
3	4	2023-01-04 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	6	1
4	5	2023-01-05 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	6	1
5	6	2023-01-06 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	6	1
6	7	2023-01-07 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	6	1
7	8	2023-01-08 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	8	1
8	9	2023-01-09 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	8	1
9	10	2023-01-10 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	8	1
10	11	2023-01-11 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	8	1
11	12	2023-01-12 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	7	1
12	13	2023-01-13 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	7	1
13	14	2023-01-14 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	7	1
14	15	2023-01-15 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	7	1
15	16	2023-01-16 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	10	1
16	17	2023-01-17 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	10	2
17	18	2023-01-18 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	4	1
18	19	2023-01-19 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	4	1
19	20	2023-01-20 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	12	1
20	1	2023-01-20 00:00:00	2024-01-02 00:00:00	2023-03-09 16:24:03.653015	3	1
22	21	2023-03-14 00:00:00	2023-03-14 12:23:47.2	2023-03-14 12:23:15.556289	8	1
23	1	2023-03-14 12:23:47.2	2023-03-14 12:24:56.815	2023-03-14 12:23:47.2	3	1
24	1	2023-03-14 12:24:56.815	2023-03-14 12:25:42.072	2023-03-14 12:24:56.815	7	1
25	1	2023-03-14 12:25:42.072	2023-03-14 12:34:56.626	2023-03-14 12:25:42.072	7	1
26	21	2023-03-14 12:34:56.625	2023-03-14 12:35:34.742	2023-03-14 12:34:56.625	7	1
27	21	2023-03-14 12:35:34.742	2023-03-14 13:09:45.895	2023-03-14 12:35:34.742	4	1
28	21	2023-03-14 13:09:45.893	\N	2023-03-14 13:09:45.893	12	1
\.


--
-- Data for Name: employee_pay_history; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee_pay_history (ephi_emp_id, ephi_rate_change_date, ephi_rate_salary, ephi_pay_frequence, ephi_modified_date) FROM stdin;
1	2023-01-01 00:00:00	Rp30.000.000,00	1	2023-03-09 16:24:03.653015
2	2023-01-02 00:00:00	Rp30.000.000,00	1	2023-03-09 16:24:03.653015
3	2023-01-03 00:00:00	Rp10.000.000,00	1	2023-03-09 16:24:03.653015
4	2023-01-04 00:00:00	Rp6.500.000,00	1	2023-03-09 16:24:03.653015
5	2023-01-05 00:00:00	Rp6.500.000,00	1	2023-03-09 16:24:03.653015
6	2023-01-06 00:00:00	Rp6.500.000,00	1	2023-03-09 16:24:03.653015
7	2023-01-07 00:00:00	Rp6.500.000,00	1	2023-03-09 16:24:03.653015
8	2023-01-08 00:00:00	Rp10.000.000,00	1	2023-03-09 16:24:03.653015
9	2023-01-09 00:00:00	Rp5.500.000,00	1	2023-03-09 16:24:03.653015
10	2023-01-10 00:00:00	Rp5.500.000,00	1	2023-03-09 16:24:03.653015
11	2023-01-11 00:00:00	Rp5.500.000,00	1	2023-03-09 16:24:03.653015
12	2023-01-12 00:00:00	Rp5.500.000,00	1	2023-03-09 16:24:03.653015
13	2023-01-13 00:00:00	Rp9.000.000,00	1	2023-03-09 16:24:03.653015
14	2023-01-14 00:00:00	Rp8.000.000,00	1	2023-03-09 16:24:03.653015
15	2023-01-15 00:00:00	Rp8.000.000,00	1	2023-03-09 16:24:03.653015
16	2023-01-16 00:00:00	Rp8.000.000,00	1	2023-03-09 16:24:03.653015
17	2023-01-17 00:00:00	Rp5.500.000,00	1	2023-03-09 16:24:03.653015
18	2023-01-18 00:00:00	Rp6.200.000,00	1	2023-03-09 16:24:03.653015
19	2023-01-19 00:00:00	Rp6.000.000,00	1	2023-03-09 16:24:03.653015
20	2023-01-20 00:00:00	Rp5.600.000,00	1	2023-03-09 16:24:03.653015
1	2023-03-13 21:56:24.06	Rp30.000.000,00	1	2023-03-13 21:56:24.06
21	2023-03-14 12:23:15.556289	Rp8.000.000,00	\N	2023-03-14 12:23:15.556289
21	2023-03-14 13:10:19.276	Rp4.000.000,00	1	2023-03-14 13:10:19.276
\.


--
-- Data for Name: job_role; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.job_role (joro_id, joro_name, joro_modified_date) FROM stdin;
1	Front Desk Clerk	2023-03-09 16:24:03.653015
2	Room Attendant	2023-03-09 16:24:03.653015
3	Maintenance Technician	2023-03-09 16:24:03.653015
4	Bartender	2023-03-09 16:24:03.653015
5	Sales and Marketing Manager	2023-03-09 16:24:03.653015
6	Accountant	2023-03-09 16:24:03.653015
7	Human Resources Coordinator	2023-03-09 16:24:03.653015
8	Event Planner	2023-03-09 16:24:03.653015
9	Guest Services Agent	2023-03-09 16:24:03.653015
10	Security Officer	2023-03-09 16:24:03.653015
11	Engineer	2023-03-09 16:24:03.653015
12	Spa and Fitness Attendant	2023-03-09 16:24:03.653015
13	Reservations Agent	2023-03-09 16:24:03.653015
14	Concierge	2023-03-09 16:24:03.653015
15	Line Cook	2023-03-09 16:24:03.653015
16	Laundry Attendant	2023-03-09 16:24:03.653015
17	Pool and Beach Attendant	2023-03-09 16:24:03.653015
18	Gift Shop Clerk	2023-03-09 16:24:03.653015
19	Bellhop/Valet	2023-03-09 16:24:03.653015
20	General Manager	2023-03-09 16:24:03.653015
\.


--
-- Data for Name: shift; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.shift (shift_id, shift_name, shift_start_time, shift_end_time) FROM stdin;
1	pagi	07:00:00	15:00:00
2	siang	15:00:00	23:00:00
3	malam	23:00:00	07:00:00
\.


--
-- Data for Name: work_order_detail; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.work_order_detail (wode_id, wode_task_name, wode_status, wode_start_date, wode_end_date, wode_notes, wode_emp_id, wode_seta_id, wode_faci_id, wode_woro_id) FROM stdin;
1	\N	\N	\N	\N	\N	1	\N	\N	1
2	\N	\N	\N	\N	\N	2	\N	\N	2
3	\N	\N	\N	\N	\N	3	\N	\N	3
4	\N	\N	\N	\N	\N	4	\N	\N	4
5	\N	\N	\N	\N	\N	5	\N	\N	5
6	\N	\N	\N	\N	\N	6	\N	\N	6
7	\N	\N	\N	\N	\N	7	\N	\N	7
8	\N	\N	\N	\N	\N	8	\N	\N	8
9	\N	\N	\N	\N	\N	9	\N	\N	9
10	\N	\N	\N	\N	\N	10	\N	\N	10
11	\N	\N	\N	\N	\N	11	\N	\N	11
12	\N	\N	\N	\N	\N	12	\N	\N	12
13	\N	\N	\N	\N	\N	13	\N	\N	13
14	\N	\N	\N	\N	\N	14	\N	\N	14
15	\N	\N	\N	\N	\N	15	\N	\N	15
16	\N	\N	\N	\N	\N	16	\N	\N	16
17	\N	\N	\N	\N	\N	17	\N	\N	17
18	\N	\N	\N	\N	\N	18	\N	\N	18
19	\N	\N	\N	\N	\N	19	\N	\N	19
20	\N	\N	\N	\N	\N	20	\N	\N	20
22	Cleaning the room	INPROGRESS	2023-03-13 21:57:58.841	\N	bersihin	16	\N	\N	\N
\.


--
-- Data for Name: work_orders; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.work_orders (woro_id, woro_start_date, woro_status, woro_user_id) FROM stdin;
1	2023-01-11 06:50:57.259567	OPEN	1
2	2023-01-11 06:50:57.259567	CLOSED	2
3	2023-01-11 12:55:33.282045	CANCELED	2
4	2023-01-11 12:55:33.282045	CLOSED	1
5	2023-01-11 06:50:57.259567	OPEN	5
6	2023-01-11 06:50:57.259567	OPEN	6
7	2023-01-11 06:20:11.714037	OPEN	7
8	2023-01-11 06:20:11.714037	OPEN	8
9	2023-01-11 06:20:11.714037	OPEN	9
10	2023-01-11 15:21:35.238554	CLOSED	10
11	2023-01-11 15:21:35.238554	CLOSED	11
12	2023-01-11 15:21:35.238554	CANCELED	12
13	2023-01-11 15:21:35.238554	CLOSED	13
14	2023-01-11 15:21:35.238554	CLOSED	14
15	2023-01-11 15:21:35.238554	OPEN	15
16	2023-01-11 15:21:35.238554	CLOSED	16
17	2023-01-11 15:21:35.238554	OPEN	17
18	2023-01-11 15:21:35.238554	CLOSED	18
19	2023-01-11 15:21:35.238554	OPEN	19
20	2023-01-11 15:21:35.238554	CLOSED	20
22	2023-03-13 00:00:00	OPEN	1
\.


--
-- Data for Name: address; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.address (addr_id, addr_line1, addr_line2, addr_postal_code, addr_spatial_location, addr_prov_id) FROM stdin;
2	Jl. Raya Puncak - Gadog No.54 Kec. Cipanas	Cianjur	43253	{"lat": -7.357977, "lng": 107.195717}	1
3	Jl. Bulevar Ahmad Yani, RT.006/RW.002, Marga Mulya, Kec. Bekasi Utara	Bekasi	17142	{"lat": -6.238270, "lng": 106.975571}	1
4	Jl. M.H. Thamrin No.1, RT.1/RW.5, Menteng, Kec. Menteng	Jakarta	10310	{"lat": -6.175110, "lng": 106.865036}	4
5	Jl. Gatot Subroto No.18, Kuningan Bar., Kec. Mampang Prpt	Depok	12710	{"lat": -6.175110, "lng": 106.865036}	4
6	Jl. Prof. DR. Satrio No.Kav 3 – 5, Karet Kuningan, Kecamatan Setiabudi	Tanggerang	12940	{"lat": -6.175110, "lng": 106.865036}	4
7	Komplek Opi Mall, Jl. Gubernur H. A Bastari, Sungai Kedukan, Kec. Rambutan	Palembang	30137	{"lat": -2.976074, "lng": 104.775429}	8
8	Jl. Demang Lebar Daun No.58B, Demang Lebar Daun, Kec. Ilir Bar. I	Padang	30967	{"lat": -2.976074, "lng": 104.775429}	8
9	Jl. R. Sukamto No.20, 20 Ilir D II, Kec. Kemuning	Brebes	30114	{"lat": -2.976074, "lng": 104.775429}	8
10	Jl. Veteran No.167, Kepandean Baru, Kec. Ilir Tim. I	Cirebon	30126	{"lat": -2.976074, "lng": 104.775429}	8
11	\N	Bogor	\N	\N	1
12	das	asf	\N	\N	\N
1	Jl. Taman Safari No. 101 kec.Cisarua	Bogor	16750	{"lat": -6.597147, "lng": 106.806038}	1
\.


--
-- Data for Name: category_group; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.category_group (cagro_id, cagro_name, cagro_description, cagro_type, cagro_icon, cagro_icon_url) FROM stdin;
1	Room	Category for room type	Facility	room.png	../../assets//master/room.svg
2	Restaurant	Category for restaurant service	Service	restaurant.png	../../assets/master/resto.svg
3	Meeting Room	Category for meeting room service	Service	meeting.png	../../assets/master/meeting.svg
4	Gym	Category for gym service	Facility	gym.png	../../assets/master/gym.svg
5	Hall	Category for hall service	Facility	hall.png	../../assets/master/aula.svg
6	Swimming Pool	Category for swimming pool service	Facility	pool.png	../../assets/master/swimming-pool.svg
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.country (country_id, country_name, country_region_id) FROM stdin;
2	Singapore	1
3	Russia	5
4	Phillippines	1
5	China	1
6	Qatar	1
7	Palestine	1
8	Saudi Arabia	1
9	Oman	1
10	Japan	1
11	Malaysia	1
12	South Korea	1
13	Vietnam	1
14	Thailand	1
15	Yemen	1
16	Afghanistan	1
17	Bangladesh	1
18	Brunei	1
19	Khazkhstan	1
1	Indonesia	1
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.members (memb_name, memb_description) FROM stdin;
Silver	Access to basic hotel facilities
Gold	Access to basic and premium hotel facilities, including complimentary breakfast and room upgrades
VIP	Access to all hotel facilities, including dedicated concierge service and exclusive discounts
WIZARD	Priority access to all hotel facilities & services, incl. 24-hr concierge & room service
\.


--
-- Data for Name: policy; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.policy (poli_id, poli_name, poli_description) FROM stdin;
1	Check-in Time	Check-in time is 3:00 PM
2	Check-out Time	Check-out time is 11:00 AM
3	Smoking Policy	This is a smoke-free hotel
4	Pet Policy	Pets are not allowed in the hotel area
5	Cancellation Policy	Cancellations must be made 48 hours prior to arrival
6	Additional Guest Policy	Additional fees will be charged for guests over 2 people
7	Parking Policy	Free parking is available for all guests
8	Breakfast Policy	Breakfast is included in the room rate
9	Swimming Pool Policy	Swimming pool operating hours are from 7:00 AM to 10:00 PM
10	Gym Policy	Gym operating hours are from 6:00 AM to 10:00 PM
11	Laundry Policy	Laundry service is available at an additional charge
12	Mini Bar Policy	Mini bar items are available for purchase
13	Internet Policy	Free internet access is available for all guests
14	Restaurant Policy	The restaurant is open from 6:00 AM to 10:00 PM
15	Bar Policy	The bar is open from 4:00 PM to 12:00 AM
16	Room Service Policy	Room service is available 24 hours a day
17	Child Policy	Children under 12 stay for free with adults
18	Credit Card Policy	We accept major credit cards
19	Group Policy	Special rates are available for groups
\.


--
-- Data for Name: policy_category_group; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.policy_category_group (poca_id, poca_poli_id, poca_cagro_id) FROM stdin;
1	1	1
2	2	1
3	3	5
4	4	5
5	5	1
6	6	3
7	7	5
8	8	2
9	9	6
10	10	4
11	11	5
12	12	2
13	13	5
14	14	2
15	15	2
16	16	1
17	17	1
18	18	1
19	19	3
\.


--
-- Data for Name: price_items; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.price_items (prit_id, prit_name, prit_price, prit_description, prit_type, prit_modified_date) FROM stdin;
1	Chicken Satay	Rp15.000,00	Chicken satay with a distinctive seasoning	FOOD	2023-03-09 16:11:15.604447
2	Fried Rice	Rp20.000,00	Fried rice with egg and crackers	FOOD	2023-03-09 16:11:15.604447
3	Hot Tea	Rp5.000,00	Hot tea with lemon flavor	SOFTDRINK	2023-03-09 16:11:15.604447
4	Fresh Orange Juice	Rp6.000,00	Fresh orange juice	SOFTDRINK	2023-03-09 16:11:15.604447
5	Refreshing Drink	Rp8.000,00	Refreshing drink with various flavors	SOFTDRINK	2023-03-09 16:11:15.604447
6	Coffee	Rp9.000,00	Black coffee with a unique flavor	SOFTDRINK	2023-03-09 16:11:15.604447
7	Fruit Soup	Rp10.000,00	Fruit soup with various types of fruit	FOOD	2023-03-09 16:11:15.604447
8	Margherita Pizza	Rp35.000,00	Margherita Pizza with tomato sauce and cheese	FOOD	2023-03-09 16:11:15.604447
9	Burger	Rp30.000,00	Burger with beef and a special sauce	FOOD	2023-03-09 16:11:15.604447
10	Snack Box	Rp20.000,00	Snack Box with various kinds of light food	SNACK	2023-03-09 16:11:15.604447
11	Bottled Softdrink	Rp8.000,00	Bottled softdrink with various flavors	SOFTDRINK	2023-03-09 16:11:15.604447
12	Extra Bed	Rp200.000,00	Extra bed to increase sleeping capacity	FACILITY	2023-03-09 16:11:15.604447
13	Laundry Service	Rp50.000,00	Laundry service for guest clothing	SERVICE	2023-03-09 16:11:15.604447
14	Room Service	Rp150.000,00	Room service that provides food and drinks to guest rooms	SERVICE	2023-03-09 16:11:15.604447
15	Wi-Fi Service	Rp100.000,00	Free Wi-Fi service throughout the hotel	SERVICE	2023-03-09 16:11:15.604447
16	Fitness Center	Rp100.000,00	Fitness center facilities for guests	FACILITY	2023-03-09 16:11:15.604447
17	Swimming Pool	Rp150.000,00	Swimming pool facilities for guests	FACILITY	2023-03-09 16:11:15.604447
18	Snack	Rp15.000,00	Snacks like potato chips	SNACK	2023-03-09 16:11:15.604447
\.


--
-- Data for Name: proviences; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.proviences (prov_id, prov_name, prov_country_id) FROM stdin;
2	Jawa Timur	1
3	Jawa Tengah	1
4	DKI Jakarta	1
5	DIY Yogyakarta	1
6	Sumatera Barat	1
7	Sumatera Utara	1
8	Sumatera Selatan	1
9	Kalimantan Barat	1
10	Kalimantan Timur	1
11	Kalimantan Utara	1
12	Kalimantan Tengah	1
13	Kalimantan Selatan	1
14	Lampung	1
15	Aceh	1
16	Bali	1
17	Banten	1
18	Jambi	1
19	Maluku	1
20	Papua	1
1	Jawa Barat	1
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.regions (region_code, region_name) FROM stdin;
1	Asia
2	Amerika Utara
3	Amerika Selatan
4	Afrika
5	Eropa
6	Australia
\.


--
-- Data for Name: service_task; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.service_task (seta_id, seta_name, set_seq) FROM stdin;
1	Cleaning the room	1
2	Providing breakfast	2
3	Providing lunch	3
4	Providing dinner	4
5	Providing drinks	5
6	Providing towels	6
7	Providing linens	7
8	Providing swimming pool facilities	8
9	Providing spa facilities	9
10	Providing gym facilities	10
11	Providing laundry service	11
12	Providing room service	12
13	Providing wifi service	13
14	Providing transportation service	14
15	Providing concierge service	15
16	Providing receptionist service	16
17	Providing security service	17
18	Providing housekeeping service	18
19	Providing parking service	19
\.


--
-- Data for Name: bank; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.bank (bank_entity_id, bank_code, bank_name, bank_modified_date) FROM stdin;
1	002	BRI	2023-03-09 16:23:26.478417
2	009	BNI	2023-03-09 16:23:26.478417
3	022	CIMB Niaga	2023-03-09 16:23:26.478417
4	427	BNI Syariah	2023-03-09 16:23:26.478417
5	451	Mandiri Syariah	2023-03-09 16:23:26.478417
6	147	Muamalat	2023-03-09 16:23:26.478417
7	213	BTPN	2023-03-09 16:23:26.478417
8	422	BRI Syariah	2023-03-09 16:23:26.478417
9	200	BTN	2023-03-09 16:23:26.478417
10	013	PERMATA	2023-03-09 16:23:26.478417
11	008	Mandiri	2023-03-09 16:23:26.478417
12	426	Mega	2023-03-09 16:23:26.478417
13	014	BCA	2023-03-09 16:23:26.478417
14	011	Danamon	2023-03-09 16:23:26.478417
15	441	Bukopin	2023-03-09 16:23:26.478417
\.


--
-- Data for Name: entitys; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.entitys (entity_id) FROM stdin;
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
\.


--
-- Data for Name: payment_gateway; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.payment_gateway (paga_entity_id, paga_code, paga_name, paga_modified_date) FROM stdin;
16	hpay	H-Pay	2023-03-09 16:23:26.478417
17	goto	GOTO	2023-03-09 16:23:26.478417
\.


--
-- Data for Name: payment_transaction; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.payment_transaction (patr_id, patr_trx_id, patr_debet, patr_credit, patr_type, patr_note, patr_modified_date, patr_order_number, patr_source_id, patr_target_id, patr_trx_number_ref, patr_user_id) FROM stdin;
1	TRB#20230309-0001	0	1005000	TRB	Booking	2023-03-09 17:28:04.648589	BO#20230309-0001	0	0	109347558181499	7
2	ORM#20230309-0001	0	166500	ORM	Food Order	2023-03-09 22:27:41.917133	MENUS#20230309-0001	0	0	548071748907474	7
3	ORM#20230309-0002	0	94350	ORM	Food Order	2023-03-09 22:51:05.555842	MENUS#20230309-0002	82287821697	13198989898	579584717704382	7
4	ORM#20230309-0003	0	144300	ORM	Food Order	2023-03-09 23:02:13.337187	MENUS#20230309-0003	0	0	401889172973183	7
5	TRB#20230309-0002	0	2275000	TRB	Booking	2023-03-09 23:33:44.289771	BO#20230309-0002	8987827217828271	13198989898	644913830457351	7
6	ORM#20230310-0001	0	233100	ORM	Food Order	2023-03-10 10:45:42.885935	MENUS#20230310-0001	0	0	899633052960915	55
7	TRB#20230310-0001	0	490000	TRB	Booking	2023-03-10 15:19:06.800083	BO#20230310-0001	0	0	929752747882543	55
8	TRB#20230313-0001	0	550000	TRB	Booking	2023-03-13 02:05:04.180336	BO#20230313-0001	82287821697	13198989898	971803396612612	7
9	TRB#20230313-0002	0	175000	TRB	Booking	2023-03-13 02:09:25.01776	BO#20230313-0002	0	0	485285637834369	7
10	TRB#20230313-0003	0	2165000	TRB	Booking	2023-03-13 09:31:01.690037	BO#20230313-0003	0	0	35081845121739	7
11	TRB#20230313-0004	0	3115000	TRB	Booking	2023-03-13 11:45:45.335283	BO#20230313-0004	0	0	610023726901995	2
12	TP#20230313-0001	5000000	0	TP 	Top Up	2023-03-13 11:54:35.80031	\N	4352718299181711	131082287821622	928253633650046	2
13	TP#20230313-0002	0	5000000	TP 	Top Up	2023-03-13 11:54:35.80031	\N	4352718299181711	131082287821622	764926748655603	2
14	ORM#20230313-0001	0	55500	ORM	Food Order	2023-03-13 13:56:26.572704	MENUS#20230313-0001	0	0	226888764676626	1
15	TRB#20230313-0005	0	2200000	TRB	Booking	2023-03-13 14:48:20.710054	BO#20230313-0005	0	0	10472280122554	1
16	TRB#20230313-0006	0	326000	TRB	Booking	2023-03-13 15:31:11.994166	BO#20230313-0006	0	0	838097550816910	1
17	TRB#20230313-0007	0	2285000	TRB	Booking	2023-03-13 19:21:40.355116	BO#20230313-0007	0	0	864681398739586	2
18	TP#20230313-0003	10000	0	TP 	Top Up	2023-03-13 20:55:20.438783	\N	6763238138123993	131082287821698	728055907634380	1
19	TP#20230313-0004	0	10000	TP 	Top Up	2023-03-13 20:55:20.438783	\N	6763238138123993	131082287821698	456045780691510	1
20	ORM#20230313-0002	0	105450	ORM	Food Order	2023-03-13 20:59:30.719836	MENUS#20230313-0002	82287821698	13198989898	851081378205528	1
21	TRB#20230314-0001	0	175000	TRB	Booking	2023-03-14 11:10:14.266158	BO#20230314-0001	8987827217828271	13198989898	529270381392414	7
\.


--
-- Data for Name: user_accounts; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.user_accounts (usac_entity_id, usac_user_id, usac_account_number, usac_saldo, usac_type, usac_expmonth, usac_expyear, usac_secure_code, usac_modified_date) FROM stdin;
16	7	131082287821697	0	Payment	0	0	$2b$10$RAL9Gor9XIbN63g6BHStE.4Pt4cmT8sy9IjQx3LA2DGdcbmQcUvoi	2023-03-09 17:27:34.272
17	7	82287821697	4355650	Payment	0	0	$2b$10$wuoTT4V2EJNs1MIyesPMqei0OMMz96sAKLBYK1UkAFXLfqf5MwoDm	2023-03-09 17:27:43.032
17	2	82287821622	15000000	Payment	0	0	$2b$10$.Dqnq5FTGEMID6PI7ME3AeeqwQZ5.AZHzcYVQpvRhVYr9XM6xydg2	2023-03-13 11:49:14.479
16	2	131082287821622	5000000	Payment	0	0	$2b$10$w0iiEtnWO4ATYj7ik/hKpuYn4Hq72LerdJDJdO5ixV.aVv17ozW/W	2023-03-13 11:48:38.12
4	2	4352718299181711	10000000	Debet	9	27	$2b$10$Ngq4uBxJ34v/h7/glyY2POX7h2V6iu2L4N1mKEHmlUAnhfU4tKNKe	2023-03-13 11:53:52.345
16	1	131082287821698	10000	Payment	0	0	$2b$10$FnjI/V51S./LzBAcDEgBkuoQKNJiPIQY2EIIgW22E80ip8WUzi/BO	2023-03-13 20:53:31.469
13	1	6763238138123993	4990000	Debet	9	28	$2b$10$QbpuQXDCbCuAm8uz6Z.OaeS/4.zTHd84EcDbQvyN3xUg.lHgOJHyW	2023-03-13 20:54:26.734
17	1	82287821698	8894550	Payment	0	0	$2b$10$NTRZ7FyN4YOYseh90Kcm/.j969e..MG9km0KNb5deBt0xjX7AeHky	2023-03-13 20:55:03.24
13	7	8987827217828271	7550000	Debet	10	28	$2b$10$bRaawpq4zWNIjrYt1jB2WeAa8z8LJZsFrsQm7FryET9R5FbreiwGm	2023-03-09 23:31:57.195
16	44	13198989898	830450	Payment	0	0	$2a$12$YNYmILJ0IJzttR75PUlTjuWTVj2Cgk/dGEyzs4YPOQBLkvc1vJmGO	2023-03-13 00:43:35.75086
\.


--
-- Data for Name: purchase_order_detail; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.purchase_order_detail (pode_pohe_id, pode_id, pode_order_qty, pode_price, pode_line_total, pode_received_qty, pode_rejected_qty, pode_stocked_qty, pode_modified_date, pode_stock_id) FROM stdin;
1	1	22	Rp175.000,00	Rp3.835.000,00	20.00	2.00	18.00	2022-12-01 12:01:00	1
2	2	25	Rp230.000,00	Rp5.750.000,00	22.00	3.00	19.00	2022-12-02 12:01:00	2
3	3	29	Rp195.000,00	Rp565.250,00	28.00	1.00	27.00	2022-12-03 12:01:00	3
4	4	35	Rp185.000,00	Rp6.477.500,00	34.00	1.00	33.00	2022-12-04 12:01:00	4
5	5	33	Rp220.000,00	Rp7.260.000,00	32.00	1.00	31.00	2022-12-05 12:01:00	5
6	6	30	Rp195.000,00	Rp5.855.000,00	29.00	1.00	28.00	2022-12-06 12:01:00	6
1	7	22	Rp175.000,00	Rp3.835.000,00	20.00	2.00	18.00	2022-12-01 12:01:00	1
2	8	25	Rp230.000,00	Rp5.750.000,00	22.00	3.00	19.00	2022-12-02 12:01:00	2
3	9	29	Rp195.000,00	Rp565.250,00	28.00	1.00	27.00	2022-12-03 12:01:00	3
4	10	35	Rp185.000,00	Rp6.477.500,00	34.00	1.00	33.00	2022-12-04 12:01:00	4
5	11	33	Rp220.000,00	Rp7.260.000,00	32.00	1.00	31.00	2022-12-05 12:01:00	5
6	12	30	Rp195.000,00	Rp5.855.000,00	29.00	1.00	28.00	2022-12-06 12:01:00	6
7	13	31	Rp200.000,00	Rp6.200.000,00	30.00	1.00	29.00	2022-12-07 12:01:00	7
8	14	28	Rp190.000,00	Rp5.272.000,00	27.00	1.00	26.00	2022-12-08 12:01:00	8
9	15	36	Rp195.000,00	Rp6.970.000,00	35.00	1.00	34.00	2022-12-09 12:01:00	9
10	16	27	Rp205.000,00	Rp5.513.500,00	26.00	1.00	25.00	2022-12-10 12:01:00	10
1	17	22	Rp180.000,00	Rp3.960.000,00	21.00	1.00	20.00	2022-12-11 12:01:00	11
2	18	25	Rp185.000,00	Rp4.637.500,00	24.00	1.00	23.00	2022-12-12 12:01:00	12
3	19	29	Rp185.000,00	Rp5.361.500,00	28.00	1.00	27.00	2022-12-13 12:01:00	13
4	20	32	Rp200.000,00	Rp6.400.000,00	31.00	1.00	30.00	2022-12-14 12:01:00	14
5	21	24	Rp190.000,00	Rp4.536.000,00	23.00	1.00	22.00	2022-12-15 12:01:00	15
6	22	26	Rp205.000,00	Rp5.330.500,00	25.00	1.00	24.00	2022-12-16 12:01:00	16
7	23	30	Rp180.000,00	Rp5.400.000,00	29.00	1.00	28.00	2022-12-17 12:01:00	17
8	24	32	Rp175.000,00	Rp5.602.000,00	31.00	1.00	30.00	2022-12-18 12:01:00	18
9	25	25	Rp185.000,00	Rp4.637.500,00	24.00	1.00	23.00	2022-12-19 12:01:00	19
2	26	28	Rp220.000,00	Rp6.160.000,00	27.00	1.00	26.00	2022-12-20 12:01:00	20
\.


--
-- Data for Name: purchase_order_header; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.purchase_order_header (pohe_id, pohe_number, pohe_status, pohe_order_date, pohe_subtotal, pohe_tax, pohe_total_amount, pohe_refund, pohe_arrival_date, pohe_pay_type, pohe_emp_id, pohe_vendor_id) FROM stdin;
1	PO1001	1	2022-01-01 10:00:00	Rp10.000,00	Rp1.000,00	Rp11.000,00	Rp0,00	2022-01-10 10:00:00	CA	1	1
2	PO1002	2	2022-01-02 10:00:00	Rp20.000,00	Rp2.000,00	Rp22.000,00	Rp0,00	2022-01-11 10:00:00	TR	2	2
3	PO1003	3	2022-01-03 10:00:00	Rp30.000,00	Rp3.000,00	Rp33.000,00	Rp0,00	2022-01-12 10:00:00	CA	3	3
4	PO1004	4	2022-01-04 10:00:00	Rp40.000,00	Rp4.000,00	Rp44.000,00	Rp0,00	2022-01-13 10:00:00	CA	4	4
5	PO1005	1	2022-01-05 10:00:00	Rp50.000,00	Rp5.000,00	Rp55.000,00	Rp0,00	2022-01-14 10:00:00	TR	5	5
6	PO1006	2	2022-01-06 10:00:00	Rp60.000,00	Rp6.000,00	Rp66.000,00	Rp0,00	2022-01-15 10:00:00	CA	6	6
7	PO1007	3	2022-01-07 10:00:00	Rp70.000,00	Rp7.000,00	Rp77.000,00	Rp0,00	2022-01-16 10:00:00	TR	7	7
8	PO1008	4	2022-01-08 10:00:00	Rp80.000,00	Rp8.000,00	Rp88.000,00	Rp0,00	2022-01-17 10:00:00	CA	8	8
9	PO1009	1	2022-01-09 10:00:00	Rp90.000,00	Rp9.000,00	Rp99.000,00	Rp0,00	2022-01-18 10:00:00	TR	9	1
10	PO1010	2	2022-01-10 10:00:00	Rp100.000,00	Rp10.000,00	Rp110.000,00	Rp0,00	2022-01-19 10:00:00	TR	10	1
\.


--
-- Data for Name: stock_detail; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.stock_detail (stod_stock_id, stod_id, stod_barcode_number, stod_status, stod_notes, stod_faci_id, stod_pohe_id) FROM stdin;
1	1	A1234	1	Towel	1	1
2	2	A1235	2	Bed	2	1
4	4	A1237	4	Shampoo	4	2
5	5	A1238	1	Conditioner	5	3
6	6	A1239	2	Bathrobe	6	3
8	8	A1241	4	Soap	8	4
9	9	A1242	1	Toothbrush	9	5
10	10	A1243	2	Toothpaste	10	5
11	11	A1244	3	Hair Dryer	11	6
12	12	A1245	4	Coffee	12	6
13	13	A1246	1	Tea	13	7
16	15	A1248	3	Creamer	15	8
1	16	A1249	4	Stirrers	16	8
2	17	A1250	1	Cups	17	9
3	18	A1251	2	Tea Towel	18	9
4	19	A1252	3	Hand Soap	19	10
5	20	A1253	4	Linen Napkin	20	10
\.


--
-- Data for Name: stock_photo; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.stock_photo (spho_id, spho_thumbnail_filename, spho_photo_filename, spho_primary, spho_url, spho_stock_id) FROM stdin;
\.


--
-- Data for Name: stocks; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.stocks (stock_id, stock_name, stock_description, stock_quantity, stock_reorder_point, stock_used, stock_scrap, stock_size, stock_color, stock_modified_date) FROM stdin;
1	Towel	Soft and absorbent towel	50	20	10	2	Medium	White	2023-03-09 16:24:36.342845
2	Tea Towel	Absorbent cloth for drying dishes	1000	800	200	50	Medium	White	2023-03-09 16:24:36.342845
3	Bath Towel	Towel for drying after a bath	2500	2000	500	100	Large	White	2023-03-09 16:24:36.342845
4	Shampoo	Luxury hotel shampoo	5000	2500	1250	500	Bottle	Transparent	2023-03-09 16:24:36.342845
5	Soap	Luxury hotel soap	5000	2500	1250	500	Bar	White	2023-03-09 16:24:36.342845
6	Hand Soap	Liquid soap for hand washing	1500	1000	500	100	Medium	Clear	2023-03-09 16:24:36.342845
7	Blanket	Warm and cozy blanket	50	20	10	2	Queen	Gray	2023-03-09 16:24:36.342845
8	Sheets	Luxury hotel sheets	50	20	10	2	Queen	White	2023-03-09 16:24:36.342845
9	Slippers	Disposable hotel slippers	1000	500	250	100	Medium	White	2023-03-09 16:24:36.342845
10	Pillows	Comfortable hotel pillows	100	50	20	2	Standard	White	2023-03-09 16:24:36.342845
11	Iron	Hotel iron for guest use	25	10	5	0	Small	Silver	2023-03-09 16:24:36.342845
12	Kettle	Hotel kettle for guest use	25	10	5	0	Small	White	2023-03-09 16:24:36.342845
13	Shower gel	Refreshing shower gel	75	35	15	2	250ml	Clear	2023-03-09 16:24:36.342845
14	Toothbrush	Hotel toothbrushes for guests	200	100	40	5	Small	White	2023-03-09 16:24:36.342845
15	Bed Linen	High-quality bed linen set	500	250	125	50	Double	White	2023-03-09 16:24:36.342845
16	Linen Napkin	Cloth napkin for dining	2000	1500	500	100	Medium	White	2023-03-09 16:24:36.342845
17	Conditioner	Luxury hotel conditioner	5000	2500	1250	500	Bottle	Transparent	2023-03-09 16:24:36.342845
18	Bathrobe	Soft and comfortable bathrobe	200	100	50	20	Large	White	2023-03-09 16:24:36.342845
19	Toothpaste	Luxury hotel toothpaste	5000	2500	1250	500	Tube	White	2023-03-09 16:24:36.342845
20	Hair Dryer	High-powered hotel hair dryer	100	50	25	10	Medium	White	2023-03-09 16:24:36.342845
21	Coffee	Premium hotel coffee	500	250	125	50	Bag	Brown	2023-03-09 16:24:36.342845
22	Tea	Premium hotel tea	500	250	125	50	Bag	Brown	2023-03-09 16:24:36.342845
23	Sugar	Hotel sugar sachets	5000	2500	1250	500	Sachet	White	2023-03-09 16:24:36.342845
24	Creamer	Hotel creamer sachets	5000	2500	1250	500	Sachet	White	2023-03-09 16:24:36.342845
25	Stirrers	Hotel stirrers	1000	500	250	100	Small	Wood	2023-03-09 16:24:36.342845
26	Cups	Disposable hotel cups	1000	500	250	100	Medium	White	2023-03-09 16:24:36.342845
\.


--
-- Data for Name: vendor; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.vendor (vendor_id, vendor_name, vendor_active, vendor_priority, vendor_register_date, vendor_weburl, vendor_modified_date) FROM stdin;
1	PT. Dunlopillo Indonesia	1	0	2022-01-01	https://www.dunlopillo.co.id/en	2022-01-05 08:00:00
2	PT. Unilever Indonesia	1	1	2022-01-01	https://www.unilever.co.id/	2022-01-05 08:00:00
3	PT. Indonesia Bersih Rapi	1	1	2022-01-01	www.indonesiabersihrapi.com	2022-01-05 08:00:00
4	PT. Securindo Packatama Indonesia	1	1	2022-01-01	www.secureparking.co.id	2022-01-05 08:00:00
5	Precor Gym	1	0	2022-01-01	www.precor.com	2022-01-05 08:00:00
6	PT. Klasse Mitra International	1	1	2022-01-01	www.klasse.co.id	2022-01-05 08:00:00
7	PT. Royal Security Indonesia	1	1	2022-01-01	www.royalsecurity.co.id	2022-01-05 08:00:00
8	IKEA Indonesia	1	0	2022-01-01	www.ikea.co.id	2022-01-05 08:00:00
9	PT. Liquid Indonesia	1	1	2022-01-01	www.liquidindonesia.com	2022-01-01 00:00:00
10	PT. Shinzue Body Wash Indonesia	1	0	2022-05-01	www.shinzuebodywashindonesia.com	2022-05-01 00:00:00
11	PT. Dental Care Indonesia	1	0	2022-06-01	www.dentalcareindonesia.com	2022-06-01 00:00:00
12	PT. Toothpaste Indonesia	1	0	2022-07-01	www.toothpasteindonesia.com	2022-07-01 00:00:00
13	PT. Soft Towel Indonesia	1	1	2022-08-01	www.softtowelindonesia.com	2022-08-01 00:00:00
14	PT. Quick Dry Towel Indonesia	1	0	2022-09-01	www.quickdrytowelindonesia.com	2022-09-01 00:00:00
15	PT. Face Fresh Towel Indonesia	1	0	2022-10-01	www.facefreshtowelindonesia.com	2022-10-01 00:00:00
16	PT. Comfort Robe Indonesia	1	0	2023-02-01	www.comfortrobeindonesia.com	2023-02-01 00:00:00
17	PT. Cozy Slipper Indonesia	1	0	2023-03-01	www.cozyslipperindonesia.com	2023-03-01 00:00:00
18	PT. Tissue Master Indonesia	1	1	2023-04-01	www.tissuemasterindonesia.com	2023-04-01 00:00:00
19	PT. Clean Roll Indonesia	1	0	2023-05-01	www.cleanrollindonesia.com	2023-05-01 00:00:00
20	PT. Garbage Bag Indonesia	1	0	2023-06-01	www.garbagebagindonesia.com	2023-06-01 00:00:00
21	PT. Clean Wash Indonesia	1	0	2023-07-01	www.cleanwashindonesia.com	2023-07-01 00:00:00
22	PT. Fresh Fabric Indonesia	1	0	2023-08-01	www.freshfabricindonesia.com	2023-08-01 00:00:00
\.


--
-- Data for Name: vendor_product; Type: TABLE DATA; Schema: purchasing; Owner: postgres
--

COPY purchasing.vendor_product (vepro_id, vepro_qty_stocked, vepro_qty_remaining, vepro_price, vepro_stock_id, vepro_vendor_id) FROM stdin;
1	100	50	Rp10.000,00	1	1
2	200	100	Rp8.000,00	1	1
3	150	75	Rp12.000,00	2	2
4	300	200	Rp7.000,00	2	2
5	100	50	Rp10.000,00	3	3
6	200	100	Rp8.000,00	4	4
7	150	75	Rp12.000,00	5	5
8	300	200	Rp7.000,00	6	6
9	100	50	Rp10.000,00	7	7
10	200	100	Rp8.000,00	7	8
11	150	75	Rp12.000,00	8	9
12	300	200	Rp7.000,00	9	10
13	100	50	Rp10.000,00	11	11
14	200	100	Rp8.000,00	12	12
15	150	75	Rp12.000,00	13	13
16	300	200	Rp7.000,00	12	14
17	100	50	Rp10.000,00	14	15
18	200	100	Rp8.000,00	12	16
19	150	75	Rp12.000,00	15	17
20	300	200	Rp7.000,00	20	18
\.


--
-- Data for Name: order_menu_detail; Type: TABLE DATA; Schema: resto; Owner: postgres
--

COPY resto.order_menu_detail (omde_id, orme_price, orme_qty, orme_subtotal, orme_discount, omde_orme_id, omde_reme_id) FROM stdin;
1	Rp50.000,00	2	Rp50.000,00	Rp5.000,00	1	19
2	Rp65.000,00	1	Rp65.000,00	Rp0,00	2	14
3	Rp25.000,00	1	Rp25.000,00	Rp0,00	3	2
4	Rp65.000,00	1	Rp65.000,00	Rp2.500,00	3	5
5	Rp80.000,00	1	Rp80.000,00	Rp2.500,00	3	4
6	Rp80.000,00	1	Rp80.000,00	Rp10.000,00	4	8
7	Rp60.000,00	1	Rp60.000,00	Rp0,00	4	12
8	Rp55.000,00	1	Rp55.000,00	Rp0,00	5	17
9	Rp55.000,00	1	Rp55.000,00	Rp0,00	5	18
10	Rp50.000,00	1	Rp50.000,00	Rp2.500,00	5	19
11	Rp65.000,00	1	Rp65.000,00	Rp0,00	6	15
12	Rp20.000,00	2	Rp40.000,00	Rp0,00	7	1
13	Rp25.000,00	1	Rp25.000,00	Rp0,00	7	2
14	Rp80.000,00	1	Rp80.000,00	Rp10.000,00	8	8
15	Rp80.000,00	2	Rp160.000,00	Rp20.000,00	8	9
16	Rp65.000,00	1	Rp65.000,00	Rp0,00	8	10
17	Rp60.000,00	1	Rp60.000,00	Rp0,00	8	12
18	Rp45.000,00	2	Rp90.000,00	Rp10.000,00	9	20
19	Rp50.000,00	1	Rp50.000,00	Rp2.500,00	9	19
20	Rp55.000,00	1	Rp55.000,00	Rp5.000,00	9	17
22	Rp50.000,00	1	Rp50.000,00	\N	21	16
21	Rp50.000,00	2	Rp100.000,00	\N	21	19
23	Rp65.000,00	1	Rp65.000,00	\N	22	5
24	Rp20.000,00	1	Rp20.000,00	\N	22	1
25	Rp65.000,00	1	Rp65.000,00	\N	23	10
26	Rp65.000,00	1	Rp65.000,00	\N	23	14
27	Rp50.000,00	2	Rp100.000,00	\N	24	19
28	Rp55.000,00	2	Rp110.000,00	\N	24	18
29	Rp50.000,00	1	Rp50.000,00	\N	25	19
30	Rp50.000,00	1	Rp50.000,00	\N	26	16
31	Rp45.000,00	1	Rp45.000,00	\N	26	20
\.


--
-- Data for Name: order_menus; Type: TABLE DATA; Schema: resto; Owner: postgres
--

COPY resto.order_menus (orme_id, orme_order_number, orme_order_date, orme_total_item, orme_total_discount, orme_total_amount, orme_pay_type, orme_cardnumber, orme_is_paid, orme_modified_date, orme_user_id) FROM stdin;
1	MENUS#20230112-0001	2023-03-09 16:22:35.066318	2	Rp5.000,00	Rp100.000,00	CR	11111111	P 	2023-03-09 16:22:35.066318	1
2	MENUS#20230112-0002	2023-03-09 16:22:35.066318	1	Rp0,00	Rp65.000,00	C 		P 	2023-03-09 16:22:35.066318	1
3	MENUS#20230112-0003	2023-03-09 16:22:35.066318	3	Rp5.000,00	Rp165.000,00	D 	2222222	B 	2023-03-09 16:22:35.066318	2
4	MENUS#20230112-0004	2023-03-09 16:22:35.066318	2	Rp10.000,00	Rp137.000,00	PG	2222222	B 	2023-03-09 16:22:35.066318	2
5	MENUS#20230112-0005	2023-03-09 16:22:35.066318	3	Rp0,00	Rp150.000,00	BO	3333333	B 	2023-03-09 16:22:35.066318	3
6	MENUS#20230112-0006	2023-03-09 16:22:35.066318	1	Rp0,00	Rp65.000,00	BO	3333333	B 	2023-03-09 16:22:35.066318	3
7	MENUS#20230112-0007	2023-03-09 16:22:35.066318	3	Rp2.500,00	Rp65.000,00	CR	4444444	P 	2023-03-09 16:22:35.066318	4
8	MENUS#20230112-0008	2023-03-09 16:22:35.066318	5	Rp30.000,00	Rp335.000,00	PG	5555555	B 	2023-03-09 16:22:35.066318	5
9	MENUS#20230112-0009	2023-03-09 16:22:35.066318	4	Rp17.500,00	Rp18.000,00	BO	6666666	P 	2023-03-09 16:22:35.066318	6
10	MENUS#20230112-0010	2023-03-09 16:22:35.066318	5	Rp25.000,00	Rp300.000,00	C 		P 	2023-03-09 16:22:35.066318	7
11	MENUS#20230112-0011	2023-03-09 16:22:35.066318	2	Rp10.000,00	Rp190.000,00	CR	8888888	P 	2023-03-09 16:22:35.066318	8
12	MENUS#20230112-0012	2023-03-09 16:22:35.066318	5	Rp25.000,00	Rp300.000,00	BO	9999999	P 	2023-03-09 16:22:35.066318	9
13	MENUS#20230112-0013	2023-03-09 16:22:35.066318	2	Rp10.000,00	Rp190.000,00	C 		P 	2023-03-09 16:22:35.066318	10
14	MENUS#20230112-0014	2023-03-09 16:22:35.066318	1	Rp0,00	Rp65.000,00	C 		P 	2023-03-09 16:22:35.066318	11
15	MENUS#20230112-0015	2023-03-09 16:22:35.066318	4	Rp20.000,00	Rp410.000,00	D 	1212121	B 	2023-03-09 16:22:35.066318	12
16	MENUS#20230112-0016	2023-03-09 16:22:35.066318	5	Rp25.000,00	Rp300.000,00	BO	1313131	B 	2023-03-09 16:22:35.066318	13
17	MENUS#20230112-0017	2023-03-09 16:22:35.066318	5	Rp25.000,00	Rp300.000,00	BO	14141414	B 	2023-03-09 16:22:35.066318	14
18	MENUS#20230112-0018	2023-03-09 16:22:35.066318	2	Rp10.000,00	Rp190.000,00	CR	15151515	P 	2023-03-09 16:22:35.066318	15
19	MENUS#20230112-0019	2023-03-09 16:22:35.066318	2	Rp0,00	Rp100.000,00	CR	15151515	P 	2023-03-09 16:22:35.066318	16
20	MENUS#20230112-0020	2023-03-09 16:22:35.066318	2	Rp0,00	Rp115.000,00	CR	15151515	P 	2023-03-09 16:22:35.066318	17
21	MENUS#20230309-0001	2023-03-09 00:00:00	3	Rp0,00	Rp166.500,00	C 	0	P 	2023-03-09 00:00:00	7
22	MENUS#20230309-0002	2023-03-09 00:00:00	2	Rp0,00	Rp94.350,00	PG	82287821697	P 	2023-03-09 00:00:00	7
23	MENUS#20230309-0003	2023-03-09 23:01:59.118457	2	Rp0,00	Rp144.300,00	C 	0	P 	2023-03-09 23:01:59.118457	7
24	MENUS#20230310-0001	2023-03-10 10:45:21.925135	4	Rp0,00	Rp233.100,00	C 	0	P 	2023-03-10 10:45:21.925135	55
25	MENUS#20230313-0001	2023-03-13 13:54:18.105013	1	Rp0,00	Rp55.500,00	C 	0	P 	2023-03-13 13:54:18.105013	1
26	MENUS#20230313-0002	2023-03-13 20:59:04.811219	2	Rp0,00	Rp105.450,00	PG	82287821698	P 	2023-03-13 20:59:04.811219	1
\.


--
-- Data for Name: resto_menu_photos; Type: TABLE DATA; Schema: resto; Owner: postgres
--

COPY resto.resto_menu_photos (remp_id, remp_thumbnail_filename, remp_photo_filename, remp_primary, remp_url, remp_reme_id) FROM stdin;
3	Green Tea	gtea31676605515548-5675050.jpg	1	restomenuphotos\\gtea31676605515548-5675050.jpg	2
4	Green Tea 2	gtea11676613292710-736558373.jpg	0	restomenuphotos\\gtea11676613292710-736558373.jpg	2
5	Jasmine Tea	jasminetea1676616648158-235957348.png	1	restomenuphotos\\jasminetea1676616648158-235957348.png	3
6	Caesar salad	41676616676181-908735681.jpg	1	restomenuphotos\\41676616676181-908735681.jpg	4
7	Gado-gado	51676616735089-177202222.jpg	1	restomenuphotos\\51676616735089-177202222.jpg	5
8	Gado-gado	5a1676616779122-659575394.jpg	0	restomenuphotos\\5a1676616779122-659575394.jpg	5
9	Crispy vegetable spring rolls	6a1676616798704-140417773.jpg	1	restomenuphotos\\6a1676616798704-140417773.jpg	6
10	Crispy vegetable spring rolls 2	6b1676617060716-553789261.jpg	0	restomenuphotos\\6b1676617060716-553789261.jpg	6
11	Porcini mushroom cappuccino	7a1676617083815-804727480.jpg	1	restomenuphotos\\7a1676617083815-804727480.jpg	7
12	Porcini mushroom cappuccino 2	7b1676617094675-756872834.jpg	0	restomenuphotos\\7b1676617094675-756872834.jpg	7
14	Deep fried thai fish cake 2	8b1676617139568-559458274.jpg	0	restomenuphotos\\8b1676617139568-559458274.jpg	8
13	Deep fried thai fish cake	8c1676617156394-564002927.jpg	1	restomenuphotos\\8c1676617156394-564002927.jpg	8
15	Crab meat spring rolls	91676617177038-459341933.jpg	1	restomenuphotos\\91676617177038-459341933.jpg	9
16	Vegetable spring roll	10a1676617195805-937090282.jpg	1	restomenuphotos\\10a1676617195805-937090282.jpg	10
17	Vegetable samosa with raita	11c1676617219483-912401373.jpg	1	restomenuphotos\\11c1676617219483-912401373.jpg	11
18	Thai barbecue chicken with sweet chili sauce	12b1676617260110-466468625.jpg	1	restomenuphotos\\12b1676617260110-466468625.jpg	12
19	Fried pawns	13a1676617272473-427793259.jpg	1	restomenuphotos\\13a1676617272473-427793259.jpg	13
20	Pan fried gyoza	141676617292266-216289184.jpg	1	restomenuphotos\\141676617292266-216289184.jpg	14
21	Profiteroles tart	151676617315801-79924978.jpg	1	restomenuphotos\\151676617315801-79924978.jpg	15
22	Strawberry Shortcake	16a1676617328185-39041301.jpg	1	restomenuphotos\\16a1676617328185-39041301.jpg	16
23	US Cheese Cake	17a1676617341063-601296367.jpg	1	restomenuphotos\\17a1676617341063-601296367.jpg	17
24	Vanilla Parisian Flan	181676617358468-740783474.jpg	1	restomenuphotos\\181676617358468-740783474.jpg	18
25	Chocolate Orange	191676617371174-84209704.jpg	1	restomenuphotos\\191676617371174-84209704.jpg	19
26	Chocolate Coconut	201676617388693-585613041.jpg	1	restomenuphotos\\201676617388693-585613041.jpg	20
27	Chocolate Coconut 2	20a1676617541430-97768378.jpg	0	restomenuphotos\\20a1676617541430-97768378.jpg	20
1	Regular tea	tea11678006968633-229416014.jpg	1	restomenuphotos\\tea11678006968633-229416014.jpg	1
2	Regular tea 2	tea21678006968634-701314696.jpg	0	restomenuphotos\\tea21678006968634-701314696.jpg	1
\.


--
-- Data for Name: resto_menus; Type: TABLE DATA; Schema: resto; Owner: postgres
--

COPY resto.resto_menus (reme_faci_id, reme_id, reme_name, reme_description, reme_price, reme_status, reme_modified_date) FROM stdin;
9	1	Regular Tea	Teh	Rp20.000,00	AVAILABLE	2023-03-09 16:22:35.066318
9	2	Green Tea	Green Tea sedap	Rp25.000,00	AVAILABLE	2023-03-09 16:22:35.066318
9	3	Jasmine Tea	Teh melati sedap	Rp20.000,00	AVAILABLE	2023-03-09 16:22:35.066318
9	4	Caesar salad	Heart of romainde lettuce, crispy bacon, toasted brioche bread, shaved parmesan cheese	Rp80.000,00	AVAILABLE	2023-03-09 16:22:35.066318
9	5	Gado-gado	Raw and semi cooked vegetables with pestle grounded peanut sauce and chili	Rp65.000,00	AVAILABLE	2023-03-09 16:22:35.066318
9	6	Crispy vegetable spring rolls	Served with chilli sauce	Rp75.000,00	AVAILABLE	2023-03-09 16:22:35.066318
9	7	Porcini mushroom cappuccino	Summer truffle, sundried tomatos and olive biscotti	Rp55.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	8	Deep fried thai fish cake	Served with thai sauce	Rp80.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	9	Crab meat spring rolls	Served with thai sauce	Rp80.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	10	Vegetable spring roll	Served with thai sauce	Rp65.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	11	Vegetable samosa with raita	Served with mint yoghurt sauce	Rp85.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	12	Thai barbecue chicken with sweet chili sauce	Served with sweet chili sauce	Rp60.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	13	Fried pawns	Served with mint yoghurt sauce	Rp80.000,00	AVAILABLE	2023-03-09 16:22:35.066318
2	14	Pan fried gyoza	Served with soyu sauce	Rp65.000,00	AVAILABLE	2023-03-09 16:22:35.066318
16	15	Profiteroles tart	Shortbread, almond choux puff, light grand marnier cream, dark chocolate glaze	Rp65.000,00	AVAILABLE	2023-03-09 16:22:35.066318
16	16	Strawberry Shortcake	Ladyfinger sponge, light vanilla cream, fresh strawberry	Rp50.000,00	AVAILABLE	2023-03-09 16:22:35.066318
16	17	US Cheese Cake	Ladyfinger sponge, American cream cheese	Rp55.000,00	AVAILABLE	2023-03-09 16:22:35.066318
16	18	Vanilla Parisian Flan	Shortbread, vanilla custard	Rp55.000,00	AVAILABLE	2023-03-09 16:22:35.066318
16	19	Chocolate Orange	Chocolate almond sponge, light orange mousse, milk chocolate mousse	Rp50.000,00	AVAILABLE	2023-03-09 16:22:35.066318
16	20	Chocolate Coconut	Ladyfinger sponge, light yoghurt mousse, milk chocolate mousse, coconut chantilly	Rp45.000,00	AVAILABLE	2023-03-09 16:22:35.066318
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.roles (role_id, role_name) FROM stdin;
1	Guest
2	Manager
3	OfficeBoy
4	Admin
5	User
6	Finance
\.


--
-- Data for Name: user_bonus_points; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.user_bonus_points (ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on) FROM stdin;
1	1	20	R	2023-01-20 00:00:00
2	2	10	P	2023-01-19 00:00:00
3	4	30	R	2023-01-05 00:00:00
4	3	15	R	2023-01-21 00:00:00
5	5	5	P	2023-01-20 00:00:00
6	6	15	R	2023-01-06 00:00:00
7	8	10	P	2023-01-10 00:00:00
8	9	15	R	2023-01-10 00:00:00
9	7	25	P	2023-01-15 00:00:00
10	11	10	P	2023-01-13 00:00:00
11	10	13	P	2023-01-11 00:00:00
12	12	5	R	2023-01-11 00:00:00
13	14	19	P	2023-01-11 00:00:00
14	13	18	R	2023-01-11 00:00:00
15	17	13	R	2023-01-11 00:00:00
16	15	18	R	2023-01-11 00:00:00
17	16	30	P	2023-01-11 00:00:00
18	18	15	R	2023-01-11 00:00:00
19	20	13	R	2023-01-11 00:00:00
20	19	23	R	2023-01-23 00:00:00
\.


--
-- Data for Name: user_members; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.user_members (usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type) FROM stdin;
1	Gold	2023-01-13 00:00:00	13	default
2	WIZARD	2023-01-14 00:00:00	8	default
3	Silver	2023-01-15 00:00:00	15	default
4	VIP	2023-01-16 00:00:00	20	default
5	Silver	2023-01-17 00:00:00	30	default
6	WIZARD	2023-01-18 00:00:00	40	expired
7	Gold	2023-01-19 00:00:00	50	expired
8	Gold	2023-01-20 00:00:00	25	default
9	WIZARD	2023-01-21 00:00:00	18	default
10	Silver	2023-01-22 00:00:00	30	default
11	VIP	2023-01-23 00:00:00	35	default
12	Silver	2023-01-24 00:00:00	50	expired
13	Gold	2023-01-25 00:00:00	55	default
14	WIZARD	2023-01-26 00:00:00	60	default
15	Gold	2023-01-27 00:00:00	45	expired
16	Silver	2023-01-28 00:00:00	35	default
17	Silver	2023-01-29 00:00:00	40	default
18	Gold	2023-01-30 00:00:00	50	expired
19	VIP	2023-01-31 00:00:00	55	default
20	WIZARD	2023-02-01 00:00:00	60	expired
\.


--
-- Data for Name: user_password; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.user_password (uspa_user_id, uspa_passwordhash, uspa_passwordsalt) FROM stdin;
1	$2a$12$he3ZVL3Dg4y7QGlJIAbly.7HyurMK7ckXiJmm7kot8azsefstqJzu	P@ssword!
2	$2a$12$5MhJEDqgSwqdiuxER.K9Luey3QdpeWTLHhiSc7VEfS00nyDunI5b6	P@ssword2
3	$2a$12$Qg5eFXwhHXUcPZagqn8N.eaydiAeqNLMjcYSz6B6j32iF.1OGU9My	P@ssword3
4	$2a$12$sqZwmSbtmHKCW2g0LGu3EuRoKeC8vYcBdX2lHSAUH3xW2VDLbihWK	P@ssword4
5	$2a$12$Ifmsuv8nHswliqs2EGiEj.y9tj9lEUzKDDrPYiyVXYzeJk.w30Pn.	P@ssword5
6	$2a$12$//U9bE6gVpebW3uhVSW2uurL/tPAtNJHUitc48Y9uGiJRpa6HShKe	P@ssword6
7	$2a$12$uHWReHgO4Z0pnPjwzYx5zuTGa.mLXR87TiQt/U6BUYlFuWCiZskqq	P@ssword7
8	$2a$08$kpMIfknvefiCmGlPocixd.EX0uZswePqUDtK8e/0ioqwYaiprv2R6	P@ssword8
9	$2a$08$yF3zLt8RRi4fZ33nYL4Mw.lndciGV8RcXuSE2sRjyVxEpl/M3veSG	P@ssword9
10	$2a$08$j5P74crOtmQhj79T8kLdruhF4v5.xapNYwqmqDBXBgyRtmCxRFe0q	P@ssword10
11	$2a$08$Y/3t/c8UPnF/.xMBT8DrJOxr0NceB1/NW/P7Jg4Lxfz4yl0wRNNvG	P@ssword11
12	$2a$08$ldAlvSBbgI/dLdVL1oBu/uqZC40Gdbe.z5o9vHGjaVO9prJBTMB0e	P@ssword12
13	$2a$08$omjN43dLFNP.jArKNTATueOCsc3SvUByOSk71irfPPxqLmeG2dCOy	P@ssword13
14	$2a$08$B7cRx5xfpsUT8yZnlWLzTeJRdYwUb0FeqvPouN8b77U2HOluTAbZ.	P@ssword14
15	$2a$12$eSvXKHyakLiSO173K4HFJOLcb/IlwYthdVXMU5Zsca7pU8ck/r2ru	P@ssword15
16	$2a$08$1Q8GReElYN6aeAi7E6L/J.s4de14MgIEHDB8g9Am3sDkIIK71xD1q	P@ssword16
17	$2a$12$eSvXKHyakLiSO173K4HFJOLcb/IlwYthdVXMU5Zsca7pU8ck/r2ru	P@ssword17
18	$2a$08$Z45Eq1WK5vaUEbOd5rZReenw9DMTV5XSFUpn3u9GJ2HurvneSgiaa	P@ssword18
19	$2a$08$NAVvW8Vkp7UAsmeN9k5nw..eOhQnBY89tEZXdFIM3W3MmtxKs3Xli	P@ssword19
20	$2a$08$btIV4kdq.4xI0pkLZpbWheayTcFVo2bHX1CsC2DyTgxZi/rr0/aKq	P@ssword20
44	$2a$12$gjaHnpIPGhQHokozo0urWOViHx9nkUjj1nJH6T.tTYGanEtkcSz7S	P@ssword14
55	$2a$12$y90LlOedo9hZqVYsQI0YeeEIV3w7cyo4/6T3tpQaqS.4uVTPYud56	P@ssword66
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.user_profiles (uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id) FROM stdin;
1	IDN	2023-01-12	Head Manager	M	M	1	1
3	IDN	2023-01-12	SPV	M	F	3	3
4	IDN	2023-01-12	Employee	S	F	4	4
5	IDN	2023-01-12	SPV	M	M	5	5
6	IDN	2023-01-12	Employee	S	M	6	6
7	IDN	2023-01-12	Operations Manager	M	F	7	7
8	IDN	2023-01-12	Accounting Manager	S	F	8	8
9	IDN	2023-01-12	Procurement Manager	M	M	9	9
10	IDN	2023-01-12	Admin Manager	S	M	10	10
2	IDN	2023-01-12	Assistant Manager	S	M	2	2
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.user_roles (usro_user_id, usro_role_id) FROM stdin;
1	2
2	3
3	1
4	3
5	5
6	5
7	4
8	3
9	3
10	2
11	4
12	3
13	1
14	1
15	5
16	5
17	1
18	5
19	5
20	5
44	6
55	4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users (user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date) FROM stdin;
1	Achmad Rendra Artama	C	Mandiri	Rendra@gmail.com	082287821698	2023-01-16 00:00:00
3	Emil Setiawan	C	Sampoerna	Emil@gmail.com	08228782161	2023-01-03 00:00:00
4	Mohammad Farid Nurichsan	T	MIND.ID	Farid@gmail.com	082287821633	2023-01-19 00:00:00
5	Muhammad Ilmi Alimudin	I	Sampoerna	Ilmi@gmail.com	082287821655	2023-01-18 00:00:00
6	Ramanda Syahputra	C	Indofood	Rasya@gmail.com	082287821689	2023-01-15 00:00:00
7	Ricky Farela Givano	T	Gudang Garam	Ricky@gmail.com	082287821697	2023-01-13 00:00:00
8	Soffie Anastya Putri	C	Mandiri	Soffie@gmail.com	082287821665	2023-01-12 00:00:00
9	Yanti	I	Goverment	Yanti@gmail.com	082287821650	2023-01-10 00:00:00
10	Bazna	C	Goverment	Bazna@gmail.com	082287821634	2023-01-11 00:00:00
11	Yanto	I	Codeid	Yanto@gmail.com	082287821676	2023-01-12 00:00:00
12	Agus	T	Mahaka-X	Agus@gmail.com	082287821667	2023-01-13 00:00:00
13	Beno	C	Mahaka-A	Beno@gmail.com	082287821654	2023-01-14 00:00:00
14	George	C	Mahaka-B	George@gmail.com	082287821627	2023-01-15 00:00:00
15	Prayoga	I	Bukit Asam	Prayoga@gmail.com	082287821632	2023-01-16 00:00:00
16	Dimas	C	Pertamina	Dimas@gmail.com	082287821638	2023-01-17 00:00:00
17	Viola	T	Mandiri	Viola@gmail.com	082287821641	2023-01-10 00:00:00
18	Yoga	I	PLN	Yoga@gmail.com	082287821624	2023-01-18 00:00:00
19	Arya	T	Astra International	Arya@gmail.com	082287821612	2023-01-19 00:00:00
20	Kiron	C	BBRI	Kiron@gmail.com	082287821623	2023-01-20 00:00:00
44	Finance	C	Hotel Realta	Finance@gmail.com	08228882828	2023-01-19 00:00:00
55	Admin	C	Hotel Realta	Admin@gmail.com	08228929292	2023-01-20 00:00:00
2	Aryasa Miftah Mubaraq Siagian	I	PT. Akasia Code Digital	Aryasa@gmail.com	082287821622	2023-03-13 11:56:39.635
56	emil setiawan	C	\N	\N	\N	\N
\.


--
-- Name: booking_order_detail_borde_id_seq; Type: SEQUENCE SET; Schema: booking; Owner: postgres
--

SELECT pg_catalog.setval('booking.booking_order_detail_borde_id_seq', 11, true);


--
-- Name: booking_order_detail_extra_boex_id_seq; Type: SEQUENCE SET; Schema: booking; Owner: postgres
--

SELECT pg_catalog.setval('booking.booking_order_detail_extra_boex_id_seq', 12, true);


--
-- Name: booking_orders_boor_id_seq; Type: SEQUENCE SET; Schema: booking; Owner: postgres
--

SELECT pg_catalog.setval('booking.booking_orders_boor_id_seq', 11, true);


--
-- Name: special_offer_coupons_soco_id_seq; Type: SEQUENCE SET; Schema: booking; Owner: postgres
--

SELECT pg_catalog.setval('booking.special_offer_coupons_soco_id_seq', 10, true);


--
-- Name: special_offers_spof_id_seq; Type: SEQUENCE SET; Schema: booking; Owner: postgres
--

SELECT pg_catalog.setval('booking.special_offers_spof_id_seq', 31, true);


--
-- Name: facilities_faci_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.facilities_faci_id_seq', 40, true);


--
-- Name: facility_photo_fapho_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.facility_photo_fapho_id_seq', 24, true);


--
-- Name: facility_price_history_faph_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.facility_price_history_faph_id_seq', 38, true);


--
-- Name: hotel_reviews_hore_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.hotel_reviews_hore_id_seq', 10, true);


--
-- Name: hotels_hotel_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.hotels_hotel_id_seq', 16, true);


--
-- Name: department_dept_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.department_dept_id_seq', 22, true);


--
-- Name: employee_department_history_edhi_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.employee_department_history_edhi_id_seq', 28, true);


--
-- Name: employee_emp_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.employee_emp_id_seq', 22, true);


--
-- Name: job_role_joro_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.job_role_joro_id_seq', 1, false);


--
-- Name: shift_shift_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.shift_shift_id_seq', 1, false);


--
-- Name: work_order_detail_wode_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.work_order_detail_wode_id_seq', 24, true);


--
-- Name: work_orders_woro_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.work_orders_woro_id_seq', 23, true);


--
-- Name: address_addr_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.address_addr_id_seq', 12, true);


--
-- Name: category_group_cagro_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.category_group_cagro_id_seq', 7, true);


--
-- Name: country_country_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.country_country_id_seq', 19, true);


--
-- Name: policy_category_group_poca_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.policy_category_group_poca_id_seq', 20, true);


--
-- Name: policy_poli_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.policy_poli_id_seq', 19, true);


--
-- Name: price_items_prit_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.price_items_prit_id_seq', 19, true);


--
-- Name: proviences_prov_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.proviences_prov_id_seq', 20, true);


--
-- Name: regions_region_code_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.regions_region_code_seq', 6, true);


--
-- Name: service_task_seta_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.service_task_seta_id_seq', 20, true);


--
-- Name: entitys_entity_id_seq; Type: SEQUENCE SET; Schema: payment; Owner: postgres
--

SELECT pg_catalog.setval('payment.entitys_entity_id_seq', 17, true);


--
-- Name: payment_transaction_patr_id_seq; Type: SEQUENCE SET; Schema: payment; Owner: postgres
--

SELECT pg_catalog.setval('payment.payment_transaction_patr_id_seq', 21, true);


--
-- Name: purchase_order_detail_pode_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.purchase_order_detail_pode_id_seq', 26, true);


--
-- Name: purchase_order_header_pohe_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.purchase_order_header_pohe_id_seq', 10, true);


--
-- Name: stock_detail_stod_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.stock_detail_stod_id_seq', 20, true);


--
-- Name: stock_photo_spho_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.stock_photo_spho_id_seq', 1, false);


--
-- Name: stocks_stock_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.stocks_stock_id_seq', 26, true);


--
-- Name: vendor_product_vepro_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.vendor_product_vepro_id_seq', 20, true);


--
-- Name: vendor_vendor_id_seq; Type: SEQUENCE SET; Schema: purchasing; Owner: postgres
--

SELECT pg_catalog.setval('purchasing.vendor_vendor_id_seq', 22, true);


--
-- Name: order_menu_detail_omde_id_seq; Type: SEQUENCE SET; Schema: resto; Owner: postgres
--

SELECT pg_catalog.setval('resto.order_menu_detail_omde_id_seq', 31, true);


--
-- Name: order_menus_orme_id_seq; Type: SEQUENCE SET; Schema: resto; Owner: postgres
--

SELECT pg_catalog.setval('resto.order_menus_orme_id_seq', 26, true);


--
-- Name: resto_menu_photos_remp_id_seq; Type: SEQUENCE SET; Schema: resto; Owner: postgres
--

SELECT pg_catalog.setval('resto.resto_menu_photos_remp_id_seq', 29, true);


--
-- Name: resto_menus_reme_id_seq; Type: SEQUENCE SET; Schema: resto; Owner: postgres
--

SELECT pg_catalog.setval('resto.resto_menus_reme_id_seq', 21, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.roles_role_id_seq', 1, false);


--
-- Name: user_bonus_points_ubpo_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.user_bonus_points_ubpo_id_seq', 1, false);


--
-- Name: user_password_uspa_user_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.user_password_uspa_user_id_seq', 1, false);


--
-- Name: user_profiles_uspro_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.user_profiles_uspro_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_user_id_seq', 56, true);


--
-- Name: booking_order_detail booking_order_detail_border_boor_id_key; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail
    ADD CONSTRAINT booking_order_detail_border_boor_id_key UNIQUE (border_boor_id);


--
-- Name: booking_orders booking_orders_boor_order_number_key; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_orders
    ADD CONSTRAINT booking_orders_boor_order_number_key UNIQUE (boor_order_number);


--
-- Name: booking_order_detail_extra pk_boex_id; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail_extra
    ADD CONSTRAINT pk_boex_id PRIMARY KEY (boex_id);


--
-- Name: booking_order_detail pk_boor_borde_id; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail
    ADD CONSTRAINT pk_boor_borde_id PRIMARY KEY (borde_id);


--
-- Name: booking_orders pk_boor_id; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_orders
    ADD CONSTRAINT pk_boor_id PRIMARY KEY (boor_id);


--
-- Name: user_breakfeast pk_borde_modified_id; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.user_breakfeast
    ADD CONSTRAINT pk_borde_modified_id PRIMARY KEY (usbr_borde_id, usbr_modified_date);


--
-- Name: special_offer_coupons pk_soco_id; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.special_offer_coupons
    ADD CONSTRAINT pk_soco_id PRIMARY KEY (soco_id);


--
-- Name: special_offers pk_spof_id; Type: CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.special_offers
    ADD CONSTRAINT pk_spof_id PRIMARY KEY (spof_id);


--
-- Name: facilities facilities_faci_room_number_key; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facilities
    ADD CONSTRAINT facilities_faci_room_number_key UNIQUE (faci_room_number);


--
-- Name: facilities pk_faci_id; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facilities
    ADD CONSTRAINT pk_faci_id PRIMARY KEY (faci_id);


--
-- Name: facility_price_history pk_facility_price_history; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_price_history
    ADD CONSTRAINT pk_facility_price_history PRIMARY KEY (faph_id);


--
-- Name: facility_photo pk_fapho_id; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_photo
    ADD CONSTRAINT pk_fapho_id PRIMARY KEY (fapho_id);


--
-- Name: hotel_reviews pk_hore_id; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotel_reviews
    ADD CONSTRAINT pk_hore_id PRIMARY KEY (hore_id);


--
-- Name: hotels pk_hotel_id; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotels
    ADD CONSTRAINT pk_hotel_id PRIMARY KEY (hotel_id);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (dept_id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (emp_id);


--
-- Name: job_role job_role_joro_name_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.job_role
    ADD CONSTRAINT job_role_joro_name_key UNIQUE (joro_name);


--
-- Name: job_role job_role_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.job_role
    ADD CONSTRAINT job_role_pkey PRIMARY KEY (joro_id);


--
-- Name: employee_department_history pk_edhi_id; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT pk_edhi_id PRIMARY KEY (edhi_id);


--
-- Name: employee_pay_history pk_ephi_id; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_pay_history
    ADD CONSTRAINT pk_ephi_id PRIMARY KEY (ephi_rate_change_date);


--
-- Name: shift shift_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.shift
    ADD CONSTRAINT shift_pkey PRIMARY KEY (shift_id);


--
-- Name: shift shift_shift_end_time_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.shift
    ADD CONSTRAINT shift_shift_end_time_key UNIQUE (shift_end_time);


--
-- Name: shift shift_shift_name_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.shift
    ADD CONSTRAINT shift_shift_name_key UNIQUE (shift_name);


--
-- Name: shift shift_shift_start_time_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.shift
    ADD CONSTRAINT shift_shift_start_time_key UNIQUE (shift_start_time);


--
-- Name: work_order_detail work_order_detail_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_order_detail
    ADD CONSTRAINT work_order_detail_pkey PRIMARY KEY (wode_id);


--
-- Name: work_orders work_orders_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_orders
    ADD CONSTRAINT work_orders_pkey PRIMARY KEY (woro_id);


--
-- Name: address addr_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT addr_id_pk PRIMARY KEY (addr_id);


--
-- Name: category_group cagro_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category_group
    ADD CONSTRAINT cagro_id_pk PRIMARY KEY (cagro_id);


--
-- Name: category_group category_group_cagro_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category_group
    ADD CONSTRAINT category_group_cagro_name_key UNIQUE (cagro_name);


--
-- Name: country country_country_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_country_name_key UNIQUE (country_name);


--
-- Name: country country_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_id_pk PRIMARY KEY (country_id);


--
-- Name: members memb_name_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.members
    ADD CONSTRAINT memb_name_pk PRIMARY KEY (memb_name);


--
-- Name: policy_category_group poca_poli_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.policy_category_group
    ADD CONSTRAINT poca_poli_id_pk PRIMARY KEY (poca_id);


--
-- Name: policy poli_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.policy
    ADD CONSTRAINT poli_id_pk PRIMARY KEY (poli_id);


--
-- Name: price_items price_items_prit_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.price_items
    ADD CONSTRAINT price_items_prit_name_key UNIQUE (prit_name);


--
-- Name: price_items prit_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.price_items
    ADD CONSTRAINT prit_id_pk PRIMARY KEY (prit_id);


--
-- Name: proviences prov_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.proviences
    ADD CONSTRAINT prov_id_pk PRIMARY KEY (prov_id);


--
-- Name: regions region_code_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.regions
    ADD CONSTRAINT region_code_pk PRIMARY KEY (region_code);


--
-- Name: regions regions_region_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.regions
    ADD CONSTRAINT regions_region_name_key UNIQUE (region_name);


--
-- Name: service_task service_task_seta_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.service_task
    ADD CONSTRAINT service_task_seta_name_key UNIQUE (seta_name);


--
-- Name: service_task seta_id_pk; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.service_task
    ADD CONSTRAINT seta_id_pk PRIMARY KEY (seta_id);


--
-- Name: bank bank_bank_code_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_bank_code_key UNIQUE (bank_code);


--
-- Name: bank bank_bank_name_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_bank_name_key UNIQUE (bank_name);


--
-- Name: bank bank_entity_id_pk; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_entity_id_pk PRIMARY KEY (bank_entity_id);


--
-- Name: entitys entitys_pkey; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.entitys
    ADD CONSTRAINT entitys_pkey PRIMARY KEY (entity_id);


--
-- Name: payment_gateway paga_entity_id_pk; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_gateway
    ADD CONSTRAINT paga_entity_id_pk PRIMARY KEY (paga_entity_id);


--
-- Name: payment_gateway payment_gateway_paga_code_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_gateway
    ADD CONSTRAINT payment_gateway_paga_code_key UNIQUE (paga_code);


--
-- Name: payment_gateway payment_gateway_paga_name_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_gateway
    ADD CONSTRAINT payment_gateway_paga_name_key UNIQUE (paga_name);


--
-- Name: payment_transaction payment_transaction_patr_trx_id_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_transaction
    ADD CONSTRAINT payment_transaction_patr_trx_id_key UNIQUE (patr_trx_id);


--
-- Name: payment_transaction payment_transaction_patr_trx_number_ref_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_transaction
    ADD CONSTRAINT payment_transaction_patr_trx_number_ref_key UNIQUE (patr_trx_number_ref);


--
-- Name: payment_transaction payment_transaction_pkey; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_transaction
    ADD CONSTRAINT payment_transaction_pkey PRIMARY KEY (patr_id);


--
-- Name: user_accounts usac_pk; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.user_accounts
    ADD CONSTRAINT usac_pk PRIMARY KEY (usac_entity_id, usac_user_id);


--
-- Name: user_accounts user_accounts_usac_account_number_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.user_accounts
    ADD CONSTRAINT user_accounts_usac_account_number_key UNIQUE (usac_account_number);


--
-- Name: purchase_order_header pohe_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_header
    ADD CONSTRAINT pohe_id_pk PRIMARY KEY (pohe_id);


--
-- Name: purchase_order_detail purchase_order_detail_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_detail
    ADD CONSTRAINT purchase_order_detail_id_pk PRIMARY KEY (pode_pohe_id, pode_id);


--
-- Name: purchase_order_header purchase_order_header_pohe_number_key; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_header
    ADD CONSTRAINT purchase_order_header_pohe_number_key UNIQUE (pohe_number);


--
-- Name: stock_photo spho_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_photo
    ADD CONSTRAINT spho_id_pk PRIMARY KEY (spho_id);


--
-- Name: stock_detail stock_detail_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_detail
    ADD CONSTRAINT stock_detail_id_pk PRIMARY KEY (stod_stock_id, stod_id);


--
-- Name: stock_detail stock_detail_stod_barcode_number_key; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_detail
    ADD CONSTRAINT stock_detail_stod_barcode_number_key UNIQUE (stod_barcode_number);


--
-- Name: stocks stock_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stocks
    ADD CONSTRAINT stock_id_pk PRIMARY KEY (stock_id);


--
-- Name: vendor vendor_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.vendor
    ADD CONSTRAINT vendor_id_pk PRIMARY KEY (vendor_id);


--
-- Name: vendor_product vepro_id_pk; Type: CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.vendor_product
    ADD CONSTRAINT vepro_id_pk PRIMARY KEY (vepro_id);


--
-- Name: order_menu_detail pk_omde_id; Type: CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menu_detail
    ADD CONSTRAINT pk_omde_id PRIMARY KEY (omde_id);


--
-- Name: order_menus pk_orme_id; Type: CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menus
    ADD CONSTRAINT pk_orme_id PRIMARY KEY (orme_id);


--
-- Name: resto_menu_photos pk_remp_id; Type: CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.resto_menu_photos
    ADD CONSTRAINT pk_remp_id PRIMARY KEY (remp_id);


--
-- Name: resto_menus pk_resto_menus; Type: CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.resto_menus
    ADD CONSTRAINT pk_resto_menus PRIMARY KEY (reme_id);


--
-- Name: roles role_id_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles
    ADD CONSTRAINT role_id_pk PRIMARY KEY (role_id);


--
-- Name: user_bonus_points ubpo_id_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_bonus_points
    ADD CONSTRAINT ubpo_id_pk PRIMARY KEY (ubpo_id);


--
-- Name: users user_id_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT user_id_pk PRIMARY KEY (user_id);


--
-- Name: users users_user_email_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);


--
-- Name: user_members usme_user_id_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_members
    ADD CONSTRAINT usme_user_id_pk PRIMARY KEY (usme_user_id);


--
-- Name: user_profiles usme_user_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_profiles
    ADD CONSTRAINT usme_user_pk PRIMARY KEY (uspro_id);


--
-- Name: user_password uspa_user_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_password
    ADD CONSTRAINT uspa_user_pk PRIMARY KEY (uspa_user_id);


--
-- Name: user_roles usro_user_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_roles
    ADD CONSTRAINT usro_user_pk PRIMARY KEY (usro_user_id);


--
-- Name: viewhotel _RETURN; Type: RULE; Schema: hotel; Owner: postgres
--

CREATE OR REPLACE VIEW hotel.viewhotel AS
 SELECT h.hotel_id,
    h.hotel_name,
    h.hotel_description,
    h.hotel_rating_star,
    h.hotel_phonenumber,
    faci_group.faci_hotelall,
    faci_group.faci_rateprice,
    faci_group.faci_lowprice,
    faci_group.faci_highprice,
    faci_group.faci_taxrate,
    string_agg((photo_hotel.url)::text, ','::text) AS url,
    addrees.place,
    addrees.city
   FROM (((hotel.hotels h
     JOIN ( SELECT facilities.faci_hotel_id,
            string_agg((facilities.faci_name)::text, ', '::text) AS faci_hotelall,
            string_agg(concat(' ', facilities.faci_rate_price), '- '::text) AS faci_rateprice,
            string_agg(concat(' ', facilities.faci_low_price), '- '::text) AS faci_lowprice,
            string_agg(concat(' ', facilities.faci_high_price), '- '::text) AS faci_highprice,
            string_agg(concat(' ', facilities.faci_tax_rate), '- '::text) AS faci_taxrate
           FROM hotel.facilities
          WHERE (facilities.faci_cagro_id = 1)
          GROUP BY facilities.faci_hotel_id) faci_group ON ((h.hotel_id = faci_group.faci_hotel_id)))
     JOIN ( SELECT f.faci_hotel_id AS hotel_id,
            f.faci_cagro_id,
            f.faci_name,
            ph.fapho_photo_filename AS url,
            ph.fapho_primary
           FROM (hotel.facility_photo ph
             JOIN hotel.facilities f ON ((ph.fapho_faci_id = f.faci_id)))
          WHERE (f.faci_cagro_id = 1)) photo_hotel ON ((h.hotel_id = photo_hotel.hotel_id)))
     JOIN ( SELECT a.addr_id AS hotel_addr_id,
            a.addr_line2 AS city,
            concat(a.addr_line1, ', ', a.addr_line2, ', ', p.prov_name, ', ', c.country_name, ', ', r.region_name) AS place
           FROM (((master.address a
             JOIN master.proviences p ON ((a.addr_prov_id = p.prov_id)))
             JOIN master.country c ON ((p.prov_country_id = c.country_id)))
             JOIN master.regions r ON ((r.region_code = c.country_region_id)))) addrees ON ((h.hotel_addr_id = addrees.hotel_addr_id)))
  GROUP BY h.hotel_id, faci_group.faci_hotelall, faci_group.faci_rateprice, faci_group.faci_lowprice, faci_group.faci_highprice, faci_group.faci_taxrate, addrees.place, addrees.city;


--
-- Name: booking_order_detail_extra fk_boex_borde_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail_extra
    ADD CONSTRAINT fk_boex_borde_id FOREIGN KEY (boex_borde_id) REFERENCES booking.booking_order_detail(borde_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_order_detail_extra fk_boex_prit_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail_extra
    ADD CONSTRAINT fk_boex_prit_id FOREIGN KEY (boex_prit_id) REFERENCES master.price_items(prit_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_orders fk_boor_hotel_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_orders
    ADD CONSTRAINT fk_boor_hotel_id FOREIGN KEY (boor_hotel_id) REFERENCES hotel.hotels(hotel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_orders fk_boor_user_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_orders
    ADD CONSTRAINT fk_boor_user_id FOREIGN KEY (boor_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_order_detail fk_borde_faci_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail
    ADD CONSTRAINT fk_borde_faci_id FOREIGN KEY (borde_faci_id) REFERENCES hotel.facilities(faci_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_order_detail fk_border_boor_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.booking_order_detail
    ADD CONSTRAINT fk_border_boor_id FOREIGN KEY (border_boor_id) REFERENCES booking.booking_orders(boor_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: special_offer_coupons fk_soco_borde_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.special_offer_coupons
    ADD CONSTRAINT fk_soco_borde_id FOREIGN KEY (soco_borde_id) REFERENCES booking.booking_order_detail(borde_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: special_offer_coupons fk_soco_spof_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.special_offer_coupons
    ADD CONSTRAINT fk_soco_spof_id FOREIGN KEY (soco_spof_id) REFERENCES booking.special_offers(spof_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_breakfeast fk_usbr_borde_id; Type: FK CONSTRAINT; Schema: booking; Owner: postgres
--

ALTER TABLE ONLY booking.user_breakfeast
    ADD CONSTRAINT fk_usbr_borde_id FOREIGN KEY (usbr_borde_id) REFERENCES booking.booking_order_detail(borde_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: facilities fk_faci_cagro_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facilities
    ADD CONSTRAINT fk_faci_cagro_id FOREIGN KEY (faci_cagro_id) REFERENCES master.category_group(cagro_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: facilities fk_faci_hotel_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facilities
    ADD CONSTRAINT fk_faci_hotel_id FOREIGN KEY (faci_hotel_id) REFERENCES hotel.hotels(hotel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: facility_price_history fk_faph_faci_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_price_history
    ADD CONSTRAINT fk_faph_faci_id FOREIGN KEY (faph_faci_id) REFERENCES hotel.facilities(faci_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: facility_price_history fk_faph_user_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_price_history
    ADD CONSTRAINT fk_faph_user_id FOREIGN KEY (faph_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: facility_photo fk_fapho_faci_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.facility_photo
    ADD CONSTRAINT fk_fapho_faci_id FOREIGN KEY (fapho_faci_id) REFERENCES hotel.facilities(faci_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hotel_reviews fk_hore_hotel_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotel_reviews
    ADD CONSTRAINT fk_hore_hotel_id FOREIGN KEY (hore_hotel_id) REFERENCES hotel.hotels(hotel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hotel_reviews fk_hore_user_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotel_reviews
    ADD CONSTRAINT fk_hore_user_id FOREIGN KEY (hore_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hotels fk_hotel_addr_id; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.hotels
    ADD CONSTRAINT fk_hotel_addr_id FOREIGN KEY (hotel_addr_id) REFERENCES master.address(addr_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee_department_history fk_dept_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT fk_dept_id FOREIGN KEY (edhi_dept_id) REFERENCES hr.department(dept_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee_department_history fk_edhi_emp_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT fk_edhi_emp_id FOREIGN KEY (edhi_emp_id) REFERENCES hr.employee(emp_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee fk_emp_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (emp_emp_id) REFERENCES hr.employee(emp_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_order_detail fk_emp_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_order_detail
    ADD CONSTRAINT fk_emp_id FOREIGN KEY (wode_emp_id) REFERENCES hr.employee(emp_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee_pay_history fk_ephi_emp_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_pay_history
    ADD CONSTRAINT fk_ephi_emp_id FOREIGN KEY (ephi_emp_id) REFERENCES hr.employee(emp_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_order_detail fk_faci_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_order_detail
    ADD CONSTRAINT fk_faci_id FOREIGN KEY (wode_faci_id) REFERENCES hotel.facilities(faci_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee fk_joro_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT fk_joro_id FOREIGN KEY (emp_joro_id) REFERENCES hr.job_role(joro_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_order_detail fk_seta_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_order_detail
    ADD CONSTRAINT fk_seta_id FOREIGN KEY (wode_seta_id) REFERENCES master.service_task(seta_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee_department_history fk_shift_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT fk_shift_id FOREIGN KEY (edhi_shift_id) REFERENCES hr.shift(shift_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: employee fk_user_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT fk_user_id FOREIGN KEY (emp_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_order_detail fk_woro_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_order_detail
    ADD CONSTRAINT fk_woro_id FOREIGN KEY (wode_woro_id) REFERENCES hr.work_orders(woro_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_orders fk_woro_user_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.work_orders
    ADD CONSTRAINT fk_woro_user_id FOREIGN KEY (woro_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: address addr_prov_id_fk; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT addr_prov_id_fk FOREIGN KEY (addr_prov_id) REFERENCES master.proviences(prov_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: country country_region_id_fk; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_region_id_fk FOREIGN KEY (country_region_id) REFERENCES master.regions(region_code) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: policy_category_group poca_cagro_id_fk; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.policy_category_group
    ADD CONSTRAINT poca_cagro_id_fk FOREIGN KEY (poca_cagro_id) REFERENCES master.category_group(cagro_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: policy_category_group poca_poli_id_fk; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.policy_category_group
    ADD CONSTRAINT poca_poli_id_fk FOREIGN KEY (poca_poli_id) REFERENCES master.policy(poli_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: proviences prov_country_id_fk; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.proviences
    ADD CONSTRAINT prov_country_id_fk FOREIGN KEY (prov_country_id) REFERENCES master.country(country_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bank bank_entity_id_fk; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_entity_id_fk FOREIGN KEY (bank_entity_id) REFERENCES payment.entitys(entity_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_gateway paga_entity_id_fk; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_gateway
    ADD CONSTRAINT paga_entity_id_fk FOREIGN KEY (paga_entity_id) REFERENCES payment.entitys(entity_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_accounts usac_fk; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.user_accounts
    ADD CONSTRAINT usac_fk FOREIGN KEY (usac_entity_id) REFERENCES payment.entitys(entity_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_accounts usac_user_id_fk; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.user_accounts
    ADD CONSTRAINT usac_user_id_fk FOREIGN KEY (usac_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_transaction user_fk; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.payment_transaction
    ADD CONSTRAINT user_fk FOREIGN KEY (patr_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchase_order_detail pode_pohe_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_detail
    ADD CONSTRAINT pode_pohe_id_fk FOREIGN KEY (pode_pohe_id) REFERENCES purchasing.purchase_order_header(pohe_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchase_order_detail pode_stock_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_detail
    ADD CONSTRAINT pode_stock_id_fk FOREIGN KEY (pode_stock_id) REFERENCES purchasing.stocks(stock_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchase_order_header pohe_emp_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_header
    ADD CONSTRAINT pohe_emp_id_fk FOREIGN KEY (pohe_emp_id) REFERENCES hr.employee(emp_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchase_order_header pohe_vendor_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.purchase_order_header
    ADD CONSTRAINT pohe_vendor_id_fk FOREIGN KEY (pohe_vendor_id) REFERENCES purchasing.vendor(vendor_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stock_photo spho_stock_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_photo
    ADD CONSTRAINT spho_stock_id_fk FOREIGN KEY (spho_stock_id) REFERENCES purchasing.stocks(stock_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stock_detail stod_faci_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_detail
    ADD CONSTRAINT stod_faci_id_fk FOREIGN KEY (stod_faci_id) REFERENCES hotel.facilities(faci_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stock_detail stod_pohe_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_detail
    ADD CONSTRAINT stod_pohe_id_fk FOREIGN KEY (stod_pohe_id) REFERENCES purchasing.purchase_order_header(pohe_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stock_detail stod_stock_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.stock_detail
    ADD CONSTRAINT stod_stock_id_fk FOREIGN KEY (stod_stock_id) REFERENCES purchasing.stocks(stock_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vendor_product vepro_stock_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.vendor_product
    ADD CONSTRAINT vepro_stock_id_fk FOREIGN KEY (vepro_stock_id) REFERENCES purchasing.stocks(stock_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vendor_product vepro_vendor_id_fk; Type: FK CONSTRAINT; Schema: purchasing; Owner: postgres
--

ALTER TABLE ONLY purchasing.vendor_product
    ADD CONSTRAINT vepro_vendor_id_fk FOREIGN KEY (vepro_vendor_id) REFERENCES purchasing.vendor(vendor_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_menu_detail fk_omde_orme_id; Type: FK CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menu_detail
    ADD CONSTRAINT fk_omde_orme_id FOREIGN KEY (omde_orme_id) REFERENCES resto.order_menus(orme_id);


--
-- Name: order_menu_detail fk_omde_reme_id; Type: FK CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menu_detail
    ADD CONSTRAINT fk_omde_reme_id FOREIGN KEY (omde_reme_id) REFERENCES resto.resto_menus(reme_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_menus fk_orme_user_id; Type: FK CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.order_menus
    ADD CONSTRAINT fk_orme_user_id FOREIGN KEY (orme_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: resto_menus fk_reme_faci_id; Type: FK CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.resto_menus
    ADD CONSTRAINT fk_reme_faci_id FOREIGN KEY (reme_faci_id) REFERENCES hotel.facilities(faci_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: resto_menu_photos fk_remp_reme_id; Type: FK CONSTRAINT; Schema: resto; Owner: postgres
--

ALTER TABLE ONLY resto.resto_menu_photos
    ADD CONSTRAINT fk_remp_reme_id FOREIGN KEY (remp_reme_id) REFERENCES resto.resto_menus(reme_id);


--
-- Name: user_bonus_points ubpo_user_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_bonus_points
    ADD CONSTRAINT ubpo_user_fk FOREIGN KEY (ubpo_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_members usme_user_id_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_members
    ADD CONSTRAINT usme_user_id_fk FOREIGN KEY (usme_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_members usme_user_memb_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_members
    ADD CONSTRAINT usme_user_memb_fk FOREIGN KEY (usme_memb_name) REFERENCES master.members(memb_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_password uspa_user_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_password
    ADD CONSTRAINT uspa_user_fk FOREIGN KEY (uspa_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_profiles uspro_addr_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_profiles
    ADD CONSTRAINT uspro_addr_fk FOREIGN KEY (uspro_addr_id) REFERENCES master.address(addr_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_profiles uspro_user_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_profiles
    ADD CONSTRAINT uspro_user_fk FOREIGN KEY (uspro_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles usro_role_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_roles
    ADD CONSTRAINT usro_role_fk FOREIGN KEY (usro_role_id) REFERENCES users.roles(role_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles usro_user_fk; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.user_roles
    ADD CONSTRAINT usro_user_fk FOREIGN KEY (usro_user_id) REFERENCES users.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

