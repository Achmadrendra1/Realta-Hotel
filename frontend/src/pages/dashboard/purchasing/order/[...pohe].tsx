import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Descriptions, Table, Tooltip, Modal } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Dashboard from '@/layouts/dashboard';
import { AllPode, AllPohe, DelPode } from '@/Redux/Action/Purchasing/purchasingAction';
import EditPodes from '../edit-pode';

export default function Pode() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { podes } = useSelector((state: any) => state.PodeReducer)
    const { pohes } = useSelector((state: any) => state.PoheReducer)
    const [id, setId] = useState(0)
    const [updatePode, setUpdatePode] = useState(false)

    const { id_pohe } = router.query
    const data = pohes.find((item: any) => item.pove_id == id_pohe)

    const dataPode = podes.filter((item: any) => item.podhe_pohe_number == data.pove_number)
    const dataTable = dataPode.length > 0 ? dataPode : []

    const handleOk = () => {
        setTimeout(() => {
            setUpdatePode(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log("Clicked cancel button")
        setUpdatePode(false)
    }

    const handleClose = (data: boolean) => {
        setUpdatePode(data)
    }

    const { confirm } = Modal
    const showDeleteConfirm = (id: number, name: string) => {
        confirm({
            title: `Are you sure delete this ${name}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log(id)
                dispatch(DelPode(id))
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    const editPode = (id: number) => {
        setUpdatePode(true)
        setId(id)
    }

    useEffect(() => {
        dispatch(AllPode())
        dispatch(AllPohe())
    }, [])

    const columnsPode = [
        {
            title: 'Stock Name',
            dataIndex: 'podhe_stock_name',
            sorter: {
                compare: (a: any, b: any) => a.podhe_stock_name < b.podhe_stock_name ? -1 : 1
            }
        },
        {
            title: 'Qty',
            dataIndex: 'podhe_order_qty',
            sorter: {
                compare: (a: any, b: any) => a.podhe_order_qty - b.podhe_order_qty
            }
        },
        {
            title: 'Price',
            dataIndex: 'podhe_price',
            sorter: {
                compare: (a: any, b: any) => a.podhe_price - b.podhe_price
            }
        },
        {
            title: 'Received Qty',
            dataIndex: 'podhe_received_qty',
            sorter: {
                compare: (a: any, b: any) => a.podhe_received_qty - b.podhe_received_qty
            }
        },
        {
            title: 'Rejected Qty',
            dataIndex: 'podhe_rejected_qty',
            sorter: {
                compare: (a: any, b: any) => a.podhe_rejected_qty - b.podhe_rejected_qty
            }
        },
        {
            title: 'Total',
            dataIndex: 'podhe_line_total',
            sorter: {
                compare: (a: any, b: any) => a.podhe_line_total - b.podhe_line_total
            }
        },
        {
            title: 'Action',
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Switch Status'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editPode(record.podhe_id)} className="mx-2" />
                        </Tooltip>
                        <Tooltip placement="top" title='Delete'>
                            <DeleteOutlined style={{ color: 'red' }} onClick={() => showDeleteConfirm(record.podhe_id, record.podhe_stock_name)} className="mx-2" />
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    return (
        <Dashboard>
            {updatePode ?
                <EditPodes
                    data={podes}
                    id={id}
                    show={updatePode}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            <Link href={'/dashboard/purchasing'}><ArrowLeftOutlined /> Back</Link>

            <Descriptions
                className='my-5 mx-2'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="PO Number">{data?.pove_number}</Descriptions.Item>
                <Descriptions.Item label="Vendor" >{data?.pove_name}</Descriptions.Item>
                <Descriptions.Item label="Subtotal" span={3}>{data?.pove_subtotal}</Descriptions.Item>
                <Descriptions.Item label="PO Date">{data?.pove_date.split('T')[0]}</Descriptions.Item>
                <Descriptions.Item label="Status" >{data?.pove_status == 1 ? "Pending" : data?.pove_status == 2 ? "Approve" : data?.pove_status == 3 ? "Rejected" : data?.pove_status == 4 ? "Received" : "Completed"}</Descriptions.Item>
                <Descriptions.Item label="Total Amount">{data?.pove_total_amount}</Descriptions.Item>
            </Descriptions>

            <Table dataSource={dataTable} columns={columnsPode} />
        </Dashboard>
    )
}