import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Table, MenuProps, Modal, Button, Tooltip, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, CameraOutlined, EyeOutlined } from '@ant-design/icons';
import { AllStock, DelStock } from '@/Redux/Action/Purchasing/purchasingAction';
import AddStocks from './add-stock';
import EditStocks from './edit-stock';
import AddSphos from '../add-spho';

export default function Stock() {
    const { stocks } = useSelector((state: any) => state.StockReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const [id, setId] = useState(0)
    const [addStock, setAddStock] = useState(false)
    const [updateStock, setUpdateStock] = useState(false)

    const [addSpho, setAddSpho] = useState(false)

    const [search, setSearch] = useState('')
    const filterData = stocks.filter((item: any) => {
        if (search === "") {
            return item
        } else {
            return item.stockName.toLowerCase().includes(search.toLocaleLowerCase())
        }
    })

    const handleOk = () => {
        setTimeout(() => {
            setAddStock(false)
            setUpdateStock(false)
            setAddSpho(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log('Click cancel button')
        setAddStock(false)
        setUpdateStock(false)
        setAddSpho(false)
    }

    const handleClose = (data: boolean) => {
        setAddStock(data)
        setUpdateStock(data)
        setAddSpho(data)
    }

    const editStock = (id: number) => {
        setUpdateStock(true)
        setId(id)
    }

    const uploadPhoto = (id: number) => {
        setAddSpho(true)
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
                dispatch(DelStock(id))
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    useEffect(() => {
        dispatch(AllStock())
    }, [])

    const columnsStock = [
        {
            title: 'Name',
            dataIndex: 'stockName',
            sorter: {
                compare: (a: any, b: any) => a.stockName < b.stockName ? -1 : 1
            }
        },
        {
            title: 'Reorder Point',
            dataIndex: 'stockReorderPoint',
            sorter: {
                compare: (a: any, b: any) => a.stockReorderPoint - b.stockReorderPoint
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'stockQuantity',
            sorter: {
                compare: (a: any, b: any) => a.stockQuantity - b.stockQuantity
            }
        },
        {
            title: 'Used',
            dataIndex: 'stockUsed',
            sorter: {
                compare: (a: any, b: any) => a.stockUsed - b.stockUsed
            }
        },
        {
            title: 'Scrap',
            dataIndex: 'stockScrap',
            sorter: {
                compare: (a: any, b: any) => a.stockScrap - b.stockScrap
            }
        },
        {
            title: 'Size Color',
            dataIndex: 'stockSize',
            render: (size: any, record: any) => (
                <span>{size} - {record.stockColor}</span>
            )
        },
        {
            title: [<Button onClick={() => setAddStock(true)} className='border-0 mr-2'><PlusOutlined /> Add</Button>],
            render: (record: any) => (
                <>
                    <Tooltip placement="top" title='Edit Stock'>
                        <EditOutlined style={{ color: '#13c2c2' }} onClick={() => editStock(record.stockId)} className="mx-2" />
                    </Tooltip>
                    <Tooltip placement="top" title='Delete'>
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => showDeleteConfirm(record.stockId, record.stockName)} className="mx-2" />
                    </Tooltip>
                    <Tooltip placement="top" title='Detail Info Stock'>
                        <EyeOutlined
                            onClick={() => router.push({
                                pathname: `/dashboard/purchasing/stock/${record.stockId}/${record.stockName}`,
                                query: {
                                    id_stock: record.stockId,
                                    name_stock: record.stockName
                                }
                            }, `/dashboard/purchasing/stock/${record.stockId}/${record.stockName}`)}
                            className="mx-2 text-blue-400" />
                    </Tooltip>
                    {/* <Tooltip placement="top" title='Upload Photo'>
                        <CameraOutlined
                            onClick={(record: any) => uploadPhoto(record.stockId)}
                            className="mx-2" />
                    </Tooltip> */}
                </>
            )
        }
    ]

    return (
        <>
            {addStock ?
                <AddStocks
                    show={addStock}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            {updateStock ?
                <EditStocks
                    data={stocks}
                    id={id}
                    show={updateStock}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            {addSpho ?
                <AddSphos
                    data={stocks}
                    id={id}
                    show={addSpho}
                    clickOk={handleOk}
                    clickCancel={handleCancel}
                    handleClose={handleClose}
                /> : null}

            <Input
                className="w-96 py-2 rounded-full my-5"
                value={search}
                placeholder="Search Stock Name"
                prefix={<SearchOutlined />}
                onChange={e => setSearch(e.target.value)} />

            <Table columns={columnsStock} dataSource={filterData.sort((a: any, b: any) => a.stockId - b.stockId)} />
        </>
    )
}