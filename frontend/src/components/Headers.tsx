import {
  Menu,
  List,
  Dropdown,
  Space,
  Avatar,
  MenuProps,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Divider,
  AutoComplete,
} from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Buttons from "./Button";
import Image from "next/image";
import  {useRouter}  from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doUsacRequest } from "@/Redux/Action/Payment/paymentDashAction";
import { doGetUser } from "@/Redux/Action/User/GetDataUser";
import { doLogout } from "@/Redux/Action/User/auth";

const { Item } = List;
const { RangePicker } = DatePicker;

const Headers = ({
  nav,
  logo,
  click,
  queries,
}: {
  nav?: any;
  logo?: string;
  click?: any;
  queries: any[];
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const splits = router.asPath.split("/");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState([]);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const { account } = useSelector((state: any) => state.payUserAccReducer);

  //Variabel Account Number H-Pay
  const accNumber = `131${user[0]?.user_phone_number}`;

  //Filter Account Number untuk mencari account number H-Pay
  const fintechAcc = account?.filter((obj: any) => obj.usacType === "Payment");
  const acc = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumber
  );

  //Variabel Saldo H-Pay
  const saldo = parseInt(acc?.usacSaldo).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  //Cek H-Pay Sudah Active Atau Belum
  useEffect(() => {
    acc ? setIsActive(true) : setIsActive(false);
  }, [acc]);

  //Cek Role User & Dispatch User Account
  useEffect(() => {
    user[0]?.role_name != "Guest" ? setIsAdmin(true) : setIsAdmin(false);
    if(user.length != 0){
      dispatch(doUsacRequest(user[0]?.user_id));
    }
  }, [user]);

  // Cek apakah token JWT masih valid
  function isTokenExpired() {
    let token;
    if (typeof window !== "undefined") {
      // Perform localStorage action
      token = localStorage.getItem("token");
    }
    if (!token) {
      return true;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000; // konversi ke milidetik
    return Date.now() > expirationTime;
  }

  // Hapus data di localStorage jika token sudah kadaluarsa
  if (isTokenExpired()) {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.removeItem("token");
    }
  }
  useEffect(() => {
    localStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    dispatch(doGetUser());
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(doLogout())
    setIsLogin(false);
    router.push("/");
  };

  const searchs = () => {
    router.push(
        { 
            pathname: 'booking/', 
            query: {
                location: location,
                date: date,
            }
        }
    )
    setOpen(false)
  }

  //Dropdown menu user & admin
  const menuUser = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/users#profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/users#history">History</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href={""} onClick={logout}>
          <span className="text-red-600">Log Out</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
  const menuAdmin = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/users#profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/users#history">History</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {
          router.asPath.includes('/dashboard') ? 
          <Link href="/">Home</Link> :
          <Link href="/dashboard">Dashboard</Link> 
        }
      </Menu.Item>
      <Menu.Item key="3">
        <Link href={""} onClick={logout}>
          <span className="text-red-600">Log Out</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
  const change = () => {
    click();
  };

  const options = [
    { value: "Bandung" },
    { value: "Bogor" },
    { value: "Banten" },
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <Menu
          mode="horizontal"
          className="bg-[#F2F1FA] py-4 border-0 items-center gap-x-2 w-full"
        >
          <Item className="font-bold text-lg mr-10">
            <div className="h-full pt-2">
              {logo ? (
                <Image
                  src={logo}
                  className="w-12 h-auto"
                  width={20}
                  height={10}
                  alt="test"
                />
              ) : (
                <Button onClick={change} className="flex items-center border-0">
                  <MenuOutlined />
                </Button>
              )}
            </div>
          </Item>
          <Item className="flex items-center gap-4">
            {nav &&
              nav.map((item: any, index: any) => (
                <Link
                  href={item.href}
                  key={index}
                  className={`px-7 py-2 leading-5 text-md rounded-full transition ease-in ${
                    item.href == "/" + splits[1]
                      ? " text-[#754CFF] hover:text-black font-semibold text-[14px]"
                      : 'hover:text-[#754cff] text-[#959595] font-medium text-[14px]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </Item>
          {nav ? (
            router.asPath == "/" ? null : (
              <Item className="ml-auto mr-5 relative">
                <div className="flex items-center gap-3 text-gray-400 z-50">
                  <button className="capitalize" onClick={() => setOpen(!open)}>
                    {queries[0] !== undefined ? queries[0] : "Locations"}
                  </button>
                  <Divider type="vertical" />
                  <button onClick={() => setOpen(!open)}>
                    {queries[1].date !== undefined 
                      ? `Start Date : ${queries[1].date[0]} - End Date : ${queries[1].date[1]}`
                      : "Start date & End date"}
                  </button>
                </div>
                {open && (
                  <div
                    className="absolute right-0 bg-white drop-shadow-md px-5 py-2 z-50 w-[680px]">
                    <Row gutter={5}>
                      <Col span={9}>
                        <Input
                          className="w-full"
                          style={{ borderRadius: 0 }}
                          placeholder="Locations"
                          onChange={e => setLocation(e.target.value)}
                        />
                      </Col>
                      <Col span={10}>
                        <RangePicker
                          className="w-full"
                          onChange={(value, dateString: any) =>
                            setDate(dateString)
                          }
                        />
                      </Col>
                      <Col span={4}>
                        <Buttons funcs={() => searchs()}>Search</Buttons>
                      </Col>
                    </Row>
                  </div>
                )}
              </Item>
            )
          ) : null}
          <Divider type="vertical" />
          <Item className="ml-auto">
            {isLogin ? (
              <div className="flex items-center">
                <div>
                  <p className="text-md mr-2 leading-6">
                    {user[0] ? user[0].user_full_name : "Guest"}
                  </p>
                  {isActive ? (
                    <p 
                    onClick={() => router.push("/payment")}
                    className="text-sm text-[#754cff] hover:underline hover:cursor-pointer">
                      <WalletOutlined /> {saldo}
                    </p>
                  ) : (
                    <p
                      onClick={() => router.push("/payment")}
                      className="text-sm text-[#754cff] hover:underline hover:cursor-pointer"
                    >
                      <WalletOutlined /> Activate
                    </p>
                  )}
                </div>
                <Dropdown
                  overlay={isAdmin ? menuAdmin : menuUser}
                  trigger={["click"]}
                  className="h-8"
                >
                  <Avatar
                    size="default"
                    icon={<UserOutlined />}
                    className="ml-4 hover:cursor-pointer"
                  />
                </Dropdown>
              </div>
            ) : (
              <Buttons funcs={() => router.push("../users/login")}>
                Sign in
              </Buttons>
            )}
          </Item>
        </Menu>
      </div>
    </div>
  );
};

export default Headers;
