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
	hireDate timestamp,
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
		emp_hire_date,
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

-- Get emp id
create or replace function hr.getId()
returns int
as $$
begin 
	return (
		select setval('hr."employee_emp_id_seq"',
					 (select coalesce(max(emp_id), 0) from hr.employee) + 1
					 )
	);
end; $$
language plpgsql

-- Get woro id
create or replace function hr.woId()
returns int
as $$
begin 
	return (
		select setval('hr."work_orders_woro_id_seq"',
					 (select coalesce(max(woro_id), 0) from hr.work_orders) + 1
					 )
	);
end; $$
language plpgsql

-- User id
create or replace function users.users()
returns int
as $$
begin 
	return (
		select setval('users."users_user_id_seq"',
					 (select coalesce(max(user_id), 0) from users.users) + 1
					 )
	);
end; $$
language plpgsql

-- Wode id
create or replace function hr.wodeId()
returns int
as $$
begin 
	return (
		select setval('hr."work_order_detail_wode_id_seq"',
					 (select coalesce(max(wode_id), 0) from hr.work_order_detail) + 1
					 )
	);
end; $$
language plpgsql

-- Stored procedure insert emp
create or replace procedure hr.addEmployee(
	fullName character varying,
	photoUrl character varying,
	nationalId character varying,
	birthDate date,
	hireDate date,
	marital character varying,
	gender character varying,
	salariedFlag character varying,
	status int,
	vacation int,
	sick int,
	jobId int,
	salary int,
	frequentlyPay int,
	departmentId int,
	startDept date,
	shiftId int,
	bosId int
)
language plpgsql
as $$
declare
	id_user int;
	id_work int;
	id_wode int;
	id_emp int;

begin 
	id_user := users.users();
	id_work := hr.woId();
	id_emp := hr.getId();
	id_wode := hr.wodeId();
	
	insert into users.users(
		user_full_name,
		user_type
	)values (
		fullName,
		'C'
	);
	
	insert into hr.work_orders(
		woro_id,
		woro_start_date,
		woro_status,
		woro_user_id
	) values (
		id_work,
		now(),
		'OPEN',
		id_user
	);
	
	insert into hr.employee(
		emp_id,
		emp_national_id,
		emp_birth_date,
		emp_marital_status,
		emp_gender,
		emp_hire_date,
		emp_salaried_flag,
		emp_vacation_hours,
		emp_sickleave_hourse,
		emp_current_flag,
		emp_photo,
		emp_joro_id,
		emp_emp_id,
		emp_modified_date
	)values(
		id_emp,
		nationalId,
		birthDate,
		marital,
		gender,
		hireDate,
		salariedFlag,
		vacation,
		sick,
		status,
		photoUrl,
		jobId,
		bosId,
		now()
	);
	
	insert into hr.work_order_detail(
		wode_id,
		wode_emp_id,
		wode_woro_id
	)values (id_wode, id_emp, id_work);
	
	insert into hr.employee_pay_history(
		ephi_emp_id,
		ephi_rate_change_date,
		ephi_rate_salary,
		ephi_pay_frequence,
		ephi_modified_date
	) values(
		id_emp,
		now(),
		salary,
		frequentlyPay,
		now()
	);
	
	insert into hr.employee_department_history(
		edhi_emp_id,
		edhi_start_date,
		edhi_modified_date,
		edhi_dept_id,
		edhi_shift_id
	) values(
		id_emp,
		startDept,
		now(),
		departmentId,
		shiftId
	);
	commit;
end; $$

call hr.addEmployee('jhon'::character varying, '/'::character varying, 'IDN'::character varying, '2000-10-15'::date, '2023-10-15'::date, 'S'::character varying, 'M'::character varying, '0', 1, 4, 5, 9, 5000000, 1, 9, '2023-10-15'::date, 1, 1 );

-- Update
create or replace procedure hr.updateEmp(
	userId int,
	empId int,
	fullName character varying,
	nationalId character varying,
	birthDate date,
	hireDate timestamp,
	marital character varying,
	gender character varying,
	salariedFlag character varying,
	status int,
	vacation int,
	sick int,
	jobId int,
	salary int,
	frequentlyPay int,
	departmentId int,
	startDept date,
	endDept date,
	shiftId int
)
language plpgsql
as $$
begin
	update users.users
		set 
			user_full_name = fullName,
			user_modified_date = now()
		where user_id = userId;
	
	update hr.employee
		set
			emp_national_id = nationalId,
			emp_birth_date = birthDate,
			emp_marital_status = marital,
			emp_gender = gender,
			emp_hire_date = hireDate,
			emp_salaried_flag = salariedFlag,
			emp_vacation_hours = vacation,
			emp_sickleave_hourse = sick,
			emp_current_flag = status,
			emp_joro_id	= jobId,
			emp_modified_date = now()
		where emp_id = empId;
		
	update hr.employee_department_history
		set
			edhi_start_date = startDept,
			edhi_end_date = endDept,
			edhi_shift_id = shiftId,
			edhi_dept_id = departmentId,
			edhi_modified_date = now()
		where edhi_emp_id = empId;
	
	update hr.employee_pay_history
		set
			ephi_rate_salary = salary,
			ephi_pay_frequence = frequentlyPay,
			ephi_modified_date = now()
		where ephi_emp_id = empId;
end; $$

call hr.updateEmp(24, 22, 'Jhon doe'::character varying, 'IDN'::character varying, '2000-10-15'::date, '2023-12-15'::date, 'S'::character varying, 'M'::character varying, '0'::character varying, 1, 4, 5, 9, 4500000, 1, 9, '2023-12-15'::date, '2025-12-15'::date, 1)
