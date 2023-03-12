import withAuth from "@/PrivateRoute/WithAuth";
import { getSpInvoice } from "@/Redux/Action/Booking/BookingAction";
import { RightOutlined } from "@ant-design/icons";
import { Card, Empty, List, Space, Tooltip } from "antd";
import {
  PaginationAlign,
  PaginationPosition,
} from "antd/es/pagination/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgLayoutGrid } from "react-icons/cg";
import { IoListOutline } from "react-icons/io5";
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

  const [position, setPosition] = useState<PaginationPosition>("bottom");
  const [align, setAlign] = useState<PaginationAlign>("end");
  const router = useRouter();
  const checkDate = (checkInDate: any) => {
    const now = new Date();
    const checkIn = new Date(checkInDate);

    if(checkIn > now){
      return true
    } else {
      return false
    }
  };


  return (
    <div>
      <Card>
        <h1 className="font-bold text-md">My History Booking</h1>
      </Card>
      <List
        className="pb-4"
        dataSource={Invoice}
        pagination={{ position, align, pageSize: 5 }}
        renderItem={(item: any) => (
          <Card
            title={item.boor_order_number}
            className="mb-1 mt-2 w-full"
            extra={
              <Space>
                <p>{item.boor_order_date.split("T")[0]}</p>
                <Tooltip title="See Invoice">
                  <p>
                    <RightOutlined
                      className="hover:cursor-pointer"
                      onClick={() =>
                        router.push({
                          pathname: "/booking/room/invoice",
                          query: { id: item.boor_order_number },
                        })
                      }
                    />
                  </p>
                </Tooltip>
              </Space>
            }
          >
            <div>
              <div className="flex justify-between">
                <p className=" text-lg font-bold">{item.hotel_name} </p>
                <p className=" text-md font-semibold">{item.boor_status}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-md font-semibold">{`${item.check_in_date} - ${item.check_out_date}`}</p>
                <p className="text-lg font-bold">{item.boor_total_amount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-md font-semibold">{`${item.total_guest} Tamu, ${item.boor_total_room} Kamar`}</p>
                {checkDate(item.check_in_date) && (
                  <p className="text-sm font-medium text-red-600 hover:cursor-pointer hover:underline">
                    Cancel Booking
                  </p>
                )}
                
              </div>
            </div>
          </Card>
        )}
      >
      </List>
    </div>
  );
});
