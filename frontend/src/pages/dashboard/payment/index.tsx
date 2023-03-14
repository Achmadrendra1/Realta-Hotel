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
  DatePicker,
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
import {
  doBankRequest,
  doDeleteBank,
  doPagaRequest,
  doTransactionRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import Bank from "./bank";
import Fintech from "./fintech";
import withAuth from "@/PrivateRoute/WithAuth";
import Finance from "./finance";

interface DataType {
  key: React.Key;
  transactionNumber: any;
  trxDate: any;
  patr_order_number: any;
  debit: number;
  credit: number;
  transactionNote: any;
  orderNumber: any;
  userFullName: any;
  sourceNumber: any;
  targetNumber: any;
  transactionRef: any;
  transactionType: any;
}

export default withAuth(function index() {
  const [filteredData, setFilteredData] = useState([]);
  const { payDashTrx, total, currentPage } = useSelector(
    (state: any) => state.payTrxHistoryReducer
  );
  const user = useSelector((state: any) => state.GetUserReducer.getUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doTransactionRequest());
  }, []);

  // let countResto = dataTrx.filter(
  //   (obj: any) => obj.patr_order_number.split("#")[0] === "MENUS"
  // ).length;
  // let amountResto = dataTrx.filter(
  //   (obj: any) => obj.patr_order_number.split("#")[0] === "MENUS"
  // );
  // let totalMENUS = 0;
  // for (const item of amountResto) {
  //   totalMENUS += parseInt(
  //     item.boor_total_amount.split(",")[0].replace(/[^0-9]/g, "")
  //   );
  // }
  // let totalAmountResto = totalMENUS.toLocaleString("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // });

  // let countBooking = dataTrx.filter(
  //   (obj: any) => obj.patr_order_number.split("#")[0] === "BO"
  // ).length;
  // let amountBooking = dataTrx.filter(
  //   (obj: any) => obj.patr_order_number.split("#")[0] === "BO"
  // );
  // let totalAmountBO = 0;
  // for (const item of amountBooking) {
  //   totalAmountBO += parseInt(
  //     item.boor_total_amount.split(",")[0].replace(/[^0-9]/g, "")
  //   );
  // }
  // let totalAmountBooking = totalAmountBO.toLocaleString("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // });

  const columnsTrans: ColumnsType<DataType> = [
    {
      title: "Transaction Number",
      dataIndex: "transactionNumber",
      width: 170,
      sorter: {
        compare: (a, b) => (a.transactionNumber < b.transactionNumber ? -1 : 1),
        multiple: 1,
      },
    },
    {
      title: "Trx Date",
      dataIndex: "trxDate",
      width: 110,
      sorter: {
        compare: (a, b) => (a.trxDate < b.trxDate ? -1 : 1),
        multiple: 5,
      },
    },
    {
      title: "Debet",
      dataIndex: "debit",
      width: 110,
      sorter: {
        compare: (a, b) => (a.debit < b.debit ? -1 : 1),
        multiple: 5,
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      width: 110,
      sorter: {
        compare: (a, b) => (a.credit < b.credit ? -1 : 1),
        multiple: 5,
      },
    },
    {
      title: "Note",
      dataIndex: "transactionNote",
      width: 110,
      sorter: {
        compare: (a, b) => (a.transactionNote < b.transactionNote ? -1 : 1),
        multiple: 5,
      },
    },
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      width: 170,
      sorter: {
        compare: (a, b) => (a.orderNumber < b.orderNumber ? -1 : 1),
        multiple: 2,
      },
    },
    {
      title: "Source",
      dataIndex: "sourceNumber",
      sorter: {
        compare: (a, b) => (a.sourceNumber < b.sourceNumber ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Target",
      dataIndex: "targetNumber",
      sorter: {
        compare: (a, b) => (a.targetNumber < b.targetNumber ? -1 : 1),
        multiple: 3,
      },
    },
    {
      title: "Trx Ref Number",
      dataIndex: "transactionRef",
      sorter: {
        compare: (a, b) => (a.transactionRef < b.transactionRef ? -1 : 1),
        multiple: 4,
      },
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      sorter: {
        compare: (a, b) => (a.transactionType < b.transactionType ? -1 : 1),
        multiple: 4,
      },
    },
    {
      title: "User",
      dataIndex: "userFullName",
      sorter: {
        compare: (a, b) => (a.userFullName < b.userFullName ? -1 : 1),
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
  const { RangePicker } = DatePicker;

  // const onSearch = (value: string) => {
  //   const filteredData = dataTrx.filter((item: any) => {
  //     const values = Object.values(item).map((x: any) =>
  //       x.toString().toLowerCase()
  //     );
  //     return values.some((x) => x.includes(value.toLowerCase()));
  //   });
  //   setFilteredData(filteredData);
  // };

  const handleDateChange = (value: any, dateString: any) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    dispatch(
      doTransactionRequest({ startDate: dateString[0], endDate: dateString[1] })
    );
    // setDateRange(dateString);
  };

  const handleTableChange = (pagination: any) => {
    dispatch(doTransactionRequest({ page: pagination }));
  };

  const handleSearch = (event: any) => {
    event
      ? dispatch(doTransactionRequest({ page: 1, keyword: event.target.value }))
      : dispatch(doTransactionRequest());
  };

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
    dispatch(doTransactionRequest({ keyword: value }));
  };

  return (
    <Dashboard>
      <p className="text-xl font-bold mb-6">Payments Dashboard</p>
      <Tabs>
        <Tabs.TabPane tab="List Transaction" key={"list"}>
          <div className="flex-col">
            {/* <Row gutter={16}>
              <Col span={18}> */}
            <div className="mb-4 flex justify-between">
              <RangePicker format={"DD MMM YYYY"} onChange={handleDateChange} />
              <div>
                <Search
                  placeholder="Search"
                  onChange={handleSearch}
                  style={{ width: 200 }}
                  className="mr-2"
                />
                <Select
                  placeholder="Filter"
                  style={{ width: 150 }}
                  onChange={handleChange}
                  allowClear
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
              dataSource={payDashTrx}
              pagination={{
                current: currentPage,
                total: total,
                pageSize: 10,
                showQuickJumper: true,
                showTotal: (total) => `${total} items`,
                onChange: handleTableChange,
              }}
            />
            {/* </Col> */}
            {/* <Col span={6}>
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
            </Row> */}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bank" key={"bank"}>
          <Bank />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fintech" key={"fintech"}>
          <Fintech />
        </Tabs.TabPane>
        {user[0]?.role_name == "Finance" && (
          <Tabs.TabPane tab="Account" key={"account"}>
            <Finance />
          </Tabs.TabPane>
        )}
      </Tabs>
    </Dashboard>
  );
});
