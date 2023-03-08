import { DeleteOutlined, EyeOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons"
import { Row, Col, Space, Input, Segmented, Button, Table, Form, Modal, DatePicker, Select, Upload, message, Divider } from "antd"
import Buttons from "../Button"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, delEmployee, getEmpData, jobSelectItem } from "@/Redux/Action/HR";

const Employee = () => {
    const [value, setValue] = useState<string | number>('Active')
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [forms, setForms] = useState({
        fullName: '',
        nationalId: '',
        birthDate: '',
        marital: '',
        gender: '',
        salaryFlag: '',
        status: '0',
        image: [],
        jobId: '',
        salary: '',
        frequentlyPay: ''
    })
    const dispatch = useDispatch()
    const { employees } = useSelector((state:any) => state.employeesReducer)
    const { selectJob } = useSelector((state:any) => state.selectReducer)
    const datas = employees.filter((item:any) => item.empCurrentFlag == (value == 'Active' ? 1 : 0))
    const addCommas = (num:any) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num:any) => num.toString().replace(/[^0-9]/g, "");

    const filterData = datas.filter((item:any) => {
        if (search === "") {
          return item;
        } else {
          return item.empUser.userFullName.toLowerCase().includes(search.toLocaleLowerCase());
        }
    });

    useEffect(() => {
        dispatch(getEmpData())
        dispatch(jobSelectItem())
    }, [])

    const finish = () => {
        const body = new FormData();
        body.append('image', forms.image[0]);
        body.append('fullName', forms.fullName);
        body.append('nationalId', forms.nationalId);
        body.append('birthDate', forms.birthDate);
        body.append('marital', forms.marital);
        body.append('gender', forms.gender);
        body.append('status', forms.status);
        body.append('jobId', forms.jobId);
        body.append('salary', forms.salary);
        body.append('salaryFlag', forms.salaryFlag);
        body.append('frequentlyPay', forms.frequentlyPay);
        dispatch(addEmployee(body))
        setOpen(false)
        setForms({
            fullName: '',
            nationalId: '',
            birthDate: '',
            marital: '',
            gender: '',
            salaryFlag: '',
            status: '0',
            image: [],
            jobId: '',
            salary: '',
            frequentlyPay: ''
        })
    }
    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'empId',
            key: 'empId',
            width: '10%'
        },
        {
            title: 'NationalId',
            dataIndex: 'empNationalId',
            key: 'empNationalId',
        },
        {
            title: 'Full Name',
            render: (_:any, record:any) => record.empUser.userFullName,
            width: '20%'
        },
        {
            title: 'Birth Date',
            key: 'birthdate',
            render: (_:any, record:any) => {
                const birth = record.empBirthDate.split('T')
                return birth[0]
            }
        },
        {
            title: 'Hire Date',
            dataIndex: 'empHireDate',
            key: 'hire',
            render: (_:any, record:any) => {
                const hires = record.empHireDate.split('T')
                return hires[0]
            }
        },
        {
            title: 'Status',
            dataIndex: 'empCurrentFlag',
            key: 'status',
            render: (_:any, record:any) => record.empCurrentFlag == 0 ? 'Inactive' : 'Active'
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Link href={`/dashboard/hr/${record.empId}/${record.empUser.userFullName}`}><EyeOutlined /></Link>
                    <Button className="border-none text-red-400" onClick={() => dispatch(delEmployee(record.empUser.userId))}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <div>
            <Modal title='Add Employee' width={800} style={{ top: 50}} open={open} onCancel={() => setOpen(false)} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={() => setOpen(false)} type='danger'>Cancel</Buttons>
                    <Buttons funcs={finish}>Save</Buttons>
                </div>
            }>
                <Form className="py-3" layout="vertical">
                    <Row gutter={[32, 8]}>
                        <Col span={12}>
                            <Form.Item label='Full Name'>
                                <Input placeholder="Jhon Doe" onChange={e => {setForms({...forms, fullName: e.target.value})}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='National ID'>
                                <Input placeholder="34124XXXXXX" onChange={e => {setForms({...forms, nationalId: e.target.value})}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Birth Date'>
                                <DatePicker placeholder="YYYY-MM-DD" className="w-full" onChange={(daysjs, dateString) => {setForms({...forms, birthDate: dateString})}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Marital Status'>
                                <Select options={[
                                    {value: 'M', label: 'Married'},
                                    {value: 'S', label: 'Single'}
                                ]} defaultValue={'S'} onChange={value => {setForms({...forms, marital: value})}} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Gender'>
                                <Select options={[
                                    {value: 'F', label: 'Female'},
                                    {value: 'M', label: 'Male'}
                                ]} defaultValue={'F'} onChange={value => {setForms({...forms, gender: value})}} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Salary Frequence'>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Select className="w-full" options={[
                                            {value: '1', label: 'Monthly'},
                                            {value: '2', label: 'Weekly'}
                                        ]} defaultValue={'2'} onChange={value => {setForms({...forms, salaryFlag: value})}}/>
                                    </Col>
                                    <Col span={12}>
                                        <Select className="w-full" options={[
                                            {value: '1', label: 'Salaried'},
                                            {value: '0', label: 'Hourly'}
                                        ]} defaultValue='Salaried' onChange={value => {setForms({...forms, frequentlyPay: value})}}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Job'>
                                <Select options={selectJob} placeholder='Job Role' onChange={value => {setForms({...forms, jobId: value})}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Salary'>
                                <Input placeholder="xxx.xxx" prefix={'Rp'} value={addCommas(forms.salary)} onChange={e => {setForms({...forms, salary: removeNonNumeric(e.target.value)})}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Employee's Photo" htmlFor="upload">
                                <label htmlFor="upload">
                                    <p className="border py-1 rounded text-center">{"Employee's Photo"}</p>
                                </label>
                                <Input type="file" id="upload" style={{ display: 'none'}}
                                onChange={e => {setForms({...forms, image: [e.target.files[0]]})}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} className="flex items-center">
                            {
                                forms.image.length > 0 &&
                                <div className="w-full flex items-center gap-2 justify-between">
                                    <p className="text-gray-400">{forms.image[0]?.name}</p>
                                    <button className="text-red-400" onClick={() => setForms({...forms, image: []})}><DeleteOutlined /></button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input className="w-96 py-2 rounded" placeholder="Department Name" onChange={e => setSearch(e.target.value)} prefix={<SearchOutlined />}/>
                    </Space>
                </Col>
                <Col>
                    <Space size={15}>
                        <Segmented options={['Active', 'Inactive']} value={value} onChange={setValue} />
                        <Buttons funcs={() => setOpen(true)}>Add</Buttons>
                    </Space>
                </Col>
            </Row>
            <Table columns={columns} dataSource={search ? filterData : datas} pagination={{ position: ['bottomCenter'] }}/>

        </div>
    )
}

export default Employee