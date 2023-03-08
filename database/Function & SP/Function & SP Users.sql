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

-- Register Users
CREATE EXTENSION pgcrypto;
-- CREATE EXTENSION IF NOT EXISTS "bcrypt";

CREATE OR REPLACE PROCEDURE users.Register(
   IN UserFullName VARCHAR(55),
   IN UserEmail VARCHAR,
   IN UserPhoneNumber VARCHAR(25),
   IN UserPassword VARCHAR
	
)
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


-- New Role 
INSERT INTO users.roles(
	role_id, role_name)
	VALUES (6, 'Finance');

-- User finance & admin
INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '44','Finance','C', 'Hotel Realta', 'Finance@gmail.com', '08228882828','2023-01-19' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '55','Admin','C', 'Hotel Realta', 'Admin@gmail.com', '08228929292','2023-01-20' );

-- New User Roles
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (44,6);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (55,4);

--New User Password
INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (44, '$2a$12$gjaHnpIPGhQHokozo0urWOViHx9nkUjj1nJH6T.tTYGanEtkcSz7S', 'P@ssword14');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (55, '$2a$12$y90LlOedo9hZqVYsQI0YeeEIV3w7cyo4/6T3tpQaqS.4uVTPYud56', 'P@ssword66');