import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Dashboard from '@/layouts/dashboard'
import { AllStod } from '@/Redux/Action/Purchasing/purchasingAction';
import EditStods from './edit-stod';

export default function Stod() {
    const dispatch = useDispatch()
    const { stods } = useSelector((state: any) => state.StodReducer)
    const [id, setId] = useState(0)
    const [updateStod, setUpdateStod] = useState(false)

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
    }, [])

    const columnsStods = [
        {
            title: 'Barcode',
            dataIndex: 'stodBarcodeNumber',
            sorter: {
                compare: (a: any, b: any) => a.stodBarcodeNumber < b.stodBarcodeNumber ? -1 : 1
            }
        },
        {
            title: 'Status',
            dataIndex: 'stodStatus',
            sorter: {
                compare: (a: any, b: any) => a.stodStatus < b.stodStatus ? -1 : 1
            }
        },
        {
            title: 'Notes',
            dataIndex: 'stodNotes',
            sorter: {
                compare: (a: any, b: any) => a.stodNotes < b.stodNotes ? -1 : 1
            }
        },
        {
            title: 'PO Number (POH Number)',
            dataIndex: 'stodPohe',
            sorter: {
                compare: (a: any, b: any) => a.stodPohe < b.stodPohe ? -1 : 1
            }
        },
        {
            title: 'Used In (Facilities)',
            dataIndex: 'stodFaci',
            sorter: {
                compare: (a: any, b: any) => a.stodFaci < b.stodFaci ? -1 : 1
            }
        },
        {
            title: 'Action',
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Switch Status'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editStod(record.stodId)} className="mx-2" />
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
                />
                : null}

            <div className='text-2xl py-3'>Stock Name : </div>

            <Table dataSource={stods} columns={columnsStods} />
        </Dashboard >
    )
}