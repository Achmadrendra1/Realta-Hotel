import { Card, Col, InputNumber, Row, Table } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AllStockCart } from "@/Redux/Action/Purchasing/purchasingAction";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function Cart2() {
    const { stcart } = useSelector((state: any) => state.StockReducer)
    const dispatch = useDispatch()
    const [itemOrder, setItemOrder] = useState([])

    useEffect(() => {
        dispatch(AllStockCart())
    }, [])

    const addToCart = (item: any) => {
        const data: any = [...itemOrder]
        data.push(item)
        setItemOrder(data)
    }
    console.log(itemOrder);

    // const columnsStock = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'stcart_name'
    //     },
    //     {
    //         title: 'Desc',
    //         dataIndex: 'stcart_desc'
    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'stcart_quantity'
    //     },
    //     {
    //         title: 'Reorder Point',
    //         dataIndex: 'stcart_reorder_point'
    //     },
    //     {
    //         title: 'Price',
    //         dataIndex: 'stcart_price'
    //     },
    //     {
    //         title: 'Photo',
    //         dataIndex: 'stcart_photo'
    //     },
    //     {
    //         title: 'Vendor',
    //         dataIndex: 'stcart_vendor'
    //     }
    // ]

    return (
        <>
            <div className="flex-wrap">
                <Row gutter={16}>
                    <Col span={8} className="mb-2 flex-1">
                        {stcart.map((item: any) => (
                            <Card
                                key={item.stcard_id}
                                hoverable
                                style={{ width: 310 }}
                            // className="flex"
                            >
                                <img
                                    src={item.stcart_photo}
                                    alt={item.stcart_name}
                                    className="h-40 w-full object-cover rounded-lg"
                                ></img>
                                <p className="text-2xl font-semibold">{item.stcart_name}</p>
                                <p>{item.stcart_desc}</p>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <p>Quantity: {item.stcart_quantity}</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>ReOrder Point: {item.stcart_reorder_point}</p>
                                    </Col>
                                </Row>

                                <button
                                    onClick={() => addToCart(item)}
                                    className="float-right rounded-full px-5 py-2 mt-4 bg-slate-500 hover:bg-slate-600 text-white uppercase bottom-0"
                                >
                                    <PlusOutlined /> Add To Cart
                                </button>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </div>

            {/* <Col span={8}> */}
            {itemOrder.map((item: any) => (
                <Card style={{ width: 310 }}>
                    <p className="text-xl font-semibold">{item.stcart_name}</p>
                    <div className="ml-4">
                        <p>{item.stcart_vendor}</p>
                        <p className="text-xl">
                            {item.stcart_price} x
                            <InputNumber min={1} max={10} defaultValue={1} className="text-xl" />
                        </p>
                    </div>
                    <DeleteOutlined className="flex" />
                </Card>
            ))}
            {/* </Col> */}

            {/* <Table columns={columnsStock} dataSource={stcart} /> */}
        </>
    )
}
