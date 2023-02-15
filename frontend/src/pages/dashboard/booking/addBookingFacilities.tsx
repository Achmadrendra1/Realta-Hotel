import { Form, Input, Modal } from "antd";

export default function AddBookingFacilities(props : any){
    
    return(
        <>
            <Modal
                title='Booking Facilities'
                open={props.showBookingFacilities}
                onOk={props.clickOkBookingFacilities}
                onCancel={props.clickCancelBookingFacilities}
                centered
            >
            <Form layout='vertical'>
                <Form.Item label=''>
                    <Input type='text'/>
                </Form.Item>
            </Form>
            </Modal>  
        </>
    )
}