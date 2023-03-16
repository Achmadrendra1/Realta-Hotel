import { doRestoRequest } from "@/Redux/Action/Resto/restoAction";
import { getSpHotel } from "@/Redux/Action/Booking/BookingAction";
import { getLanding } from "@/Redux/Action/Hotel/LandingAction";
import Buttons from "@/components/Button";
import Hero from "@/components/Hero";
import Layouts from "@/layouts/layout";
import { StarOutlined } from "@ant-design/icons";
import { Inter } from "@next/font/google";
import { Card, Input, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { configuration } from "@/Redux/Configs/url";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { resto } = useSelector((state: any) => state.restoReducer);
  const dispatch = useDispatch();
  const services = [
    {
      title: "Best Room and Facilities",
      desc: "Discover the epitome of comfort and convenience with our top-notch rooms and state-of-the-art facilities.",
      src: "../assets/room.png",
      alt: "Icon Room",
    },
    {
      title: "Restaurant With A Variety Of Menus",
      desc: "Savor the flavors of a multitude of cuisines at our restaurant, where we offer a diverse range of menus to cater to your taste buds.",
      src: "../assets/resto.png",
      alt: "Icon Resto",
    },
    {
      title: "Best Service From The Best Waiter",
      desc: "We pride ourselves on providing the highest level of service to our guests, and our team of waiters are no exception.",
      src: "../assets/waiter.png",
      alt: "Icon Waiter",
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

  useEffect(() => {
    dispatch(doRestoRequest(1));
    dispatch(getSpHotel())
  }, []);

  let hotel = useSelector((state: any) => state.HotelBoorReducer.hotel)
  // console.log(hotel)
  

  const { Meta } = Card;
  useEffect(() => {
    dispatch(getLanding());
  }, []);
  let {landing} = useSelector((state : any) => state.LandingReducer)
const router = useRouter()

  return (
    <Layouts>
      <Hero />
      <div className="container">
        <p className="text-center text-[#754cff] font-semibold text-xl">
          The Best Service We Can Offer You
        </p>
        <p className="text-center text-[34px] mt-8 w-2/4 m-auto font-semibold">
          Facilities That Provide An Experience During Your Stay At Our Hotel
        </p>
        <div className="flex justify-center mt-10 gap-8">
          {services.map((item: any, index: number) => (
            <Card
              key={index}
              className="justify-start w-[300px]"
              style={{ boxShadow: "0px 15px 100px rgba(117, 76, 255, 0.27)" }}
              hoverable
            >
              <img src={item.src} alt={item.alt} width={60} height={60} />
              <p className="text-xl font-bold mt-4 h-14">{item.title}</p>
              <p className="mt-4 h-24">{item.desc}</p>
              <p className="mt-4 text-[14px] text-[#754cff]">Find Now</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="container mt-14">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[24px] w-[250px]">
            Find The Best Room For Your Destination
          </p>
          <div className="">
            <Buttons funcs={() => router.push("/booking")}>View More</Buttons>
          </div>
        </div>
        <div className="flex gap-5 mt-8 justify-center flex-wrap">
          {hotel.map((item: any, index:number) => (
            <Card
            key={index}
            style={{ width: 400 }}
            cover={<img alt="example" src={`${configuration.BASE_URL}/facility-photos/${item.url.split(',')[0]}`} />}
            >
              <p className="font-bold">{item.hotel_name}</p>
              <p className="text-[#adaeb8]">
                {item.place}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Space>
                  <StarOutlined className="text-[#F7C934]" />
                  <span className="font-semibold">
                    {item.hotel_rating_star}
                  </span>
                </Space>
                <div>
                  <Buttons funcs={""}>Book Now</Buttons>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="container mt-14">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[24px] w-[450px]">
            Discover Your Destination Restaurants From Our Hotel&apos;s Best
            Restaurants
          </p>
          <div className="">
            <Buttons funcs={() => router.push('restaurant')}>View More</Buttons>
          </div>
        </div>
        <div className="flex gap-5 mt-8 justify-start flex-wrap justify-center">
          {resto.data?.map((item: any, index:number) => (
            <Card
              key={index}
              style={{ width: 400 }}
              cover={<img alt="example" src={`${configuration.BASE_URL}/facility-photos/`+item.fapho_thumbnail_filename} className="h-[300px]"/>}
            >
              <p className="font-bold text-[#754CFF]">{item.hotel_name}</p>
              <p className="text-black font-semibold mb-3">{item.faci_name}</p>
              <p className="text-[#adaeb8]">{item.faci_description}</p>
              <div className="flex justify-end items-center mt-4">
                <div>
                  <Buttons funcs={""}>Order Now</Buttons>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="py-40 relative w-full bg-[url('/assets/bg-email.svg')] bg-center bg-contain bg-no-repeat h-[600px]">
        <div className="bg-[#F7C934] h-[180px] w-11/12 mx-auto py-8 px-8 rounded-xl border-white border-4">
          <div className="flex justify-between h-28 items-center">
            <div>
              <p className="text-2xl font-semibold">
                Join Or Be A Part Of Us As Our Sponsor
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                placerat pulvinar risus
              </p>
            </div>
            <div className="w-2/4">
              <div className="w-full flex items-center">
                <Input
                  placeholder="Type Your Email Here"
                  style={{ height: 40, border: 0 }}
                  className="rounded-lg w-3/4 mr-2"
                />
                <div className="h-[60]">
                  <Buttons>Send</Buttons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='mt-5'>
          <h1 className='text-2xl text-center'>Services</h1>
          <Row gutter={16} className='my-3'>
            {
              services.map((item:any, index:any) => 
              <Col span={8} key={index}>
                <Card className='text-center border-2 border-transparent hover:border-gray-200 transition ease-in'>
                  <h1 className='text-3xl'>{item.icons}</h1>
                  <h2 className='text-lg text-slate-600 mt-4'>{item.title}</h2>
                </Card>
              </Col>
              )
            }
          </Row>
        </div> */}
    </Layouts>
  );
}
