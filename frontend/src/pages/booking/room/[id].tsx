import Layouts from '@/layouts/layout'
import { Button, Card, Carousel, Col, DatePicker, Form, Input, Modal, Pagination, Progress, Row, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import {HiUserGroup} from 'react-icons/hi'
import {IoRestaurantSharp} from 'react-icons/io5'
import {BiSwim} from 'react-icons/bi'
import {CgGym} from 'react-icons/cg'
import Buttons from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getSpFacilities, getSpHotel, getSpReview } from '@/Redux/Action/Booking/BookingAction';
import { useRouter } from 'next/router';
import { CaretRightFilled, LeftOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getSpof, getBoor, insertBooking } from '@/Redux/Action/Booking/BookingAction';
import { doPriceItems } from '@/Redux/Action/Master/actionPriceItems';
import { doGetUser } from '@/Redux/Action/User/GetDataUser';
import withAuth from '@/PrivateRoute/WithAuth';

export default withAuth (function bookingRoom() {
    
    const root = useRouter()
    const {id} = root.query || {}
    const dispatch = useDispatch()
        
    //useEffect Reducer
    useEffect(()=>{
        dispatch(getSpHotel())
        dispatch(getSpFacilities())
        dispatch(getSpReview())
        dispatch(getSpof())
        dispatch(doPriceItems());
        dispatch(getBoor())
        dispatch(doGetUser())
    }, [id]);

    
    //useSelector Get Hotel All
    let hotel = useSelector((state : any) => state.HotelBoorReducer.hotel)
    const hotelById = hotel?.filter((item : any)=> item.hotel_id == id)

    //useSelector Get Room by Hotel Id
    let room = useSelector((state : any) => state.FaciBoorReducer.facilities)
    const faciRoom = room.filter((item : any)=> item.hotel_id == id)

    //useSelector Average Rating Hotel
    let hotelReview = useSelector((state : any) => state.ReviewBoorReducer.review)
    const oneReview = hotelReview?.filter((item:any) => item.hore_hotel_id == id)

    //useSelector Get Special Offers
    let spof = useSelector((state : any) => state.SpofReducer.spof)
    const typeSpof = spof?.filter((item : any)=> item.spofType == 'Individual')

    //useSelector Get Price Items for Booking Extra
    let extra = useSelector((state : any) => state.priceItemsReducer.priceItems)

    //useSelector Get Last Booking Order
    let boorNumber = useSelector((state : any) => state.BoorReducer.boor)

    //useSelector Get User
    let getUser = useSelector((state : any) => state.GetUserReducer.getUser)

    //State untuk View More Amanities
    const [more, setMore] = useState(false)

    //State untuk Price Room
    const [priceRoom, setPriceRoom] = useState(
        {
            faci_id : Number,
            faci_name : '',
            faci_high_price : '',
            faci_rate_price : '',
            faci_tax_rate : ''
        }
        )

    //State untuk modal Special Offers
    const [spofOpen, setSpofOpen] = useState(false)

    //State untuk table Special Offers
    const [spofPrice, setSpofPrice] = useState(
        {
            spofId : Number,
            spofName : '',
            spofDiscount : ''
        }
    )

    let spofDiscInt = parseInt(spofPrice.spofDiscount.split(',')[0].replace(/[^0-9]/g, ''))
    let ratePriceInt = parseInt(priceRoom.faci_rate_price.split(',')[0].replace(/[^0-9]/g, ''))  
    let taxRateInt = parseInt(priceRoom.faci_tax_rate.split(',')[0].replace(/[^0-9]/g, ''))

    
    //State untuk totalPrice Rate Hotel dikurangin Special Offers
    const [totalPrice, setTotalPrice] = useState(0)

    //State untuk menampilkan Booking Detail
    const [detail, setDetail] = useState(false)

    //State untuk menampilkan payment
    const [payment, setPayment] = useState(false)

    //State untuk button modal booking extra
    const [addExtra, setAddExtra] = useState(false)

    //State untuk table Booking Extra
    const [valueExtra, setValueExtra] = useState(
        {
            pritName:[] as any[],
            pritPrice:[] as any[]
        }
        )

        //Looping Map untuk menampilkan data booking extra
        const dataExtra = valueExtra.pritName.map((name : any, index : any) => {
            return {
                key : index,
                name : name,
                price : valueExtra.pritPrice[index]
            }
        })
        
    //State untuk extraTotal 
    const [extraTotal, setExtraTotal]=useState({
        extraSubTotal : ''
    })

    //Table Column untuk Booking Extra
    const columnsExtra = [
        {
            title : 'Item Name',
            dataIndex : 'name'
        },
        {
            title : 'Price',
            dataIndex : 'price'
        },
        {
            title : 'Quantity',
            dataIndex : ''
        },
        {
            title : 'SubTotal',
            dataIndex : ''
        },
        {
            title : (<div className='float-right'>
                        <button onClick={()=> setAddExtra(true)}>Add</button>
                    </div>),
            key : 'action',
            render : (text : any, record : any, index : any) => (
                <button onClick={()=> handleDelete(index)}>Delete</button>
            )
        }
    ]

    //Table column untuk Booking Extra dalam Modal
    const columnsExtraModal = [
        {
            title : 'Item Name',
            dataIndex : 'pritName',
            key : 1
        },
        {
            title : 'Price',
            dataIndex : 'pritPrice',
            key : 2
        },
        {
            key : 'action',
            render : (text : any, record : any, index : any) => (
                <div className='flex justify-end'>
                    <button onClick={()=>handleValueExtra(index)}>Add</button>
                </div>
            )
        }
    ]

    //Variable untuk Get Room into Booking Detail
    const faci_id = faciRoom?.length > 0 ? faciRoom[0].faci_id: null
    const faci_name = faciRoom?.length > 0 ? faciRoom[0].faci_name : ''
    const faci_rate_price = faciRoom?.length > 0 ? faciRoom[0].faci_rate_price : ''
    const faci_high_price = faciRoom?.length > 0 ? faciRoom[0].faci_high_price : ''
    const faci_tax_rate = faciRoom?.length > 0 ? faciRoom[0].faci_rate_price : ''

    //Variable Count and Filter Rating
    let rating1 = oneReview?.filter((item : any)=> item.hore_rating == 1).length;
    let rating2 = oneReview?.filter((item : any)=> item.hore_rating == 2).length;
    let rating3 = oneReview?.filter((item : any)=> item.hore_rating == 3).length;
    let rating4 = oneReview?.filter((item : any)=> item.hore_rating == 4).length;
    let rating5 = oneReview?.filter((item : any)=> item.hore_rating == 5).length;

    //Variable Count All Reviews
    let allReview = oneReview.length 

    //Variable Count All Rating
    let allRating = oneReview?.reduce((acc : any, curr : any)=> acc + curr.hore_rating, 0)
    
    //Variable Average Rating
    let averageRating = allRating / allReview
    let rating = averageRating.toFixed(1)

    //Variable Rating Class
    let ratingClass = ''
    if(Number(rating) >= 4.5) {
        ratingClass = 'Very Good'
    }else if (Number(rating) >= 3.5) {
        ratingClass = 'Good'
    }else if (Number(rating) >= 2.5 ) {
        ratingClass = 'Enough'
    }else if (Number(rating) >= 1.5) {
        ratingClass = 'Bad'
    }else {
        ratingClass = 'Very Bad'
    }

    //Configure Date untuk Booking
    const dateFormat = "DD MM YYYY"
    const disabledDate = (current : any, checkInDate : any) => {
        if(checkInDate){
            return(
                current < dayjs().startOf('day') || 
                current.isBefore(checkInDate, 'day')
            )
        }
        return current < dayjs().startOf('day')
    };

    const onCheckInChange = (date: any, dateString : any) => {
        setDataBooking({ ...dataBooking, borde_checkin: dateString, boor_arrival_date : dateString})
        // setCheckInDate(dayjs(dateString))
    }

    const onCheckOutChange = (date: any, dateString : any) => {
        setDataBooking({ ...dataBooking, borde_checkout: dateString})
        // setCheckOutDate(dayjs(dateString))
    }

    const [dataBooking, setDataBooking]=useState({
        boor_user_id : getUser[0] ? getUser[0].user_id: 'None',
        boor_hotel_id : id,
        boor_order_number : '',
        boor_order_date : new Date,
        boor_arrival_date : '',
        boor_total_room : 0,
        boor_total_guest : 0,
        boor_discount :0,
        boor_total_tax : 0,
        boor_total_amount : 0,
        boor_down_payment : 0,
        boor_pay_type : '',
        boor_is_paid : 'P',
        boor_type : '',
        boor_cardnumber : '',
        boor_member_type : '',
        boor_status : 'Booking',
        borde_checkin : '',
        borde_checkout : '',
        borde_adults : 0,
        borde_kids : 0,
        borde_price : 0,
        borde_extra : 0,
        borde_discount : 0,
        borde_tax : 0,
        borde_subtotal : 0,
        borde_faci_id : priceRoom.faci_id,
        soco_spof_id : spofPrice.spofId
    })

    // console.log(dataBooking)

    useEffect(()=>{
        setDataBooking({
            ...dataBooking, borde_price : ratePriceInt, borde_discount : spofDiscInt, borde_tax : taxRateInt, borde_subtotal : totalPrice
        })
    }, [ratePriceInt, spofDiscInt, taxRateInt, totalPrice])

    // useEffect list hotel into Booking Detail
    // useEffect(()=> {
    //     setPriceRoom({
    //         faci_id, faci_name, faci_rate_price, faci_high_price, faci_tax_rate
    //     })
    // }, [faci_name])

    //UseEffect untuk change auto totalPrice di booking
    useEffect(() => {
        const subTotal = () => {
            const sumPriceSpof = ratePriceInt - spofDiscInt
            setTotalPrice (sumPriceSpof)
        };
        subTotal()
        }, [faciRoom.faci_rate_price, spofPrice.spofDiscount]);   

    //useEffect untuk input price room ke state insert
    useEffect(()=>{
        if(priceRoom){
            setDataBooking({
                ...dataBooking, borde_price : priceRoom.faci_rate_price, borde_tax : priceRoom.faci_tax_rate, borde_faci_id : priceRoom.faci_id
            })
        }
    }, [priceRoom])

    //useEffect untuk input special offer ke state insert
    useEffect(()=> {
        if(spofPrice){
            setDataBooking({
                ...dataBooking, soco_spof_id : spofPrice.spofId, borde_discount : spofPrice.spofDiscount
            })
        }
    }, [spofPrice])

    //useEffect untuk auto munculin perhitungan extra
    useEffect(()=> {
        const totalExtra = () => {
        const sumEx = valueExtra.pritPrice.map(a => parseInt(a.substring(2).replace(".","")))
        const sumExTotal = sumEx.reduce((a,b)=> a + b, 0)
        const sumTotal = (sumExTotal).toLocaleString("id-ID", {style : "currency", currency: "IDR"})
        setExtraTotal({...extraTotal, extraSubTotal : sumTotal})
        }
        totalExtra()
        // const empTotalPrice = parseInt(totalPrice.substring(2).replace('.',''))
        // const newExtraTotal = parseInt(extraTotal.extraSubTotal.substring(2).replace('.',''))
        // const moneyTotal = (empTotalPrice + newExtraTotal).toLocaleString("id-ID", {style : "currency", currency:"IDR"})
        // setTotalPrice(moneyTotal)
    }, [valueExtra.pritPrice])

    //Handle button selected room into booking
    const handleButtonSelected = (index : any) => {
        const selected = faciRoom[index];
        setPriceRoom({faci_id : selected.faci_id, faci_name : selected.faci_name, faci_high_price : selected.faci_high_price, faci_rate_price : selected.faci_rate_price, faci_tax_rate : selected.faci_tax_rate})
    }

    //Handle button add Special Offers
    const handleButtonModal = (index : any) => {
        const selected = typeSpof[index];
        setSpofPrice({spofId : selected.spofId, spofName : selected.spofName, spofDiscount : selected.spofDiscount})
        setSpofOpen(false)
    }
    
    // Handle untuk Booking Extra di dalam Modal    
    const handleValueExtra = (index : any) => {
        const selected = extra[index]
        const newValueExtraName = [...valueExtra.pritName, selected.pritName]
        const newValueExtraPrice = [...valueExtra.pritPrice, selected.pritPrice]
        setValueExtra({
            pritName:newValueExtraName,
            pritPrice:newValueExtraPrice
        })
        setAddExtra(false)   
    }

    // const handleValueExtra = (id : any) => {
    //     const selected = extra.find(item => item.idExtra === id);
    //     if (selected) {
    //         const newValueExtraName = [...valueExtra.pritName, selected.pritName];
    //         const newValueExtraPrice = [...valueExtra.pritPrice, selected.pritPrice];
    //         setValueExtra({
    //         pritName: newValueExtraName,
    //         pritPrice: newValueExtraPrice
    //         });
    //     }
    // }

    //Handle delete untuk tabel extra
    const handleDelete = (index:any) => {
        const delPritName = valueExtra.pritName.filter((name, i) => i !== index);
        const delPritPrice = valueExtra.pritPrice.filter((price, i) => i !== index);
        setValueExtra({pritName : delPritName, pritPrice : delPritPrice})
    }

    //Handle untuk generate booking code otomatis
    const handleBookingCode = () => {
        dispatch(insertBooking(dataBooking))
    }

    const handleReservation = () => {
        if (boorNumber !== null){              
            const lastOrderNumber = boorNumber?.length > 0 ? boorNumber[0].boor_order_number : null;
            const currentDate = new Date();
            const year = currentDate.getFullYear().toString();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const currentDateString = `${day}${month}${year}`;
            let newOrderNumber;
            if (lastOrderNumber) {
            const lastOrderDate = lastOrderNumber.slice(3, 11).split('-').reverse().join('');
            const lastOrderIncrement = parseInt(lastOrderNumber.slice(-4));
        
            if (lastOrderDate === currentDateString) {
                const newOrderIncrement = lastOrderIncrement + 1;
                const newOrderIncrementString = newOrderIncrement.toString().padStart(4, '0');
                newOrderNumber = `BO#${currentDateString}-${newOrderIncrementString}`;
                setDataBooking({...dataBooking, boor_order_number : newOrderNumber})
            } else {
                newOrderNumber = `BO#${currentDateString}-0001`;
                setDataBooking({...dataBooking, boor_order_number : newOrderNumber})
            }
            // } else {
            // newOrderNumber = `BO#${currentDateString}-0001`;
            // }
            setDetail(!detail)
            }
        }
    }
        

    const handleGuestValue = (value : any) => {
        setDataBooking({...dataBooking, boor_total_guest : value, borde_adults : value})
    }

    const handleRoomValue = (value : any) => {
        setDataBooking({...dataBooking, boor_total_room : value})
    }


    const contentStyle: React.CSSProperties = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    return (
        <Layouts>
            <div className='mb-3 rounded'>
                <Carousel autoplay>
                    <div>
                    <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
            <div>
                <Row gutter={16}>
                    <Col span={14} className={`${!detail ? "block" : "hidden"}`}>
                        <div className='mb-3'>
                            {
                                hotelById &&
                                hotelById.map((hotel : any)=>{
                                    return (
                                        <div>
                                            <div className='flex'>
                                                <div className='flex text-4xl mr-5 font-bold'>
                                                    <p>{hotel.hotel_name}</p>
                                                </div>
                                                <div className='flex'>
                                                    {/* <Rate allowHalf disabled defaultValue={hotel.hotel_rating_star} /> */}
                                                    <div>
                                                                <div className='flex border-2 rounded items-center justify-center w-20 h-10 text-2xl'>
                                                                    <h2>{rating}</h2>
                                                                    <div className='flex justify-center'>
                                                                        <img
                                                                        className='ml-2 w-5 h-5'
                                                                        src="../../assets/star.png"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='flex'>
                                                                    <div className='flex justify-center'>
                                                                        <h2 className='ml-2 mr-2'>({allReview} Ratings)</h2>
                                                                    </div>
                                                                    <div className='flex justify-center ml-3'>
                                                                        <h2>{ratingClass}</h2>
                                                                    </div>
                                                                </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-l mt-2'>
                                                <p>{hotel.place}</p>
                                            </div>
                                            <div className='text-xl mt-2 font-semibold'>
                                                <p>Description</p>
                                            </div>
                                            <div className='text-m mt-1 w-3/4'>
                                                <p>{hotel.hotel_description}</p>
                                            </div>
                                            <div className='text-xl mt-3 mb-1 font-semibold'>
                                                <p>Amenities</p>
                                            </div>
                                            <div className="flex">
                                                <div className="flex items-center mr-2">
                                                <HiUserGroup/> Meeting Room
                                                </div>
                                                <div className="flex items-center mr-2">
                                                <IoRestaurantSharp/> Restaurant
                                                </div>
                                                <div className="flex items-center mr-2">
                                                <BiSwim/> Swimming Pool
                                                </div>
                                                <div className={`${more ? "block flex items-center mr-2" : "hidden"}`}>
                                                <HiUserGroup/> Ballroom
                                                </div>
                                                <div className={`${more ? "block flex items-center mr-2" : "hidden"}`}>
                                                <CgGym/> Gym
                                                </div>
                                                <div className={`${more ? "block flex items-center mr-2" : "hidden"}`}>
                                                <HiUserGroup/> Aula
                                                </div>
                                                <div className="flex items-center">
                                                <button onClick={()=> setMore(!more)} className={`${more ? "hidden" : "block"}`}>+View More</button>
                                                <button onClick={()=> setMore(!more)} className={`${!more ? "hidden" : "block"}`}>-Less More</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='text-2xl font-semibold my-2'>
                            Choose Your Room
                        </div>
                        <div>
                            {
                                faciRoom &&
                                faciRoom.map((room : any, index : any)=>{
                                    return (
                                        <div>
                                            <Card>
                                                <Row>
                                                    <Col span={12}>
                                                    <div className='text-xl'>
                                                        {room.faci_name}
                                                    </div>
                                                    <div>
                                                        Max Vacant : {room.faci_max_number}
                                                    </div>
                                                    <div className="flex">
                                                        <div className="flex text-xl items-center mr-3">
                                                        {room.faci_rate_price}
                                                        </div>
                                                        <div className="flex text-l text-decoration-line: line-through items-center">
                                                            {room.faci_high_price}
                                                        </div>
                                                    </div>
                                                    </Col>
                                                    <Col span={12}>
                                                        <div className='float-right'>
                                                            <div>
                                                                ini foto
                                                            </div>
                                                            <div>
                                                                <Buttons funcs={()=>handleButtonSelected(index)}>Selected</Buttons>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='my-3 mx-1'>
                            <div className='text-xl mt-10 mb-3'>
                                Rating and Reviews
                            </div>
                            <div className='mr-1'>
                                <Row>
                                    <Col span={10} className='flex justify-center'>
                                        <div>
                                            <div className='flex border-2 rounded items-center justify-center w-20 h-10 text-2xl'>
                                                <h2>{rating}</h2>
                                                <div className='flex justify-center'>
                                                    <img
                                                    className='ml-2 w-5 h-5'
                                                    src="../../assets/star.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-center'>
                                                <h2>{ratingClass}</h2>
                                            </div>
                                            <div className='flex justify-center'>
                                                <h2 className='mr-2'>{allReview}</h2> Ratings
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={14}>
                                        <div className='w-3/4 float-right'>
                                            <div>
                                                <div className='flex'>
                                                        <div>
                                                            <h2>5</h2>
                                                        </div>
                                                        <div className='items-center'>
                                                            <img
                                                                className='mx-1 w-5 h-5'
                                                                src="../../assets/star.png"
                                                                />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress 
                                                            percent={Math.round((rating5/allReview)*100)}
                                                            format={() => <span style={{ color: "#000" }}>{Math.round((rating5/allReview)*100)}%</span>}
                                                            strokeColor=""
                                                            trailColor=""/>
                                                        </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex'>
                                                        <div>
                                                            <h2>4</h2>
                                                        </div>
                                                        <div className='items-center'>
                                                            <img
                                                                className='mx-1 w-5 h-5'
                                                                src="../../assets/star.png"
                                                                />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress 
                                                            percent={Math.round((rating4/allReview)*100)} 
                                                            format={() => <span style={{ color: "#000" }}>{Math.round((rating4/allReview)*100)}%</span>}
                                                            />
                                                        </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex'>
                                                        <div>
                                                            <h2>3</h2>
                                                        </div>
                                                        <div className='items-center'>
                                                            <img
                                                                className='mx-1 w-5 h-5'
                                                                src="../../assets/star.png"
                                                                />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress 
                                                            percent={Math.round((rating3/allReview)*100)} 
                                                            format={() => <span style={{ color: "#000" }}>{Math.round((rating3/allReview)*100)}%</span>}
                                                            />
                                                        </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex'>
                                                        <div>
                                                            <h2>2</h2>
                                                        </div>
                                                        <div className='items-center'>
                                                            <img
                                                                className='mx-1 w-5 h-5'
                                                                src="../../assets/star.png"
                                                                />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress 
                                                            percent={Math.round((rating2/allReview)*100)} 
                                                            format={() => <span style={{ color: "#000" }}>{Math.round((rating2/allReview)*100)}%</span>}
                                                            />
                                                        </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex'>
                                                        <div>
                                                            <h2>1</h2>
                                                        </div>
                                                        <div className='items-center'>
                                                            <img
                                                                className='mx-1 w-5 h-5'
                                                                src="../../assets/star.png"
                                                                />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress 
                                                            percent={Math.round((rating1/allReview)*100)} 
                                                            format={() => <span style={{ color: "#000" }}>{Math.round((rating1/allReview)*100)}%</span>}
                                                            />
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='mb-5 mt-3'>
                        {
                            oneReview &&
                            oneReview.map((hotelReview : any)=> {
                                return(
                                <div>
                                    <div className='flex items-center'>
                                        <div className='text-xl mr-5 font-semibold'>
                                            {hotelReview.user_full_name}
                                        </div>
                                        <div className='text-l items-center'>
                                            <p>{dayjs(hotelReview.hore_created_on).format('DD-MM-YYYY')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {hotelReview.hore_user_review}
                                    </div>
                                </div>
                                )
                            })
                        }
                        </div>                 
                        <div>
                            <p className='text-2xl font-semibold my-2'>Hotel Policies</p>
                        </div>
                        <div className='flex'>
                            <div className='mr-14 text-l'>
                                Checkin
                            </div>
                            <div className='text-l'>
                                Checkout
                            </div>
                        </div>
                        <div className='flex mb-1'>
                            <div className='mr-4 text-xl font-semibold'>
                                02:00 PM
                            </div>
                            <div className='text-xl font-semibold'>
                                12:00 PM
                            </div>
                        </div>
                        <div>
                            <CaretRightFilled /> Cancellation policy, Notify 24 hours prior to arrival for full refund.
                        </div>
                        <div>
                            <CaretRightFilled/> Insurance policy, Guests responsible for lost or stolen items.
                        </div>
                        <div>
                            <CaretRightFilled/> Hospitality, Providing excellent service to exceed guest expectations.
                        </div>
                    </Col>
                    <Col span={14} className={`${detail ? "block" : "hidden"}`}>
                        <button onClick={()=> setDetail(!detail)}>
                            <div className='flex'>
                                <div className='flex text-xl items-center mr-3'>
                                    <LeftOutlined />
                                </div>
                                <div className='flex font-semibold text-xl items-center'>
                                    Modify your booking
                                </div>
                            </div>
                        </button>
                        <div className='font-bold text-2xl'>
                            <p>1. Enter Your Details</p>
                        </div>
                        <div className='text-xl items-center my-3'>
                            <p>We will use these details to share your booking information</p>
                        </div>
                        <Row>
                            <Col span={12} className='mb-5'>
                                <div>
                                    <div className='text-l mb-2'>
                                        <p>Full Name :</p>
                                    </div>
                                    <div>
                                        <Input value={getUser[0] ? getUser[0].user_full_name: 'None'} className='w-3/4' disabled></Input>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <div className='text-l mb-2'>
                                        <p>Email :</p>
                                    </div>
                                    <div>
                                        <Input value={getUser[0] ? getUser[0].user_email: 'None'} disabled className='w-3/4'/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div>
                                    <div className='text-l mb-2'> 
                                        <p>Mobile Number : </p>
                                    </div>
                                    <div className='mb-5'>
                                        <Input value={getUser[0] ? getUser[0].user_phone_number: 'None'} disabled className='w-3/4'/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className='font-bold text-2xl'>
                            <p>2. Complete your booking</p>
                        </div>
                        <div className='text-xl items-center my-3'>
                            <Modal
                                title="Add Extra"
                                centered
                                open={addExtra}
                                onOk={() => setAddExtra(false)}
                                onCancel={() => setAddExtra(false)}
                                footer = {null}
                                width = {750}
                            >
                            <div>
                                <Table columns={columnsExtraModal} dataSource={extra} pagination={{ pageSize: 5 }}/>
                            </div>
                        </Modal>
                            <Table columns={columnsExtra} dataSource={dataExtra}/>
                        </div>
                        <div className='flex justify-between'>
                            {/* <div className='flex justify-between'>
                                Total Booking Extra
                            </div>
                            <div className='flex justify-between'>
                                {extraTotal.extraSubTotal}
                            </div>
                            <div className='flex justify-between'>
                                <button>Simpan</button>
                            </div> */}
                        </div>
                        <div className={`${payment ? "block" : "hidden"}`}>
                            <div className='font-bold text-2xl'>
                                <p>3. Payment</p>
                            </div>
                            <div>
                                <Row>
                                    <Col span={12} className='items-center mt-3 mb-1 text-l'>
                                        <p>Pick Your Payment :</p> 
                                    </Col>
                                    <Col span={12} className='mt-3 mb-1'>
                                        <p>Account Number : ???</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='mb-16'>
                                <Row>
                                    <Col span={12} className='items-center'>
                                    <Select
                                        defaultValue="Pay At Hotel"
                                        style={{ width: 200 }}
                                        options={[
                                            { value: 'C', label: 'Pay At Hotel' },
                                            { value: 'CR', label: 'Credit Card' },
                                            { value: 'D', label: 'Debet' },
                                            { value: 'PG', label: 'Payment Gateway' },
                                        ]}
                                    />   
                                    </Col>
                                    <Col span={12}>
                                        <Input className='w-3/4'/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col span={10}>
                    <div className='sticky top-0 border-4 shadow-lg p-3 rounded-lg'>
                        <div className='flex justify-center font-extrabold text-3xl'>
                            Booking Order Details
                        </div>
                        <div>
                            <h1>{dataBooking.boor_order_number}</h1>
                        </div>
                        <div className='flex text-center mt-3 items-center'>
                            <div className='flex text-2xl font-bold text-center'>
                                <p>{priceRoom.faci_rate_price}</p>
                            </div>
                            <div className='flex ml-2 text-m line-through text-center'>
                                <p>{priceRoom.faci_high_price}</p>
                            </div>
                        </div>
                        <div className='text-m mt-1 mb-3'>
                            Include Tax
                        </div>
                        <div className='flex mb-3'>
                            <div className='mr-2'>
                                <DatePicker
                                    placeholder='Check-In'
                                    onChange={onCheckInChange}
                                    disabledDate={(current)=> disabledDate(current, dayjs())}
                                    format={dateFormat}
                                />
                            </div>
                            <div>
                                <DatePicker
                                    placeholder='Check-Out'
                                    onChange={onCheckOutChange}
                                    disabledDate={(current)=> disabledDate(current, dayjs())}
                                    format={dateFormat}
                                />
                            </div>
                            <div className='mr-2'>
                            <Select
                                    defaultValue="0"
                                    style={{ width: 50 }}
                                    onChange={handleGuestValue}                                    
                                    options={[
                                        { value: 1, label: '1' },
                                        { value: 2, label: '2' },
                                        { value: 3, label: '3' },
                                        { value: 4, label: '4' },
                                    ]}
                                />    
                            </div>
                            <div className='flex mr-2 items-center'>
                                Guest
                            </div>
                            <div className='mr-2'>
                            <Select
                                    defaultValue="0"
                                    style={{ width: 50 }}
                                    onChange={handleRoomValue}                                    
                                    options={[
                                        { value: 1, label: '1' },
                                        { value: 2, label: '2' },
                                        { value: 3, label: '3' },
                                    ]}
                                />    
                            </div>
                            <div className='flex mr-2 items-center'>
                                Room
                            </div>
                        </div>
                        <div className='text-xl font-semibold mt-1 mb-3'>
                            <p>{priceRoom.faci_name}</p>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className=' flex my-1 items-center'>
                                <Modal
                                    title="Special Offers"
                                    centered
                                    open={spofOpen}
                                    onOk={() => setSpofOpen(false)}
                                    onCancel={() => setSpofOpen(false)}
                                    footer = {null}
                                    width = {750}
                                >
                                {
                                    typeSpof &&
                                    typeSpof.map((spof : any, index : any)=>{
                                        return (
                                            <div>
                                                <Card>
                                                    <Row>
                                                        <Col span={16}>
                                                            <div className='flex items-center mb-3'>
                                                                <div className='items-center w-12 mr-3'>
                                                                    <img src='../../assets/Hotel_Icon.png'/>
                                                                </div>
                                                                <div className='items-center'>
                                                                <Tag color="volcano">{spof.spofName}</Tag>
                                                                </div>
                                                            </div>
                                                            <div className='text-xl font-bold mb-3'>
                                                                <p>{spof.spofDiscount}</p>
                                                            </div>
                                                            <div className='text-m '>
                                                                <p>{spof.spofDescription}</p>
                                                            </div>
                                                        </Col>
                                                        <Col span={8}>
                                                            <div className='float-right'>
                                                                <Buttons funcs={()=>handleButtonModal(index)}>Apply</Buttons>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </div>
                                        )
                                    })
                                }
                                </Modal>
                                    <Buttons funcs={()=> setSpofOpen(true)}>Get Coupons</Buttons>
                            </div>
                            <div className='text-xl font-semibold'>
                                {spofPrice.spofName}
                            </div>
                            <div className='flex text-xl my-1 items-center'>
                                - {spofPrice.spofDiscount}
                            </div>
                        </div>
                        <div className='flex items-center justify-between mb-3'>
                            <div className='flex text-l items-center'>
                                Additional Extra
                            </div>
                            <div className='flex text-xl items-center'>
                                 {extraTotal.extraSubTotal}
                            </div>
                        </div>
                        <div className='flex items-center justify-between mb-3'>
                            <div className='flex text-l items-center'>
                                Your Saving
                            </div>
                            <div className='flex text-xl items-center'>
                                 - {spofPrice.spofDiscount}
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex text-l items-center'>
                                Total Price
                            </div>
                            <div className='flex text-xl items-center'>
                                 <p>{totalPrice}</p>
                            </div>
                        </div>
                        <div className='text-m'>
                            (Include Tax)
                        </div>
                        <div className='flex justify-center mt-3'>
                            <Button onClick={handleReservation} className={`${detail ? "hidden" : "block"}`}>Reservation Booking</Button>
                            <Button onClick={()=>setPayment(!payment)} className={`${!detail ? "hidden" : "block"}`} >Continue to Booking Order</Button>                            
                        </div>
                    </div>
                </Col>
                </Row>
            </div>
        </Layouts>
    )
}
)