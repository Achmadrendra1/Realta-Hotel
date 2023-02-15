import Dashboard from "@/layouts/dashboard";
import {
  BankOutlined,
  CheckOutlined,
  CoffeeOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Space,
  Statistic,
  Table,
  Tabs,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState, useEffect } from "react";
import AddBank from "./addBank";
import EditBank from "./editBank";
import { useDispatch, useSelector } from "react-redux";
import { doBankRequest, doTransactionRequest } from "@/Redux/Action/Payment/paymentDashAction";

interface DataType {
  key: React.Key;
  patr_trx_id: string;
  chinese: any;
  math: number;
  english: number;
}

interface DataTypePaga {
  key: React.Key;
  pagaName: string;
  pagaCode: number;
  pagaEntityId: number;
}

interface DataTypeBank {
  key: React.Key;
  bankName: string;
  bankCode: number;
  bankEntityId: number;
}

export default function index() {
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = (data:boolean) => {
    setOpenAdd(data)
  }

  const handleOk = () => {
    setTimeout(() => {
      setOpenAdd(false);
      setOpenEdit(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenAdd(false);
    setOpenEdit(false);
  };

  const editData = (id: number) => {
    setOpenEdit(true);
    setId(id);
  };

  const dispatch = useDispatch();

  const dataTrx = useSelector(
    (state: any) => state.payTrxHistoryReducer.payDashTrx
  );

  const dataBank = useSelector(
    (state:any) => state.payBankReducer.payBank
  )

  let countResto = dataTrx.filter((obj:any) => obj.patr_order_number.split('#')[0] === "MENUS").length
  let amountResto = dataTrx.filter((obj:any) => obj.patr_order_number.split('#')[0] === "MENUS")
  let totalMENUS = 0
  for (const item of amountResto) {
    totalMENUS += parseInt(item.total_amount.split(',')[0].replace(/[^0-9]/g, ''))
  }
  let totalAmountResto = totalMENUS.toLocaleString("id-ID", {style:"currency", currency:"IDR"})

  let countBooking = dataTrx.filter((obj:any) => obj.patr_order_number.split('#')[0] === "BO").length
  let amountBooking = dataTrx.filter((obj:any) => obj.patr_order_number.split('#')[0] === "BO")
  let totalAmountBO = 0
  for (const item of amountBooking) {
    totalAmountBO += parseInt(item.total_amount.split(',')[0].replace(/[^0-9]/g, ''))
  }
  let totalAmountBooking = totalAmountBO.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    dispatch(doTransactionRequest());
  }, []);
  
  useEffect(()=>{
    dispatch(doBankRequest());
  }, [])

  const columns: ColumnsType<DataTypeBank> = [
    {
      title: "ID",
      dataIndex: "bankEntityId",
    },
    {
      title: "Bank Code",
      dataIndex: "bankCode",
      sorter: {
        compare: (a, b) => a.bankCode - b.bankCode,
        multiple: 3,
      },
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      // sorter: {
      //   compare: (a, b) => a.math - b.math,
      //   multiple: 2,
      // },
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
          <DeleteOutlined className="hover:text-red-700 cursor-pointer"
          onClick={showDeleteConfirm} />
        </Space>
      ),
    },
  ];
  const columnsPaga: ColumnsType<DataTypePaga> = [
    {
      title: "ID",
      dataIndex: "pagaEntityId",
    },
    {
      title: "Payment Gateway Code",
      dataIndex: "pagaCode",
      sorter: {
        compare: (a, b) => a.pagaCode - b.pagaCode,
        multiple: 3,
      },
    },
    {
      title: "Payment Gateway Name",
      dataIndex: "pagaName",
      // sorter: {
      //   compare: (a, b) => a.pagaName - b.pagaName,
      //   multiple: 2,
      // },
    },
  ];
  const columnsTrans: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "patr_id",
    },
    {
      title: "Transaction Number",
      dataIndex: "patr_trx_id",
      sorter: {
        compare: (a, b) => (a.patr_trx_id < b.patr_trx_id ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Order Number",
      dataIndex: "patr_order_number",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Amount",
      dataIndex: "total_amount",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Trx Ref Number",
      dataIndex: "patr_trx_number_ref",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "User",
      dataIndex: "user_full_name",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
  ];

  const data: DataTypeBank[] = [
    {
      key: "1",
      bankEntityId: 1,
      bankCode: 315,
      bankName: "BCA",
    },
    {
      key: "2",
      bankEntityId: 1,
      bankCode: 316,
      bankName: "Mandiri",
    },
    {
      key: "3",
      bankEntityId: 1,
      bankCode: 317,
      bankName: "BNI",
    },
  ];

  const dataPaga: DataTypePaga[] = [
    {
      key: "1",
      pagaEntityId: 1,
      pagaCode: 354,
      pagaName: "H-Pay",
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

  return (
    <Dashboard>
      {isOpenAdd ? (
        <AddBank
          show={isOpenAdd}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {isOpenEdit ? (
        <EditBank
          show={isOpenEdit}
          clickOk={handleOk}
          clickCancel={handleCancel}
          id={id}
        />
      ) : null}
      <p className="text-xl font-bold mb-6">Payments Dashboard</p>
      <Tabs>
        <Tabs.TabPane tab="List Transaction" key={"list"}>
          <div className="">
            <Row gutter={16}>
              <Col span={18}>
                <p className="mb-4 text-lg">List Transaction</p>
                <Table
                  columns={columnsTrans}
                  dataSource={dataTrx}
                  onChange={onChange}
                />
              </Col>
              <Col span={6}>
                <Space direction="vertical">
                  <p className="mb-4 text-lg">Data Transaction</p>
                  <Card bordered={false} hoverable>
                    <Statistic
                      title="Restaurant"
                      value={countResto}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<CoffeeOutlined />}
                      suffix="Order"
                    />
                    <Statistic
                      // title="Restaurant"
                      value={totalAmountResto}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<DollarCircleOutlined />}
                    />
                  </Card>
                  <Card bordered={false} hoverable>
                    <Statistic
                      title="Booking Orders"
                      value={countBooking}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<CoffeeOutlined />}
                      suffix="Order"
                    />
                    <Statistic
                      // title="Restaurant"
                      value={totalAmountBooking}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<DollarCircleOutlined />}
                    />
                  </Card>
                </Space>
              </Col>
            </Row>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Payment Methods" key={"method"}>
        <div>
          <Row gutter={16} className="mb-4">
            <Col span={16}>
            <div className=" w-full">
            <p className=" mb-4 text-lg">Payment Gateway</p>
            <Table
              columns={columnsPaga}
              dataSource={dataPaga}
              onChange={onChange}
            />
          </div>
            </Col>
            <Col span={8} className="text-center ">
              <Statistic
                title="Total H-Pay Active"
                value={160}
                prefix={<CheckOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
            <div className=" w-full">
            <div className="flex justify-between mb-4">
              <p className="text-lg">Bank</p>
              <Button
                className="bg-blue-600 text-white"
                onClick={() => setOpenAdd(true)}
              >
                Add New Bank
              </Button>
            </div>
            <Table columns={columns} dataSource={dataBank} onChange={onChange} />
          </div>
            </Col>
            <Col span={8} className="text-center">
                 <Statistic
                title="Total Bank"
                value={160}
                prefix={<BankOutlined />}
              />
            </Col>
          </Row>
        </div>

          
        </Tabs.TabPane>
      </Tabs>
    </Dashboard>
  );
}

// <Space direction="vertical">
//         <div className=" w-full">
//           <p className=" mb-4 text-lg">Payment Gateway</p>
//           <Table columns={columnsPaga} dataSource={dataPaga} onChange={onChange} />
//         </div>
//         <Divider />
//         <div className=" w-full">
//           <div className="flex justify-between mb-4">
//             <p className="text-lg">Bank</p>
//             <Button className="bg-blue-600 text-white" onClick={()=>setOpenAdd(true)}>Add New Bank</Button>
//           </div>
//           <Table columns={columns} dataSource={data} onChange={onChange} />
//         </div>
//         </Space>
