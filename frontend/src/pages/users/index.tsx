import { ArrowLeftOutlined, CreditCardOutlined, HistoryOutlined, LaptopOutlined, LogoutOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Card, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Layouts from '@/layouts/layout';
import Link from 'next/link';
import { useState } from 'react';
import Userprofile from './userProfile';
import MyAccount from '../payment/myAccount';
import withAuth from '@/PrivateRoute/WithAuth';

export default withAuth( function Index() {
  const { Header, Content, Footer, Sider } = Layout;
  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  
  const items: MenuProps["items"] = [
    {
      icon: <UserOutlined />,
      label: <Link href="#">My Profile</Link>,
      key: "0",
    },
    {
      label: <Link href="#">My History</Link>,
      key: "1",
      icon : <HistoryOutlined />
    },
    { 
      label: <Link href="#">My Account</Link>,
      key: "2",
      icon : <CreditCardOutlined />
    },
    // {
    //   label: (
    //     <Link href={""}>
    //       <span className="text-red-600">Log Out</span>
    //     </Link>
    //   ),
    //   key: "3",
    //   icon : <LogoutOutlined style={{color : 'red'}} />
    // },
  ];

  const [content, setContent] = useState('0')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setContent(e.key)
  };


  return (
    <Layouts>

    <Layout style={{background: 'white'}}>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: 'white'}}>
        <Sider width={250} theme='light'>
         <Card>
         <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['0']}
            items={items}
            style={{border: 0}}
            onClick={onClick}
          />
         </Card>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {content === '0' ? <Userprofile /> : content === '1' ? 'History' : content === '2' && <MyAccount />}
        </Content>
      </Layout>
    </Content>
  </Layout>
          
  </Layouts>
);
})
