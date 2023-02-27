--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--MASTER
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- //Master Region  1
INSERT INTO master.regions (region_code, region_name) VALUES
(1, 'Asia'),
(2, 'Amerika Utara'),
(3, 'Amerika Selatan'),
(4, 'Afrika'),
(5, 'Eropa'),
(6, 'Australia'),
(7, 'Antartika');

-- Master Country 2
INSERT INTO master.country (country_id, country_name, country_region_id)
VALUES 
(1,'Indonesia', 1),
(2,'Singapore', 1),
(3,'Russia', 5),
(4,'Phillippines', 1),
(5,'China', 1),
(6,'Qatar', 1),
(7,'Palestine', 1),
(8,'Saudi Arabia', 1),
(9,'Oman', 1),
(10,'Japan', 1),
(11,'Malaysia', 1),
(12,'South Korea', 1),
(13, 'Vietnam', 1),
(14, 'Thailand', 1),
(15, 'Yemen', 1),
(16, 'Afghanistan', 1),
(17, 'Bangladesh', 1),
(18, 'Brunei', 1),
(19, 'Khazkhstan', 1),
(20, 'Laos', 1);

-- //Master Provinsi 3
INSERT INTO master.proviences (prov_id, prov_name, prov_country_id)
VALUES 
(1, 'Jawa Barat', 1),
(2, 'Jawa Timur', 1),
(3, 'Jawa Tengah', 1),
(4, 'DKI Jakarta', 1),
(5, 'DIY Yogyakarta', 1),
(6, 'Sumatera Barat', 1),
(7, 'Sumatera Utara', 1),
(8, 'Sumatera Selatan', 1),
(9, 'Kalimantan Barat', 1),
(10, 'Kalimantan Timur', 1),
(11, 'Kalimantan Utara', 1),
(12, 'Kalimantan Tengah', 1),
(13, 'Kalimantan Selatan', 1),
(14, 'Lampung', 1),
(15, 'Aceh', 1),
(16, 'Bali', 1),
(17, 'Banten', 1),
(18, 'Jambi', 1),
(19, 'Maluku', 1),
(20, 'Papua', 1);
        
-- //Master address 4
INSERT INTO master.address (addr_id, addr_line1, addr_line2, addr_postal_code, addr_spatial_location, addr_prov_id)
VALUES (1, 'Jl. Taman Safari No. 101 kec.Cisarua', 'Bogor', '16750', '{"lat": -6.597147, "lng": 106.806038}', 1),
(2, 'Jl. Raya Puncak - Gadog No.54 Kec. Cipanas', 'Cianjur', '43253', '{"lat": -7.357977, "lng": 107.195717}', 1),
(3, 'Jl. Bulevar Ahmad Yani, RT.006/RW.002, Marga Mulya, Kec. Bekasi Utara', 'Bekasi', '17142', '{"lat": -6.238270, "lng": 106.975571}', 1),
(4, 'Jl. M.H. Thamrin No.1, RT.1/RW.5, Menteng, Kec. Menteng', 'Jakarta', '10310', '{"lat": -6.175110, "lng": 106.865036}', 4),
(5, 'Jl. Gatot Subroto No.18, Kuningan Bar., Kec. Mampang Prpt', 'Depok', '12710', '{"lat": -6.175110, "lng": 106.865036}', 4),
(6, 'Jl. Prof. DR. Satrio No.Kav 3 – 5, Karet Kuningan, Kecamatan Setiabudi', 'Tanggerang', '12940', '{"lat": -6.175110, "lng": 106.865036}', 4),
(7, 'Komplek Opi Mall, Jl. Gubernur H. A Bastari, Sungai Kedukan, Kec. Rambutan', 'Palembang', '30137', '{"lat": -2.976074, "lng": 104.775429}', 8),
(8, 'Jl. Demang Lebar Daun No.58B, Demang Lebar Daun, Kec. Ilir Bar. I', 'Padang', '30967', '{"lat": -2.976074, "lng": 104.775429}', 8),
(9, 'Jl. R. Sukamto No.20, 20 Ilir D II, Kec. Kemuning', 'Brebes', '30114', '{"lat": -2.976074, "lng": 104.775429}', 8),
(10, 'Jl. Veteran No.167, Kepandean Baru, Kec. Ilir Tim. I', 'Cirebon', '30126', '{"lat": -2.976074, "lng": 104.775429}', 8);

--Update Type Fasilitas to Facility
-- //INSERT INTO master.category_group 5 
INSERT INTO master.category_group (cagro_id, cagro_name, cagro_description, cagro_type, cagro_icon, cagro_icon_url) 
VALUES 
(1, 'Room', 'Category for room type', 'Facility', 'room.png', 'https://Realta-Hotels.com/room.png'),
(2, 'Restaurant', 'Category for restaurant service', 'Service', 'restaurant.png', 'https://Realta-Hotels.com/restaurant.png'),
(3, 'Meeting Room', 'Category for meeting room service', 'Service', 'meeting.png', 'https://Realta-Hotels.com/meeting.png'),
(4, 'Gym', 'Category for gym service', 'Facility', 'gym.png', 'https://Realta-Hotels.com/gym.png'),
(5, 'Hall', 'Category for hall service', 'Facility', 'hall.png', 'https://Realta-Hotels.com/hall.png'),
(6, 'Swimming Pool', 'Category for swimming pool service', 'Facility', 'pool.png', 'https://Realta-Hotels.com/pool.png'),
(7, 'Ballroom', 'Category for ballroom service', 'Facility', 'ballroom.png', 'https://Realta-Hotels.com/ballroom.png');
-- (8, 'Layanan Kecantikan', 'Kategori untuk layanan kecantikan', 'Layanan', 'beauty.png', 'https://example.com/beauty.png'),
-- (9, 'Layanan Transportasi', 'Kategori untuk layanan transportasi', 'Layanan', 'transportation.png', 'https://example.com/transportation.png'),
-- (10, 'Layanan Cuci Kering', 'Kategori untuk layanan cuci kering', 'Layanan', 'laundry.png', 'https://example.com/laundry.png'),
-- (11, 'Layanan Penitipan Barang', 'Kategori untuk layanan penitipan barang', 'Layanan', 'luggage.png', 'https://example.com/luggage.png'),
-- (12, 'Layanan Wi-Fi', 'Kategori untuk layanan Wi-Fi', 'Layanan', 'wifi.png', 'https://example.com/wifi.png'),
-- (13, 'Layanan Kemudahan Tamu', 'Kategori untuk layanan kemudahan tamu', 'Layanan', 'amenities.png', 'https://example.com/amenities.png'),
-- (14, 'Layanan Rekreasi', 'Kategori untuk layanan rekreasi', 'Layanan', 'recreation.png', 'https://example.com/recreation.png'),
-- (15, 'Layanan Resepsionis', 'Kategori untuk layanan resepsionis', 'Layanan', 'reception.png', 'https://example.com/reception.png'),
-- (16, 'Layanan Kenyamanan', 'Kategori untuk layanan kenyamanan', 'Layanan', 'comfort.png', 'https://example.com/comfort.png'),
-- (17, 'Layanan Keamanan', 'Kategori untuk layanan keamanan', 'Layanan', 'security.png', 'https://example.com/security.png'),
-- (18, 'Layanan Parkir', 'Kategori untuk layanan parkir'', 'Layanan', 'parking.png', 'https://example.com/parking.png'),
-- (19, 'Layanan Bagasi', 'Kategori untuk layanan bagasi', 'Layanan', 'luggage2.png', 'https://example.com/luggage2.png'),
-- (20, 'Layanan Reservasi', 'Kategori untuk layanan reservasi', 'Layanan', 'reservation.png', 'https://example.com/reservation.png');

-- //Master Policy 6
INSERT INTO master.policy (poli_id,poli_name, poli_description)
VALUES
(1,'Check-in Time', 'Check-in time is 3:00 PM'),
(2,'Check-out Time', 'Check-out time is 11:00 AM'),
(3,'Smoking Policy', 'This is a smoke-free hotel'),
(4,'Pet Policy', 'Pets are not allowed in the hotel area'),
(5,'Cancellation Policy', 'Cancellations must be made 48 hours prior to arrival'),
(6,'Additional Guest Policy', 'Additional fees will be charged for guests over 2 people'),
(7,'Parking Policy', 'Free parking is available for all guests'),
(8,'Breakfast Policy', 'Breakfast is included in the room rate'),
(9,'Swimming Pool Policy', 'Swimming pool operating hours are from 7:00 AM to 10:00 PM'),
(10,'Gym Policy', 'Gym operating hours are from 6:00 AM to 10:00 PM'),
(11,'Laundry Policy', 'Laundry service is available at an additional charge'),
(12,'Mini Bar Policy', 'Mini bar items are available for purchase'),
(13,'Internet Policy', 'Free internet access is available for all guests'),
(14,'Restaurant Policy', 'The restaurant is open from 6:00 AM to 10:00 PM'),
(15,'Bar Policy', 'The bar is open from 4:00 PM to 12:00 AM'),
(16,'Room Service Policy', 'Room service is available 24 hours a day'),
(17,'Child Policy', 'Children under 12 stay for free with adults'),
(18,'Credit Card Policy', 'We accept major credit cards'),
(19,'Group Policy', 'Special rates are available for groups'),
(20,'Non-Refundable Policy', 'Some room types are non-refundable.');

-- Poli CategoryGorup 7
INSERT INTO master.policy_category_group (poca_poli_id, poca_cagro_id)
VALUES 
(1, 1),
(2, 1),
(3, 5),
(4, 5),
(5, 1),
(6, 3),
(7, 5),
(8, 2),
(9, 6),
(10,4),
(11, 5),
(12, 2),
(13, 5),
(14, 2),
(15, 2),
(16, 1),
(17, 1),
(18, 1),
(19, 3),
(20, 1);



-- //Master preice 8
INSERT INTO master.price_items (prit_id,prit_name, prit_price, prit_description, prit_type, prit_modified_date) 
VALUES 
(1,'Chicken Satay', 15000, 'Chicken satay with a distinctive seasoning', 'FOOD', NOW()),
(2,'Fried Rice', 20000, 'Fried rice with egg and crackers', 'FOOD', NOW()),
(3,'Hot Tea', 5000, 'Hot tea with lemon flavor', 'SOFTDRINK', NOW()),
(4,'Fresh Orange Juice', 6000, 'Fresh orange juice', 'SOFTDRINK', NOW()),
(5,'Refreshing Drink', 8000, 'Refreshing drink with various flavors', 'SOFTDRINK', NOW()),
(6,'Coffee', 9000, 'Black coffee with a unique flavor', 'SOFTDRINK', NOW()),
(7,'Fruit Soup', 10000, 'Fruit soup with various types of fruit', 'FOOD', NOW()),
(8,'Margherita Pizza', 35000, 'Margherita Pizza with tomato sauce and cheese', 'FOOD', NOW()),
(9,'Burger', 30000, 'Burger with beef and a special sauce', 'FOOD', NOW()),
(10,'Snack Box', 20000, 'Snack Box with various kinds of light food', 'SNACK', NOW()),
(11,'Bottled Softdrink', 8000, 'Bottled softdrink with various flavors', 'SOFTDRINK', NOW()),
(12,'Extra Bed', 200000, 'Extra bed to increase sleeping capacity', 'FACILITY', NOW()),
(13,'Laundry Service', 50000, 'Laundry service for guest clothing', 'SERVICE', NOW()),
(14,'Room Service', 150000, 'Room service that provides food and drinks to guest rooms', 'SERVICE', NOW()),
(15,'Wi-Fi Service', 100000, 'Free Wi-Fi service throughout the hotel', 'SERVICE', NOW()),
(16,'Fitness Center', 100000, 'Fitness center facilities for guests', 'FACILITY', NOW()),
(17,'Swimming Pool', 150000, 'Swimming pool facilities for guests', 'FACILITY', NOW()),
(18,'Snack', 15000, 'Snacks like potato chips', 'SNACK',NOW()),
(19,'Steak', 90000, 'Choice beef steak', 'FOOD',NOW()),
(20,'Cake', 30000, 'Various delicious cakes', 'SNACK', NOW());

-- Master service task 9
INSERT INTO master.service_task (seta_id,seta_name, set_seq) 
VALUES 
(1,'Cleaning the room', 1),
(2,'Providing breakfast', 2),
(3,'Providing lunch', 3),
(4,'Providing dinner', 4),
(5,'Providing drinks', 5),
(6,'Providing towels', 6),
(7,'Providing linens', 7),
(8,'Providing swimming pool facilities', 8),
(9,'Providing spa facilities', 9),
(10,'Providing gym facilities', 10),
(11,'Providing laundry service', 11),
(12,'Providing room service', 12),
(13,'Providing wifi service', 13),
(14,'Providing transportation service', 14),
(15,'Providing concierge service', 15),
(16,'Providing receptionist service', 16),
(17,'Providing security service', 17),
(18,'Providing housekeeping service', 18),
(19,'Providing parking service', 19),
(20,'Providing tour service', 20);


-- Master member 10
INSERT INTO master.members (memb_name, memb_description) 
VALUES
('Silver','Access to basic hotel facilities'),
('Gold','Access to basic and premium hotel facilities, including complimentary breakfast and room upgrades'),
('VIP','Access to all hotel facilities, including dedicated concierge service and exclusive discounts'),
('WIZARD','Priority access to all hotel facilities & services, incl. 24-hr concierge & room service');

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- INSERT TABLE USERS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '1','Achmad Rendra Artama','C', 'Mandiri', 'Rendra@gmail.com', '082287821698','2023-01-16' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '2','Aryasa Miftah Mubaraq Siagian','I', 'Indofood', 'Aryasa@gmail.com', '082287821622','2023-01-10' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '3','Emil Setiawan','C', 'Sampoerna', 'Emil@gmail.com', '08228782161','2023-01-3' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '4','Mohammad Farid Nurichsan','T', 'MIND.ID', 'Farid@gmail.com', '082287821633','2023-01-19' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '5','Muhammad Ilmi Alimudin','I', 'Sampoerna', 'Ilmi@gmail.com', '082287821655','2023-01-18' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '6','Ramanda Syahputra','C', 'Indofood', 'Rasya@gmail.com', '082287821689','2023-01-15' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '7','Ricky Farela Givano','T', 'Gudang Garam', 'Ricky@gmail.com', '082287821697','2023-01-13' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '8','Soffie Anastya Putri','C', 'Mandiri', 'Soffie@gmail.com', '082287821665','2023-01-12' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '9','Yanti','I', 'Goverment', 'Yanti@gmail.com', '082287821650','2023-01-10' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '10','Bazna','C', 'Goverment', 'Bazna@gmail.com', '082287821634','2023-01-11' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '11','Yanto','I', 'Codeid', 'Yanto@gmail.com', '082287821676','2023-01-12' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '12','Agus','T', 'Mahaka-X', 'Agus@gmail.com', '082287821667','2023-01-13' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '13','Beno','C', 'Mahaka-A', 'Beno@gmail.com', '082287821654','2023-01-14' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '14','George','C', 'Mahaka-B', 'George@gmail.com', '082287821627','2023-01-15' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '15','Prayoga','I', 'Bukit Asam', 'Prayoga@gmail.com', '082287821632','2023-01-16' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '16','Dimas','C', 'Pertamina', 'Dimas@gmail.com', '082287821638','2023-01-17' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '17','Viola','T', 'Mandiri', 'Viola@gmail.com', '082287821641','2023-01-10' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '18','Yoga','I', 'PLN', 'Yoga@gmail.com', '082287821624','2023-01-18' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '19','Arya','T', 'Astra International', 'Arya@gmail.com', '082287821612','2023-01-19' );

