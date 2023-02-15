import { Form, Input, Modal } from "antd";

export default function AddSpecialOffers(props : any){
    return(
        <>
        <Modal
            title='Add Special Offers'
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