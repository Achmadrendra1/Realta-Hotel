import Layouts from "@/layouts/layout";
import { Breadcrumb, Button, Card, Checkbox, Col, Input, Rate, Row } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React, {useEffect, useState} from 'react';
import {HiUserGroup} from 'react-icons/hi'
import {IoRestaurantSharp} from 'react-icons/io5'
import {BiSwim} from 'react-icons/bi'
import Buttons from "@/components/Button";
import { useDispatch, useSelector} from "react-redux";
import { getSpHotel } from "@/Redux/Action/Booking/BookingAction"; 
import { useRouter } from "next/router";

export default function index() {
  
  const root = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpHotel())
  }, []);
  
  //Get data Hotel
  let hotel = useSelector((state : any) => state.HotelBoorReducer.hotel)

  //Hook untuk View More Filter
  const [filter, setFilter] = useState(false)

  //OnChange checkbox
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  
  //View detail hotel by id
  const viewDetailId = (id : any) => {
    root.push({
      pathname : ('/booking/room/' + id)
    })
  }
  
  return (
    <Layouts>
      <div>
        <Row>
          <Col span={6}>
            <Card style={{ width: 300 }}>
              <div className="flex justify-between items-center">
                  <div className='text-2xl font-semibold'>
                      <p>Filters</p>
                  </div>
                  <div>
                    <button className='text-decoration-line: underline font-semibold'>Clear All</button>
                  </div>
              </div>
              <div>
                  <p className="text-xl py-3 font-semibold">Price Range</p>
                  <div className="flex justift-between items-center">
                    <Col span={10}>
                      <Input/>
                    </Col>
                      <p className="px-1">Sampai</p>
                    <Col span={10}>
                      <Input/>
                    </Col>
                  </div>
              </div>
              <div>
                  <p className="text-xl py-3 font-semibold ">Hotel Facilities</p>
                  <div>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                          <Col span={24}>
                            <Checkbox value="Meeting Room">Meeting Room</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="Restaurant">Restaurant</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
                          </Col>
                          <Col span={24} className={`${filter ? "block" : "hidden"}`}>
                            <Checkbox value="Ballroom">Ballroom</Checkbox>
                          </Col>
                          <Col span={24} className={`${filter ? "block" : "hidden"}`}>
                            <Checkbox value="Gym">Gym</Checkbox>
                          </Col>
                          <Col span={24} className={`${filter ? "block" : "hidden"}`}>
                            <Checkbox value="Aula">Aula</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                  </div>
                <div className="py-1 font-bold">
                  <button onClick={()=> setFilter(!filter)} className={`${filter ? "hidden" : "block"}`}>+ View More</button>
                  <button onClick={()=> setFilter(!filter)} className={`${!filter ? "hidden" : "block"}`}>- Less More</button>
                </div>
                <div className="text-center">
                  <Button className="">Filter</Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={18}>
            <div>
              <div className="mb-3">
              <Breadcrumb separator=">">
                  <Breadcrumb.Item href="http://localhost:3000/">
                  Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="http://localhost:3000/booking/">
                  Hotel
                  </Breadcrumb.Item>
              </Breadcrumb>
              </div>
              <div>
                {
                  hotel &&
                  hotel.map((hotel : any)=>{
                    let room = hotel.faci_hotelall;
                    let arrRoom = room.split(',');
                    let ratePrice = hotel.faci_rateprice;
                    let arrRatePrice = ratePrice?.split('-');
                    let highPrice = hotel.faci_highprice;
                    let arrHighPrice = highPrice.split('-')

                    return (
                      <Card>
                        <Row>
                          <Col span={6}>
                            <div>
                              <Row>
                                <Col span={18}>
                                  Foto Besar
                                </Col>
                                <Col span={6}>
                                  Foto Kecil
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col span={18}>
                            <Card>
                              <div>
                                  <p className="text-2xl">{
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
                              <div>
                                <Rate allowHalf disabled defaultValue={hotel.hotel_rating_star} />
                              </div>
                              <div className="flex">
                                <div className="flex items-center mr-2">
                                  <HiUserGroup/> Meeting Room
                                </div>
                                <div className="flex items-center mr-2">
                                  <IoRestaurantSharp/> Restaurant
                                </div>
                                <div className="flex items-center mr-5">
                                  <BiSwim/> Swimming Pool
                                </div>
                                <div className="flex items-center">
                                  <button>+View More</button>
                                </div>
                              </div>
                              <div>
                                  <p className="text-l">{
                                    arrRoom[0]
                                  }
                                  </p>
                              </div>
                              <div className="flex">
                                <div className="flex text-xl items-center mr-3">
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
                                  <Buttons funcs={()=> viewDetailId(hotel.hotel_id)}>View Details</Buttons>
                                  <Buttons funcs={''}>Book Now</Buttons>
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
