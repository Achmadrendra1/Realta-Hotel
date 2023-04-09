import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from '../Controller/HR/employee/employee.controller';
import { PaymentTransactionController } from '../Controller/Payment/payment-transaction/payment-transaction.controller';
import { UserAccountController } from '../Controller/Payment/user-account/user-account.controller';
import { AppController } from '../Controller/app.controller';
import { EmployeeService } from '../Service/HR/employee/employee.service';
import { AppService } from '../service/app.service';
import { PaymentTransactionService } from '../Service/Payment/payment-transaction/payment-transaction.service';
import { UserAccountService } from '../Service/Payment/user-account/user-account.service';
import { Address } from '../entities/Address';
import { Bank } from '../entities/Bank';
import { BookingOrderDetail } from '../entities/BookingOrderDetail';
import { BookingOrderDetailExtra } from '../entities/BookingOrderDetailExtra';
import { BookingOrders } from '../entities/BookingOrders';
import { CategoryGroup } from '../entities/CategoryGroup';
import { Country } from '../entities/Country';
import { Employee } from '../entities/Employee';
import { EmployeeDepartmentHistory } from '../entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from '../entities/EmployeePayHistory';
import { Entitys } from '../entities/Entitys';
import { JobRole } from '../entities/JobRole';
import { Members } from '../entities/Members';
import { OrderMenuDetail } from '../entities/OrderMenuDetail';
import { OrderMenus } from '../entities/OrderMenus';
import { PaymentGateway } from '../entities/PaymentGateway';
import { PaymentTransaction } from '../entities/PaymentTransaction';
import { Policy } from '../entities/Policy';
import { PriceItems } from '../entities/PriceItems';
import { Proviences } from '../entities/Proviences';
import { Regions } from '../entities/Regions';
import { RestoMenuPhotos } from '../entities/RestoMenuPhotos';
import { RestoMenus } from '../entities/RestoMenus';
import { Roles } from '../entities/Roles';
import { ServiceTask } from '../entities/ServiceTask';
import { Shift } from '../entities/Shift';
import { SpecialOffers } from '../entities/SpecialOffers';
import { UserAccounts } from '../entities/UserAccounts';
import { UserBonusPoints } from '../entities/UserBonusPoints';
import { UserBreakfeast } from '../entities/UserBreakfeast';
import { UserMembers } from '../entities/UserMembers';
import { UserPassword } from '../entities/UserPassword';
import { UserProfiles } from '../entities/UserProfiles';
import { UserRoles } from '../entities/UserRoles';
import { Users } from '../entities/Users';
import { WorkOrderDetail } from '../entities/WorkOrderDetail';
import { WorkOrders } from '../entities/WorkOrders';
import { EntitysService } from '../Service/Payment/entitys/entitys.service';
import { BankService } from '../Service/Payment/bank/bank.service';
import { PaymentGatewayService } from '../Service/Payment/payment-gateway/payment-gateway.service';
import { EntitysController } from '../Controller/Payment/entitys/entitys.controller';
import { BankController } from '../Controller/Payment/bank/bank.controller';
import { PaymentGatewayController } from '../Controller/Payment/payment-gateway/payment-gateway.controller';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../auth.middleware';
import { RestoMenusController } from '../Controller/Resto/resto-menus/resto-menus.controller';
import { RestoMenuPhotosController } from '../Controller/Resto/resto-menu-photos/resto-menu-photos.controller';
import { OrderMenusController } from '../Controller/Resto/order-menus/order-menus.controller';
import { RestoMenusService } from '../Service/Resto/resto-menus/resto-menus.service';
import { RestoMenuPhotosService } from '../Service/Resto/resto-menu-photos/resto-menu-photos.service';
import { OrderMenusService } from '../Service/Resto/order-menus/order-menus.service';

//Hotel
import { Facilities } from '../entities/Facilities';
import { FacilityPriceHistory } from '../entities/FacilityPriceHistory';
import { FacilityPhoto } from '../entities/FacilityPhoto';
import { HotelReviews } from '../entities/HotelReviews';
import { Hotels } from '../entities/Hotels';

