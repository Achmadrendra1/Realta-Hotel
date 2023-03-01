import { getSpInvoice } from '@/Redux/Action/Booking/BookingAction'
import Buttons from '@/components/Button'
import Layouts from '@/layouts/layout'
import { LeftOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function index() {
    
    let root = useRouter()
    const {id} = root.query || {};
    const dispatch = useDispatch();
    
    const invoiceView = useSelector((state : any) => state.BoorInvoiceReducer.invoice)
    
    useEffect(()=> {
        dispatch(getSpInvoice())
    }, [id])

    const Invoice = invoiceView?.filter((item: any) => item.boor_id == id)
    const boor_order_number = Invoice?.length > 0 ? Invoice[0].boor_order_number:'';
    const boor_order_date = Invoice?.length > 0 ? Invoice[0].boor_order_date:'';
    const boor_is_paid = Invoice?.length > 0 ? Invoice[0].boor_is_paid:''; 
    const boor_pay_type = Invoice?.length > 0 ? Invoice[0].boor_pay_type:'';
    const user_full_name = Invoice?.length > 0 ? Invoice[0].user_full_name:'';
    const user_phone_number = Invoice?.length > 0 ? Invoice[0].user_phone_number:''; 
    const usme_memb_name = Invoice?.length > 0 ? Invoice[0].usme_memb_name:'';
    const usme_promote_date = Invoice?.length > 0 ? Invoice[0].usme_promote_date:'';
    const usme_points = Invoice?.length > 0 ? Invoice[0].usme_points:0; 
    const faci_name = Invoice?.length > 0 ? Invoice[0].faci_name:'';
    const boor_total_room = Invoice?.length > 0 ? Invoice[0].boor_total_room:0;        
    const borde_adults = Invoice?.length > 0 ? Invoice[0].borde_adults:0;         
    const borde_kids = Invoice?.length > 0 ? Invoice[0].borde_kids:0;        
    const borde_price = Invoice?.length > 0 ? Invoice[0].borde_price:'';
    const borde_discount = Invoice?.length > 0 ? Invoice[0].borde_discount:'';
    const borde_subtotal = Invoice?.length > 0 ? Invoice[0].borde_subtotal:'';

    const [getInvoice, setGetinvoice] = useState({
        boor_order_number : '',
        boor_order_date : '',
        invoice_number : '',
        invoice_date : '',
        boor_is_paid : '',
        boor_pay_type : '',
        user_full_name : '',
        user_phone_number : '',
        usme_memb_name : '',
        usme_promote_date : '',
        usme_points : 0,
        faci_name : '',
        boor_total_room : 0,
        borde_adults : 0,
        borde_kids : 0,
        borde_price : '',
        borde_discount : '',
        borde_subtotal : ''
    })

    useEffect(()=>{
        setGetinvoice({...getInvoice, 
            boor_order_number:boor_order_number,
            boor_order_date:boor_order_date,
            boor_is_paid:boor_is_paid,
            boor_pay_type:boor_pay_type,
            user_full_name:user_full_name,
            user_phone_number:user_phone_number,
            usme_memb_name:usme_memb_name,
            usme_promote_date:usme_promote_date,
            usme_points:usme_points,
            faci_name:faci_name,
            boor_total_room:boor_total_room,
            borde_adults:borde_adults,
            borde_kids:borde_kids,
            borde_price:borde_price,
            borde_discount:borde_discount,
            borde_subtotal:borde_subtotal      
        })
    },[boor_order_number])

    console.log(Invoice)

    //Array Object untuk title and field
    const invoice1 = [
        {
            title : 'Booking Order',
            field : getInvoice.boor_order_number
        },
        {
            title : 'Order Date',
            field : getInvoice.boor_order_date
        },
        {
            title : 'Invoice Number',
            field : 'TRX#2023224-0002'
        },
        {
            title : 'Invoice Date',
            field : '24 January 2023'
        },
        {
            title : 'Status',
            field : getInvoice.boor_is_paid
        },
        {
            title : 'Payment Type',
            field : getInvoice.boor_pay_type
        }
    ]

    const invoice2 = [
        {
            title : 'Full Name',
            field : getInvoice.user_full_name
        },
        {
            title : 'Contact Number',
            field : getInvoice.user_phone_number
        },
        {
            title : 'Member',
            field : getInvoice.usme_memb_name
        },
        {
            title : 'Member Date',
            field : getInvoice.usme_promote_date
        },
        {
            title : 'Remaining Points',
            field : getInvoice.usme_points
        },
    ]

  return (
    <>
   
        <div>
            <h1 className='text-xl mb-5'><LeftOutlined/>Kembali </h1>
        </div>
        <div>
            <h1 className='text-2xl mb-3 font-bold' >Invoice </h1>
        </div>
        <Row>
            {
                invoice1.map((item:any, index : any) =>
                <Col span={4} key={index}>
                    <h2 className='text-xl'>{item.title}</h2>
                    <h3 className='text-l'>{item.field}</h3>
                </Col>
                )  
            }
        </Row>
        <Divider dashed style={{borderColor : 'black'}} />
        <div>
            <h1 className='text-2xl mb-3 font-bold' >Customer </h1>
        </div>
        <Row>
            {
                invoice2.map((item:any, index : any) =>
                <Col span={4} key={index}>
                    <h2 className='text-xl'>{item.title}</h2>
                    <h3 className='text-l'>{item.field}</h3>
                </Col>
                )  
            }
        </Row>
        <Divider dashed style={{borderColor : 'black'}} />
        <div>
            <h1 className='text-2xl mb-3 font-bold' >Billing </h1>
        </div>
        <Row className='flex'>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Facilities</h2>
                    <h3 className='text-l'>{getInvoice.faci_name}</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Qty</h2>
                    <h3 className='text-l'>{getInvoice.boor_total_room}</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Total Guests</h2>
                    <h3 className='text-l'>{getInvoice.borde_adults} Adults {getInvoice.borde_kids} Kids</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Price</h2>
                    <h3 className='text-l'>{getInvoice.borde_price}</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Discount</h2>
                    <h3 className='text-l'>{getInvoice.borde_discount}</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Sub Total</h2>
                    <h3 className='text-l'>{getInvoice.borde_subtotal}</h3>
                </div>
            </Col>
        </Row>
        <Divider dashed style={{borderColor : 'black'}} />
        <Row>
            <Col span={16}>
            </Col>
            <Col span={8}>
                <div className='flex'>
                    <Col span={12}>
                        <div className='flex text-xl mr-5'>
                            <h2>Total Amount</h2>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='flex text-xl'>
                            <h2>{getInvoice.borde_subtotal}</h2>
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={8}>
            </Col>
            <Col span={16}>
                <div className='flex'>
                    <Col span={6}>
                        <div className='flex text-xl mr-5'>
                            <Buttons funcs={''}>Send To Email</Buttons>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl'>
                        <Buttons funcs={()=> window.print()}>Print</Buttons>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl mr-5'>
                            <h2>Payment Amount</h2>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl'>
                            <h2>{getInvoice.borde_price}</h2>
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
    </>
  )
}