import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, List, Row } from "antd"
import Link from "next/link"

const ListEmployee = ({data} : {data:any}) =>{
    const { Item } = List
    return(
        <List
        itemLayout="horizontal"
        dataSource={data}
        className="border"
        >
            {data.map((item:any, index:number) =>
                <Item key={index}
                actions={[
                    <Link href={`/Dashboard/hr/${index}/${item.role}/${item.title}`}><EyeOutlined /></Link>, 
                    <Button className="border-0 text-red-400 drop-shadow-none"><DeleteOutlined /></Button>]}>
                    <Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={
                        <Row gutter={8}>
                            <Col>
                                {item.title}
                            </Col>
                        </Row>
                    }
                    description={
                        <Row gutter={18}>
                            <Col span={7}>
                                Job role
                            </Col>
                            <Col>
                                Vacation: test
                            </Col>
                            <Col>
                                Sick: test
                            </Col>
                        </Row>
                    }
                    />
                </Item>
            )}
        </List>
    )
}

export default ListEmployee