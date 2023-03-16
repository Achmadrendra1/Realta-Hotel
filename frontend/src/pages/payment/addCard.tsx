import { doBankRequest } from "@/Redux/Action/Payment/paymentDashAction";
import { doCreateAccount, doGetAllBank } from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddCard(props: any) {
  const dispacth = useDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const { dataUser, dataBank, handleCancell } = props;
  const {allBank} = useSelector((state:any) => state.payBankReducer)
  useEffect(()=>{
    dispacth(doGetAllBank())
  }, [])
  const optionsBank = allBank?.map((items: any) => ({
    label: items.bankName,
    value: items.bankEntityId,
  }));
  const [formValues, setFormValues] = useState({
    usacAccountNumber: "",
    usacEntityId: "",
    usacType: "",
    usacExpmonth: "",
    usacExpyear: "",
    usacSaldo: "",
    usacSecureCode: "",
    usacUserId: dataUser[0].user_id,
  });

  const onFinish = () => {
    // console.log("Success:", formValues);
    dispacth(doCreateAccount(formValues));
    handleCancell(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const handleMonth = (e: any) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      e.target.value = "1";
      setFormValues({ ...formValues, usacExpmonth: "1" });
    } else if (value > 12) {
      e.target.value = "12";
      setFormValues({ ...formValues, usacExpmonth: "12" });
    }
  };

  return (
    <>
      <Modal
        title="Add Credit / Debit Card"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formValues}
        >
          <Form.Item
            label="Card Number"
            name={"usacAccountNumber"}
            rules={[{ required: true, message: "Please input card number!" }]}
          >
            <Input
              type="text"
              onChange={handleInputChange("usacAccountNumber")}
              placeholder="Enter Card Number"
              maxLength={16}
              size="large"
              className="focus:border-[#754cff] hover:border-[#754cff]"
            />
          </Form.Item>
          <Row gutter={16}>
            <Col> 
              <Form.Item
                label="Bank"
                name={"usacEntityId"}
                rules={[
                  { required: true, message: "Please select your bank!" },
                ]}
              >
                <Select
                  size="large"
                  allowClear
                  showSearch
                  placeholder="Select Bank"
                  style={{ width: 250 }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label.toString() ?? "")
                      .toLowerCase()
                      .includes(input)
                  }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label.toString() ?? "")
                  //     .toLowerCase()
                  //     .localeCompare(
                  //       (optionB?.label.toString() ?? "").toLowerCase()
                  //     )
                  // }
                  options={optionsBank}
                  value={formValues.usacType}
                  onChange={(value) => {
                    setFormValues({ ...formValues, usacEntityId: value });
                  }}
                  
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Type Card"
                name={"usacType"}
                rules={[
                  { required: true, message: "Please select type your card!" },
                ]}
              >
                <Select
                size="large"
                allowClear
                  placeholder="Select Card Type"
                  style={{ width: 200 }}
                  onChange={(value) =>
                    setFormValues({ ...formValues, usacType: value })
                  }
                >
                  <Option value="Debet">Debet</Option>
                  <Option value="Credit Card">Credit Card</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                label="Month"
                name={"usacExpmonth"}
                rules={[
                  {
                    required: true,
                    message: "Please input month of exp your card!",
                  },
                ]}
              >
                <Input
                
                  placeholder="MM"
                  maxLength={2}
                  onChange={handleInputChange("usacExpmonth")}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Year"
                name={"usacExpyear"}
                rules={[
                  {
                    required: true,
                    message: "Please input year of exp your card!",
                  },
                ]}
              >
                <Input
                  placeholder="YY"
                  maxLength={2}
                  onChange={handleInputChange("usacExpyear")}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="CVV"
                name={"usacSecureCode"}
                rules={[
                  {
                    required: true,
                    message: "Please input your cvv!",
                  },
                ]}
              >
                <Input
                  placeholder="CVV"
                  maxLength={3}
                  onChange={handleInputChange("usacSecureCode")}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Saldo"
                name={"usacSaldo"}
                rules={[
                  {
                    required: true,
                    message: "Please input your cvv!",
                  },
                ]}
              >
                <Input
                  placeholder="0"
                  prefix="Rp."
                  onChange={handleInputChange("usacSaldo")}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Buttons type={"danger"} funcs={props.clickCancel}>Cancel</Buttons>
            <div className="ml-2">
              <Buttons>Submit</Buttons>
            </div>
          </div>
        </Form>
        {cardNumber}
      </Modal>
    </>
  );
}
