import { doCreateAccount } from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import { Button, Input, Modal } from "antd";
import next from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ActivationHpay(props: any) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const { handleAct } = props;
  const { handleCancell, dataUser, dataPaga } = props;
  const dispatch = useDispatch();

  const pagaId = dataPaga?.filter((obj: any) => obj.pagaName === "H-Pay")[0]
    ?.pagaEntityId;
  const accNumber = `131${dataUser[0]?.user_phone_number}`;

  const [formValues, setFormValues] = useState({
    usacAccountNumber: accNumber,
    usacEntityId: pagaId,
    usacType: "Payment",
    usacExpmonth: 0,
    usacExpyear: 0,
    usacSaldo: 0,
    usacSecureCode: "",
    usacUserId: dataUser[0].user_id,
  });

  const handleChange = (index: number, event: any) => {
    const newPin = [...pin];
    newPin[index] = event.target.value;
    setPin(newPin);
    setFormValues({ ...formValues, usacSecureCode: newPin.join("") });
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

  const handleConfirmPinChange = (index: number, event: any) => {
    const newConfirmPin = [...confirmPin];
    newConfirmPin[index] = event.target.value;
    setConfirmPin(newConfirmPin);
    if (event.target.value.length === 1) {
      const nextIndex = index + 1;
      if (nextIndex < 4) {
        const nextInput = document.getElementById(`Confpin-${nextIndex + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleDelConfirm = (index: number, event: any) => {
    if (event.keyCode === 8 && index > 0) {
      const newConfirmPin = [...confirmPin];
      newConfirmPin[index] = "";
      setConfirmPin(newConfirmPin);
      const prevIndex = index - 1;
      const prevInput = document.getElementById(`Confpin-${prevIndex + 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (pin.join("") !== confirmPin.join("")) {
      setError("PIN tidak sama");
      return;
    }
    if (pin.join("").length !== 4) {
      setError("PIN harus memiliki 4 digit");
      return;
    }
    setError("");
    handleCancell(false);
    // console.log(formValues)
    dispatch(doCreateAccount(formValues));
    // continue with form submission
  };
  return (
    <>
      <Modal
        title={<span className="text-lg">Activation H-Pay</span>}
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <Input
          size="large"
          readOnly
          value={props.phone}
          className="my-4 hover:border-[#754cff]"
        />
        <div className="mt-4 text-center justify-center">
          <p className="mb-2 font-bold">Create New Pin</p>
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
                className="h-[45px] mx-4 focus:border-[#754cff] hover:border-[#754cff] w-[45px] text-center"
              />
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="mb-2 font-bold">Confirm Your Pin</p>
          <div className="flex justify-center">
            {confirmPin.map((value, index) => (
              <Input
                key={index}
                id={`Confpin-${index + 1}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(event) => handleConfirmPinChange(index, event)}
                onKeyDown={(event) => handleDelConfirm(index, event)}
                className="h-[45px] mx-4 focus:border-[#754cff] hover:border-[#754cff] w-[45px] text-center"
              />
            ))}
          </div>
        </div>
        <div className="text-center mt-4">
          {error && <div className="error text-red-600 my-4">{error}</div>}
          <Buttons funcs={handleSubmit}>Activate</Buttons>
        </div>
      </Modal>
    </>
  );
}