import { FacilityPriceHistoryService } from '../Service/Hotel/facility_price_history/facility_price_history.service';
import { HotelsService } from '../Service/Hotel/hotels/hotels.service';
import { HotelReviewsService } from '../Service/Hotel/hotel_reviews/hotel_reviews.service';
import { FacilitiesService } from '../Service/Hotel/facilities/facilities.service';
import { FacilityPhotosService } from '../Service/Hotel/facility_photos/facility_photos.service';

import { HotelsController } from '../Controller/Hotel/hotels/hotels.controller';
import { HotelReviewsController } from '../Controller/Hotel/hotel_reviews/hotel_reviews.controller';
import { FacilitiesController } from '../Controller/Hotel/facilities/facilities.controller';
import { FacilityPhotosController } from '../Controller/Hotel/facility_photos/facility_photos.controller';
import { FacilityPriceHistoryController } from '../Controller/Hotel/facility_price_history/facility_price_history.controller';

//master service
import { AddressService } from '../Service/Master/address/address.service';
import { CategoryGroupService } from '../Service/Master/category_group/category_group.service';
import { CountryService } from '../Service/Master/country/country.service';
import { MembersService } from '../Service/Master/members/members.service';
import { PolicyService } from '../Service/Master/policy/policy.service';
import { ProvincesService } from '../Service/Master/provinces/provinces.service';
import { RegionsService } from '../Service/Master/regions/regions.service';
import { ServiceTaskService } from '../Service/Master/service_task/service_task.service';
import { PriceItemsService } from '../Service/Master/price_items/price_items.service';

//master controller
import { AddressController } from '../Controller/Master/address/address.controller';
import { CategoryGroupController } from '../Controller/Master/category_group/category_group.controller';
import { CountryController } from '../Controller/Master/country/country.controller';
import { MembersController } from '../Controller/Master/members/members.controller';
import { PolicyController } from '../Controller/Master/policy/policy.controller';
import { ProvincesController } from '../Controller/Master/provinces/provinces.controller';
import { RegionsController } from '../Controller/Master/regions/regions.controller';
import { ServiceTaskController } from '../Controller/Master/service_task/service_task.controller';
import { PriceItemsController } from '../Controller/Master/price_items/price_items.controller';

import { RolesController } from '../Controller/Users/roles/roles.controller';
import { UsersController } from '../Controller/Users/users/users.controller';
import { UserRolesController } from '../Controller/Users/user-roles/user_roles.controller';
import { UserProfilesController } from '../Controller/Users/user-profiles/user-profiles.controller';
import { UserBonusPointsController } from '../Controller/Users/user-bonus-points/user-bonus-points.controller';
import { UsersService } from '../Service/Users/users/users.service';
import { UserBonusPointsService } from '../Service/Users/user-bonus-points/user-bonus-points.service';
import { UserProfilesService } from '../Service/Users/user-profiles/user-profiles.service';
import { RolesService } from '../Service/Users/roles/roles.service';
import { UserRolesService } from '../Service/Users/user-roles/user_roles.service';
import { AuthController } from '../Controller/Auth/auth.controller';
import { AuthService } from '../Service/Auth/auth.service';

// Purchasing Table
import { Stocks } from '../entities/Stocks';
import { StockDetail } from '../entities/StockDetail';
import { StockPhoto } from '../entities/StockPhoto';
import { Vendor } from '../entities/Vendor';
import { VendorProduct } from '../entities/VendorProduct';
import { PurchaseOrderHeader } from '../entities/PurchaseOrderHeader';
import { PurchaseOrderDetail } from '../entities/PurchaseOrderDetail';
// Purchasing Service
import { StockService } from '../service/Purchasing/stock/stock.service';
import { StodService } from '../Service/Purchasing/stock-detail/stock-detail.service';
import { SphoService } from '../service/Purchasing/stock-photo/stock-photo.service';
import { VendorService } from '../service/Purchasing/vendor/vendor.service';
import { VeproService } from '../Service/Purchasing/vendor-product/vendor-product.service';
import { PoheService } from '../Service/Purchasing/purchase-order-header/purchase-order-header.service';
import { PodeService } from '../Service/Purchasing/purchase-order-detail/purchase-order-detail.service';
// Purchasing Controller
import { StockController } from '../Controller/Purchasing/stock/stock.controller';
import { StodController } from '../Controller/Purchasing/stock-detail/stock-detail.controller';
import { SphoController } from '../Controller/Purchasing/stock-photo/stock-photo.controller';
import { VendorController } from '../Controller/Purchasing/vendor/vendor.controller';
import { VeproController } from '../Controller/Purchasing/vendor-product/vendor-product.controller';
import { PoheController } from '../Controller/Purchasing/purchase-order-header/purchase-order-header.controller';
import { PodeController } from '../Controller/Purchasing/purchase-order-detail/purchase-order-detail.controller';

