import { Column, Entity, Index } from "typeorm";

@Index("pk_ephi_id", ["ephiRateChangeDate"], { unique: true })
@Entity("employee_pay_history", { schema: "hr" })
export class EmployeePayHistory {
  @Column("integer", { name: "ephi_emp_id", nullable: true })
  ephiEmpId: number | null;

  @Column("timestamp without time zone", {
    primary: true,
    name: "ephi_rate_change_date",
  })
  ephiRateChangeDate: Date;

  @Column("money", { name: "ephi_rate_salary", nullable: true })
  ephiRateSalary: string | null;

  @Column("smallint", { name: "ephi_pay_frequence", nullable: true })
  ephiPayFrequence: number | null;

  @Column("timestamp without time zone", {
    name: "ephi_modified_date",
    nullable: true,
  })
  ephiModifiedDate: Date | null;
}
