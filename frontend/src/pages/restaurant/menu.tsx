import Layouts from "@/layouts/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  Affix,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  InputNumber,
  Modal,
  Pagination,
  Radio,
  Select,
  Tag,
} from "antd";
import Image from "next/image";
import { DeleteOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doUserMenuReq } from "@/Redux/Action/Resto/userMenuAction";
import { configuration } from "@/Redux/Configs/url";
import { doAddOrder, doOrder } from "@/Redux/Action/Resto/orderAction";
import { doOrderNumberReq } from "@/Redux/Action/Resto/numberOrderAction";
import axios from "axios";
import { API } from "@/Redux/Configs/consumeApi";

// const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]" )

export default function menu({ restaurant }) {
  // console.log(restaurant,'restaurant');

  // const checkout = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || "[]") : null;
  // const [cart, setCart] = useState(checkout)
  let dispatch = useDispatch();
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  let userid = user[0]?.user_id;
  let menus = useSelector((state: any) => state.userMenuReducer.userMenu);
  let order_user = useSelector((state: any) => state.orderReducer.orderMenus);
  let numberOrder = useSelector(
    (state: any) => state.numberOrderReducer.numberOrder
  );

  // console.log(userid);

  let [ormeNumber, setOrmeNumber] = useState("");
  function code() {
    // console.log(numberOrder.ormeOrderNumber,'numberOrder'); // hasilnya MENUS#20230223-0001
    let lastCode = numberOrder.ormeOrderNumber;
    let getStr = lastCode.slice(0, 14); // MENUS#20230223

    let fulldate = new Date();
    let year = fulldate.getFullYear().toString();
    let month = fulldate.getMonth() + 1;
    let monthstr = month < 10 ? "0" + month : month;
    let day = fulldate.getDate();
    let daystr = day < 10 ? "0" + day : day;
    let date = year + monthstr + daystr;

    let generate = "MENUS#" + date;

    let orderNumber;
    // kalau sama, lanjutin nomor
    if (generate === getStr) {
      let number = Number(lastCode.slice(-4)) + 1;
      let numberstr = number.toString();
      let zero = "0";
      let length = numberstr.length;
      let generateNumber = zero.repeat(4 - length) + numberstr;
      orderNumber = generate + "-" + generateNumber;
      setOrmeNumber(orderNumber);
      // kalau beda, mulai dari 1
    } else {
      orderNumber = generate + "-" + "0001";
      setOrmeNumber(orderNumber);
    }
    return orderNumber;
  }
  // console.log(code(), 'ini code');

  let router = useRouter();
  // let { query: {
  //     hotel_name,
  //     faci_name,
  //     faci_description,
  //     faci_id } } = router;

  useEffect(() => {
    // let {id} = router.query;
    // let faci_id = Number({id}.id)
    let faci_id = restaurant.faci_id;
    console.log(faci_id, "faci_id");

    dispatch(doUserMenuReq(faci_id));
    dispatch(doOrder());
    dispatch(doOrderNumberReq());
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Harga Terendah",
      onClick: () => {
        handlesort("ASC");
      },
    },
    {
      key: "2",
      label: "Harga Tertinggi",
      onClick: () => {
        handlesort("DESC");
      },
    },
  ];

  const [cart, setCart] = useState([]);

  // console.warn(cart, ' ini cart')

  useEffect(() => {
    if (cart.length === 0) return;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("result", JSON.stringify(ormeNumber));
  }, [cart]);

  useEffect(() => {
    const cartdrlocalstorage = localStorage.getItem("cart");
    const parsedCart =
      cartdrlocalstorage !== null ? JSON.parse(cartdrlocalstorage) : [];
    setCart(parsedCart);
  }, []);

  const addtocart = (menu: any) => {
    let newCart = [...cart];
    let itemInCart = cart.find((item: any) => menu.remename === item.remename);

    // console.log(code(), 'isi code');

    if (!itemInCart) {
      let itemInCart = {
        ...menu,
        // menu,
        quantity: 1,
        subtotal: 0,
        orderNumber: code(),
      };
      let numberOfPrice = Number(
        menu.remeprice.split(",")[0].replace(/[^0-9]/g, "")
      );

      // split(',')[0].replace(/[^0-9]/g, '')
      // let numberString = menu.remeprice.toString().replace(/[^0-9.-]+/g,"")
      // const numberOfPrice = parseInt(numberString)
      // console.log(menu.remeprice)

      itemInCart.subtotal = itemInCart.quantity * numberOfPrice;
      newCart.push(itemInCart);
    } else {
      itemInCart.quantity++;
      // let numberOfPrice = Number(menu.remeprice.replace(/[^0-9.-]+/g,""));
      console.log(menu.remeprice, "else");
      let numberString = menu.remeprice.split(",")[0].replace(/[^0-9]/g, "");
      const numberOfPrice = parseInt(numberString);
      itemInCart.subtotal = itemInCart.quantity * numberOfPrice;
      // console.log(typeof numberString)
    }
    setCart(newCart);
  };

  function subtotal(cart: any) {}
  const removeFromCart = (productToRemove: any) => {
    setCart(cart.filter((product: any) => product !== productToRemove));
  };

  const clearCart = (): any => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((sum: number, { quantity }) => sum + quantity, 0);
    // return 0;
  };

  const setQuantity = (product: any, amount: any) => {
    // debugger;
    const newCart = [...cart];
    newCart.find((item) => item.remename === product.remename).quantity =
      amount;
    setCart(newCart);
  };

  // get total amount from selected products
  const getTotalSum = (): number => {
    // console.warn('total sum: ', cart)
    let jml = 0;
    cart.map((item: any) => {
      // ubah tipe data money ke integer agar bisa di hitung
      let numberOfPrice = Number(item.remeprice.split(",")[0].replace(/[^0-9]/g, ""));

      jml = numberOfPrice * item.quantity + jml;
    });
    return jml;

    //                  prevoious data, ambil cost, initial value
    // return cart.reduce( (sum:number, { remeprice, quantity }) => sum+(remeprice*quantity),0)
  };

  function tax(): number {
    const subtotal = getTotalSum();
    const result = subtotal * (11 / 100);
    return result;
  }

  //   useEffect( () => {
  //     const totalamount = sumWithTax();
  //     console.warn(totalamount,'totalitem');

  //     setTotalOrder({...totalOrder, ormeTotalAmount:totalamount})
  //   },[])

  //   let [totalOrder, setTotalOrder] = useState({
  //     ormeTotalItem: 0,
  //     ormeTotalAmount: 0,
  //     orme_pay_type: 'BO',
  //     ormeIsPaid: 'B',
  //     ormeUser: userid
  //   });

  function sumWithTax() {
    const subtotal = getTotalSum();
    const totaltax = tax();

    // add tax 11% from sub total
    const result = subtotal + totaltax;

    return result;
  }

  //   console.log(menus);

  const [payType, setPayType] = useState("cash");

  function paymentType(e: any) {
    if (e.target.value === "card") setPayType("card");
    else setPayType("cash");
  }

  //   --------------------------------------------------------------------- MODALS
  const [openMenu, setOpenMenu] = useState(false);
  const [menuDetail, setMenuDetail] = useState({
    nama: "",
    desc: "",
    harga: 0,
    status: "",
  });

  const [menuDetailPhoto, setMenuDetailPhoto] = useState([]);

  async function showModalsMenu(menu: any) {
    setOpenMenu(true);

    // console.log('isi menu', menu);

    // ambil semua data photo per- menu yang di klik
    const result = await axios(
      API("Get", `/resto-menu-photos/${menu.remeid}`, null)
    );
    let photos = result.data;
    setSelected({
      rempurl: `${configuration.BASE_URL}/` + photos[0].rempurl,
    });

    // isi semua data yang bukan primary
    let migratePhoto: any = [];
    photos.map((photo: any) => {
      if (photo.rempprimary == "1") {
      }
      let newDataPhoto = {
        remename: photo.rempname,
        rempid: photo.rempid,
        rempphotofilename: photo.rempphotofilename,
        rempprimary: "0",
        rempreme: photo.rempreme,
        rempthumbnailfilename: photo.rempthumbnailfilename,
        rempurl: `${configuration.BASE_URL}/${photo.rempurl}`,
      };
      migratePhoto.push(newDataPhoto);
    });
    setMenuDetailPhoto(migratePhoto);

    setMenuDetail({
      nama: menu.remename,
      desc: menu.remedescription,
      harga: menu.remeprice,
      status: menu.remestatus,
    });
  }
  //   const showModalsMenu = (menu:any) => {
  //     setOpenMenu(true);
  //     console.log(menu)

  //   }
  const handleOkButton = () => {
    // buat handle add menu kali ya disini
  };

  const handleCancel = () => {
    setOpenMenu(false);
  };
  // call action when place order clicked
  function placeOrder() {
    // console.warn('ini place order');
    let addorder = {
      ormeOrderNumber: code(),
      ormeTotalItem: getCartTotal(),
      ormeDisc: 0,
      ormeTotalAmount: sumWithTax(),
      ormeUser: userid,
    };

    let dataresult = {
      ormeNumber: code(),
      subtotal: getTotalSum(),
      tax: tax(),
      total: sumWithTax(),
    };

    localStorage.setItem("result", JSON.stringify(dataresult));

    let order = [{ summary: addorder, detail: cart }];
    // console.warn(order,'order di menu');
    dispatch(doAddOrder(order));

    // set detail order

    router.push("/restaurant/order");

    localStorage.setItem("cart", JSON.stringify([]));
  }

  // search data
  const [search, setSearch] = useState("");
  //   console.log('search',search);
  //   console.log(menus);

  // ------------------------ SORTED
  // console.log(menus);
  let sorted = menus.sort((a: any, b: any) =>
    a.remeprice > b.remeprice ? 1 : -1
  );
  const [sortedData, setSorted] = useState("");

  if (sortedData && sortedData == "DESC") {
    sorted = menus.sort((a: any, b: any) =>
      b.remeprice > a.remeprice ? 1 : -1
    );
  }

  function handlesort(sort: any) {
    setSorted(sort);
  }

  // ------------------------ PAGINATION
  const [currentpage, setCurrentPage] = useState(1);
  const handlePagination = (page: any) => {
    setCurrentPage(page);
  };

  const startIndex = (currentpage - 1) * 9;
  const endIndex = startIndex + 9;
  const menusWPagination = sorted.slice(startIndex, endIndex);

  // ------------------------- menu detail dengan photo
  const [selected, setSelected] = useState({
    rempurl: "",
  });
  function tampilkanPhoto(photo: any) {
    setSelected({
      rempurl: photo.rempurl,
    });
  }

  return (
    <>
      <Head>
        <title>Hotel App | Restaurant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/Hotel_Icon.png" />
      </Head>
      <main>
        <Layouts>
          <div className="container mx-auto">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/restaurant"> Restaurant</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Menu</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mt-5 mr-5 mb-5 flex">
              <Image
                src="/assets/resto/1.jpg"
                alt="resto"
                width={300}
                height={300}
              ></Image>
              <div className="m-5">
                <p className="text-2xl font-bold">{restaurant.hotel_name}</p>
                <p className="text-xl font-bold">{restaurant.faci_name}</p>
                <p>{/* {faci_description} */}</p>
              </div>
            </div>

            <hr className="my-5 border-t-2" />

            <div className="mt-3 flex my-20">
              <div className="w-3/5 border rounded-xl shadow p-3 mr-2 bg-white">
                <div className="text-xl font-bold text-center">
                  Menu Makanan dan Minuman
                </div>
                <div className="flex my-4">
                  <div className="w-1/2">
                    <Dropdown
                      menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ["1"],
                      }}
                    >
                      <Typography.Link>
                        <Space className="my-5 text-[#754cff]">
                          Urutkan Berdasarkan Harga
                          <DownOutlined />
                        </Space>
                      </Typography.Link>
                    </Dropdown>
                  </div>
                  <div className="right-0 w-1/2 py-4">
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Search for food..."
                      type="text"
                      name="search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap ml-5 item-center">
                  {menusWPagination
                    .filter((menu: any) => {
                      if (
                        menu.remename
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return menu;
                      }
                    })
                    .map(
                      (menu: any, key: any) => (
                        <div key={menu.remeid} className="w-52 mr-6 mb-12">
                          <div>
                            <a
                              onClick={() => showModalsMenu(menu)}
                              className=" hover:text-[#754cff]"
                            >
                              <img
                                src={`${configuration.BASE_URL}/${menu.rempurl}`}
                                alt={menu.remename}
                                className="h-40 w-full object-cover rounded-lg"
                              ></img>
                              <div className="ml-3 mt-3 h-40">
                                <p className="text-lg font-bold h-20">
                                  {menu.remename}
                                </p>
                                <p className="font-light my-2">{menu.remedescription}</p>
                                {/* <p className="text-amber-600 my-2 text-[11px]">
                                  {menu.remestatus}
                                </p> */}
                                <Tag color="green" className="text-[11px]">{menu.remestatus}</Tag>
                                <p className="text-[14px] font-bold text-right mr-4">{menu.remeprice}</p>
                              </div>
                            </a>
                            {/* <div className='absolute'> */}
                            <div className="w-full flex mt-2">
                              {userid ? (
                                <button
                                  onClick={() => addtocart(menu)}
                                  className="w-3/4 mx-auto rounded-full inline-block px-5 py-2 mt-4 bg-[#754cff] hover:bg-[#592fe4] text-white uppercase bottom-0"
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
                      // <div className='border rouded shadow my-5 hover:bg-slate-100 flex' onClick={() => showModalsMenu(menu)}>
                      //     <img src={`${configuration.BASE_URL}/${menu.rempurl}`} alt='cake' width={180} height={180}>
                      //     </img>
                      //     <div className='ml-3 mt-3'>
                      //         <p className='text-lg font-bold'>{menu.remename}</p>
                      //         <p>{menu.remedescription}</p>
                      //         <p>{menu.remeprice}</p>
                      //         <div className='mt-4 right'>
                      //             <button onClick={()=>addtocart(menu)} className='inline-block px-5 py-1 bg-slate-600 text-white rounded shadow uppercase'>
                      //                 Add item
                      //             </button>
                      //         </div>
                      //     </div>

                      // </div>
                    )}
                </div>

                <Pagination
                  onChange={handlePagination}
                  current={currentpage}
                  pageSize={10}
                  total={menus.length}
                  className="text-center py-14"
                />
              </div>

              {
                getCartTotal() === 0 || !userid ? (
                  <Affix className="w-2/5">
                    <div className="border font-semibold bg-white rounded-xl shadow py-20 ml-2 text-xl text-center">
                      Welcome to Hotel Realta ! <br />
                    </div>
                  </Affix>
                ) : (
                  //    <Affix className='w-2/5'>
                  <div className="bg-white rounded-lg shadow p-3 ml-2 sticky top-0 h-1/2 w-2/5">
                    <div className="text-xl font-bold text-center">
                      Checkout
                    </div>
                    <div className="text-lg pt-5 font-semibold">
                      Total Order : {getCartTotal()}
                    </div>
                    {cart &&
                      cart.map((order: any) => (
                        <div className="border rounded-lg p-4 shadow-md gap-y-2 my-5 flex">
                          <img
                            src={`${configuration.BASE_URL}/${order.rempurl}`}
                            alt="cake"
                            width={120}
                            height={120}
                          ></img>
                          <div className="ml-3 mt-1 w-full">
                            <div className="flex justify-between">
                              <p className="font-bold w-4/5">
                                {order.remename}
                              </p>
                              <button
                                onClick={() => removeFromCart(order)}
                                className="text-red-600 text-md mr-4"
                              >
                                <DeleteOutlined />
                              </button>
                            </div>
                            {/* <p>{order.desc}</p> */}
                            <p>
                              {parseInt(
                                order.remeprice
                                  .split(",")[0]
                                  .replace(/[^0-9]/g, "")
                              ).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p>
                              Qty:{" "}
                              <input
                                value={order.quantity}
                                onChange={(event) =>
                                  setQuantity(
                                    order,
                                    parseInt(event.target.value)
                                  )
                                }
                              />{" "}
                            </p>
                            <p>
                              Subtotal:{" "}
                              {order.subtotal.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>
                        </div>
                      ))}

                    {/* <div className='border rounded py-5 bg-slate-100 my-5'>
                            <p className='font-bold text-center py-2'>Payment Type</p>
                            <div className='text-center'>
                                <Radio.Group name='paymenttype' defaultValue={'cash'} onChange={paymentType} className='items-center'>
                                    <Radio value={'card'}>Pay Card</Radio>
                                    <Radio value={'cash'}>Pay Cash</Radio>
                                </Radio.Group>
                                <Select placeholder={'Select payment type...'} onChange={paymentType}>
                                    <Select.Option value='card'>Pay with your card</Select.Option>
                                    <Select.Option value='cash'>Pay cash</Select.Option>
                                </Select>
                                <br/>
                                <div>
                                { payType==='card' ? 
                                    <Select placeholder={'Select card type...'} className='w-4/6 py-3'>
                                        <Select.Option value='CR'>Credit Card</Select.Option>
                                        <Select.Option value='D'>Debit</Select.Option>
                                        <Select.Option value='PG'>Hotel Realta Wallet</Select.Option>
                                    </Select> 
                                  : null
                                }
                                </div>
                            </div>
                        </div> */}

                    <div className="border rounded-xl py-5">
                      <p className="text-lg font-bold text-center mb-4">Payment Summary</p>

                      <table className="py-5 mx-4">
                        <tbody>
                          <tr className="">
                            <td className="w-full">Sub total</td>
                            <td className="text-right">
                              Rp.{getTotalSum().toLocaleString("id-ID")}
                            </td>
                          </tr>
                          <tr className="">
                            <td className=" py-2">Tax(11%)</td>
                            <td className="text-right">
                              {tax().toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                          </tr>
                          <tr className="font-bold">
                            <td className=" py-2">Total payment</td>
                            <td className="text-right">
                              Rp.{sumWithTax().toLocaleString("id-ID")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <Link href='order'> */}
                    <a>
                      <div
                        onClick={placeOrder}
                        className="border rounded-full bg-[#754cff] my-5 text-center font-bold py-4 text-[#f2f1fa] hover:text-white"
                      >
                        PLACE ORDER HERE
                      </div>
                    </a>
                    {/* </Link> */}
                  </div>
                )
                //    </Affix>
              }
            </div>
          </div>

          {/* ----------------------------- MODALS UNTUK MENU ------------------------------ */}
          <Modal
            width={600}
            title={"Menu"}
            open={openMenu}
            onOk={handleOkButton}
            onCancel={handleCancel}
            footer={[
              <>
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                {/* <Button key='ok' onClick={()=>addtocart(menuDetail)}>Add Menu</Button> */}
              </>,
            ]}
          >
            <div>
              <img src={selected.rempurl} alt="menu" />
            </div>
            {/* <Carousel autoplay> */}
            <div className="flex">
              {menuDetailPhoto.map((photo: any) => (
                <>
                  {/* <img src={`${photo.rempurl}`} alt="Restaurant"   className='h-64 w-96 object-cover'/> */}
                  <div className="mr-3 transition ease-in-out delay-150 hover:scale-110 duration-300">
                    <a onClick={() => tampilkanPhoto(photo)}>
                      <div className=" p-2">
                        <img
                          src={photo.rempurl}
                          alt={photo.rempthumbnailfilename}
                          className="h-24 w-24 object-cover"
                        />
                      </div>
                    </a>
                  </div>
                </>
              ))}
            </div>
            {/* <Image src='/assets/resto/cake.jpg' alt={'cake'} width={100} height={160}  className='h-64 w-96'></Image>
                    <Image src='/assets/resto/resto.jpeg' alt={'cake'} width={100} height={160} className='h-64 w-96'></Image> */}

            {/* </Carousel> */}

            <p>Nama menu: {menuDetail.nama}</p>
            <p>Harga: {menuDetail.harga}</p>
            <p>Desc: {menuDetail.desc}</p>
          </Modal>
        </Layouts>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const {
    hotel_name,
    faci_name,
    // faci_description,
    faci_id,
  } = query;

  const restaurant = {
    hotel_name,
    faci_name,
    // faci_description,
    faci_id,
  };

  return {
    props: {
      restaurant,
    },
  };
}
