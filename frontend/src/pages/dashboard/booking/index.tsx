import Dashboard from '@/layouts/dashboard'
import React, { useState } from 'react'
import { Space, Table, Tabs, Button, Input, Row, Col} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { ArrowsAltOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddBooking from './addBooking';
import EditBooking from './editBooking';
import AddBookingFacilities from './addBookingFacilities';
import EditBookingFacilities from './editBookingFacilites';
import AddSpecialOffers from './addSpecialOffers';
import EditSpecialOffers from './editSpecialOffers';
import Buttons from '@/components/Button';

interface DataBooking {
  key: React.Key,
  name : string,
  hotel : string,
  room : string,
  totalRoom : number,
  totalGuest : number,
  //arrivalDate : any,
  bordeCheckin : any,
  bordeCheckout : any,
  boorStatus : string,
  boorIsPaid : string
}

interface DataFacilities {
  key : React.Key,
  name : string,
  hotel : string,
  facilities : string,
  totalGuest : number,
  bordeCheckin : any,
  bordeCheckout : any,
  boorStatus : string,
  boorIsPaid : string
}

interface DataSpecialOffers {
  key : React.Key,
  spofName : string,
  spofDescription : string,
  spofType : string,
  spofDiscount : number,
  spofStartDate : any,
  spofEndDate : any,
  spofMinQty : number,
  spofMaxQty : number,
  spofModifiedDate : any
}

export default function index() {
  
  const onChange: TableProps<DataBooking>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  )=> {
    console.log("params", pagination, filters, sorter, extra)
  }
  
  const { Search } = Input
  const onSearch = (value: string) => console.log(value)

  
  const [addBookingOpen, setAddBookingOpen] = useState(false)
  const [editBookingOpen, setEditBookingOpen] = useState(false)
  
  const [addBookingFacilitiesOpen, setAddBookingFacilitiesOpen] = useState(false)
  const [editBookingFacilitiesOpen, setEditBookingFacilitiesOpen] = useState(false)

  const [addSpecialOffersOpen, setAddSpecialOffersOpen] = useState(false)
  const [editSpecialOffersOpen, setEditSpecialOffersOpen] = useState(false)
  
  const editDataBooking = () => {
    setEditBookingOpen(true)
  }

  const editDataBookingFacilities = () => {
    setEditBookingFacilitiesOpen(true)
  }

  const editDataSpecialOffers = () => {
    setEditSpecialOffersOpen(true)
  }

  const handleOk = () => {
      setAddBookingOpen(false),
      setEditBookingOpen(false),
      setAddBookingFacilitiesOpen(false),
      setEditBookingFacilitiesOpen(false),
      setAddSpecialOffersOpen(false),
      setEditSpecialOffersOpen(false)
  }

  const handleCancel = () => {
      setAddBookingOpen(false),
      setEditBookingOpen(false),
      setAddBookingFacilitiesOpen(false),
      setEditBookingFacilitiesOpen(false)
      setAddSpecialOffersOpen(false),
      setEditSpecialOffersOpen(false)
  }
  
  const columnsBooking: ColumnsType<DataBooking> = [
    {
      title : 'Name',
      dataIndex : 'name',
      sorter : {
        compare : (a, b) => (a.name < b.name ? -1 : 1)
      }
    },
    {
      title: 'Hotel',
      dataIndex: 'hotel',
      sorter : {
        compare : (a, b) => (a.hotel < b.hotel ? -1 : 1)
      }
    },
    {
      title: 'Room',
      dataIndex: 'room',
      sorter : {
        compare : (a, b) => (a.room < b.room ? -1 : 1)
      }
    },
    {
      title: '#Room',
      dataIndex: 'totalRoom',
      sorter : {
        compare : (a, b) => a.totalRoom - b.totalRoom
      }
    },
    {
      title: '#Guest',
      dataIndex: 'totalGuest',
      sorter : {
        compare : (a, b) => a.totalGuest - b.totalGuest
      }
    },
    {
      title: 'Check-in',
      dataIndex: 'bordeCheckin',
      sorter : {
        compare : (a, b) => a.bordeCheckin - b.bordeCheckin
      }
    },    
    {
      title: 'Check-out',
      dataIndex: 'bordeCheckout',
      sorter : {
        compare : (a, b) => a.bordeCheckout - b.bordeCheckout
      }
    },
    {
      title: 'Status',
      dataIndex: 'boorStatus',
      sorter : {
        compare : (a, b) => (a.boorStatus < b.boorStatus ? -1 : 1)
      }
    },
    {
      title: 'Payment',
      dataIndex: 'boorIsPaid',
      sorter : {
        compare : (a, b) => (a.boorIsPaid < b.boorIsPaid ? -1 : 1)
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record : any) => {
        return (
          <>
        <Space size="middle">
            <ArrowsAltOutlined/>
            <EditOutlined onClick={()=>editDataBooking()}/>
            <DeleteOutlined/>
        </Space>
          </>
        )
      }
    },
  ]
  
  const dataBooking: DataBooking[] = [
    {
      key : '1',
      name: 'Dimas Masdim',
      hotel: 'Realta Hotel - Brebes',
      room: 'Superior Double Bed',
      totalRoom: 1,
      totalGuest : 2,
      bordeCheckin : '13-12-2022',
      bordeCheckout : '13-3-2023',
      boorStatus : 'Check-In',
      boorIsPaid : 'Paid'
    },
    {
      key : '2',
      name: 'Ramanda Syahroel',
      hotel: 'Realta Hotel - Padang',
      room: 'Executive Suite',
      totalRoom: 2,
      totalGuest : 4,
      bordeCheckin : '15-12-2022',
      bordeCheckout : '15-3-2023',
      boorStatus : 'Check-out',
      boorIsPaid : 'Refund'
    },
  ]

  const columnsFacilities : ColumnsType<DataFacilities> = [
    {
      title : 'Name',
      dataIndex : 'name',
      sorter : {
        compare : (a,b) => (a.name < b.name ? -1 : 1)
      }
    },
    {
      title : 'Hotel',
      dataIndex : 'hotel',
      sorter : {
        compare : (a,b) => (a.hotel < b.hotel ? -1 : 1)
      }
    },
    {
      title : 'Facilities',
      dataIndex : 'facilities',
      sorter : {
        compare : (a,b) => (a.facilities < b.facilities ? -1 : 1)
      }
    },
    {
      title : '#Guest',
      dataIndex : 'totalGuest',
      sorter : {
        compare : (a,b) => (a.totalGuest - b.totalGuest)
      }
    },
    {
      title : 'Check-in',
      dataIndex : 'bordeCheckin',
      sorter : {
        compare : (a,b) => (a.bordeCheckin < b.bordeCheckin ? -1 : 1)
      }
    },
    {
      title : 'Check-out',
      dataIndex : 'bordeCheckout',
      sorter : {
        compare : (a,b) => (a.bordeCheckout < b.bordeCheckout ? -1 : 1)
      }
    },
    {
      title : 'Status',
      dataIndex : 'boorStatus',
      sorter : {
        compare : (a,b) => (a.boorStatus < b.boorStatus ? -1 : 1)
      }
    },
    {
      title : 'Payment',
      dataIndex : 'boorIsPaid',
      sorter : {
        compare : (a,b) => (a.boorIsPaid < b.boorIsPaid ? -1 : 1)
      }
    },
    {
      title : 'Action',
      key : 'action',
      render: (record : any) => {
        return (
          <Space size='middle'>
              <ArrowsAltOutlined/>
              <EditOutlined onClick={()=>editDataBookingFacilities()}/>
              <DeleteOutlined/>
          </Space>
        )
      }
    }
  ]

  const dataFacilities : DataFacilities[] = [
    {
      key : 1,
      name : 'Farid Ex Machina',
      hotel : 'Hotel Realta - Pekanbaru',
      facilities : 'Gym',
      totalGuest : 2,
      bordeCheckin : '17-12-2022',
      bordeCheckout : '21-03-2023',
      boorStatus : 'Checkin',
      boorIsPaid : 'Refund'
    },
    {
      key : 2,
      name : 'Naufal Ex Machina',
      hotel : 'Hotel Realta - Surabaya',
      facilities : 'Swimming Pool',
      totalGuest : 2,
      bordeCheckin : '19-01-2023',
      bordeCheckout : '08-03-2023',
      boorStatus : 'Checkout',
      boorIsPaid : 'Paid'
    }
  ]

  const columnsSpecialOffers : ColumnsType<DataSpecialOffers> = [
    {
      title : 'Special Offers Name',
      dataIndex : 'spofName',
      sorter : {
        compare : (a,b) => (a.spofName < b.spofName ? -1 : 1)
      }
    },
    {
      title : 'Special Offers Description',
      dataIndex : 'spofDescription',
      sorter : {
        compare : (a,b) => (a.spofDescription < b.spofDescription ? -1 : 1)
      }
    },
    {
      title : 'Special Offers Type',
      dataIndex : 'spofType',
      sorter : {
        compare : (a,b) => (a.spofType < b.spofType ? -1 : 1)
      }
    },
    {
      title : 'Special Offers Discount',
      dataIndex : 'spofDiscount',
      sorter : {
        compare : (a,b) => (a.spofDiscount - b.spofDiscount)
      }
    },
    {
      title : 'Special Offers Start Date',
      dataIndex : 'spofStartDate',
      sorter : {
        compare : (a,b) => (a.spofStartDate < b.spofStartDate ? -1 : 1)
      }
    },
    {
      title : 'Special Offers End Date',
      dataIndex : 'spofEndDate',
      sorter : {
        compare : (a,b) => (a.spofEndDate < b.spofEndDate ? -1 : 1)
      }
    },
    {
      title : 'Special Offers Min Qty',
      dataIndex : 'spofMinQty',
      sorter : {
        compare : (a,b) => (a.spofMinQty - b.spofMinQty)
      }
    },
    {
      title : 'Special Offers Max Qty',
      dataIndex : 'spofMaxQty',
      sorter : {
        compare : (a,b) => (a.spofMaxQty - b.spofMaxQty)
      }
    },
    {
      title : 'Modified Date',
      dataIndex : 'spofModifiedDate',
      sorter : {
        compare : (a,b) => (a.spofModifiedDate < b.spofModifiedDate ? -1 : 1)
      }
    },
    {
      title : 'Action',
      key : 'action',
      render: (record : any) => {
        return (
          <Space size='middle'>
              <EditOutlined onClick={()=>editDataSpecialOffers()}/>
              <DeleteOutlined/>
          </Space>
        )
      }
    }
  ]

  const dataSpecialOffers : DataSpecialOffers[] = [
    {
      key : 1,
      spofName : 'Special Offers Imlek 2023',
      spofDescription : 'Special Offers Imlek 2023',
      spofType : 'Individual',
      spofDiscount : 2000000,
      spofStartDate : '14-01-2023',
      spofEndDate : '24-01-2023',
      spofMinQty : 0,
      spofMaxQty : 10,
      spofModifiedDate : '14-01-2023'
    },
    {
      key : 2,
      spofName : 'Special Offers Idul Fitri 2023',
      spofDescription : 'Special Offers Idul Fitri 2023',
      spofType : 'Corporate',
      spofDiscount : 2500000,
      spofStartDate : '15-03-2023',
      spofEndDate : '25-03-2023',
      spofMinQty : 0,
      spofMaxQty : 25,
      spofModifiedDate : '17-02-2023'
    }
  ] 

  return (
    <Dashboard>
      {addBookingOpen ? <AddBooking showBooking={addBookingOpen} clickOkBooking={handleOk} clickCancelBooking={handleCancel}/> : null}
      {editBookingOpen ? <EditBooking showBooking={editBookingOpen} clickOkBooking={handleOk} clickCancelBooking={handleCancel}/> : null}
      {addBookingFacilitiesOpen ? <AddBookingFacilities showBookingFacilities={addBookingFacilitiesOpen} clickOkBookingFacilities={handleOk} clickCancelBookingFacilities={handleCancel}/> : null}
      {editBookingFacilitiesOpen ? <EditBookingFacilities showBookingFacilities={editBookingFacilitiesOpen} clickOkBookingFacilities={handleOk} clickCancelBookingFacilities={handleCancel}/> : null} 
      {addSpecialOffersOpen ? <AddSpecialOffers showSpecialOffers={addSpecialOffersOpen} clickOkSpecialOffers={handleOk} clickCancelSpecialOffers={handleCancel}/> : null}
      {editSpecialOffersOpen ? <EditSpecialOffers showSpecialOffers={editSpecialOffersOpen} clickOkSpecialOffers={handleOk} clickCancelSpecialOffers={handleCancel}/> : null}
      {}
          <Tabs>
            <Tabs.TabPane tab='Rooms' key='1'>
              <div className='text-2xl text-center py-3'>
                Hotel Rooms
              </div>
              <div className='my-3'>
                  <Row>
                    <Col span={12}>
                        <Buttons funcs={()=>setAddBookingOpen(true)}>Book Now</Buttons>
                    </Col>
                    <Col span={12}>
                        <Search className='my-3 float-right' placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
                    </Col>
                  </Row>
              </div>
              <Table columns={columnsBooking} dataSource={dataBooking} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Facilities' key='2'>
              <div className='text-2xl text-center py-3'>
                Hotel Facilities
              </div>
              <div className='my-3'>
                  <Row>
                    <Col span={12}>
                    <Buttons funcs={()=>setAddBookingFacilitiesOpen(true)}>Book Facilities Now</Buttons>
                    </Col>
                    <Col span={12}>
                        <Search className='my-3 float-right' placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
                    </Col>
                  </Row>
              </div>
              <Table columns={columnsFacilities} dataSource={dataFacilities} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Special Offers' key='3'>
              <div className='text-2xl text-center py-3'>
                  Special Offers
              </div>
              <div className='my-3'>
                  <Row>
                    <Col span={12}>
                      <Buttons funcs={()=>setAddSpecialOffersOpen}>Add Special Offers</Buttons>
                    </Col>
                    <Col span={12}>
                        <Search className='my-3 float-right' placeholder='input search text' allowClear onSearch={onSearch} style={{ width : 200}}/>
                    </Col>
                  </Row>
              </div>
              <Table columns={columnsSpecialOffers} dataSource={dataSpecialOffers} onChange={onChange} />
            </Tabs.TabPane>
          </Tabs>
    </Dashboard>
  )
}
