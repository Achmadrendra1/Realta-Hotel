import React from 'react';
import Dashboard from '@/layouts/dashboard';
import { Input, Space, Card, Typography } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const stock = [
    {
        name: 'John Brown',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni possimus, illo odit itaque iusto animi vel veniam provident suscipit laboriosam nulla quia, in ullam atque exercitationem officia velit, quo neque.',
        quantity: 20,
        reorder_point: 20,
        used: 10,
        scrap: 10,
        price: 10000,
        standard_cost: 10000,
        size: 'medium',
        color: 'white',
        modified_date: '2023/02/04',
    },
];

const onSearch = (value: string) => console.log(value);

const Stock: React.FC = () => (
    <Dashboard>
        <Card className='drop-shadow-md'>
            <Title>Stock</Title>
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
                title={stock[0].name}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/stock-detail">More</a>}>
                {stock[0].desc}
            </Card>
            <Card
                type="inner"
                title={stock[0].name}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/stock-detail">More</a>}>
                {stock[0].desc}
            </Card>
            <Card
                type="inner"
                title={stock[0].name}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/stock-detail">More</a>}>
                {stock[0].desc}
            </Card>
            <Card
                type="inner"
                title={stock[0].name}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/stock-detail">More</a>}>
                {stock[0].desc}
            </Card>
            <Card
                type="inner"
                title={stock[0].name}
                className='drop-shadow-lg my-2'
                extra={<a href="/Dashboard/purchasing/stock-detail">More</a>}>
                {stock[0].desc}
            </Card>
        </Card>
    </Dashboard>
);

export default Stock;