INSERT INTO users.users(
	user_id, user_full_name, user_type, user_company_name, user_email, user_phone_number, user_modified_date)
	VALUES ( '20','Kiron','C', 'BBRI', 'Kiron@gmail.com', '082287821623','2023-01-20' );

-- INSERT TABLE ROLES
INSERT INTO users.roles(
	role_id, role_name)
	VALUES (1, 'Guest');

INSERT INTO users.roles(
	role_id, role_name)
	VALUES (2, 'Manager');

INSERT INTO users.roles(
	role_id, role_name)
	VALUES (3, 'OfficeBoy');

INSERT INTO users.roles(
	role_id, role_name)
	VALUES (4, 'Admin');

INSERT INTO users.roles(
	role_id, role_name)
	VALUES (5, 'User');

--INSERT USER ROLES
-- 1  = Guest, 2 = Manager, 3= OfficeBoy, 4 = Admin, 5 = User
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (1,2);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (2,3);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (3,1);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (4,3);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (5,5);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (6,5);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (7,4);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (8,3);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (9,3);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (10,2);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (11,4);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (12,3);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (13,1);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (14,1);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (15,5);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (16,5);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (17,1);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (18,5);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (19,5);
INSERT INTO users.user_roles(usro_user_id, usro_role_id) VALUES (20,5);

-- INSERT USER_BONUS_POINT

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (1, 1, 20, 'R', '2023-01-20');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (2, 2, 10, 'P', '2023-01-19');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (3, 4, 30, 'R', '2023-01-5');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (4, 3, 15, 'R', '2023-01-21');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (5, 5, 5, 'P', '2023-01-20');
    
INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (6, 6, 15, 'R', '2023-01-06');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (7, 8, 10, 'P', '2023-01-10');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (8, 9, 15, 'R', '2023-01-10');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (9, 7, 25, 'P', '2023-01-15');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (10, 11, 10, 'P', '2023-01-13');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (11, 10, 13, 'P', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (12, 12, 5, 'R', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (13, 14, 19, 'P', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (14, 13, 18, 'R', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (15, 17, 13, 'R', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (16, 15, 18, 'R', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (17, 16, 30, 'P', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (18, 18, 15, 'R', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (19,20, 13, 'R', '2023-01-11');

INSERT INTO users.user_bonus_points(
	ubpo_id, ubpo_user_id, ubpo_total_points, ubpo_bonus_type, ubpo_created_on)
	VALUES (20, 19, 23, 'R', '2023-01-23');


-- Tabel Password

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (1, '$2a$12$he3ZVL3Dg4y7QGlJIAbly.7HyurMK7ckXiJmm7kot8azsefstqJzu', 'P@ssword!');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (2, '$2a$12$5MhJEDqgSwqdiuxER.K9Luey3QdpeWTLHhiSc7VEfS00nyDunI5b6', 'P@ssword2');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (3, '$2a$12$Qg5eFXwhHXUcPZagqn8N.eaydiAeqNLMjcYSz6B6j32iF.1OGU9My', 'P@ssword3');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (4, '$2a$12$sqZwmSbtmHKCW2g0LGu3EuRoKeC8vYcBdX2lHSAUH3xW2VDLbihWK', 'P@ssword4');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (5, '$2a$12$Ifmsuv8nHswliqs2EGiEj.y9tj9lEUzKDDrPYiyVXYzeJk.w30Pn.', 'P@ssword5');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (6, '$2a$12$//U9bE6gVpebW3uhVSW2uurL/tPAtNJHUitc48Y9uGiJRpa6HShKe', 'P@ssword6');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (7, '$2a$12$uHWReHgO4Z0pnPjwzYx5zuTGa.mLXR87TiQt/U6BUYlFuWCiZskqq', 'P@ssword7');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (8, '$2a$08$kpMIfknvefiCmGlPocixd.EX0uZswePqUDtK8e/0ioqwYaiprv2R6', 'P@ssword8');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (9, '$2a$08$yF3zLt8RRi4fZ33nYL4Mw.lndciGV8RcXuSE2sRjyVxEpl/M3veSG', 'P@ssword9');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (10, '$2a$08$j5P74crOtmQhj79T8kLdruhF4v5.xapNYwqmqDBXBgyRtmCxRFe0q', 'P@ssword10');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (11, '$2a$08$Y/3t/c8UPnF/.xMBT8DrJOxr0NceB1/NW/P7Jg4Lxfz4yl0wRNNvG', 'P@ssword11');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (12, '$2a$08$ldAlvSBbgI/dLdVL1oBu/uqZC40Gdbe.z5o9vHGjaVO9prJBTMB0e', 'P@ssword12');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (13, '$2a$08$omjN43dLFNP.jArKNTATueOCsc3SvUByOSk71irfPPxqLmeG2dCOy', 'P@ssword13');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (14, '$2a$08$B7cRx5xfpsUT8yZnlWLzTeJRdYwUb0FeqvPouN8b77U2HOluTAbZ.', 'P@ssword14');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (15, '$2a$12$eSvXKHyakLiSO173K4HFJOLcb/IlwYthdVXMU5Zsca7pU8ck/r2ru', 'P@ssword15');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (16, '$2a$08$1Q8GReElYN6aeAi7E6L/J.s4de14MgIEHDB8g9Am3sDkIIK71xD1q', 'P@ssword16');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (17, '$2a$12$eSvXKHyakLiSO173K4HFJOLcb/IlwYthdVXMU5Zsca7pU8ck/r2ru', 'P@ssword17');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (18, '$2a$08$Z45Eq1WK5vaUEbOd5rZReenw9DMTV5XSFUpn3u9GJ2HurvneSgiaa', 'P@ssword18');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (19, '$2a$08$NAVvW8Vkp7UAsmeN9k5nw..eOhQnBY89tEZXdFIM3W3MmtxKs3Xli', 'P@ssword19');

INSERT INTO users.user_password(uspa_user_id, uspa_passwordhash, uspa_passwordsalt)
VALUES (20, '$2a$08$btIV4kdq.4xI0pkLZpbWheayTcFVo2bHX1CsC2DyTgxZi/rr0/aKq', 'P@ssword20');

-- USER_MEMBERS
INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (1,'Gold', '2023-01-13', 13, 'default');
	
INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (2,'WIZARD', '2023-01-14', 8, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (3,'Silver', '2023-01-15', 15, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (4,'VIP', '2023-01-16', 20, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (5,'Silver', '2023-01-17', 30, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (6,'WIZARD', '2023-01-18', 40, 'expired');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (7,'Gold', '2023-01-19', 50, 'expired');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (8,'Gold', '2023-01-20', 25, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (9,'WIZARD', '2023-01-21', 18, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (10,'Silver', '2023-01-22', 30, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (11, 'VIP', '2023-01-23', 35, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (12, 'Silver', '2023-01-24', 50, 'expired');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (13, 'Gold', '2023-01-25', 55, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (14, 'WIZARD', '2023-01-26', 60, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (15, 'Gold', '2023-01-27', 45, 'expired');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (16, 'Silver', '2023-01-28', 35, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (17, 'Silver', '2023-01-29', 40, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (18, 'Gold', '2023-01-30', 50, 'expired');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (19, 'VIP', '2023-01-31', 55, 'default');

INSERT INTO users.user_members(usme_user_id, usme_memb_name, usme_promote_date, usme_points, usme_type)
VALUES (20, 'WIZARD', '2023-02-01', 60, 'expired');


-- profile
INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (1, 'IDN', '1-12-2023', 'Head Manager', 'M', 'M', '1', '1');
	
INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (2, 'IDN', '1-12-2023', 'Assistant Manager', 'S', 'M', '2', '2');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (3, 'IDN', '1-12-2023', 'SPV', 'M', 'F', '3', '3');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (4, 'IDN', '1-12-2023', 'Employee', 'S', 'F', '4', '4');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (5, 'IDN', '1-12-2023', 'SPV', 'M', 'M', '5', '5');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (6, 'IDN', '1-12-2023', 'Employee', 'S', 'M', '6', '6');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (7, 'IDN', '1-12-2023', 'Operations Manager', 'M', 'F', '7', '7');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (8, 'IDN', '1-12-2023', 'Accounting Manager', 'S', 'F', '8', '8');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (9, 'IDN', '1-12-2023', 'Procurement Manager', 'M', 'M', '9', '9');

INSERT INTO users.user_profiles(uspro_id, uspro_national_id, uspro_birt_date, uspro_job_title, uspro_martial_status, uspro_gender, uspro_addr_id, uspro_user_id)
VALUES (10, 'IDN', '1-12-2023', 'Admin Manager', 'S', 'M', '10', '10');

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- INSERT HOTELS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        1,'Hotel Realta Bogor', 'A five-star hotel located in the heart of the city, with elegant rooms and suites, full spa services.', 5, '(875) 8996635', now(), 1);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        2,'Hotel Realta Cianjur', 'A boutique-style hotel located in a trendy neighborhood. Offers comfortable guest rooms', 4, '(608) 5033257', now(), 2);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        3,'Hotel Realta Bekasi', 'Outstanding resort by the sandy beach, surrounded by lush tropical gardens. Private beach, pool & water activities.', 4, '(224) 9780440', now(), 3);
INSERT INTO hotel.hotels 
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        4,'Hotel Realta Jakarta', 'Exceptional resort on sandy beach surrounded by lush green tropical gardens. Private beach, pool & water activities.', 5 , '(344) 9952640', now(), 4);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        5,'Hotel Realta Depok', 'Four-star hotel located in the Prapatan area. Offers comfortable rooms, free Wi-Fi, restaurant, and swimming pool.', 4 , '(190) 4746721', now(), 5);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        6,'Hotel Realta Tanggerang', 'Three-star beach hotel with breathtaking ocean views, clean guest rooms, a swimming pool, beach activities.', 3 , '(177) 9985789', now(), 6);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        7,'Hotel Realta Palembang', 'A five-star hotel with luxurious facilities and exclusive services, spacious guest rooms, a spa, fitness center.', 5 , '(377) 1046498', now(), 7);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        8,'Hotel Realta Padang','A three-star family-friendly hotel with spacious rooms, a kids play area, a safe swimming pool, and a restaurant.', 3 , '(465) 6137176', now(), 8);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        9,'Hotel Realta Brebes', 'A four-star hotel that is ideal for business travel, with comfortable guest rooms, free Wi-Fi', 4 , '(582) 3817514', now(), 9);
INSERT INTO hotel.hotels
    (hotel_id,
    hotel_name,hotel_description,hotel_rating_star,hotel_phonenumber,hotel_modified_date,hotel_addr_id)
VALUES(
        10,'Hotel Realta Cirebon', 'A three-star hotel with beautiful scenery, comfortable guest rooms, a swimming pool, restaurant.', 3 , '(512) 3214821', now(), 10);


-- INSERT HOTEL_REVIEW
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (1,'Very satisfied with the hotel service. Clean and comfortable rooms, friendly and helpful staff.', 5, CURRENT_DATE, 1, 1);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (2,'This hotel is located strategically close to tourist attractions. Spacious and clean rooms, good service', 5, CURRENT_DATE, 2, 2);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (3,'First impression not great, but staff and clean room improved stay', 3, CURRENT_DATE, 3, 3);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (4,'The experience of staying at this hotel is very enjoyable. Complete facilities and comfortable rooms', 4, CURRENT_DATE, 4, 4);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (5,'This hotel is suitable for business trips. Complete facilities and professional staff. ', 5, CURRENT_DATE, 5, 5);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (6,'Kamar hotel ini agak kecil namun bersih dan nyaman. Pelayanan cukup baik.', 3, CURRENT_DATE, 6, 6);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (7,'This hotel is very suitable for families. Spacious rooms, complete facilities, and safe environment', 4, CURRENT_DATE, 7, 7);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (8,'The experience of staying at this hotel is quite satisfying. Clean and comfortable rooms, friendly staff.', 4, CURRENT_DATE, 8, 8);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (9,'This hotel is highly recommended. Clean and comfortable rooms, complete facilities, and friendly staff', 5, CURRENT_DATE, 9, 9);
INSERT INTO hotel.hotel_reviews
    (hore_id,
    hore_user_review,hore_rating,hore_created_on, hore_user_id,hore_hotel_id)
VALUES
    (10,'Initial impression of hotel not positive, but clean & comfy rooms for a good stay experience.', 4, CURRENT_DATE, 10, 10);
-- INSERT FACILITIES
-- SELECT *
-- FROM hotel.facilities
-- SELECT CURRENT_DATE

--update measure bed to Beds
INSERT INTO hotel.facilities
    (faci_id,
        faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
  (1, 'Deluxe Room', 'The Deluxe Room is a spacious and comfortable room with modern amenities such as AC, TV, a work desk, and a private bathroom. Free internet access and a mini bar are available.', 2, 'Beds', '1-001', '2022-1-12', '2022-1-13', 450000, 950000, 650000, 0, 100000, '2022-1-12', 1, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
   (2, 'Indonesian Restaurant', 'The Indonesian Restaurant offers authentic dishes with high-quality ingredients. Experience the unique flavors of Indonesia in every dish.', 250, 'People', '2-001', '2022-1-12', '2022-3-12', 50000, 450000, 100000, 20000, 5000, '2022-1-12', 2, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
    (3, 'Savana Meeting Room', 'Spacious, modern, fully equipped, with AC, projector, sound system, and wifi. Ideal for meetings, seminars, and training.', 50, 'People', '3-001', '2022-2-10', '2022-2-10', 150000, 1500000, 200000, 0, 100000, '2022-2-10', 3, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
    (4, 'Raya Gym', 'Fully equipped, with AC, the latest training equipment, a cardio area, a weight area, and personal trainers available.', 25, 'People', '4-001', '2022-2-11', '2022-2-12', 100000, 250000, 150000, 0, 10000, '2022-2-11', 4, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
    (5, 'Pasifik Hall', 'Spacious, modern, with AC, sound system, projector, ideal for seminars, training, and conferences.', 150, 'People', '5-001', '2022-2-15', '2022-2-16', 1500000, 3500000, 1750000, 0, 150000, '2022-2-15', 5, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
    (6, 'Oceana Swimming Pool', 'Spacious, clean, with AC, breathtaking view, relaxation area, view of the surrounding area.', 30, 'People', '6-001', '2022-2-17', '2022-2-18', 100000, 200000, 150000, 0, 10000, '2022-2-17', 6, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
    (7, 'Gemilang Ballroom', 'Spacious, luxurious, with AC, sound system, projector, relaxation area, ideal for weddings, parties, and lavish events.', 200, 'People', '7-001', '2022-2-22', '2022-2-23', 5000000, 7000000, 6250000, 500000, 250000, '2022-2-22', 7, 1);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(8,'Deluxe Room', 'The Deluxe Room is a spacious and comfortable room with modern amenities such as AC, TV, a work desk, and a private bathroom.', 2, 'Beds', '1-002', '2022-1-12', '2022-1-13', 450000, 950000, 650000, 0, 100000, '2022-1-12', 1, 2);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(9,'Indonesian Restaurant', 'The Indonesian Restaurant offers authentic cuisine with high-quality ingredients. Experience the unique flavors of Indonesia in every dish.', 250, 'People', '2-002' , '2022-1-12', '2022-3-12', 50000, 450000, 100000, 20000, 5000, '2022-1-12', 2, 2);

INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
    (10,'Savana Meeting Room', 'Spacious, modern, fully equipped with AC, a projector, a sound system, and wifi. Ideal for meetings, seminars, and trainings.', 50, 'People', '3-002', '2022-2-10', '2022-2-10', 150000, 1500000, 200000, 0, 100000, '2022-2-10', 3, 2);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
   (11,'Raya Gym', 'Fully equipped with AC, state-of-the-art workout equipment, a cardio area, a weight area, and personal trainers available.', 25, 'People', '4-002', '2022-2-11', '2022=2-12', 100000, 250000, 150000, 0, 10000, '2022-2-11', 4, 2);

INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(12,'Pasifik Aula', 'Spacious, modern, with AC, sound system, and a projector. Ideal for seminars, trainings, and conferences.', 150, 'People', '5-002', '2022-2-15', '2022-2-16', 1500000, 3500000, 1750000, 0, 150000, '2022-2-15', 5, 2);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(13,'Oceana Swimming Pool', 'Spacious, clean, with AC, stunning views, relaxation area, and views of the surrounding area.', 30 , 'People', '6-002' , '2022-2-17', '2022-2-18', 100000 , 200000, 150000, 0, 10000, '2022-2-17', 6, 2);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(14,'Gemilang Ballroom', 'Spacious, luxurious, with AC, sound system, projector, relaxation area, and ideal for weddings, parties, and luxurious events.', 200, 'People', '7-002' , '2022-2-22', '2022-2-23', 5000000, 7000000, 6250000, 500000, 250000, '2022-2-22', 7, 2);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
   (15,'Deluxe Room', 'The Deluxe Room is a spacious and comfortable room with modern amenities such as air conditioning, TV, a work desk, and a private bathroom. ', 2, 'Beds', '1-003', '2022-1-12', '2022-1-13', 450000, 950000, 650000, 0, 100000, '2022-1-12', 1, 3);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
   (16,'Indonesian Restaurant', 'The Indonesian Restaurant offers authentic dishes made with high-quality ingredients. Experience the unique flavors of Indonesia in every dish.', 250, 'People', '2-003' , '2022-1-12', '2022-3-12', 50000, 450000, 100000, 20000, 5000, '2022-1-12', 2, 3);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(17,'Savana Meeting Room', 'Large, modern, fully equipped with air conditioning, projector, sound system, and wifi. Ideal for meetings, seminars, and training.', 50, 'People', '3-003', '2022-2-10', '2022-2-10', 150000, 1500000, 200000, 0, 100000, '2022-2-10', 3, 3);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
   (18,'Raya Gym', 'Fully equipped with air conditioning, latest exercise equipment, cardio area, weight area, and personal trainers available.', 25, 'People', '4-003', '2022-2-11', '2022=2-12', 100000, 250000, 150000, 0, 10000, '2022-2-11', 4, 3);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(19,'Pasifik Aula', 'Large, modern, air conditioned, with sound system, projector, ideal for seminars, training, conferences.', 150, 'People', '5-003', '2022-2-15', '2022-2-16', 1500000, 3500000, 1750000, 0, 150000, '2022-2-15', 5, 3);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(20,'Oceana Swimming Pool', 'Spacious, clean, air conditioned, with breathtaking views, relaxation area, and views of the surrounding area.', 30 , 'People', '6-003' , '2022-2-17', '2022-2-18', 100000 , 200000, 150000, 0, 10000, '2022-2-17', 6, 3);
INSERT INTO hotel.facilities
    (faci_id,faci_name,faci_description,faci_max_number,faci_measure_unit,faci_room_number,faci_startdate,faci_enddate,faci_low_price,faci_high_price,faci_rate_price,faci_discount,faci_tax_rate,faci_modified_date,faci_cagro_id,faci_hotel_id)
VALUES
(21,'Gemilang Ballroom', 'Large, luxurious, air conditioned, with sound system, projector, relaxation area, ideal for weddings, parties, and luxurious events.', 200, 'People', '7-003' , '2022-2-22', '2022-2-23', 5000000, 7000000, 6250000, 500000, 250000, '2022-2-22', 7, 3);

--update primary '1' to 1
-- INSERT FACILITY PHOTO
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (1, 'DeluxeRoom1.png', 'DeluxeRoom1.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (2, 'Restaurant1.png', 'Restaurant1.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (3, 'MeetingRoom1.png', 'MeetingRoom1.png', '1', NULL, now())
;INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (4, 'Gymnasium1.png', 'Gymnasium1.png', '0', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (5, 'AulaRoom1.png', 'AulaRoom1.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (6, 'SwimmingPool1.png', 'SwimmingPool1.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (7, 'Ballroom1.png', 'Ballroom1.png', '0', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (8, 'DeluxeRoom2.png', 'DeluxeRoom2.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (9, 'Restaurant2.png', 'Restaurant2.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (10, 'MeetingRoom2.png', 'MeetingRoom2.png', '0', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (11, 'Gymnasium2.png', 'Gymnasium2.png', '0', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (12, 'AulaRoom2.png', 'AulaRoom2.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (13, 'SwimmingPoo2.png', 'SwimmingPoo2.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (14, 'Ballroom2.png', 'Ballroom2.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (15, 'DeluxeRoom.png', 'DeluxeRoom.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (16, 'Restaurant3.png', 'Restaurant3.png', '0', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (17, 'Gymnasium4.png', 'Gymnasium4.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (18, 'AulaRoom3.png', 'AulaRoom3.png', '0', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (19, 'SwimmingPoo3.png', 'SwimmingPoo3.png', '1', NULL, now());
INSERT INTO hotel.facility_photo
    (fapho_faci_id,fapho_thumbnail_filename,fapho_photo_filename,fapho_primary,fapho_url,fapho_modified_date)
VALUES
    (20, 'Ballroom3.png', 'Ballroom3.png', '1', NULL, now());

-- INSERT FACILITY PRICE HISTORY 

INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (1, '2022-1-12', '2022-1-13', 450000, 950000, 650000, 0, 100000, '2022-1-12', 1);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (2, '2022-1-12', '2022-3-12', 50000, 450000, 100000, 20000, 5000, '2022-1-12', 2);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (3, '2022-2-10', '2022-2-10', 150000, 1500000, 200000, 0, 100000, '2022-2-10', 3);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (4, '2022-2-11', '2022=2-12', 100000, 250000, 150000, 0, 10000, '2022-2-11', 4);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (5, '2022-2-15', '2022-2-16', 1500000, 3500000, 1750000, 0, 150000, '2022-2-15', 5);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (6, '2022-2-17', '2022-2-18', 100000 , 200000, 150000, 0, 10000, '2022-2-17', 6);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (7, '2022-2-22', '2022-2-23', 5000000, 7000000, 6250000, 500000, 250000, '2022-2-22', 7);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (8, '2022-1-12', '2022-1-13', 450000, 950000, 650000, 0, 100000, '2022-1-12', 8);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (9, '2022-1-12', '2022-3-12', 50000, 450000, 100000, 20000, 5000, '2022-1-12', 9);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (10, '2022-2-10', '2022-2-10', 150000, 1500000, 200000, 0, 100000, '2022-2-10', 10);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (11, '2022-2-11', '2022=2-12', 100000, 250000, 150000, 0, 10000, '2022-2-11', 11);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (12, '2022-2-15', '2022-2-16', 1500000, 3500000, 1750000, 0, 150000, '2022-2-15', 12);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (13, '2022-2-17', '2022-2-18', 100000 , 200000, 150000, 0, 10000, '2022-2-17', 13);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (14, '2022-2-22', '2022-2-23', 5000000, 7000000, 6250000, 500000, 250000, '2022-2-22', 14);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (15, '2022-1-12', '2022-1-13', 450000, 950000, 650000, 0, 100000, '2022-1-12', 15);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (16, '2022-1-12', '2022-3-12', 50000, 450000, 100000, 20000, 5000, '2022-1-12', 16)
;
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (17, '2022-2-10', '2022-2-10', 150000, 1500000, 200000, 0, 100000, '2022-2-10', 17);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (18, '2022-2-11', '2022=2-12', 100000, 250000, 150000, 0, 10000, '2022-2-11', 18);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (19, '2022-2-15', '2022-2-16', 1500000, 3500000, 1750000, 0, 150000, '2022-2-15', 19);
INSERT INTO hotel.facility_price_history
    (faph_faci_id,faph_startdate,faph_enddate,faph_low_price,faph_high_price,faph_rate_price,faph_discount,faph_tax_rate,faph_modified_date,faph_user_id)
VALUES
    (20, '2022-2-17', '2022-2-18', 100000 , 200000, 150000, 0, 10000, '2022-2-17', 20);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Insert Booking_Orders
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--1
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(1,'BO#20230620-0001', '2023-06-20 12:00:00', '2023-06-23 12:00:00', 1, 5, 458749, 135376, 622749, 100000, 'D', 'DP', 'Individual', '4313567890123456', 'SILVER', 'BOOKING', 1, 1);

--2
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(2,'BO#20230319-0021', '2023-03-19 09:00:00', '2023-03-21 14:00:00', 1, 2, 423122, 64387, 739604, 125000, 'CR', 'P', 'Individual', '7890123456789012', 'SILVER', 'CHECKIN', 1, 2);

--3
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(3,'BO#20230110-0007', '2023-01-10 11:00:00', '2023-01-12 14:00:00', 1, 3, 523445, 533213, 5964172, 1000000, 'D', 'P', 'Corporate', '4313567890123456', 'GOLD', 'BOOKING', 1, 1);

--4
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(4,'BO#20230410-0013', '2023-04-10 15:00:00', '2023-04-13 15:00:00', 2, 1, 648993, 387222, 1784385, 0, 'C', 'P', 'Individual', '0', '-', 'BOOKING', 1, 3);

--5
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(5,'BO#20230825-0018', '2023-08-25 13:00:00', '2023-08-28 15:00:00', 3, 7, 982930, 249319, 5964412, 1000000, 'D', 'DP', 'Corporate', '2345678901234567', 'GOLD', 'BOOKING', 1, 1);

--6
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(6,'BO#20230505-0013', '2023-05-05 17:00:00', '2023-05-11 13:00:00', 2, 6, 125000, 184000, 1952833, 0, 'C', 'P', 'Corporate', '1395608901734567', 'GOLD', 'CHECKIN', 1, 5);

--7
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(7,'BO#20230924-0012', '2023-09-24 14:00:00', '2023-09-27 13:00:00', 1, 2, 0, 178000, 1043800, 0, 'C', 'P', 'Individual', '0', '-', 'BOOKING', 1, 3);

--8
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(8,'BO#20231010-0006', '2023-10-10 09:00:00', '2023-10-15 14:00:00', 1, 2, 125000, 257000, 2705000, 0, 'C', 'P', 'Individual', '8315608901733961', 'WIZARD', 'BOOKING', 1, 2);

--9
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(9,'BO#20231114-0024', '2023-11-14 11:00:00', '2023-11-19 17:00:00', 1, 2, 0, 197000, 191100, 350000, 'PG', 'DP', 'Travel Agent', '2345678901239567', 'VIP', 'BOOKING', 1, 7);

--10
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(10,'BO#20230114-0011', '2023-01-14 12:00:00', '2023-01-15 14:00:00', 1, 3, 175000, 165000, 625000, 0, 'C', 'P', 'Travel Agent', '0', '-', 'BOOKING', 1, 7);

--11
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(11,'BO#20230405-0025', '2023-04-05 15:00:00', '2023-04-08 15:00:00', 1, 2, 0, 115200, 815000, 0, 'D', 'P', 'Individual', '9012345678901234', 'WIZARD', 'BOOKING', 1, 3);

--12
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(12,'BO#20230715-0019', '2023-07-15 13:00:00', '2023-07-17 14:00:00', 2, 4, 250000, 391400, 2745000, 0, 'D', 'P', 'Travel Agent', '5678901234567890', 'VIP', 'BOOKING', 1, 3);

--13
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(13,'BO#20230824-0016', '2023-08-24 16:00:00', '2023-07-28 14:00:00', 1, 4, 150000, 268000, 1502300, 375000, 'CR', 'DP', 'Individual', '5128721531512890', 'SILVER', 'BOOKING', 1, 3);

--14
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(14,'BO#20230929-0012', '2023-09-29 12:00:00', '2023-10-01 13:00:00', 1, 2, 0, 182000, 2435000, 275000, 'CR', 'DP', 'Individual', '5649863797032411', 'GOLD', 'BOOKING', 1, 5);

--15
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(15,'BO#20230713-0010', '2023-07-13 10:00:00', '2023-07-14 14:00:00', 1, 2, 0, 87000, 785000, 0, 'C', 'P', 'Individual', '0', '-', 'BOOKING', 1, 8);

--16
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(16,'BO#20230713-0029', '2023-07-13 13:00:00', '2023-07-15 15:00:00', 1, 2, 150000, 74000, 615000, 0, 'C', 'P', 'Travel Agent', '0', '-', 'BOOKING', 1, 4);

--17
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(17,'BO#20230615-0009', '2023-06-15 10:00:00', '2023-06-17 14:00:00', 1, 2, 0, 5200, 438000, 0, 'C', 'P', 'Individual', '0', '-', 'BOOKING', 1, 7);

--18
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(18,'BO#20230425-0017', '2023-04-25 15:00:00', '2023-04-28 15:00:00', 1, 2, 100000, 55000, 815000, 125000, 'D', 'P', 'Individual', '3456789012345678', 'WIZARD', 'CHECKIN', 1, 3);

--19
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(19,'BO#20230415-0031', '2023-04-15 13:00:00', '2023-04-18 16:00:00', 1, 3, 0, 52000, 742000, 0, 'C', 'P', 'Travel_Agent', '0', '-', 'BOOKING', 1, 5);

--20
INSERT INTO booking.booking_orders
(boor_id,boor_order_number, boor_order_date, boor_arrival_date, boor_total_room, boor_total_guest, boor_discount, boor_total_tax, boor_total_amount, boor_down_payment, boor_pay_type, boor_is_paid, boor_type, boor_cardnumber, boor_member_type, boor_status, boor_user_id, boor_hotel_id)
VALUES
(20,'BO#20230810-0011', '2023-08-10 17:00:00', '2023-08-13 14:00:00', 1, 2, 175000, 360700, 4762000, 0, 'PG', 'DP', 'Travel_Agent', '4567890123456789', 'VIP', 'BOOKING', 1, 3);

--Insert Booking.special_order_detail_extra
--1
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(1,115000, 2, 30000, 'Unit', 1 );

--2
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(2,15000, 4, 60000, 'Unit', 1 );

--3
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(3,15000, 8, 12000, 'Unit', 1 );

--4
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(4,200000, 1, 200000, 'People', 12 );

--5
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(5,100000, 2, 200000, 'People', 16 );

--6
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(6,150000, 4, 600000, 'People', 17 );

--7
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(7,10000, 3, 30000, 'Unit', 7 );

--8
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(8,10000, 5, 50000, 'Unit', 7 );

--9
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(9,10000, 7, 70000, 'Unit', 7 );

--10
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(10,150000, 1, 150000, 'Unit', 14 );

--11
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(11,20000, 3, 60000, 'Unit', 10 );

--12
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(12,20000, 6, 120000, 'Unit', 10 );

--13
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(13,30000, 2, 60000, 'Unit', 20 );

--14
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(14,30000, 6, 180000, 'Unit', 20 );

--15
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(15,100000, 4, 400000, 'People', 15 );

--16
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(16,100000, 5, 500000, 'People', 15 );

--17
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(17,30000, 3, 90000, 'Unit', 9 );

--18
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(18,30000, 6, 180000, 'Unit', 9 );

--19
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(19,8000, 4, 32000, 'Unit', 5 );

--20
INSERT INTO booking.booking_order_detail_extra
(boex_id,boex_price, boex_qty, boex_subtotal, boex_measure_unit, boex_prit_id)
VALUES
(20,8000, 8, 64000, 'Unit', 5);

--Insert Booking.special_offers
--1.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(1,'ImlekKelinci', 'Discount, Chinese New Year (Imlek)', 'Individual', 250000,'2023-01-13','2023-02-13','1', '50', current_timestamp);

--2.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(2,'Nyepi1945Saka', 'Discount, Nyepi (Nyepi) Day', 'Individual', 125000,'2023-03-17','2023-04-2','1', '30', current_timestamp);

--3.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(3,'BukbekStaycation', 'Discount, Ramadan and Staycation (BukberStaycation)', 'Individual', 125000,'2023-04-7','2023-04-16','1', '15', current_timestamp);

--4.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(4,'IdulFitri1444H', 'Discount, Eid al-Fitr Lebaran', 'Individual', 300000,'2023-04-17','2023-05-7','1', '70', current_timestamp);

--5.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(5,'IdulAdha1444H', 'Discount, Eid al-Adha', 'Individual', 200000,'2023-06-23','2023-07-2','1', '50', current_timestamp);

--6.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(6,'CorporateBrainStorm2023', 'Discount, Staycation with Brainstorming Corporate 2023', 'Corporate', 150000,'2023-01-30','2023-12-4','1', '30', current_timestamp);

--7.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(7,'CorporateClosing', 'Discount, Closing Corporate 2023', 'Corporate', 200000,'2023-12-18','2023-12-24','1', '5', current_timestamp);

--8.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(8,'CorporateClosing', 'Discount, Closing Corporate 2023', 'Corporate', 200000,'2023-12-18','2023-12-24','1', '10', current_timestamp);

--9.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(9,'Kemerdekaan', 'Discount, Independence Day 2023', 'Individual', 170845,'2023-08-14','2023-08-21','1', '17', current_timestamp);

--10.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(10,'NatalDanTahunBaru', 'Discount, Christmas and New Year 2023', 'Individual', 150000,'2023-12-18','2024-01-7','1', '50', current_timestamp);

--11.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(11,'NatalDanTahunBaruCorporate', 'Discount, Christmas and New Year 2023 for Corporate', 'Corporate', 175000,'2023-12-18','2024-01-7','1', '25', current_timestamp);

--12. 
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(12,'NatalDanTahunBaruTravelAgent', 'Discount, Christmas and New Year 2023 for Travel Agents', 'Travel Agent', 200000,'2023-12-18','2024-01-7','1', '15', current_timestamp);

--13.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(13,'MusimPanas', 'Discount, Summer Season 2023', 'Individual', 150000,'2023-07-13','2023-07-23','1', '15', current_timestamp);

--14.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(14,'MusimPanas', 'Discount,Summer Season 2023 Corporate', 'Corporate', 100000,'2023-07-13','2023-07-23','1', '5', current_timestamp);

--15.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(15,'MusimPanas', 'Discount, Summer Season 2023 for Travel Agents', 'Travel Agent', 125000,'2023-07-13','2023-07-23','1', '10', current_timestamp);

--16.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(16,'LiburSekolah', 'Discount, School Holidays 2023 for Individuals', 'Individual', 250000,'2023-06-26','2023-07-8','1', '45', current_timestamp);

--17.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(17,'LiburSekolah', 'Discount, Summer Season 2023 for Corporates', 'Corporate', 200000,'2023-07-26','2023-07-8','1', '10', current_timestamp);

--18.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(18,'LiburSekolah', 'Discount, Summer Season 2023 for Travel Agents', 'Travel Agent', 150000,'2023-07-26','2023-07-8','1', '25', current_timestamp);

--19.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(19,'WorkFromHotel', 'Discount, WFH 2023 Corporate', 'Corporate', 150000,'2023-02-6','2023-02-27','1', '10', current_timestamp);

--20.
INSERT INTO 
booking.special_offers
(spof_id,spof_name, spof_description, spof_type, spof_discount, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date) 
VALUES
(20,'WorkFromHotel', 'Discount, WFH 2023 Travel Agent', 'Travel Agent', 125000,'2023-02-6','2023-02-27','1', '25', current_timestamp);

--Insert Booking.order_detail
--1
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(1,'2023-06-23','2023-06-26', 2, 3, 1433122, 0, 130000, 100000, 1535644, 1);

--2
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(2, '2023-03-21','2023-03-22', 2, 0, 750000, 0, 110000, 70000, 865332, 1);

--3
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(3, '2023-01-12','2023-01-14', 2, 1, 1200000, 20000, 112000, 89000, 1423289, 1);

--4
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(4, '2023-04-13','2023-04-14', 2, 1, 1200000, 60000, 0, 81000, 1348699, 1);

--5
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(5, '2023-08-28','2023-08-29', 6, 1, 3700000, 1041000, 500000, 350000, 5961722, 1);

--6
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(6, '2023-05-10','2023-05-11', 4, 2, 1784000, 73000, 125000, 184000, 1952833, 1);

--7
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(7, '2023-09-25','2023-09-27', 2, 0, 845000, 125000, 0, 178000, 1043800, 1);

--8
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(8, '2023-10-15','2023-10-18', 2, 0, 2705000, 0, 125000, 257000, 2968100, 1);

--9
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(9, '2023-11-19','2023-11-21', 2, 0, 1911000, 0, 0, 197000, 2261972, 1);

--10
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(10, '2023-01-15','2023-01-16', 2, 1, 625000, 35000, 175000, 165000, 829600, 1);

--11
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(11, '2023-04-08','2023-04-09', 2, 0, 815000, 86000, 0, 115200, 10742000, 15);

--12
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(12, '2023-07-17','2023-07-19', 4, 0, 2745000, 65000, 250000, 391400, 3082388, 15);

--13
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(13, '2023-08-28','2023-08-30', 2, 2, 1502300, 0, 150000, 268000, 1926491, 15);

--14
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(14, '2023-10-01','2023-10-04', 2, 0, 2435000, 350000, 0, 182000, 2782953, 15);

--15
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(15, '2023-07-14','2023-07-15', 2, 0, 785000, 15000, 0, 87000, 964122, 15);

--16
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(16, '2023-07-15','2023-07-16', 2, 0, 615000, 35000, 150000, 74000, 710122, 15);

--17
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(17, '2023-06-17','2023-06-19', 1, 1, 438000, 50000, 0, 52000, 501854, 15);

--18
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(18, '2023-04-28','2023-04-30', 2, 0, 815000, 55000, 100000, 171700, 1045022, 15);

--19
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(19, '2023-04-18','2023-04-19', 2, 1, 638000, 25000, 0, 52000, 742020, 15);

--20
INSERT INTO booking.booking_order_detail
(border_boor_id, borde_checkin, borde_checkout, borde_adults, borde_kids, borde_price, borde_extra, borde_discount, borde_tax, borde_subtotal, borde_faci_id)
VALUES
(20, '2023-08-13','2023-08-17', 2, 0, 4762000, 375000, 175000, 360700, 5361647, 15);


--Insert User_Breakfeast
--1.
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(1, '2023-06-24 06:00:00', 5);

--2
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(1, '2023-06-25 06:00:00', 5);

--3
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(1, '2023-06-26 06:00:00', 5);

--4
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(2, '2023-03-22 06:00:00', 2);

--5
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(3, '2023-01-13 06:00:00', 3);

--6
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(3, '2023-01-14 06:00:00', 3);

--7
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(4, '2023-04-14 06:00:00', 3);

--8
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(5, '2023-08-29 06:00:00', 7);

--9
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(6, '2023-05-11 06:00:00', 6);

--10
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(7, '2023-09-26 06:00:00', 2);

--11
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(7, '2023-09-27 06:00:00', 2);

--12
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(8, '2023-10-16 06:00:00', 2);

--13
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(8, '2023-10-17 06:00:00', 2);

--14
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(8, '2023-10-18 06:00:00', 2);

--15
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(9, '2023-11-20 06:00:00', 2);

--16
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(9, '2023-11-21 06:00:00', 2);

--17
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(10, '2023-10-16 06:00:00', 3);

--18
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(11, '2023-04-09 06:00:00', 2);

--19
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(12, '2023-07-18 06:00:00', 4);

--20
INSERT INTO booking.user_breakfeast
(usbr_borde_id, usbr_modified_date, usbr_total_vacant)
VALUES
(12, '2023-07-19 06:00:00', 4);

--Insert Booking.special_offer_coupons
--1.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(1,1,1);

--2.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(2,2,2);

--3.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(3,3,3);

--4.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(4,4,4);

--5.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(5,5,5);

--6.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(6,6,6);

--7.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(7,7,7);

--8.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(8,8,8);

--9.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(9,9,9);

--10.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(10,10,10);

--11.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(11,11,11);

--12.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(12,12,12);

--13.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(13,13,13);

--14.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(14,14,14);

--15.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(15,15,15);

--16.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(16,16,16);

--17.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(17,17,17);

--18.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(18,18,18);

--19.
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(19,19,19);

--20
INSERT INTO booking.special_offer_coupons
(soco_id,soco_borde_id, soco_spof_id)
VALUES
(20,20,20);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- insert resto menus
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO resto.resto_menus
VALUES
	(1,1,'Regular Tea', 'Teh', 20000, 'AVAILABLE', NOW()),
	(1,2,'Green Tea', 'Green Tea sedap', 25000, 'AVAILABLE', NOW()),
	(1,3,'Jasmine Tea', 'Teh melati sedap', 20000, 'AVAILABLE', NOW()),
	(1,4,'Caesar salad', 'Heart of romainde lettuce, crispy bacon, toasted brioche bread, shaved parmesan cheese', 80000, 'AVAILABLE', NOW()),
	(1,5,'Gado-gado', 'Raw and semi cooked vegetables with pestle grounded peanut sauce and chili', 65000, 'AVAILABLE', NOW()),
	(1,6,'Crispy vegetable spring rolls', 'Served with chilli sauce', 75000, 'AVAILABLE', NOW()),
	(1,7,'Porcini mushroom cappuccino', 'Summer truffle, sundried tomatos and olive biscotti', 55000, 'AVAILABLE', NOW()),
	(2,8,'Deep fried thai fish cake', 'Served with thai sauce', 80000, 'AVAILABLE', NOW()),
	(2,9,'Crab meat spring rolls', 'Served with thai sauce', 80000, 'AVAILABLE', NOW()),
	(2,10,'Vegetable spring roll', 'Served with thai sauce', 65000, 'AVAILABLE', NOW()),
	(2,11,'Vegetable samosa with raita', 'Served with mint yoghurt sauce', 85000, 'AVAILABLE', NOW()),
	(2,12,'Thai barbecue chicken with sweet chili sauce', 'Served with sweet chili sauce', 60000, 'AVAILABLE', NOW()),
	(2,13,'Fried pawns', 'Served with mint yoghurt sauce', 80000, 'AVAILABLE', NOW()),
	(2,14,'Pan fried gyoza', 'Served with soyu sauce', 65000, 'AVAILABLE', NOW()),
	(3,15,'Profiteroles tart', 'Shortbread, almond choux puff, light grand marnier cream, dark chocolate glaze', 65000, 'AVAILABLE', NOW()),
	(3,16,'Strawberry Shortcake', 'Ladyfinger sponge, light vanilla cream, fresh strawberry', 50000, 'AVAILABLE', NOW()),
	(3,17,'US Cheese Cake', 'Ladyfinger sponge, American cream cheese', 55000, 'AVAILABLE', NOW()),
	(3,18,'Vanilla Parisian Flan', 'Shortbread, vanilla custard', 55000, 'AVAILABLE', NOW()),
	(3,19,'Chocolate Orange', 'Chocolate almond sponge, light orange mousse, milk chocolate mousse', 50000, 'AVAILABLE', NOW()),
	(3,20,'Chocolate Coconut', 'Ladyfinger sponge, light yoghurt mousse, milk chocolate mousse, coconut chantilly', 45000, 'AVAILABLE', NOW());

INSERT INTO resto.resto_menu_photos
VALUES
	(1, 'Regular tea', 'Regular tea', B'1', 'link foto reg tea',1),
	(2, 'Regular tea 2', 'Regular tea 2', B'0', 'link foto reg tea 2',1),
	(3, 'Green Tea', 'Green tea', B'1', 'link foto Green tea',2),
	(4, 'Green Tea 2', 'Green tea 2', B'0', 'link foto Green tea 2',2),
	(5, 'Jasmine Tea', 'Jasmine tea', B'1', 'link foto Jasmine tea',3),
	(6, 'Caesar salad', 'Caesar salad', B'1', 'link foto Caesar salad',4),
	(7, 'Gado-gado', 'Gado-gado', B'1', 'link foto Gado-gado',5),
	(8, 'Gado-gado', 'Gado-gado', B'0', 'link foto Gado-gado',5),
	(9, 'Crispy vegetable spring rolls', 'Crispy vegetable spring rolls', B'1', 'link foto Crispy vegetable spring rolls',6),
	(10, 'Crispy vegetable spring rolls 2', 'Crispy vegetable spring rolls 2', B'0', 'link foto Crispy vegetable spring rolls 2',6),
	(11, 'Porcini mushroom cappuccino', 'Porcini mushroom cappuccino', B'1', 'link foto Porcini mushroom cappuccino',7),
	(12, 'Porcini mushroom cappuccino 2', 'Porcini mushroom cappuccino 2', B'0', 'link foto Porcini mushroom cappuccino',7),
	(13, 'Deep fried thai fish cake', 'Deep fried thai fish cake', B'1', 'link foto Deep fried thai fish cake',8),
	(14, 'Deep fried thai fish cake 2', 'Deep fried thai fish cake 2', B'0', 'link foto Deep fried thai fish cake 2',8),
	(15, 'Crab meat spring rolls', 'Crab meat spring rolls', B'1', 'link foto Crab meat spring rolls',9),
	(16, 'Vegetable spring roll', 'Vegetable spring roll', B'1', 'link foto Vegetable spring roll',10),
	(17, 'Vegetable samosa with raita', 'Vegetable samosa with raita', B'1', 'link foto Vegetable samosa with raita',11),
	(18, 'Thai barbecue chicken with sweet chili sauce', 'Thai barbecue chicken with sweet chili sauce', B'1', 'link foto Thai barbecue chicken with sweet chili sauce',12),
	(19, 'Fried pawns', 'Fried pawns', B'1', 'link foto Fried pawns',13),
	(20, 'Pan fried gyoza', 'Pan fried gyoza', B'1', 'link foto Pan fried gyoza',14),
	(21, 'Profiteroles tart', 'Profiteroles tart', B'1', 'link foto Profiteroles tart',15),
	(22, 'Strawberry Shortcake', 'Strawberry Shortcake', B'1', 'link foto Strawberry Shortcake',16),
	(23, 'US Cheese Cake', 'US Cheese Cake', B'1', 'link foto US Cheese Cake',17),
	(24, 'Vanilla Parisian Flan', 'Vanilla Parisian Flan', B'1', 'link foto Vanilla Parisian Flan',18),
	(25, 'Chocolate Orange', 'Chocolate Orange', B'1', 'link foto Chocolate Orange',19),
	(26, 'Chocolate Coconut', 'Chocolate Coconut', B'1', 'link foto Chocolate Coconut',20),
	(27, 'Chocolate Coconut 2', 'Chocolate Coconut 2', B'0', 'link foto Chocolate Coconut 2',20);

-- select * from users.users

-- INSERt INTO users.users (user_full_name)
-- VALUES 
-- 	('c aja')
-- 	('d aja'),
-- 	('e aja'),
-- 	('f aja'),
-- 	('g aja'),
-- 	('h aja'),
-- 	('i aja'),
-- 	('j aja'),
-- 	('k aja'),
-- 	('l aja'),
-- 	('m aja'),
-- 	('n aja')
	
INSERT INTO resto.order_menus
VALUES
	(1, 'MENUS#20230112-0001', NOW(), 2, 5000, 100000, 'CR', '11111111', 'P', NOW(), 1),
	(2, 'MENUS#20230112-0002', NOW(), 1, 0, 65000, 'C', '', 'P', NOW(), 1),
	(3, 'MENUS#20230112-0003', NOW(), 3, 5000, 165000, 'D', '2222222', 'B', NOW(), 2),
	(4, 'MENUS#20230112-0004', NOW(), 2, 3000, 137000, 'PG', '2222222', 'B', NOW(), 2),
	(5, 'MENUS#20230112-0005', NOW(), 3, 0, 150000, 'BO', '3333333', 'B', NOW(), 3),
	(6, 'MENUS#20230112-0006', NOW(), 1, 0, 65000, 'BO', '3333333', 'B', NOW(), 3),
	(7, 'MENUS#20230112-0007', NOW(), 3, 0, 65000, 'CR', '4444444', 'P', NOW(), 4),
	(8, 'MENUS#20230112-0008', NOW(), 5, 30000, 335000, 'PG', '5555555', 'B', NOW(), 5),
	(9, 'MENUS#20230112-0009', NOW(), 4, 15000, 18000, 'BO', '6666666', 'P', NOW(), 6), -- sampe sini yang udh bayar
	(10, 'MENUS#20230112-0010', NOW(), 5, 25000, 300000, 'C', '', 'P', NOW(), 7),
	(11, 'MENUS#20230112-0011', NOW(), 2, 10000, 190000, 'CR', '8888888', 'P', NOW(), 8),
	(12, 'MENUS#20230112-0012', NOW(), 5, 25000, 300000, 'BO', '9999999', 'P', NOW(), 9),
	(13, 'MENUS#20230112-0013', NOW(), 2, 10000, 190000, 'C', '', 'P', NOW(), 10),
	(14, 'MENUS#20230112-0014', NOW(), 1, 0, 65000, 'C', '', 'P', NOW(), 11),
	(15, 'MENUS#20230112-0015', NOW(), 4, 20000, 410000, 'D', '1212121', 'B', NOW(), 12),
	(16, 'MENUS#20230112-0016', NOW(), 5, 25000, 300000, 'BO', '1313131', 'B', NOW(), 13),
	(17, 'MENUS#20230112-0017', NOW(), 5, 25000, 300000, 'BO', '14141414', 'B', NOW(), 14),
	(18, 'MENUS#20230112-0018', NOW(), 2, 10000, 190000, 'CR', '15151515', 'P', NOW(), 15),
	(19, 'MENUS#20230112-0019', NOW(), 2, 0, 100000, 'CR', '15151515', 'P', NOW(), 16),
	(20, 'MENUS#20230112-0020', NOW(), 2, 0, 115000, 'CR', '15151515', 'P', NOW(), 17);
	
-- SELECT * FROM resto.order_menu_detail

-- INSERT INTO resto.order_menu_detail

INSERT INTO resto.order_menu_detail(orme_price, orme_qty, orme_subtotal, orme_discount, omde_orme_id, omde_reme_id)
VALUES 
	(50000, 2, 50000, 5000, 1, 19), --p1
	(65000, 1, 65000, 0, 2, 14),	--p1
	(25000, 1, 25000, 0, 3, 2),		--p2
	(65000, 1, 65000, 2500, 3, 5),
	(80000, 1, 80000, 2500, 3, 4),
	(80000, 1, 80000, 3000, 4, 8),	--p2
	(60000, 1, 60000, 0, 4, 12),
	(55000, 1, 55000, 0, 5, 17),	--p3
	(55000, 1, 55000, 0, 5, 18),
	(50000, 1, 50000, 0, 5, 19),
	(65000, 1, 65000, 0, 6, 15), 	--p3
	(20000, 2, 40000, 0, 7, 1),		--p4
	(25000, 1, 25000, 0, 7, 2),
	(80000, 1, 80000, 10000, 8, 8), --p5
	(80000, 2, 160000, 20000, 8, 9),
	(65000, 1, 65000, 0, 8, 10),
	(60000, 1, 60000, 0, 8, 12),
	(45000, 2, 90000, 10000, 9, 20),	--p6
	(50000, 1, 50000, 0, 9, 19),
	(55000, 1, 55000, 5000, 9, 17);
	
	

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--PAYMENT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO payment.entitys 
values
 (1)
,(2)
,(3)
,(4)
,(5)
,(6)
,(7)
,(8)
,(9)
,(10)
,(11)
,(12)
,(13)
,(14)
,(15)
,(16);


-- select * from payment.entitys

INSERT INTO payment.payment_gateway values
(16, '395', 'H-Pay', now());

-- select * from payment.payment_gateway

INSERT INTO payment.bank values
(1, '002', 'BRI', now())
,(2, '009', 'BNI', now())
,(3, '022', 'CIMB Niaga', now())
,(4, '427', 'BNI Syariah', now())
,(5, '451', 'Mandiri Syariah', now())
,(6, '147', 'Muamalat', now())
,(7, '213', 'BTPN', now())
,(8, '422', 'BRI Syariah', now())
,(9, '200', 'BTN', now())
,(10, '013', 'PERMATA', now())
,(11, '008', 'Mandiri', now())
,(12, '426', 'Mega', now())
,(13, '014', 'BCA', now())
,(14, '011', 'Danamon', now())
,(15, '441', 'Bukopin', now());

-- select * from payment.bank

--All PAYMENT SECURE CODE NYA 1122 & CARD 478
INSERT INTO payment.user_accounts values 
(16, 1, '082287821698', 2000000, 'Payment', 0, 0, '$2a$10$8pX/Qz1yTAKWV9KglUTmy.jz4oO.EUDMPz09IY6lWPURp/9DovDee', now()), --1122
(13, 1, '2625943489', 2000000, 'Debet', 06, 27, '$2a$12$CsaG26euBlXVZNtm6PrfOuNXYcKbtLcjJvZChvRSE3LDMdx9AOMli', now()),
(16, 2, '082287821622', 200000, 'Payment', 0, 0, '$2a$12$qpzCxdGXKj/fs71lczuVzuO5QsBSox7OCRge.lcZbMSoQX6P1VcX6', now()),
(11, 2, '5441342229747', 200000, 'Debet', 04, 25, '$2a$12$64z72zdxzDOKPzW6ZaaEe.AFwKLSBbeG9TPDZg9ocuyXXNXCpNWGe', now()),
(16, 3, '08228782161', 200000, 'Payment', 0, 0, '$2a$12$sRpQ/6q96vzXyrHwAfPbSOQbeXJtyrWgVkU.Snqkg1Pa3aBwPZeAu', now()),
(16, 4, '082287821633', 200000, 'Payment', 0, 0, '$2a$12$6gXQXIUUifd09.wUzBfqzuhXDCxZfLLOl/LK4iswBTYRiGFVVHiyy', now()),
(5, 5, '0846364368962', 200000, 'Credit Card', 01, 26, '$2a$12$Fv1MNGepRQErkfY78hn1su8MGaU4myYHqfeSmA6W1PbVk8iCQZ7hK', now()),
(4, 6, '1536379764062', 200000, 'Debet', 03, 27, '$2a$12$7HhGitySwNI56bVvc6j4V.aIYzEf7V8KpOMmrhr9WmyOV91yb6fbK', now()),
(16, 6, '082287821689', 200000, 'Payment', 0, 0, '$2a$12$T8OI0Htbc0y1wMYJAm8pvOXAxhI4PaLrxZbYB9LGQ1YYlanXU1BwO', now()),
(10, 7, '1780654017393', 200000, 'Debet', 03, 26, '$2a$12$ETuLojT9XmJJFVkxbMV9teK385yGsGgQCsgnl5wZeaW23VCea5gnu', now()),
(16, 8, '082287821665', 200000, 'Payment', 0, 0, '$2a$12$7qldcEDiu6aFjQ7vjMfF9e8B6/4TfhZOuGkyxWpPj/M5jlnfQF2SK', now()),
(1, 8, '6753274477272', 200000, 'Credit Card', 04, 27, '$2a$12$neYU8/aOvyCzUln.yfiWoeNMm1m.OjOYUxrQjCq7Sb.EleRYZa.Qy', now()),
(16, 9, '082287821650', 200000, 'Payment', 0, 0, '$2a$12$r8SdCR1W.xDVSO.r2rce/./xzMZbVK2vgVDpPAFozlBtOfYKNx9i6', now()),
(10, 10, '082287821634', 200000, 'Payment', 0, 0, '$2a$12$N1WsqX51TDsL8dX.1c3Gnebpi5Gqfk6FbmeIm0B1hNDNDtFduTF.i', now()),
(1, 12, '1623889545112', 200000, 'Credit Card', 12, 24, '$2a$12$tu8r6rPB/2HNzLGxOoTaP.mbo5jJWGdPKByAp0jWuAsfogH3osbKm', now()),
(16, 14, '082287821627', 200000, 'Payment', 0, 0, '$2a$12$Aim4m/4w4jQHfSv7ZFJy4.6zwhDhY2i0ha.TxwP8Ar1JARksEF0Ru', now()),
(16, 16, '082287821638', 200000, 'Payment', 0, 0, '$2a$12$/EFchUk8QL2VBzCQ750Ka.pjcUGusHdrlBHazlrem0JZINuxd8aoe', now()),
(2, 18, '3806294451579', 200000, 'Debet', 05, 28, '$2a$12$mbtO4PznFb1jm/oP4kjoFu9BAbWQrflW0zG41S.05j5OlmlaPb7ty',now()),
(16, 18, '082287821624', 200000, 'Payment', 0, 0, '$2a$12$b14ASMJpZDUmYvdqF.0Y0uneBVrbhGS6K1IwQAVLuoYI98j7w7Rn6', now()),
(13, 19, '9046899794970', 200000, 'Credit Card', 07, 27, '$2a$12$6nCF6EDeoe6icJmIvGuwTueZgx7./e43A9AhpCaKk22qOmIcHY1u2', now()),
(16, 20, '082287821623', 200000, 'Payment', 0, 0, '$2a$12$jKA4ZQq/5YaaQ8Yi8fIJR.URaPBjTG0.NrjPLUflOTc4BxxfFYRky', now());

INSERT INTO payment.payment_transaction values 
(1, 'ORM#20230112-0001', 0, 100000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0001', 2625943489, 13198989898, 'qMkFVdyV4VtSMoUX', 1),
(2, 'ORM#20230112-0002', 0, 65000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0002', 082287821698, 13198989898, 'SGQNHBeBRRoFm6Vm', 1),
(3, 'ORM#20230112-0003', 0, 65000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0007', 082287821633, 13198989898, 'YtXeC85qq8MGRvw0', 4),
(4, 'ORM#20230112-0004', 0, 18000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0009', 1536379764062, 13198989898, 'G23u3aJJdxsdk57f', 6),
(5, 'ORM#20230112-0005', 0, 300000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0010', 1780654017393, 13198989898, '8qMECuWHKMS1GsSV', 7),
(6, 'ORM#20230112-0006', 0, 190000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0011', 6753274477272, 13198989898, '6Tbe5wdA05U3z1gf',8),
(7, 'ORM#20230112-0007', 0, 300000, 'ORM', 'Food Order', now(), 'MENUS#20230112-0012', 082287821650, 13198989898, 'ihqBnDkXqrW6aiqs',9),
(8, 'TRB#20230112-0008', 0, 622749, 'TRB', 'Booking', now(), 'BO#20230620-0001', 1623889545112, 13198989898, 'rDreG-76Wsa4p9rp',12),
(9, 'TRB#20230112-0009', 0, 739604, 'TRB', 'Booking', now(), 'BO#20230319-0021', 082287821627, 13198989898, 'sBwOaWog71trMhvm',14),
(10, 'TRB#20230112-0010', 0, 5964172, 'TRB', 'Booking', now(), 'BO#20230110-0007', 082287821638, 13198989898, 'W2L8N67kbmXVGs9N',16),
(11, 'TP#20230224-0001', 200000, 0, 'TP', 'Top Up', now(), '', 2625943489, 082287821698, '1s725b4xsmtcumkvwcrq', 1 ),
(12, 'TP#20230224-0002', 2000000, 0, 'TP', 'Top Up', now(), '', 5441342229747, 082287821622, 'o3dxzk8mggo5r8mj6nz9',2 ),
(13, 'TP#20230224-0003', 600000, 0, 'TP', 'Top Up', now(), '', 6753274477272, 082287821665, 'zhx7rpqlfi7rkn6mabgh', 8 ),
(14, 'TP#20230224-0004', 800000, 0, 'TP', 'Top Up', now(), '', 3806294451579, 082287821624, 'xz5pt8a7wnwrrh89dhl8', 18 );

-- select * from payment.user_accounts

-- INSERT INTO payment.payment_transaction values

-- truncate table payment.bank cascade

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- HR
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Shift
insert into hr.shift values (1, 'pagi', '07:00', '15:00');
insert into hr.shift values (2, 'siang', '15:00', '23:00');
insert into hr.shift values (3, 'malam', '23:00', '07:00');

-- Department
insert into hr.department values (1, 'Front Office', now());
insert into hr.department values (2, 'Housekeeping', now());
insert into hr.department values (3, 'Executive Office', now());
insert into hr.department values (4, 'Maintenance', now());
insert into hr.department values (5, 'Food and Beverage', now());
insert into hr.department values (6, 'Sales and Marketing', now());
insert into hr.department values (7, 'Accounting', now());
insert into hr.department values (8, 'Human Resources', now());
insert into hr.department values (9, 'Event Planning', now());
insert into hr.department values (10, 'Guest Services', now());
insert into hr.department values (11, 'Security', now());
insert into hr.department values (12, 'Engineering', now());
insert into hr.department values (13, 'Spa and Fitness', now());
insert into hr.department values (14, 'Reservations', now());
insert into hr.department values (15, 'Concierge', now());
insert into hr.department values (16, 'Kitchen', now());
insert into hr.department values (17, 'Laundry', now());
insert into hr.department values (18, 'Pool and Beach', now());
insert into hr.department values (19, 'Gift Shop', now());
insert into hr.department values (20, 'Transportation', now());

-- Job role
insert into hr.job_role values (1, 'Front Desk Clerk', now());
insert into hr.job_role values (2, 'Room Attendant', now());
insert into hr.job_role values (3, 'Maintenance Technician', now());
insert into hr.job_role values (4, 'Bartender', now());
insert into hr.job_role values (5, 'Sales and Marketing Manager', now());
insert into hr.job_role values (6, 'Accountant', now());
insert into hr.job_role values (7, 'Human Resources Coordinator', now());
insert into hr.job_role values (8, 'Event Planner', now());
insert into hr.job_role values (9, 'Guest Services Agent', now());
insert into hr.job_role values (10, 'Security Officer', now());
insert into hr.job_role values (11, 'Engineer', now());
insert into hr.job_role values (12, 'Spa and Fitness Attendant', now());
insert into hr.job_role values (13, 'Reservations Agent', now());
insert into hr.job_role values (14, 'Concierge', now());
insert into hr.job_role values (15, 'Line Cook', now());
insert into hr.job_role values (16, 'Laundry Attendant', now());
insert into hr.job_role values (17, 'Pool and Beach Attendant', now());
insert into hr.job_role values (18, 'Gift Shop Clerk', now());
insert into hr.job_role values (19, 'Bellhop/Valet', now());
insert into hr.job_role values (20, 'General Manager', now());

-- Work orders
insert into hr.work_orders values (1, '2023-01-11 06:50:57.259567-08', 'OPEN', 1);
insert into hr.work_orders values (2, '2023-01-11 06:50:57.259567-08', 'CLOSED', 2);
insert into hr.work_orders values (3, '2023-01-11 12:55:33.282045-08', 'CANCELED', 2);
insert into hr.work_orders values (4, '2023-01-11 12:55:33.282045-08', 'CLOSED', 1);
insert into hr.work_orders values (5, '2023-01-11 06:50:57.259567-08', 'OPEN', 5);
insert into hr.work_orders values (6, '2023-01-11 06:50:57.259567-08', 'OPEN', 6);
insert into hr.work_orders values (7, '2023-01-11 06:20:11.714037-08', 'OPEN', 7);
insert into hr.work_orders values (8, '2023-01-11 06:20:11.714037-08', 'OPEN', 8);
insert into hr.work_orders values (9, '2023-01-11 06:20:11.714037-08', 'OPEN', 9);
insert into hr.work_orders values (10, '2023-01-11 15:21:35.238554-08', 'CLOSED', 10);
insert into hr.work_orders values (11, '2023-01-11 15:21:35.238554-08', 'CLOSED', 11);
insert into hr.work_orders values (12, '2023-01-11 15:21:35.238554-08', 'CANCELED', 12);
insert into hr.work_orders values (13, '2023-01-11 15:21:35.238554-08', 'CLOSED', 13);
insert into hr.work_orders values (14, '2023-01-11 15:21:35.238554-08', 'CLOSED', 14);
insert into hr.work_orders values (15, '2023-01-11 15:21:35.238554-08', 'OPEN', 15);
insert into hr.work_orders values (16, '2023-01-11 15:21:35.238554-08', 'CLOSED', 16);
insert into hr.work_orders values (17, '2023-01-11 15:21:35.238554-08', 'OPEN', 17);
insert into hr.work_orders values (18, '2023-01-11 15:21:35.238554-08', 'CLOSED', 18);
insert into hr.work_orders values (19, '2023-01-11 15:21:35.238554-08', 'OPEN', 19);
insert into hr.work_orders values (20, '2023-01-11 15:21:35.238554-08', 'CLOSED', 20);

-- Employees
insert into hr.employee values (1, 'IDN', '2023-01-12', 'M', 'M', '2016-01-11 20:35:11.679331-08', '1', 5, 0, 1, NULL, now(), NULL, 20);
insert into hr.employee values (2, 'IDN', '2023-01-12', 'M', 'M', '2017-01-01 22:09:54.390584-08', '1', 5, 0, 1, NULL, now(), 1, 5);
insert into hr.employee values (3, 'IDN', '2023-01-12', 'M', 'F', '2018-04-11 22:09:31.194324-08', '1', 4, 1, 1, NULL, now(), 2, 5);
insert into hr.employee values (4, 'IDN', '2023-01-12', 'M', 'M', '2018-05-11 22:09:31.194324-08', '1', 4, 1, 1, NULL, now(), 2, 5);
insert into hr.employee values (5, 'IDN', '2023-01-12', 'S', 'M', '2019-07-11 22:13:15.547295-07', '1', 4, 1, 1, NULL, now(), 2, 5);
insert into hr.employee values (6, 'IDN', '2023-01-12', 'M', 'M', '2019-07-11 22:25:14.906377-07', '1', 4, 1, 1, NULL, now(), 2, 5);
insert into hr.employee values (7, 'IDN', '2023-01-12', 'M', 'F', '2019-07-11 22:25:14.906377-07', '1', 4, 1, 1, NULL, now(), 2, 5);
insert into hr.employee values (8, 'IDN', '2023-01-12', 'S', 'F', '2017-01-01 22:09:54.390584-08', '1', 5, 0, 1, NULL, now(), 1, 7);
insert into hr.employee values (9, 'IDN', '2023-01-12', 'M', 'F', '2018-04-11 22:09:31.194324-08', '1', 4, 1, 1, NULL, now(), 8, 7);
insert into hr.employee values (10, 'IDN', '2023-01-12', 'M', 'M', '2018-05-11 22:09:31.194324-08', '1', 4, 1, 1, NULL, now(), 8, 7);
insert into hr.employee values (11, 'IDN', '2023-01-12', 'S', 'M', '2019-07-11 22:13:15.547295-07', '1', 4, 1, 1, NULL, now(), 8, 7);
insert into hr.employee values (12, 'IDN', '2023-01-12', 'M', 'F', '2017-01-01 22:09:54.390584-08', '1', 5, 0, 1, NULL, now(), 1, 6);
insert into hr.employee values (13, 'IDN', '2023-01-12', 'S', 'F', '2018-04-11 22:09:31.194324-08', '1', 3, 1, 1, NULL, now(), 12, 6);
insert into hr.employee values (14, 'IDN', '2023-01-12', 'M', 'M', '2018-05-11 22:09:31.194324-08', '1', 2, 2, 1, NULL, now(), 12, 6);
insert into hr.employee values (15, 'IDN', '2023-01-12', 'S', 'M', '2019-07-11 22:13:15.547295-07', '1', 4, 0, 1, NULL, now(), 12, 6);

insert into hr.employee values (16, 'IDN', '2023-01-12', 'M', 'F', '2017-01-01 22:09:54.390584-08', '1', 5, 0, 1, NULL, now(), 1, 8);
insert into hr.employee values (17, 'IDN', '2023-01-12', 'S', 'F', '2018-04-11 22:09:31.194324-08', '1', 3, 1, 1, NULL, now(), 16, 8);
insert into hr.employee values (18, 'IDN', '2023-01-12', 'M', 'M', '2018-05-11 22:09:31.194324-08', '1', 2, 2, 1, NULL, now(), 1, 3);
insert into hr.employee values (19, 'IDN', '2023-01-12', 'S', 'M', '2019-07-11 22:13:15.547295-07', '1', 4, 0, 1, NULL, now(), 18, 3);
insert into hr.employee values (20, 'IDN', '2023-01-12', 'S', 'M', '2019-07-11 22:13:15.547295-07', '1', 4, 0, 1, NULL, now(), 18, 11);

-- Work order detail
insert into hr.work_order_detail values (1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);
insert into hr.work_order_detail values (2, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, 2);
insert into hr.work_order_detail values (3, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, 3);
insert into hr.work_order_detail values (4, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, 4);
insert into hr.work_order_detail values (5, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, 5);

insert into hr.work_order_detail values (6, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, 6);
insert into hr.work_order_detail values (7, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 7);
insert into hr.work_order_detail values (8, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, 8);
insert into hr.work_order_detail values (9, NULL, NULL, NULL, NULL, NULL, 9, NULL, NULL, 9);
insert into hr.work_order_detail values (10, NULL, NULL, NULL, NULL, NULL, 10, NULL, NULL, 10);

insert into hr.work_order_detail values (11, NULL, NULL, NULL, NULL, NULL, 11, NULL, NULL, 11);
insert into hr.work_order_detail values (12, NULL, NULL, NULL, NULL, NULL, 12, NULL, NULL, 12);
insert into hr.work_order_detail values (13, NULL, NULL, NULL, NULL, NULL, 13, NULL, NULL, 13);
insert into hr.work_order_detail values (14, NULL, NULL, NULL, NULL, NULL, 14, NULL, NULL, 14);
insert into hr.work_order_detail values (15, NULL, NULL, NULL, NULL, NULL, 15, NULL, NULL, 15);

insert into hr.work_order_detail values (16, NULL, NULL, NULL, NULL, NULL, 16, NULL, NULL, 16);
insert into hr.work_order_detail values (17, NULL, NULL, NULL, NULL, NULL, 17, NULL, NULL, 17);
insert into hr.work_order_detail values (18, NULL, NULL, NULL, NULL, NULL, 18, NULL, NULL, 18);
insert into hr.work_order_detail values (19, NULL, NULL, NULL, NULL, NULL, 19, NULL, NULL, 19);
insert into hr.work_order_detail values (20, NULL, NULL, NULL, NULL, NULL, 20, NULL, NULL, 20);

-- Employee Pay History
insert into hr.employee_pay_history values (1, '2023-01-01', 30000000, 1, now());
insert into hr.employee_pay_history values (2, '2023-01-02', 30000000, 1, now());
insert into hr.employee_pay_history values (3, '2023-01-03', 10000000, 1, now());
insert into hr.employee_pay_history values (4, '2023-01-04', 6500000, 1, now());
insert into hr.employee_pay_history values (5, '2023-01-05', 6500000, 1, now());
insert into hr.employee_pay_history values (6, '2023-01-06', 6500000, 1, now());
insert into hr.employee_pay_history values (7, '2023-01-07', 6500000, 1, now());
insert into hr.employee_pay_history values (8, '2023-01-08', 10000000, 1, now());
insert into hr.employee_pay_history values (9, '2023-01-09', 5500000, 1, now());
insert into hr.employee_pay_history values (10, '2023-01-10', 5500000, 1, now());
insert into hr.employee_pay_history values (11, '2023-01-11', 5500000, 1, now());
insert into hr.employee_pay_history values (12, '2023-01-12', 5500000, 1, now());
insert into hr.employee_pay_history values (13, '2023-01-13', 9000000, 1, now());
insert into hr.employee_pay_history values (14, '2023-01-14', 8000000, 1, now());
insert into hr.employee_pay_history values (15, '2023-01-15', 8000000, 1, now());
insert into hr.employee_pay_history values (16, '2023-01-16', 8000000, 1, now());
insert into hr.employee_pay_history values (17, '2023-01-17', 5500000, 1, now());
insert into hr.employee_pay_history values (18, '2023-01-18', 6200000, 1, now());
insert into hr.employee_pay_history values (19, '2023-01-19', 6000000, 1, now());
insert into hr.employee_pay_history values (20, '2023-01-20', 5600000, 1, now());

-- Employee department history
insert into hr.employee_department_history values (1, 2, '2023-01-02', '2024-01-02', now(), 6, 1);
insert into hr.employee_department_history values (2, 3, '2023-01-03', '2024-01-02', now(), 6, 1);
insert into hr.employee_department_history values (3, 4, '2023-01-04', '2024-01-02', now(), 6, 1);
insert into hr.employee_department_history values (4, 5, '2023-01-05', '2024-01-02', now(), 6, 1);
insert into hr.employee_department_history values (5, 6, '2023-01-06', '2024-01-02', now(), 6, 1);
insert into hr.employee_department_history values (6, 7, '2023-01-07', '2024-01-02', now(), 6, 1);
insert into hr.employee_department_history values (7, 8, '2023-01-08', '2024-01-02', now(), 8, 1);
insert into hr.employee_department_history values (8, 9, '2023-01-09', '2024-01-02', now(), 8, 1);
insert into hr.employee_department_history values (9, 10, '2023-01-10', '2024-01-02', now(), 8, 1);
insert into hr.employee_department_history values (10, 11, '2023-01-11', '2024-01-02', now(), 8, 1);
insert into hr.employee_department_history values (11, 12, '2023-01-12', '2024-01-02', now(), 7, 1);
insert into hr.employee_department_history values (12, 13, '2023-01-13', '2024-01-02', now(), 7, 1);
insert into hr.employee_department_history values (13, 14, '2023-01-14', '2024-01-02', now(), 7, 1);
insert into hr.employee_department_history values (14, 15, '2023-01-15', '2024-01-02', now(), 7, 1);
insert into hr.employee_department_history values (15, 16, '2023-01-16', '2024-01-02', now(), 10, 1);
insert into hr.employee_department_history values (16, 17, '2023-01-17', '2024-01-02', now(), 10, 2);
insert into hr.employee_department_history values (17, 18, '2023-01-18', '2024-01-02', now(), 4, 1);
insert into hr.employee_department_history values (18, 19, '2023-01-19', '2024-01-02', now(), 4, 1);
insert into hr.employee_department_history values (19, 20, '2023-01-20', '2024-01-02', now(), 12, 1);
insert into hr.employee_department_history values (20, 1, '2023-01-20', '2024-01-02', now(), 3, 1);

-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- --PURCHASING
-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- --stock
-- INSERT INTO purchasing.stocks (stock_id,stock_name, stock_description, stock_quantity, stock_reorder_point, stock_used, stock_scrap, stock_price, stock_standar_cost, stock_size, stock_color, stock_modified_date)
-- VALUES
--     (1,'Towel', 'Soft and absorbent towel', 1000, 500, 250, 100, 20.00, 10.00, 'Large', 'White', NOW()),
--     (2,'Bed Linen', 'High-quality bed linen set', 500, 250, 125, 50, 40.00, 20.00, 'Double', 'White', NOW()),
--     (3,'Shampoo', 'Luxury hotel shampoo', 5000, 2500, 1250, 500, 10.00, 5.00, 'Bottle', 'Transparent', NOW()),
--     (4,'Conditioner', 'Luxury hotel conditioner', 5000, 2500, 1250, 500, 10.00, 5.00, 'Bottle', 'Transparent', NOW()),
--     (5,'Bathrobe', 'Soft and comfortable bathrobe', 200, 100, 50, 20, 50.00, 25.00, 'Large', 'White', NOW()),
--     (6,'Slippers', 'Disposable hotel slippers', 1000, 500, 250, 100, 5.00, 2.50, 'Medium', 'White', NOW()),
--     (7,'Soap', 'Luxury hotel soap', 5000, 2500, 1250, 500, 5.00, 2.50, 'Bar', 'White', NOW()),
--     (8,'Toothbrush', 'Disposable hotel toothbrush', 1000, 500, 250, 100, 2.00, 1.00, 'Small', 'White', NOW()),
--     (9,'Toothpaste', 'Luxury hotel toothpaste', 5000, 2500, 1250, 500, 10.00, 5.00, 'Tube', 'White', NOW()),
--     (10,'Hair Dryer', 'High-powered hotel hair dryer', 100, 50, 25, 10, 30.00, 15.00, 'Medium', 'White', NOW()),
--     (11,'Coffee', 'Premium hotel coffee', 500, 250, 125, 50, 15.00, 7.50, 'Bag', 'Brown', NOW()),
--     (12,'Tea', 'Premium hotel tea', 500, 250, 125, 50, 15.00, 7.50, 'Bag', 'Brown', NOW()),
--     (13,'Sugar', 'Hotel sugar sachets', 5000, 2500, 1250, 500, 5.00, 2.50, 'Sachet', 'White', NOW()),
--     (14,'Creamer', 'Hotel creamer sachets', 5000, 2500, 1250, 500, 5.00, 2.50, 'Sachet', 'White', NOW()),
--     (15,'Stirrers', 'Hotel stirrers', 1000, 500, 250, 100, 2.00, 1.00, 'Small', 'Wood', NOW()),
--     (16,'Cups', 'Disposable hotel cups', 1000, 500, 250, 100, 5.00, 2.50, 'Medium', 'White', NOW()),
--     (17,'Tea Towel', 'Absorbent cloth for drying dishes', 1000, 800, 200, 50, 1.50, 0.75, 'Medium', 'White', NOW()),
--     (18,'Hand Soap', 'Liquid soap for hand washing', 1500, 1000, 500, 100, 2.00, 1.00, 'Medium', 'Clear', NOW()),
--     (19,'Linen Napkin', 'Cloth napkin for dining', 2000, 1500, 500, 100, 0.50, 0.25, 'Medium', 'White', NOW()),
--     (20,'Bath Towel', 'Towel for drying after a bath', 2500, 2000, 500, 100, 4.00, 2.00, 'Large', 'White', NOW());

-- --stock photo
-- INSERT INTO purchasing.stock_photo (spho_id,spho_thumbnail_filename, spho_photo_filename, spho_primary, spho_url, spho_stock_id)
-- VALUES
-- (1,'Towel_thumbnail', 'Towel_photo', 1, 'www.hotel.com/Towel', 1),
-- (2,'Bed Linen_thumbnail', 'Bed Linen_photo', 1, 'www.hotel.com/BedLinen', 2),
-- (3,'Shampoo_thumbnail', 'Shampoo_photo', 1, 'www.hotel.com/Shampoo', 3),
-- (4,'Conditioner_thumbnail', 'Conditioner_photo', 1, 'www.hotel.com/Conditioner', 4),
-- (5,'Bathrobe_thumbnail', 'Bathrobe_photo', 1, 'www.hotel.com/Bathrobe', 5),
-- (6,'Slippers_thumbnail', 'Slippers_photo', 1, 'www.hotel.com/Slippers', 6),
-- (7,'Soap_thumbnail', 'Soap_photo', 1, 'www.hotel.com/Soap', 7),
-- (8,'Toothbrush_thumbnail', 'Toothbrush_photo', 1, 'www.hotel.com/Toothbrush', 8),
-- (9,'Toothpaste_thumbnail', 'Toothpaste_photo', 1, 'www.hotel.com/Toothpaste', 9),
-- (10,'Hair Dryer_thumbnail', 'Hair Dryer_photo', 1, 'www.hotel.com/HairDryer', 10),
-- (11,'Coffee_thumbnail', 'Coffee_photo', 1, 'www.hotel.com/Coffee', 11),
-- (12,'Tea_thumbnail', 'Tea_photo', 1, 'www.hotel.com/Tea', 12),
-- (13,'Sugar_thumbnail', 'Sugar_photo', 1, 'www.hotel.com/Sugar', 13),
-- (14,'Creamer_thumbnail', 'Creamer_photo', 1, 'www.hotel.com/Creamer', 14),
-- (15,'Stirrers_thumbnail', 'Stirrers_photo', 1, 'www.hotel.com/Stirrers', 15),
-- (16,'Cups_thumbnail', 'Cups_photo', 1, 'www.hotel.com/Cups', 16),
-- (17,'Tea Towel_thumbnail', 'Tea Towel_photo', 1, 'www.hotel.com/TeaTowel', 17),
-- (18,'Hand Soap_thumbnail', 'Hand Soap_photo', 1, 'www.hotel.com/HandSoap', 18),
-- (19,'Linen Napkin_thumbnail', 'Linen Napkin_photo', 1, 'www.hotel.com/LinenNapkin', 19),
-- (20,'Bath Towel_thumbnail', 'Bath Towel_photo', 1, 'www.hotel.com/BathTowel', 20);


-- --vendor
-- INSERT INTO purchasing.vendor (vendor_id,vendor_name, vendor_active, vendor_priority, vendor_register_date, vendor_weburl, vendor_modified_date)
-- VALUES
-- (1,'PT. Liquid Indonesia', 1, 1, '2022-01-01 00:00:00', 'www.liquidindonesia.com', '2022-01-01 00:00:00'),
-- (2,'PT. Shinzue Shampoo Indonesia', 1, 1, '2022-02-01 00:00:00', 'www.shinzueshampooindonesia.com', '2022-02-01 00:00:00'),
-- (3,'PT. Shinzue Conditioner Indonesia', 1, 0, '2022-03-01 00:00:00', 'www.shinzueconditionerindonesia.com', '2022-03-01 00:00:00'),
-- (4,'PT. Shinzue Hand Wash Indonesia', 1, 0, '2022-04-01 00:00:00', 'www.shinzuehandwashindonesia.com', '2022-04-01 00:00:00'),
-- (5,'PT. Shinzue Body Wash Indonesia', 1, 0, '2022-05-01 00:00:00', 'www.shinzuebodywashindonesia.com', '2022-05-01 00:00:00'),
-- (6,'PT. Dental Care Indonesia', 1, 0, '2022-06-01 00:00:00', 'www.dentalcareindonesia.com', '2022-06-01 00:00:00'),
-- (7,'PT. Toothpaste Indonesia', 1, 0, '2022-07-01 00:00:00', 'www.toothpasteindonesia.com', '2022-07-01 00:00:00'),
-- (8,'PT. Soft Towel Indonesia', 1, 1, '2022-08-01 00:00:00', 'www.softtowelindonesia.com', '2022-08-01 00:00:00'),
-- (9,'PT. Quick Dry Towel Indonesia', 1, 0, '2022-09-01 00:00:00', 'www.quickdrytowelindonesia.com', '2022-09-01 00:00:00'),
-- (10,'PT. Face Fresh Towel Indonesia', 1, 0, '2022-10-01 00:00:00', 'www.facefreshtowelindonesia.com', '2022-10-01 00:00:00'),
-- (11,'PT. Shinzue Shampoo Sachet Indonesia', 1, 0, '2022-11-01 00:00:00', 'www.shinzueshampoosachetindonesia.com', '2022-11-01 00:00:00'),
-- (12,'PT. Shinzue Conditioner Sachet Indonesia', 1, 0, '2022-12-01 00:00:00', 'www.shinzueconditionersachetindonesia.com', '2022-12-01 00:00:00'),
-- (13,'PT. Shinzue Soap Sachet Indonesia', 1, 0, '2023-01-01 00:00:00', 'www.shinzuesoapsachetindonesia.com', '2023-01-01 00:00:00'),
-- (14,'PT. Comfort Robe Indonesia', 1, 0, '2023-02-01 00:00:00', 'www.comfortrobeindonesia.com', '2023-02-01 00:00:00'),
-- (15,'PT. Cozy Slipper Indonesia', 1, 0, '2023-03-01 00:00:00', 'www.cozyslipperindonesia.com', '2023-03-01 00:00:00'),
-- (16,'PT. Tissue Master Indonesia', 1, 1, '2023-04-01 00:00:00', 'www.tissuemasterindonesia.com', '2023-04-01 00:00:00'),
-- (17,'PT. Clean Roll Indonesia', 1, 0, '2023-05-01 00:00:00', 'www.cleanrollindonesia.com', '2023-05-01 00:00:00'),
-- (18,'PT. Garbage Bag Indonesia', 1, 0, '2023-06-01 00:00:00', 'www.garbagebagindonesia.com', '2023-06-01 00:00:00'),
-- (19,'PT. Clean Wash Indonesia', 1, 0, '2023-07-01 00:00:00', 'www.cleanwashindonesia.com', '2023-07-01 00:00:00'),
-- (20,'PT. Fresh Fabric Indonesia', 1, 0, '2023-08-01 00:00:00', 'www.freshfabricindonesia.com', '2023-08-01 00:00:00');

-- --header
-- INSERT INTO purchasing.purchase_order_header (pohe_id,pohe_number, pohe_status, pohe_order_date, pohe_subtotal, pohe_tax, pohe_total_amount, pohe_refund, pohe_arrival_date, pohe_pay_type, pohe_emp_id, pohe_vendor_id)
-- VALUES
-- (1,'PO001', 2, '2022-12-01 12:00:00', 10000, 1000, 11000, 0, '2022-12-15 12:00:00', 'TR', 1, 1),
-- (2,'PO002', 1, '2022-12-02 12:00:00', 11000, 1100, 12100, 0, '2022-12-16 12:00:00', 'C', 2, 2),
-- (3,'PO003', 2, '2022-12-03 12:00:00', 12000, 1200, 13200, 0, '2022-12-17 12:00:00', 'TR', 3, 3),
-- (4,'PO004', 3, '2022-12-04 12:00:00', 13000, 1300, 14300, 0, '2022-12-18 12:00:00', 'C', 4, 4),
-- (5,'PO005', 4, '2022-12-05 12:00:00', 14000, 1400, 15400, 0, '2022-12-19 12:00:00', 'TR', 5, 5),
-- (6,'PO006', 1, '2022-12-06 12:00:00', 15000, 1500, 16500, 0, '2022-12-20 12:00:00', 'C', 6, 6),
-- (7,'PO007', 2, '2022-12-07 12:00:00', 16000, 1600, 17600, 0, '2022-12-21 12:00:00', 'TR', 7, 7),
-- (8,'PO008', 3, '2022-12-08 12:00:00', 17000, 1700, 18700, 0, '2022-12-22 12:00:00', 'C', 8, 8),
-- (9,'PO009', 4, '2022-12-09 12:00:00', 18000, 1800, 19800, 0, '2022-12-23 12:00:00', 'TR', 9, 9),
-- (10,'PO010', 1, '2022-12-10 12:00:00', 19000, 1900, 20900, 0, '2022-12-24 12:00:00', 'C', 10, 10),
-- (11,'PO011', 2, '2022-12-11 12:00:00', 20000, 2000, 22000, 0, '2022-12-25 12:00:00', 'TR', 11, 11),
-- (12,'PO012', 3, '2022-12-12 12:00:00', 21000, 2100, 23100, 0, '2022-12-26 12:00:00', 'C', 12, 12),
-- (13,'PO013', 4, '2022-12-13 12:00:00', 22000, 2200, 24200, 0, '2022-12-27 12:00:00', 'TR', 13, 13),
-- (14,'PO014', 1, '2022-12-14 12:00:00', 23000, 2300, 25300, 0, '2022-12-28 12:00:00', 'C', 14, 14),
-- (15,'PO015', 2, '2022-12-15 12:00:00', 24000, 2400, 26400, 0, '2022-12-29 12:00:00', 'TR', 15, 15),
-- (16,'PO016', 3, '2022-12-16 12:00:00', 25000, 2500, 27500, 0, '2022-12-30 12:00:00', 'C', 16, 16),
-- (17,'PO017', 4, '2022-12-17 12:00:00', 26000, 2600, 28600, 0, '2022-12-31 12:00:00', 'TR', 17, 17),
-- (18,'PO018', 1, '2022-12-18 12:00:00', 27000, 2700, 29700, 0, '2023-01-01 12:00:00', 'C', 18, 18),
-- (19,'PO019', 2, '2022-12-19 12:00:00', 28000, 2800, 30800, 0, '2023-01-02 12:00:00', 'TR', 19, 19),
-- (20,'PO020', 3, '2022-12-20 12:00:00', 29000, 2900, 31900, 0, '2023-01-03 12:00:00', 'C', 20, 20);

-- --detail
-- INSERT INTO purchasing.stock_detail (stod_stock_id, stod_barcode_number, stod_status, stod_notes, stod_faci_id, stod_pohe_id)
-- VALUES
-- (1, 'abcd1234', '1', 'Towel', 1, 1),
-- (2, 'efgh5678', '2', 'Bed', 2, 2),  
-- (3, 'ijkl9101', '3', 'Linen', 3, 3),
-- (4, 'mnop1213', '4', 'Shampoo', 4, 4),
-- (5, 'qrst1415', '1', 'Conditioner', 5, 5),
-- (6, 'uvwx1617', '2', 'Bathrobe', 6, 6),
-- (7, 'yzab1819', '3', 'Slippers', 7, 7),
-- (8, 'bcde2021', '4', 'Soap', 8, 8),
-- (9, 'cdef2223', '1', 'Toothbrush', 9, 9),
-- (10, 'defg2425', '2', 'Toothpaste', 10, 10),
-- (11, 'efgh2627', '3', 'Hair Dryer', 11, 11),
-- (12, 'fghi2829', '4', 'Coffee', 12, 12),
-- (13, 'ghij3031', '1', 'Tea', 13, 13),
-- (14, 'hijk3233', '2', 'Sugar', 14, 14),
-- (15, 'ijkl3435', '3', 'Creamer', 15, 15),
-- (16, 'jklm3637', '4', 'Stirrers', 16, 16),
-- (17, 'klmn3839', '1', 'Cups', 17, 17),
-- (18, 'lmno4041', '2', 'Tea Towel', 18, 18),
-- (19, 'mnop4243', '3', 'Hand Soap', 19, 19),
-- (20, 'nopq4445', '4', 'Linen Napkin', 20, 20);

-- --order detail
-- INSERT INTO purchasing.purchase_order_detail (pode_pohe_id, pode_id,pode_order_qty, pode_price, pode_line_total, pode_received_qty, pode_rejected_qty, pode_stocked_qty, pode_modified_date, pode_stock_id)
-- VALUES 
-- (1, 1,22, 175000, 3835000, 20, 2, 18, '2022-12-01 12:01:00', 1),
-- (2,2, 25, 230000, 5750000, 22, 3, 19, '2022-12-02 12:01:00', 2),
-- (3,3, 29, 195000, 565250, 28, 1, 27, '2022-12-03 12:01:00', 3),
-- (4,4, 35, 185000, 6477500, 34, 1, 33, '2022-12-04 12:01:00', 4),
-- (5,5, 33, 220000, 7260000, 32, 1, 31, '2022-12-05 12:01:00', 5),
-- (6,6, 30, 195000, 5855000, 29, 1, 28, '2022-12-06 12:01:00', 6),
-- (7,7, 31, 200000, 6200000, 30, 1, 29, '2022-12-07 12:01:00', 7),
-- (8,8, 28, 190000, 5272000, 27, 1, 26, '2022-12-08 12:01:00', 8),
-- (9,9, 36, 195000, 6970000, 35, 1, 34, '2022-12-09 12:01:00', 9),
-- (10,10, 27, 205000, 5513500, 26, 1, 25, '2022-12-10 12:01:00', 10),
-- (11,11, 22, 180000, 3960000, 21, 1, 20, '2022-12-11 12:01:00', 11),
-- (12,12, 25, 185000, 4637500, 24, 1, 23, '2022-12-12 12:01:00', 12),
-- (13,13, 29, 185000, 5361500, 28, 1, 27, '2022-12-13 12:01:00', 13),
-- (14,14, 32, 200000, 6400000, 31, 1, 30, '2022-12-14 12:01:00', 14),
-- (15,15, 24, 190000, 4536000, 23, 1, 22, '2022-12-15 12:01:00', 15),
-- (16,16, 26, 205000, 5330500, 25, 1, 24, '2022-12-16 12:01:00', 16),
-- (17,17, 30, 180000, 5400000, 29, 1, 28, '2022-12-17 12:01:00', 17),
-- (18,18, 32, 175000, 5602000, 31, 1, 30, '2022-12-18 12:01:00', 18),
-- (19,19, 25, 185000, 4637500, 24, 1, 23, '2022-12-19 12:01:00', 19),
-- (20,20, 28, 220000, 6160000, 27, 1, 26, '2022-12-20 12:01:00', 20);

-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