import { DepartmentService } from '../Service/HR/department/department.service';
import { DepartmentController } from '../Controller/HR/department/department.controller';
import { PolicyCategoryGroup } from '../entities/PolicyCategoryGroup';
import { JobRoleController } from '../Controller/HR/job-role/job-role.controller';
import { JobRoleService } from '../Service/HR/job-role/job-role.service';
import { BookingOrderDetailController } from '../Controller/Booking/booking_order_detail/booking_order_detail.controller';
import { BookingOrderDetailExtraController } from '../Controller/Booking/booking-order-detail-extra/booking-order-detail-extra.controller';
import { BookingOrdersController } from '../Controller/Booking/booking_orders/booking_orders.controller';
import { SpecialOffersController } from '../Controller/Booking/special-offers/special-offers.controller';
import { UserBreakfeastController } from '../Controller/Booking/user-breakfeast/user-breakfeast.controller';
import { BookingOrdersService } from '../Service/Booking/booking_orders/booking_orders.service';
import { BookingOrderDetailService } from '../Service/Booking/booking_order_detail/booking_order_detail.service';
import { BookingOrderDetailExtraService } from '../Service/Booking/booking-order-detail-extra/booking-order-detail-extra.service';
import { SpecialOffersService } from '../Service/Booking/special-offers/special-offers.service';
import { UserBreakfeastService } from '../Service/Booking/user-breakfeast/user-breakfeast.service';
import { SpecialOfferCoupons } from '../entities/SpecialOfferCoupons';
import { UsersPasswordController } from '../Controller/Users/userPassword/userPassword.controller';
import { UserPasswordService } from '../Service/Users/user-password/userPassword.service';
import { WorkorderController } from '../Controller/HR/workorder/workorder.controller';
import { WorkorderService } from '../Service/HR/workorder/workorder.service';
import { RestoMenuDetailController } from '../Controller/Resto/resto-menu-detail/resto-menu-detail.controller';
import { ListRestaurantController } from '../Controller/Resto/list-restaurant/list-restaurant.controller';
import { OrderMenuDetailController } from '../Controller/Resto/order-menu-detail/order-menu-detail.controller';
import { RestoMenuDetailService } from '../Service/Resto/resto-menu-detail/resto-menu-detail.service';
import { ListRestaurantService } from '../Service/Resto/list-restaurant/list-restaurant.service';
import { OrderMenuDetailService } from '../Service/Resto/order-menu-detail/order-menu-detail.service';
import { Department } from '../entities/Department';
import { LandingController } from '../Controller/Hotel/facilities/landing.controller';

