<<<<<<< HEAD
import { ArrowRightOutlined } from "@ant-design/icons/lib"
import { Layout, Row, Col, DatePicker, Input } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import dayjs from "dayjs";
import { Router, useRouter } from "next/router";

const Hero = () => {
    
    const { RangePicker } = DatePicker;
    const root = useRouter()
    
    const heros = "relative w-full h-96 bg-[url('/assets/content-1.jpg')] m-auto rounded-3xl bg-center bg-cover bg-no-repeat text-center flex items-center mb-6"
    const float = "absolute bg-white rounded-lg drop-shadow-lg py-5 px-8 w-2/3"
    const input = "outline-0 text-md py-2"

    const [hero, setHero] = useState({
        location : '',
        start : '',
        end : '',
        room : 0,
        adults : 0,
        kids : 0

    })

    const handleHeroChange = (event : any) => {
        const {name, value} = event.target;
        setHero ({...hero, [name] : value })
    }

    const dateFormat = "DD MM YYYY";

    const disabledDate = (current: any, checkInDate: any) => {
        if (checkInDate) {
          return (
            current < dayjs().startOf("day") || current.isBefore(checkInDate, "day")
          );
        }
        return current < dayjs().startOf("day");
        console.log(current)
      };

    const handleDateRangeChange = (date : any, dateStrings : any) => {
        setHero({ ...hero, start: (dateStrings[0]), end: (dateStrings[1]) })
      };

    console.log(hero)

    const handleHeroClick = () => {
        root.push({pathname: '/booking/', search : `?location=${hero.location}&start=${hero.start}&end=${hero.end}&room=${hero.room}&adults=${hero.adults}&kids=${hero.kids}`})
    }

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
                    <Row gutter={15} className="justify-between" align="middle">
=======
import { ArrowRightOutlined } from "@ant-design/icons/lib";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Divider,
  Select,
  DatePicker,
  Button,
} from "antd";
import Buttons from "./Button";

const Hero = () => {
  const heros =
    "relative w-full h-[80vh] bg-[url('/assets/content-1.jpg')] m-auto rounded-3xl bg-center bg-cover bg-no-repeat text-center flex items-center mb-6";
  const float = "absolute bg-white rounded-lg drop-shadow-lg py-5 px-8 w-2/3";
  const input = "outline-0 text-md py-2";
  const { RangePicker } = DatePicker;
  return (
    <Layout className="bg-[#f1f2fa] py-10">
      <div className={heros}>
        <div className="m-auto p-2 bg-slate-900 bg-opacity-40 w-full h-full rounded-3xl flex justify-center ">
          <div className="m-auto">
            <p className="bg-clip-text m-auto text-[36px] font-semibold text-white w-3/4 ">
              Experience More with Best Service at Realta Hotel
            </p>
            <div className="bg-[#f1f2fa] h-28 mt-16 rounded-full py-6 pl-4">
              <Row className="">
                <Col span={8} className="px-4 text-start">
                  <p className="text-lg font-semibold ml-2">Locations</p>
                  <Select
                    showSearch
                    bordered={false}
                    allowClear
                    className="w-full"
                    placeholder="Hotel Locations"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "Bogor",
                        label: "Bogor",
                      },
                      {
                        value: "Jakarta",
                        label: "Jakarta",
                      },
                      {
                        value: "Bandung",
                        label: "Bandung",
                      },
                    ]}
                  />
                </Col>
                <Divider
                  type="vertical"
                  style={{
                    marginTop: 2,
                    height: 50,
                    borderLeftWidth: 2,
                    borderLeftStyle: "solid",
                    borderLeftColor: "#000",
                  }}
                />
                <Col span={10} className="mx-2">
                  <p className="text-lg font-semibold text-start">Date</p>
                  <RangePicker className="w-full" bordered={false} />
                </Col>
                <Divider
                  type="vertical"
                  style={{
                    marginTop: 2,
                    height: 50,
                    borderLeftWidth: 2,
                    borderLeftStyle: "solid",
                    borderLeftColor: "#000",
                  }}
                />
                <Col className="">
                  <div className="mt-1 ml-4">
                    <Button className="rounded-full h-12 w-28 bg-[#744cff] text-lg text-[#f1f2fa] font-semibold">Search</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        {/* <form className={float} style={{bottom: '20%', left: '50%', transform: 'translateX(-50%)'}}>
                    <Row justify='space-between' align='middle'>
>>>>>>> c5c25eb15801879752c0709b4fa11f3f6842114d
                        <Col span={4} className="text-start">
                                <label htmlFor="location">Location</label>
                                <Input name="location" onChange={handleHeroChange}/>
                                {/* <input type="text" name="location" className={input} onChange={handleHero} placeholder="Find here" id="location"/> */}
                        </Col>
                        {/* <Col span={4} className="text-start">
                            <label htmlFor="faci">Hotel</label>
                            <input type="text" className={input} placeholder="Find here" id="faci"/>
                        </Col> */}
                        <Col span={8} className="text-start">
                            <label htmlFor="date">Date</label>
                            <div>
                            <RangePicker name="range" onChange={handleDateRangeChange} format={dateFormat} disabledDate={(current) => disabledDate(current, dayjs())}/>  
                            {/* <DatePicker name="checkIn" className={input} onChange={(date)=> handleHero({target : {name : "checkIn", value : date?.format('DD MM YYYY') }})} placeholder="Check In" id="date"/>
                            <DatePicker name="checkOut" className={input} onChange={(date)=> handleHero({target : {name : "checkOut", value : date?.format('DD MM YYYY') }})} placeholder="Check Out" id="date1"/> */}
                            </div>
                        </Col>
                        <Col span={3} className="text-start">
                            <label htmlFor="guest">Room</label>
                            <Input name="room" type="number" min={1} max={3} onChange={handleHeroChange}/>
                            {/* <input type="number" name="guest" className={input} placeholder="Find here" id="guest"/> */}
                        </Col>
                        <Col span={3} className="text-start">
                            <label htmlFor="guest">Adults</label>
                            <Input name="adults" type="number" min={1} max={4} onChange={handleHeroChange}/>
                            {/* <input type="number" name="guest" className={input} placeholder="Find here" id="guest"/> */}
                        </Col>
                        <Col span={3} className="text-start">
                            <label htmlFor="guest">Kids</label>
                            <Input name="kids" type="number" min={1} max={2} onChange={handleHeroChange}/>
                            {/* <input type="number" name="guest" className={input} placeholder="Find here" id="guest"/> */}
                        </Col>
                        <Col span={3} className="flex justify-end">
                            <button onClick={handleHeroClick} className="bg-slate-700 p-4 text-white rounded-full flex items-center justify-end"><ArrowRightOutlined /></button>
                        </Col>
                    </Row>
                </form> */}
      </div>
    </Layout>
  );
};

export default Hero;
