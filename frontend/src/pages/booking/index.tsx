import Layouts from "@/layouts/layout";
import { Breadcrumb, Button, Card, Carousel, Checkbox, Col, Input, Rate, Row } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useEffect, useState } from 'react';
import { HiUserGroup } from 'react-icons/hi'
import { IoRestaurantSharp } from 'react-icons/io5'
import { BiSwim } from 'react-icons/bi'
import Buttons from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getSpHotel } from "@/Redux/Action/Booking/BookingAction";
import { useRouter } from "next/router";

//OnChange checkbox
const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

export default function index() {

  const root = useRouter()
  const dispatch = useDispatch();
  const { location, date} = root.query

  useEffect(() => {
    dispatch(getSpHotel())
  }, []);

  //View detail hotel by id
  const viewDetailId = (id: any) => {
    root.push({
      pathname: ('/booking/room/' + id)
    })
  }


  //Get data Hotel
  let hotel = useSelector((state: any) => state.HotelBoorReducer.hotel)
  // console.log(hotel)

  
  const locationHotel = hotel.filter((item:any) => {
      if (!location) {
          return item;
        } else {
            return item?.city.toLowerCase().includes(location.toLowerCase());
    }
  })


  //Hook untuk View More
  const [more, setMore] = useState(false)
  
  //Hook untuk Filter
  const [filter, setFilter] = useState({
    lowest: 0,
    highest: 0
  })
  
  //Hook untuk map
  const [mapHotel, setMapHotel] = useState([])
  
  useEffect(() => {
    if(!locationHotel){
      setMapHotel(hotel)
    } else {
      setMapHotel(locationHotel)
    }
  }, [hotel])
  
  const filterHotel = mapHotel?.filter((items: any) =>
    parseInt((items.faci_rateprice).substring(3).replace(".", "")) >= filter?.lowest
    &&
    parseInt((items.faci_rateprice).substring(3).replace(".", "")) <= filter?.highest
  )
  
  const handleChangePrice = (event: any) => {
    const { name, value } = event.target;
    setFilter(items => ({ ...items, [name]: value }))
  }

  const handleClear = () => {
    setFilter({ ...filter, highest: 0, lowest: 0 })
    setMapHotel(hotel)
  }

  // console.log(handleClear)

  const handleFilter = () => {
    setMapHotel(filterHotel)
  }

  return (
    <Layouts>
      <div>
        <Row>
          <Col span={6}>
            <Card style={{ width: 300 }}>
              <div className="flex justify-between items-center">
                  <div className='text-xl font-semibold'>
                      <p>Filters</p>
                  </div>
                  <div>
                    <button className='text-sm font-semibold text-red-600' onClick={handleClear}>Clear All</button>
                  </div>
              </div>
              <div>
                  <p className="text-lg py-3 font-semibold">Price Range</p>
                  <div className="flex justift-between items-center">
                    <Col span={10}>
                      <Input type="number" prefix="Rp." name="lowest" value={filter.lowest} onChange={handleChangePrice}/>
                    </Col>
                      <p className="px-1">-</p>
                    <Col span={10}>
                      <Input type="number" name="highest" prefix="Rp." value={filter.highest} onChange={handleChangePrice}/>
                    </Col>
                  </div>
              </div>
              <div>
                  <p className="text-lg py-3 font-semibold ">Hotel Facilities</p>
                  <div>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row gutter={16}>
                          <Col span={24}>
                            <Checkbox value="Meeting Room">Meeting Room</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="Restaurant">Restaurant</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
                          </Col>
                          <Col span={24} className={`${more ? "block" : "hidden"}`}>
                            <Checkbox value="Ballroom">Ballroom</Checkbox>
                          </Col>
                          <Col span={24} className={`${more ? "block" : "hidden"}`}>
                            <Checkbox value="Gym">Gym</Checkbox>
                          </Col>
                          <Col span={24} className={`${more ? "block" : "hidden"}`}>
                            <Checkbox value="Aula">Aula</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                  </div>
                <div className="py-1 font-bold">
                  <button onClick={()=> setMore(!more)} className={`${more ? "hidden" : "block"} font-semibold`}>+ View More</button>
                  <button onClick={()=> setMore(!more)} className={`${!more ? "hidden" : "block"} font-semibold`}>- Less More</button>
                </div>
                <div className="mt-4 text-center">
                  <Buttons funcs={handleFilter}>Filter</Buttons>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={18}>
            <div>
              <div>
                {
                  mapHotel &&
                  mapHotel.map((hotel: any, index: number) => {
                    let room = hotel.faci_hotelall;
                    let arrRoom = room.split(',');
                    let ratePrice = hotel.faci_rateprice;
                    let arrRatePrice = ratePrice.split('-');
                    let highPrice = hotel.faci_highprice;
                    let arrHighPrice = highPrice.split('-')
                    let pict = hotel?.url
                    let arrPict = pict?.split(",")
                    const bookNow = (id : any) => {
                      root.push({
                        pathname: ('/booking/room/' + id),
                        query : (`name=${arrRoom[0]}`)
                      })
                    } 
                    return (
                      <Card key={index} className="mb-2">
                        <Row>
                          <Col span={6} className="flex items-center">
                            <Row gutter={10} className="items-center">
                              <Col span={18}>
                                <Carousel autoplay autoplaySpeed={5000}>
                                  {arrPict?.map((each: any) => (
                                    <img className="w-full" src={`http://localhost:3600/facility-photos/${each}`} alt="hotels" />
                                  ))}
                                </Carousel>
                              </Col>
                              <Col span={6}>
                                {arrPict?.slice(0,4).map((image: any, index: any) => (
                                  <img key={index} src={`http://localhost:3600/facility-photos/${image}`} className="w-16 py-1" />
                                ))}
                              </Col>
                            </Row>
                          </Col>
                          <Col span={18}>
                            <Card className="border-0">
                              <div>
                                <p className="text-2xl font-semibold">{
                                  hotel.hotel_name
                                }
                                </p>
                              </div>
                              <div>
                                <p className="text-m">{
                                  hotel.place
                                }
                                </p>
                              </div>
                              <div className="my-2">
                                <Rate allowHalf disabled defaultValue={hotel.hotel_rating_star} />
                              </div>
                              <div className="flex">
                                <div className="flex items-center mr-2">
                                  <HiUserGroup className="mr-2" /> Meeting Room
                                </div>
                                <div className="flex items-center mr-2">
                                  <IoRestaurantSharp className="mr-2" /> Restaurant
                                </div>
                                <div className="flex items-center mr-5">
                                  <BiSwim className="mr-2" /> Swimming Pool
                                </div>
                              </div>
                              <div>
                                <p className="text-l italic mt-2">
                                  {arrRoom[0]}
                                
                                </p>
                              </div>
                              <div className="flex">
                                <div className="flex text-xl items-center mr-3 text-red-500 font-semibold">
                                  {arrRatePrice[0]}
                                </div>
                                <div className="flex text-l text-decoration-line: line-through items-center">
                                  {arrHighPrice[0]}
                                </div>
                              </div>
                              <div className="flex justify-between text-m">
                                <div>
                                  per room per night
                                </div>
                                <div className="flex space-x-1">
                                  <Buttons funcs={() => viewDetailId(hotel.hotel_id)}>View Details</Buttons>
                                  <Buttons funcs={() => bookNow(hotel.hotel_id)}>Book Now</Buttons>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        </Row>
                      </Card>
                    )
                  })
                }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layouts>
  )

}
