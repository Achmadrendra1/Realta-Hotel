import { doCheckSecureCode, doUpdatePin } from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import { Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePin(props: any) {
  const dispacth = useDispatch();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [newpin, setNewPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const { handleCancell, dataUser, dataPaga } = props;
  const [msg, setMsg] = useState(null);

  const pagaId = dataPaga?.filter((obj: any) => obj.pagaName === "H-Pay")[0]
    ?.pagaEntityId;
  const accNumber = `131${dataUser[0]?.user_phone_number}`;

  const [formValues, setFormValues] = useState({
    sourceNumber: accNumber,
    secureCode: "",
  });

  const { messages, validate } = useSelector(
    (state: any) => state.payUserAccReducer
  );

  useEffect(() => {
    if (messages != null) {
      setMsg(messages);
    }
  }, [validate, messages]);

  const handleChange = (index: number, event: any) => {
    const newPin = [...pin];
    newPin[index] = event.target.value;
    setPin(newPin);
    setFormValues({ ...formValues, secureCode: newPin.join("") });
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
  const handleChangeNewPIN = (index: number, event: any) => {
    const newSavePin = [...newpin];
    newSavePin[index] = event.target.value;
    setNewPin(newSavePin);
    setFormValues({ ...formValues, secureCode: newSavePin.join("") });
    if (event.target.value.length === 1) {
      const nextIndex = index + 1;
      if (nextIndex < 4) {
        const nextInput = document.getElementById(`newpin-${nextIndex + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackspaceNewPIN = (index: number, event: any) => {
    if (event.keyCode === 8 && index > 0) {
      const newSavePin = [...newpin];
      newSavePin[index] = "";
      setNewPin(newSavePin);
      const prevIndex = index - 1;
      const prevInput = document.getElementById(`newpin-${prevIndex + 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const checkPIN = () => {
    dispacth(doCheckSecureCode(formValues));
    // console.log(formValues)
  };

  const onSubmit = () => {
    // console.log(formValues);
    dispacth(doUpdatePin(formValues))
  };

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (messages != null && messages == "Your PIN is Updated !"){
      {
        messageApi
        .open({
            type: "loading",
            content: "Update Is Processing",
            duration: 2,
          })
          .then(() => props.handleCancell(false))
          .then(() => message.success(messages, 3))
         
      }
    }
  }, [messages])

  return (
    <>
    {contextHolder}
      <Modal
        title={<span className="text-lg">Change PIN</span>}
        open={props.show}
        onOk={props.clickOk}
        // confirmLoading={confirmLoading}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        {!validate ? (
          <div className="mt-4 text-center">
            <p>{msg}</p>
            <p className="mb-2 font-bold">Enter Current PIN</p>
            <div className="flex justify-center">
              {pin.map((value, index) => (
                <Input
                  key={index}
                  id={`pin-${index + 1}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleChange(index, event)}
                  onKeyDown={(event) => handleBackspace(index, event)}
                  className="h-[45px] mx-2 focus:border-[#754cff] hover:border-[#754cff] w-[45px] text-center"
                />
              ))}
            </div>
            <div className="justify-center flex mt-4">
              <Buttons funcs={checkPIN}>CONTINUE</Buttons>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="mb-2 font-bold">Enter New PIN</p>
            <div className="flex justify-center">
              {newpin.map((value, index) => (
                <Input
                  key={index}
                  id={`newpin-${index + 1}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleChangeNewPIN(index, event)}
                  onKeyDown={(event) => handleBackspaceNewPIN(index, event)}
                  className="h-[45px] mx-2 focus:border-[#754cff] hover:border-[#754cff] w-[45px] text-center"
                />
              ))}
            </div>
            <div className="justify-center flex mt-4">
              <Buttons funcs={onSubmit}>SAVE</Buttons>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
