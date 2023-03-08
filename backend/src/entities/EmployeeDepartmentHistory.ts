import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shift } from './Shift';
import { Department } from './Department';

@Index('employee_department_history_edhi_emp_id_key', ['edhiEmpId'], {
  unique: false,
})
@Index('pk_edhi_id', ['edhiId'], { unique: true })
@Entity('employee_department_history', { schema: 'hr' })
export class EmployeeDepartmentHistory {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'edhi_id' })
  edhiId: number;

  @Column('integer', { name: 'edhi_emp_id', nullable: true, unique: false })
  edhiEmpId: number | null;

  @Column('timestamp without time zone', {
    name: 'edhi_start_date',
    nullable: true,
  })
  edhiStartDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'edhi_end_date',
    nullable: true,
  })
  edhiEndDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'edhi_modified_date',
    nullable: true,
  })
  edhiModifiedDate: Date | null;

  @ManyToOne(
    () => Department,
    (department) => department.employeeDepartmentHistory,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'edhi_dept_id', referencedColumnName: 'deptId' }])
  edhiDept: Department;

  @ManyToOne(() => Shift, (shift) => shift.employeeDepartmentHistories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'edhi_shift_id', referencedColumnName: 'shiftId' }])
  edhiShift: Shift;
}
