SELECT setval('payment."entitys_entity_id_seq"', (SELECT MAX(entity_id) FROM payment.entitys));
SELECT setval('payment."payment_transaction_patr_id_seq"', (SELECT MAX(patr_id) FROM payment.payment_transaction));
INSERT INTO payment.user_accounts(
	usac_entity_id, usac_user_id, usac_account_number, usac_saldo, usac_type, usac_expmonth, usac_expyear, usac_secure_code, usac_modified_date)
	VALUES (16, 44, 13198989898, 0, 'Payment', 0, 0, '$2a$12$YNYmILJ0IJzttR75PUlTjuWTVj2Cgk/dGEyzs4YPOQBLkvc1vJmGO', now());


------Function Get New Entity Id------
CREATE OR REPLACE FUNCTION payment.getEntityId()
RETURNS int
AS $$

BEGIN
	RETURN (
		SELECT setval('payment."entitys_entity_id_seq"',
					  (SELECT COALESCE(MAX(entity_id), 0) FROM payment.entitys) + 1
		)
	);

END; $$
LANGUAGE plpgsql;
----------------------------------------------

------Store Procedure Insert Bank------
CREATE OR REPLACE PROCEDURE payment.InsertBank(
	Code	text,
	Name	text
)
AS $$

DECLARE
	ID int;
	
BEGIN
	ID := payment.getEntityId();
	INSERT INTO payment.entitys(entity_id)
		VALUES (ID);
	INSERT INTO payment.bank(bank_entity_id, bank_code, bank_name, bank_modified_date)
		VALUES (ID, Code, Name, Now());

END; $$
LANGUAGE plpgsql;
----------------------------------------------

------Store Procedure Insert Payment Gateway------
CREATE OR REPLACE PROCEDURE payment.InsertPaga(
	Code	text,
	Name	text
)
AS $$

DECLARE
	ID int;
	
BEGIN
	ID := payment.getEntityId();
	INSERT INTO payment.entitys(entity_id)
		VALUES (ID);
	INSERT INTO payment.payment_gateway(paga_entity_id, paga_code, paga_name, paga_modified_date)
		VALUES (ID, Code, Name, Now());

END; $$
LANGUAGE plpgsql;
----------------------------------------------

------------INSERT ONE PAYMENT TRX---------------

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
----------------------------------------------------------------------


--------Store Procedur Insert Payment Transaction------
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
END; $$ 
LANGUAGE plpgsql;


------------------------VIEW PAY METHODS------------------------------
CREATE VIEW payment.user_payment_methods
AS (
	SELECT
		acc.usac_user_id 	"userId",
		u.user_full_name 	"fullName",
		acc.usac_type		"paymentType",
		(
			CASE
				WHEN acc.usac_type != 'Payment'
				THEN b.bank_name
			ELSE
				dr.paga_name
			END
		) AS "paymentName",
		acc.usac_account_number		"accountNumber",
		acc.usac_saldo				"balance",
		acc.usac_expmonth			"expMonth",
		acc.usac_expyear			"expYear",
		acc.usac_secure_code		"securedKey"
	FROM payment.user_accounts acc
	LEFT JOIN payment.payment_gateway dr on acc.usac_entity_id = dr.paga_entity_id
	LEFT JOIN payment.bank b on acc.usac_entity_id = b.bank_entity_id
	LEFT JOIN users.users u on acc.usac_user_id = u.user_id
)

