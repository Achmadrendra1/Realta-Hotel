import { getDetailEmp } from "@/Redux/Action/HR"
import Buttons from "@/components/Button"
import Dashboard from "@/layouts/dashboard"
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"
import { Col, DatePicker, Divider, Input, List, Row, Select, Space } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const EmployeeDetail = () => {
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const { details } = useSelector((state:any) => state.detailEmpReducer)
    const { employee } : any = router.query
    const { employees, deptHist, payHist } = details

    useEffect(() => {
        dispatch(getDetailEmp(parseInt(employee[0])))
    }, [])
    console.log(employee)
    return(
        <Dashboard>
            <Row gutter={32}>
                <Col span={18}>
                    <div className="flex justify-between">
                        <Link href={'/dashboard/hr'}><ArrowLeftOutlined /> Back</Link>
                        <button className="text-blue-400" onClick={() => setIsEdit(!isEdit)}>Edit <EditOutlined/></button>
                    </div>
                    <form className="my-5">
                        <h1 className="text-2xl font-normal">Employee Profile</h1>
                        <Row gutter={[32, 16]} className="my-8">
                            <Col span={12}>
                                <h2 className="text-lg font-semibold">National ID</h2>
                                { isEdit ? <Input className="my-2" placeholder="New National ID"/> : <p className="text-md font-regular my-2">{employees?.nation}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Employee Name</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.fullname}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Birth Date</h2>
                                { isEdit ? <DatePicker className="my-2 w-full" placeholder="Edit Birth Date"/> : <p className="text-md font-regular my-2">{employees?.birthdate.split('T')[0]}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Hire Date</h2>
                                { isEdit ? <DatePicker className="my-2 w-full" placeholder="Edit Hire Date"/> : <p className="text-md font-regular my-2">{employees?.hiredate.split('T')[0]}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Marital Status</h2>
                                { isEdit ? <Select options={[
                                    { value: 'M', label: 'Married'},
                                    { value: 'S', label: 'Single'}
                                ]} defaultValue={employees?.marital} className="my-2 w-full" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.marital == 'M' ? 'Married' : 'Single'}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Current Flag</h2>
                                { isEdit ? <Select options={[
                                    { value: '1', label: 'Active'},
                                    { value: '0', label: 'Inactive'}
                                ]} 
                                defaultValue={employees?.status == '1' ? 'Active' : 'Inactive'} 
                                className="my-2 w-full" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.status == '1' ? 'Active' : 'Inactive'}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Vacation Hours</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.vacationhours} Days</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Sickleave Hours</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.sickleave} Days</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Job Role</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.jobname}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Department</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.departmane}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Salary</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.salary}</p>}
                            </Col>
                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Pay Frequencies</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"/> : <p className="text-md font-regular my-2">{employees?.frequentlypay == 1 ? 'Monthly' : 'Hours'}</p>}
                            </Col>
                        </Row>
                        { isEdit && <Buttons>Save Update</Buttons>}
                    </form>
                    <Divider/>
                    <div className="my-3">
                        <h1 className="text-xl">Department History</h1>
                        <Space direction="vertical" size={15} className="w-full my-4">
                            {
                                deptHist && deptHist.map((item:any, index:any) =>
                                    <div key={index} className="flex justify-between px-5 py-4 rounded bg-white drop-shadow-md">
                                        <div><span className="font-medium">Department : </span>{item?.edhiDept?.deptName}</div>
                                        <div><span className="font-medium">Start Date : </span>{item.edhiStartDate.split('T')[0]}</div>
                                        <div><span className="font-medium">End Date : </span>{item.edhiEndDate.split('T')[0]}</div>
                                    </div>
                                )
                            }
                        </Space>
                    </div>
                    <Divider/>
                    <div className="my-3">
                        <h1 className="text-xl">Pay History</h1>
                        <Space direction="vertical" size={15} className="w-full my-4">
                            {
                                payHist && payHist.map((item:any, index:any) =>
                                    <div key={index} className="flex justify-between px-5 py-4 rounded bg-white drop-shadow-md">
                                        <div><span className="font-medium">Salary : </span>{item.ephiRateSalary}</div>
                                        <div><span className="font-medium">Pay Date : </span>{item.ephiRateChangeDate.split('T')[0]}</div>
                                        <div><span className="font-medium">Pay Frequence : </span>{item.ephiPayFrequence == 1 ? 'Mothly' : 'Weekly'}</div>
                                    </div>
                                )
                            }
                        </Space>
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