import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Table, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Dashboard from '@/layouts/dashboard';
import { AllVepro } from '@/Redux/Action/Purchasing/purchasingAction';
import AddVepros from '../add-vepro';
import EditVepros from '../edit-vepro';

export default function AddProduct() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { vepros } = useSelector((state: any) => state.VeproReducer)
    const [id, setId] = useState(0)
    const [addVepro, setAddVepro] = useState(false)
    const [updateVepro, setUpdateVepro] = useState(false)

    const { vendors } = useSelector((state: any) => state.VendorReducer)
    const { id_vendor } = router.query
    const data = vendors.find((item: any) => item.vendorId == id_vendor)

    const dataVepro = vepros.filter((item: any) => item.vestock_vendor_id == data.vendorId)
    const dataTable = dataVepro.length > 0 ? dataVepro : []

    const handleOk = () => {
        setTimeout(() => {
            setAddVepro(false)
            setUpdateVepro(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log('Click cancel button')
        setAddVepro(false)
        setUpdateVepro(false)
    }

    const handleClose = (data: boolean) => {
        setAddVepro(data)
        setUpdateVepro(data)
    }

    const editVepro = (id: number) => {
        setUpdateVepro(true)
        setId(id)
    }

    useEffect(() => {
        dispatch(AllVepro())
    }, [])

    const columnsVepro = [
        {
            title: 'Stock',
            dataIndex: 'vestock_name',
            sorter: {
                compare: (a: any, b: any) => a.vestock_name < b.vestock_name ? -1 : 1
            }
        },
        {
            title: 'Qty Stocked',
            dataIndex: 'vestock_qty_stocked',
            sorter: {
                compare: (a: any, b: any) => a.vestock_qty_stocked - b.vestock_qty_stocked
            }
        },
        {
            title: 'Qty Remaining',
            dataIndex: 'vestock_qty_remaining',
            sorter: {
                compare: (a: any, b: any) => a.vestock_qty_remaining - b.vestock_qty_remaining
            }
        },
        {
            title: 'Price',
            dataIndex: 'vestock_price',
            sorter: {
                compare: (a: any, b: any) => a.vestock_price - b.vestock_price
            }
        },
        {
            title: [<Button onClick={() => setAddVepro(true)} className='border-0 mr-2'><PlusOutlined /> Add</Button>],
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Edit Vendor Product'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editVepro(record.vestock_id)} className="mx-2" />
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    return (
        <Dashboard>
            {addVepro ?
                <AddVepros
                    id={data.vendorId}
                    show={addVepro}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            {updateVepro ?
                <EditVepros
                    data={vepros}
                    id={id}
                    show={updateVepro}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            <Link href={'/dashboard/purchasing'}><ArrowLeftOutlined /> Back</Link>

            <div className='text-2xl my-5'>{data?.vendorName}</div>

            <Table dataSource={dataTable} columns={columnsVepro} />
        </Dashboard>
    )
}