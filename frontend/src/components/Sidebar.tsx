import { Layout, Menu } from 'antd'
import Link from 'next/link'
import {useState} from 'react'

const { Sider } = Layout
const Sidebar = ({nav, collapsed, logo, locations} : {nav:any, collapsed:any, logo:string, locations:string}) => {
    return(
        <Sider width={collapsed ? 120 : 250} trigger={null} collapsible collapsed={collapsed} className='relative '>
            <Menu 
            className='p-5 fixed top-0 bg-[#252525]'
            mode="inline"
            style={{ height: '100%', width: collapsed ? 80 : 250 }}>
                <div className={`w-full ${collapsed ? 'p-0' : 'justify-center'} flex mb-6`}>
                    {/* <img src={logo} alt='logo' className='w-auto h-12'/> */}
                    {collapsed ? <p className='text-3xl font-bold text-[#F2F1FA]'>HA</p>:
                    <p className='text-3xl font-bold text-[#F2F1FA]'>Hotel App</p>}
                </div>
                {nav.map((item:any, index:any) =>
                    <Menu.Item key={index} className={`${locations == item.href ? 'bg-[#F2F1FA] text-[#252525]' : 'text-white'} `}>
                        <Link href={item.href} className='flex gap-4 items-center'>
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                )}
            </Menu>
        </Sider>
    )
}

export default Sidebar