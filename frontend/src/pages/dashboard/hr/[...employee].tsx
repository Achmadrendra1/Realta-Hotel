import Buttons from "@/components/Button"
import Dashboard from "@/layouts/dashboard"
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"
import { Col, Input, Row, Space } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const EmployeeDetail = () => {
    const [isEdit, setIsEdit] = useState(false)
    return(
        <Dashboard>
            <Row gutter={32}>
                <Col span={18}>
                    <div className="flex justify-between">
                        <Link href={'/dashboard/hr'}><ArrowLeftOutlined /> Back</Link>
                        <button className="text-blue-400" onClick={() => setIsEdit(!isEdit)}>Edit <EditOutlined/></button>
                    </div>
                    <h1>Employee Profile</h1>
                    <form>
                        <Row gutter={[32, 32]} className="my-5">
                            <Col span={12}>
                                <h2>Employee Name</h2>
                                { isEdit ? <Input/> : <p>Jhon doe</p>}
                            </Col>

                            <Col span={12}>
                                <h2>Employee Name</h2>
                                { isEdit ? <Input/> : <p>Jhon doe</p>}
                            </Col>

                            <Col span={12}>
                                <h2>Employee Name</h2>
                                { isEdit ? <Input/> : <p>Jhon doe</p>}
                            </Col>

                            <Col span={12}>
                                <h2>Employee Name</h2>
                                { isEdit ? <Input/> : <p>Jhon doe</p>}
                            </Col>

                            <Col span={12}>
                                <h2>Employee Name</h2>
                                { isEdit ? <Input/> : <p>Jhon doe</p>}
                            </Col>
                        </Row>
                        { isEdit && <Buttons>Save Update</Buttons>}
                    </form>
                    <div>
                        <h1>Department History</h1>
                        <div>

                        </div>
                    </div>

                    <div>
                        <h1>Pay History</h1>
                        <div>
                            
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <h1>Photo Profile</h1>
                    <div className="p-2 border-2 relative rounded">
                        <img className="w-full rounded" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="test" />
                        <button className="transition ease-in-out absolute bottom-0 drop-shadow-md hover:drop-shadow-lg bg-white py-2 px-5 rounded" style={{left: '50%', transform: 'translate(-50%, 50%)'}}><EditOutlined /> Edit Photo</button>
                    </div>
                </Col>
            </Row>
        </Dashboard>
    )
}

export default EmployeeDetail