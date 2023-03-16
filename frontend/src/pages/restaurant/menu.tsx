import Layouts from "@/layouts/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  Affix,
  Breadcrumb,
  Button, 
  Modal,
  Pagination,
  Radio,
  Select,
  Tag,
} from "antd";
import Image from "next/image";
import { CloseOutlined, CoffeeOutlined, DeleteOutlined, DownOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
import Buttons from "@/components/Button";

export default function menu({ restaurant }:any) {
  let dispatch = useDispatch();
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  let userid = user[0]?.user_id;
  let menus = useSelector((state: any) => state.userMenuReducer.userMenu);
  let order_user = useSelector((state: any) => state.orderReducer.orderMenus);
  let numberOrder = useSelector(
    (state: any) => state.numberOrderReducer.numberOrder
  );
  let router = useRouter(); 

  let listmenu = menus.data; 

  // search data
  const [search, setSearch] = useState("");
  const [sortedData, setSorted] = useState(""); 

  // ------------------------ PAGINATION
  const [currentpage, setCurrentPage] = useState(1);
  const handlePagination = (page: any) => { 
    setCurrentPage(page);
  };

  // panggil data per page
  useEffect(() => { 
    let faci_id = restaurant.faci_id; 

    let data = {
      faci_id,
      search,
      currentpage,
      sortedData
    }

    dispatch(doUserMenuReq(data));
    dispatch(doOrder());
    dispatch(doOrderNumberReq());
  }, [menus, search, currentpage, sortedData]);

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

  const [cart, setCart]:any = useState([]);
 
  useEffect(() => {
    const cartdrlocalstorage = localStorage.getItem("cart");
    const parsedCart = cartdrlocalstorage !== null ? JSON.parse(cartdrlocalstorage) : [];
    cart ? setCart(parsedCart) : null;
  }, []);

  useEffect(() => {
    if (cart.length === 0) return
      localStorage.setItem("cart", JSON.stringify(cart)); 

    localStorage.setItem("result", JSON.stringify(ormeNumber));
  }, [cart]);

  // useEffect(() => {
  //   const cartdrlocalstorage = localStorage.getItem("cart");
  //   const parsedCart =
  //     cartdrlocalstorage !== null ? JSON.parse(cartdrlocalstorage) : [];
  //   setCart(parsedCart);
  // }, []);

  const [openCart, setOpenCart] = useState(false);
  const [newOrder, setNewOrder]:any = useState()
  function closeModalCart(){
    setOpenCart(false)
  }

  function changeOrder(){
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    // setCart([newOrder]);
    setOpenCart(false);
  }

  const addtocart = (menu: any) => {
    if(cart.length === 0 || menu.remefaciid == cart[0]?.remefaciid){
      let newCart:any = [...cart];
      let itemInCart:any = cart.find((item: any) => menu.remename === item.remename); 
      if (!itemInCart) {
        let itemInCart:any = {
          ...menu, 
          quantity: 1,
          subtotal: 0,
          orderNumber: code(),
        };
        let numberOfPrice = Number(
          menu.remeprice.split(",")[0].replace(/[^0-9]/g, "")
        ); 
        itemInCart.subtotal = itemInCart.quantity * numberOfPrice;
        newCart.push(itemInCart);
      } else {
        itemInCart.quantity++; 
        let numberString = menu.remeprice.split(",")[0].replace(/[^0-9]/g, "");
        const numberOfPrice = parseInt(numberString);
        itemInCart.subtotal = itemInCart.quantity * numberOfPrice;
        // console.log(typeof numberString)
      }
      setCart(newCart);
    }else{
      setOpenCart(true);
      setNewOrder(menu)
    }
    
    
    
  };
 
  const removeFromCart = (productToRemove: any) => { 
    setCart(cart.filter((product: any) => product !== productToRemove)); 
    
    if(cart.length === 1){
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  const clearCart = (): any => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((sum: number, { quantity }:any) => sum + quantity, 0); 
  };

  const setQuantity = (product: any, amount: any) => {
    // debugger;
    const newCart:any = [...cart];
    newCart.find((item:any) => item.remename === product.remename).quantity =
      amount;
    setCart(newCart);
  };

  
  // quantity by incdecr 
  function inc(product:any){
    const newcart:any = [...cart];
    newcart.map((cart:any) => {
      let price = Number(cart.remeprice.split(",")[0].replace(/[^0-9]/g, ""))
      if(cart.remename === product.remename){
        cart.quantity += 1;
        cart.subtotal = price * cart.quantity; 
      }

    }) 
    setCart(newcart);
  }

  function dec(product:any){
    let newcart:any = [...cart];
    newcart.map((cart:any) => {
      let price = Number(cart.remeprice.split(",")[0].replace(/[^0-9]/g, ""))
      if(cart.remename === product.remename){
        cart.quantity -= 1;
        cart.subtotal = price * cart.quantity; 
        
      }
    })
    let pushCart:any = [];
    newcart.map( (cart:any) => {
      if(cart.quantity !== 0){
        pushCart.push(cart) 
    }
    }) 
    if(getCartTotal() === 0){
      localStorage.setItem("cart", JSON.stringify([]));
    }
    setCart(pushCart)
  }

  // get total amount from selected products
  const getTotalSum = (): number => { 
    let jml = 0;
    cart.map((item: any) => {
      // ubah tipe data money ke integer agar bisa di hitung
      let numberOfPrice = Number(item.remeprice.split(",")[0].replace(/[^0-9]/g, ""));

      jml = numberOfPrice * item.quantity + jml;
    });
    return jml; 
  };

  function tax(): number {
    const subtotal = getTotalSum();
    const result = subtotal * (11 / 100);
    return result;
  }
 
  function sumWithTax() {
    const subtotal = getTotalSum();
    const totaltax = tax();

    // add tax 11% from sub total
    const result = subtotal + totaltax;

    return result;
  }

  
  let [ormeNumber, setOrmeNumber] = useState("");
  function code() { 
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
 
    // ambil semua data photo per- menu yang di klik
    const result = await axios(
      API("Get", `/resto-menu-photos/${menu.remeid}`, null)
    );
    let photos = result.data;
    setSelected({
      rempurl: `${configuration.BASE_URL}/resto-menu-photos/menu/` + photos[0].rempphotofilename,
    });

    // isi semua data yang bukan primary
    let migratePhoto: any = [];
    photos.map((photo: any) => { 
      let newDataPhoto = {
        remename: photo.rempname,
        rempid: photo.rempid,
        rempphotofilename: photo.rempphotofilename,
        rempprimary: "0",
        rempreme: photo.rempreme,
        rempthumbnailfilename: photo.rempthumbnailfilename,
        rempurl: `${configuration.BASE_URL}/resto-menu-photos/menu/${photo.rempphotofilename}`,
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
    dispatch(doAddOrder(order));
 
    router.push({
      pathname: "/restaurant/order",
      query: {
        orderNumber: code()
      }
    });

    localStorage.setItem("cart", JSON.stringify([]));
  }
 

  function handlesort(sort: any) {
    setSorted(sort);
  }
 
  // ------------------------- menu detail dengan photo
  const [selected, setSelected] = useState({
    rempurl: "",
  });
  function tampilkanPhoto(photo: any) {
    setSelected({
      rempurl: photo.rempurl,
    });
  }


  // ---- LOGIN
  function login(){
    router.push('/users/login');
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
              <Breadcrumb.Item><Link href="/restaurant"> Restaurant</Link></Breadcrumb.Item>
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
              </div>
            </div>

            <hr className="my-5 border-t-2" />

            <div className="mt-3 lg:flex  my-20">
              <div className="lg:w-3/5 sm:full sm:mb-4 border rounded-xl shadow p-3 lg:mr-2 bg-white lg:mb-0">
                <div className="text-xl font-bold text-center">
                  Menus
                </div>
                <div className="flex my-10">
                  <div className="w-1/2 ml-10">
                    <br />
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-4/5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Search for food..."
                      type="text"
                      name="search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    
                  </div>
                  <div className="w-1/2 text-right mr-10">
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
                </div>

                <div className="flex flex-wrap ml-5 item-center justify-center">
                {listmenu && listmenu.map(
                      (menu: any, key: any) => (
                        <div key={menu.remeid} className="w-52 mr-6 mb-12">
                          <div>
                            <a
                              onClick={() => showModalsMenu(menu)}
                              className=" hover:text-[#754cff]"
                            >
                              <img
                                src={`${configuration.BASE_URL}/resto-menu-photos/menu/${menu.rempphotofilename}`}
                                alt={menu.remename}
                                className="h-40 w-full object-cover rounded-lg"
                              ></img>
                              <div className="ml-3 mt-3 h-40">
                                <p className="text-lg font-bold h-20">
                                  {menu.remename}
                                </p>
                                {/* <p className="font-light my-2">{menu.remedescription}</p> */}
                                {/* <p className="text-amber-600 my-2 text-[11px]">
                                  {menu.remestatus}
                                </p> */}
                                <Tag color="green" className="text-[11px]">{menu.remestatus}</Tag>
                                <p className="text-[14px] font-bold text-right mr-4">{menu.remeprice}</p>
                              </div>
                            </a>
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
                    )}
                </div>
                {/* PAGINATION */}
                <Pagination
                  onChange={handlePagination}
                  current={currentpage}
                  // pageSize={10}
                  total={menus.counts}
                  className="text-center py-14"
                />
              </div>

                 { getCartTotal()===0 || !userid ? 
                   <Affix className='lg:w-2/5 sm:w-full'>
                    <div className='border font-semibold bg-white rounded-lg shadow py-20 lg:ml-2 text-xl text-center'>
                      <CoffeeOutlined className="text-5xl"/>
                      <br />
                        Welcome to Hotel Realta ! <br/>

                        { !userid ? 
                          <div>
                            Please sign in to order food
                            <br /><br />
                            <Buttons funcs={login}>
                              Login
                            </Buttons> 
                          </div> 
                        
                          : 'Please click add to cart to order your favorite food!'
                        }
                    </div> 
                   </Affix>
                 
                 : (
                  <div className="bg-white rounded-lg shadow p-3 sticky top-0 h-1/2 lg:w-2/5 sm:w-full">
                    <div className="text-xl font-bold text-center">
                      Checkout
                    </div>
                    <div className="text-lg pt-5 font-semibold">
                      Total Order : {getCartTotal()}
                    </div>
                    {cart &&
                      cart.map((order: any) => (
                        <div className="border rounded-lg p-4 shadow-md gap-y-2 my-5 flex" key={order.remeid}>
                        <div className="border rounded-lg p-4 shadow-md gap-y-2 my-5 flex" key={order.remeid}>
                          <img
                            src={`${configuration.BASE_URL}/resto-menu-photos/menu/${order.rempphotofilename}`}
                            alt={order.remename}
                            width={120}
                            height={120}
                            className="object-cover"
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
                                <CloseOutlined />
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
                            <div>
                              {/* // quantity by incdecr */}
                              <button onClick={()=>dec(order)} className='text-xl text-indigo-700'><MinusCircleOutlined className=" hover:bg-indigo-100 hover:rounded-full"/></button>
                              {"   " + order.quantity + "   "}
                              <button onClick={()=>inc(order)} className='text-xl text-indigo-700' ><PlusCircleOutlined className=" hover:bg-indigo-100 hover:rounded-full" /></button>
                            </div>
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
                              { tax().toLocaleString("id-ID", {
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
                
              }
            </div>
          </div>

          {/* ----------------------------- MODALS MENU ------------------------------ */}
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
              <img src={selected.rempurl} alt="menu" className="h-96 w-full object-cover object-center"/>
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

            <p className="text-lg font-bold">{menuDetail.nama}</p>
            <p>{menuDetail.desc}</p>
            <p>{menuDetail.harga}</p>
          </Modal>


          {/* ----------------------------- MODALS CART ------------------------------ */}
          <Modal
            width={600}
            title={"Add New Cart"}
            open={openCart}
            onOk={handleOkButton}
            onCancel={closeModalCart}
            footer={[
              <>
                <Button key="back" onClick={closeModalCart}>
                  Cancel
                </Button>
                <Button key='ok' onClick={changeOrder}>
                  Yes, Change Order
                </Button>
              </>,
            ]}
          >
            <div className="text-center text-xl font-bold">
              Items Previously Selected
            </div>

            {cart &&
              cart.map((order: any) => (
                <div className="border rounded-lg p-4 shadow-md gap-y-2 my-5 flex">
                  <img
                    src={`${configuration.BASE_URL}/resto-menu-photos/menu/${order.rempphotofilename}`}
                    alt={order.remename}
                    width={120}
                    height={120}
                  ></img>
                  <div className="ml-3 mt-1 w-full">
                    <div className="flex justify-between">
                      <p className="font-bold w-4/5">
                        {order.remename}
                      </p>
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

              <div className="text-base mb-10">
                This is your previous selected order from a different restaurant. <br />
                Are you sure you want to change this order?
              </div>
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
