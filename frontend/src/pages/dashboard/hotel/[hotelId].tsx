import {
  deleteFacility,
  getFacility,
  getFacilityID,
  getHotelID,
} from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import Dashboard from "@/layouts/dashboard";
import {
  ArrowLeftOutlined,
  ArrowLeftOutlined,
  CameraOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Carousel,
  Col,
  Image,
  Modal,
  Rate,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import {
  Breadcrumb,
  Carousel,
  Col,
  Image,
  Modal,
  Rate,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFacilities from "./AddFacility";
import EditFacilityHotel from "./EditFacility";
import AddPhoto from "./AddPhoto";
import withAuth from "@/PrivateRoute/WithAuth";
import Link from "next/link";
import { configuration } from "@/Redux/Configs/url";

export default withAuth(function HotelDetails() {
  const dispatch = useDispatch();
  const { hotelById } = useSelector((state: any) => state.HotelReducer);
  const { facilities } = useSelector((state: any) => state.HotelReducer);
  const [IdFaci, setFaciId] = useState();
  const [OpenAdd, setOpenAdd] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenUpload, setOpenUpload] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const { hotelId } = router.query;
  const { Title, Text } = Typography;
  const rating = hotelById?.hotelRatingStar;
  const { confirm } = Modal;

  useEffect(() => {
    dispatch(getHotelID(hotelId));
    // dispatch(getFacility());
    setRefresh(false);
  }, [hotelId]);

  const handleClose = (data: boolean) => {
    setOpenAdd(data);
    setOpenEdit(data);
    setOpenUpload(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenAdd(false);
      setOpenEdit(false);
      setOpenUpload(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenUpload(false);
  };

  const onClickEdit = (id: any) => {
    setFaciId(id);
    setOpenEdit(true);
  };

  const onDelete = (faciId: any) => {
    confirm({
      title: "Are you sure you want to delete this Facilities?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteFacility(faciId));
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const onUpload = (id: any) => {
    setOpenUpload(true);
    setFaciId(id);
  };

  const column = [
    {
      title: "Photo",
      dataIndex: ["facilityPhotos", "faphoPhotoFilename"],
      dataIndex: ["facilityPhotos", "faphoPhotoFilename"],
      key: "1",
      width: "10%",
      render: (_: any, record: any) => {
        let foto = record?.facilityPhotos
          ?.filter((item: any) => item.faphoPrimary === true)
          .map((items: any) => items.faphoPhotoFilename);
          // console.log(foto);
          

        return (
          <Image
            src={`${configuration.BASE_URL}/facility-photos/${foto[0]}`}
            alt={`${foto}`}
          />
        );
      },
        );
      },
    },
    {
      title: "Facility Name",
      dataIndex: "faciName",
      key: "1",
      width: "15%",
      sorter: {
        compare: (a: any, b: any) => (a.faciName < b.faciName ? -1 : 1),
      },
    },
    {
      title: "Room Number",
      dataIndex: "faciRoomNumber",
      key: "1",
      width: "10%",
      sorter: {
        compare: (a: any, b: any) =>
          a.faciRoomNumber < b.faciRoomNumber ? -1 : 1,
      },
    },
    {
      title: "Max Vacant",
      dataIndex: "maxVacant",
      key: "1",
      width: "5%",
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
        return (
          <div>
            <a>
              {" "}
              <EditOutlined
                style={{ color: "#13c2c2" }}
                onClick={() => onClickEdit(index)}
              />
            </a>{" "}
            <a>
              {" "}
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => onDelete(index)}
              />
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
      {OpenUpload ? (
        <AddPhoto
          id={IdFaci}
          showUpload={OpenUpload}
          okUpload={handleOk}
          cancelUpload={handleCancel}
          handleClose={handleClose}
          onRefresh={() => setRefresh(true)}
        />
      ) : null}

      {OpenEdit ? (
        <EditFacilityHotel
          id={IdFaci}
          showEdit={OpenEdit}
          okEdit={handleOk}
          cancelEdit={handleCancel}
          handleClose={handleClose}
          htlid={hotelId}
          htlname={hotelById.hotelName}
        />
      ) : null}
      {OpenAdd ? (
        <AddFacilities
          showAdd={OpenAdd}
          okAdd={handleOk}
          cancelAdd={handleCancel}
          handleClose={handleClose}
          htlid={hotelId}
          htlname={hotelById.hotelName}
        />
      ) : null}
      <Link href={"/dashboard/hotel"}>
        <ArrowLeftOutlined /> Back
      </Link>
      <Link href={"/dashboard/hotel"}>
        <ArrowLeftOutlined /> Back
      </Link>

      <Row gutter={24}>
        <Col span={5}>
          <Carousel autoplay autoplaySpeed={2500}>
            {hotelById?.facilities?.map((item: any) =>
              item.facilityPhotos.map((items: any) => (
                <>
                  <Image
                    src={`${configuration.BASE_URL}/facility-photos/${items.faphoPhotoFilename}`}
                    alt={`${items.faphoPhotoFilename}`}
                  />
                </>
              ))
            )}
          </Carousel>
        </Col>
        <Col span={11}>
          <Title level={3}>{hotelById?.hotelName}</Title>
          <Text type="secondary">{hotelById?.hotelAddr?.addrLine1}</Text>
          <br />
          <Text strong>{hotelById?.hotelDescription}</Text>
        </Col>
        <Col span={8}>
          <Space direction="vertical">
            <Rate defaultValue={rating} disabled />
            <Text>{hotelById?.hotelPhonenumber}</Text>
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
              <Buttons funcs={() => setOpenAdd(true)}>Add Facilities</Buttons>
            </Col>
          </Row>
          <Table
            columns={column}
            dataSource={hotelById?.facilities}
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </Dashboard>
  );
});
