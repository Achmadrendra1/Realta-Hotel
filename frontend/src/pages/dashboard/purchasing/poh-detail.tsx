import React, { useState } from 'react';
import { Button, Card, Col, Descriptions, Modal, Row, Table, Typography } from 'antd';
import Dashboard from '@/layouts/dashboard';

const { Title } = Typography;

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

const details = [
    {
        key: '1',
        order_qty: 123,
        price: 10000,
        line_total: 100000,
        received_qty: 12,
        rejected_qty: 123,
        stocked_qty: 1421,
        modified_date: '2023/02/04',
    }
];

const columns = [
    {
        title: 'Order Qty',
        dataIndex: 'order_qty',
        key: 'order_qty',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Line Total',
        dataIndex: 'line_total',
        key: 'line_total',
    },
    {
        title: 'Received Qty',
        dataIndex: 'received_qty',
        key: 'received_qty',
    },
    {
        title: 'Rejected Qty',
        dataIndex: 'rejected_qty',
        key: 'rejected_qty',
    },
    {
        title: 'Stocked Qty',
        dataIndex: 'stocked_qty',
        key: 'stocked_qty',
    },
    {
        title: 'Modified Date',
        dataIndex: 'modified_date',
        key: 'modified_date',
    },
];

const rupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

const POHDetails: React.FC = () => {
    const [modal1Open, setModal1Open] = useState(false);
    return (
        <Dashboard>
            <Card>
                <Title level={3}>{poh[0].number}</Title>
                <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Number" span={3}>{poh[0].number}</Descriptions.Item>
                    <Descriptions.Item label="Status" >{poh[0].status}</Descriptions.Item>
                    <Descriptions.Item label="Order Date" span={2}>{poh[0].order_date}</Descriptions.Item>
                    <Descriptions.Item label="Arrival Date">{poh[0].arrival_date}</Descriptions.Item>
                    <Descriptions.Item label="Subtotal" span={2}>{rupiah(poh[0].subtotal)}</Descriptions.Item>
                    <Descriptions.Item label="Tax">{rupiah(poh[0].tax)}</Descriptions.Item>
                    <Descriptions.Item label="Total Amount" span={2}>{rupiah(poh[0].total_amount)}</Descriptions.Item>
                    <Descriptions.Item label="Refund">{rupiah(poh[0].refund)}</Descriptions.Item>
                    <Descriptions.Item label="Employee" span={2}>{poh[0].emp}</Descriptions.Item>
                    <Descriptions.Item label="Pay Type" span={3}>{poh[0].pay_type}</Descriptions.Item>
                    <Descriptions.Item label="Vendor" span={3}>{poh[0].vendor}</Descriptions.Item>
                </Descriptions>
                <Row>
                    <Col span={2}>
                        <Button className='my-2' href='/Dashboard/purchasing/edit-poh'>Edit</Button>
                    </Col>
                    <Col span={4}>
                        <Button type='text' className='my-2' onClick={() => setModal1Open(true)}>See More Details</Button>
                    </Col>
                </Row>
                <Modal
                    title="Order Details"
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

export default POHDetails;