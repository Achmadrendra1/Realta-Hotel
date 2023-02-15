import React, { useState } from 'react';
import { Button, Card, Col, Descriptions, Modal, Row, Table, Typography } from 'antd';
import Dashboard from '@/layouts/dashboard';

const { Title } = Typography;

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

        // stock photo
        url: 'http://blablabla.com'
    },
];

const details = [
    {
        key: '1',
        barcode_number: 'A1000',
        status: '1',
        notes: 'lorem ipsum dolor sit amet, consectetur adip',
        facilities: '1',
    }
];

const columns = [
    {
        title: 'Barcode Number',
        dataIndex: 'barcode_number',
        key: 'barcode_number',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
    },
    {
        title: 'Facilities',
        dataIndex: 'facilities',
        key: 'facilities',
    },
];

const rupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

const StockDetail: React.FC = () => {
    const [modal1Open, setModal1Open] = useState(false);
    return (
        <Dashboard>
            <Card>
                <Title level={3}>{stock[0].name}</Title>
                <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Name" span={3}>{stock[0].name}</Descriptions.Item>
                    <Descriptions.Item label="Quantity" >{stock[0].quantity}</Descriptions.Item>
                    <Descriptions.Item label="Reorder Point" span={2}>{stock[0].reorder_point}</Descriptions.Item>
                    <Descriptions.Item label="Used">{stock[0].used}</Descriptions.Item>
                    <Descriptions.Item label="Scrap" span={2}>{stock[0].scrap}</Descriptions.Item>
                    <Descriptions.Item label="Size">{stock[0].size}</Descriptions.Item>
                    <Descriptions.Item label="Color" span={2}>{stock[0].color}</Descriptions.Item>
                    <Descriptions.Item label="Price">{rupiah(stock[0].price)}</Descriptions.Item>
                    <Descriptions.Item label="Standard Cost" span={2}>{rupiah(stock[0].standard_cost)}</Descriptions.Item>
                    <Descriptions.Item label="Modified Date" span={3}>{stock[0].modified_date}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{stock[0].desc}</Descriptions.Item>
                </Descriptions>
                <Row>
                    <Col span={2}>
                        <Button className='my-2' href='/Dashboard/purchasing/edit-stock'>Edit</Button>
                    </Col>
                    <Col span={4}>
                        <Button type='text' className='my-2' onClick={() => setModal1Open(true)}>See More Details</Button>
                    </Col>
                </Row>
                <Modal
                    title="Stock Details"
                    centered
                    open={modal1Open}
                    onOk={() => setModal1Open(false)}
                    onCancel={() => setModal1Open(false)}
                >
                    <Table dataSource={details} columns={columns} />;
                </Modal>
            </Card>
        </Dashboard>
    )
};

export default StockDetail;