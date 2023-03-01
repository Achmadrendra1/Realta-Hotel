import Layouts from '@/layouts/layout'
import { doGetUserOrder } from '@/Redux/Action/Resto/userOrderAction'
import { configuration } from '@/Redux/Configs/url'
import { Breadcrumb, Button, Card, Col, Dropdown, Form, Input, InputNumber, Radio, Row, Select } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Order() {
  let dispatch = useDispatch();
  let router = useRouter();
  const userLoggedIn = useSelector((state: any) => state.GetUserReducer.getUser);
  const orderFromUser = useSelector((state:any)=> state.userOrderReducer.userOrder);
  console.log(orderFromUser,'user');
  

  let [cart, setCart] = useState([]);
  let [result, setResult] = useState({
    ormeNumber: '',
    subtotal: 0,
    tax: 0,
    total: 0
  });
  useEffect(() => {
    // get order number fom local storage
    const orderFromlocalstorage = localStorage.getItem('result');
    const parsedOrderNumber = orderFromlocalstorage !== null ? JSON.parse(orderFromlocalstorage) : []

    const notParsedCart = localStorage.getItem('cart');
    const parsedCart = notParsedCart ? JSON.parse(notParsedCart) : [];

    const userid = userLoggedIn[0]?.user_id;
    setCart(parsedCart);
    setResult(parsedOrderNumber); 
    let data = {
      ormeNumber: parsedOrderNumber.ormeNumber,
      userId: userid
    }
 
    dispatch(doGetUserOrder(data));
  }, []);


  // let userOrder = useSelector((state:any) => state.userOrderReducer.userOrder);

  // console.log('orderNumber', userOrder[0].orme_order_number);


  // payment versi soffie
  const [payType, setPayType] = useState('cash')

  function paymentType(e: any) {
    if (e.target.value === 'card') setPayType('card')
    else setPayType('cash')
  }

  // BACK TO PREVIOUS PAGE
  function back() {
    router.back();
  }

  // ke halaman struk pembelian
  function goToBill(){
    router.push('bill');

  }
  // --------------------- PAYMENT DR RENRA
  
  // //State untuk menampilkan payment
  // const [payment, setPayment] = useState(false);
  // const [payMsg, setPayMsg] = useState('');
  
  // const [isCash, setIsCash] = useState(true);

  // const [dataOrder, setDataOrder] = useState({
  //   ormePayType: ''
  // })

  // const [dataPayment, setDataPayment] = useState({
  //   userId: 0,
  //   amount: 0,
  //   sourceNumber: "",
  //   targetNumber: "",
  //   trxType: "TRB",
  //   secureCode: "",
  //   orderNumber: "",
  // });

  
  // const [selectCard, setSelectCard] = useState({accNumber : '', balance : ''});
  // const onCompleteCash = () => {
  //   console.log(dataPayment)
  //   // dispatch(insertBooking(dataBooking));
  // };
  
  // useEffect(()=>{
    
  //   setDataPayment({ ...dataPayment, userId: userLoggedIn[0]?.user_id });
  // },[])

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
          <div className='container mx-auto'>
            <Breadcrumb className='pb-5'>
              <Breadcrumb.Item><a href='/restaurant'>Restaurant</a></Breadcrumb.Item>
              <Breadcrumb.Item><a onClick={back}>Menu</a></Breadcrumb.Item>
              <Breadcrumb.Item>Order</Breadcrumb.Item>
            </Breadcrumb>
            <div className='flex'>
              <div className='w-3/5 border rounded shadow p-3 mr-2'>
                <p className='text-2xl'>
                  Enter your details
                </p>
                <p className='pb-5'>
                  We will use these detais to share your order information
                </p>
                <Form
                  layout='vertical'
                >
                  <Form.Item label={'Fullname'}>
                    <Input placeholder='fullname' value={userLoggedIn[0]?.user_full_name}></Input>
                  </Form.Item>
                  <Form.Item label={'E-mail'}>
                    <Input placeholder='e-mail' value={userLoggedIn[0]?.user_email}></Input>
                  </Form.Item>
                  <Form.Item label={'No Handphone'}>
                    <Input placeholder='hp' value={userLoggedIn[0]?.user_phone_number}></Input>
                    {/* <Input.Group compact>
                        <Select defaultValue="+62" style={{ width: '30%' }}>
                          <Select.Option value="+1">+1 (USA)</Select.Option>
                          <Select.Option value="+44">+44 (UK)</Select.Option>
                          <Select.Option value="+62">+62 (Indonesia)</Select.Option>
                        </Select>
                      <Input style={{ width: '70%' }} placeholder="Nomor Telepon" />
      
                      </Input.Group> */}
                  </Form.Item>
                </Form>
                <p className='text-2xl'>
                  Payment
                </p>

                <div className='border rounded p-5 bg-slate-100 my-4'>
                  {/* // --------------------- PAYMENT DR RENRA--------------- */}
                  {/* <div className={`${payment ? "block" : "hidden"}`}>
                    <div className="font-bold text-2xl">
                      <p>3. Payment</p>
                    </div>
                    <div className="w-full h-screen p-8">
                      <p className="text-md text-center text-red-600">{payMsg}</p>
                      <Row gutter={16}>
                        <Col span={8}>
                          <Card
                            size="small"
                            className="m-4 font-bold text-[14px]"
                            hoverable
                            onClick={
                              () => {
                                setIsCash(true),
                                  setDataPayment({
                                    ...dataPayment,
                                    sourceNumber: "",
                                    targetNumber: "",
                                  }),
                                  setDataOrder({
                                    ...dataOrder,
                                    ormePayType: 'C'
                                  })
                              }
                            }
                          >
                            Cash
                          </Card>
                          <Card
                            size="small"
                            className="m-4 font-bold text-[14px]"
                            hoverable
                            onClick={
                              () => {
                                setIsCash(false), setSelectCard({ accNumber: '', balance: '' });
                                setDataPayment({
                                  ...dataPayment,
                                  sourceNumber: "",
                                  targetNumber: "",
                                  trxType: "TRB",
                                  secureCode: "",
                                })
                                setDataOrder({
                                  ...dataOrder,
                                  ormePayType: 'C'
                                })
                              }
                            }
                          >
                            Pay Now
                          </Card>
                        </Col>
                        <Col span={16}>
                          {isCash ? (
                            <div className="w-full text-center mt-6">
                              <div>
                                <p className="text-lg font-semibold">
                                  No payment is needed at the moment.
                                </p>
                                <p>
                                  We will confirm your stay without any charge. Pay
                                  directly at the hotel during your stay.
                                </p>
                              </div>
                              <Button
                                onClick={onCompleteCash}
                                className="mt-6 bg-blue-600 text-white w-full h-10"
                              >
                                Complete Order
                              </Button>
                            </div>
                          ) : (
                            <div className="mt-6 w-full ">
                              <p className="m-4">Fintech</p>
                              {isActive ? (
                                <Card
                                  size={"small"}
                                  className={`mb-2 ${selectCard.accNumber === accDompet?.usacAccountNumber &&
                                    "bg-slate-500 text-white"
                                    }`}
                                  hoverable
                                  onClick={
                                    () => {
                                      setSelectCard({ accNumber: accDompet?.usacAccountNumber, balance: accDompet?.usacSaldo })
                                      setDataPayment({
                                        ...dataPayment,
                                        sourceNumber: accDompet?.usacAccountNumber,
                                        targetNumber: "13198989898"
                                      })
                                      setDataBooking({
                                        ...dataBooking,
                                        boor_pay_type: 'PG',
                                        boor_cardnumber: accDompet?.usacAccountNumber
                                      })
                                    }
                                  }
                                >
                                  <div className="flex justify-between items-center px-6">
                                    <p className="text-[16px] font-semibold">
                                      Dompet Realta
                                    </p>
                                    <p className="text-[16px] font-semibold">
                                      {saldoDompet}
                                    </p>
                                  </div>
                                </Card>
                              ) : (
                                <Card size={"small"}>
                                  <div className="flex justify-between items-center px-6">
                                    <p className="text-[16px] font-semibold">
                                      Dompet Realta
                                    </p>
                                    <p
                                      className={`${selectCard.accNumber === accDompet?.usacAccountNumber
                                          ? "text-white"
                                          : "text-blue-700"
                                        }`}
                                      onClick={() => setShowActivation(true)}
                                    >
                                      Activate
                                    </p>
                                  </div>
                                </Card>
                              )}

                              <Card
                                size={"small"}
                                className={`mb-2 ${selectCard.accNumber === accGoto?.usacAccountNumber &&
                                  "bg-slate-500 text-white"
                                  }`}
                                hoverable
                                onClick={() =>
                                  isLinked
                                    ? setSelectCard({ accNumber: accGoto?.usacAccountNumber, balance: accGoto?.usacSaldo })
                                    : ""
                                }
                              >
                                <div className="flex justify-between px-6">
                                  <p className="text-[16px] font-semibold">GOTO</p>
                                  {isLinked ? (
                                    <p className="text-[16px] font-semibold">
                                      {saldoGoto}
                                    </p>
                                  ) : (
                                    <p
                                      className={`${selectCard.accNumber === accGoto?.usacAccountNumber
                                          ? "text-white"
                                          : "text-blue-700"
                                        }`}
                                      onClick={() => setShowLinked(true)}
                                    >
                                      Link Account
                                    </p>
                                  )}
                                </div>
                              </Card>

                              <p className="m-4">Debet/Credit Card</p>
                              {bankAcc.map((item: any) => (
                                <Card
                                  size={"small"}
                                  className={`mb-2 ${selectCard.accNumber === item.usacAccountNumber &&
                                    "bg-slate-500 text-white"
                                    }`}
                                  hoverable
                                  onClick={
                                    () => {
                                      setSelectCard({ accNumber: item.usacAccountNumber, balance: item.usacSaldo })
                                      setDataPayment({
                                        ...dataPayment,
                                        sourceNumber: item.usacAccountNumber,
                                        targetNumber: "13198989898"
                                      })
                                      setDataBooking({
                                        ...dataBooking,
                                        boor_pay_type: item.usacType == "Debet" ? "D" : "CR",
                                        boor_cardnumber: item.usacAccountNumber
                                      })
                                    }}
                                >
                                  <div className="flex justify-between px-6">
                                    <p className="text-[16px] font-semibold">
                                      {maskCardNumber(item.usacAccountNumber)}
                                    </p>
                                    <p>
                                      {
                                        payBank?.find(
                                          (obj: any) =>
                                            obj.bankEntityId == item.usacEntityId
                                        )?.bankName
                                      }{" "}
                                      - {item.usacType}
                                    </p>
                                  </div>
                                </Card>
                              ))}

                              <p
                                className="mt-2 px-2 cursor-pointer"
                                onClick={() => setOpenAdd(true)}
                              >
                                Add New Card
                              </p>
                              <Button
                                disabled={disabled}
                                onClick={onComplete}
                                className="mt-6 bg-blue-600 text-white w-full h-12"
                              >
                                Complete Order
                              </Button>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div> */}

                  <Form layout='vertical'>
                      <Form.Item label={'Payment Type'}>
                        <div className='text-center'>
                            <Radio.Group name='paymenttype' defaultValue={'cash'} onChange={paymentType} className='items-center'>
                                <Radio value={'card'}>Pay Card</Radio>
                                <Radio value={'cash'}>Pay Cash</Radio>
                            </Radio.Group>
                            <br/>
                            <div>
                            { payType==='card' ? 
                                <div className='w-40 mx-auto'>
                                  <Select placeholder={'Select card type...'} className='w-40 py-3'>
                                    <Select.Option value='CR'>Credit Card</Select.Option>
                                    <Select.Option value='D'>Debit</Select.Option>
                                    <Select.Option value='PG'>Hotel Realta Wallet</Select.Option>
                                  </Select> 
                                </div>
                              : null
                            }
                            </div>
                        </div>
                      </Form.Item>
                      <Form.Item label={'Account Payment'}>
                        <div className='text-center'>
                          <Input placeholder='account payment' className='w-80 mx-auto text-center'></Input>
                        </div>
                      </Form.Item>
                      
                    </Form>
                </div>

              </div>
              <div className='w-2/5 border rounded shadow p-3 mr-2'>
                <p className='text-center text-2xl font-bold'>Summary Order</p>
                <p className='text-m py-4'>Order Number {result.ormeNumber}</p>
                {
                  orderFromUser && orderFromUser.map((order: any) =>
                    <div className='border rouded shadow mt-5 my-5 hover:bg-slate-100 flex'>
                      {/* <img src={`${configuration.BASE_URL}/${order.rempurl}`} alt='cake' width={120} height={120}>
                      </img> */}
                      <div className='ml-3 mt-1 w-full'>
                        <div className='flex'>
                          <p className='font-bold w-4/5'>
                            {order.reme_name} 
                            <span className='text-red-400 ml-4'>
                              x {order.orme_qty}

                            </span>
                          </p>
                        </div>
                        {/* <p>{order.desc}</p> */}
                        <p>{order.orme_price}</p> 
                        <p>Subtotal: {order.orme_subtotal}</p> 
                      </div>

                    </div>
                  )
                }
                <div>
                  <table className='py-5 bg-slate-100 w-full'>
                    <p className='font-bold text-center py-4'>Payment Summary</p>
                    <tbody>
                      <div className='p-4'>
                        <tr className='hover:bg-slate-300' >
                          <td className='w-full'>Sub total</td>
                          <td className='text-right'>Rp.{result.subtotal.toLocaleString('id-ID')}</td>
                        </tr>
                        {/* <tr className='hover:bg-slate-300'>
                          <td>Discount [dapet dr manaa?]</td>
                          <td className='text-right'>Rp.0</td>
                        </tr> */}
                        <tr className='hover:bg-slate-300'>
                          <td className=' py-2'>Tax(11%)</td>
                          <td className='text-right'>{result.tax.toLocaleString('id-ID')}</td>
                        </tr>
                        <tr className='font-bold hover:bg-slate-300'>
                          <td className=' py-2'>Total payment</td>
                          <td className='text-right'>Rp.{result.total.toLocaleString('id-ID')}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                  <a onClick={goToBill}>
                    <div className='border rounded-lg bg-slate-100 my-5 text-center font-bold py-2 hover:bg-slate-300' >
                      Complete Your Request
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </Layouts>

      </main>
    </>
  )
}
