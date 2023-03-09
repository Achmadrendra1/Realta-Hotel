import { doCreateAccount } from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import { Button, Input, Modal } from "antd";
import next from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ActivationGoto(props: any) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const { handleAct } = props;
  const { handleCancell, dataUser, dataPaga } = props;
  const dispatch = useDispatch();

  const pagaId = dataPaga?.filter((obj: any) => obj.pagaName === "GOTO")[0]
    ?.pagaEntityId;

  const [formValues, setFormValues] = useState({
    usacAccountNumber: props.phone,
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (pin.join("").length !== 4) {
      setError("PIN Must Be 4 Digits");
      return;
    }
    setError("");
    handleCancell(false);
    dispatch(doCreateAccount(formValues));
    // console.log(formValues)
  };
  return (
    <>
      <Modal
        title="Link Account GOTO"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <p className="mt-2 mb-2 font-semibold">Account Number</p>
        <Input
          size="large"
          readOnly
          value={props.phone}
          className="focus:border-[#754cff] hover:border-[#754cff]"
        />
        <p className="mt-2 mb-2 font-semibold">Saldo</p>
        <Input
          size="large"
          prefix="Rp."
          className="focus:border-[#754cff] hover:border-[#754cff]"
          onChange={(e: any) =>
            setFormValues({ ...formValues, usacSaldo: e.target.value })
          }
        />
        <div className="mt-4 text-center justify-center">
          <p className="mb-2 font-semibold">Input PIN</p>
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
                className="h-[40px] w-[40px] mx-1 focus:border-[#754cff] hover:border-[#754cff] text-center"
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="error text-red-600 text-center mt-2">{error}</div>
        )}
        <div className="text-center mt-4">
          <Buttons funcs={handleSubmit}>Save</Buttons>
        </div>
      </Modal>
    </>
  );
}
