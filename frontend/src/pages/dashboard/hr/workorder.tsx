import { addWorkDetail, deleteWorkDetail, getServiceWork, getWorkDetail, updateWorkDetail } from "@/Redux/Action/HR"
import Buttons from "@/components/Button"
import Dashboard from "@/layouts/dashboard"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Col, Row, Card, Input, Space, Button, Table, Modal, Form, AutoComplete, Select } from "antd"
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
    const [del, setDel] = useState(false)
    const { workorders, date, status } = router.query
    const [form, setForm] = useState({
        wodeId: 0,
        empId: 1,
        task: '',
        notes: '',
        seta: 1
    })

    useEffect(() => {
        dispatch(getWorkDetail(workorders))
        dispatch(getServiceWork())
    }, [workorders])

    const onClose = () => {
        setOpen(false)
        setForm({
            empId: 1,
            task: '',
            notes: '',
            wodeId: ids,
            seta: 1
        })
        setId(0)
        setDel(false)
    }

    const addItems = () => {
        dispatch(addWorkDetail(form))
        onClose()
    }
    
    const updateItems = () => {
        dispatch(updateWorkDetail(form))
        onClose()
    }
    const onOpens = (item?:any) => {
        setOpen(true)
        item && setId(item.wodeId)
        const taskName = tasks.find((item:any) => item.value == form.seta)
        setForm({ ...form, 
            task: taskName.label,
            notes: item ? item.wodeNotes : '',
            wodeId: item ? item.wodeId : 0,
            empId: item ? item.wodeEmp?.empId : 1
        })
        setTitle(item ? 'Edit' : 'Add')
    }

    const modalDel = (id:any) => {
        setDel(true)
        setId(id)
    }

    const onDel = () => {
        dispatch(deleteWorkDetail(ids))
        setId(0)
        setDel(false)
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
            render: (_:any, record:any) => record?.wodeEmp?.empUser?.userFullName
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Button className="border-none text-blue-400" onClick={() => onOpens(record)}><EditOutlined /></Button>
                    <Button className="border-none text-red-400" onClick={() => modalDel(record.wodeId)}><DeleteOutlined /></Button>
                </Space>
            )
        }
    ];
    return(
        <Dashboard>
            <Modal title={'Warning'} open={del} closable={false}footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={onClose} type='danger'>Cancel</Buttons>
                    <Buttons funcs={onDel}>Save</Buttons>
                </div>
            }>
                <p>Are you sure for delete item&apos;s {ids}?</p>
            </Modal>
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
                        <Select options={tasks} value={form.seta} placeholder='Search Task'
                        onChange={value => setForm({ ...form, seta: value})}/>
                    </Form.Item>
                    <Form.Item label='Employee Name'>
                        <Select options={employee} value={form.empId} placeholder='Employee' 
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
                    <Card hoverable className="bg-[#252525]">
                        <Meta 
                        title={<h1 className="text-[#F2F1FA]">Work Order Date</h1>} 
                        description={<p className="text-[#F2F1FA]">{date}</p>} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable className="bg-[#252525]">
                        <Meta 
                        title={<h1 className="text-[#F2F1FA]">Status</h1>} 
                        description={<p className="text-[#F2F1FA]">{status}</p>} />
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