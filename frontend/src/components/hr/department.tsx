import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Modal, Row, Space, Table } from "antd"
import Buttons from "../Button"
import { useState } from "react"

const Department = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState('')
    const [ids, setId] = useState(0)
    const onClose = () => {
        setOpen(false)
        setForm('')
        setId(0)
    }

    const dummy = [
        {
            id: 1,
            name: 'Humanresources'
        },
        {
            id: 2,
            name: 'Office boy'
        },
        {
            id: 3,
            name: 'Front Office'
        },
        {
            id: 4,
            name: 'Executive'
        },
        {
            id: 5,
            name: 'Receptionist'
        }
    ]
    
    const onOpens = (id?:any) => {
        setOpen(true)
        id && setId(id)
        const details = id ? dummy.find(item => item.id == id) : ''
        setForm(id ? details?.name : details)
    }

    const columns = [
        {
            title: 'No',
            key: 'index',
            render: (text:any, record:any, index:any) => index + 1,
            width: '10%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Button className="border-none text-blue-400" onClick={() => onOpens(record.id)}><EditOutlined /></Button>
                    <Button className="border-none text-red-400" onClick={() => console.log(record.id)}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <div>
            <Modal title='Add Task' open={open} closable={false} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={onClose} type='danger'>Cancel</Buttons>
                    <Buttons funcs={onClose}>Save</Buttons>
                </div>
            }>
                <Form.Item label='Department'>
                    <Input placeholder="Add department" value={form} onChange={e => setForm(e.target.value)}/>
                </Form.Item>
            </Modal>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input className="w-96 py-2 rounded-full" placeholder="Department Name" prefix={<SearchOutlined />}/>
                    </Space>
                </Col>
                <Col>
                    <Buttons funcs={onOpens}>Add</Buttons>
                </Col>
            </Row>
            <Table loading={dummy ? false : true} columns={columns} dataSource={dummy}/>
        </div>
    )
}

export default Department