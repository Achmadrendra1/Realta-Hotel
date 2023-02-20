-- Get Employee
create or replace function hr.empProfile()
returns table(
	id int,
	nationalId varchar(25),
	fullName varchar(55),
	birthDate date,
	hire timestamp,
	status smallint
)
as $$
begin 
	return query
	select 
		emp_id,
		emp_national_id,
		user_full_name,
		emp_birth_date,
		emp_hire_date,
		emp_current_flag
	from
		users.users u join hr.work_orders wo on wo.woro_user_id = u.user_id
		join hr.work_order_detail wod on wod.wode_woro_id = wo.woro_id
		join hr.employee emp on emp.emp_id = wod.wode_emp_id;
end; $$
language plpgsql

-- Detail Emp Profile
create or replace function hr.profileDetail(id int)
returns table(
	empId int,
	nation varchar(25),
	fullName varchar(55),
	birthDate date,
	marital varchar(11),
	gender varchar(1),
	salariedFlag varchar(1),
	status smallint,
	vacationHours smallint,
	sickleave smallint,
	photoUrl varchar(255),
	jobName varchar(55),
	salary money,
	frequentlyPay smallint,
	departmane varchar(50),
	deptStart timestamp,
	deptEnd timestamp,
	shifting varchar(25),
	shiftStart time,
	shiftEnd time
)
as $$
begin
	return query
	select
		emp_id,
		emp_national_id,
		user_full_name,
		emp_birth_date,
		emp_marital_status,
		emp_gender,
		emp_salaried_flag,
		emp_current_flag,
		emp_vacation_hours,
		emp_sickleave_hourse,
		emp_photo,
		joro_name,
		ephi_rate_salary,
		ephi_pay_frequence,
		dept_name,
		edhi_start_date,
		edhi_end_date,
		shift_name,
		shift_start_time,
		shift_end_time
	from
		users.users u join hr.work_orders wo on wo.woro_user_id = u.user_id
		join hr.work_order_detail wod on wod.wode_woro_id = wo.woro_id
		join hr.employee emp on emp.emp_id = wod.wode_emp_id
		join hr.employee_pay_history pay on emp.emp_id = pay.ephi_emp_id
		join hr.employee_department_history edh on emp.emp_id = edh.edhi_emp_id
		join hr.department dpt on edh.edhi_dept_id = dpt.dept_id
		join hr.shift sh on edh.edhi_shift_id = sh.shift_id
		join hr.job_role job on emp.emp_joro_id = job.joro_id
	where emp_id = id;
end; $$
language plpgsql
