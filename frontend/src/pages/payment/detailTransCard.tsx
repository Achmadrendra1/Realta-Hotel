import { Modal } from 'antd'
import React from 'react'

export default function DetailTransCards(props:any) {
  return (
   <>
    <Modal 
        title="Detail"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
    >

    </Modal>
   </>
  )
}
