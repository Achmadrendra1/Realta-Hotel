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
	uspa_passwordhash VARCHAR(128)
	
) AS $$
DECLARE
BEGIN
	RETURN QUERY SELECT 
		u.user_id, 
		u.user_full_name, 
		r.role_name, 
		u.user_type, 
		u.user_company_name,
		up.uspro_job_title,
		u.user_email, 
		u.user_phone_number,
		ui.uspa_passwordhash
	FROM users.roles r 
	JOIN users.user_roles ur ON r.role_id = ur.usro_role_id
	JOIN users.users u ON ur.usro_user_id = u.user_id
	JOIN users.user_profiles up ON u.user_id = up.uspro_user_id
	JOIN users.user_password ui ON ui.uspa_user_id = u.user_id
	WHERE u.user_email = userEmail;
END; $$
LANGUAGE plpgsql;