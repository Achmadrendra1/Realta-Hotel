import withAuth from "@/PrivateRoute/WithAuth";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Table, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./changePassword";
import EditProfile from "./editProfile";
import { doGetUser } from "@/Redux/Action/User/GetDataUser";
import moment from "moment";


export default withAuth( function Userprofile() {
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.GetUserReducer.getUser);

  
 useEffect(()=>{
  dispatch(doGetUser())
 },[]);

  // const contentList: Record<string, React.ReactNode> = {
  //   Bonus: <p>Table Bonus</p>,
  //   History: <p>Table History</p>,
  // };

  // const [activeTab, setActiveTab] = useState<string>("Bonus");
  // const onTab1Change = (key: string) => {
  //   setActiveTab(key);
  // };

  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenChange, setOpenChange] = useState(false);
  const handleClose = (data: boolean) => {
    setOpenEdit(data);
    setOpenChange(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenEdit(false);
      setOpenChange(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpenEdit(false);
    setOpenChange(false);
  };

  //Table Bonus Points
  const columnsUsers = [
    {
      title: "Created On",
      dataIndex: "ubpo_created_on",
      key: "CreatedOn",
      render: (text: any) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: "Bonus Type",
      dataIndex: "ubpo_bonus_type",
      key: "BonusType",
      render:(text:any)=>(
        text == 'P' ? 'Promote' :'Rating'
      )
    },
    {
      title: "Point",
      dataIndex: "ubpo_total_points",
      key: "Point",
    }
  ];

 const columnHistory =[
    {
      title: "Promote Date",
      dataIndex: "usme_promote_date",
      key: "PromoteDate",
      render: (text: any) => moment(text).format('DD-MMM-YYYY')
    },
    {
      title: "Member Type",
      dataIndex: "usme_memb_name",
      key: "MemberName",
      render:(text:any)=>(
        text == 'Silver' ?  <Tag color="default">Silver</Tag> : text == 'Gold'?
        <Tag color="gold">Gold</Tag> : text == 'VIP'?
        <Tag color="cyan">VIP</Tag> : 
        <Tag color="geekblue">Wizard</Tag>
      )
    },
    {
      title: "Point",
      dataIndex: "usme_points",
      key: "Point",
    },
    {
      title: "Status",
      dataIndex: "usme_type",
      key: "type",
    },
  ]

  return (
    <div>
      {OpenEdit ? (
        <EditProfile
          show={OpenEdit}
          data={user}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {OpenChange ? (
        <ChangePassword
          show={OpenChange}
          clickOk={handleOk}
          data={user}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      <Card title="General" className="mb-4 flex-col">
        <p className="mb-4">
          This information will be display, so be careful what you share
        </p>
        <Row gutter={16}>
          <Col span={4} className="mr-6">
            
            <Avatar
              size={120}
              icon={
                 !user[0]?.emp_photo ? <UserOutlined /> : user[0]?.emp_photo 
              }
            />
          </Col>
          <Col span={7}>
            <p className="text-sm font-semibold">{user[0] ? user[0].user_full_name: 'Guest'}</p>
           
        
            <p className="text-md mb-4 mt-1 font-normal">
          {user[0]?.user_type == "T" ?'Travel Agent' : user[0]?.user_type == "I" ? 'Individual' :'Corporate'}
            </p>
            <p  >
              {user[0]?.usme_memb_name == 'Silver'?
              <Tag color="default">Silver</Tag> : user[0]?.usme_memb_name == 'Gold'?
              <Tag color="gold">Gold</Tag> : user[0]?.usme_memb_name == 'VIP'?
              <Tag color="cyan">VIP</Tag> : 
              <Tag color="geekblue">Wizard</Tag>
            }
            </p>
          </Col>
          <Col span={9}>
            <p className="text-md mb-2">{user[0] ? user[0].user_email: 'None'} (default)</p>
            <p className="text-md">{user[0] ? user[0].user_phone_number: 'None'} (active)</p>
          </Col>
          <Col></Col>
        </Row>
        <div className="flex justify-end text-lg">
          <EditOutlined
            className="hover:cursor-pointer hover:text-blue-600"
            onClick={() => setOpenEdit(true)}
          />
        </div>
      </Card>
      <Card title="Security" className="mb-4">
        <div className="flex justify-between">
          <p>Change Password</p>
          <EditOutlined
            className="text-lg hover:cursor-pointer hover:text-blue-600"
            onClick={() => setOpenChange(true)}
          />
        </div>
      </Card>
      <Card
       title="Point & Member"
      >
       <Tabs>
            <Tabs.TabPane tab = "Bonus Points" key={"BP"}>
              <Table dataSource={user} columns={columnsUsers} pagination={false}></Table>
            </Tabs.TabPane>
            <Tabs.TabPane tab = "History Member" key={"HM"}>
            <Table dataSource={user} columns={columnHistory} pagination={false}></Table>
            </Tabs.TabPane>
       </Tabs>
      </Card>
      
    </div>
  );
})
