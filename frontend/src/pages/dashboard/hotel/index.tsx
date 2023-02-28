import { deleteHotel, getHotel } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import Dashboard from "@/layouts/dashboard";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Input, List, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddHotelsRealta from "./AddHotel";
import { useRouter } from "next/router";
import Link from "next/link";
import EditHotelRealta from "./EditHotel";

export default function index() {
  const dispatch: any = useDispatch();
  const { hotel } = useSelector((state: any) => state.HotelReducer);
  const { Search } = Input;
  const [add, setAdd] = useState(false);
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getHotel());
  }, []);
  const handleRefresh = () => {
    setRefresh(true);
  };

  const onClick = (id: any) => {
    setEdit(true);
    setId(id);
  };

  const onDelete = (hotelId: any) => {
    console.log(hotelId);

    dispatch(deleteHotel(hotelId));
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
              <EditOutlined onClick={() => onClick(index)} />
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
          <a href="/dashboard/">Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/dashboard/hotel">Hotel</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      {edit ? (
        <EditHotelRealta
          id={id}
          setDisplay={setEdit}
          closeEdit={() => setEdit(false)}
          setRefresh={handleRefresh}
          htlname={hotel.hotelName}
        />
      ) : add ? (
        <AddHotelsRealta
          setDisplay={setAdd}
          closeAdd={() => setAdd(false)}
          onRefresh={() => setRefresh(true)}
        />
      ) : (
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
                <Buttons funcs={() => setAdd(true)}>
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
      )}
    </Dashboard>
  );
}
