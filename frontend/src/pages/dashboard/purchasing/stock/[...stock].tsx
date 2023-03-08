import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Table, Tooltip } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import Dashboard from '@/layouts/dashboard'
import { AllStock, AllStod } from '@/Redux/Action/Purchasing/purchasingAction';
import EditStods from '../edit-stod';

export default function Stod() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { stods } = useSelector((state: any) => state.StodReducer)
    const [id, setId] = useState(0)
    const [updateStod, setUpdateStod] = useState(false)

    const { stocks } = useSelector((state: any) => state.StockReducer)
    const { id_stock, name_stock } = router.query
    const data = stocks.find((item: any) => item.stockId == id_stock)

    const dataStod = stods.filter((item: any) => item.stockdet_name == name_stock)
    const dataTable = dataStod.length > 0 ? dataStod : []

    const handleOk = () => {
        setTimeout(() => {
            setUpdateStod(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log("Clicked cancel button")
        setUpdateStod(false)
    }

    const handleClose = (data: boolean) => {
        setUpdateStod(data)
    }

    const editStod = (id: number) => {
        setUpdateStod(true)
        setId(id)
    }

    useEffect(() => {
        dispatch(AllStod())
        dispatch(AllStock())
    }, [])

    const columnsStods = [
        {
            title: 'Barcode',
            dataIndex: 'stockdet_number',
            sorter: {
                compare: (a: any, b: any) => a.stockdet_number < b.stockdet_number ? -1 : 1
            }
        },
        {
            title: 'Status',
            dataIndex: 'stockdet_status',
            render: (record: any) => {
                return (
                    <span>
                        {record == 1 ? "Stocked" : record == 2 ? "Expired" : record == 3 ? "Broken" : "Used"}
                    </span>
                )
            },
            sorter: {
                compare: (a: any, b: any) => a.stodStatus < b.stodStatus ? -1 : 1
            }
        },
        {
            title: 'Notes',
            dataIndex: 'stockdet_notes',
            sorter: {
                compare: (a: any, b: any) => a.stockdet_notes < b.stockdet_notes ? -1 : 1
            }
        },
        {
            title: 'PO Number',
            dataIndex: 'stockdet_pohe_number',
            sorter: {
                compare: (a: any, b: any) => a.stockdet_pohe_number < b.stockdet_pohe_number ? -1 : 1
            }
        },
        {
            title: 'Used In',
            dataIndex: 'stockdet_facilities',
            sorter: {
                compare: (a: any, b: any) => a.stockdet_facilities < b.stockdet_facilities ? -1 : 1
            }
        },
        {
            title: 'Action',
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Switch Status'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editStod(record.stockdet_id)} className="mx-2" />
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    return (
        <Dashboard>
            {updateStod ?
                <EditStods
                    data={stods}
                    id={id}
                    show={updateStod}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            <Link href={'/dashboard/purchasing'}><ArrowLeftOutlined /> Back</Link>

            <div className='text-2xl my-5'>{data?.stockName}</div>

            <Table dataSource={dataTable} columns={columnsStods} />
        </Dashboard >
    )
}