import withAuth from "@/PrivateRoute/WithAuth";
import { getSpInvoice } from "@/Redux/Action/Booking/BookingAction";
import { Card, Empty, List } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgLayoutGrid } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

export default withAuth(function UserHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const invoiceView = useSelector(
    (state: any) => state.BoorInvoiceReducer.invoice
  );

  // console.log(invoiceView);

  useEffect(() => {
    dispatch(getSpInvoice());
  }, []);

  const Invoice = invoiceView?.filter(
    (item: any) => item.user_id == user[0]?.user_id
  );

  const date = new Date();

  const format = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const dateFormatter = new Intl.DateTimeFormat("id-ID", format);
  const currentDate = dateFormatter.format(date);

  return (
    <div>
      <Card>
        <h1 className="font-bold text-align-center">My History Booking</h1>
      </Card>
      <List className="pb-4">
        {Invoice.length != 0 ? (
          Invoice.map((item: any) => (
            <Card
              title={item.boor_order_number}
              className="m-4"
              extra={item.boor_order_date.split("T")[0]}
            >
              <div>
                <div className="flex justify-between">
                  <p className=" text-lg font-bold">
                    {item.hotel_name}{" "}
                  </p>
                  <p className=" text-md font-semibold">
                    {item.boor_status}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-semibold">{`${item.check_in_date} - ${item.check_out_date}`}</p>
                  <p className="text-lg font-bold">
                    {item.boor_total_amount}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-semibold">{`${item.total_guest} Tamu, ${item.boor_total_room} Kamar`}</p>
                  {item.check_in_date == currentDate && (
                    <p className="text-sm font-medium text-red-600 hover:cursor-pointer hover:underline">
                      Cancel Booking
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Empty className="mt-10 font-bold text-xl" />
        )}
      </List>
    </div>
  );
});
