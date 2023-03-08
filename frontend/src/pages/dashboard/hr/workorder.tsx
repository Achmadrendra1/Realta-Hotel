import { getServiceWork, getWorkDetail } from "@/Redux/Action/HR"
import Buttons from "@/components/Button"
import Dashboard from "@/layouts/dashboard"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Col, Row, Card, Input, Space, Button, Table, Modal, Form, AutoComplete } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const WorkDetail = () => {
    const router = useRouter()
    const { Meta } = Card;
    const { TextArea } = Input;
    const dispatch = useDispatch()
    const { data } = useSelector((state:any) => state.workorderDetailReducer)
    const { tasks, employee } = useSelector((state:any) => state.serviceListReducer)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [ids, setId] = useState(0)
    const [titles, setTitle] = useState('Add')
    const { workorders, date, status } = router.query
    const [form, setForm] = useState({
        empId: '',
        service: '',
        notes: '',
    })

    useEffect(() => {
        dispatch(getWorkDetail(workorders))
        dispatch(getServiceWork())
    }, [workorders])

    const addItems = () => {
        setOpen(false)
    }
    
    const updateItems = () => {
        setOpen(false)
    }
    const onOpens = (item?:any) => {
        setOpen(true)
        item && setId(item.wodeId)
        setForm({
            empId: item ? item.wodeEmp.empId : '',
            service: item ? item.wodeTaskName : '',
            notes: item ? item.wodeNotes : '',
        })
        setTitle(item ? 'Edit' : 'Add')
    }
    const onClose = () => {
        setOpen(false)
        setForm({
            empId: '',
            service: '',
            notes: '',
        })
        setId(0)
    }

    const columns = [
        {
            title: 'Work Order ID',
            key: 'wodeId',
            render: (_:any, record:any) => record.wodeId
        },
        {
            title: 'Task Name',
            key: 'wodeTaskName',
            dataIndex: 'wodeTaskName',
        },
        {
            title: 'Notes',
            key: 'wodeNotes',
            dataIndex: 'wodeNotes',
        },
        {
            title: 'Status',
            dataIndex: 'wodeStatus',
            key: 'wodeStatus',
        },
        {
            title: 'Assign to',
            key: 'empId',
            render: (_:any, record:any) => record.wodeEmp.empUser.userFullName
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Button className="border-none text-blue-400" onClick={() => onOpens(record)}><EditOutlined /></Button>
                    <Button className="border-none text-red-400" onClick={() => console.log(record.wodeId)}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <Dashboard>
            <Modal title={titles + ' Work Order'} open={open} closable={false} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={onClose} type='danger'>Cancel</Buttons>
                    <Buttons funcs={() => ids ? updateItems() : addItems()}>Save</Buttons>
                </div>
            }>
                <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                >
                    <Form.Item label='Task Name'>
                        <AutoComplete options={tasks} value={form.service} placeholder='Search Task'
                        onChange={value => setForm({ ...form, service: value})}/>
                    </Form.Item>
                    <Form.Item label='Employee Name'>
                        <AutoComplete options={employee} value={form.empId} placeholder='Employee' 
                        onChange={value => setForm({ ...form, empId: value})}/>
                    </Form.Item>
                    <Form.Item label='Note'>
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} value={form.notes} placeholder="Notes..." onChange={e => setForm({ ...form, notes: e.target.value})}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Link href={'/dashboard/hr'}><ArrowLeftOutlined /> Back</Link>
            <Row gutter={32} className="my-5">
                <Col span={6}>
                    <Card hoverable className="bg-[#F2F1FA]">
                        <Meta title="Work Order Date" description={date} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable className="bg-[#F2F1FA]">
                        <Meta title="Status" description={status} />
                    </Card>
                </Col>
            </Row>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input className="w-96 py-2 rounded" placeholder="Task Name" onChange={e => setSearch(e.target.value)} prefix={<SearchOutlined />}/>
                    </Space>
                </Col>
                <Col>
                    <Space size={15}>
                        <Buttons funcs={() => onOpens()}>Add</Buttons>
                    </Space>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }}/>
        </Dashboard>
    )
}

export default WorkDetail;