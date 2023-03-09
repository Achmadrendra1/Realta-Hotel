import {
  doCheckSecureCode,
  doTopUp,
} from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import {
  Button,
  Modal,
  Card,
  Col,
  Row,
  Input,
  Checkbox,
  Select,
  Radio,
  Space,
  RadioChangeEvent,
  Drawer,
  Spin,
  message,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopUp(props: any) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pin, setPin] = useState(["", "", ""]);
  const { card, dataUser } = props;
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [showSaldo, setShowSaldo] = useState(false);
  const [disBtn, setDisBtn] = useState(true);
  const [msg, setMsg] = useState(null);
  const [finalForm, setFinalForm] = useState({
    userId: dataUser[0]?.user_id,
    amount: "",
    sourceNumber: "",
    targetNumber: props.phone,
    trxType: "TP",
    secureCode: "",
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState({
    usacAccountNumber: "",
    usacEntityId: "",
    usacSaldo: "",
    usacSecureCode: "",
    usacType: "",
    usacUserId: "",
  });

  const optionsCard = card?.map((items: any) => ({
    label: (
      <div className="flex justify-between">
        <p>{maskCardNumber(items.usacAccountNumber)}</p>
        <p>{items.usacType}</p>
      </div>
    ),
    value: JSON.stringify(items),
    key: items.usacAccountNumber,
  }));

  const handleSelectChange = (value?: any) => {
    value
      ? [
          setSelectedOption({
            ...selectedOption,
            usacAccountNumber: JSON.parse(value).usacAccountNumber,
            usacEntityId: JSON.parse(value).usacEntityId,
            usacSaldo: JSON.parse(value).usacSaldo,
            usacSecureCode: JSON.parse(value).usacSecureCode,
            usacType: JSON.parse(value).usacType,
            usacUserId: JSON.parse(value).usacUserId,
          }),
          setShowSaldo(true),
        ]
      : [
          setSelectedOption({
            usacAccountNumber: "",
            usacEntityId: "",
            usacSaldo: "",
            usacSecureCode: "",
            usacType: "",
            usacUserId: "",
          }),
          setFinalForm({ ...finalForm, sourceNumber: "" }),
          setShowSaldo(false),
        ];
  };

  const selectBtn = (x: any) => {
    setValue(x);
    setFinalForm({ ...finalForm, amount: x });
  };

  const eventHandler = (e: any) => {
    setValue(e.target.value);
    setFinalForm({ ...finalForm, amount: e.target.value });
  };

  const handleChangePin = (index: number, event: any) => {
    const newPin = [...pin];
    newPin[index] = event.target.value;
    setPin(newPin);
    setFinalForm({ ...finalForm, secureCode: newPin.join("") });
    // setFormValues({...formValues, usacSecureCode: newPin.join("")})
    if (event.target.value.length === 1) {
      const nextIndex = index + 1;
      if (nextIndex < 3) {
        const nextInput = document.getElementById(`pin-${nextIndex + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackspace = (index: number, event: any) => {
    if (event.keyCode === 8 && index > 0) {
      const newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);
      const prevIndex = index - 1;
      const prevInput = document.getElementById(`pin-${prevIndex + 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  function maskCardNumber(cardNumber: number) {
    // Mengambil 4 digit terakhir
    const lastFourDigits = cardNumber.toString().slice(-4);
    // Mengganti semua digit, kecuali 4 digit terakhir, dengan karakter "*"
    const maskedDigits = cardNumber.toString().slice(8, -4).replace(/\d/g, "*");
    // Menggabungkan digit yang telah diubah dengan 4 digit terakhir
    const maskedCardNumber = `${maskedDigits} ${lastFourDigits}`;
    return maskedCardNumber;
  }

  useEffect(() => {
    if (parseInt(selectedOption.usacSaldo) < value) {
      setMsg(
        "Your Card Balance Is Insufficient, Please Check Or Select Another Card !"
      );
      setDisBtn(true);
    } else {
      setMsg("");
      setDisBtn(false);
      setFinalForm({
        ...finalForm,
        sourceNumber: selectedOption.usacAccountNumber,
      });
    }
    if (msg == null || selectedOption.usacSaldo == "") {
      setDisBtn(true);
    }
  }, [selectedOption, value]);

  const dispacth = useDispatch();
  const onSubmit = () => {
    dispacth(doCheckSecureCode(finalForm));
  };

  const { error, messages, validate } = useSelector(
    (state: any) => state.payUserAccReducer
  );
  const [isLoading, setLoading] = useState(false);
  const [msgValidate, setMsgValidate] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (messages != null) {
      setLoading(true);
      if (validate == true) {
        setMsgValidate(messages);
        setTimeout(() => setOpen(false));
        setLoading(true)
        dispacth(doTopUp(finalForm));
        {
          messageApi
          .open({
              type: "loading",
              content: "Top Up Is Processing",
              duration: 2,
            })
            .then(() => props.handleCancell(false))
            .then(() => message.success("Top Up Success", 3));
        }
      } else {
        setLoading(false);
        setMsgValidate(messages);
      }
    }
  }, [messages, validate]);

  return (
    <>
      {contextHolder}
      <Modal
        title={<span className="text-lg">Top Up H-Pay</span>}
        open={props.show}
        onOk={props.clickOk}
        confirmLoading={confirmLoading}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <Spin spinning={isLoading} size="large">
          <div className="">
            <p className="mb-2 font-semibold">Select Nominal</p>
            <Row gutter={16}>
              <Col span={8}>
                <Button
                  onClick={() => selectBtn(10000)}
                  className={
                    "border-2 w-32 h-10 focus:bg-[#754cff]  hover:border-[#754cff] focus:text-white"
                  }
                >
                  Rp. 10.000
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  onClick={() => selectBtn(20000)}
                  className={
                    "border-2 w-32 h-10 focus:bg-[#754cff]  hover:border-[#754cff] focus:text-white"
                  }
                >
                  Rp. 20.000
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  onClick={() => selectBtn(50000)}
                  className={
                    "border-2 w-32 h-10 focus:bg-[#754cff]  hover:border-[#754cff] focus:text-white"
                  }
                >
                  Rp. 50.000
                </Button>
              </Col>
            </Row>
            <Row gutter={16} className="mt-2">
              <Col span={8}>
                <Button
                  onClick={() => selectBtn(100000)}
                  className={
                    "border-2 w-32 h-10 focus:bg-[#754cff]  hover:border-[#754cff] focus:text-white"
                  }
                >
                  Rp. 100.000
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  onClick={() => selectBtn(150000)}
                  className={
                    "border-2 w-32 h-10 focus:bg-[#754cff]  hover:border-[#754cff] focus:text-white"
                  }
                >
                  Rp. 150.000
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  onClick={() => selectBtn(200000)}
                  className={
                    "border-2 w-32 h-10 focus:bg-[#754cff]  hover:border-[#754cff] focus:text-white"
                  }
                >
                  Rp. 200.000
                </Button>
              </Col>
            </Row>
            <div className="mt-4">
              <label className="font-semibold">Or Input Nominal</label>
              <Input
                prefix="Rp."
                placeholder="Input Nomimal Top Up"
                type="number"
                className="mr-4 mt-2"
                value={value}
                onChange={eventHandler}
              />
            </div>
            <div className="mt-4">
              <label className="font-semibold">Account Number</label>
              <Input value={props.phone} readOnly className="mr-4 mt-2  hover:border-[#754cff]" />
            </div>
            <div className="mt-4">
              <p className="mb-2 font-semibold">Select Payment</p>
              <Select
                placeholder="Select Card"
                className="w-full hover:border-[#754cff] focus:border-[#754cff]"
                allowClear
                options={optionsCard}
                onChange={handleSelectChange}
              />
              {showSaldo ? (
                <div className="mt-4">
                  <label className="font-semibold">Current Balance</label>
                  <Input value={selectedOption.usacSaldo} prefix="Rp." className="mt-2 hover:border-[#754cff] focus:border-[#754cff]"/>
                </div>
              ) : null}
              <p className="text-center text-red-600 mt-2">{msg}</p>
            </div>

            <div className="text-center">
              <Button
                className="mt-4 flex m-auto bg-[#754cff] text-white"
                onClick={showDrawer}
                disabled={disBtn}
              >
                Continue
              </Button>
            </div>
          </div>

          <Drawer
            title="Verify Your Payment"
            placement="bottom"
            // closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
            height={450}
          >
            <p className="text-lg font-bold mb-4 text-center">Input Your CVV</p>
            <div className="flex justify-center">
              {pin.map((value, index) => (
                <Input
                  key={index}
                  id={`pin-${index + 1}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleChangePin(index, event)}
                  onKeyDown={(event) => handleBackspace(index, event)}
                  className="h-[45px] mx-4 focus:border-[#754cff] w-[45px] text-center"
                />
              ))}
            </div>
            <div className="text-center mt-6">
              <Buttons funcs={onSubmit}>Submit</Buttons>
            </div>
            {msgValidate == "Your PIN is correct! Please Wait" ? (
              <p className="text-center mt-4 text-green-500">{msgValidate}</p>
            ) : (
              <p className="text-center mt-4 text-red-500">{msgValidate}</p>
            )}
          </Drawer>
        </Spin>
      </Modal>
    </>
  );
}
