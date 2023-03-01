import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Modal, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AllVendor, DelVendor } from '@/Redux/Action/Purchasing/purchasingAction';
import AddVendors from './add-vendor';
import EditVendors from './edit-vendor';

export default function Vendor() {
    const dispatch = useDispatch()
    const { vendors } = useSelector((state: any) => state.VendorReducer)
    const [id, setId] = useState(0)
    const [addVendor, setAddVendor] = useState(false)
    const [updateVendor, setUpdateVendor] = useState(false)
    const router = useRouter()

    const product = () => {
        router.push('/dashboard/purchasing/add-product')
    }
    const active = [
        {
            value: 0,
            label: "InActive"
        },
        {
            value: 1,
            label: "Active"
        }
    ]

    const priority = [
        {
            value: 0,
            label: "Lowest"
        },
        {
            value: 1,
            label: "Highest"
        }
    ]

    const handleOk = () => {
        setTimeout(() => {
            setAddVendor(false)
            setUpdateVendor(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log('Click cancel button')
        setAddVendor(false)
        setUpdateVendor(false)
    }

    const handleClose = (data: boolean) => {
        setAddVendor(data)
        setUpdateVendor(data)
    }

    const editVendor = (id: number) => {
        setUpdateVendor(true)
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
                dispatch(DelVendor(id))
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    useEffect(() => {
        dispatch(AllVendor())
    }, [])

    const columnsVendor = [
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            sorter: {
                compare: (a: any, b: any) => a.vendorName < b.vendorName ? -1 : 1
            }
        },
        {
            title: 'Status',
            dataIndex: 'vendorActive',
            render: (record: any) => {
                return (
                    <span>{record === 0 ? "InActive" : "Active"}</span>
                )
            },
            sorter: {
                compare: (a: any, b: any) => a.vendorActive - b.vendorActive
            }
        },
        {
            title: 'Priority',
            dataIndex: 'vendorPriority',
            render: (record: any) => {
                return (
                    <span>{record === 0 ? "Lowest" : "Highest"}</span>
                )
            },
            sorter: {
                compare: (a: any, b: any) => a.vendorPriority - b.vendorPriority
            }
        },
        {
            title: 'Register At',
            dataIndex: 'vendorRegisterDate',
            render: (record: any) => {
                return (
                    <span>{record.split("T")[0]}</span>
                )
            },
            sorter: {
                compare: (a: any, b: any) => a.vendorRegisterDate < b.vendorRegisterDate ? -1 : 1
            }
        },
        {
            title: 'Web Url',
            dataIndex: 'vendorWeburl',
            sorter: {
                compare: (a: any, b: any) => a.vendorWeburl < b.vendorWeburl ? -1 : 1
            }
        },
        {
            title: [<Button onClick={() => setAddVendor(true)} className='border-0 mr-2'><PlusOutlined /> Add</Button>],
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Edit Vendor'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editVendor(record.vendorId)} className="mx-2" />
                        </Tooltip>
                        <Tooltip placement="top" title='Delete'>
                            <DeleteOutlined style={{ color: 'red' }} onClick={() => showDeleteConfirm(record.vendorId, record.vendorName)} className="mx-2" />
                        </Tooltip>
                        <Tooltip placement="top" title='Add Item Product'>
                            <PlusCircleOutlined
                                onClick={() => router.push({
                                    pathname: '/dashboard/purchasing/add-product',
                                    query: { id_vendor: record.vendorId }
                                }, '/dashboard/purchasing/add-product')}
                                className="mx-2" />
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    return (
        <>
            {addVendor ?
                <AddVendors
                    show={addVendor}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            {updateVendor ?
                <EditVendors
                    data={vendors}
                    id={id}
                    show={updateVendor}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                />
                : null}

            <Table columns={columnsVendor} dataSource={vendors} />
        </>
    )
}