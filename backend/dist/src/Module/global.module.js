"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_controller_1 = require("../Controller/HR/employee/employee.controller");
const payment_transaction_controller_1 = require("../Controller/Payment/payment-transaction/payment-transaction.controller");
const user_account_controller_1 = require("../Controller/Payment/user-account/user-account.controller");
const app_controller_1 = require("../Controller/app.controller");
const employee_service_1 = require("../Service/HR/employee/employee.service");
const app_service_1 = require("../service/app.service");
const payment_transaction_service_1 = require("../Service/Payment/payment-transaction/payment-transaction.service");
const user_account_service_1 = require("../Service/Payment/user-account/user-account.service");
const Address_1 = require("../entities/Address");
const Bank_1 = require("../entities/Bank");
const BookingOrderDetail_1 = require("../entities/BookingOrderDetail");
const BookingOrderDetailExtra_1 = require("../entities/BookingOrderDetailExtra");
const BookingOrders_1 = require("../entities/BookingOrders");
const CategoryGroup_1 = require("../entities/CategoryGroup");
const Country_1 = require("../entities/Country");
const Employee_1 = require("../entities/Employee");
const EmployeeDepartmentHistory_1 = require("../entities/EmployeeDepartmentHistory");
const EmployeePayHistory_1 = require("../entities/EmployeePayHistory");
const Entitys_1 = require("../entities/Entitys");
const JobRole_1 = require("../entities/JobRole");
const Members_1 = require("../entities/Members");
const OrderMenuDetail_1 = require("../entities/OrderMenuDetail");
const OrderMenus_1 = require("../entities/OrderMenus");
const PaymentGateway_1 = require("../entities/PaymentGateway");
const PaymentTransaction_1 = require("../entities/PaymentTransaction");
const Policy_1 = require("../entities/Policy");
const PriceItems_1 = require("../entities/PriceItems");
const Proviences_1 = require("../entities/Proviences");
const Regions_1 = require("../entities/Regions");
const RestoMenuPhotos_1 = require("../entities/RestoMenuPhotos");
const RestoMenus_1 = require("../entities/RestoMenus");
const Roles_1 = require("../entities/Roles");
const ServiceTask_1 = require("../entities/ServiceTask");
const Shift_1 = require("../entities/Shift");
const SpecialOffers_1 = require("../entities/SpecialOffers");
const UserAccounts_1 = require("../entities/UserAccounts");
const UserBonusPoints_1 = require("../entities/UserBonusPoints");
const UserBreakfeast_1 = require("../entities/UserBreakfeast");
const UserMembers_1 = require("../entities/UserMembers");
const UserPassword_1 = require("../entities/UserPassword");
const UserProfiles_1 = require("../entities/UserProfiles");
const UserRoles_1 = require("../entities/UserRoles");
const Users_1 = require("../entities/Users");
const WorkOrderDetail_1 = require("../entities/WorkOrderDetail");
const WorkOrders_1 = require("../entities/WorkOrders");
const entitys_service_1 = require("../Service/Payment/entitys/entitys.service");
const bank_service_1 = require("../Service/Payment/bank/bank.service");
const payment_gateway_service_1 = require("../Service/Payment/payment-gateway/payment-gateway.service");
const entitys_controller_1 = require("../Controller/Payment/entitys/entitys.controller");
const bank_controller_1 = require("../Controller/Payment/bank/bank.controller");
const payment_gateway_controller_1 = require("../Controller/Payment/payment-gateway/payment-gateway.controller");
const auth_middleware_1 = require("../auth.middleware");
const resto_menus_controller_1 = require("../Controller/Resto/resto-menus/resto-menus.controller");
const resto_menu_photos_controller_1 = require("../Controller/Resto/resto-menu-photos/resto-menu-photos.controller");
const order_menus_controller_1 = require("../Controller/Resto/order-menus/order-menus.controller");
const resto_menus_service_1 = require("../Service/Resto/resto-menus/resto-menus.service");
const resto_menu_photos_service_1 = require("../Service/Resto/resto-menu-photos/resto-menu-photos.service");
const order_menus_service_1 = require("../Service/Resto/order-menus/order-menus.service");
const Facilities_1 = require("../entities/Facilities");
const FacilityPriceHistory_1 = require("../entities/FacilityPriceHistory");
const FacilityPhoto_1 = require("../entities/FacilityPhoto");
const HotelReviews_1 = require("../entities/HotelReviews");
const Hotels_1 = require("../entities/Hotels");
const facility_price_history_service_1 = require("../Service/Hotel/facility_price_history/facility_price_history.service");
const hotels_service_1 = require("../Service/Hotel/hotels/hotels.service");
const hotel_reviews_service_1 = require("../Service/Hotel/hotel_reviews/hotel_reviews.service");
const facilities_service_1 = require("../Service/Hotel/facilities/facilities.service");
const facility_photos_service_1 = require("../Service/Hotel/facility_photos/facility_photos.service");
const hotels_controller_1 = require("../Controller/Hotel/hotels/hotels.controller");
const hotel_reviews_controller_1 = require("../Controller/Hotel/hotel_reviews/hotel_reviews.controller");
const facilities_controller_1 = require("../Controller/Hotel/facilities/facilities.controller");
const facility_photos_controller_1 = require("../Controller/Hotel/facility_photos/facility_photos.controller");
const facility_price_history_controller_1 = require("../Controller/Hotel/facility_price_history/facility_price_history.controller");
const address_service_1 = require("../Service/Master/address/address.service");
const category_group_service_1 = require("../Service/Master/category_group/category_group.service");
const country_service_1 = require("../Service/Master/country/country.service");
const members_service_1 = require("../Service/Master/members/members.service");
const policy_service_1 = require("../Service/Master/policy/policy.service");
const provinces_service_1 = require("../Service/Master/provinces/provinces.service");
const regions_service_1 = require("../Service/Master/regions/regions.service");
const service_task_service_1 = require("../Service/Master/service_task/service_task.service");
const price_items_service_1 = require("../Service/Master/price_items/price_items.service");
const address_controller_1 = require("../Controller/Master/address/address.controller");
const category_group_controller_1 = require("../Controller/Master/category_group/category_group.controller");
const country_controller_1 = require("../Controller/Master/country/country.controller");
const members_controller_1 = require("../Controller/Master/members/members.controller");
const policy_controller_1 = require("../Controller/Master/policy/policy.controller");
const provinces_controller_1 = require("../Controller/Master/provinces/provinces.controller");
const regions_controller_1 = require("../Controller/Master/regions/regions.controller");
const service_task_controller_1 = require("../Controller/Master/service_task/service_task.controller");
const price_items_controller_1 = require("../Controller/Master/price_items/price_items.controller");
const roles_controller_1 = require("../Controller/Users/roles/roles.controller");
const users_controller_1 = require("../Controller/Users/users/users.controller");
const user_roles_controller_1 = require("../Controller/Users/user-roles/user_roles.controller");
const user_profiles_controller_1 = require("../Controller/Users/user-profiles/user-profiles.controller");
const user_bonus_points_controller_1 = require("../Controller/Users/user-bonus-points/user-bonus-points.controller");
const users_service_1 = require("../Service/Users/users/users.service");
const user_bonus_points_service_1 = require("../Service/Users/user-bonus-points/user-bonus-points.service");
const user_profiles_service_1 = require("../Service/Users/user-profiles/user-profiles.service");
const roles_service_1 = require("../Service/Users/roles/roles.service");
const user_roles_service_1 = require("../Service/Users/user-roles/user_roles.service");
const auth_controller_1 = require("../Controller/Auth/auth.controller");
const auth_service_1 = require("../Service/Auth/auth.service");
const Stocks_1 = require("../entities/Stocks");
const StockDetail_1 = require("../entities/StockDetail");
const StockPhoto_1 = require("../entities/StockPhoto");
const Vendor_1 = require("../entities/Vendor");
const VendorProduct_1 = require("../entities/VendorProduct");
const PurchaseOrderHeader_1 = require("../entities/PurchaseOrderHeader");
const PurchaseOrderDetail_1 = require("../entities/PurchaseOrderDetail");
const stock_service_1 = require("../service/Purchasing/stock/stock.service");
const stock_detail_service_1 = require("../Service/Purchasing/stock-detail/stock-detail.service");
const stock_photo_service_1 = require("../service/Purchasing/stock-photo/stock-photo.service");
const vendor_service_1 = require("../service/Purchasing/vendor/vendor.service");
const vendor_product_service_1 = require("../Service/Purchasing/vendor-product/vendor-product.service");
const purchase_order_header_service_1 = require("../Service/Purchasing/purchase-order-header/purchase-order-header.service");
const purchase_order_detail_service_1 = require("../Service/Purchasing/purchase-order-detail/purchase-order-detail.service");
const stock_controller_1 = require("../Controller/Purchasing/stock/stock.controller");
const stock_detail_controller_1 = require("../Controller/Purchasing/stock-detail/stock-detail.controller");
const stock_photo_controller_1 = require("../Controller/Purchasing/stock-photo/stock-photo.controller");
const vendor_controller_1 = require("../Controller/Purchasing/vendor/vendor.controller");
const vendor_product_controller_1 = require("../Controller/Purchasing/vendor-product/vendor-product.controller");
const purchase_order_header_controller_1 = require("../Controller/Purchasing/purchase-order-header/purchase-order-header.controller");
const purchase_order_detail_controller_1 = require("../Controller/Purchasing/purchase-order-detail/purchase-order-detail.controller");
const department_service_1 = require("../Service/HR/department/department.service");
const department_controller_1 = require("../Controller/HR/department/department.controller");
const PolicyCategoryGroup_1 = require("../entities/PolicyCategoryGroup");
const job_role_controller_1 = require("../Controller/HR/job-role/job-role.controller");
const job_role_service_1 = require("../Service/HR/job-role/job-role.service");
const booking_order_detail_controller_1 = require("../Controller/Booking/booking_order_detail/booking_order_detail.controller");
const booking_order_detail_extra_controller_1 = require("../Controller/Booking/booking-order-detail-extra/booking-order-detail-extra.controller");
const booking_orders_controller_1 = require("../Controller/Booking/booking_orders/booking_orders.controller");
const special_offers_controller_1 = require("../Controller/Booking/special-offers/special-offers.controller");
const user_breakfeast_controller_1 = require("../Controller/Booking/user-breakfeast/user-breakfeast.controller");
const booking_orders_service_1 = require("../Service/Booking/booking_orders/booking_orders.service");
const booking_order_detail_service_1 = require("../Service/Booking/booking_order_detail/booking_order_detail.service");
const booking_order_detail_extra_service_1 = require("../Service/Booking/booking-order-detail-extra/booking-order-detail-extra.service");
const special_offers_service_1 = require("../Service/Booking/special-offers/special-offers.service");
const user_breakfeast_service_1 = require("../Service/Booking/user-breakfeast/user-breakfeast.service");
const SpecialOfferCoupons_1 = require("../entities/SpecialOfferCoupons");
const userPassword_controller_1 = require("../Controller/Users/userPassword/userPassword.controller");
const userPassword_service_1 = require("../Service/Users/user-password/userPassword.service");
const workorder_controller_1 = require("../Controller/HR/workorder/workorder.controller");
const workorder_service_1 = require("../Service/HR/workorder/workorder.service");
const resto_menu_detail_controller_1 = require("../Controller/Resto/resto-menu-detail/resto-menu-detail.controller");
const list_restaurant_controller_1 = require("../Controller/Resto/list-restaurant/list-restaurant.controller");
const order_menu_detail_controller_1 = require("../Controller/Resto/order-menu-detail/order-menu-detail.controller");
const resto_menu_detail_service_1 = require("../Service/Resto/resto-menu-detail/resto-menu-detail.service");
const list_restaurant_service_1 = require("../Service/Resto/list-restaurant/list-restaurant.service");
const order_menu_detail_service_1 = require("../Service/Resto/order-menu-detail/order-menu-detail.service");
const Department_1 = require("../entities/Department");
const landing_controller_1 = require("../Controller/Hotel/facilities/landing.controller");
let GlobalModule = class GlobalModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(stock_controller_1.StockController, stock_detail_controller_1.StodController, stock_photo_controller_1.SphoController, vendor_controller_1.VendorController, vendor_product_controller_1.VeproController, purchase_order_header_controller_1.PoheController, purchase_order_detail_controller_1.PodeController, department_controller_1.DepartmentController, job_role_controller_1.JobRoleController, workorder_controller_1.WorkorderController, entitys_controller_1.EntitysController, bank_controller_1.BankController, payment_gateway_controller_1.PaymentGatewayController, user_account_controller_1.UserAccountController, payment_transaction_controller_1.PaymentTransactionController, userPassword_controller_1.UsersPasswordController, order_menus_controller_1.OrderMenusController);
    }
};
GlobalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Address_1.Address,
                CategoryGroup_1.CategoryGroup,
                Country_1.Country,
                Members_1.Members,
                Policy_1.Policy,
                Proviences_1.Proviences,
                Regions_1.Regions,
                ServiceTask_1.ServiceTask,
                PriceItems_1.PriceItems,
                PolicyCategoryGroup_1.PolicyCategoryGroup,
                Bank_1.Bank,
                Department_1.Department,
                Employee_1.Employee,
                EmployeeDepartmentHistory_1.EmployeeDepartmentHistory,
                EmployeePayHistory_1.EmployeePayHistory,
                Entitys_1.Entitys,
                Facilities_1.Facilities,
                FacilityPriceHistory_1.FacilityPriceHistory,
                FacilityPhoto_1.FacilityPhoto,
                HotelReviews_1.HotelReviews,
                Hotels_1.Hotels,
                BookingOrderDetail_1.BookingOrderDetail,
                BookingOrderDetailExtra_1.BookingOrderDetailExtra,
                BookingOrders_1.BookingOrders,
                SpecialOfferCoupons_1.SpecialOfferCoupons,
                SpecialOffers_1.SpecialOffers,
                UserBreakfeast_1.UserBreakfeast,
                JobRole_1.JobRole,
                PaymentGateway_1.PaymentGateway,
                PaymentTransaction_1.PaymentTransaction,
                Shift_1.Shift,
                UserAccounts_1.UserAccounts,
                OrderMenus_1.OrderMenus,
                OrderMenuDetail_1.OrderMenuDetail,
                RestoMenus_1.RestoMenus,
                RestoMenuPhotos_1.RestoMenuPhotos,
                UserBonusPoints_1.UserBonusPoints,
                UserMembers_1.UserMembers,
                UserPassword_1.UserPassword,
                UserProfiles_1.UserProfiles,
                UserRoles_1.UserRoles,
                Users_1.Users,
                Roles_1.Roles,
                Stocks_1.Stocks,
                StockDetail_1.StockDetail,
                StockPhoto_1.StockPhoto,
                Vendor_1.Vendor,
                VendorProduct_1.VendorProduct,
                PurchaseOrderHeader_1.PurchaseOrderHeader,
                PurchaseOrderDetail_1.PurchaseOrderDetail,
                WorkOrderDetail_1.WorkOrderDetail,
                WorkOrders_1.WorkOrders,
            ]),
        ],
        controllers: [
            app_controller_1.AppController,
            entitys_controller_1.EntitysController,
            bank_controller_1.BankController,
            payment_gateway_controller_1.PaymentGatewayController,
            payment_transaction_controller_1.PaymentTransactionController,
            user_account_controller_1.UserAccountController,
            facilities_controller_1.FacilitiesController,
            facility_photos_controller_1.FacilityPhotosController,
            facility_price_history_controller_1.FacilityPriceHistoryController,
            hotels_controller_1.HotelsController,
            hotel_reviews_controller_1.HotelReviewsController,
            resto_menus_controller_1.RestoMenusController,
            resto_menu_photos_controller_1.RestoMenuPhotosController,
            order_menus_controller_1.OrderMenusController,
            landing_controller_1.LandingController,
            booking_order_detail_controller_1.BookingOrderDetailController,
            booking_order_detail_extra_controller_1.BookingOrderDetailExtraController,
            booking_orders_controller_1.BookingOrdersController,
            special_offers_controller_1.SpecialOffersController,
            user_breakfeast_controller_1.UserBreakfeastController,
            service_task_controller_1.ServiceTaskController,
            regions_controller_1.RegionsController,
            provinces_controller_1.ProvincesController,
            price_items_controller_1.PriceItemsController,
            policy_controller_1.PolicyController,
            members_controller_1.MembersController,
            country_controller_1.CountryController,
            category_group_controller_1.CategoryGroupController,
            address_controller_1.AddressController,
            users_controller_1.UsersController,
            user_roles_controller_1.UserRolesController,
            user_profiles_controller_1.UserProfilesController,
            user_bonus_points_controller_1.UserBonusPointsController,
            roles_controller_1.RolesController,
            auth_controller_1.AuthController,
            userPassword_controller_1.UsersPasswordController,
            stock_controller_1.StockController,
            stock_detail_controller_1.StodController,
            stock_photo_controller_1.SphoController,
            vendor_controller_1.VendorController,
            vendor_product_controller_1.VeproController,
            purchase_order_header_controller_1.PoheController,
            purchase_order_detail_controller_1.PodeController,
            employee_controller_1.EmployeeController,
            department_controller_1.DepartmentController,
            job_role_controller_1.JobRoleController,
            workorder_controller_1.WorkorderController,
            resto_menus_controller_1.RestoMenusController,
            resto_menu_photos_controller_1.RestoMenuPhotosController,
            order_menus_controller_1.OrderMenusController,
            resto_menu_detail_controller_1.RestoMenuDetailController,
            list_restaurant_controller_1.ListRestaurantController,
            order_menu_detail_controller_1.OrderMenuDetailController,
        ],
        providers: [
            app_service_1.AppService,
            entitys_service_1.EntitysService,
            bank_service_1.BankService,
            payment_gateway_service_1.PaymentGatewayService,
            facilities_service_1.FacilitiesService,
            facility_photos_service_1.FacilityPhotosService,
            facility_price_history_service_1.FacilityPriceHistoryService,
            hotels_service_1.HotelsService,
            hotel_reviews_service_1.HotelReviewsService,
            booking_orders_service_1.BookingOrdersService,
            booking_order_detail_service_1.BookingOrderDetailService,
            booking_order_detail_extra_service_1.BookingOrderDetailExtraService,
            special_offers_service_1.SpecialOffersService,
            user_breakfeast_service_1.UserBreakfeastService,
            user_account_service_1.UserAccountService,
            payment_transaction_service_1.PaymentTransactionService,
            resto_menus_service_1.RestoMenusService,
            resto_menu_photos_service_1.RestoMenuPhotosService,
            order_menus_service_1.OrderMenusService,
            price_items_service_1.PriceItemsService,
            service_task_service_1.ServiceTaskService,
            regions_service_1.RegionsService,
            provinces_service_1.ProvincesService,
            policy_service_1.PolicyService,
            members_service_1.MembersService,
            country_service_1.CountryService,
            category_group_service_1.CategoryGroupService,
            address_service_1.AddressService,
            users_service_1.UsersService,
            user_bonus_points_service_1.UserBonusPointsService,
            user_profiles_service_1.UserProfilesService,
            roles_service_1.RolesService,
            user_roles_service_1.UserRolesService,
            auth_service_1.AuthService,
            userPassword_service_1.UserPasswordService,
            stock_service_1.StockService,
            stock_detail_service_1.StodService,
            stock_photo_service_1.SphoService,
            vendor_service_1.VendorService,
            vendor_product_service_1.VeproService,
            purchase_order_header_service_1.PoheService,
            purchase_order_detail_service_1.PodeService,
            employee_service_1.EmployeeService,
            department_service_1.DepartmentService,
            job_role_service_1.JobRoleService,
            workorder_service_1.WorkorderService,
            resto_menus_service_1.RestoMenusService,
            resto_menu_photos_service_1.RestoMenuPhotosService,
            order_menus_service_1.OrderMenusService,
            resto_menu_detail_service_1.RestoMenuDetailService,
            list_restaurant_service_1.ListRestaurantService,
            order_menu_detail_service_1.OrderMenuDetailService,
        ],
    })
], GlobalModule);
exports.GlobalModule = GlobalModule;
//# sourceMappingURL=global.module.js.map