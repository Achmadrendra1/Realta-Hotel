import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Row, Col, Space, Input, Segmented, Button, Table, Form, Modal, DatePicker, Select } from "antd"
import Buttons from "../Button"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getEmpData } from "@/Redux/Action/HR";

const Employee = () => {
    const [value, setValue] = useState<string | number>('Active');
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [forms, setForms] = useState({
        fullName: '',
        nationalId: '',
        birthDate: '',
        marital: '',
        gender: '',
        salaryFlag: '',
        status: 0,
        photo: '',
        jobId: 0,
    })
    const dispatch = useDispatch()
    const { employees } = useSelector((state:any) => state.employeesReducer)
    const datas = employees.filter((item:any) => item.status == (value == 'Active' ? 1 : 0))

    const filterData = datas.filter((item:any) => {
        if (search === "") {
          return item;
        } else {
          return item.fullname.toLowerCase().includes(search.toLocaleLowerCase());
        }
    });

    useEffect(() => {
        dispatch(getEmpData())
    }, [])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '10%'
        },
        {
            title: 'NationalId',
            dataIndex: 'nationalid',
            key: 'nationalid',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
            width: '20%'
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthdate',
            key: 'birthdate',
            render: (_:any, record:any) => {
                const birth = record.birthdate.split('T')
                return birth[0]
            }
        },
        {
            title: 'Hire Date',
            dataIndex: 'hire',
            key: 'hire',
            render: (_:any, record:any) => {
                const hires = record.hire.split('T')
                return hires[0]
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_:any, record:any) => record.status == 0 ? 'Inactive' : 'Active'
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Link href={`/dashboard/hr/${record.id}/${record.fullname}`}><EyeOutlined /></Link>
                    <Button className="border-none text-red-400" onClick={() => console.log(record.id)}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <div>
            <Modal title='Add Employee' width={800} open={open} onCancel={() => setOpen(false)} footer={
                <div className="w-full flex gap-5 justify-end">
                    {/* <Buttons funcs={onClose} type='danger'>Cancel</Buttons>
                    <Buttons funcs={onClose}>Save</Buttons> */}
                </div>
            }>
                <Form className="py-3" layout="vertical">
                    <Row gutter={[32, 8]}>
                        <Col span={12}>
                            <Form.Item label='Full Name'>
                                <Input placeholder="Jhon Doe"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='National ID'>
                                <Input placeholder="34124XXXXXX"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Birth Date'>
                                <DatePicker placeholder="YYYY-MM-DD" className="w-full"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Marital Status'>
                                <Select options={[
                                    {value: 'M', label: 'Married'},
                                    {value: 'S', label: 'Single'}
                                ]} value='Single' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input className="w-96 py-2 rounded-full" placeholder="Department Name" onChange={e => setSearch(e.target.value)} prefix={<SearchOutlined />}/>
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