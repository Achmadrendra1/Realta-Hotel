import { InstagramOutlined, HeartOutlined, MailOutlined, TwitterOutlined } from "@ant-design/icons"
import { Layout, Row, Col } from "antd"
import Link from "next/link"
import React from "react"


const Footer = ({service} : {service:any}) =>{
    const contact = [
        {
            name: 'Hotelapp_ig',
            icon: InstagramOutlined,
            href: '/'
        },
        {
            name: 'Hotelapp_twt',
            icon: TwitterOutlined,
            href: '/'
        },
        {
            name: 'info@hotelApp.com',
            icon: MailOutlined,
            href: '/'
        },
    ]

    const support = [
        {
            name : 'Privacy Police',
            href : '/'
        },
        {
            name : 'Terms And Conditions',
            href : '/'
        }
    ]
    return(
        <Layout className="bg-[#f2f1fa] px-5">
            <div className="w-5/6 m-auto py-8">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='space-between'>
                    <Col span={5}>
                        <div className="flex">
                        <img src="/assets/icon.svg" className="h-7" />
                        <h3 className="text-lg font-bold mb-4">otelapp</h3>
                        </div>
                        <p>Hotelapp is an application that provides several services to search for hotel rooms, restaurants and also services that can be accessed by the general public </p>
                    </Col>
                    <Col span={5}>
                        <h3 className="text-lg font-bold mb-4">Sitemap</h3>
                        {
                            service.map((item:any, index:number) => 
                                <Link key={index} href={item.href} className="block mb-3">{item.name}</Link>
                            )
                        }
                    </Col>
                    <Col span={5}>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        {
                            contact.map((item:any, index:number) =>
                                <Link key={index} href={item.href} className="flex mb-3 items-center">
                                    {React.createElement(item.icon)}
                                    <span className="ml-2">{item.name}</span>
                                </Link>
                            )
                        }
                    </Col>
                    <Col span={5}>
                        <h3 className="text-lg font-bold mb-4">Support</h3>
                        {
                            support.map((item:any, index:number) => 
                                <Link key={index} href={item.href} className="block mb-3">
                                    {item.name}
                                </Link>
                            )
                        }
                    </Col>
                </Row>
            </div>
            <div className="text-center py-3">
                <p className="text-sm text-gray-500">Copyright by Team 2 Code X Academy Batch 1</p>
            </div>
        </Layout>
    )
}

export default Footer