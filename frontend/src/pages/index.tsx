import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layouts from '@/layouts/layout'
import Hero from '@/components/Hero'
import { DollarCircleOutlined, CalendarOutlined, PhoneOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { Card, Row, Col } from 'antd'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const services = [
    {
      title: 'Best Price Guarantee',
      icons: <DollarCircleOutlined />
    },
    {
      title: 'Easy & Quick Booking',
      icons: <CalendarOutlined />
    },
    {
      title: 'Customer Care',
      icons: <PhoneOutlined />
    }
  ]

  const dummy = [
    {
      hotel: 'Hotel Abstract',
      location: 'West Jakarta, Jakarta',
      price: 400000,
      rating: 3.9
    },
    {
      hotel: 'Hotel Abstract',
      location: 'West Jakarta, Jakarta',
      price: 400000,
      rating: 4.5
    },
    {
      hotel: 'Hotel Abstract',
      location: 'West Jakarta, Jakarta',
      price: 400000,
      rating: 3.5
    },
    {
      hotel: 'Hotel Abstract',
      location: 'West Jakarta, Jakarta',
      price: 400000,
      rating: 4
    }
  ]

  
  const { Meta } = Card;

  
  return (
    <Layouts>
      <Hero/>
        <div className='mt-5'>
          <h1 className='text-2xl text-center'>Services</h1>
          <Row gutter={16} className='my-3'>
            {
              services.map((item:any, index:any) => 
              <Col span={8} key={index}>
                <Card className='text-center border-2 border-transparent hover:border-gray-200 transition ease-in'>
                  <h1 className='text-3xl'>{item.icons}</h1>
                  <h2 className='text-lg text-slate-600 mt-4'>{item.title}</h2>
                </Card>
              </Col>
              )
            }
          </Row>
        </div>
        <div>
          <h1 className='text-lg font-semibold'>Recommended Hotels</h1>
          <div className='flex items-center justify-between mb-5'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, architecto.</p>
            <Link href='/' className='p-2 border-2 border-slate-800 rounded-full flex items-center'><RightOutlined /></Link>
          </div>
          <Row gutter={16}>
            {
              dummy.map((item:any, index:number) => 
              <Col span={6} key={index}>
                <Link href='/'>
                  <Card
                    style={{ width: '100%' }}
                    cover={<img className='h-60 object-cover object-top' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <h2 className='text-lg font-bold'>{item.hotel}</h2>
                    <p className='text-md font-normal text-gray-400'>{item.location}</p>
                    <p className='mt-2 font-semibold text-medium'>
                      Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p className='mt-2 flex items-center gap-2 text-yellow-400'><StarFilled /><span className='text-black'>{item.rating} / 5</span></p>
                  </Card>
                </Link>
              </Col>
              )
            }
          </Row>
        </div>
        <div className='my-5'>
          <h1 className='text-lg font-semibold'>Recommended Restaurant</h1>
          <div className='flex items-center justify-between mb-5'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, architecto.</p>
            <Link href='/' className='p-2 border-2 border-slate-800 rounded-full flex items-center'><RightOutlined /></Link>
          </div>
          <Row gutter={16} justify="space-between">
            {
              dummy.map((item:any, index:number) => 
              <Col span={6} key={index}>
                <Link href='/'>
                  <Card
                    style={{ width: '100%' }}
                    cover={<img className='h-60 object-cover object-top' alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <h2 className='text-lg font-bold'>{item.hotel}</h2>
                    <p className='text-md font-normal text-gray-400'>{item.location}</p>
                    <p className='mt-2 font-semibold text-medium'>
                      Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p className='mt-2 flex items-center gap-2 text-yellow-400'><StarFilled /><span className='text-black'>{item.rating} / 5</span></p>
                  </Card>
                </Link>
              </Col>
              )
            }
          </Row>
        </div>
    </Layouts>
  )
}
