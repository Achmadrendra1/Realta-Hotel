import { doUpdatePassword } from "@/Redux/Action/User/GetDataUser";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword(props: any) {
 const  dispatch = useDispatch();
 const { handleClose,data } = props;
 const id = data[0].user_id
 const [password,setPassword]  = useState('');
 const [confirmPassword,setConfirmPassword] = useState('');
 const [error, setError] = useState('');
 const [messageApi, contextHolder] = message.useMessage();



  const onFinish = (values:any) => {
    if (password !== confirmPassword) {
      setError(`Password doesn't match`);
      setTimeout(() => {
      }, 2000);
    } else {
      // console.log("Success:", values);
      dispatch(doUpdatePassword(values));
      handleClose(false);
      message.success("Data Berhasil Diubah", 1.5);
    }
    
  };
  return (
    <>
    {contextHolder}
      <Modal
        title="Change Password"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <Row>
          <Col span={15} className="mt-10">
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{
               
                width: 300,
                marginLeft: 100,
                marginRight: 100,
              }}
            >
              <Form.Item
              initialValue={id}
              name="uspa_user_id"
              hidden
              />
              <Form.Item
                //hidden
                label="New Password"
                name="uspa_passwordhash"
                rules={[
                  { required: true, message: "Please input your New Password!" },
                ]}
                required
              >
                <Input.Password
                  type="password"
                  value={password}
                  placeholder="Your New Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
              
              >
                <Input.Password
                 value={confirmPassword}
                  type="password"
                  placeholder="Re-type Your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Item>
              {error && <div  className="error text-red-600 mb-2" >{error}</div>}
              <button  type="submit" className="bg-[#754CFF] hover:bg-purple-500 text-white px-4 py-3 my-2 rounded-lg font-medium w-30" style={{marginBottom:30}} >
                Change Password
              </button>
            
             </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
