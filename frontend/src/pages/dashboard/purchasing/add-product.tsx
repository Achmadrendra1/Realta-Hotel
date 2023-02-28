import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Dashboard from '@/layouts/dashboard';
import { AllVepro } from '@/Redux/Action/Purchasing/purchasingAction';
import AddVepros from './add-vepro';
import EditVepros from './edit-vepro';

export default function AddProduct() {
    const dispatch = useDispatch()
    const { vepros } = useSelector((state: any) => state.VeproReducer)
    const [id, setId] = useState(0)
    const [addVepro, setAddVepro] = useState(false)
    const [updateVepro, setUpdateVepro] = useState(false)

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
            dataIndex: 'veproStock',
            sorter: {
                compare: (a: any, b: any) => a.veproStock < b.veproStock ? -1 : 1
            }
        },
        {
            title: 'Qty Stocked',
            dataIndex: 'veproQtyStocked',
            sorter: {
                compare: (a: any, b: any) => a.veproQtyStocked - b.veproQtyStocked
            }
        },
        {
            title: 'Qty Remaining',
            dataIndex: 'veproQtyRemaining',
            sorter: {
                compare: (a: any, b: any) => a.veproQtyRemaining - b.veproQtyRemaining
            }
        },
        {
            title: 'Price',
            dataIndex: 'veproPrice',
            sorter: {
                compare: (a: any, b: any) => a.veproPrice - b.veproPrice
            }
        },
        {
            title: [<Button onClick={() => setAddVepro(true)} className='border-0 mr-2'><PlusOutlined /> Add</Button>],
            render: (record: any) => {
                return (
                    <>
                        <Tooltip placement="top" title='Edit Vendor Product'>
                            <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editVepro(record.veproId)} className="mx-2" />
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
                />
                : null}

            <Table dataSource={vepros} columns={columnsVepro} />
        </Dashboard>
    )
}
