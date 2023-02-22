import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Row, Col, Space, Input, Segmented, Button, Table, Form, Modal } from "antd"
import Buttons from "../Button"
import { useState } from "react";
import Link from "next/link";

const Employee = () => {
    const [value, setValue] = useState<string | number>('Active');
    const [open, setOpen] = useState(false)
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'empId',
            width: '10%'
        },
        {
            title: 'NationalId',
            dataIndex: 'nationalId',
            key: 'nationalId',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'name',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birthDate',
        },
        {
            title: 'Hire Date',
            dataIndex: 'hireDate',
            key: 'hireDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Link href={`/hr/${record.id}/${record.name}`}><EyeOutlined /></Link>
                    <Button className="border-none text-red-400" onClick={() => console.log(record.id)}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <div>
            <Modal title='Add Task' open={open} onCancel={() => setOpen(false)} footer={
                <div className="w-full flex gap-5 justify-end">
                    {/* <Buttons funcs={onClose} type='danger'>Cancel</Buttons>
                    <Buttons funcs={onClose}>Save</Buttons> */}
                </div>
            }>
                <Form.Item label='Department'>
                    <Input placeholder="Add department"/>
                </Form.Item>
            </Modal>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input className="w-96 py-2 rounded-full" placeholder="Department Name" prefix={<SearchOutlined />}/>
                    </Space>
                </Col>
                <Col>
                    <Space size={15}>
                        <Segmented options={['Active', 'Inactive']} value={value} onChange={setValue} />
                        <Buttons funcs={() => setOpen(true)}>Add</Buttons>
                    </Space>
                </Col>
            </Row>
            <Table columns={columns}/>

        </div>
    )
}

export default Employee