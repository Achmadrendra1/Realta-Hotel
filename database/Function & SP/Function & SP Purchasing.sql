-- Function Stock Detail
-- Menampilkan Data Stock Detail dengan PO Number(Purchase Order Header) dan Used In (Hotel Facilities)

CREATE OR REPLACE FUNCTION purchasing.getALLStod()
	RETURNS TABLE (
		stockdet_id int,
		stockdet_name varchar(255),
		stockdet_number varchar(255),
		stockdet_status varchar(2),
		stockdet_notes varchar(255),
		stockdet_facilities varchar(255),
		stockdet_pohe_number varchar(255)
	)
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
END;$$

LANGUAGE 'plpgsql';



-- Function Vendor Product
-- Menampilkan Data Vendor Product dengan Stock Name

CREATE OR REPLACE FUNCTION purchasing.getALLVendorStock()
	RETURNS TABLE (
		vestock_id int,
		vestock_vendor_id int,
		vestock_name varchar(255),
		vestock_qty_stocked int, 
		vestock_qty_remaining int, 
		vestock_price money
	)
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
END;$$

LANGUAGE 'plpgsql';



-- Function Purchase Order Header
-- Menampilkan Data Purchase Order Header dengan nama Vendor

CREATE OR REPLACE FUNCTION purchasing.getALLPoheVendor()
	RETURNS TABLE (
		pove_id int,		
		pove_number varchar(20), 
		pove_date timestamp, 
		pove_name varchar(255),
		pove_status int,
		pove_subtotal money,
		pove_total_amount money
	)
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
END;$$

LANGUAGE 'plpgsql';



-- Function Purchase Order Detail
-- Menampilkan data Purchase Order Detail dengan Nama Stock

CREATE OR REPLACE FUNCTION purchasing.getALLPode()
	RETURNS TABLE (
		podhe_id int,
		podhe_pohe_number varchar(20),
		podhe_order_qty smallint,
		podhe_price money,
		podhe_line_total money,
		podhe_received_qty decimal(8,2),
		podhe_rejected_qty decimal(8,2),
		podhe_stocked_qty decimal(8,2),
		podhe_stock_name varchar(255)
	)
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
END;$$

LANGUAGE 'plpgsql';