--------------------VIEW HISTORY----------------------------------------
CREATE OR REPLACE VIEW payment.user_transactions AS (
	SELECT 
		p.patr_id 				"transactionId",
		p.patr_trx_id 		"transactionNumber",
		TO_CHAR(patr_modified_date, 'DD Mon YYYY') "trxDate",
		TO_CHAR(patr_modified_date, 'HH12:MI AM') "trxTime",
		(
			CASE
				WHEN p.patr_type = 'ORM'
				THEN (
					SELECT orme_is_paid
					FROM resto.order_menus
					WHERE orme_order_number = p.patr_order_number
				)
				WHEN p.patr_type = 'BO'
				THEN (
					SELECT boor_is_paid
					FROM booking.booking_orders
					WHERE boor_order_number = p.patr_order_number
				)
				ELSE 'Completed'
			END
		) AS "status",
		(
			CASE
				WHEN p.patr_type = 'ORM'
				THEN (
					SELECT orme_pay_type
					FROM resto.order_menus
					WHERE orme_order_number = p.patr_order_number
				)
				WHEN p.patr_type = 'BO'
				THEN (
					SELECT boor_is_paid
					FROM booking.booking_orders
					WHERE boor_order_number = p.patr_order_number
				)
			END
		) AS "payType"
		p.patr_debet			"debit",
		p.patr_credit			"credit",	
		p.patr_type				"transactionType",
		p.patr_note				"transactionNote",
		p.patr_order_number		"orderNumber",
		p.patr_source_id		"sourceNumber",
		p.patr_target_id		"targetNumber",
		(
			-- TODO: Tambahin buat outside Top Up & Orders
			CASE
				WHEN p.patr_type = 'TP'
				THEN (
					SELECT "paymentName" 
					FROM payment.user_payment_methods
					WHERE "accountNumber" = p.patr_target_id::text
					)
				ELSE 'Realta Group'
			END
		) "targetPaymentName",
		(
			SELECT "paymentName" 
					FROM payment.user_payment_methods
					WHERE "accountNumber" = p.patr_source_id::text
		) "sourcePaymentName",
		p.patr_trx_number_ref	"transactionRef",
		p.patr_user_id			"userId",
		u.user_full_name		"userFullName"
	FROM payment.payment_transaction p
	JOIN users.users u ON u.user_id = p.patr_user_id
	order by "trxTime" desc
)

-------------------------------------------------------------------------------------------



-- CREATE OR REPLACE VIEW payments_order as 
-- (SELECT ptr.patr_trx_id, ptr.patr_order_number, boor.boor_total_amount, 
-- ptr.patr_trx_number_ref, ptr.patr_modified_date::date, u.user_full_name
-- FROM payment.payment_transaction ptr 
-- JOIN booking.booking_orders boor ON boor.boor_order_number = ptr.patr_order_number
-- JOIN users.users u ON u.user_id = ptr.patr_user_id
-- WHERE boor.boor_is_paid = 'P' AND boor.boor_pay_type != 'C'
-- UNION
-- --RESTO--
-- SELECT ptr.patr_trx_id, ptr.patr_order_number, rest.orme_total_amount, 
-- ptr.patr_trx_number_ref, ptr.patr_modified_date::date, u.user_full_name
-- FROM payment.payment_transaction ptr 
-- JOIN resto.order_menus rest ON rest.orme_order_number = ptr.patr_order_number
-- JOIN users.users u ON u.user_id = ptr.patr_user_id
-- WHERE rest.orme_is_paid = 'P' AND rest.orme_pay_type != 'C')

-- select
-- (select sum(orme_total_amount) from resto.order_menus where orme_is_paid = 'P') as total_resto,
-- (select sum(boor.boor_total_amount) from booking.booking_orders boor where boor_is_paid = 'P') as total_booking


-- ------Function Get History Transaction------
-- CREATE OR REPLACE FUNCTION payment.getTransactionList()
-- RETURNS table(
-- 	patr_id integer,
-- 	patr_trx_id varchar(55),
-- 	patr_order_number varchar(55),
-- 	total_amount money,
-- 	patr_trx_number_ref varchar(55),
-- 	user_full_name varchar(55)
-- )
-- AS $$
-- BEGIN
-- 	RETURN QUERY

-- --Booking--
-- SELECT ptr.patr_id, ptr.patr_trx_id, ptr.patr_order_number, boor.boor_total_amount, ptr.patr_trx_number_ref, u.user_full_name
-- FROM payment.payment_transaction ptr 
-- JOIN booking.booking_orders boor ON boor.boor_order_number = ptr.patr_order_number
-- JOIN users.users u ON u.user_id = ptr.patr_user_id
-- UNION
-- --RESTO--
-- SELECT ptr.patr_id, ptr.patr_trx_id, ptr.patr_order_number, rest.orme_total_amount, ptr.patr_trx_number_ref, u.user_full_name
-- FROM payment.payment_transaction ptr 
-- JOIN resto.order_menus rest ON rest.orme_order_number = ptr.patr_order_number
-- JOIN users.users u ON u.user_id = ptr.patr_user_id;
-- END;$$
-- LANGUAGE plpgsql;
-- ----------------------------------------------