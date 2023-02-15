import React, { useState } from 'react';
import Dashboard from '@/layouts/dashboard';
import {
    Input, Space, Card, Typography, Collapse, Button, Descriptions,
} from 'antd';

const { Title } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

const onSearch = (value: string) => console.log(value);

const stock = [
    {
        name: 'John Brown',
        desc: 'Lorem Ipsum',
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

// const [data] = useState(stock);

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
            <Card>
                <Collapse bordered={false} accordion>
                    <Panel header={stock[0].name} key="1">
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                            <Descriptions.Item label="Name" span={3}>{stock[0].name}</Descriptions.Item>
                            <Descriptions.Item label="Quantity" span={3}>Prepaid</Descriptions.Item>
                            <Descriptions.Item label="Reorder Point">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Used">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Scrap">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Size">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Color" span={2}>$60.00</Descriptions.Item>
                            <Descriptions.Item label="Price">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Standard Cost" span={2}>$60.00</Descriptions.Item>
                            <Descriptions.Item label="Modified Date" span={3}>18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Description" span={3}>
                                Data disk type: MongoDB
                                <br />
                                Database version: 3.4
                                <br />
                                Package: dds.mongo.mid
                                <br />
                                Storage space: 10 GB
                                <br />
                                Replication factor: 3
                                <br />
                                Region: East China 1
                            </Descriptions.Item>
                        </Descriptions>
                        <Button className='my-2'>Edit</Button>
                    </Panel>
                    <Panel header="StockName 2" key="2">
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                            <Descriptions.Item label="Name" span={3}>Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Quantity" span={3}>Prepaid</Descriptions.Item>
                            <Descriptions.Item label="Reorder Point">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Used">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Scrap">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Size">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Color" span={2}>$60.00</Descriptions.Item>
                            <Descriptions.Item label="Price">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Standard Cost" span={2}>$60.00</Descriptions.Item>
                            <Descriptions.Item label="Modified Date" span={3}>18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Description" span={3}>
                                Data disk type: MongoDB
                                <br />
                                Database version: 3.4
                                <br />
                                Package: dds.mongo.mid
                                <br />
                                Storage space: 10 GB
                                <br />
                                Replication factor: 3
                                <br />
                                Region: East China 1
                            </Descriptions.Item>
                        </Descriptions>
                        <Button className='my-2'>Edit</Button>
                    </Panel>
                    <Panel header="StockName 3" key="3">
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                            <Descriptions.Item label="Name" span={3}>Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Quantity" span={3}>Prepaid</Descriptions.Item>
                            <Descriptions.Item label="Reorder Point">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Used">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Scrap">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Size">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Color" span={2}>$60.00</Descriptions.Item>
                            <Descriptions.Item label="Price">$60.00</Descriptions.Item>
                            <Descriptions.Item label="Standard Cost" span={2}>$60.00</Descriptions.Item>
                            <Descriptions.Item label="Modified Date" span={3}>18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Description" span={3}>
                                Data disk type: MongoDB
                                <br />
                                Database version: 3.4
                                <br />
                                Package: dds.mongo.mid
                                <br />
                                Storage space: 10 GB
                                <br />
                                Replication factor: 3
                                <br />
                                Region: East China 1
                            </Descriptions.Item>
                        </Descriptions>
                        <Button className='my-2'>Edit</Button>
                    </Panel>
                </Collapse>
            </Card>
        </Card>
    </Dashboard>
);

export default Stock;