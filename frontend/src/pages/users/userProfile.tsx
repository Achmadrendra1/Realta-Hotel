import Buttons from "@/components/Button";
import { Card, Row, Col, Form, Descriptions, Tag, Modal, Avatar } from "antd";
import React, { useState } from "react";
import { Image } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import EditProfile from "./editProfile";
import ChangePassword from "./changePassword";

export default function Userprofile() {
  const tabList = [
    {
      key: "Bonus",
      tab: "Bonus Points",
    },
    {
      key: "History",
      tab: "History Member",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    Bonus: <p>Table Bonus</p>,
    History: <p>Table History</p>,
  };

  const [activeTab, setActiveTab] = useState<string>("Bonus");
  const onTab1Change = (key: string) => {
    setActiveTab(key);
  };

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
    console.log("Clicked cancel button");
    setOpenEdit(false);
    setOpenChange(false);
  };

  return (
    <div>
      {OpenEdit ? (
        <EditProfile
          show={OpenEdit}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {OpenChange ? (
        <ChangePassword
          show={OpenChange}
          clickOk={handleOk}
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
                // <img
                //   src={
                //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                //   }
                //   alt="avatar"
                // />
                <UserOutlined />
              }
            />
          </Col>
          <Col span={6}>
            <p className="text-lg font-semibold">Kang Ridwan</p>
            <p className="text-md mb-4">Travel Agency</p>
            <Tag color="default">Silver</Tag>
          </Col>
          <Col span={8}>
            <p className="text-md mb-2">Kangridwan@gmail.com (default)</p>
            <p className="text-md">0834343434343 (active)</p>
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
          <EditOutlined className="text-lg hover:cursor-pointer hover:text-blue-600" onClick={()=>setOpenChange(true)}/>
        </div>
      </Card>
      <Card
        title="Point & Member"
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTab1Change}
      >
        {contentList[activeTab]}
      </Card>
    </div>
  );
}
