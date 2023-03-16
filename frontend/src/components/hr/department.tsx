import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Modal, Row, Space, Table } from "antd"
import Buttons from "../Button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddDept, DeleteDept, GetDeptAll, UpdateDept } from "@/Redux/Action/HR"

const Department = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState('')
    const [ids, setId] = useState(0)
    const [titles, setTitle] = useState('Add')
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const { data } = useSelector((state:any) => state.DeptReducer)

    const filterData = data.filter((item:any) => {
        if (search === "") {
          return item;
        } else {
          return item.deptName.toLowerCase().includes(search.toLocaleLowerCase());
        }
    });

    useEffect(() => {
        dispatch(GetDeptAll())
    }, [])

    const onClose = () => {
        setOpen(false)
        setForm('')
        setId(0)
    }

    const addItems = () => {
        const data = {
            "name": form
        }
        dispatch(AddDept(data))
        setOpen(false)
    }
    
    const updateItems = () => {
        const data = {
            id: ids,
            name: form
        }
        dispatch(UpdateDept(data))
        setOpen(false)
    }
    const onOpens = (id?:any) => {
        setOpen(true)
        id && setId(id)
        const details = id ? data.find((item:any) => item.deptId == id) : ''
        setForm(id ? details?.deptName : details)
        setTitle(id ? 'Edit' : 'Add')
    }

    const submitsForm = (id?:any) => {
        id ? updateItems() : addItems()
    }

    const columns = [
        {
            title: 'Department ID',
            dataIndex: 'deptId',
            key: 'deptId',
            width: '15%',
        },
        {
            title: 'Name',
            dataIndex: 'deptName',
            key: 'deptName',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Button className="border-none text-blue-400" onClick={() => onOpens(record.deptId)}><EditOutlined /></Button>
                    <Button className="border-none text-red-400" onClick={() => dispatch(DeleteDept(record.deptId))}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <div>
            <Modal title={titles + ' Name'} open={open} closable={false} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={onClose} type='danger'>Cancel</Buttons>
                    <Buttons funcs={() => submitsForm(ids)}>Save</Buttons>
                </div>
            }>
                <Form.Item label='Department'>
                    <Input placeholder="Add department" value={form} onChange={e => setForm(e.target.value)}/>
                </Form.Item>
            </Modal>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input className="w-96 py-2 rounded" value={search} placeholder="Department Name" prefix={<SearchOutlined />} onChange={e => setSearch(e.target.value)}/>
                    </Space>
                </Col>
                <Col>
                    <Buttons funcs={() => onOpens()}>Add</Buttons>
                </Col>
            </Row>
            <Table loading={data ? false : true} columns={columns} dataSource={filterData.sort((a:any, b:any) => a.deptId - b.deptId)} pagination={{ position: ['bottomCenter'] }}/>
        </div>
    )
}

export default Department