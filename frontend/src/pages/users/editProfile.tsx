import { Modal } from "antd";
import React from "react";

export default function EditProfile(props : any) {
  return (
    <>
      <Modal
        title='Edit General'
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
