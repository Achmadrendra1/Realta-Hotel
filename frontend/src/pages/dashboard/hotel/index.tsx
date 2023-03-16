import { deleteHotel, getHotel } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import Dashboard from "@/layouts/dashboard";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  HomeOutlined,
  SearchOutlined,
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
  const { hotel, currentPage, total } = useSelector(
    (state: any) => state.HotelReducer
  );
  const [OpenAdd, setOpenAdd] = useState(false);
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { Search } = Input;
  const { confirm } = Modal;

  // const filterData = hotel.filter((item: any) => {
  //   if (search === "") {
  //     return item;
  //   } else {
  //     return (
  //       item.hotelName.toLowerCase().includes(search.toLocaleLowerCase()) ||
  //       item.hotelAddr?.addrLine2
  //         .toLowerCase()
  //         .includes(search.toLocaleLowerCase())
  //     );
  //   }
  // });

  useEffect(() => {
    dispatch(getHotel());
  }, []);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const handleClose = (data: boolean) => {
    setOpenAdd(data);
    setOpenEdit(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenAdd(false);
      setOpenEdit(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };

  const editHotel = (id: any) => {
    setOpenEdit(true);
    setId(id);
  };

  const onDelete = (hotelId: any) => {
    confirm({
      title: "Are you sure you want to delete this Hotel?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteHotel(hotelId));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  useEffect(() => {
    if (hotel?.length === 0 && currentPage > 1) {
      dispatch(getHotel({ page: currentPage - 1 }));
    }
  }, [total]);

  const column = [
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "1",
      width: "15%",
      sorter:{
        compare: (a:any,b:any)=> (a.hotelName < b.hotelName ? -1 : 1)
      }
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
      sorter:{
        compare: (a:any,b:any)=> (a.hotelAddr.addrLine2 < b.hotelAddr.addrLine2 ? -1 : 1)
      }
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
                <EyeOutlined className="text-blue-400" />
              </Link>
            </a>{" "}
            <a>
              {" "}
              <EditOutlined
                style={{ color: "#13c2c2" }}
                onClick={() => editHotel(index)}
              />
            </a>{" "}
            <a>
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => onDelete(index)}
              />
            </a>
          </div>
        );
      },
    },
  ];

  const handleTableChange = (pagination: any) => {
    dispatch(getHotel({ page: pagination }));
  };

  const handleSearch = (event: any) => {
    event
      ? dispatch(getHotel({ page: 1, keyword: event.target.value }))
      : dispatch(getHotel());
  };

  return (
    <Dashboard>
      <Link href={'/dashboard'}><HomeOutlined /></Link>

      {OpenAdd ? (
        <AddHotelsRealta
          showAdd={OpenAdd}
          okAdd={handleOk}
          cancelAdd={handleCancel}
          handleClose={handleClose}
          onRefresh={() => setRefresh(true)}
        />
      ) : null}

      {OpenEdit ? (
        <EditHotelRealta
          id={id}
          showEdit={OpenEdit}
          okEdit={handleOk}
          cancelEdit={handleCancel}
          handleClose={handleClose}
          onRefresh={() => setRefresh(true)}
          htlname={hotel.hotelName}
        />
      ) : null}

      <Row gutter={16}>
        <Col span={24}>
          <h1 className="text-xl font-medium">Realta Hotel</h1>
          <Row gutter={5} className=" mt-6 mb-8">
            <Col span={6}>
              <Search
                placeholder="Search"
                onChange={handleSearch}
                style={{ width: 200 }}
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
            dataSource={hotel}
            pagination={{
              current: currentPage,
              total: total,
              pageSize: 10,
              onChange: handleTableChange,
            }}
          />
        </Col>
      </Row>
    </Dashboard>
  );
});