//Booking Service

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //master
      Address,
      CategoryGroup,
      Country,
      Members,
      Policy,
      Proviences,
      Regions,
      ServiceTask,
      PriceItems,
      PolicyCategoryGroup,

      Bank,
      Department,
      Employee,
      EmployeeDepartmentHistory,
      EmployeePayHistory,
      Entitys,

      //Hotel
      Facilities,
      FacilityPriceHistory,
      FacilityPhoto,
      HotelReviews,
      Hotels,

      //Booking
      BookingOrderDetail,
      BookingOrderDetailExtra,
      BookingOrders,
      SpecialOfferCoupons,
      SpecialOffers,
      UserBreakfeast,

      JobRole,
      PaymentGateway,
      PaymentTransaction,
      Shift,
      UserAccounts,

      // Restaurant
      OrderMenus,
      OrderMenuDetail,
      RestoMenus,
      RestoMenuPhotos,

      // Users
      UserBonusPoints,
      UserMembers,
      UserPassword,
      UserProfiles,
      UserRoles,
      Users,
      Roles,

      // Purchasing
      Stocks,
      StockDetail,
      StockPhoto,
      Vendor,
      VendorProduct,
      PurchaseOrderHeader,
      PurchaseOrderDetail,

      WorkOrderDetail,
      WorkOrders,
    ]),
  ],
  controllers: [
    AppController,

    //Payment
    EntitysController,
    BankController,
    PaymentGatewayController,
    PaymentTransactionController,
    UserAccountController,

    //Hotel
    FacilitiesController,
    FacilityPhotosController,
    FacilityPriceHistoryController,
    HotelsController,
    HotelReviewsController,
    RestoMenusController,
    RestoMenuPhotosController,
    OrderMenusController,
    LandingController,

    //Booking
    BookingOrderDetailController,
    BookingOrderDetailExtraController,
    BookingOrdersController,
    SpecialOffersController,
    UserBreakfeastController,

    //master
    ServiceTaskController,
    RegionsController,
    ProvincesController,
    PriceItemsController,
    PolicyController,
    MembersController,
    CountryController,
    CategoryGroupController,
    AddressController,

    //Users
    UsersController,
    UserRolesController,
    UserProfilesController,
    UserBonusPointsController,
    RolesController,
    AuthController,
    UsersPasswordController,

    // Purchasing
    StockController,
    StodController,
    SphoController,
    VendorController,
    VeproController,
    PoheController,
    PodeController,

    // HR
    EmployeeController,
    DepartmentController,
    JobRoleController,
    WorkorderController,

    // Resto

    RestoMenusController,
    RestoMenuPhotosController,
    OrderMenusController,
    RestoMenuDetailController,
    ListRestaurantController,
    OrderMenuDetailController,
  ],
  providers: [
    AppService,
    EntitysService,
    BankService,
    PaymentGatewayService,

    //Hotel
    FacilitiesService,
    FacilityPhotosService,
    FacilityPriceHistoryService,
    HotelsService,
    HotelReviewsService,

    //Booking
    BookingOrdersService,
    BookingOrderDetailService,
    BookingOrderDetailExtraService,
    SpecialOffersService,
    UserBreakfeastService,

    UserAccountService,
    PaymentTransactionService,
    RestoMenusService,
    RestoMenuPhotosService,
    OrderMenusService,
    PriceItemsService,
    ServiceTaskService,
    RegionsService,
    ProvincesService,
    PolicyService,
    MembersService,
    CountryService,
    CategoryGroupService,
    AddressService,

    // Users
    UsersService,
    UserBonusPointsService,
    UserProfilesService,
    RolesService,
    UserRolesService,
    AuthService,
    UserPasswordService,

    // Purchasing
    StockService,
    StodService,
    SphoService,
    VendorService,
    VeproService,
    PoheService,
    PodeService,

    // HR
    EmployeeService,
    DepartmentService,
    JobRoleService,
    WorkorderService,

    // Resto
    RestoMenusService,
    RestoMenuPhotosService,
    OrderMenusService,
    RestoMenuDetailService,
    ListRestaurantService,
    OrderMenuDetailService,
  ],
  // controllers: [AppController, EntitysController, BankController, PaymentGatewayController, UserAccountController, PaymentTransactionController],
  // providers: [AppService, EntitysService, BankService, PaymentGatewayService, UserAccountService, PaymentTransactionService],
})
export class GlobalModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      // ServiceTaskController,
      // RegionsController,
      // ProvincesController,
      // PriceItemsController,
      // PolicyController,
      // MembersController,
      // CountryController,
      // CategoryGroupController,
      // AddressController,
      StockController,
      StodController,
      SphoController,
      VendorController,
      VeproController,
      PoheController,
      PodeController,
      DepartmentController,
      JobRoleController,
      WorkorderController,
      EntitysController,
      BankController,
      PaymentGatewayController,
      // FacilitiesController,
      // FacilityPhotosController,
      // FacilityPriceHistoryController,
      // HotelsController,
      // HotelReviewsController,
      UserAccountController,
      PaymentTransactionController,
      UsersPasswordController,
      OrderMenusController,
    );
  }
}
