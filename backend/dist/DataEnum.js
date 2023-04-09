"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseStatus = exports.VendorPriority = exports.VendorStatus = exports.StockStatus = exports.PayFrequence = exports.CurrentFlag = exports.SalariedFlag = exports.WorkOrderStatus = exports.AccountType = exports.TransactionType = exports.MenuStatus = exports.BookingMeasure = exports.BookingStatus = exports.IsPaid = exports.PayType = exports.Gender = exports.MaritalStatus = exports.BonusType = exports.UserType = exports.Member = exports.Rating = exports.PrimaryPhoto = exports.FaciMeasureUnit = exports.PritType = exports.CagroType = void 0;
var CagroType;
(function (CagroType) {
    CagroType[CagroType["Category"] = 0] = "Category";
    CagroType[CagroType["Service"] = 1] = "Service";
    CagroType[CagroType["Facility"] = 2] = "Facility";
})(CagroType = exports.CagroType || (exports.CagroType = {}));
var PritType;
(function (PritType) {
    PritType[PritType["Snack"] = 0] = "Snack";
    PritType[PritType["Facility"] = 1] = "Facility";
    PritType[PritType["SOFTDRINK"] = 2] = "SOFTDRINK";
    PritType[PritType["FOOD"] = 3] = "FOOD";
    PritType[PritType["SERVICE"] = 4] = "SERVICE";
})(PritType = exports.PritType || (exports.PritType = {}));
var FaciMeasureUnit;
(function (FaciMeasureUnit) {
    FaciMeasureUnit[FaciMeasureUnit["People"] = 0] = "People";
    FaciMeasureUnit[FaciMeasureUnit["Beds"] = 1] = "Beds";
})(FaciMeasureUnit = exports.FaciMeasureUnit || (exports.FaciMeasureUnit = {}));
var PrimaryPhoto;
(function (PrimaryPhoto) {
    PrimaryPhoto[PrimaryPhoto["Not Primary"] = 0] = "Not Primary";
    PrimaryPhoto[PrimaryPhoto["Primary"] = 1] = "Primary";
})(PrimaryPhoto = exports.PrimaryPhoto || (exports.PrimaryPhoto = {}));
var Rating;
(function (Rating) {
    Rating[Rating["Bad"] = 1] = "Bad";
    Rating[Rating["Less"] = 2] = "Less";
    Rating[Rating["Cool"] = 3] = "Cool";
    Rating[Rating["Good"] = 4] = "Good";
    Rating[Rating["Best"] = 5] = "Best";
})(Rating = exports.Rating || (exports.Rating = {}));
var Member;
(function (Member) {
    Member[Member["SILVER"] = 0] = "SILVER";
    Member[Member["GOLD"] = 1] = "GOLD";
    Member[Member["VIP"] = 2] = "VIP";
    Member[Member["WIZARD"] = 3] = "WIZARD";
})(Member = exports.Member || (exports.Member = {}));
var UserType;
(function (UserType) {
    UserType["Travel Agent"] = "T";
    UserType["Corporate"] = "C";
    UserType["Individual"] = "I";
})(UserType = exports.UserType || (exports.UserType = {}));
var BonusType;
(function (BonusType) {
    BonusType["Rating"] = "P";
    BonusType["Promote"] = "P";
})(BonusType = exports.BonusType || (exports.BonusType = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["Married"] = "M";
    MaritalStatus["Single"] = "S";
})(MaritalStatus = exports.MaritalStatus || (exports.MaritalStatus = {}));
var Gender;
(function (Gender) {
    Gender["Female"] = "F";
    Gender["Male"] = "M";
})(Gender = exports.Gender || (exports.Gender = {}));
var PayType;
(function (PayType) {
    PayType["Credit Card"] = "CR";
    PayType["Cash"] = "C";
    PayType["Debet"] = "D";
    PayType["Payment Gateway"] = "PG";
    PayType["Bill Checkout"] = "BO";
    PayType["Transfer"] = "TR";
})(PayType = exports.PayType || (exports.PayType = {}));
var IsPaid;
(function (IsPaid) {
    IsPaid["Down Payment"] = "DP";
    IsPaid["Paid"] = "P";
    IsPaid["Refund"] = "R";
    IsPaid["Bill"] = "B";
})(IsPaid = exports.IsPaid || (exports.IsPaid = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["BOOKING"] = 0] = "BOOKING";
    BookingStatus[BookingStatus["CHECK IN"] = 1] = "CHECK IN";
    BookingStatus[BookingStatus["CHECK OUT"] = 2] = "CHECK OUT";
    BookingStatus[BookingStatus["CLEANING"] = 3] = "CLEANING";
    BookingStatus[BookingStatus["CANCELLED"] = 4] = "CANCELLED";
})(BookingStatus = exports.BookingStatus || (exports.BookingStatus = {}));
var BookingMeasure;
(function (BookingMeasure) {
    BookingMeasure[BookingMeasure["PEOPLE"] = 0] = "PEOPLE";
    BookingMeasure[BookingMeasure["UNIT"] = 1] = "UNIT";
    BookingMeasure[BookingMeasure["Kg"] = 2] = "Kg";
})(BookingMeasure = exports.BookingMeasure || (exports.BookingMeasure = {}));
var MenuStatus;
(function (MenuStatus) {
    MenuStatus[MenuStatus["Available"] = 0] = "Available";
    MenuStatus[MenuStatus["Empty"] = 1] = "Empty";
})(MenuStatus = exports.MenuStatus || (exports.MenuStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["Top Up"] = "TP";
    TransactionType["Transfer Booking"] = "TRB";
    TransactionType["Re payment"] = "RPY";
    TransactionType["Re fund"] = "RF";
    TransactionType["Order Menu"] = "ORM";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var AccountType;
(function (AccountType) {
    AccountType[AccountType["DEBET"] = 0] = "DEBET";
    AccountType[AccountType["CREDIT CARD"] = 1] = "CREDIT CARD";
    AccountType[AccountType["PAYMENT GATEWAY"] = 2] = "PAYMENT GATEWAY";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var WorkOrderStatus;
(function (WorkOrderStatus) {
    WorkOrderStatus[WorkOrderStatus["OPEN"] = 0] = "OPEN";
    WorkOrderStatus[WorkOrderStatus["CLOSED"] = 1] = "CLOSED";
    WorkOrderStatus[WorkOrderStatus["CANCELLED"] = 2] = "CANCELLED";
    WorkOrderStatus[WorkOrderStatus["INPROGRESS"] = 3] = "INPROGRESS";
    WorkOrderStatus[WorkOrderStatus["COMPLETED"] = 4] = "COMPLETED";
})(WorkOrderStatus = exports.WorkOrderStatus || (exports.WorkOrderStatus = {}));
var SalariedFlag;
(function (SalariedFlag) {
    SalariedFlag["Hourly"] = "0";
    SalariedFlag["Salaried"] = "1";
})(SalariedFlag = exports.SalariedFlag || (exports.SalariedFlag = {}));
var CurrentFlag;
(function (CurrentFlag) {
    CurrentFlag[CurrentFlag["Inactive"] = 0] = "Inactive";
    CurrentFlag[CurrentFlag["Active"] = 1] = "Active";
})(CurrentFlag = exports.CurrentFlag || (exports.CurrentFlag = {}));
var PayFrequence;
(function (PayFrequence) {
    PayFrequence[PayFrequence["Monthly"] = 1] = "Monthly";
    PayFrequence[PayFrequence["Weekly"] = 2] = "Weekly";
})(PayFrequence = exports.PayFrequence || (exports.PayFrequence = {}));
var StockStatus;
(function (StockStatus) {
    StockStatus[StockStatus["Stocked"] = 1] = "Stocked";
    StockStatus[StockStatus["Expired"] = 2] = "Expired";
    StockStatus[StockStatus["Broken"] = 3] = "Broken";
    StockStatus[StockStatus["Used"] = 4] = "Used";
})(StockStatus = exports.StockStatus || (exports.StockStatus = {}));
var VendorStatus;
(function (VendorStatus) {
    VendorStatus[VendorStatus["Inactive"] = 0] = "Inactive";
    VendorStatus[VendorStatus["Active"] = 1] = "Active";
})(VendorStatus = exports.VendorStatus || (exports.VendorStatus = {}));
var VendorPriority;
(function (VendorPriority) {
    VendorPriority[VendorPriority["No Priority"] = 0] = "No Priority";
    VendorPriority[VendorPriority["Priority"] = 1] = "Priority";
})(VendorPriority = exports.VendorPriority || (exports.VendorPriority = {}));
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus[PurchaseStatus["Pending"] = 1] = "Pending";
    PurchaseStatus[PurchaseStatus["Approve"] = 2] = "Approve";
    PurchaseStatus[PurchaseStatus["Rejected"] = 3] = "Rejected";
    PurchaseStatus[PurchaseStatus["Complete"] = 4] = "Complete";
})(PurchaseStatus = exports.PurchaseStatus || (exports.PurchaseStatus = {}));
//# sourceMappingURL=DataEnum.js.map