import { getSpInvoice } from "@/Redux/Action/Booking/BookingAction";
import Buttons from "@/components/Button";
import { LeftCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { Col, Divider, QRCode, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

export default function index() {
  let root = useRouter();
  const { id } = root.query;
  const dispatch = useDispatch();

  const invoiceView = useSelector(
    (state: any) => state.BoorInvoiceReducer.invoice
  );

  useEffect(() => {
    dispatch(getSpInvoice());
  }, []);

  const Invoice = invoiceView.filter(
    (item: any) => item.boor_order_number === id
  );

  console.log(Invoice.prit_name)

  const boor_order_number = Invoice?.length > 0 ? Invoice[0].boor_order_number : "";
  const boor_order_date = Invoice?.length > 0 ? Invoice[0].boor_order_date : "";
  const boor_is_paid = Invoice?.length > 0 ? Invoice[0]?.boor_paid : "";
  const boor_pay_type = Invoice?.length > 0 ? Invoice[0]?.payment_Type : "" ;
  const user_full_name = Invoice?.length > 0 ? Invoice[0].user_full_name : "";
  const user_phone_number = Invoice?.length > 0 ? Invoice[0].user_phone_number : "";
  const user_email = Invoice?.length > 0 ? Invoice[0].user_email : "";
  const usme_memb_name = Invoice?.length > 0 ? Invoice[0].usme_memb_name : "";
  const usme_promote_date = Invoice?.length > 0 ? Invoice[0].usme_promote_date : "";
  const usme_points = Invoice?.length > 0 ? Invoice[0].usme_points : 0;
  const faci_name = Invoice?.length > 0 ? Invoice[0].faci_name : "";
  const boor_total_room = Invoice?.length > 0 ? Invoice[0].boor_total_room : 0;
  const boor_total_amount = Invoice?.length > 0 ? Invoice[0].boor_total_amount : 0;
  const borde_adults = Invoice?.length > 0 ? Invoice[0].borde_adults : 0;
  const borde_kids = Invoice?.length > 0 ? Invoice[0].borde_kids : 0;
  const borde_price = Invoice?.length > 0 ? Invoice[0].borde_price : "";
  const borde_discount = Invoice?.length > 0 ? Invoice[0].borde_discount : "";
  const borde_subtotal = Invoice?.length > 0 ? Invoice[0].borde_subtotal : "";
  const inv_number = Invoice?.length > 0 ? Invoice[0].patr_trx_id : "";
  const inv_date = Invoice?.length > 0 ? Invoice[0].patr_modified_date : "";
  const borde_checkin = Invoice?.length > 0 ? Invoice[0].check_in_date : "";
  const borde_checkout = Invoice?.length > 0 ? Invoice[0].check_out_date : "";

  const checkin = new Date(borde_checkin)
  const checkout = new Date(borde_checkout)
  const numberCheckin = checkin.getDate();
  const numberCheckout = checkout.getDate()
  const nights = numberCheckout - numberCheckin
  const days = nights + 1

  const [getInvoice, setGetinvoice] = useState({
    boor_order_number: "",
    boor_order_date: "",
    invoice_number: "",
    invoice_date: "",
    boor_is_paid: "",
    boor_pay_type: "",
    user_full_name: "",
    user_phone_number: "",
    usme_memb_name: "",
    usme_promote_date: "",
    usme_points: 0,
    faci_name: "",
    boor_total_room: 0,
    boor_total_amount : 0,
    borde_adults: 0,
    borde_kids: 0,
    borde_price: "",
    borde_discount: "",
    borde_subtotal: "",
    prit_name : "",
    boex_price : "",
    boex_qty : 0,
    boex_subtotal : ""
  });

  useEffect(() => {
    setGetinvoice({
      ...getInvoice,
      boor_order_number: boor_order_number,
      boor_order_date: boor_order_date,
      boor_is_paid: boor_is_paid,
      boor_pay_type: boor_pay_type,
      user_full_name: user_full_name,
      user_phone_number: user_phone_number,
      usme_memb_name: usme_memb_name,
      usme_promote_date: usme_promote_date,
      usme_points: usme_points,
      faci_name: faci_name,
      boor_total_room: boor_total_room,
      boor_total_amount : boor_total_amount,
      borde_adults: borde_adults,
      borde_kids: borde_kids,
      borde_price: borde_price,
      borde_discount: borde_discount,
      borde_subtotal: borde_subtotal,
      invoice_number: inv_number,
      invoice_date: inv_date,
      prit_name : Invoice.prit_name,
      boex_price : Invoice.boex_price,
      boex_qty : Invoice.boex_qty,
      boex_subtotal : Invoice.boex_subtotal
    });
  }, [boor_order_number]);

  // console.log(getInvoice);

  const email = user_email
  const body = `Berikut adalah Kode Booking Anda : http://localhost:3000/${root.asPath}`
  const componentRef = React.useRef(null);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?body=${(body)}`;
  };

  //Array Object untuk title and field
  const invoice1 = [
    {
      title: "Booking Order", //
      field: getInvoice.boor_order_number,
    },
    {
      title: "Order Date", //
      field: getInvoice.boor_order_date?.split("T")[0],
    },
    {
      title: "Invoice Number", //
      field: getInvoice.invoice_number,
    },
    {
      title: "Invoice Date",
      field: getInvoice.invoice_date?.split("T")[0],
    },
    {
      title: "Status",
      field: getInvoice.boor_is_paid,
    },
    {
      title: "Payment Type",
      field: getInvoice.boor_pay_type == null ? "Cash" : getInvoice.boor_pay_type,
    },
  ];

  const invoice2 = [
    {
      title: "Full Name",
      field: getInvoice.user_full_name,
    },
    {
      title: "Contact Number",
      field: getInvoice.user_phone_number,
    },
    {
      title: "Member",
      field: getInvoice.usme_memb_name,
    },
    {
      title: "Member Date",
      field: getInvoice.usme_promote_date?.split("T")[0],
    },
    {
      title: "Remaining Points",
      field: getInvoice.usme_points,
    },
  ];

  return (
    <>
      <div className="px-6 pt-4 flex justify-between">
        <Link href={"/users#history"} className="text-xl mb-5">
          <LeftCircleOutlined /> Kembali
        </Link>
        <div className="mr-12 flex justify-end">
          <ReactToPrint
            trigger={() => (
              <div className="mr-2">
                <Buttons funcs={() => ""}>Print</Buttons>
              </div>
            )}
            content={() => componentRef.current}
          />
          <div>
            <Buttons funcs={handleEmailClick}>Send To Email</Buttons>
          </div>
        </div>
      </div>

      <div id="invoice" ref={componentRef} className="py-6">
        <div className=" w-11/12 shadow-lg m-auto p-4">
          <h1 className="text-2xl mb-3 font-bold">Invoice {id}</h1>

          <Row>
            {invoice1.map((item: any, index: any) => (
              <Col span={4} key={index}>
                <p className="text-lg font-semibold mb-1">{item.title}</p>
                <p className="text-md">{item.field}</p>
              </Col>
            ))}
          </Row>
          <Divider dashed style={{ borderColor: "black" }} />

          <h1 className="text-2xl mb-3 font-bold">Customer </h1>

          <Row>
            {invoice2.map((item: any, index: any) => (
              <Col span={4} key={index}>
                <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                <h3 className="text-md">{item.field}</h3>
              </Col>
            ))}
          </Row>
          <Divider dashed style={{ borderColor: "black" }} />

          <h1 className="text-2xl mb-3 font-bold">Billing </h1>

          <Row className="flex">
            <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Facilities</h2>
                <h3 className="text-md">{getInvoice.faci_name}</h3>
              </div>
            </Col>
            <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Total Nights</h2>
                <h3 className="text-md">
                  {days} Days {nights} Nights
                </h3>
              </div>
            </Col>
            <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Qty</h2>
                <h3 className="text-md">{getInvoice.boor_total_room}</h3>
              </div>
            </Col>
            {/* <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Total Guests</h2>
                <h3 className="text-md">
                  {getInvoice.borde_adults} Adults {getInvoice.borde_kids} Kids
                </h3>
              </div>
            </Col> */}
            <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Price</h2>
                <h3 className="text-md">{getInvoice.borde_price}</h3>
              </div>
            </Col>
            <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Discount</h2>
                <h3 className="text-md">{getInvoice.borde_discount}</h3>
              </div>
            </Col>
            <Col span={4} className="flex">
              <div>
                <h2 className="text-lg font-semibold mb-1">Sub Total</h2>
                <h3 className="text-md">{getInvoice.borde_subtotal}</h3>
              </div>
            </Col>
          </Row>
          {
            Invoice &&
            Invoice.map((items : any)=>{
              return (
                <Row className="flex">
                  <Col span={4} className="flex">
                    <div>
                      <h3 className="text-md">{items.prit_name}</h3>
                    </div>
                  </Col>
                  <Col span={4} className="flex">
                  </Col>
                  <Col span={4} className="flex">
                    <div>
                      <h3 className="text-md">{items.boex_qty}</h3>
                    </div>
                  </Col>
                  <Col span={4} className="flex">
                    <div>
                      <h3 className="text-md">{items.boex_price}</h3>
                    </div>
                  </Col>
                  <Col span={4} className="flex">
                  </Col>
                  <Col span={4} className="flex">
                    <div>
                      <h3 className="text-md">{items.boex_subtotal}</h3>
                    </div>
                  </Col>
              </Row>
              )
            })
          }
          <Divider dashed style={{ borderColor: "black" }} />
          <div className="w-10/12 flex justify-between items-center">
            <QRCode value={`http://localhost:3000/${root.asPath}`} size={96} className="ml-14" />
            <div className="w-1/4">
              <div className="flex justify-between min-w-[350px]">
                <h2 className="flex text-lg font-semibold mb-1 mr-5">
                  Total Amount
                </h2>
                <h2 className="flex text-lg font-semibold mb-1">
                  {getInvoice.boor_total_amount}
                </h2>
              </div>
              <div className="flex justify-between min-w-[350px]">
                <h2 className="flex text-lg font-semibold mb-1 mr-5">
                  Payment Amount
                </h2>
                <h2 className="flex text-lg font-semibold mb-1">
                  {getInvoice.boor_total_amount}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
