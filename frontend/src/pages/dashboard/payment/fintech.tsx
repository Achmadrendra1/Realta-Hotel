import {
  doDeleteBank,
  doPagaDelete,
  doPagaRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Button,
  Table,
  Statistic,
  Input,
  Space,
  TableProps,
  Modal,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFintech from "./addFintech";
import Buttons from "@/components/Button";
import EditFintech from "./editFintech";

interface DataType {
  key: React.Key;
  pagaName: string;
  pagaCode: number;
  pagaEntityId: number;
}
export default function Fintech() {
  const dispatch = useDispatch();
  const [isOpenAddFin, setOpenAddFin] = useState(false);
  const [isOpenEditFin, setOpenEditFin] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [id, setId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const { payPaga, error } = useSelector((state: any) => state.payPagaReducer);
  const { account } = useSelector((state: any) => state.payUserAccReducer);

  let countAccount = account.filter((obj:any) => obj.usacType === 'Payment').length;
  const handleClose = (data: boolean) => {
    setOpenAddFin(data);
    setOpenEditFin(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenAddFin(false);
      setOpenEditFin(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenAddFin(false);
    setOpenEditFin(false);
  };

  const editData = (id: number) => {
    setOpenEditFin(true);
    setId(id);
  };
  useEffect(() => {
    dispatch(doPagaRequest());
  }, []);
  
  useEffect(()=>{
    dispatch(doUsacRequest());
  }, [])

  useEffect(() => {
    if (error !== null) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.error(error, 2));
    }
  }, [error]);

  const { confirm } = Modal;
  const showDeleteConfirm = (id: number, name: string) => {
    confirm({
      title: `Are you sure delete this data, Fintech ${name}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(id);
        dispatch(doPagaDelete(id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const columnsPaga: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "pagaEntityId",
      sorter: {
        compare: (a, b) => (a.pagaEntityId - b.pagaEntityId ? -1 : 1),
        multiple: 1,
      },
    },
    {
      title: "Payment Gateway Code",
      dataIndex: "pagaCode",
      sorter: {
        compare: (a, b) => (a.pagaCode - b.pagaCode ? -1 : 1),
        multiple: 2,
      },
    },
    {
      title: "Payment Gateway Name",
      dataIndex: "pagaName",
      sorter: {
        compare: (a, b) => (a.pagaName < b.pagaName ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <EditOutlined
            className="hover:text-blue-700 cursor-pointer"
            onClick={() => editData(record.pagaEntityId)}
          />
          <DeleteOutlined
            className="hover:text-red-700 cursor-pointer"
            onClick={() => showDeleteConfirm(record.pagaEntityId, record.pagaName)}
          />
        </Space>
      ),
    },
  ];
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const { Search } = Input;
  
  const onSearch = (value: string) => {
    const filteredData = payPaga.filter((item: any) => {
      const values = Object.values(item).map((x: any) =>
        x.toString().toLowerCase()
      );
      return values.some((x) => x.includes(value.toLowerCase()));
    });
    setFilteredData(filteredData);
  };

  const tableData = filteredData.length > 0 ? filteredData : payPaga;

  return (
    <div>
      {contextHolder}
      {isOpenAddFin ? (
        <AddFintech
          show={isOpenAddFin}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}

      {isOpenEditFin ? (
        <EditFintech
          show={isOpenEditFin}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          id={id}
          data={payPaga}
        />
      ) : null}
      <Row gutter={16} className="mb-4">
        <Col span={16}>
          <div className=" w-full">
            <div className="flex-col">
              <div className="flex justify-between mb-4">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
                <Buttons funcs={() => setOpenAddFin(true)}>
                  Add New Fintech
                </Buttons>
              </div>
              <Table
                columns={columnsPaga}
                dataSource={tableData}
                onChange={onChange}
              />
            </div>
          </div>
        </Col>
        <Col span={8} className="text-center ">
          <Statistic
            title="Total H-Pay Active"
            value={countAccount}
            prefix={<CheckOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
}
