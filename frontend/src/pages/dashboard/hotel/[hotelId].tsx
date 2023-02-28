/* eslint-disable react-hooks/rules-of-hooks */
import {
  deleteFacility,
  getFacility,
  getHotel,
  getHotelID,
  updateHotel,
} from "@/Redux/Action/Hotel/HotelAction";
import Dashboard from "@/layouts/dashboard";
import {
  CameraOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Rate,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFacilities from "./AddFacility";
import EditHotelRealta from "./EditHotel";
import Buttons from "@/components/Button";
import EditFacilityHotel from "./EditFacility";
import AddFacilityPhoto from "./AddFapho";
import AddPhoto from "./AddPhoto";

export default function hotelDetails() {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { hotelId } = router.query;
  const { hotelById } = useSelector((state: any) => state.HotelReducer);
  // const UserDetail = hotel.find((item: any) => item.hotelId == hotelId);
  const { facilities } = useSelector((state: any) => state.HotelReducer);
  // const faciDetail = facilities.find(
  //   (item: any) => item?.faciHotel?.hotelId == hotelId
  // );
  const { Title, Text } = Typography;
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [IdFaci, setFaciId] = useState();
  const [upload, setUpload] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getHotelID(hotelId));
    setRefresh(false);
  }, [hotelId]);

  const onClickEdit = (id: any) => {
    setFaciId(id);
    setEdit(true);
  };

  const onDelete = (faciId: any) => {
    dispatch(deleteFacility(faciId));
  };

  const onUpload = (id: any) => {
    setUpload(true);
    setFaciId(id);
  };

  const column = [
    {
      title: "ID",
      dataIndex: "faciId",
      key: "1",
      width: "5%",
      sorter: (a: any, b: any) => a.faciId - b.faciId,
    },
    {
      title: "Facility Name",
      dataIndex: "faciName",
      key: "1",
      width: "15%",
    },
    {
      title: "Room Number",
      dataIndex: "faciRoomNumber",
      key: "1",
      width: "10%",
    },
    {
      title: "Max Vacant",
      dataIndex: "maxVacant",
      key: "1",
      width: "10%",
      render: (text: any, record: any) => (
        <>
          {record.faciMaxNumber} {record.faciMeasureUnit}
        </>
      ),
    },
    {
      title: "Start End Date",
      dataIndex: "startenddate",
      key: "1",
      width: "10%",
      render: (text: any, record: any) => (
        <>
          {record.faciStartdate.split("T")[0]}
          <br />
          {record.faciEnddate.split("T")[0]}
        </>
      ),
    },
    {
      title: "Range Price",
      dataIndex: "rangeprice",
      key: "1",
      width: "10%",
      render: (text: any, record: any) => (
        <>
          {record.faciLowPrice}
          <br />
          {record.faciHighPrice}
        </>
      ),
    },
    {
      title: "Discount",
      dataIndex: "faciDiscount",
      key: "1",
      width: "10%",
    },
    {
      title: "Rate Price",
      dataIndex: "faciRatePrice",
      key: "1",
      width: "10%",
    },
    {
      title: "Tax",
      dataIndex: "faciTaxRate",
      key: "1",
      width: "10%",
    },
    {
      title: "Detail",
      key: "6",
      width: "15%",
      dataIndex: "faciId",

      render: (index: any) => {
        console.log(index);
        return (
          <div>
            <a>
              {" "}
              <EditOutlined onClick={() => onClickEdit(index)} />
            </a>{" "}
            <a>
              {" "}
              <DeleteOutlined onClick={() => onDelete(index)} />
            </a>{" "}
            <a>
              {" "}
              <CameraOutlined onClick={() => onUpload(index)} />
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <Dashboard>
      {upload ? (
        <AddPhoto
          id={IdFaci}
          setDisplay={setUpload}
          closeUpload={() => setUpload(false)}
          onRefresh={() => setUpload(true)}
        />
      ) : edit ? (
        <EditFacilityHotel
          id={IdFaci}
          setDisplay={setEdit}
          closeEdit={() => setEdit(false)}
          onRefresh={() => setRefresh(true)}
          htlid={hotelId}
          htlname={hotelById.hotelName}
        />
      ) : add ? (
        <AddFacilities
          setDisplay={setAdd}
          closeAdd={() => setAdd(false)}
          onRefresh={() => setRefresh(true)}
          htlid={hotelId}
          htlname={hotelById.hotelName}
        />
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/Dashboard/hotel"> Hotel</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={`/Dashboard/hotel/${hotelId}`}> Facilities</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col span={5}>
              <img
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                width={200}
                className="rounded-xl"
              />
            </Col>
            <Col span={11}>
              <Title level={3}>{hotelById?.hotelName}</Title>
              <Text type="secondary">{hotelById?.hotelAddr?.addrLine1}</Text>
              <br />
              <Text strong>{hotelById?.hotelDescription}</Text>
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                <Text>{hotelById?.hotelPhonenumber}</Text>
                <Rate disabled defaultValue={hotelById?.hotelRatingStar} />
                <p>{hotelById?.hotelRatingStar}</p>
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={5} className=" mt-6 mb-8">
                <Col span={6}>
                  <h1 className="text-xl font-medium mt-3">
                    {hotelById?.hotelName} Facilities
                  </h1>
                </Col>
                <Col></Col>
                <Col className="ml-auto">
                  <Buttons funcs={() => setAdd(true)}>Add Facilities</Buttons>
                </Col>
              </Row>
              <Table
                columns={column}
                dataSource={hotelById?.facilities}
                pagination={{ pageSize: 5 }}
              />
            </Col>
          </Row>
        </>
      )}
    </Dashboard>
  );
}
