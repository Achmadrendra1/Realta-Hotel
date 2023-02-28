import { doCheckSecureCode } from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import { Input, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CheckSecure(props: any) {
  const { dataPayment, dataBooking } = props;
  const [pin, setPin] = useState(["", "", "", ""]);
  const [cvv, setCVV] = useState(["", "", ""])
  const dispacth = useDispatch();

  const [finalForm, setFinalForm] = useState(dataPayment);

//   useEffect(()=>{
//     setFinalForm({...data, secureCode: data.payType != 'PG' ? cvv : pin})
//   }, [cvv, pin])

const onComplete = () => {
  dispacth(doCheckSecureCode(finalForm))
}

const { error, messages, validate } = useSelector(
  (state: any) => state.payUserAccReducer
);

const [msgValidate, setMsgValidate] = useState("");
const [isLoading, setLoading] = useState(false);

useEffect(() => {
  if(messages != null) {
    // setLoading(true);
    if(validate == true){
      setMsgValidate(messages);
      // setLoading(true);
      console.log(dataBooking)
      console.log(dataPayment)
    } else {
      setLoading(false);
      setMsgValidate(messages)
    }
  }
}, [messages, validate])




  const handleChangeCVV = (index: number, event: any) => {
    const newCVV = [...cvv];
    newCVV[index] = event.target.value;
    setCVV(newCVV);
    setFinalForm({ ...dataPayment, secureCode: newCVV.join("") });
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

  const handleBackspaceCVV = (index: number, event: any) => {
    if (event.keyCode === 8 && index > 0) {
      const newCVV = [...cvv];
      newCVV[index] = "";
      setCVV(newCVV);
      const prevIndex = index - 1;
      const prevInput = document.getElementById(`pin-${prevIndex + 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleChangePin = (index: number, event: any) => {
    const newPin = [...pin];
    newPin[index] = event.target.value;
    setPin(newPin);
    setFinalForm({ ...dataPayment, secureCode: newPin.join("") });
    // setFormValues({...formValues, usacSecureCode: newPin.join("")})
    if (event.target.value.length === 1) {
      const nextIndex = index + 1;
      if (nextIndex < 4) {
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
  return (
    <>
      <Modal
        title="Verify Your Payment"
        open={props.show}
        onOk={props.clickOk}
        // confirmLoading={confirmLoading}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
    <Spin spinning={isLoading} size="large">

        <p className="text-lg font-bold mb-4 text-center">Input Your {dataBooking.boor_pay_type != 'PG' ? 'CVV' : 'PIN'}</p>
        <div className="flex justify-center">
          {dataBooking.boor_pay_type != 'PG' ? cvv.map((value, index) => (
            <Input
              key={index}
              id={`pin-${index + 1}`}
              type="text"
              maxLength={1}
              value={value}
                onChange={(event) => handleChangeCVV(index, event)}
                onKeyDown={(event) => handleBackspaceCVV(index, event)}
              className="h-[45px] mx-4 focus:border-sky-500 w-[45px] text-center"
            />
          )) : pin.map((value, index) => (
            <Input
              key={index}
              id={`pin-${index + 1}`}
              type="text"
              maxLength={1}
              value={value}
                onChange={(event) => handleChangePin(index, event)}
                onKeyDown={(event) => handleBackspace(index, event)}
              className="h-[45px] mx-4 focus:border-sky-500 w-[45px] text-center"
            />
          ))}
        </div>
        {msgValidate == "Your PIN is correct! Please Wait" ? (
              <p className="text-center mt-4 text-green-500">{msgValidate}</p>
            ) : (
              <p className="text-center mt-4 text-red-500">{msgValidate}</p>
            )}
        <div className="text-center mt-6">
              <Buttons funcs={onComplete}>Submit</Buttons>
            </div>
      </Spin>
      </Modal>
    </>
  );
}
