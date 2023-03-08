import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Col, Input, Modal, Row, Segmented, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AllPohe, DelPohe } from '@/Redux/Action/Purchasing/purchasingAction';
import EditPohes from './edit-pohe';

export default function Pohe() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { pohes } = useSelector((state: any) => state.PoheReducer)
    const [id, setId] = useState(0)
    const [updatePohe, setUpdatePohe] = useState(false)

    const [value, setValue] = useState<string | number>('Pending')
    const filterPohes = pohes.filter((item: any) => item.pove_status == (value == 'Pending' ? 1 : value == "Approve" ? 2 : value == "Rejected" ? 3 : 4))

    const [search, setSearch] = useState('')
    const filterData = filterPohes.filter((item: any) => {
        if (search === "") {
            return item
        } else {
            return item.pove_number.toLowerCase().includes(search.toLocaleLowerCase()) || item.pove_name.toLowerCase().includes(search.toLocaleLowerCase());
        }
    })

    const handleOk = () => {
        setTimeout(() => {
            setUpdatePohe(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log('Click cancel button')
        setUpdatePohe(false)
    }

    const handleClose = (data: boolean) => {
        setUpdatePohe(data)
    }

    const editPohe = (id: number) => {
        setUpdatePohe(true)
        setId(id)
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
                dispatch(DelPohe(id))
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    useEffect(() => {
        dispatch(AllPohe())
    }, [])

    const columnsPohe = [
        {
            title: 'PO Number',
            dataIndex: 'pove_number',
            sorter: {
                compare: (a: any, b: any) => a.pove_number < b.pove_number ? -1 : 1
            }
        },
        {
            title: 'PO Date',
            dataIndex: 'pove_date',
            render: (record: any) => {
                return (
                    <span>{record.split("T")[0]}</span>
                )
            },
            sorter: {
                compare: (a: any, b: any) => a.pove_date < b.pove_date ? -1 : 1
            }
        },
        {
            title: 'Vendor Target',
            dataIndex: 'pove_name',
            sorter: {
                compare: (a: any, b: any) => a.pove_name - b.pove_name
            }
        },
        {
            title: 'Total Amount',
            dataIndex: 'pove_total_amount',
            sorter: {
                compare: (a: any, b: any) => a.pove_total_amount - b.pove_total_amount
            }
        },
        {
            title: 'Status',
            dataIndex: 'pove_status',
            render: (record: any) => {
                return (
                    <span>
                        {record == 1 ? "Pending" : record == 2 ? "Approve" : record == 3 ? "Rejected" : record == 4 ? "Received" : "Completed"}
                    </span>
                )
            },
            sorter: {
                compare: (a: any, b: any) => a.pove_status - b.pove_status
            }
        },
        {
            render: (record: any) => (
                <>
                    <Tooltip placement="top" title='Switch Status'>
                        <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editPohe(record.pove_id)} className="mx-2" />
                    </Tooltip>
                    <Tooltip placement="top" title='Delete'>
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => showDeleteConfirm(record.pove_id, record.pove_number)} className="mx-2" />
                    </Tooltip>
                    <Tooltip placement="top" title='Details'>
                        <PlusCircleOutlined
                            onClick={() => router.push({
                                pathname: `/dashboard/purchasing/order/${record.pove_id}/${record.pove_number}`,
                                query: {
                                    id_pohe: record.pove_id,
                                    number_pohe: record.pove_number
                                }
                            }, `/dashboard/purchasing/order/${record.pove_id}/${record.pove_number}`)}
                            className="mx-2" />
                    </Tooltip>
                </>
            )
        }
    ]

    return (
        <>
            {updatePohe ?
                <EditPohes
                    data={pohes}
                    id={id}
                    show={updatePohe}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <Input
                            className="w-96 py-2 rounded-full my-5"
                            value={search}
                            placeholder="Search Order Number / Vendor Name"
                            prefix={<SearchOutlined />}
                            onChange={e => setSearch(e.target.value)} />
                    </Space>
                </Col>
                <Col>
                    <Space size={15}>
                        <Segmented
                            options={['Pending', 'Approve','Rejected','Received']}
                            value={value}
                            onChange={setValue} />
                    </Space>
                </Col>
            </Row>

            <Table columns={columnsPohe} dataSource={search ? filterData : filterPohes} />
        </>
    )
}