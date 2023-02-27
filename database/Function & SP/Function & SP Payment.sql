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