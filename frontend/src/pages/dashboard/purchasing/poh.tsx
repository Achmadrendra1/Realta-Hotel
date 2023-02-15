import React from 'react';
import Dashboard from '@/layouts/dashboard';
import { Input, Space, Card, Typography } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const poh = [
    {
        number: 'A123ABC',
        status: 1,
        order_date: '2023/02/04',
        subtotal: 20000,
        tax: 20000,
        total_amount: 100000,
        refund: 10000,
        arrival_date: '2023/02/04',
        pay_type: 'TR',
        emp: 'medium',
        vendor: 'white',
    },
];

const onSearch = (value: string) => console.log(value);

const POH: React.FC = () => (
    <Dashboard>
        <Card className='drop-shadow-md'>
            <Title>Order</Title>
            <Space direction="vertical" className='my-5'>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </Space>
            <Card
                type="inner"
                title={poh[0].number}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/poh-detail">More</a>}>
                {poh[0].pay_type}
            </Card>
            <Card
                type="inner"
                title={poh[0].number}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/poh-detail">More</a>}>
                {poh[0].pay_type}
            </Card>
            <Card
                type="inner"
                title={poh[0].number}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/poh-detail">More</a>}>
                {poh[0].pay_type}
            </Card>
            <Card
                type="inner"
                title={poh[0].number}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/poh-detail">More</a>}>
                {poh[0].pay_type}
            </Card>
            <Card
                type="inner"
                title={poh[0].number}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/poh-detail">More</a>}>
                {poh[0].pay_type}
            </Card>
        </Card>
    </Dashboard>
);

export default POH;