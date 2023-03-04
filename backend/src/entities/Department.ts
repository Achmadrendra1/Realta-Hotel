import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('department_pkey', ['deptId'], { unique: true })
@Entity('department', { schema: 'hr' })
export class Department {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'dept_id' })
  deptId: number;

  @Column('character varying', {
    name: 'dept_name',
    nullable: true,
    length: 50,
  })
  deptName: string | null;

  @Column('timestamp without time zone', {
    name: 'dept_modified_date',
    nullable: true,
  })
  deptModifiedDate: Date | null;
}
