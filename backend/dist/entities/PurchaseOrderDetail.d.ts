import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { Stocks } from "./Stocks";
export declare class PurchaseOrderDetail {
    podePoheId: number;
    podeId: number;
    podeOrderQty: number | null;
    podePrice: string | null;
    podeLineTotal: string | null;
    podeReceivedQty: string | null;
    podeRejectedQty: string | null;
    podeStockedQty: string | null;
    podeModifiedDate: Date | null;
    podePohe: PurchaseOrderHeader;
    podeStock: Stocks;
}
