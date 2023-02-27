import {
  doBankRequest,
  doDeleteBank,
} from "@/Redux/Action/Payment/paymentDashAction";
import {
  BankOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Table,
  Statistic,
  message,
  Modal,
  Space,
  Input,
} from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBank from "./addBank";
import EditBank from "./editBank";
import Buttons from "@/components/Button";

interface DataType {
  key: React.Key;
  bankName: string;
  bankCode: number;
  bankEntityId: number;
}

export default function Bank() {
  const dispatch = useDispatch();
  const [isOpenAddBank, setOpenAddBank] = useState(false);
  const [isOpenEditBank, setOpenEditBank] = useState(false);
  const [id, setId] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { payBank, error } = useSelector((state: any) => state.payBankReducer);
  useEffect(() => {
    dispatch(doBankRequest());
  }, []);
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

  const handleClose = (data: boolean) => {
    setOpenAddBank(data);
    setOpenEditBank(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenAddBank(false);
      setOpenEditBank(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenAddBank(false);
    setOpenEditBank(false);
  };

  const editData = (id: number) => {
    setOpenEditBank(true);
    setId(id);
  };

  const { confirm } = Modal;
  const showDeleteConfirm = (id: number, name: string) => {
    confirm({
      title: `Are you sure delete this data, Bank ${name}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(id);
        dispatch(doDeleteBank(id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  let countBank = payBank.length;
  const columnsBank: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "bankEntityId",
      sorter: {
        compare: (a, b) => a.bankEntityId - b.bankEntityId,
        multiple: 1,
      },
    },
    {
      title: "Bank Code",
      dataIndex: "bankCode",
      sorter: {
        compare: (a, b) => a.bankCode - b.bankCode,
        multiple: 2,
      },
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      sorter: {
        compare: (a, b) => (a.bankName < b.bankName ? -1 : 1),
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
            onClick={() => editData(record.bankEntityId)}
          />
          <DeleteOutlined
            className="hover:text-red-700 cursor-pointer"
            onClick={() =>
              showDeleteConfirm(record.bankEntityId, record.bankName)
            }
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

  const onSearch = (value: string) => {
    const filteredData = payBank.filter((item: any) => {
      const values = Object.values(item).map((x: any) =>
        x.toString().toLowerCase()
      );
      return values.some((x) => x.includes(value.toLowerCase()));
    });
    setFilteredData(filteredData);
  };

  const tableData = filteredData.length > 0 ? filteredData : payBank;

  const { Search } = Input;
  return (
    <div>
      {contextHolder}
      {isOpenAddBank ? (
        <AddBank
          show={isOpenAddBank}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {isOpenEditBank ? (
        <EditBank
          show={isOpenEditBank}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          id={id}
          data={payBank}
        />
      ) : null}

      <Row gutter={16}>
        <Col span={16}>
          <div className=" w-full">
            <div className="flex-col">
              <div className="flex justify-between mb-4">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
                <Buttons funcs={() => setOpenAddBank(true)}>
                Add New Bank
              </Buttons>
              </div>
              <Table
                columns={columnsBank}
                dataSource={tableData}
                onChange={onChange}
              />
            </div>
          </div>
        </Col>
        <Col span={8} className="text-center">
          <Statistic
            title="Total Bank"
            value={countBank}
            prefix={<BankOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
}
