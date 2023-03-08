import { deleteHotel, getHotel } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import Dashboard from "@/layouts/dashboard";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Input, List, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddHotelsRealta from "./AddHotel";
import { useRouter } from "next/router";
import Link from "next/link";
import EditHotelRealta from "./EditHotel";
import withAuth from "@/PrivateRoute/WithAuth";

export default withAuth(function index() {
  const dispatch: any = useDispatch();
  const { hotel } = useSelector((state: any) => state.HotelReducer);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const { Search } = Input;
  const {confirm} = Modal;

  useEffect(() => {
    dispatch(getHotel());
  }, []);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const handleClose = (data: boolean) => {
    setOpenAdd(data);
    setOpenEdit(data);
  }

  const handleOk = () => {
    setTimeout(() => {
      setOpenAdd(false);
      setOpenEdit(false);
    }, 2000);
  }

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  }

  const editHotel = (id: any) => {
    setOpenEdit(true);
    setId(id);
  };

  const onDelete = (hotelId: any) => {
    confirm({
      title: 'Are you sure you want to delete this Hotel?',
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteHotel(hotelId));
      },
      onCancel() {
        console.log(
          "Cancel"
        );
      }
    })    
  };

  const column = [
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "1",
      width: "15%",
      sorter: (a: any, b: any) => a.hotelName?.localeCompare(b.hotelName),
      sortDirections: ["descend", "ascending"],
    },
    {
      title: "Hotel Address",
      dataIndex: ["hotelAddr", "addrLine1"],
      key: "2",
      width: "15%",
    },
    {
      title: "City",
      dataIndex: ["hotelAddr", "addrLine2"],
      key: "3",
      width: "10%",
    },
    {
      title: "Hotel Description",
      dataIndex: "hotelDescription",
      key: "4",
      width: "30%",
    },
    {
      title: "Rating",
      dataIndex: "hotelRatingStar",
      key: "5",
      width: "5%",
    },
    {
      title: "Detail",
      key: "6",
      width: "7%",
      dataIndex: "hotelId",

      render: (index: any) => {
        return (
          <div>
            <a>
              {" "}
              <Link href={`hotel/${index}`}>
                <EyeOutlined />
              </Link>
            </a>{" "}
            <a>
              {" "}
              <EditOutlined onClick={() => editHotel(index)} />
            </a>{" "}
            <a>
              <DeleteOutlined onClick={() => onDelete(index)} />
            </a>
          </div>
        );
      },
    },
  ];

  const [queryHotel, setQueryHotel] = useState("");
  const handleSearchHotel = (e: any) => {
    const input = e.target.value.toLowerCase().replace(/\s/g, "");
    setQueryHotel(input);
  };
  const searchResultsHotel = hotel.filter(
    (item: any) =>
      item?.hotelName?.toLowerCase().replace(/\s/g, "").includes(queryHotel) ||
      item?.hotelAddr?.addrLine2?.toLowerCase().replace(/\s/g, "").includes(queryHotel)
  );

  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/hotel">Hotel</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      
      {OpenAdd ?
        <AddHotelsRealta
          showAdd={OpenAdd}
          okAdd = {handleOk}
          cancelAdd={handleCancel}
          handleClose={handleClose}
          onRefresh={() => setRefresh(true)}
        />
       : null }
      
      {OpenEdit ? 
        <EditHotelRealta
          id={id}
          showEdit={OpenEdit}
          okEdit = {handleOk}
          cancelEdit={handleCancel}
          handleClose={handleClose}
          onRefresh={() => setRefresh(true)}
          htlname={hotel.hotelName}
        />
       : null }

        <Row gutter={16}>
          <Col span={24}>
            <h1 className="text-xl font-medium">Realta Hotel</h1>
            <Row gutter={5} className=" mt-6 mb-8">
              <Col span={6}>
                <Search
                  placeholder="input search text"
                  allowClear
                  style={{ width: 200 }}
                  onChange={handleSearchHotel}
                />
              </Col>
              <Col></Col>
              <Col className="ml-auto">
                <Buttons funcs={() => setOpenAdd(true)}>
                  Add <UserAddOutlined />
                </Buttons>
              </Col>
            </Row>
            <Table
              columns={column}
              dataSource={searchResultsHotel}
              pagination={{ pageSize: 5 }}
            />
          </Col>
        </Row>
    </Dashboard>
  );
}
)