import withAuth from "@/PrivateRoute/WithAuth";
import { getSpInvoice } from "@/Redux/Action/Booking/BookingAction";
import { Card, List } from "antd";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { CgLayoutGrid } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

export default withAuth(function UserHistory() {
    let root = useRouter();
    const { id } = root.query || {};
    const dispatch = useDispatch();
    const invoiceView = useSelector(
        (state: any) => state.BoorInvoiceReducer.invoice
      );
    
      // console.log(invoiceView);
    
      useEffect(() => {
        dispatch(getSpInvoice());
      }, []);
    
      const Invoice = invoiceView?.filter(
        (item: any) => item.boor_order_number == id
      );

      console.log(Invoice);

      const boor_order_number =
      Invoice?.length > 0 ? Invoice[0].boor_order_number : "";
    const boor_order_date = Invoice?.length > 0 ? Invoice[0].boor_order_date : "";
    const boor_is_paid = Invoice[0]?.boor_is_paid;
    const boor_pay_type = Invoice?.length > 0 ? Invoice[0].boor_pay_type : "";
    const user_full_name = Invoice?.length > 0 ? Invoice[0].user_full_name : "";
    const user_phone_number =
      Invoice?.length > 0 ? Invoice[0].user_phone_number : "";
    const usme_memb_name = Invoice?.length > 0 ? Invoice[0].usme_memb_name : "";
    const usme_promote_date =
      Invoice?.length > 0 ? Invoice[0].usme_promote_date : "";
    const usme_points = Invoice?.length > 0 ? Invoice[0].usme_points : 0;
    const faci_name = Invoice?.length > 0 ? Invoice[0].faci_name : "";
    const boor_total_room = Invoice?.length > 0 ? Invoice[0].boor_total_room : 0;
    const borde_adults = Invoice?.length > 0 ? Invoice[0].borde_adults : 0;
    const borde_kids = Invoice?.length > 0 ? Invoice[0].borde_kids : 0;
    const borde_price = Invoice?.length > 0 ? Invoice[0].borde_price : "";
    const borde_discount = Invoice?.length > 0 ? Invoice[0].borde_discount : "";
    const borde_subtotal = Invoice?.length > 0 ? Invoice[0].borde_subtotal : "";
    const inv_number = Invoice?.length > 0 ? Invoice[0].patr_trx_id : "";
    const inv_date = Invoice?.length > 0 ? Invoice[0].patr_modified_date : "";
    
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
        borde_adults: 0,
        borde_kids: 0,
        borde_price: "",
        borde_discount: "",
        borde_subtotal: "",
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
          borde_adults: borde_adults,
          borde_kids: borde_kids,
          borde_price: borde_price,
          borde_discount: borde_discount,
          borde_subtotal: borde_subtotal,
          invoice_number: inv_number,
          invoice_date: inv_date,
        });
      }, [boor_order_number]);
      
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
          title: "Payment Type", //
          field: getInvoice?.boor_pay_type,
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

      const dummy = [
        {
          hotel: "Hotel Abstract",
          location: "West Jakarta, Jakarta",
          price: 400000,
          rating: 3.9,
        },
        {
          hotel: "Hotel Abstract",
          location: "West Jakarta, Jakarta",
          price: 400000,
          rating: 4.5,
        },
        {
          hotel: "Hotel Abstract",
          location: "West Jakarta, Jakarta",
          price: 400000,
          rating: 3.5,
        },
        {
          hotel: "Hotel Abstract",
          location: "West Jakarta, Jakarta",
          price: 400000,
          rating: 4,
        },
      ];

  return (
    <div>
      <Card>
        <h1 className="font-bold text-align-center">User History</h1>
      </Card>
      <List className="pb-4">
        {dummy &&
        dummy.map((item: any) => (
          <Card title={item.hotel} className="m-4" extra={item.location}>
            <div>
              <div className="flex justify-between">
                <p className=" text-md"> Price : IDR. {item.price} </p>
              </div>
              <div className="flex justify-between">
                <p className="text-md font-semibold">{item.rating}</p>
              </div>
            </div>
          </Card>
        ))}
      </List>
    </div>
  );
});
