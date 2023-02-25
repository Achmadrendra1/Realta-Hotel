import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { Stocks } from "./Stocks";

@Index("purchase_order_detail_id_pk", ["podeId", "podePoheId"], {
  unique: true,
})
@Index("purchase_order_detail_pode_pohe_id_key", ["podePoheId"], {
  unique: true,
})
@Entity("purchase_order_detail", { schema: "purchasing" })
export class PurchaseOrderDetail {
  @Column("integer", { primary: true, name: "pode_pohe_id" })
  podePoheId: number;

  @PrimaryGeneratedColumn({ type: "integer", name: "pode_id" })
  podeId: number;

  @Column("smallint", { name: "pode_order_qty", nullable: true })
  podeOrderQty: number | null;

  @Column("money", { name: "pode_price", nullable: true })
  podePrice: string | null;

  @Column("money", { name: "pode_line_total", nullable: true })
  podeLineTotal: string | null;

  @Column("numeric", {
    name: "pode_received_qty",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  podeReceivedQty: string | null;

  @Column("numeric", {
    name: "pode_rejected_qty",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  podeRejectedQty: string | null;

  @Column("numeric", {
    name: "pode_stocked_qty",
    nullable: true,
    precision: 9,
    scale: 2,
  })
  podeStockedQty: string | null;

  @Column("timestamp without time zone", {
    name: "pode_modified_date",
    nullable: true,
  })
  podeModifiedDate: Date | null;

  @OneToOne(
    () => PurchaseOrderHeader,
    (purchaseOrderHeader) => purchaseOrderHeader.purchaseOrderDetail,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "pode_pohe_id", referencedColumnName: "poheId" }])
  podePohe: PurchaseOrderHeader;

  @ManyToOne(() => Stocks, (stocks) => stocks.purchaseOrderDetails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "pode_stock_id", referencedColumnName: "stockId" }])
  podeStock: Stocks;
}
