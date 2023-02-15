import { Form, Input, Modal } from "antd";

export default function EditSpecialOffers(props : any){
    return(
        <>
        <Modal
            title='Edit Special Offers'
            open={props.showSpecialOffers}
            onOk={props.clickOkSpecialOffers}
            onCancel={props.clickCancelSpecialOffers}
            centered
        >
            <Form>
                <Form.Item label=''>
                    <Input placeholder='' type='text'/>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}