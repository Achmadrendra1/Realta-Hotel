-- ALL 

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
