import React from 'react';
import Dashboard from '@/layouts/dashboard';
import { Input, Space, Card, Typography, Badge } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const vendor = [
    {
        name: 'John Brown',
        active: 1,
        priority: 1,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
    {
        name: 'Joe Black',
        active: 1,
        priority: 0,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
    {
        name: 'Jim Green',
        active: 0,
        priority: 1,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
    {
        name: 'Jim Red',
        active: 0,
        priority: 0,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
];

const onSearch = (value: string) => console.log(value);

const Vendor: React.FC = () => (
    <Dashboard>
        <Card className='drop-shadow-md'>
            <Title>Vendor</Title>
            <Space direction="vertical" className='my-5'>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </Space>
            <Badge.Ribbon text={vendor[0].priority === 0 ? 'No Priority' : 'Priority'}>
                <Card
                    type="inner"
                    title={vendor[0].name}
                    className='drop-shadow-lg my-2'>
                    <a href="/Dashboard/purchasing/vendor-detail">More</a>
                </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text={vendor[1].priority === 0 ? 'No Priority' : 'Priority'} color='red'>
                <Card
                    type="inner"
                    title={vendor[1].name}
                    className='drop-shadow-lg my-2'>
                    <a href="/Dashboard/purchasing/vendor-detail">More</a>
                </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text={vendor[2].priority === 0 ? 'No Priority' : 'Priority'}>
                <Card
                    type="inner"
                    title={vendor[2].name}
                    className='drop-shadow-lg my-2'>
                    <a href="/Dashboard/purchasing/vendor-detail">More</a>
                </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text={vendor[3].priority === 0 ? 'No Priority' : 'Priority'} color='red'>
                <Card
                    type="inner"
                    title={vendor[3].name}
                    className='drop-shadow-lg my-2'>
                    <a href="/Dashboard/purchasing/vendor-detail">More</a>
                </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text={vendor[1].priority === 0 ? 'No Priority' : 'Priority'} color='red'>
                <Card
                    type="inner"
                    title={vendor[1].name}
                    className='drop-shadow-lg my-2'>
                    <a href="/Dashboard/purchasing/vendor-detail">More</a>
                </Card>
            </Badge.Ribbon>
        </Card>
    </Dashboard>
);

export default Vendor;