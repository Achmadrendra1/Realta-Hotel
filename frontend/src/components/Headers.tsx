import { Menu, List, Dropdown, Space, Avatar, MenuProps, Button, Row, Col, Input, DatePicker, Divider, AutoComplete } from "antd"
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import Link from "next/link";
import { useState } from "react";
import Buttons from "./Button";
import Image from "next/image";
import { useRouter } from "next/router";

const { Item } = List
const { RangePicker } = DatePicker

const Headers = ({nav, logo, click, queries} : {nav?:any, logo?:string, click?:any, queries?:any}) => {
    const router = useRouter()
    const splits = router.asPath.split('/')
    const [isLogin, setIsLogin] = useState(false)
    const [location, setLocation] = useState('')
    const [date, setDate] = useState([])
    const [guest, setGuest] = useState(0)
    const [open, setOpen] = useState(false)
    //Pisahin isAdmin atau user
    const items: MenuProps['items'] = [
        {
          label: (<Link href='/'>Profile</Link>),
          key: '0',
        },
        {
          label: (<Link href='/'>History</Link>),
          key: '1',
        },
        {
          label: (<Link href='/'>Dashboard</Link>),
          key: '2',
        },
        {
          label: (<Link href='/users/login'>Login</Link>),
          key: '4',
        },
        {
          type: 'divider'
        },
        {
          label: (<Link href={''} onClick={()=>setIsLogin(false)}><span className="text-red-600">Log Out</span></Link>),
          key: '3',
        },
      ];
    const change = () => {
        click()
    }

    const options = [
        { value: 'Bandung' },
        { value: 'Bogor' },
        { value: 'Banten' },
    ];

    console.log(queries)
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
                                        <Link href={`/hotel/${location}/${date.length > 0 ? date[0] + ' ' + date[1] : ''}/${guest ? guest : ''}`} className="bg-sky-500 py-2 rounded px-5 text-white hover:text-white" onClick={() => setOpen(false)}>Search</Link>
                                    </Col>
                                </Row>
                            </div>
                            }
                        </Item>
                    ) : null
                    }
                    <Divider type="vertical"/>
                    <Item className="ml-auto">
                        { isLogin ?
                        <Dropdown menu={{items}} trigger={['click']}>
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    <span className="">Guest</span>
                                </Space>
                            </a>
                        </Dropdown> :
                        <Buttons funcs={()=>setIsLogin(true)}>Sign in</Buttons>
                        }
                    </Item>
                </Menu>
            </div>
        </div>
    )
}

export default Headers