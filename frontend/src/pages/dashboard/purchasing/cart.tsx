import { API } from "@/Redux/Configs/consumeApi";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    const user = useSelector((state: any) => state.GetUserReducer.getUser)
    const userid = user[0]?.user_id
    const { stocks } = useSelector((state: any) => state.StockReducer)
    const { pohes } = useSelector((state: any) => state.PoheReducer)
    const [search, setSearch] = useState("")
    const [cart, setCart] = useState([])

    const [poheNumber, setPoheNumber] = useState("")
    function code() {
        // console.log(numberOrder.ormeOrderNumber,'numberOrder'); // hasilnya MENUS#20230223-0001
        let lastCode = pohes.poheNumber
        let getStr = lastCode.slice(0, 14);// MENUS#20230223

        let fulldate = new Date()
        let year = fulldate.getFullYear().toString()
        let month = fulldate.getMonth() + 1
        let monthstr = month < 10 ? "0" + month : month
        let day = fulldate.getDate()
        let daystr = day < 10 ? "0" + day : day
        let date = year + monthstr + daystr

        let generate = "PO-" + date

        let orderNumber
        // kalau sama, lanjutin nomor
        if (generate === getStr) {
            let number = Number(lastCode.slice(-4)) + 1
            let numberstr = number.toString()
            let zero = "0"
            let length = numberstr.length
            let generateNumber = zero.repeat(4 - length) + numberstr
            orderNumber = generate + "-" + generateNumber
            setPoheNumber(orderNumber)
            // kalau beda, mulai dari 1
        } else {
            orderNumber = generate + "-" + "001"
            setPoheNumber(orderNumber);
        }
        return orderNumber
    }

    const addtocart = (items: any) => {
        const newCart = [...cart]
        const itemInCart = cart.find((item: any) => items.stockName === item.stockName)

        // console.log(code(), 'isi code');

        if (!itemInCart) {
            const itemInCart = {
                ...items,
                // items,
                quantity: 1,
                subtotal: 0,
                orderNumber: code()
            }
            const numberOfPrice = Number(
                items.remeprice.split(",")[0].replace(/[^0-9]/g, "") // Ganti remeprice veproPrice
            )

            // split(',')[0].replace(/[^0-9]/g, '')
            // let numberString = items.remeprice.toString().replace(/[^0-9.-]+/g,"")
            // const numberOfPrice = parseInt(numberString)
            // console.log(items.remeprice)

            itemInCart.subtotal = itemInCart.quantity * numberOfPrice
            newCart.push(itemInCart)
        } else {
            itemInCart.quantity++
            // let numberOfPrice = Number(items.remeprice.replace(/[^0-9.-]+/g,""));
            console.log(items.remeprice, "else");
            let numberString = items.remeprice.split(",")[0].replace(/[^0-9]/g, "");
            const numberOfPrice = parseInt(numberString);
            itemInCart.subtotal = itemInCart.quantity * numberOfPrice;
            // console.log(typeof numberString)
        }
        setCart(newCart);
    };

    const [currentpage, setCurrentPage] = useState(1)
    const startIndex = (currentpage - 1) * 9
    const endIndex = startIndex + 9

    const sorted = stocks.sort((a: any, b: any) => {
        a.remeprice > b.remeprice ? 1 : -1 // Ganti remeprice veproPrice
    })
    const stocksPagination = sorted.slice(startIndex, endIndex)

    return (
        <>
            <div className="flex flex-wrap ml-5 item-center">
                {stocksPagination
                    .filter((item: any) => {
                        if (
                            item.stockName.toLowerCase().includes(search.toLocaleLowerCase())
                        ) {
                            return item
                        }
                    })
                    .map(
                        (stock: any, key: any) => (
                            <div
                                key={stock.stockId}
                                className="w-52 mr-6 mx-auto mb-12"
                            >
                                <div>
                                    {/* <a className=" hover:text-slate-400"> */}
                                    {/* <img
                                            src={`${configuration.BASE_URL}/${stock.rempurl}`}
                                            alt={stock.remename}
                                            className="h-40 w-full object-cover rounded-lg"
                                        ></img> */}
                                    <div className="ml-3 mt-3 h-40">
                                        <p className="text-lg font-bold">
                                            {stock.stockName}
                                        </p>
                                        <p>{stock.stockDescription}</p>
                                        <p>Stocked : {stock.stockQuantity}</p>
                                        <p>Re-order : {stock.stockReorderPoint}</p>
                                        <p>{stock.stockReorderPoint} (Ganti ke veproPrice)</p>
                                        {/* <p className="text-amber-600">
                                                {stock.remestatus}
                                            </p> */}
                                    </div>
                                    {/* </a> */}
                                    {/* <div className='absolute'> */}
                                    <div className="w-full flex">
                                        {userid ? (
                                            <button
                                                onClick={() => addtocart(stock)}
                                                className="w-3/4 mx-auto rounded-full inline-block px-5 py-2 mt-4 bg-slate-500 hover:bg-slate-600 text-white uppercase bottom-0"
                                            >
                                                <PlusOutlined /> Add To Cart
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        )
                    )}
            </div>

            {/* <Pagination
                  onChange={handlePagination}
                  current={currentpage}
                  pageSize={10}
                  total={menus.length}
                  className="text-center py-14"
                /> */}
        </>
    )
}
