import { Form, Input, Modal } from "antd";

export default function EditBookingFacilities(props : any){

    return (
        <>
            <Modal
             title='Edit Booking Facilities'
             open={props.showBookingFacilities}
             onOk={props.clickOkBookingFacilities}
             onCancel={props.clickCancelBookingFacilities}
             centered
            >
                <Form>
                    <Form.Item label=''>
                        <Input type='text'/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}