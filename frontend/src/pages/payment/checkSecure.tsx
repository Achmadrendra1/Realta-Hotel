import Buttons from "@/components/Button";
import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

export default function CheckSecure(props: any) {
  const { data } = props;
  const [pin, setPin] = useState(["", "", "", ""]);
  const [cvv, setCVV] = useState(["", "", ""])

  const [finalForm, setFinalForm] = useState({
    userId: 0,
    payType: "", //Buat booking/resto
    amount: "",
    sourceNumber: "",
    targetNumber: "",
    trxType: "",
    secureCode: "",
    orderNumber: "",
  });

//   useEffect(()=>{
//     setFinalForm({...data, secureCode: data.payType != 'PG' ? cvv : pin})
//   }, [cvv, pin])

  const onComplete = () => {
    console.log(finalForm)
  }


  const handleChangeCVV = (index: number, event: any) => {
    const newCVV = [...cvv];
    newCVV[index] = event.target.value;
    setCVV(newCVV);
    setFinalForm({ ...data, secureCode: newCVV.join("") });
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
    setFinalForm({ ...data, secureCode: newPin.join("") });
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
        {finalForm.secureCode}
        <p className="text-lg font-bold mb-4 text-center">Input Your {data.payType != 'PG' ? 'CVV' : 'PIN'}</p>
        <div className="flex justify-center">
          {data.payType != 'PG' ? cvv.map((value, index) => (
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
        <div className="text-center mt-6">
              <Buttons funcs={onComplete}>Submit</Buttons>
            </div>
      </Modal>
    </>
  );
}
