import { EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Row, Col, Space, DatePicker, Segmented, Input, Table, Button, Modal, Form } from "antd"
import Buttons from "../Button"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkOrder, getWorkOrder } from "@/Redux/Action/HR";
import { useRouter } from "next/router";

const WorkOrders = () => {
    const { RangePicker } = DatePicker
    const [date, setDate] = useState([])
    const [ filter, setFilter ] = useState<string | number>('OPEN')
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState('')
    const dispatch = useDispatch()
    const { data } = useSelector((state:any) => state.workorderReducer)
    const { getUser } = useSelector((state:any) => state.GetUserReducer)
    const router = useRouter()
    const filterBy = data.filter((item:any) => item.woroStatus == filter )

    const filterData = filterBy.filter((item:any) => {
        if (date.length == 0 || date[0] == '') {
          return item;
        } else {
          return new Date(item.woroStartDate) >= new Date(date[0]) && new Date(item.woroStartDate) <= new Date(date[1])
        }
    });

    useEffect(() => {
        dispatch(getWorkOrder())
    }, [])

    const routes = (id:number, date:any, status:any) => {
        router.push(
            { 
                pathname: 'hr/workorder/', 
                query: {
                    workorders: id,
                    date: date,
                    status: status
                }
            }, 'hr/workorder/'
        )
    }
    const columns = [
        {
            title: 'Work Order Date',
            key: 'woroStartDate',
            width: '20%',
            render: (_:any, record:any) => record.woroStartDate.split('T')[0]
        },
        {
            title: 'Status',
            dataIndex: 'woroStatus',
            key: 'woroStatus',
        },
        {
            title: 'Created by',
            key: 'userFullName',
            render: (_:any, record:any) => record.woroUser.userFullName
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (_:any, record:any) => (
                <Space size={10}>
                    <Button className="border-none text-blue-400" onClick={() => routes(record.woroId, record.woroStartDate.split('T')[0], record.woroStatus)}><EyeOutlined /></Button>
                </Space>
            )
        }
    ];

    const createWork = () => {
        const data = {
            userId: getUser[0].user_id,
            startDate: form,
            status: filter
        }
        dispatch(addWorkOrder(data))
        setForm('')
        setOpen(false)
    }

    return(
        <div>
            <Modal title={'Add Work Order'} open={open} closable={false} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={() => setOpen(false)} type='danger'>Cancel</Buttons>
                    <Buttons funcs={() => createWork()}>Save</Buttons>
                </div>
            }>
                <Form.Item label='Work Order Date'>
                    <DatePicker className="w-full" onChange={(dayjs, dateString) => setForm(dateString)}/>
                </Form.Item>
            </Modal>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <p>Filter Range Date</p>
                        <RangePicker onChange={(value, dateString:any) => setDate(dateString)}/>
                    </Space>
                </Col>
                <Col>
                    <Space size={15}>
                        <Segmented block options={['OPEN', 'CLOSED', 'CANCELLED']} value={filter} onChange={setFilter}/>
                        <Buttons funcs={() => setOpen(true)}>Add</Buttons>
                    </Space>
                </Col>
            </Row>
            <Table columns={columns} dataSource={filterData} pagination={{ position: ['bottomCenter'] }}/>
        </div>
    )
}

export default WorkOrders