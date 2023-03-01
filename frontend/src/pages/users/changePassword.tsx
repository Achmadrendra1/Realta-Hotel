import { doUpdatePassword } from "@/Redux/Action/User/GetDataUser";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ChangePassword(props: any) {
 const  dispatch = useDispatch();
 const { handleClose } = props;
 const [password,setPassword] = useState('')
 const [confirmPassword,setConfirmPassword] = useState('')
 const [error, setError] = useState('');




  const onFinish = (values: any) => {
    
    if (password !== confirmPassword) {
      setError(`Password don't match`);
      setTimeout(() => {
      }, 5000);
    } else {
      console.log("Success:", values);
      dispatch(doUpdatePassword(values));
      handleClose(false);
    }
  
  };


 

 
  return (
    <>
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
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
              
                label="Current Password"
              >
                <Input.Password
                  type="password"
                  placeholder="Your Current Password"
                />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="uspa_passwordhash"
                rules={[
                  { required: true, message: "Please input your Password!" },
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
                name="Confirmpassword"
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
              <Button  htmlType="submit" style={{marginBottom:30}}>
                Change Password
              </Button>
            
             </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
