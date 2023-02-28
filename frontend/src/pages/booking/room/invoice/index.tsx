import Buttons from '@/components/Button'
import Layouts from '@/layouts/layout'
import { LeftOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React from 'react'

export default function index() {

    //Array Object untuk title and field
    const invoice1 = [
        {
            title : 'Booking Order',
            field : 'BO-20230123-0001'
        },
        {
            title : 'Order Date',
            field : '23 January 2023'
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
            field : 'Paid'
        },
        {
            title : 'Payment Type',
            field : 'Debet'
        }
    ]

    const invoice2 = [
        {
            title : 'Full Name',
            field : 'Ricky Dimas'
        },
        {
            title : 'Contact Number',
            field : '087808130857'
        },
        {
            title : 'Member',
            field : 'Wizard'
        },
        {
            title : 'Member Date',
            field : '23 May 2022'
        },
        {
            title : 'Remaining Points',
            field : '+150'
        },
    ]

  return (
    <Layouts>
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
                    <h3 className='text-l'>Deluxe Twin Bed</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Qty</h2>
                    <h3 className='text-l'>1</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Total Guests</h2>
                    <h3 className='text-l'>2 Guests</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Price</h2>
                    <h3 className='text-l'>Rp.300,000</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Discount</h2>
                    <h3 className='text-l'>- Rp.15,000</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Sub Total</h2>
                    <h3 className='text-l'>Rp.270,000</h3>
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
                            <h2>Rp. 335,000</h2>
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={16}>
            </Col>
            <Col span={8}>
                <div className='flex'>
                    <Col span={12}>
                        <div className='flex text-xl mr-5'>
                            <h2>Tax</h2>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='flex text-xl'>
                            <h2>10%</h2>
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
                        <Buttons funcs={''}>Print</Buttons>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl mr-5'>
                            <h2>Payment Amount</h2>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl'>
                            <h2>Rp. 400,000</h2>
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
    </Layouts>
  )
}

{/* <div className='flex items-center mb-5'>
            <div className='flex text-2xl items-center mr-3'>
                <LeftOutlined />
            </div>
            <div className='flex font-semibold text-2xl items-center'>
                Invoice
            </div>
        </div>
        <Row>
            
        </Row>
        <div className='mb-3'>
            <div className='flex justify-between text-l font-semibold'>
                <div>
                    <p>Booking Order</p>
                </div>
                <div>
                    <p>Order Date</p>
                </div>
                <div>
                    <p>Invoice Number</p>
                </div>
                <div>
                    <p>Invoice Date</p>
                </div>
                <div>
                    <p>Status</p>
                </div>
                <div>
                    <p>Payment</p>
                </div>
            </div>
        </div>
        <div className='mb-5'>
            <div className='flex justify-between text-l font-semibold'>
                <div>
                    <p>BO-20230123-0001</p>
                </div>
                <div>
                    <p>23 January 2023</p>
                </div>
                <div>
                    <p>TRX#2023224-0002</p>
                </div>
                <div>
                    <p>24 January 2023</p>
                </div>
                <div>
                    <p>Paid</p>
                </div>
                <div>
                    <p>Pay at Hotel</p>
                </div>
            </div>
        </div>
        <div className='flex items-center mb-5'>
            <div className='flex text-xl items-center mr-3'>
                
            </div>
            <div className='flex font-semibold text-2xl items-center'>
                Customer
            </div>
        </div>
        <div className='mb-3'>
            <div className='flex justify-between text-l font-semibold'>
                <div>
                    <p>Booking Order</p>
                </div>
                <div>
                    <p>Order Date</p>
                </div>
                <div>
                    <p>Invoice Number</p>
                </div>
                <div>
                    <p>Invoice Date</p>
                </div>
                <div>
                    <p>Status</p>
                </div>
                <div>
                    <p>Payment</p>
                </div>
            </div>
        </div>
        <div className='mb-5'>
            <div className='flex justify-between text-l font-semibold'>
                <div>
                    <p>BO-20230123-0001</p>
                </div>
                <div>
                    <p>23 January 2023</p>
                </div>
                <div>
                    <p>TRX#2023224-0002</p>
                </div>
                <div>
                    <p>24 January 2023</p>
                </div>
                <div>
                    <p>Paid</p>
                </div>
                <div>
                    <p>Pay at Hotel</p>
                </div>
            </div>
        </div>        */}