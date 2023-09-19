import { PurchaseOrderDetail } from "./PurchaseOrderDetail";
import { Vendor } from "./Vendor";
import { StockDetail } from "./StockDetail";
export declare class PurchaseOrderHeader {
    poheId: number;
    poheNumber: string | null;
    poheStatus: number | null;
    poheOrderDate: Date | null;
    poheSubtotal: string | null;
    poheTax: string | null;
    poheTotalAmount: string | null;
    poheRefund: string | null;
    poheArrivalDate: Date | null;
    pohePayType: string | null;
    poheEmpId: number | null;
    purchaseOrderDetails: PurchaseOrderDetail[];
    poheVendor: Vendor;
    stockDetails: StockDetail[];
}
