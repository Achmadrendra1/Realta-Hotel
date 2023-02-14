import { Layout, Menu } from 'antd'
import Link from 'next/link'
import {useState} from 'react'

const { Sider } = Layout
const Sidebar = ({nav, collapsed, logo, locations} : {nav:any, collapsed:any, logo:string, locations:string}) => {
    return(
        <Sider width={collapsed ? 120 : 250} trigger={null} collapsible collapsed={collapsed} >
            <Menu 
            className='p-5'
            mode="inline"
            style={{ height: '100%' }}>
                <div className={`bg-white w-full ${collapsed ? 'p-0' : 'pl-8'} flex`}>
                    <img src={logo} alt='logo' className='w-auto h-8'/>
                </div>
                {nav.map((item:any, index:any) =>
                    <Menu.Item key={index} className={`${locations == item.href && 'bg-gray-100 text-black'}`}>
                        <Link href={item.href} className='flex gap-3 items-center'>
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