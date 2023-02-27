import { SearchOutlined } from "@ant-design/icons"
import { Row, Col, Space, DatePicker, Segmented, Input } from "antd"
import Buttons from "../Button"
import { useState } from "react";

const WorkOrders = () => {
    const { RangePicker } = DatePicker
    const [value, setValue] = useState<string | number>('Active');
    const [open, setOpen] = useState(false)
    return(
        <div>
            <Row justify='space-between' className="my-5">
                <Col>
                    <Space size={17}>
                        <p>Filter Range Date</p>
                        <RangePicker/>
                    </Space>
                </Col>
                <Col>
                    <Space size={15}>
                        <Segmented options={['Active', 'Inactive']} value={value} onChange={setValue} />
                        <Buttons funcs={() => setOpen(true)}>Add</Buttons>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default WorkOrders