import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Dropdown, MenuProps, Modal, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { AllPohe, DelPohe } from '@/Redux/Action/Purchasing/purchasingAction';
import EditPohes from './edit-pohe';

export default function Pohe() {
    const dispatch = useDispatch()
    const { pohes } = useSelector((state: any) => state.PoheReducer)
    const [id, setId] = useState(0)
    const [addPohe, setAddPohe] = useState(false)
    const [updatePohe, setUpdatePohe] = useState(false)

    const status = (status: any) => {
        if (status === "1") {

        }
    }

    const handleOk = () => {
        setTimeout(() => {
            setAddPohe(false)
            setUpdatePohe(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log('Click cancel button')
        setAddPohe(false)
        setUpdatePohe(false)
    }

    const handleClose = (data: boolean) => {
        setAddPohe(data)
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
                console.log(id);
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

    const items: MenuProps["items"] = [
        {
            label: <Link href="/dashboard/purchasing/list-order">Details</Link>,
            key: "0"
        }
    ]

    const columnsPohe = [
        {
            title: 'PO Number',
            dataIndex: 'poheNumber',
            sorter: {
                compare: (a: any, b: any) => a.poheNumber < b.poheNumber ? -1 : 1
            }
        },
        {
            title: 'PO Date',
            dataIndex: 'poheOrderDate',
            // sorter: {
            //     compare: (a: any, b: any) => a.poheOrderDate < b.poheOrderDate. ? -1 : 1
            // }
        },
        {
            title: 'Vendor Target',
            dataIndex: 'poheVendor',
            sorter: {
                compare: (a: any, b: any) => a.poheVendor - b.poheVendor
            }
        },
        {
            title: 'Total Amount',
            dataIndex: 'poheTotalAmount',
            sorter: {
                compare: (a: any, b: any) => a.poheTotalAmount - b.poheTotalAmount
            }
        },
        {
            title: 'Status',
            dataIndex: 'poheStatus',
            // render: (record: any) => {
            //     return (
            //         <span>{
            //             record.poheStatus === "1" ? "Pending"
            //                 : record.poheStatus === "2" ? "Approve"
            //                     : record.poheStatus === "3" ? "Rejected"
            //                         : record.poheStatus === "4" ? "Received" :
            //                             "Completed"
            //         }</span>
            //     )
            // },
            sorter: {
                compare: (a: any, b: any) => a.poheStatus - b.poheStatus
            }
        },
        {
            render: (record: any) => (
                <>
                    <Tooltip placement="top" title='Switch Status'>
                        <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editPohe(record.poheId)} className="mx-2" />
                    </Tooltip>
                    <Tooltip placement="top" title='Delete'>
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => showDeleteConfirm(record.poheId, record.poheNumber)} className="mx-2" />
                    </Tooltip>
                    <Dropdown menu={{ items }} trigger={["click"]} className="h-8">
                        <MoreOutlined className="mx-2" />
                    </Dropdown>
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
                />
                : null}

            <Table columns={columnsPohe} dataSource={pohes} />
        </>
    )
}