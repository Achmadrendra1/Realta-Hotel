import { ArrowLeftOutlined, CreditCardOutlined, HistoryOutlined, LaptopOutlined, LogoutOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Layouts from '@/layouts/layout';
import Link from 'next/link';
import { useState } from 'react';
import Userprofile from './userProfile';
import MyAccount from '../payment/myAccount';
import withAuth from '@/PrivateRoute/WithAuth';
import { useDispatch } from 'react-redux';
import { doLogout } from '@/Redux/Action/User/auth';
import { useRouter } from 'next/router';
import UserHistory from './userHistory';

export default withAuth(  function Index() {
  const { Header, Content, Footer, Sider } = Layout;
  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  const dispatch = useDispatch();


  
  const items = [
    {
      icon: <UserOutlined />,
      href: "/users#profile",
      label: "My Profile",
      key: "0",
    },
    {
      href: "/users#history",
      label: "My History",
      key: "1",
      icon: <HistoryOutlined />,
    },
    {
      href: "/users#account",
      label: "My Account",
      key: "2",
      icon: <CreditCardOutlined />,
    },
  ];


  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log("click ", e);
  //   setContent(e.key);
  // };

  const router = useRouter();


  const logout = () => {
    localStorage.removeItem("token");
    dispatch(doLogout())
    // setIsLogin(false);
    router.push("/");
  };

  return (
    <Layouts>
      <Layout style={{ background: "#F2F1FA" }}>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0", background: "#F2F1FA" }}>
            <Sider width={250} theme="light" style={{ background: "#F2F1FA" }}>
              <Card style={{ background: "white" }}>
                <Menu
                  mode="inline"
                  style={{ border: 0 }}
                  className={`bg-white text-[#754cff]`}
                >
                  {items.map((item: any, index: any) => (
                    <Menu.Item
                      key={item.key}
                      style={{
                        backgroundColor: router.asPath === item.href ? "#754CFF" : "",
                        color: router.asPath === item.href ? "#F1F2FA" : "",
                      }}
                    >
                      <Link
                        href={item.href}
                        className="flex gap-2 items-center"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    <Link href={''} className="flex gap-2 items-center" onClick={logout}>
                    <LogoutOutlined style={{ color: "red" }} />
                    <span style={{color: 'red'}}>Log Out</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Card>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {router.asPath === "/users#profile" ? (
                <Userprofile />
              ) : router.asPath === "/users#history" ? (
                <UserHistory/>
              ) : (
                router.asPath === "/users#account" && <MyAccount />
              )}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layouts>
  );
}
)