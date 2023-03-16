import { addDeptHist, addPayHist, getDeptSelect, getDetailEmp, updateEmpPhoto, updateEmployee } from "@/Redux/Action/HR"
import Buttons from "@/components/Button"
import Dashboard from "@/layouts/dashboard"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { AutoComplete, Avatar, Col, DatePicker, Divider, Form, Input, List, Modal, Row, Select, Space } from "antd"
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
    const { selectJob, selectDept } = useSelector((state:any) => state.selectReducer)
    const { employee } : any = router.query
    const jobId = !parseInt(details?.jobname) ? selectJob.find((item:any) => item.label.toLocaleLowerCase() == details?.jobname?.toLocaleLowerCase()) : selectJob.find((item:any) => item.value == details?.jobname)
    const [photos, setPhotos] = useState([])
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

    const [mutation, setMutation] = useState({
        empId: 0 || '',
        shiftId: '',
        deptId: ''
    })

    const [payment, setPayment] = useState({
        empId: 0 || '',
        salary: '',
        payFrequence: ''
    })

    const mutationDept = () => {
        dispatch(addDeptHist(mutation))
        setMutation({
            ...mutation,
            shiftId: '',
            deptId: ''
        })
        isDept(false)
    }

    const addPayment = () => {
        dispatch(addPayHist(payment))
        setPayment({
            ...payment,
            salary: '',
            payFrequence: ''
        })
        isPay(false)
    }

    useEffect(() => {
        dispatch(getDetailEmp(employee[0]))
        dispatch(getDeptSelect())
        
        setMutation({ ...mutation, empId: employee[0]})
        setPayment({ ...payment, empId: employee[0]})
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
            salary: details?.salary?.split('Rp')[1]?.split(',')[0].replace(/\./g, ''),
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
        setIsEdit(false)
    }

    const editPhoto = () => {
        const body = new FormData()
        body.append('image', photos)
        body.append('id', mutation.empId)
        dispatch(updateEmpPhoto(body))
        isPhoto(false)
        setPhotos([])
    }

    const addCommas = (num:any) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num:any) => num?.toString().replace(/[^0-9]/g, "");
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
                                deptHist.sort((a:any, b:any) => new Date(a.edhiEndDate) - new Date(b.edhiEndDate)).map((item:any, index:any) =>
                                    <Row justify='space-between' align='middle' key={index} className="border p-5 rounded bg-[#F2F1FA] drop-shadow-none hover:drop-shadow-md">
                                        <Col span={11}><span className="font-medium">Department : </span>{item?.edhiDept?.deptName}</Col>
                                        <Col span={7}><span className="font-medium">Start Date : </span>{item.edhiStartDate?.split('T')[0]}</Col>
                                        <Col span={6}><span className="font-medium">End Date : </span>{item.edhiEndDate !== null ? item.edhiEndDate?.split('T')[0] : 'None'}</Col>
                                    </Row>
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
                                    <div key={index} className="flex border justify-between p-5 bg-[#F2F1FA] rounded drop-shadow-none hover:drop-shadow-md">
                                        <div><span className="font-medium">Salary : </span>
                                        {isNaN(+item.ephiRateSalary) ? item.ephiRateSalary : `Rp${addCommas(item.ephiRateSalary)},00`}</div>
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
                        <Avatar className="bg-[#754CFF]" icon={<UserOutlined />} shape="square" size={250} src={`${configuration.BASE_URL}/employee/public/${details?.photourl}`} />
                        <button className="transition ease-in-out absolute bottom-0 drop-shadow-md hover:drop-shadow-lg bg-white py-2 px-5 rounded" style={{left: '50%', transform: 'translate(-50%, 50%)'}} onClick={() => isPhoto(true)}><EditOutlined /> Edit Photo</button>
                    </div>
                </Col>
            </Row>
            <Modal title='Edit Profiles Photo' open={photo} onCancel={() => isPhoto(false)} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={() => isPhoto(false)} type='danger'>Cancel</Buttons>
                    <Buttons funcs={() => editPhoto()}>Save</Buttons>
                </div>
            }>
                <Form>
                    <Input type="file" id="photo" style={{ display: 'none'}} onChange={e => setPhotos(e.target.files[0])}/>
                    <label htmlFor="photo" className="w-full">
                        <div className="flex justify-center items-center bg-gray-100 rounded h-28">
                            Click Here and Choose New File
                        </div>
                    </label>
                    {
                        photos?.name !== undefined && 
                        <div className="flex justify-between items-center py-3">
                            <p>{photos?.name}</p>
                            <button className="text-red-500" onClick={() => setPhotos([])}><DeleteOutlined/></button>
                        </div>
                    }
                </Form>
            </Modal>
            <Modal title='Department History' open={dept} onCancel={() => isDept(false)} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={() => isDept(false)} type='danger'>Cancel</Buttons>
                    <Buttons funcs={mutationDept}>Save</Buttons>
                </div>
            }>
                <Form>
                    <Form.Item
                        label='Shift Option'>
                        <Select className="w-full" options={[
                            {value: '1', label: 'Pagi'},
                            {value: '2', label: 'Siang'},
                            {value: '3', label: 'Malam'}
                        ]} value={mutation.shiftId} onChange={value => setMutation({...mutation, shiftId: value})}/>
                    </Form.Item>
                    <Form.Item
                        label='Mutation To'>
                            <Select options={selectDept} value={mutation.deptId} placeholder='Find Department' onChange={value => setMutation({ ...mutation, deptId: value})}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Payment" open={pay} onCancel={() => isPay(false)} footer={
                <div className="w-full flex gap-5 justify-end">
                    <Buttons funcs={() => isPay(false)} type='danger'>Cancel</Buttons>
                    <Buttons funcs={() => addPayment()}>Save</Buttons>
                </div>
            }>
                <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}>
                    <Form.Item
                    label='Salary'>
                        <Input prefix='Rp' placeholder="X,XXX,XXX" 
                        value={addCommas(payment.salary)}
                        onChange={e => setPayment({  ...payment, salary: removeNonNumeric(e.target.value)})}/>
                    </Form.Item>
                    <Form.Item
                    label='Pay Frequence'>
                        <Select className="w-full" options={[
                            {value: '1', label: 'Monthly'},
                            {value: '2', label: 'Weekly'},
                        ]} value={payment.payFrequence} onChange={value => setPayment({...payment, payFrequence: value})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Dashboard>
    )
}

export default EmployeeDetail