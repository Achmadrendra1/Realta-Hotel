import { Affix, Card, Col, Input, InputNumber, Row, Table, MenuProps, Dropdown, Typography, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AllStockCart } from "@/Redux/Action/Purchasing/purchasingAction";
import { DeleteOutlined, DownOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { configuration } from '@/Redux/Configs/url';

export default function Cart() {
    const { stcart } = useSelector((state: any) => state.StockReducer)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [sortedData, setSorted] = useState("")
    const [itemOrder, setItemOrder] = useState([])

    useEffect(() => {
        dispatch(AllStockCart())
    }, [])

    // Sorted Item Price
    let sorted: number;
    if (sortedData && sortedData == "DESC") {
        sorted = stcart.sort((a: any, b: any) =>
            b.stcart_price > a.stcart_price ? 1 : -1
        )
    } else if (sortedData && sortedData == "ASC") {
        sorted = stcart.sort((a: any, b: any) =>
            a.stcart_price > b.stcart_price ? 1 : -1
        )
    }

    function handlesort(sort: any) {
        setSorted(sort)
    }

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "Ascending",
            onClick: () => {
                handlesort("ASC")
            }
        },
        {
            key: "2",
            label: "Descending",
            onClick: () => {
                handlesort("DESC")
            }
        }
    ]

    const addToCart = (item: any) => {
        const data: any = [...itemOrder]
        data.push(item)
        setItemOrder(data)
    }
    console.log(itemOrder)



    const getCartTotal = (): number => {
        return itemOrder.reduce((sum: number, { quantity }) => sum + quantity, 0)
    }



    // Subtotal
    const getTotalSum = (): number => {
        let jml = 0
        itemOrder.map((item: any) => {
            // ubah tipe data money ke integer agar bisa di hitung
            let numberOfPrice = Number(item.stcart_price.split(",")[0].replace(/[^0-9]/g, ""))

            jml = numberOfPrice * item.quantity + jml
        })
        return jml
    }

    // Tax
    function tax(): number {
        const subtotal = getTotalSum()
        const result = subtotal * (10 / 100)
        return result
    }

    // Total
    function sumWithTax() {
        const subtotal = getTotalSum()
        const totaltax = tax()

        // add tax 10% from sub total
        const result = subtotal + totaltax
        return result
    }

    return (
        <>
            <div className="container mx-auto">

                <Input
                    className="w-96 py-2 rounded-full my-5"
                    value={search}
                    placeholder="Stock Name"
                    prefix={<SearchOutlined />}
                    onChange={e => setSearch(e.target.value)} />

                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ["1"]
                    }}>

                    <Typography.Link>
                        <Space className="my-5">
                            Sort by price
                            <DownOutlined />
                        </Space>
                    </Typography.Link>
                </Dropdown>

                <div className="mt-3 flex my-20">
                    <div className="w-3/5 border rounded shadow p-3 mr-2">
                        <div className="flex flex-wrap ml-5 item-center">
                            {stcart.filter((item: any) => {
                                if (
                                    item.stcart_name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                ) {
                                    return item
                                }
                            })
                                .map((item: any) => (
                                    <Card
                                        key={item.stcard_id}
                                        hoverable
                                        style={{ width: 320 }}
                                        className="m-2"
                                    >
                                        <img
                                            src={`${configuration.BASE_URL}/stock-photo/src/erik-van-dijk-LpMrtiXDVhE-unsplash.jpg-erik-van-dijk-LpMrtiXDVhE-unsplash-1678187540604-206109257.jpg`}
                                            alt={item.stcart_name}
                                            className="w-full object-cover rounded-lg"
                                        ></img>
                                        <p className="text-2xl font-semibold my-2">{item.stcart_name}</p>
                                        <p>{item.stcart_desc}</p>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <p>Quantity: {item.stcart_quantity}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>ReOrder Point: {item.stcart_reorder_point}</p>
                                            </Col>
                                        </Row>
                                        <p className="text-2xl font-semibold my-2">{item.stcart_price}</p>

                                        <button
                                            onClick={() => addToCart(item)}
                                            className="float-right rounded-full px-5 py-2 mt-4 bg-slate-500 hover:bg-slate-600 text-white uppercase bottom-0"
                                        >
                                            <PlusOutlined /> Add To Cart
                                        </button>
                                    </Card>
                                ))}
                        </div>
                    </div>



                    {/* <Affix className="w-2/5">
                        <ShoppingCartOutlined className="border rounded shadow py-20 ml-2 text-xl text-center">Items Ordered </ShoppingCartOutlined><br />
                    </Affix> */}
                    <div className="border rounded shadow p-3 ml-2 sticky top-0 h-1/2 w-2/5">
                        <div className="text-xl font-bold text-center">
                            Checkout
                        </div>

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

                        <div className="border rounded py-5 bg-slate-100">
                            <p className="font-bold text-center py-2">
                                Payment Summary
                            </p>

                            <table className="py-5 bg-slate-100 mx-4">
                                <tbody>
                                    <tr className="hover:bg-slate-300">
                                        <td className="w-full">Sub total</td>
                                        <td className="text-right">
                                            Rp.{getTotalSum().toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-300">
                                        <td className=" py-2">Tax(10%)</td>
                                        <td className="text-right">
                                            {tax().toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            })}
                                        </td>
                                    </tr>
                                    <tr className="font-bold hover:bg-slate-300">
                                        <td className=" py-2">Total payment</td>
                                        <td className="text-right">
                                            Rp.{sumWithTax().toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a>
                            <div
                                className="border rounded-lg bg-slate-100 my-5 text-center font-bold py-2 hover:bg-slate-300 hover:text-white"
                            >
                                REQUEST ORDER
                            </div>
                        </a>
                    </div>
                </div>
            </div >
        </>
    )
}
