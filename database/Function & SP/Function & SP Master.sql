-- SET VAL

SELECT setval('master."regions_region_code_seq"', (SELECT MAX(region_code) FROM master.regions));

SELECT setval('master."country_country_id_seq"', (SELECT MAX(country_id) FROM master.country));

SELECT setval('master."proviences_prov_id_seq"', (SELECT MAX(prov_id) FROM master.proviences));

SELECT setval('master."address_addr_id_seq"', (SELECT MAX(addr_id) FROM master.address));

SELECT setval('master."policy_poli_id_seq"', (SELECT MAX(poli_id) FROM master.policy));

SELECT setval('master."category_group_cagro_id_seq"', (SELECT MAX(cagro_id) FROM master.category_group));

SELECT setval('master."service_task_seta_id_seq"', (SELECT MAX(seta_id) FROM master.service_task));

-- ALL 

CREATE OR REPLACE FUNCTION master.getCagroId()
RETURNS int
AS $$

BEGIN
	RETURN (
		SELECT setval('master."category_group_cagro_id_seq"',
					  (SELECT COALESCE(MAX(cagro_id), 0) FROM master.category_group) + 1
		)
	);

END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION master.locationsAll()
RETURNS TABLE(
	region_code integer,
	region_name varchar(35),
	country_id integer,
	country_name varchar(55),
	country_region_id integer,
	prov_id integer,
	prov_name varchar(55),
	prov_country_id integer,
	addr_id integer,
	addr_line2 varchar(55),
	addr_line1 varchar(55),
	addr_prov_id integer
	
)
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
$$ LANGUAGE plpgsql;
-- select * from master.locationsAll()

-- select *from master.address

-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CREATE OR REPLACE FUNCTION master.locationsRC()
RETURNS TABLE(
	region_code integer,
	region_name varchar(35),
	country_id integer,
	country_name varchar(55),
	country_region_id integer
	

)
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
$$ LANGUAGE plpgsql;

-- select *from master.locationsRC()

-- select * from master.regions


-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CREATE OR REPLACE FUNCTION master.locationsRCP()
RETURNS TABLE(
	region_code integer,
	region_name varchar(35),
	country_id integer,
	country_name varchar(55),
	country_region_id integer,
	
	prov_id integer,
	prov_name varchar(55),
	prov_country_id integer

)
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
$$ LANGUAGE plpgsql;

-- select *from master.locationsRCP()
-- select *from master.proviences

-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CREATE OR REPLACE FUNCTION master.locationsfunctionsRCPA()
RETURNS TABLE(
	region_code integer,
	region_name varchar(35),
	country_id integer,
	country_name varchar(55),
	prov_id integer,
	prov_name varchar(55),
	addr_id integer,
	addr_line2 varchar(55)
)
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
$$ LANGUAGE plpgsql;

-- select *from master.locationsRCPA()

-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CREATE OR REPLACE FUNCTION master.getPoCa()
RETURNS TABLE(
poca_poli_id integer,
poli_id integer,
poli_name varchar(55),
poli_description varchar(255),
poca_cagro_id integer,
cagro_id integer,
cagro_name varchar(25),
cagro_description varchar(255),
cagro_type varchar(25),
cagro_icon varchar(255),
cagro_icon_url varchar(255),
poca_id integer
)
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
$$ LANGUAGE plpgsql;

-- select * from master.getPoCa() order by poca_poli_id
