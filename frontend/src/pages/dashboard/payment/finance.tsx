import { doUsacRequest } from "@/Redux/Action/Payment/paymentDashAction";
import { doGetHistory } from "@/Redux/Action/Payment/paymentUserAction";
import { Table, Card, Col, Row, Statistic, DatePicker, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function Finance() {
  const dispatch = useDispatch();

  const { payHistoryTrx } = useSelector(
    (state: any) => state.payTrxHistoryReducer
  );
  const data = payHistoryTrx.filter(
    (obj: any) =>
      obj.targetNumber === "13198989898" || obj.sourceNumber === "13198989898"
  );
  const user = useSelector((state: any) => state.GetUserReducer.getUser);

  const { account } = useSelector((state: any) => state.payUserAccReducer);
  useEffect(() => {
    dispatch(doGetHistory());
    dispatch(doUsacRequest(user[0]?.user_id));
  }, [user]);

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
  const { RangePicker } = DatePicker;
  const handleDateChange = (value: any, dateString: any) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    dispatch(
      doGetHistory({ startDate: dateString[0], endDate: dateString[1] })
    );
    // setDateRange(dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    dispatch(doGetHistory({ keyword: value }));
  };

  return (
    <div>
      <Row gutter={24} className="m-4 items-end">
        <Col span={4}>
          <Card hoverable className="bg-[#252525]">
            <div className="text-center">
              <h1 className="text-white font-bold mb-2">Account Number</h1>
              <p className="text-white font-semibold">
                {account[0]?.usacAccountNumber}
              </p>
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card hoverable className="bg-[#252525]">
            <div className="text-center">
              <h1 className="text-white font-bold mb-2">Balance</h1>
              <p className="text-white font-semibold">
                {parseInt(account[0]?.usacSaldo).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </Card>
        </Col>
        <Col className="ml-auto">
          <RangePicker onChange={handleDateChange} format={'DD MMM YYYY'}/>
        </Col>
        <Col>
          <Select
            placeholder="Filter By Type"
            style={{ width: 150 }}
            onChange={handleChange}
            allowClear
            options={[
              // { value: "TP", label: "Top Up" },
              { value: "TRB", label: "Transfer Booking" },
              // { value: "RPY", label: "Repayment" },
              { value: "RF", label: "Refund" },
              { value: "ORM", label: "Order Menu" },
            ]}
          />
        </Col>
      </Row>
      <Table columns={columnsTrans} dataSource={data} />
    </div>
  );
}
