--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Master--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE SCHEMA master;
create table master.regions (
	region_code serial,
	region_name varchar(35) unique,
	constraint region_code_pk primary key (region_code)
);
create table master.country (
	country_id serial,
	country_name varchar(35) unique,
	country_region_id int,
	constraint country_id_pk primary key (country_id),
	constraint country_region_id_fk foreign key (country_region_id) references master.regions(region_code) on delete cascade on update cascade
);
create table master.proviences(
	prov_id serial,
	prov_name varchar(85),
	prov_country_id int,
	constraint prov_id_pk primary key (prov_id),
	constraint prov_country_id_fk foreign key (prov_country_id) references master.country(country_id) on delete cascade on update cascade
);
create table master.address(
	addr_id serial,
	addr_line1 varchar(225),
	addr_line2 varchar(225),
	addr_postal_code varchar(5),
	addr_spatial_location json,
	addr_prov_id int,
	constraint addr_id_pk primary key (addr_id),
	constraint addr_prov_id_fk foreign key (addr_prov_id) references master.proviences(prov_id) 
	on delete cascade on update cascade
);

create table master.category_group(
	cagro_id serial,
	cagro_name varchar(25) unique,
	cagro_description varchar(225),
	cagro_type varchar(25),
	cagro_icon varchar(255),
	cagro_icon_url varchar(255),
	constraint cagro_id_pk primary key (cagro_id)
);

create table master.policy(
	poli_id serial,
	poli_name varchar(55),
	poli_description varchar(255),
	constraint poli_id_pk primary key (poli_id)
);
create table master.policy_category_group(
	poca_poli_id serial,
	poca_cagro_id int,
	constraint poca_poli_id_pk primary key (poca_poli_id), --1 PK
	constraint poca_poli_id_fk foreign key (poca_poli_id) references master.policy(poli_id) 
	on delete cascade on update cascade,
	constraint poca_cagro_id_fk foreign key (poca_cagro_id) references master.category_group(cagro_id) 
	on delete cascade on update cascade
);

create table master.price_items(
	prit_id serial,
	prit_name varchar(55) unique,
	prit_price money,
	prit_description varchar(255),
	prit_type varchar(15),
	prit_modified_date timestamp,
	constraint prit_id_pk primary key (prit_id)
);

create table master.service_task(
	seta_id serial,
	seta_name varchar(85) unique,
	set_seq smallint,
	constraint seta_id_pk primary key (seta_id)
);

