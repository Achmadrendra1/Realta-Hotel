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
  Input,
  message,
  Modal,
  Row,
  Select,
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
import { doBankRequest, doDeleteBank, doPagaRequest, doTransactionRequest, doUsacRequest } from "@/Redux/Action/Payment/paymentDashAction";
import Bank from "./bank";
import Fintech from "./fintech";

interface DataType {
  key: React.Key;
  patr_id : number;
  patr_trx_id: string;
  patr_order_number: any;
  total_amount: number;
  patr_trx_: number;
  patr_trx_number_ref : any;
  user_full_name:string
}


export default function index() {  
  const [filteredData, setFilteredData] = useState([]);
  const dataTrx = useSelector(
    (state: any) => state.payTrxHistoryReducer.payDashTrx
  );


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doTransactionRequest());
  }, []);
  

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

 

  const columnsTrans: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "patr_id",
      sorter: {
        compare: (a, b) => a.patr_id - b.patr_id,
        multiple: 1,
      },
    },
    {
      title: "Transaction Number",
      dataIndex: "patr_trx_id",
      sorter: {
        compare: (a, b) => (a.patr_trx_id < b.patr_trx_id ? -1 : 1),
        multiple: 2,
      },
    },
    {
      title: "Order Number",
      dataIndex: "patr_order_number",
      sorter: {
        compare: (a, b) => (a.patr_order_number < b.patr_order_number ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Amount",
      dataIndex: "total_amount",
      sorter: {
        compare: (a, b) => (a.total_amount < b.total_amount ? -1 : 1),
        multiple: 4,
      },
    },
    {
      title: "Trx Ref Number",
      dataIndex: "patr_trx_number_ref",
      sorter: {
        compare: (a, b) => (a.patr_trx_number_ref < b.patr_trx_number_ref ? -1 : 1),
        multiple: 5,
      },
    },
    {
      title: "User",
      dataIndex: "user_full_name",
      sorter: {
        compare: (a, b) => (a.user_full_name < b.user_full_name ? -1 : 1),
        multiple: 6,
      },
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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    const data = dataTrx.filter((obj:any) => obj.patr_trx_id.split('#')[0] === value)
    setFilteredData(data)
  };

  const onSearch = (value: string) => {
    const filteredData = dataTrx.filter((item:any) => {
      const values = Object.values(item).map((x:any) =>
        x.toString().toLowerCase()
      );
      return values.some(x => x.includes(value.toLowerCase()));
    });
    setFilteredData(filteredData)
  };
  const tableData = filteredData.length > 0 ? filteredData : dataTrx;

  return (
    <Dashboard>
   
      <p className="text-xl font-bold mb-6">Payments Dashboard</p>
      <Tabs>
        <Tabs.TabPane tab="List Transaction" key={"list"}>
          <div className="flex-col">
            <Row gutter={16}>
              <Col span={18}>
                <div className="mb-4 flex justify-between">
                <p className="mb-4 text-lg">List Transaction</p>
                <div>
                <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} className="mr-2"/>
                  <Select
                     placeholder="Filter"
                    style={{ width: 150 }}
                    onChange={handleChange}
                    options={[
                      // { value: "TP", label: "Top Up" },
                      { value: "TRB", label: "Transfer Booking" },
                      // { value: "RPY", label: "Repayment" },
                      // { value: "RF", label: "Refund" },
                      { value: "ORM", label: "Order Menu" },
                      
                    ]}
                  />
                </div>
                </div>
                <Table
                  columns={columnsTrans}
                  dataSource={tableData}
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
                      prefix={<CoffeeOutlined />}
                      suffix="Order"
                    />
                    <Statistic
                      value={totalAmountResto}
                      valueStyle={{ color: "blue" }}
                      prefix={<DollarCircleOutlined />}
                    />
                  </Card>
                  <Card bordered={false} hoverable>
                    <Statistic
                      title="Booking Orders"
                      value={countBooking}
                      prefix={<CoffeeOutlined />}
                      suffix="Order"
                    />
                    <Statistic
                      value={totalAmountBooking}
                      valueStyle={{ color: "green" }}
                      prefix={<DollarCircleOutlined />}
                    />
                  </Card>
                </Space>
              </Col>
            </Row>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bank" key={"bank"}>
            <Bank />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fintech" key={'fintech'}>
         <Fintech />
        </Tabs.TabPane>
      </Tabs>
    </Dashboard>
  );
}