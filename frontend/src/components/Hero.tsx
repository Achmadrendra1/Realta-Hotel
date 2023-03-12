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
import { useRouter } from "next/router";
import { useState } from "react";

const Hero = () => {
  const heros =
    "relative w-full h-[80vh] bg-[url('/assets/content-1.jpg')] m-auto rounded-3xl bg-center bg-cover bg-no-repeat text-center flex items-center mb-6";
  const float = "absolute bg-white rounded-lg drop-shadow-lg py-5 px-8 w-2/3";
  const input = "outline-0 text-md py-2";
  const { RangePicker } = DatePicker;
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [date, setDate] = useState([])
  const onSearch = () => {
    router.push(
      { 
          pathname: 'booking/', 
          query: {
              location: location,
              date: date,
          }
      }
    )
  }
  return (
    <Layout className="bg-[#f1f2fa] py-10">
      <div className={heros}>
        <div className="m-auto p-2 bg-slate-900 bg-opacity-40 w-full h-full rounded-3xl flex justify-center ">
          <div className="m-auto">
            <p className="bg-clip-text m-auto text-[36px] font-semibold text-white w-3/4 ">
              Experience More with Best Service at Realta Hotel
            </p>
            <div className="bg-[#f1f2fa] mt-16 rounded-full p-5">
              <Row className="">
                <Col span={8} className="px-4 text-start">
                  <p className="text-lg font-semibold ml-2">Locations</p>
                  <Input
                    bordered={false}
                    allowClear
                    className="w-full"
                    placeholder="Hotel Locations"
                    onChange={e => setLocation(e.target.value)}
                  />
                </Col>
                <Divider
                  type="vertical"
                  style={{
                    marginTop: 2,
                    height: 50,
                    borderLeftWidth: 2,
                    borderLeftStyle: "solid",
                    borderLeftColor: "#C0C1C0",
                  }}
                />
                <Col span={10} className="mx-2">
                  <p className="text-lg font-semibold text-start">Date</p>
                  <RangePicker className="w-full" bordered={false} 
                    onChange={(value, dateString: any) =>
                      setDate(dateString)
                    }/>
                </Col>
                <Divider
                  type="vertical"
                  style={{
                    marginTop: 2,
                    height: 50,
                    borderLeftWidth: 2,
                    borderLeftStyle: "solid",
                    borderLeftColor: "#C0C1C0",
                  }}
                />
                <Col className="">
                  <div className="mt-1 ml-4">
                    <Button className="rounded-full h-12 w-28 bg-[#744cff] text-md text-[#f1f2fa] font-regular" onClick={() => onSearch()}>Search</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hero;