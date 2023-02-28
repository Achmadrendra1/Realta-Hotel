import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Button, Card, Col, Descriptions, Table, Tooltip, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Dashboard from '@/layouts/dashboard';
import { AllPode, DelPode } from '@/Redux/Action/Purchasing/purchasingAction';
import EditPodes from './edit-pode';

export default function Pode() {
    const dispatch = useDispatch()
    const { podes } = useSelector((state: any) => state.PodeReducer)
    const [id, setId] = useState(0)
    const [updatePode, setUpdatePode] = useState(false)

    const rupiah = (number: any) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

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
    }, [])

    const columnsPode = [
        {
            title: 'Stock Name',
            dataIndex: 'podeStock',
            sorter: {
                compare: (a: any, b: any) => a.podeStock < b.podeStock ? -1 : 1
            }
        },
        {
            title: 'Qty',
            dataIndex: 'podeOrderQty',
            sorter: {
                compare: (a: any, b: any) => a.podeOrderQty - b.podeOrderQty
            }
        },
        {
            title: 'Price',
            dataIndex: 'podePrice',
            sorter: {
                compare: (a: any, b: any) => a.podePrice - b.podePrice
            }
        },
        {
            title: 'Received Qty',
            dataIndex: 'podeReceivedQty',
            sorter: {
                compare: (a: any, b: any) => a.podeReceivedQty - b.podeReceivedQty
            }
        },
        {
            title: 'Rejected Qty',
            dataIndex: 'podeRejectedQty',
            sorter: {
                compare: (a: any, b: any) => a.podeRejectedQty - b.podeRejectedQty
            }
        },
        {
            title: 'Total',
            dataIndex: 'podeLineTotal',
            sorter: {
                compare: (a: any, b: any) => a.podeLineTotal - b.podeLineTotal
            }
        },
        {
            title: 'Action',
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Switch Status'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editPode(record.podeId)} className="mx-2" />
                        </Tooltip>
                        <Tooltip placement="top" title='Delete'>
                            <DeleteOutlined style={{ color: 'red' }} onClick={() => showDeleteConfirm(record.podeId, record.podeStock)} className="mx-2" />
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
                />
                : null}

            <Descriptions
                className='m-2'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="PO Number">poheNumber</Descriptions.Item>
                <Descriptions.Item label="PO Date">poheOrderDate</Descriptions.Item>
                <Descriptions.Item label="Vendor">poheVendor</Descriptions.Item>
                <Descriptions.Item label="Status" >poheStatus</Descriptions.Item>
                <Descriptions.Item label="Subtotal">Rp. poheSubtotal</Descriptions.Item>
                <Descriptions.Item label="Total Amount">Rp. poheTotalAmount</Descriptions.Item>
            </Descriptions>

            <Table dataSource={podes} columns={columnsPode} />
        </Dashboard>
    )
}