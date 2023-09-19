import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { VendorProduct } from "./VendorProduct";
export declare class Vendor {
    vendorId: number;
    vendorName: string | null;
    vendorActive: number | null;
    vendorPriority: number | null;
    vendorRegisterDate: string | null;
    vendorWeburl: string | null;
    vendorModifiedDate: Date | null;
    purchaseOrderHeaders: PurchaseOrderHeader[];
    vendorProducts: VendorProduct[];
}
