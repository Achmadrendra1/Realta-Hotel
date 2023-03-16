import Layouts from "@/layouts/layout";
import {
  Button,
  Card,
  Carousel,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Progress,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiSwim } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import Buttons from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getBorde,
  getSpFacilities,
  getSpHotel,
  getSpInvoice,
  getSpReview,
  insertBookingExtra,
} from "@/Redux/Action/Booking/BookingAction";
import { useRouter } from "next/router";
import {
  CaretRightFilled,
  DeleteOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  getSpof,
  getBoor,
  insertBooking,
} from "@/Redux/Action/Booking/BookingAction";
import { doPriceItems } from "@/Redux/Action/Master/actionPriceItems";
import { doGetUser } from "@/Redux/Action/User/GetDataUser";
import withAuth from "@/PrivateRoute/WithAuth";
import {
  doBankRequest,
  doPagaRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import AddCard from "@/pages/payment/addCard";
import ActivationHpay from "@/pages/payment/activationHpay";
import ActivationGoto from "@/pages/payment/activationGoto";
import CheckSecure from "@/pages/payment/checkSecure";
import {
  doCreateTransaction,
  doGetAllBank,
} from "@/Redux/Action/Payment/paymentUserAction";
import Link from "next/link";
import { configuration } from "@/Redux/Configs/url";
import { configuration } from "@/Redux/Configs/url";

export default function bookingRoom() {
  const root = useRouter();
  const { id, name } = root.query;
  const dispatch = useDispatch();

  //useEffect Reducer
  useEffect(() => {
    dispatch(getSpHotel());
    dispatch(getSpFacilities());
    dispatch(getSpReview());
    dispatch(getSpof());
    dispatch(doPriceItems());
    dispatch(getBoor());
    dispatch(doGetUser());
  }, [id]);

  //useSelector Get Hotel All
  let hotel = useSelector((state: any) => state.HotelBoorReducer.hotel);
  const hotelById = hotel?.filter((item: any) => item.hotel_id == id);

  //useSelector Get Room by Hotel Id
  let room = useSelector((state: any) => state.FaciBoorReducer.facilities);
  const faciRoom = room.filter((item: any) => item.hotel_id == id);
  

  //useSelector Average Rating Hotel
  let hotelReview = useSelector((state: any) => state.ReviewBoorReducer.review);
  const oneReview = hotelReview?.filter(
    (item: any) => item.hore_hotel_id == id
  );

  //useSelector Get User
  let getUser = useSelector((state: any) => state.GetUserReducer.getUser);

  //useSelector Get Special Offers
  let spof = useSelector((state: any) => state.SpofReducer.spof);
  const typeSpof = spof?.filter((item: any) => {
    if (getUser[0]?.user_type === "C" && item.spofType === "Corporate") {
      return true;
    } else if (
      getUser[0]?.user_type === "I" &&
      item.spofType === "Individual"
    ) {
      return true;
    } else if (
      getUser[0]?.user_type === "T" &&
      item.spofType === "Travel Agent"
    ) {
      return true;
    }
    return false;
  });

  //useSelector Get Price Items for Booking Extra
  let extra = useSelector((state: any) => state.priceItemsReducer.priceItems);

  //useSelector Get Last Booking Order
  let boorNumber = useSelector((state: any) => state.BoorReducer.boor);

  //useSelector Get Last Booking Order Detail
  let bordeNumber = useSelector((state: any)=> state.BoorDetailReducer.borde);

  //State untuk View More Amanities
  const [more, setMore] = useState(false);

  //State untuk modal Special Offers
  const [spofOpen, setSpofOpen] = useState(false);

  //State untuk menampilkan Booking Detail
  const [detail, setDetail] = useState(false);

  //State untuk menampilkan payment
  const [payment, setPayment] = useState(false);

  //State untuk button modal booking extra
  const [addExtra, setAddExtra] = useState(false);

  //State untuk button trash
  const [showTrash, setShowTrash] = useState(false)

  //State untuk Checkin-Checkout Date
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [numDays, setNumDays] = useState(null);

  //State untuk Price Room
  const [priceRoom, setPriceRoom] = useState({
    faci_id: Number,
    faci_name: "",
    faci_high_price: "",
    faci_rate_price: "",
    faci_tax_rate: "",
  });

  //State untuk table Special Offers
  const [spofPrice, setSpofPrice] = useState({
    spofId: 0,
    spofName: "",
    spofDiscount: "",
  });

  //State untuk table Booking Extra
  const [valueExtra, setValueExtra] = useState({
    pritId: [] as any[],
    pritName: [] as any[],
    pritPrice: [] as any[],
    pritQty: [] as any[],
    pritTotal: [] as any[],
    pritMeasure: [] as any[],
    bordeId : [] as any[]
  });

  //State untuk extraTotal
  const [extraTotal, setExtraTotal] = useState({
    extraSubTotal: 0,
  });

  //Table column untuk Price Items dalam Modal
  const columnsExtraModal = [
    {
      title: "Item Name",
      dataIndex: "pritName",
    },
    {
      title: "Price",
      dataIndex: "pritPrice",
    },
    {
      title: "Description",
      dataIndex: "Description",
    },
    {
      key: "action",
      render: ( record: any) => (
        <div className="flex justify-end">
          <button onClick={() => handleValueExtra(record.pritId)}>Add</button>
        </div>
      ),
    }
  ];

  //Table untuk Booking Extra
  const columnsExtra = [
    {
      title: "Item Name",
      dataIndex: "pritName",
    },
    {
      title: "Price",
      dataIndex: "boexPrice",
    },
    {
      title: "Quantity",
      dataIndex: "boexQty",
    },
    {
      title: "SubTotal",
      dataIndex: "boexSubtotal",
    },
    {
      title: (
        <div>
          <button onClick={() => setAddExtra(true)}>Add</button>
        </div>
      ),
      key: "action",
      render: (text: any, record: any, index: any) => (
        <button onClick={() => handleDelete(index)}>Delete</button>
      ),
    }
  ];

  //Looping Map untuk menampilkan data booking extra
  const dataExtra = valueExtra.pritName.map((name: any, index: any) => {
    return {
      // key: index,
      pritId: valueExtra.pritId[index],
      pritName: valueExtra.pritName[index],
      boexPrice: valueExtra.pritPrice[index],
      boexQty: valueExtra.pritQty[index],
      boexSubtotal: valueExtra.pritTotal[index],
      boexMeasure: valueExtra.pritMeasure[index],
      bordeId : valueExtra.bordeId[index]
    };
  });

  //Variable untuk Get Room into Booking Detail
  const faci_id = faciRoom?.length > 0 ? faciRoom[0]?.faci_id : null;
  const faci_name = faciRoom?.length > 0 ? faciRoom[0]?.faci_name : "";
  const faci_rate_price = faciRoom?.length > 0 ? faciRoom[0]?.faci_rate_price : "";
  const faci_high_price = faciRoom?.length > 0 ? faciRoom[0]?.faci_high_price : "";
  const faci_tax_rate = faciRoom?.length > 0 ? faciRoom[0]?.faci_tax_rate  : "";

  let spofDiscInt = parseInt(
    spofPrice.spofDiscount?.split(",")[0].replace(/[^0-9]/g, "")
  );
  let ratePriceInt = parseInt(
    priceRoom.faci_rate_price?.split(",")[0].replace(/[^0-9]/g, "")
  );
  let taxRateInt = parseInt(
    priceRoom.faci_tax_rate?.split(",")[0].replace(/[^0-9]/g, "")
  );

  //Google Maps
  let maps = "https://www.google.com/maps/search/?api=1&query=";

  //Variable Count and Filter Rating
  let rating1 = oneReview?.filter((item: any) => item.hore_rating == 1).length;
  let rating2 = oneReview?.filter((item: any) => item.hore_rating == 2).length;
  let rating3 = oneReview?.filter((item: any) => item.hore_rating == 3).length;
  let rating4 = oneReview?.filter((item: any) => item.hore_rating == 4).length;
  let rating5 = oneReview?.filter((item: any) => item.hore_rating == 5).length;

  //Variable Count All Reviews
  let allReview = oneReview.length;

  //Variable Count All Rating
  let allRating = oneReview?.reduce(
    (acc: any, curr: any) => acc + curr.hore_rating,
    0
  );

  //Variable Average Rating
  let averageRating = allRating / allReview;
  let rating = averageRating.toFixed(1);

  //Variable Rating Class
  let ratingClass = "";
  if (Number(rating) >= 4.5) {
    ratingClass = "Very Good";
  } else if (Number(rating) >= 3.5) {
    ratingClass = "Good";
  } else if (Number(rating) >= 2.5) {
    ratingClass = "Enough";
  } else if (Number(rating) >= 1.5) {
    ratingClass = "Bad";
  } else {
    ratingClass = "Very Bad";
  }

  //Rangepicker ANTD
  const { RangePicker } = DatePicker;

  //New Date Now
  const date = new Date();

  const format:any = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const dateFormatter = new Intl.DateTimeFormat("id-ID", format)
  const currentDate = dateFormatter.format(date)
  
  let link1 = faciRoom?.length > 0 ? faciRoom[0]?.fapho_url : ''
  let link2 = faciRoom?.length > 0 ? faciRoom[1]?.fapho_url : ''
  let link3 = faciRoom?.length > 0 ? faciRoom[2]?.fapho_url : ''
  const [pict, setPict] = useState({
    pict1 : '',
    pict2 : '',
    pict3 : ''
  })

  useEffect(()=> {
    setPict({...pict, pict1 : link1, pict2 : link2, pict3 : link3})
  },[link1,link2,link3])

  //Configure Date untuk Booking
  const dateFormat = "YYYY-MM-DD";
  const disabledDate = (current: any, checkInDate: any) => {
    if (checkInDate) {
      return (
        current < dayjs().startOf("day") || current.isBefore(checkInDate, "day")
      );
    }
    return current < dayjs().startOf("day");
  };

  const handleDateRangeChange = (date: any, dateString: any) => {
    if (date !== null) {
      setDataBooking({
        ...dataBooking,
        // borde_checkin: dayjs(dateString[0]).format('YYYY MM DD'),
        // boor_arrival_date: dayjs(dateString[0]).format('YYYY MM DD'),
        // borde_checkout: dayjs(dateString[1]).format('YYYY MM DD'),
        borde_checkin: dateString[0].replace(/ /g, "-"),
        boor_arrival_date: dateString[0].replace(/ /g, "-"),
        borde_checkout: dateString[1].replace(/ /g, "-"),
      });
      setInDate(date[0]);
      setOutDate(date[1]);
      calculateNumDays(date[0], date[1]);
    } else {
      setDataBooking({
        ...dataBooking,
        borde_checkin: "",
        boor_arrival_date: "",
        borde_checkout: "",
      });
      setInDate(null);
      setOutDate(null);
      calculateNumDays("", "");
    }
  };

  const calculateNumDays = (start: any, end: any) => {
    if (start && end) {
      const numDays = end.diff(start, "days") + 1 - 1;
      setNumDays(numDays);
    } else {
      setNumDays(null);
    }
  };

  const [dataBooking, setDataBooking] = useState({
    boor_user_id: 0,
    boor_hotel_id: id,
    boor_order_number: "",
    boor_order_date: currentDate,
    boor_arrival_date: "",
    boor_total_room: 0,
    boor_total_guest: 0,
    boor_discount: 0,
    boor_total_tax: taxRateInt,
    boor_total_amount: 0,
    boor_down_payment: 0,
    boor_pay_type: "C",
    boor_is_paid: "P",
    boor_type: "",
    boor_member_type: "",
    boor_status: "Booking",
    borde_checkin: "",
    borde_checkout: "",
    borde_adults: 0,
    borde_kids: 0,
    borde_price: ratePriceInt,
    borde_extra: 0,
    borde_discount: 0,
    borde_tax: taxRateInt,
    borde_subtotal: 0,
    borde_faci_id: 0,
    soco_spof_id: null,
    boor_cardnumber: "",
  });

  // console.log(dataBooking)


  const [dataPayment, setDataPayment] = useState({
    userId: 0,
    amount: 0,
    sourceNumber: "0",
    targetNumber: "0",
    trxType: "TRB",
    secureCode: "",
    orderNumber: "",
  });

  useEffect(() => {
    const totalGuest =
      parseInt(dataBooking?.borde_adults) + parseInt(dataBooking?.borde_kids);
    setDataBooking({
      ...dataBooking,
      borde_price: ratePriceInt,
      borde_discount: spofDiscInt,
      boor_discount: spofDiscInt,
      // boor_total_room : 1,
      boor_total_guest: totalGuest,
      borde_tax: taxRateInt,
      boor_total_tax: taxRateInt,
      borde_faci_id: priceRoom.faci_id,
      soco_spof_id: spofPrice.spofId || null,
    });
  }, [ratePriceInt, spofDiscInt, taxRateInt, priceRoom.faci_id]);

  // useEffect book now into Booking Detail
  useEffect(()=> {
      if(name !== undefined){
        setDetail(true)
        setPriceRoom({
          faci_id: faci_id,
          faci_name: faci_name,
          faci_high_price: faci_high_price,
          faci_rate_price: faci_rate_price,
          faci_tax_rate: faci_tax_rate,
        });
        setDataBooking({
          ...dataBooking,
          boor_hotel_id : id,
          borde_faci_id: faci_id,
          borde_price: ratePriceInt,
          borde_tax : taxRateInt,
          boor_total_tax : taxRateInt,
          boor_total_amount : ratePriceInt
        });
      }
  }, [name, faci_id])

  // console.log(dataBooking)

  //Handle button selected room into booking
  const handleButtonSelected = (index: any) => {
    const selected = faciRoom[index];
    setPriceRoom({
      faci_id: selected.faci_id,
      faci_name: selected.faci_name,
      faci_high_price: selected.faci_high_price,
      faci_rate_price: selected.faci_rate_price,
      faci_tax_rate: selected.faci_tax_rate,
    });
    setDataBooking({
      ...dataBooking,
      borde_faci_id: selected.faci_id,
      borde_price: ratePriceInt,
    });
  };

  //Handle button add Special Offers
  const handleButtonModal = (index: any) => {
    const selected = typeSpof[index];
    setSpofPrice({
      spofId: selected.spofId,
      spofName: selected.spofName,
      spofDiscount: selected.spofDiscount,
    });
    setSpofOpen(false);
    setShowTrash(true)
  };

  // Handle untuk Booking Extra di dalam Modal
  const handleValueExtra = (id: any) => {
    const selected = extra.find((items: any) => items.pritId == id);
    const index = valueExtra.pritName.indexOf(selected.pritName);
    if (index >= 0) {
      const newQuantity = [...valueExtra.pritQty];
      newQuantity[index] += 1;
      const newPrice = [...valueExtra.pritTotal];
      newPrice[index] += parseInt(
        selected.pritPrice.split(",")[0].replace(/[^0-9]/g, "")
      );
      setValueExtra({
        ...valueExtra,
        pritQty: newQuantity,
        pritTotal: newPrice,
      });
    } else {
      let measureUnit = "";
      if (selected.pritType === "SNACK") {
        measureUnit = "Unit";
      } else if (selected.pritType === "FACILITY") {
        measureUnit = "People";
      } else if (selected.pritType === "SOFTDRINK") {
        measureUnit = "Unit";
      } else if (selected.pritType === "FOOD") {
        measureUnit = "Unit";
      } else if (selected.pritType === "SERVICE") {
        measureUnit = "People";
      }
      setValueExtra({
        ...valueExtra,
        pritId: [...valueExtra.pritId, selected.pritId],
        pritName: [...valueExtra.pritName, selected.pritName],
        pritPrice: [
          ...valueExtra.pritPrice,
          parseInt(selected.pritPrice.split(",")[0].replace(/[^0-9]/g, "")),
        ],
        pritQty: [...valueExtra.pritQty, 1],
        pritTotal: [
          ...valueExtra.pritTotal,
          parseInt(selected.pritPrice.split(",")[0].replace(/[^0-9]/g, "")),
        ],
        pritMeasure: [...valueExtra.pritMeasure, measureUnit],
      });
    }
    setAddExtra(false);
  };

  useEffect(()=>{
    const borde_id = bordeNumber?.length > 0 ? bordeNumber[0].borde_id : null;
    const id = borde_id + 1;
    for (let i = 0; i < valueExtra.pritName.length; i++){
      valueExtra.bordeId[i] = id
    }
    setValueExtra({...valueExtra, bordeId : valueExtra.bordeId})
  }, [dataBooking.borde_extra])

  //UseEffect untuk change auto totalPrice di booking
  useEffect(() => {
    const rate = dataBooking.borde_price || 0;
    const room = dataBooking.boor_total_room || 1;
    const days = numDays || 1;
    const disc = dataBooking.borde_discount || 0;
    const extra = extraTotal.extraSubTotal;
    const rateTotal = rate * room * days - disc
    const total = rate * days * room - disc + extra;
    const subTotal = () => {
      setDataBooking({
        ...dataBooking,
        boor_total_amount: total,
        borde_subtotal: rateTotal,
        borde_extra: extra,
      });
      setDataPayment({ ...dataPayment, amount: total });
    };
    subTotal();
    // if (dataBooking.borde_price !== 0 || dataBooking.borde_discount !== 0) {
    // }
  }, [
    dataBooking.borde_price,
    dataBooking.boor_total_room,
    dataBooking.borde_checkin,
    dataBooking.borde_checkout,
    dataBooking.borde_discount,
    extraTotal.extraSubTotal,
  ]);

  //useEffect untuk auto munculin perhitungan extra
  useEffect(() => {
    const totalExtra = () => {
      const sumExtra = valueExtra.pritTotal.reduce((a, b) => a + b, 0);
      setExtraTotal({ ...extraTotal, extraSubTotal: sumExtra });
    };
    totalExtra();
  }, [valueExtra.pritTotal]);

  // Handle delete untuk tabel extra
  const handleDelete = (index: any) => {
    const delPritId = valueExtra.pritId.filter((name, i) => i !== index);
    const delPritName = valueExtra.pritName.filter((name, i) => i !== index);
    const delPritPrice = valueExtra.pritPrice.filter((price, i) => i !== index);
    const delPritQty = valueExtra.pritQty.filter((qty, i) => i !== index);
    const delPritTotal = valueExtra.pritTotal.filter((total, i) => i !== index);
    const delBorde = valueExtra.bordeId.filter((borde, i) => i !== index)
    const delPritMeasure = valueExtra.pritMeasure.filter((measure, i) => i !== index
    );
    setValueExtra({
      pritName: delPritName,
      pritPrice: delPritPrice,
      pritId: delPritId,
      pritMeasure: delPritMeasure,
      pritQty: delPritQty,
      pritTotal: delPritTotal,
      bordeId : delBorde
    });
  };

  const handleReservation = () => {
      setDetail(!detail);
  };

  const handleBookingCode = () => {
    dispacth(getBorde())
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const currentDateString = `${year}${month}${day}`;
    let newOrderNumber;
    if (boorNumber.length > 0) {
      const lastOrderNumber =
        boorNumber?.length > 0 ? boorNumber[0].boor_order_number : null;
      if (lastOrderNumber) {
        const lastOrderDate = lastOrderNumber
          .slice(3, 11)
          .split("-")
          .reverse()
          .join("");
        const lastOrderIncrement = parseInt(lastOrderNumber.slice(-4));

        if (lastOrderDate === currentDateString) {
          const newOrderIncrement = lastOrderIncrement + 1;
          const newOrderIncrementString = newOrderIncrement
            .toString()
            .padStart(4, "0");
          newOrderNumber = `BO#${currentDateString}-${newOrderIncrementString}`;
          setDataBooking({ ...dataBooking, boor_order_number: newOrderNumber });
          setDataPayment({ ...dataPayment, orderNumber: newOrderNumber });
        } else {
          newOrderNumber = `BO#${currentDateString}-0001`;
          setDataBooking({ ...dataBooking, boor_order_number: newOrderNumber });
          setDataPayment({ ...dataPayment, orderNumber: newOrderNumber });
        }
        setPayment(!payment);
      }
    } else {
      newOrderNumber = `BO#${currentDateString}-0001`;
      setDataBooking({ ...dataBooking, boor_order_number: newOrderNumber });
      setDataPayment({ ...dataPayment, orderNumber: newOrderNumber });
  }
}

  const handleAdultsValue = (value: any) => {
    setDataBooking({ ...dataBooking, borde_adults: value });
  };

  const handleKidsValue = (value: any) => {
    setDataBooking({ ...dataBooking, borde_kids: value });
  };

  const handleRoomValue = (value: any) => {
    setDataBooking({ ...dataBooking, boor_total_room: value });
  };

  const handleDeleteSpof = () => {
    setSpofPrice({...spofPrice, spofId : 0, spofDiscount : '', spofName : ''})
    setShowTrash(false)
  }

  const [isActive, setIsActive] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [isCash, setIsCash] = useState(true);
  const [disabled, setDisaled] = useState(true);
  const [selectCard, setSelectCard] = useState({ accNumber: "", balance: "" });
  const [openAdd, setOpenAdd] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [showLinked, setShowLinked] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const { allBank } = useSelector((state: any) => state.payBankReducer);
  const { payPaga } = useSelector((state: any) => state.payPagaReducer);
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const { account, error } = useSelector(
    (state: any) => state.payUserAccReducer
  );
  const accNumberDompet = `131${user[0]?.user_phone_number}`;
  const accNumberGoto = user[0]?.user_phone_number.slice(1);

  useEffect(() => {
    setDataBooking({
      ...dataBooking,
      boor_user_id: user[0]?.user_id,
      boor_member_type: user[0]?.usme_memb_name,
      boor_type: user[0]?.user_type,
    });
    setDataPayment({ ...dataPayment, userId: user[0]?.user_id });
  }, [user]);

  const onComplete = () => {
    // console.log(finalForm);
    setShowCheck(true);
  };

  const router = useRouter();
  const onCompleteCash = async ()  => {
    const boor_id = boorNumber?.length > 0 ? boorNumber[0].boor_id : null;
    const id = boor_id + 1;
    await dispatch(insertBooking(dataBooking));
    await dispacth(doCreateTransaction(dataPayment));
    await dispacth(insertBookingExtra(dataExtra)) 

    setTimeout(
      () =>
        router.push({
          pathname: `/booking/room/invoice`,
          query: { id: dataBooking.boor_order_number },
        }),
      1000
    );
  };

  //   useEffect(() => {
  //     if (dataBooking.boor_pay_type != "C") {
  //       setDisaled(false);
  //     } else {
  //       setDisaled(true);
  //     }
  //   }, [dataBooking]);

  const onClose = () => {
    setShowCheck(false);
  };
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(doGetAllBank());
    // dispacth(doUsacRequest());
    dispacth(doPagaRequest());
  }, []);

  //Get User Account By User Id yang login
  const userAcc = account?.filter(
    (obj: any) => obj.usacUserId === user[0]?.user_id
  );
  //Di filter by Type buat misah antara bank/fintech
  const bankAcc = userAcc?.filter(
    (obj: any) => obj.usacType === "Credit Card" || obj.usacType === "Debet"
  );
  const fintechAcc = userAcc?.filter((obj: any) => obj.usacType === "Payment");

  //Check Status Account H-Pay
  const accDompet = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumberDompet
  );

  useEffect(() => {
    accDompet ? setIsActive(true) : setIsActive(false);
  }, [accDompet]);

  //Get Saldo H-Pay
  const saldoDompet = parseInt(accDompet?.usacSaldo).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  //Check Status Account GOTO
  const accGoto = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumberGoto
  );
  useEffect(() => {
    accGoto ? setIsLinked(true) : setIsLinked(false);
  }, [accGoto]);

  //Get Saldo H-Pay
  const saldoGoto = parseInt(accGoto?.usacSaldo).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  //   const handleSetForm = (data:any) => {
  //     setFinalForm(data)
  //   }

  const handleClose = (data: boolean) => {
    setOpenAdd(data);
    setShowActivation(data);
    setShowLinked(data);
    setShowCheck(data);
  };

  const handleActive = (data: boolean) => {
    setOpenAdd(data);
    setShowActivation(data);
    setShowLinked(data);
    setShowCheck(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenAdd(false);
      setShowActivation(false);
      setShowLinked(false);
      setShowCheck(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setShowActivation(false);
    setShowLinked(false);
    setShowCheck(false);
  };

  function maskCardNumber(cardNumber: number) {
    // Mengambil 4 digit terakhir
    const lastFourDigits = cardNumber.toString().slice(-4);
    // Mengganti semua digit, kecuali 4 digit terakhir, dengan karakter "*"
    const maskedDigits = cardNumber.toString().slice(8, -4).replace(/\d/g, "*");
    // Menggabungkan digit yang telah diubah dengan 4 digit terakhir
    const maskedCardNumber = `${maskedDigits} ${lastFourDigits}`;
    return maskedCardNumber;
  }
  const [payMsg, setPayMsg] = useState("");

  useEffect(() => {
    if (selectCard.balance < dataBooking.boor_total_amount) {
      setPayMsg(
        "Your Card Balance Is Insufficient, Please Check Or Select Another Card !"
      );
      setDisaled(true);
    } else {
      setPayMsg("");
      setDisaled(false);
    }
    if (selectCard.balance == "") {
      setPayMsg("");
      setDisaled(true);
    }
  }, [selectCard, dataBooking.boor_total_amount]);

  let pict1 = pict.pict1?.split(', ')
  let pict2 = pict.pict2?.split(', ')
  let pict3 = pict.pict3?.split(', ')
  let pict1 = pict.pict1?.split(', ')
  let pict2 = pict.pict2?.split(', ')
  let pict3 = pict.pict3?.split(', ')

  return (
    <Layouts>
      {openAdd ? (
        <AddCard
          show={openAdd}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleAct={handleActive}
          handleCancell={handleClose}
          dataUser={user}
          dataBank={allBank}
        />
      ) : null}
      {showActivation ? (
        <ActivationHpay
          show={showActivation}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleCancell={handleClose}
          phone={accNumberDompet}
          dataUser={user}
          dataPaga={payPaga}
        />
      ) : null}
      {showLinked ? (
        <ActivationGoto
          show={showLinked}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleCancell={handleClose}
          phone={accNumberGoto}
          dataUser={user}
          dataPaga={payPaga}
        />
      ) : null}
      {showCheck ? (
        <CheckSecure
          show={showCheck}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleCancell={handleClose}
          dataPayment={dataPayment}
          dataBooking={dataBooking}
        />
      ) : null}
      <div className="mb-3 rounded"></div>
      <div>
            <Carousel slidesToShow={3} className="mb-4">
              <div className="w-1/8 border-2">
                <img src={`${configuration.BASE_URL}/facility-photos/${pict1[0]}`} alt="pict1"/>
                <img src={`${configuration.BASE_URL}/facility-photos/${pict1[0]}`} alt="pict1"/>
              </div>
              <div className="w-1/8 border-2">
                <img src={`${configuration.BASE_URL}/facility-photos/${pict1[1]}`} alt="pict1"/>
                <img src={`${configuration.BASE_URL}/facility-photos/${pict1[1]}`} alt="pict1"/>
              </div>
              <div className="w-1/8 border-2">
                <img src={`${configuration.BASE_URL}/facility-photos/${pict2[0]}`} alt="pict2"/>
                <img src={`${configuration.BASE_URL}/facility-photos/${pict2[0]}`} alt="pict2"/>
              </div>
              <div className="w-1/8 border-2">
                <img src={`${configuration.BASE_URL}/facility-photos/${pict2[1]}`} alt="pict2"/>
                <img src={`${configuration.BASE_URL}/facility-photos/${pict2[1]}`} alt="pict2"/>
              </div>
              {/* <div className="w-1/8 border-2">
              {/* <div className="w-1/8 border-2">
                <img src={`../.${pict3[0]}`} alt="pict3"/>
              </div>
              <div className="w-1/8 border-2">
                <img src={`../.${pict3[1]}`} alt="pict3"/>
              </div> */}
              </div> */}
            </Carousel>
        <Row gutter={16}>
          <Col span={14} className={`${!detail ? "block" : "hidden"}`}>
            <div className="mb-3">
              {hotelById &&
                hotelById.map((hotel: any) => {
                  return (
                    <div>
                      <div className="flex">
                        <div className="flex text-4xl mr-5 font-bold">
                          <p>{hotel.hotel_name}</p>
                        </div>
                        <div className="flex">
                          {/* <Rate allowHalf disabled defaultValue={hotel.hotel_rating_star} /> */}
                          <div>
                            <div className="flex border-0 rounded items-center justify-center w-20 h-10 text-2xl">
                              <h2>{rating}</h2>
                              <div className="flex justify-center">
                                <img
                                  className="ml-2 w-5 h-5"
                                  src="../../assets/star.png"
                                />
                              </div>
                            </div>
                            <div className="flex">
                              <div className="flex justify-center">
                                <h2 className="ml-2 mr-2">
                                  ({allReview} Ratings)
                                </h2>
                              </div>
                              <div className="flex justify-center ml-3 font-semibold italic">
                                <h2>{ratingClass}</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-l mt-2">
                        <p className="italic">
                        {hotel.length > 0 ? (
                          <Link href={`${maps}${hotel[0].place}`}>
                            {hotel[0].place}
                          </Link>
                        ) : (
                          hotel.place
                        )}
                        </p>
                      </div>
                      <div className="text-xl mt-2 font-semibold">
                        <p>Description</p>
                      </div>
                      <div className="text-m mt-1 w-3/4">
                        <p>{hotel.hotel_description}</p>
                      </div>
                      <div className="text-xl mt-3 mb-1 font-semibold">
                        <p>Amenities</p>
                      </div>
                      <div className="flex">
                        <div className="flex items-center mr-5">
                          <HiUserGroup className="mr-2" /> Meeting Room
                        </div>
                        <div className="flex items-center mr-5">
                          <IoRestaurantSharp className="mr-2" /> Restaurant
                        </div>
                        <div className="flex items-center mr-5">
                          <BiSwim className="mr-2" /> Swimming Pool
                        </div>
                        <div
                          className={`${
                            more ? "block flex items-center mr-5" : "hidden"
                          }`}
                        >
                          <HiUserGroup className="mr-2" /> Ballroom
                        </div>
                        <div
                          className={`${
                            more ? "block flex items-center mr-5" : "hidden"
                          }`}
                        >
                          <CgGym className="mr-2" /> Gym
                        </div>
                        <div
                          className={`${
                            more ? "block flex items-center mr-5" : "hidden"
                          }`}
                        >
                          <HiUserGroup className="mr-2" /> Aula
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => setMore(!more)}
                            className={`${more ? "hidden" : "block"}`}
                          >
                            +View More
                          </button>
                          <button
                            onClick={() => setMore(!more)}
                            className={`${!more ? "hidden" : "block"}`}
                          >
                            -Less More
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="text-2xl font-semibold my-2">Choose Your Room</div>
            <div>
              {faciRoom &&
                faciRoom.map((room: any, index: any) => {
                  return (
                    <div>
                      <Card className="mb-3 shadow-lg">
                        <Row>
                          <Col span={16}>
                            <div className="text-xl font-semibold">
                              {room.faci_name}
                            </div>
                            <div>Max Vacant : {room.faci_max_number}</div>
                            <div className="flex">
                              <div className="flex text-xl items-center mr-3 text-red-500 font-semibold">
                                {room.faci_rate_price}
                              </div>
                              <div className="flex text-l text-decoration-line: line-through items-center">
                                {room.faci_high_price}
                              </div>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="float-right">
                              <div className="flex justify-center">
                                <img
                                  src={`${configuration.BASE_URL}/facility-photos/${pict1[0]}`}
                                  alt=""
                                  className="w-3/4 rounded border-2"
                                />
                              </div>
                              <div className="flex justify-center mt-5">
                                <Buttons
                                  funcs={() => handleButtonSelected(index)}
                                >
                                  Select Room
                                </Buttons>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  );
                })}
            </div>
            <div className="my-3 mx-1">
              <div className="text-xl mt-10 mb-3">Rating and Reviews</div>
              <div className="mr-1">
                <Row>
                  <Col span={10} className="flex justify-center">
                    <div>
                      <div className="flex border-0 rounded items-center justify-center w-20 h-10 text-2xl">
                        <h2>{rating}</h2>
                        <div className="flex justify-center">
                          <img
                            className="ml-2 w-5 h-5"
                            src="../../assets/star.png"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center font-semibold italic">
                        <h2>{ratingClass}</h2>
                      </div>
                      <div className="flex justify-center">
                        <h2 className="mr-2">{allReview}</h2> Ratings
                      </div>
                    </div>
                  </Col>
                  <Col span={14}>
                    <div className="w-3/4 float-right">
                      <div>
                        <div className="flex">
                          <div>
                            <h2>5</h2>
                          </div>
                          <div className="items-center">
                            <img
                              className="mx-1 w-5 h-5"
                              src="../../assets/star.png"
                            />
                          </div>
                          <div className="w-full">
                            <Progress
                              percent={Math.round((rating5 / allReview) * 100)}
                              format={() => (
                                <span style={{ color: "#000" }}>
                                  {Math.round((rating5 / allReview) * 100)}%
                                </span>
                              )}
                              strokeColor=""
                              trailColor=""
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex">
                          <div>
                            <h2>4</h2>
                          </div>
                          <div className="items-center">
                            <img
                              className="mx-1 w-5 h-5"
                              src="../../assets/star.png"
                            />
                          </div>
                          <div className="w-full">
                            <Progress
                              percent={Math.round((rating4 / allReview) * 100)}
                              format={() => (
                                <span style={{ color: "#000" }}>
                                  {Math.round((rating4 / allReview) * 100)}%
                                </span>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex">
                          <div>
                            <h2>3</h2>
                          </div>
                          <div className="items-center">
                            <img
                              className="mx-1 w-5 h-5"
                              src="../../assets/star.png"
                            />
                          </div>
                          <div className="w-full">
                            <Progress
                              percent={Math.round((rating3 / allReview) * 100)}
                              format={() => (
                                <span style={{ color: "#000" }}>
                                  {Math.round((rating3 / allReview) * 100)}%
                                </span>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex">
                          <div>
                            <h2>2</h2>
                          </div>
                          <div className="items-center">
                            <img
                              className="mx-1 w-5 h-5"
                              src="../../assets/star.png"
                            />
                          </div>
                          <div className="w-full">
                            <Progress
                              percent={Math.round((rating2 / allReview) * 100)}
                              format={() => (
                                <span style={{ color: "#000" }}>
                                  {Math.round((rating2 / allReview) * 100)}%
                                </span>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex">
                          <div>
                            <h2>1</h2>
                          </div>
                          <div className="items-center">
                            <img
                              className="mx-1 w-5 h-5"
                              src="../../assets/star.png"
                            />
                          </div>
                          <div className="w-full">
                            <Progress
                              percent={Math.round((rating1 / allReview) * 100)}
                              format={() => (
                                <span style={{ color: "#000" }}>
                                  {Math.round((rating1 / allReview) * 100)}%
                                </span>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="mb-5 mt-3">
              {oneReview &&
                oneReview.map((hotelReview: any) => {
                  return (
                    <div className="mb-2">
                      <div className="flex items-center">
                        <div className="text-xl mr-5 font-semibold">
                          {hotelReview.user_full_name}
                        </div>
                        <div className="text-l items-center">
                          <p>
                            {dayjs(hotelReview.hore_created_on).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="italic">{hotelReview.hore_user_review}</p>
                    </div>
                  );
                })}
            </div>
            <Divider />
            <div>
              <p className="text-2xl font-semibold my-2">Hotel Policies</p>
            </div>
            <div className="my-2">
              <div className="flex">
                <div className="mr-14 text-l">Checkin</div>
                <div className="text-l">Checkout</div>
              </div>
              <div className="flex mb-1">
                <div className="mr-4 text-xl font-semibold">02:00 PM</div>
                <div className="text-xl font-semibold">12:00 PM</div>
              </div>
            </div>
            <div className="my-2">
              <div>
                <CaretRightFilled /> Cancellation policy, Notify 24 hours prior
                to arrival for full refund.
              </div>
              <div>
                <CaretRightFilled /> Insurance policy, Guests responsible for
                lost or stolen items.
              </div>
              <div>
                <CaretRightFilled /> Hospitality, Providing excellent service to
                exceed guest expectations.
              </div>
            </div>
          </Col>
          <Col span={14} className={`${detail ? "block" : "hidden"}`}>
            <button
              onClick={() => {
                setDetail(!detail), setPayment(!payment);
              }}
            >
              <div className="flex my-2">
                <div className="flex text-xl items-center mr-3">
                  <LeftOutlined />
                </div>
                <div className="flex font-semibold text-xl items-center">
                  Modify your booking
                </div>
              </div>
            </button>
            <div className="font-bold text-2xl mt-2">
              <p>1. Enter Your Details</p>
            </div>
            <div className="text-xl items-center my-3">
              <p>We will use these details to share your booking information</p>
            </div>
            <Row>
              <Col span={12} className="mb-5">
                <div>
                  <div className="text-l mb-2">
                    <p>Full Name :</p>
                  </div>
                  <div>
                    <Input
                      value={getUser[0] ? getUser[0].user_full_name : "None"}
                      className="w-3/4"
                      readOnly
                    ></Input>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <div className="text-l mb-2">
                    <p>Email :</p>
                  </div>
                  <div>
                    <Input
                      value={getUser[0] ? getUser[0].user_email : "None"}
                      readOnly
                      className="w-3/4"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div>
                  <div className="text-l mb-2">
                    <p>Mobile Number : </p>
                  </div>
                  <div className="mb-5">
                    <Input
                      value={getUser[0] ? getUser[0].user_phone_number : "None"}
                      readOnly
                      className="w-3/4"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="font-bold text-2xl my-3">
              <p>2. Complete your booking</p>
            </div>
            <div className="text-xl items-center my-3">
              <Modal
                title="Add Extra"
                centered
                open={addExtra}
                onOk={() => setAddExtra(false)}
                onCancel={() => setAddExtra(false)}
                footer={null}
                width={750}
              >
                <div>
                  <Table
                    columns={columnsExtraModal}
                    dataSource={extra}
                    pagination={{ pageSize: 5 }}
                  />
                </div>
              </Modal>
              <Table columns={columnsExtra} dataSource={dataExtra} />
            </div>
            <div className="flex justify-between">
            </div>
            <div className={`${payment ? "block" : "hidden"}`}>
              <div className="font-bold text-2xl">
                <p>3. Payment</p>
              </div>
              <div className="w-full h-screen p-8">
                <p className="text-md text-center text-red-600">{payMsg}</p>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card
                      size="small"
                      className={`m-4 font-bold text-[14px] ${
                        isCash ? "bg-[#754cff] text-white" : ""
                      }`}
                      hoverable
                      onClick={() => {
                        setIsCash(true),
                          setDataPayment({
                            ...dataPayment,
                            sourceNumber: "0",
                            targetNumber: "0",
                            trxType: "TRB",
                          }),
                          setDataBooking({
                            ...dataBooking,
                            boor_pay_type: "C",
                          });
                      }}
                    >
                      Cash
                    </Card>
                    <Card
                      size="small"
                      className={`m-4 font-bold text-[14px] ${
                        !isCash ? "bg-[#754cff] text-white" : ""
                      }`}
                      hoverable
                      onClick={() => {
                        setIsCash(false),
                          setSelectCard({ accNumber: "", balance: "" });
                        setDataPayment({
                          ...dataPayment,
                          sourceNumber: "",
                          targetNumber: "",
                          trxType: "TRB",
                          secureCode: "",
                        });
                        setDataBooking({
                          ...dataBooking,
                          boor_pay_type: "C",
                        });
                      }}
                    >
                      Pay Now
                    </Card>
                  </Col>
                  <Col span={16}>
                    {isCash ? (
                      <div className="w-full text-center mt-6">
                        <div>
                          <p className="text-lg font-semibold">
                            No payment is needed at the moment.
                          </p>
                          <p>
                            We will confirm your stay without any charge. Pay
                            directly at the hotel during your stay.
                          </p>
                        </div>
                        <Button
                          onClick={onCompleteCash}
                          className="mt-6 bg-[#754cff] text-white w-full h-10"
                        >
                          Complete Order
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-6 w-full ">
                        <p className="m-4">Fintech</p>
                        {isActive ? (
                          <Card
                            size={"small"}
                            className={`mb-2 ${
                              selectCard.accNumber ===
                                accDompet?.usacAccountNumber &&
                              "bg-[#754cff] text-white"
                            }`}
                            hoverable
                            onClick={() => {
                              setSelectCard({
                                accNumber: accDompet?.usacAccountNumber,
                                balance: accDompet?.usacSaldo,
                              });
                              setDataPayment({
                                ...dataPayment,
                                sourceNumber: accDompet?.usacAccountNumber,
                                targetNumber: "13198989898",
                              });
                              setDataBooking({
                                ...dataBooking,
                                boor_pay_type: "PG",
                                boor_cardnumber: accDompet?.usacAccountNumber,
                              });
                            }}
                          >
                            <div className="flex justify-between items-center px-6">
                              <p className="text-[16px] font-semibold">
                                H-Pay
                              </p>
                              <p className="text-[16px] font-semibold">
                                {saldoDompet}
                              </p>
                            </div>
                          </Card>
                        ) : (
                          <Card size={"small"} className="mb-2">
                            <div className="flex justify-between items-center px-6">
                              <p className="text-[16px] font-semibold">
                                H-Pay
                              </p>
                              <p
                                className={`${
                                  selectCard.accNumber ===
                                  accDompet?.usacAccountNumber
                                    ? "text-white"
                                    : "text-blue-700"
                                } hover:cursor-pointer`}
                                onClick={() => setShowActivation(true)}
                              >
                                Activate
                              </p>
                            </div>
                          </Card>
                        )}

                        {isLinked ? (
                          <Card
                            size={"small"}
                            className={`mb-2 ${
                              selectCard.accNumber ===
                                accGoto?.usacAccountNumber &&
                              "bg-[#754cff] text-white"
                            }`}
                            hoverable
                            onClick={() => {
                              setSelectCard({
                                accNumber: accGoto?.usacAccountNumber,
                                balance: accGoto?.usacSaldo,
                              });
                              setDataPayment({
                                ...dataPayment,
                                sourceNumber: accGoto?.usacAccountNumber,
                                targetNumber: "13198989898",
                              });
                              setDataBooking({
                                ...dataBooking,
                                boor_pay_type: "PG",
                                boor_cardnumber: accGoto?.usacAccountNumber,
                              });
                            }}
                          >
                            <div className="flex justify-between px-6">
                              <p className="text-[16px] font-semibold">GOTO</p>
                              <p className="text-[16px] font-semibold">
                                {saldoGoto}
                              </p>
                            </div>
                          </Card>
                        ) : (
                          <Card size={"small"} className="mb-2">
                            <div className="flex justify-between px-6">
                              <p className="text-[16px] font-semibold">GOTO</p>
                              <p
                                className={`${
                                  selectCard.accNumber ===
                                  accGoto?.usacAccountNumber
                                    ? "text-white"
                                    : "text-blue-700"
                                } hover:cursor-pointer`}
                                onClick={() => setShowLinked(true)}
                              >
                                Link Account
                              </p>
                            </div>
                          </Card>
                        )}

                        <p className="m-4">Debet/Credit Card</p>
                        {bankAcc.map((item: any) => (
                          <Card
                            size={"small"}
                            className={`mb-2 ${
                              selectCard.accNumber === item.usacAccountNumber &&
                              "bg-[#754cff] text-white"
                            }`}
                            hoverable
                            onClick={() => {
                              setSelectCard({
                                accNumber: item.usacAccountNumber,
                                balance: item.usacSaldo,
                              });
                              setDataPayment({
                                ...dataPayment,
                                sourceNumber: item.usacAccountNumber,
                                targetNumber: "13198989898",
                              });
                              setDataBooking({
                                ...dataBooking,
                                boor_pay_type:
                                  item.usacType == "Debet" ? "D" : "CR",
                                boor_cardnumber: item.usacAccountNumber,
                              });
                            }}
                          >
                            <div className="flex justify-between px-6">
                              <p className="text-[16px] font-semibold">
                                {maskCardNumber(item.usacAccountNumber)}
                              </p>
                              <p>
                                {
                                  allBank?.find(
                                    (obj: any) =>
                                      obj.bankEntityId == item.usacEntityId
                                  )?.bankName
                                }{" "}
                                - {item.usacType}
                              </p>
                            </div>
                          </Card>
                        ))}

                        <p
                          className="mt-2 px-2 cursor-pointer"
                          onClick={() => setOpenAdd(true)}
                        >
                          Add New Card
                        </p>
                        <Button
                          disabled={disabled}
                          onClick={onComplete}
                          className="mt-6 bg-[#754cff] text-white w-full h-12"
                        >
                          Complete Order
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="sticky top-0 border-4 shadow-lg p-5 rounded-lg bg-white">
              <div className="flex justify-center font-bold text-3xl">
                Booking Order Details
              </div>
                <h1 className="font-bold text-lg mt-4">
                  {dataBooking.boor_order_number}
                </h1>
              <Divider className="border-2"/>
              <div className="flex text-center my-5 items-center">
                <div className="flex text-2xl font-bold text-center text-red-500">
                  <p>{priceRoom.faci_rate_price}</p>
                </div>
                <div className="flex ml-2 text-m line-through text-center">
                  <p>{priceRoom.faci_high_price}</p>
                </div>
              </div>
              <Row gutter={10}>
                <Col span={12}>
                  <p>Please input date :</p>
                </Col>
                <Col span={12} className="flex">
                  <Col span={8}>
                    <p>Room : </p>
                  </Col>
                  <Col span={8}>
                    <p>Adults : </p>
                  </Col>
                  <Col span={8}>
                    <p>Kids : </p>
                  </Col>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <RangePicker
                    onChange={handleDateRangeChange}
                    format={dateFormat}
                    disabledDate={(current) => disabledDate(current, dayjs())}
                  />
                </Col>
                <Col span={12} className="flex gap-5">
                  <Col span={6}>
                    <InputNumber
                      type="number"
                      className="w-14"
                      min={1}
                      max={3}
                      value={dataBooking.boor_total_room}
                      onChange={handleRoomValue}
                    />
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      type="number"
                      className="w-14"
                      min={1}
                      max={4}
                      value={dataBooking.borde_adults}
                      onChange={handleAdultsValue}
                    />
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      type="number"
                      className="w-14"
                      min={0}
                      max={2}
                      value={dataBooking.borde_kids}
                      onChange={handleKidsValue}
                    />
                  </Col>
                </Col>
              </Row>
              <div className="flex justify-between items-center mt-2 mb-3">
                <div className=" flex my-1 items-center">
                  <Modal
                    title="Special Offers"
                    centered
                    open={spofOpen}
                    onOk={() => setSpofOpen(false)}
                    onCancel={() => setSpofOpen(false)}
                    footer={null}
                    width={750}
                  >
                    {typeSpof &&
                      typeSpof.map((spof: any, index: any) => {
                        return (
                          <div>
                            <Card className="mb-3">
                              <Row>
                                <Col span={16}>
                                  <div className="flex items-center mb-3">
                                    <div className="items-center w-12 mr-3">
                                      <img src="../../assets/icons.png" />
                                    </div>
                                    <div className="items-center">
                                      <Tag color="volcano">{spof.spofName}</Tag>
                                    </div>
                                  </div>
                                  <div className="text-xl font-bold mb-3">
                                    <p>{spof.spofDiscount}</p>
                                  </div>
                                  <div className="text-m ">
                                    <p>{spof.spofDescription}</p>
                                  </div>
                                </Col>
                                <Col span={8}>
                                  <div className="float-right">
                                    <Buttons
                                      funcs={() => handleButtonModal(index)}
                                    >
                                      Apply
                                    </Buttons>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          </div>
                        );
                      })}
                  </Modal>
                  <Buttons funcs={() => setSpofOpen(true)}>Get Coupons</Buttons>
                </div>
                <div className="text-xl font-semibold italic">
                  {spofPrice.spofName}
                </div>
                <div>
                  <button onClick={handleDeleteSpof} className={`${showTrash ? "block" : "hidden"}`}><DeleteOutlined className="text-red-500" /></button>
                </div>
                <div className="flex text-xl my-1 items-center">
                  - {spofPrice.spofDiscount}
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-l items-center">Additional Extra</div>
                <div className="flex text-xl items-center">
                  {extraTotal.extraSubTotal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex text-l items-center">Your Saving</div>
                <div className="flex text-xl items-center">
                  - {spofPrice.spofDiscount}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex text-l items-center">Total Price</div>
                <div className="flex text-xl items-center">
                  <p>
                    {dataBooking.boor_total_amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
              <div className="text-m italic">Include Tax</div>
              <div className="flex justify-center mt-3">
                <Button
                  onClick={handleReservation}
                  className={`text-white bg-[#754CFF] ${detail ? "hidden" : "block"}`}
                >
                  Reservation Booking
                </Button>
                <Button
                  onClick={handleBookingCode}
                  className={`text-white bg-[#754CFF] ${!detail || payment ? "hidden" : "block"}`}
                >
                  {/* text-white bg-[#754CFF] */}
                  Continue to Booking Order
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layouts>
  );
}
