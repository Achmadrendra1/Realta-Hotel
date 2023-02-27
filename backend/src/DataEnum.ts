export enum CagroType {
  'Category',
  'Service',
  'Facility',
}

export enum PritType {
  'Snack',
  'Facility',
  'SOFTDRINK',
  'FOOD',
  'SERVICE',
}

export enum FaciMeasureUnit {
  'People',
  'Beds',
}

export enum PrimaryPhoto {
  'Not Primary',
  'Primary',
}

export enum Rating {
  'Bad' = 1,
  'Less' = 2,
  'Cool' = 3,
  'Good' = 4,
  'Best' = 5,
}

export enum Member {
  'SILVER',
  'GOLD',
  'VIP',
  'WIZARD',
}

export enum UserType {
  'Travel Agent' = 'T',
  'Corporate' = 'C',
  'Individual' = 'I',
}

export enum BonusType {
  'Rating' = 'P',
  'Promote' = 'P',
}

export enum MaritalStatus {
  'Married' = 'M',
  'Single' = 'S',
}

export enum Gender {
  'Female' = 'F',
  'Male' = 'M',
}

export enum PayType {
  'Credit Card' = 'CR',
  'Cash' = 'C',
  'Debet' = 'D',
  'Payment Gateway' = 'PG',
  'Bill Checkout' = 'BO',
  'Transfer' = 'TR',
}

export enum IsPaid {
  'Down Payment' = 'DP',
  'Paid' = 'P',
  'Refund' = 'R',
  'Bill' = 'B',
}

export enum BookingStatus {
  'BOOKING',
  'CHECK IN',
  'CHECK OUT',
  'CLEANING',
  'CANCELLED',
}

export enum BookingMeasure {
  'PEOPLE',
  'UNIT',
  'Kg',
}

export enum MenuStatus {
  'Available',
  'Empty',
}

export enum TransactionType {
  'Top Up' = 'TP',
  'Transfer Booking' = 'TRB',
  'Re payment' = 'RPY',
  'Re fund' = 'RF',
  'Order Menu' = 'ORM',
}

export enum AccountType {
  'DEBET',
  'CREDIT CARD',
  'PAYMENT GATEWAY',
}

export enum WorkOrderStatus {
  'OPEN',
  'CLOSED',
  'CANCELLED',
  'INPROGRESS',
  'COMPLETED',
}

export enum SalariedFlag {
  'Hourly' = '0',
  'Salaried' = '1',
}

export enum CurrentFlag {
  'Inactive' = 0,
  'Active' = 1,
}

export enum PayFrequence {
  'Monthly' = 1,
  'Weekly' = 2,
}

export enum StockStatus {
  'Stocked' = 1,
  'Expired' = 2,
  'Broken' = 3,
  'Used' = 4,
}

export enum VendorStatus {
  'Inactive' = 0,
  'Active' = 1,
}

export enum VendorPriority {
  'No Priority' = 0,
  'Priority' = 1,
}

export enum PurchaseStatus {
  'Pending' = 1,
  'Approve' = 2,
  'Rejected' = 3,
  'Complete' = 4,
}
