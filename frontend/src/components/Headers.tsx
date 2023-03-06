import { Menu, List, Dropdown, Space, Avatar, MenuProps, Button, Row, Col, Input, DatePicker, Divider, AutoComplete } from "antd"
import { MenuOutlined, SearchOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'
import Link from "next/link";
import { useEffect, useState } from "react";
import Buttons from "./Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doUsacRequest } from "@/Redux/Action/Payment/paymentDashAction";
import { doGetUser } from "@/Redux/Action/User/GetDataUser";

const { Item } = List
const { RangePicker } = DatePicker

const Headers = ({nav, logo, click, queries} : {nav?:any, logo?:string, click?:any, queries?:any}) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const splits = router.asPath.split('/')
    const [isLogin, setIsLogin] = useState(false)
    const [location, setLocation] = useState('')
    const [date, setDate] = useState([])
    const [guest, setGuest] = useState(0)
    const [open, setOpen] = useState(false);

    const [isActive, setIsActive] = useState(false);
    const user = useSelector((state:any) => state.GetUserReducer.getUser);
  const accNumber = `131${user[0]?.user_phone_number}`
  const {account} = useSelector((state:any) => state.payUserAccReducer)
  const userAcc = account?.filter((obj:any) => obj.usacUserId === user[0]?.user_id)
  const fintechAcc = userAcc?.filter((obj:any) => obj.usacType === 'Payment')
  const acc = fintechAcc?.find((item: any) => item.usacAccountNumber == accNumber)
  const saldo = (parseInt(acc?.usacSaldo).toLocaleString("id-ID", {style:"currency", currency:"IDR", minimumFractionDigits: 0,
  maximumFractionDigits: 0}))

  useEffect(()=>{
    acc ? setIsActive(true) : setIsActive(false)
   }, [acc])

   // Cek apakah token JWT masih valid
function isTokenExpired() {
    let token
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      token = localStorage.getItem('token')
    }
    if (!token) {
      return true;
    }
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // konversi ke milidetik
    return Date.now() > expirationTime;
  }
  
  // Hapus data di localStorage jika token sudah kadaluarsa
  if (isTokenExpired()) {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      localStorage.removeItem('token')
    }
  }
    useEffect(() => {
      localStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
    }, []);
    
    useEffect(()=>{
      dispatch(doGetUser())
      dispatch(doUsacRequest())
    }, [])
  
    const logout =()=>{ 
      localStorage.removeItem("token");
      setIsLogin(false)
    }

    //Pisahin isAdmin atau user
    const menuUser = (
        <Menu>
          <Menu.Item key="0"><Link href="/users">Profile</Link></Menu.Item>
          <Menu.Item key="1"><Link href="/History">History</Link></Menu.Item>
          <Menu.Item key="2"><Link href={""} onClick={logout}>
              <span className="text-red-600">Log Out</span>
            </Link></Menu.Item>
        </Menu>
      );
      const menu2 = (
        <Menu>
          <Menu.Item key="1">Menu Item A</Menu.Item>
          <Menu.Item key="2">Menu Item B</Menu.Item>
          <Menu.Item key="3">Menu Item C</Menu.Item>
        </Menu>
      );
    const change = () => {
        click()
    }

    const options = [
        { value: 'Bandung' },
        { value: 'Bogor' },
        { value: 'Banten' },
    ];

    // console.log(queries)
    return(
        <div className="w-full border-b-2">
            <div className="container mx-auto">
                <Menu mode="horizontal" className="py-4 border-0 items-center gap-2 w-full">
                    <Item className="font-bold text-lg mr-10">
                        <div className="h-full pt-2">
                            { logo ? 
                                <Image src={logo} className="w-12 h-auto" width={20} height={10} alt="test"/>
                                : (
                                <Button onClick={change} className="flex items-center"><MenuOutlined /></Button>
                            )}
                        </div>
                    </Item>
                    <Item className="flex items-center gap-4">
                        {
                            nav && (
                                nav.map((item:any, index:any) =>
                                    <Link href={item.href} key={index} className={`px-7 py-2 leading-5 text-md rounded-full transition ease-in ${item.href == '/' + splits[1] ? 'bg-sky-500 text-white hover:text-white' : null}`}>{item.name}</Link>
                                )
                            )
                        }
                    </Item>
                    { nav ? router.asPath == '/' ? null : (
                        <Item className="ml-auto mr-5 relative">
                            <div className="flex items-center gap-3 text-gray-400">
                                <button onClick={() => setOpen(!open)}>{queries ? queries[0] : 'Locations'}</button>
                                <Divider type="vertical"/>
                                <button onClick={() => setOpen(!open)}>{queries ? queries[1].replace(' ', ', ') : 'Start date & End date'}</button>
                                <Divider type="vertical"/>
                                <button onClick={() => setOpen(!open)}>{queries ? ('Guest : ' + queries[2] ) : 'Guest'}</button>
                            </div>
                            {
                                open && <div className="absolute right-0 bg-white drop-shadow-md px-5 py-2" style={{ width: '55vw'}}>
                                <Row gutter={5} align='stretch' justify='space-between'>
                                    <Col span={6}>
                                        <AutoComplete
                                            className="w-full"
                                            style={{ borderRadius: 0}}
                                            options={options}
                                            placeholder="Locations"
                                            filterOption={(inputValue, option) => 
                                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onChange={(value:any) => setLocation(value)}
                                        />
                                    </Col>
                                    <Col>
                                        <RangePicker
                                        className="w-full" onChange={(value, dateString:any) => setDate(dateString)}/>
                                    </Col>
                                    <Col>
                                        <Input placeholder="Guest" className="w-full" type="number" onChange={e => setGuest(parseInt(e.target.value))}/>
                                    </Col>
                                    <Col>
                                        <Link href={`/Booking/${location}/${date.length > 0 ? date[0] + ' ' + date[1] : ''}/${guest ? guest : ''}`} className="bg-sky-500 py-2 rounded px-5 text-white hover:text-white" onClick={() => setOpen(false)}>Search</Link>
                                    </Col>
                                </Row>
                            </div>
                            }
                        </Item>
                    ) : null
                    }
                    <Divider type="vertical"/>
                    <Item className="ml-auto">
                        {isLogin ? (
              <div className="flex items-center">
                <div>
                  <p className="text-md mr-2 leading-6">{user[0] ? user[0].user_full_name: 'Guest'}</p>
                  {isActive ? <p className="text-sm text-blue-700 hover:underline hover:cursor-pointer">
                    <WalletOutlined /> {saldo}
                  </p> : <p onClick={()=>router.push('/payment')} className="text-sm text-blue-700 hover:underline hover:cursor-pointer">
                    <WalletOutlined /> Activate
                  </p>}
                </div>
               <Dropdown overlay={isLogin ? menuUser : menu2} trigger={["click"]} className="h-8">
                <Avatar size="default" icon={<UserOutlined />} className="ml-4 hover:cursor-pointer" />
              </Dropdown>
              </div>
            ) : (
              <Buttons funcs={()=>router.push("../users/login")}>Sign in</Buttons>
            )}
                    </Item>
                </Menu>
            </div>
        </div>
    )
}

export default Headers