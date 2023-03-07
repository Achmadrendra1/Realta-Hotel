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
                        <Col span={4} className="text-start">
                            <label htmlFor="location">Location</label>
                            <input type="text" className={input} placeholder="Find here" id="location"/>
                        </Col>
                        <Col span={4} className="text-start">
                            <label htmlFor="faci">Hotel</label>
                            <input type="text" className={input} placeholder="Find here" id="faci"/>
                        </Col>
                        <Col span={4} className="text-start">
                            <label htmlFor="guest">Guest</label>
                            <input type="number" className={input} placeholder="Find here" id="guest"/>
                        </Col>
                        <Col span={9} className="text-start">
                            <label htmlFor="date">Date</label>
                            <div className="flex gap-4">
                                <input type="date" className={input} placeholder="Check In" id="date"/>
                                <input type="date" className={input} placeholder="Check Out" id="date1"/>
                            </div>

                        </Col>
                        <Col span={3} className="flex justify-end">
                            <button className="bg-slate-700 p-4 text-white rounded-full flex items-center justify-end"><ArrowRightOutlined /></button>
                        </Col>
                    </Row>
                </form> */}
      </div>
    </Layout>
  );
};

export default Hero;
