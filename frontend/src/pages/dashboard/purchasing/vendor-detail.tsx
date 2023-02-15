import React, { useState } from 'react';
import { Button, Card, Col, Descriptions, Row, Typography } from 'antd';
import Dashboard from '@/layouts/dashboard';

const { Title } = Typography;

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

const rupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

const VendorDetail: React.FC = () => (
    <Dashboard>
        <Card>
            <Title level={3}>{vendor[0].name}</Title>
            <Descriptions
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Name" span={3}>{vendor[0].name}</Descriptions.Item>
                <Descriptions.Item label="Active">{vendor[0].active}</Descriptions.Item>
                <Descriptions.Item label="Priority" span={2}>{vendor[0].priority}</Descriptions.Item>
                <Descriptions.Item label="Web URL" span={3}>{vendor[0].web_url}</Descriptions.Item>
                <Descriptions.Item label="Register Date">{vendor[0].register_date}</Descriptions.Item>
                <Descriptions.Item label="Modified Date" span={2}>{vendor[0].modified_date}</Descriptions.Item>
            </Descriptions>
            <Button className='my-2' href='/Dashboard/purchasing/edit-stock'>Edit</Button>
        </Card>
    </Dashboard>
);

export default VendorDetail;