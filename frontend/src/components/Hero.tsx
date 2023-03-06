import { ArrowRightOutlined } from "@ant-design/icons/lib"
import { Layout, Row, Col, DatePicker } from "antd"
import Link from "next/link"
import { useState } from "react"

const Hero = () => {
    const heros = "relative w-full h-96 bg-[url('/assets/content-1.jpg')] m-auto rounded-3xl bg-center bg-cover bg-no-repeat text-center flex items-center mb-6"
    const float = "absolute bg-white rounded-lg drop-shadow-lg py-5 px-8 w-2/3"
    const input = "outline-0 text-md py-2"

    const [hero, setHero] = useState({
        location : '',
        start : '',
        end : '',
        guests : ''
    })

    const handleHero = (event : any) => {
        const {name, value} = event.target;
        setHero (items => ({...hero, [name] : value }))
    }

    console.log(hero)

    return(
        <Layout className="bg-white py-10">
            <div className={heros}>
                <div className="m-auto p-2 bg-slate-800 w-full h-full rounded-3xl flex items-center justify-center opacity-40">
                    <div>
                        <h1 className="bg-clip-text text-2xl font-bold text-white">Experience More with Best Service at Realta Hotel</h1>
                        <p className="text-md font-normal text-white w-4/6 m-auto">Get the most out of your travels with a stay at Realta Hotels.  Our hotel offers exceptional service, comfortable accommodations, and a wide range of amenities to enhance your experience.</p>
                    </div>
                </div>
                <form className={float} style={{bottom: '-10%', left: '50%', transform: 'translateX(-50%)'}}>
                    <Row justify='space-between' align='middle'>
                        <Col span={4} className="text-start">
                            <label htmlFor="location">Location</label>
                            <input type="text" name="location" className={input} onChange={handleHero} placeholder="Find here" id="location"/>
                        </Col>
                        {/* <Col span={4} className="text-start">
                            <label htmlFor="faci">Hotel</label>
                            <input type="text" className={input} placeholder="Find here" id="faci"/>
                        </Col> */}
                        <Col span={9} className="text-start">
                            <label htmlFor="date">Date</label>
                            <div className="flex gap-4">
                                <DatePicker name="checkIn" className={input} onChange={(date)=> handleHero({target : {name : "checkIn", value : date?.format('DD MM YYYY') }})} placeholder="Check In" id="date"/>
                                <DatePicker name="checkOut" className={input} onChange={(date)=> handleHero({target : {name : "checkOut", value : date?.format('DD MM YYYY') }})} placeholder="Check Out" id="date1"/>
                            </div>
                        </Col>
                        <Col span={4} className="text-start">
                            <label htmlFor="guest">Guest</label>
                            <input type="number" name="guest" className={input} placeholder="Find here" id="guest"/>
                        </Col>
                        <Col span={3} className="flex justify-end">
                            <Link href={"/booking"}><button className="bg-slate-700 p-4 text-white rounded-full flex items-center justify-end"><ArrowRightOutlined /></button></Link>
                        </Col>
                    </Row>
                </form>
            </div>
        </Layout>
    )
}

export default Hero