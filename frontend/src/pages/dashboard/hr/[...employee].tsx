import { getDetailEmp, updateEmployee } from "@/Redux/Action/HR"
import Buttons from "@/components/Button"
import Dashboard from "@/layouts/dashboard"
import { ArrowLeftOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Col, DatePicker, Divider, Input, List, Modal, Row, Select, Space } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { configuration } from '@/Redux/Configs/url'

const EmployeeDetail = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [ dept, isDept ] = useState(false)
    const [ pay, isPay ] = useState(false)
    const [ photo, isPhoto ] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const { details, deptHist, payHist } = useSelector((state:any) => state.detailEmpReducer)
    const { selectJob } = useSelector((state:any) => state.selectReducer)
    const { employee } : any = router.query
    const jobId = !parseInt(details?.jobname) ? selectJob.find((item:any) => item.label.toLocaleLowerCase() == details?.jobname?.toLocaleLowerCase()) : selectJob.find((item:any) => item.value == details?.jobname)
    const [ update, setUpdate ] = useState({
        userId: '',
        empId: '',
        nationalId: '',
        fullName: '',
        birthDate: '',
        hireDate: '',
        marital: '',
        gender: '',
        salary: '',
        frequentlyPay: '',
        salaryFlag: '',
        status: '',
        vacation: '',
        sick: '',
        jobId: ''
    })

    useEffect(() => {
        dispatch(getDetailEmp(parseInt(employee[0])))
    }, [])

    useEffect(() => {
        setUpdate({
            userId: details?.userid,
            empId: details?.empid,
            nationalId: details?.nation,
            fullName: details?.fullname,
            birthDate: details?.birthdate,
            hireDate: details?.hiredate,
            marital: details?.marital,
            gender: details?.gender,
            salary: details?.salary.split('Rp')[1]?.split(',')[0].replace(/\./g, ''),
            frequentlyPay: details?.frequentlypay,
            salaryFlag: details?.salariedflag,
            status: details?.status,
            vacation: details?.vacationhours,
            sick: details?.sickleave,
            jobId: jobId?.value
        })
    }, [details])

    const submitForm = (e:any) => {
        e.preventDefault()
        dispatch(updateEmployee(update))
    }

    return(
        <Dashboard>
            <Row gutter={32}>
                <Col span={18}>
                    <div className="flex justify-between">
                        <Link href={'/dashboard/hr'}><ArrowLeftOutlined /> Back</Link>
                        <button className="text-blue-400" onClick={() => setIsEdit(!isEdit)}>Edit <EditOutlined/></button>
                    </div>
                    <form className="my-5" onSubmit={submitForm}>
                        <h1 className="text-2xl font-normal">Employee Profile</h1>
                        <Row gutter={[32, 16]} className="my-8">
                            <Col span={12}>
                                <h2 className="text-lg font-semibold">National ID</h2>
                                { isEdit ? <Input className="my-2" placeholder="New National ID" 
                                value={update.nationalId} 
                                onChange={e => setUpdate({ ...update, nationalId: e.target.value})}/> : <p className="text-md font-regular my-2">{details?.nation}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Employee Name</h2>
                                { isEdit ? <Input className="my-2" placeholder="New Employee Name"
                                value={update.fullName} 
                                onChange={e => setUpdate({ ...update, fullName: e.target.value})}/> : <p className="text-md font-regular my-2">{details?.fullname}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Birth Date</h2>
                                { isEdit ? <DatePicker className="my-2 w-full" placeholder="Edit Birth Date"
                                onChange={(daysjs, dateString) => {setUpdate({...update, birthDate: dateString})}}/> : <p className="text-md font-regular my-2">{details?.birthdate?.split('T')[0]}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Hire Date</h2>
                                { isEdit ? <DatePicker className="my-2 w-full" placeholder="Edit Hire Date"
                                onChange={(daysjs, dateString) => {setUpdate({...update, hireDate: dateString})}}/> : <p className="text-md font-regular my-2">{details?.hiredate?.split('T')[0]}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Marital Status</h2>
                                { isEdit ? <Select options={[
                                    { value: 'M', label: 'Married'},
                                    { value: 'S', label: 'Single'}
                                ]} defaultValue={details?.marital} onChange={value => {setUpdate({...update, marital: value})}} className="my-2 w-full"/> : <p className="text-md font-regular my-2">{details?.marital == 'M' ? 'Married' : 'Single'}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Current Flag</h2>
                                { isEdit ? <Select options={[
                                    { value: '1', label: 'Active'},
                                    { value: '0', label: 'Inactive'}
                                ]} 
                                defaultValue={details?.status == '1' ? 'Active' : 'Inactive'} 
                                className="my-2 w-full" onChange={value => {setUpdate({...update, status: value})}}/> : <p className="text-md font-regular my-2">{details?.status == '1' ? 'Active' : 'Inactive'}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Vacation Hours</h2>
                                { isEdit ? <Input className="my-2" placeholder="In Days" 
                                value={update.vacation} 
                                onChange={e => setUpdate({ ...update, vacation: e.target.value})} suffix={'Days'}/> : <p className="text-md font-regular my-2">{details?.vacationhours} Days</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Sickleave Hours</h2>
                                { isEdit ? <Input className="my-2" placeholder="Days sickleave"
                                value={update.sick} 
                                onChange={e => setUpdate({ ...update, sick: e.target.value})} suffix={'Days'}/> : <p className="text-md font-regular my-2">{details?.sickleave} Days</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Job Role</h2>
                                { isEdit ? <Select options={selectJob} 
                                className="my-2 w-full" value={update.jobId} onChange={value => {setUpdate({...update, jobId: value})}}/> : <p className="text-md font-regular my-2">{details?.jobname}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Salaried Flag</h2>
                                { isEdit ? <Select options={[
                                    { value: '1', label: 'Hours'},
                                    { value: '0', label: 'Salaried'}
                                ]}
                                className="my-2 w-full" value={update.salaryFlag} onChange={value => {setUpdate({...update, salaryFlag: value})}}/> : <p className="text-md font-regular my-2">{details?.salariedflag == "1" ? 'Hours' : details?.salariedflag == "0" ? 'Salaried' : 'None'}</p>}
                            </Col>

                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Salary</h2>
                                { isEdit ? <Input className="my-2" placeholder="X.XXX.XXX" prefix={'Rp'} value={update.salary} 
                                onChange={e => setUpdate({ ...update, salary: e.target.value})}/> : <p className="text-md font-regular my-2">{details?.salary}</p>}
                            </Col>
                            <Col span={12}>
                                <h2 className="text-lg font-semibold">Pay Frequencies</h2>
                                { isEdit ? <Select options={[
                                    { value: '1', label: 'Monthly'},
                                    { value: '2', label: 'Weekly'}
                                ]}
                                className="my-2 w-full" value={update.frequentlyPay == '1' ? 'Monthly' : 'Weekly'} onChange={value => {setUpdate({...update, frequentlyPay: value})}}/> : <p className="text-md font-regular my-2">{details?.frequentlypay == 1 ? 'Monthly' : details?.frequentlypay == 2 ? 'Weekly' : 'None'}</p>}
                            </Col>
                        </Row>
                        { isEdit && <Buttons>Save Update</Buttons>}
                    </form>
                    <Divider/>
                    <div className="my-3">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl">Department History</h1>
                            <Buttons funcs={() => isDept(true)}>Add Mutation</Buttons>
                        </div>
                        <Space direction="vertical" size={15} className="w-full my-4">
                            {
                                deptHist.map((item:any, index:any) =>
                                    <div key={index} className="flex border justify-between p-5 rounded bg-white drop-shadow-none hover:drop-shadow-md">
                                        <div><span className="font-medium">Department : </span>{item?.edhiDept?.deptName}</div>
                                        <div><span className="font-medium">Start Date : </span>{item.edhiStartDate?.split('T')[0]}</div>
                                        <div><span className="font-medium">End Date : </span>{item.edhiEndDate !== null ? item.edhiEndDate?.split('T')[0] : 'None'}</div>
                                    </div>
                                )
                            }
                        </Space>
                    </div>
                    <Divider/>
                    <div className="my-3">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl">Pay History</h1>
                            <Buttons funcs={() => isPay(true)}>New Payment</Buttons>
                        </div>
                        <Space direction="vertical" size={15} className="w-full my-4">
                            {
                                payHist.map((item:any, index:any) =>
                                    <div key={index} className="flex border justify-between p-5 rounded bg-white drop-shadow-none hover:drop-shadow-md">
                                        <div><span className="font-medium">Salary : </span>{item.ephiRateSalary}</div>
                                        <div><span className="font-medium">Pay Date : </span>{item.ephiRateChangeDate?.split('T')[0]}</div>
                                        <div><span className="font-medium">Pay Frequence : </span>{item.ephiPayFrequence == 1 ? 'Mothly' : 'Weekly'}</div>
                                    </div>
                                )
                            }
                        </Space>
                    </div>
                </Col>
                <Col span={6}>
                    <h1 className="mb-5 text-2xl font-semibold">Photo Profile</h1>
                    <div className="p-2 border-2 relative rounded">
                        <Avatar className="bg-[#754CFF]" alt={details.fullName} icon={<UserOutlined />} shape="square" size={250} src={`${configuration.BASE_URL}/employee/public/${details.photourl}`} />
                        <button className="transition ease-in-out absolute bottom-0 drop-shadow-md hover:drop-shadow-lg bg-white py-2 px-5 rounded" style={{left: '50%', transform: 'translate(-50%, 50%)'}} onClick={() => isPhoto(true)}><EditOutlined /> Edit Photo</button>
                    </div>
                </Col>
            </Row>
            <Modal open={photo} onCancel={() => isPhoto(false)}>
                test
            </Modal>
            <Modal open={dept} onCancel={() => isDept(false)}>
                test
            </Modal>
            <Modal open={pay} onCancel={() => isPay(false)}>
                test
            </Modal>
        </Dashboard>
    )
}

export default EmployeeDetail