create table master.members(
	memb_name varchar(15),
	memb_description varchar(100),
	constraint memb_name_pk primary key (memb_name)
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--User--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Create Schema users;

CREATE TABLE users.users (
	user_id serial,
	user_full_name varchar(55),
	user_type varchar(15),
	user_company_name varchar(255),
	user_email varchar(255),
	user_phone_number varchar(25) unique,
	user_modified_date timestamp,
	CONSTRAINT user_id_pk primary key (user_id)
);
CREATE TABLE users.roles (
	role_id serial,
	role_name varchar(35),
	CONSTRAINT role_id_pk primary key (role_id)
);
CREATE TABLE users.user_roles (
	usro_user_id integer,
	usro_role_id integer,
	CONSTRAINT usro_user_pk primary key (usro_user_id), --1 PK
	CONSTRAINT usro_user_fk FOREIGN key (usro_user_id) REFERENCES users.users (user_id) on delete cascade on update cascade,
	CONSTRAINT usro_role_fk FOREIGN key (usro_role_id) REFERENCES users.roles (role_id) on delete cascade on update cascade
);

CREATE TABLE users.user_members (
	usme_user_id integer,
	usme_memb_name varchar(15),
	usme_promote_date timestamp,
	usme_points smallint,
	usme_type varchar(15),
	CONSTRAINT usme_user_id_pk primary key (usme_user_id),
	CONSTRAINT usme_user_id_fk foreign key (usme_user_id) references users.users(user_id) 
	on delete cascade on update cascade, --Tadi kurang FKnya 1
	CONSTRAINT usme_user_memb_fk FOREIGN key (usme_memb_name) REFERENCES master.members (memb_name) 
	on delete cascade on update cascade
);

CREATE TABLE users.user_profiles (
	uspro_id serial,
	uspro_national_id varchar(20),
	uspro_birt_date date,
	uspro_job_title varchar(50),
	uspro_martial_status char(1),
	uspro_gender char(1),
	uspro_addr_id integer,
	uspro_user_id integer,
	CONSTRAINT usme_user_pk primary key (uspro_id),
	CONSTRAINT uspro_addr_fk FOREIGN key (uspro_addr_id) REFERENCES master.address (addr_id) 
	on delete cascade on update cascade,
	CONSTRAINT uspro_user_fk FOREIGN key (uspro_user_id) REFERENCES users.users (user_id) 
	on delete cascade on update cascade
);

CREATE TABLE users.user_bonus_points (
	ubpo_id serial,
	ubpo_user_id integer,
	ubpo_total_points smallint,
	ubpo_bonus_type char(1),
	ubpo_created_on timestamp,
	CONSTRAINT ubpo_id_pk primary key (ubpo_id),
	CONSTRAINT ubpo_user_fk FOREIGN key (ubpo_user_id) REFERENCES users.users (user_id) 
	on delete cascade on update cascade
);
CREATE TABLE users.user_password (
	uspa_user_id serial,
	uspa_passwordHash VARCHAR(128),
	uspa_passwordSalt Varchar(10),
	CONSTRAINT uspa_user_pk primary key (uspa_user_id),
	CONSTRAINT uspa_user_fk FOREIGN key (uspa_user_id) REFERENCES users.users (user_id) 
	on delete cascade on update cascade
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Hotel--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE Schema Hotel;
create table hotel.hotels(
	hotel_id serial,
	hotel_name varchar(85),
	hotel_description varchar(500),
	hotel_rating_star smallint,
	hotel_phonenumber varchar(25),
	hotel_modified_date timestamp,
	hotel_addr_id int,
	constraint pk_hotel_id primary key (hotel_id),
	constraint fk_hotel_addr_id foreign key (hotel_addr_id) references master.address(addr_id) on update cascade on delete cascade
);
create table hotel.hotel_reviews(
	hore_id serial,
	hore_user_review varchar(125),
	hore_rating smallint,
	hore_created_on timestamp,
	hore_user_id int,
	hore_hotel_id int,
	constraint pk_hore_id primary key (hore_id),
	constraint fk_hore_hotel_id foreign key (hore_hotel_id) references hotel.hotels(hotel_id) on delete cascade on update cascade,
	constraint fk_hore_user_id foreign key (hore_user_id) references users.users(user_id) on update cascade on delete cascade
);
create table hotel.facilities(
	faci_id serial,
	faci_name varchar(125),
	faci_description varchar(255),
	faci_max_number int,
	faci_measure_unit varchar(15),
	faci_room_number varchar(6) UNIQUE,
	faci_startdate timestamp,
	faci_enddate timestamp,
	faci_low_price money,
	faci_high_price money,
	faci_rate_price money,
	faci_discount money,
	faci_tax_rate money,
	faci_modified_date timestamp,
	faci_cagro_id int,
	faci_hotel_id int,
	constraint pk_faci_id primary key (faci_id),
	constraint fk_faci_hotel_id foreign key (faci_hotel_id) references hotel.hotels(hotel_id) on delete cascade on update cascade,
	constraint fk_faci_cagro_id foreign key (faci_cagro_id) references master.category_group(cagro_id) on update cascade on delete cascade
);
create table hotel.facility_photo(
	fapho_faci_id int,
	fapho_id serial,
	fapho_thumbnail_filename varchar(125),
	fapho_photo_filename varchar(125),
	fapho_primary bool,
	fapho_url varchar(255),
	fapho_modified_date date,
	constraint pk_fapho_id primary key(fapho_id),
	constraint fk_fapho_faci_id foreign key (fapho_faci_id) references hotel.facilities(faci_id) on delete cascade on update cascade
);
create table hotel.facility_price_history(
	faph_faci_id int,
	faph_id serial,
	faph_startdate timestamp,
	faph_enddate timestamp,
	faph_low_price money,
	faph_high_price money,
	faph_rate_price money,
	faph_discount money,
	faph_tax_rate money,
	faph_modified_date timestamp,
	faph_user_id int,
	constraint pk_facility_price_history primary key (faph_id),
	constraint fk_faph_faci_id foreign key (faph_faci_id) references hotel.facilities(faci_id) on delete cascade on update cascade,
	constraint fk_faph_user_id foreign key (faph_user_id) references users.users(user_id) on update cascade on delete cascade
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Booking--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create schema booking;

create table booking.special_offers (
	spof_id serial,
	spof_name varchar(55),
	spof_description varchar(255),
	spof_type varchar(50),
	spof_discount money,
	spof_start_date timestamp,
	spof_end_date timestamp,
	spof_min_qty int,
	spof_max_qty int,
	spof_modified_date timestamp,
	constraint pk_spof_id primary key (spof_id)
);
create table booking.booking_orders(
	boor_id serial,
	boor_order_number varchar(20) unique,
	boor_order_date timestamp,
	boor_arrival_date timestamp,
	boor_total_room smallInt,
	boor_total_guest smallInt,
	boor_discount money,
	boor_total_tax money,
	boor_total_amount money,
	boor_down_payment money,
	boor_pay_type char(2),
	boor_is_paid char(2),
	boor_type varchar(15),
	boor_cardnumber varchar(25),
	boor_member_type varchar(15),
	boor_status varchar(15),
	boor_user_id int,
	boor_hotel_id int,
	constraint pk_boor_id primary key (boor_id),
	constraint fk_boor_user_id foreign key (boor_user_id) references users.users(user_id) on delete cascade on update cascade,
	constraint fk_boor_hotel_id foreign key (boor_hotel_id) references hotel.hotels(hotel_id) on delete cascade on update cascade
);
create table booking.booking_order_detail(
	border_boor_id int unique, --kata mas naufal
	borde_id serial,
	borde_checkin timestamp,
	borde_checkout timestamp,
	borde_adults int,
	borde_kids int,
	borde_price money,
	borde_extra money,
	borde_discount money,
	borde_tax money,
	borde_subtotal money,
	borde_faci_id int,
	constraint pk_boor_borde_id primary key (borde_id), --nambahin pknya
	constraint fk_borde_faci_id foreign key (borde_faci_id) references hotel.facilities(faci_id) on delete cascade on update cascade,
	constraint fk_border_boor_id foreign key (border_boor_id) references booking.booking_orders(boor_id) on delete cascade on update cascade
);
create table booking.special_offer_coupons(
	soco_id serial,
	soco_borde_id int,
	soco_spof_id int,
	constraint pk_soco_id primary key (soco_id),
	constraint fk_soco_borde_id foreign key (soco_borde_id) references booking.booking_order_detail(borde_id) on delete cascade on update cascade,
	constraint fk_soco_spof_id foreign key (soco_spof_id) references booking.special_offers(spof_id) on delete cascade on update cascade
);
create table booking.user_breakfeast(
	usbr_borde_id int,
	usbr_modified_date timestamp,
	usbr_total_vacant smallInt,
	constraint pk_borde_modified_id primary key (usbr_borde_id, usbr_modified_date),
	constraint fk_usbr_borde_id foreign key (usbr_borde_id) references booking.booking_order_detail(borde_id) on delete cascade on update cascade
);
create table booking.booking_order_detail_extra(
	boex_id serial,
	boex_price money,
	boex_qty smallInt,
	boex_subtotal money,
	boex_measure_unit varchar(50),
	boex_borde_id int,
	boex_prit_id int,
	constraint pk_boex_id primary key (boex_id),
	constraint fk_boex_borde_id foreign key (boex_borde_id) references booking.booking_order_detail(borde_id) on delete cascade on update cascade,
	constraint fk_boex_prit_id foreign key (boex_prit_id) references master.price_items(prit_id) on delete cascade on update cascade
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Resto--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE SCHEMA resto;
CREATE TABLE resto.order_menus(
	orme_id SERIAL,
	orme_order_number VARCHAR(20),
	orme_order_date TIMESTAMP,
	orme_total_item SMALLINT,
	orme_total_discount MONEY, --DIMINTANYA SMALLMONEY TP GAADA
	orme_total_amount MONEY,
	orme_pay_type NCHAR(2),
	orme_cardnumber VARCHAR(25),
	orme_is_paid NCHAR(2),
	orme_modified_date TIMESTAMP,
	orme_user_id INT,
	CONSTRAINT pk_orme_id PRIMARY KEY (orme_id),
	CONSTRAINT fk_orme_user_id FOREIGN KEY (orme_user_id) REFERENCES users.users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE resto.resto_menus(
	reme_faci_id INT,
	reme_id SERIAL,
	reme_name VARCHAR(55),
	reme_description VARCHAR(255),
	reme_price MONEY,
	reme_status VARCHAR(15), --AVAILABLE | EMPTY
	reme_modified_date TIMESTAMP,
	CONSTRAINT pk_resto_menus PRIMARY KEY (reme_id),
	CONSTRAINT fk_reme_faci_id FOREIGN KEY (reme_faci_id) REFERENCES hotel.facilities(faci_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE resto.order_menu_detail(
	omde_id SERIAL,
	orme_price MONEY,
	orme_qty SMALLINT,
	orme_subtotal MONEY,
	orme_discount MONEY,
	omde_orme_id INT,
	omde_reme_id INT,
	CONSTRAINT pk_omde_id PRIMARY KEY (omde_id),
	CONSTRAINT fk_omde_orme_id FOREIGN KEY (omde_orme_id) REFERENCES resto.order_menus (orme_id),
	CONSTRAINT fk_omde_reme_id FOREIGN KEY (omde_reme_id) REFERENCES resto.resto_menus (reme_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE resto.resto_menu_photos(
	remp_id SERIAL,
	remp_thumbnail_filename VARCHAR(50),
	remp_photo_filename VARCHAR(50),
	remp_primary BIT,
	--[0=NOT PRIMARY, 1=PRIMARY]
	remp_url VARCHAR(255),
	remp_reme_id INT,
	CONSTRAINT pk_remp_id PRIMARY KEY (remp_id),
	CONSTRAINT fk_remp_reme_id FOREIGN KEY (remp_reme_id) REFERENCES resto.resto_menus (reme_id)
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Payment--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE SCHEMA payment;

CREATE TABLE payment.entitys(
    entity_id serial primary key
);

CREATE TABLE payment.bank(
    bank_entity_id integer,
    bank_code varchar(10) unique,
    bank_name varchar(55) unique,
    bank_modified_date timestamp,
    CONSTRAINT bank_entity_id_pk primary key (bank_entity_id),
    CONSTRAINT bank_entity_id_fk foreign key (bank_entity_id)
    references payment.entitys(entity_id) on DELETE cascade on update cascade
);

CREATE TABLE payment.payment_gateway(
    paga_entity_id integer,
    paga_code varchar(10) unique,
    paga_name varchar(55) unique,
    paga_modified_date timestamp,
    CONSTRAINT paga_entity_id_pk primary key (paga_entity_id),
    CONSTRAINT paga_entity_id_fk foreign key (paga_entity_id)
    references payment.entitys(entity_id) on DELETE cascade on update cascade
);

CREATE TABLE payment.user_accounts(
    usac_entity_id integer,
    usac_user_id integer,
    usac_account_number varchar(25) unique,
    usac_saldo dec,
    usac_type varchar(15),
    usac_expmonth smallint,
    usac_expyear smallint,
	usac_secure_code varchar,
    usac_modified_date timestamp,
    CONSTRAINT usac_pk primary key(usac_entity_id, usac_user_id),
    CONSTRAINT usac_fk foreign key(usac_entity_id)
    references payment.entitys(entity_id) on delete cascade on update cascade,
    CONSTRAINT usac_user_id_fk foreign key (usac_user_id)
    references users.users(user_id) on DELETE cascade on UPDATE cascade
);

CREATE TABLE payment.payment_transaction(
    patr_id serial primary key,
    patr_trx_id varchar(55) unique,
    patr_debet dec,
    patr_credit dec,
    patr_type char(3),
    patr_note varchar(255),
    patr_modified_date timestamp,
    patr_order_number varchar(55),
    patr_source_id numeric,
    patr_target_id numeric,
    patr_trx_number_ref varchar(55) unique,
    patr_user_id int,
    CONSTRAINT user_fk foreign key (patr_user_id) references users.users(user_id) on delete cascade on update cascade
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--HR--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create schema HR;
-- Work orders table
create table HR.work_orders(
	woro_id serial primary key,
	woro_start_date timestamp,
	woro_status varchar(15),
	woro_user_id int,
	--add Foreign Key User
	constraint fk_woro_user_id foreign key(woro_user_id) references users.users (user_id) on delete cascade on update cascade
);
-- Job role table
create table HR.job_role(
	joro_id serial primary key,
	joro_name varchar(55) unique,
	joro_modified_date timestamp
);
-- Shift table
create table HR.shift(
	shift_id serial primary key,
	shift_name varchar(25) unique,
	shift_start_time time unique,
	shift_end_time time unique
);
-- Employee table
create table HR.employee(
	emp_id serial primary key,
	emp_national_id varchar(25),
	emp_birth_date date,
	emp_marital_status varchar(1),
	emp_gender varchar(1),
	emp_hire_date timestamp,
	emp_salaried_flag varchar(1),
	emp_vacation_hours smallint,
	emp_sickleave_hourse smallint,
	emp_current_flag smallint,
	emp_photo varchar(255),
	emp_modified_date timestamp,
	emp_emp_id int,
	emp_joro_id int,
	constraint fk_emp_id foreign key(emp_emp_id) references HR.employee (emp_id) on delete cascade on update cascade,
	constraint fk_joro_id foreign key(emp_joro_id) references HR.job_role (joro_id) on delete cascade on update cascade
);
-- Department table
create table HR.department(
	dept_id serial primary key,
	dept_name varchar(50),
	dept_modified_date timestamp
);
-- Employee department history table
create table HR.employee_department_history(
	edhi_id serial,
	edhi_emp_id int unique,
	edhi_start_date timestamp,
	edhi_end_date timestamp,
	edhi_modified_date timestamp,
	edhi_dept_id int,
	edhi_shift_id int,
	constraint pk_edhi_id primary key (edhi_id),
	constraint fk_edhi_emp_id foreign key (edhi_emp_id) references HR.employee(emp_id) on delete cascade on update cascade,
	constraint fk_dept_id foreign key (edhi_dept_id) references HR.department(dept_id) on delete cascade on update cascade,
	constraint fk_shift_id foreign key (edhi_shift_id) references HR.shift(shift_id) on delete cascade on update cascade
);
-- Employee pay history table
create table HR.employee_pay_history(
	ephi_emp_id int,
	ephi_rate_change_date timestamp,
	ephi_rate_salary money,
	ephi_pay_frequence smallint,
	ephi_modified_date timestamp,
	constraint pk_ephi_id primary key (ephi_rate_change_date),
	constraint fk_ephi_emp_id foreign key (ephi_emp_id) references HR.employee(emp_id) on delete cascade on update cascade
);
-- Work order details
create table HR.work_order_detail(
	wode_id serial primary key,
	wode_task_name varchar(255),
	wode_status varchar(15),
	wode_start_date timestamp,
	wode_end_date timestamp,
	wode_notes varchar(255),
	wode_emp_id int,
	wode_seta_id int,
	wode_faci_id int,
	wode_woro_id int,
	constraint fk_emp_id foreign key (wode_emp_id) references HR.employee (emp_id) on delete cascade on update cascade,
	constraint fk_woro_id foreign key (wode_woro_id) references HR.work_orders (woro_id) on delete cascade on update cascade,
	--add wode_seta_id
	constraint fk_seta_id foreign key (wode_seta_id) references master.service_task (seta_id) on delete cascade on update cascade,
	--add wode_faci_id
	constraint fk_faci_id foreign key (wode_faci_id) references hotel.facilities (faci_id) on delete cascade on update cascade

);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Purchasing--
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create schema purchasing;

create table purchasing.stocks (
	stock_id serial,
	stock_name varchar(255),
	stock_description varchar(255),
	stock_quantity smallint,
	stock_reorder_point smallint,
	stock_used smallint,
	stock_scrap smallint,
	stock_size varchar(25),
	stock_color varchar(15),
	stock_modified_date timestamp,
	
	CONSTRAINT stock_id_pk primary key (stock_id)
);

create table purchasing.stock_photo (
	spho_id serial,
	spho_thumbnail_filename varchar(50),
	spho_photo_filename varchar(50),
	spho_primary int,
	spho_url varchar(255),
	spho_stock_id int,
	
	CONSTRAINT spho_id_pk primary key (spho_id),
	CONSTRAINT spho_stock_id_fk foreign key (spho_stock_id) references purchasing.stocks (stock_id) on delete cascade on update cascade
);

create table purchasing.vendor (
	vendor_id serial,
	vendor_name varchar(55),
	vendor_active int,
	vendor_priority int,
	vendor_register_date date,
	vendor_weburl varchar(1024),
	vendor_modified_date timestamp,
	
	CONSTRAINT vendor_id_pk primary key (vendor_id)
);

create table purchasing.vendor_product (
	vepro_id serial,
	vepro_qty_stocked int,
	vepro_qty_remaining int,
	vepro_price money,
	vepro_stock_id int,
	vepro_vendor_id int,
	
	CONSTRAINT vepro_id_pk primary key (vepro_id),
	CONSTRAINT vepro_stock_id_fk foreign key (vepro_stock_id) references purchasing.stocks (stock_id) on delete cascade on update cascade,
	CONSTRAINT vepro_vendor_id_fk foreign key (vepro_vendor_id) references purchasing.vendor(vendor_id) on delete cascade on update cascade
);

create table purchasing.purchase_order_header (
	pohe_id serial,
	pohe_number varchar(20) unique,
	pohe_status int,
	pohe_order_date timestamp,
	pohe_subtotal money,
	pohe_tax money,
	pohe_total_amount money,
	pohe_refund money,
	pohe_arrival_date timestamp,
	pohe_pay_type varchar(2),
	pohe_emp_id int,
	pohe_vendor_id int,
	
	CONSTRAINT pohe_id_pk primary key (pohe_id),
 	CONSTRAINT pohe_emp_id_fk foreign key (pohe_emp_id) references HR.employee(emp_id) on delete cascade on update cascade,
	CONSTRAINT pohe_vendor_id_fk foreign key (pohe_vendor_id) references purchasing.vendor(vendor_id) on delete cascade on update cascade
);

create table purchasing.stock_detail (
	stod_stock_id int,
	stod_id serial,
	stod_barcode_number varchar(255) unique,
	stod_status varchar(2),
	stod_notes varchar(1024),
	stod_faci_id int,
	stod_pohe_id int,
	
	CONSTRAINT stock_detail_id_pk primary key (stod_stock_id, stod_id),
	CONSTRAINT stod_stock_id_fk foreign key (stod_stock_id) references purchasing.stocks (stock_id) on delete cascade on update cascade,
 	CONSTRAINT stod_faci_id_fk foreign key (stod_faci_id) references hotel.facilities(faci_id) on delete cascade on update cascade,
	CONSTRAINT stod_pohe_id_fk foreign key (stod_pohe_id) references purchasing.purchase_order_header(pohe_id) on delete cascade on update cascade
);

create table purchasing.purchase_order_detail (
	pode_pohe_id int,
	pode_id serial,
	pode_order_qty smallint,
	pode_price money,
	pode_line_total money,
	pode_received_qty decimal(8,2),
	pode_rejected_qty decimal(8,2),
	pode_stocked_qty decimal(9,2),
	pode_modified_date timestamp,
	pode_stock_id int,
	
	CONSTRAINT purchase_order_detail_id_pk primary key (pode_pohe_id, pode_id),
	CONSTRAINT pode_pohe_id_fk foreign key (pode_pohe_id) references purchasing.purchase_order_header(pohe_id) on delete cascade on update cascade,
	CONSTRAINT pode_stock_id_fk foreign key (pode_stock_id) references purchasing.stocks(stock_id) on delete cascade on update cascade
);
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
