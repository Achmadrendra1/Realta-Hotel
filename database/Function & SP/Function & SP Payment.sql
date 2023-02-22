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

------Function Get History Transaction------
CREATE OR REPLACE FUNCTION payment.getTransactionList()
RETURNS table(
	patr_id integer,
	patr_trx_id varchar(55),
	patr_order_number varchar(55),
	total_amount money,
	patr_trx_number_ref varchar(55),
	user_full_name varchar(55)
)
AS $$
BEGIN
	RETURN QUERY

--Booking--
SELECT ptr.patr_id, ptr.patr_trx_id, ptr.patr_order_number, boor.boor_total_amount, ptr.patr_trx_number_ref, u.user_full_name
FROM payment.payment_transaction ptr 
JOIN booking.booking_orders boor ON boor.boor_order_number = ptr.patr_order_number
JOIN users.users u ON u.user_id = ptr.patr_user_id
UNION
--RESTO--
SELECT ptr.patr_id, ptr.patr_trx_id, ptr.patr_order_number, rest.orme_total_amount, ptr.patr_trx_number_ref, u.user_full_name
FROM payment.payment_transaction ptr 
JOIN resto.order_menus rest ON rest.orme_order_number = ptr.patr_order_number
JOIN users.users u ON u.user_id = ptr.patr_user_id;
END;$$
LANGUAGE plpgsql;
----------------------------------------------

--------Store Procedur Insert Payment Transaction------
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
----------------------------------------------------------------------