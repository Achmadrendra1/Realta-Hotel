import Dashboard from '@/layouts/dashboard'
import React, { useEffect, useState } from 'react'
import { Input, Tabs } from 'antd';
import Link from 'next/link';

import { Table } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doMenuRequest } from '@/Redux/Action/Resto/restoMenuAction';

export default function restoMenu() {
  const dispatch = useDispatch();

  let menus = useSelector((state:any) => state.restoMenuReducer.restoMenus);
  
  useEffect(() => {
    dispatch(doMenuRequest());
  })

  const dataMenu = [
    {
      remeFaciId: 1,
      remeId: 1,
      remeName: 'Teh manis',
      remeDescription: 'Teh aroma melati manis',
      remePrice: 5000,
      remeStatus: 'AVAILABLE',
      remeModifiedDate: '2023-02-06',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      remeFaciId: 1,
      remeId: 1,
      remeName: 'Teh manis',
      remeDescription: 'Teh aroma melati manis',
      remePrice: 5000,
      remeStatus: 'AVAILABLE',
      remeModifiedDate: '2023-02-06',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      remeFaciId: 1,
      remeId: 1,
      remeName: 'Teh manis',
      remeDescription: 'Teh aroma melati manis',
      remePrice: 5000,
      remeStatus: 'AVAILABLE',
      remeModifiedDate: '2023-02-06',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    }
  ]

  const columnsMenu = [
    {
      title: 'remeFaciId',
      dataIndex: 'remeFaciId',
      key: '1'
    },
    {
      title: 'remeId',
      dataIndex: 'remeId',
      key: '2'
    },
    {
      title: 'remeName',
      dataIndex: 'remeName',
      key: '3'
    },
    {
      title: 'remeDescription',
      dataIndex: 'remeDescription',
      key: '4'
    },
    {
      title: 'remePrice',
      dataIndex: 'remePrice',
      key: '5'
    },
    {
      title: 'remeStatus',
      dataIndex: 'remeStatus',
      key: '6'
    },
    {
      title: 'remeModifiedDate',
      dataIndex: 'remeModifiedDate',
      key: '7'
    },
    {
      title: 'Modified',
      key: '8',
      render: (payload:any) => {
        return (
          <>
            <Link href='/Dashboard/resto/edit-menu' className='mr-2'>{payload.edit}</Link>
            <Link href='/Dashboard/resto'>{payload.delete}</Link>
          </>
        )
      }
    }
  ]

  const dataPhoto = [
    {
      rempId: 1,
      rempThumbnail: 'teh manis',
      rempPhotoFilename: 'teh manis',
      rempPrimary: 1,
      rempUrl: 'restomenuphoto/tehmanis.jpg',
      rempReme: 1,
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      rempId: 2,
      rempThumbnail: 'teh manis 2',
      rempPhotoFilename: 'teh manis 2',
      rempPrimary: 1,
      rempUrl: 'restomenuphoto/tehmanis.jpg',
      rempReme: 2,
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      rempId: 3,
      rempThumbnail: 'teh manis 3',
      rempPhotoFilename: 'teh manis3',
      rempPrimary: 1,
      rempUrl: 'restomenuphoto/tehmanis.jpg',
      rempReme: 3,
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
  ]

  const columnPhoto = [
    {
      title: 'rempId',
      dataIndex: 'rempId',
      key: '1'
    },
    {
      title: 'rempThumbnail',
      dataIndex: 'rempThumbnail',
      key: '2'
    },
    {
      title: 'rempPhotoFilename',
      dataIndex: 'rempPhotoFilename',
      key: '3'
    },
    {
      title: 'rempPrimary',
      dataIndex: 'rempPrimary',
      key: '4'
    },
    {
      title: 'rempUrl',
      dataIndex: 'rempUrl',
      key: '5'
    },
    {
      title: 'rempReme',
      dataIndex: 'rempReme',
      key: '6'
    },
    {
      title: 'modified',
      key: '7',
      render: (payload:any) => {
        return (
          <>
            <Link href='' className='mr-3'>{payload.edit}</Link>
            <Link href=''>{payload.delete}</Link>
          </>
        )
      }
    },
  ]

  const dataOrder = [
    {
      ormeUserId: 1,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      ormeUserId: 2,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      ormeUserId: 3,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      ormeUserId: 4,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      ormeUserId: 5,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      ormeUserId: 5,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
    {
      ormeUserId: 6,
      ormeOrderNumber: 'MENUS#20221127-0002',
      ormeTotalItem: 4,
      ormeTotalDiscount: 5000,
      ormeTotalAmount: 195000,
      ormePayType: 'CR',
      ormeCardnumber: '1111111111',
      ormeIsPaid: 'P',
      edit: <EditOutlined style={{ color: '#13c2c2'}}/>,
      delete: <DeleteOutlined style={{ color:'red' }} />
    },
  ]

  
  const columnOrder = [
    {
      title: 'ormeUserId',
      dataIndex: 'ormeUserId',
      key: '1'
    },
    {
      title: 'ormeOrderNumber',
      dataIndex: 'ormeOrderNumber',
      key: '2'
    },
    {
      title: 'ormeTotalItem',
      dataIndex: 'ormeTotalItem',
      key: '3'
    },
    {
      title: 'ormeTotalDiscount',
      dataIndex: 'ormeTotalDiscount',
      key: '4'
    },
    {
      title: 'ormeTotalAmount',
      dataIndex: 'ormeTotalAmount',
      key: '5'
    },
    {
      title: 'ormePayType',
      dataIndex: 'ormePayType',
      key: '6'
    },
    {
      title: 'ormeCardnumber',
      dataIndex: 'ormeCardnumber',
      key: '7'
    },
    {
      title: 'ormeIsPaid',
      dataIndex: 'ormeIsPaid',
      key: '8'
    },
    {
      title: 'modified',
      key: '9',
      render: (payload:any) => {
        return (
          <>
            <Link href="/Dashboard/resto/edit-order" className='mr-4'>{payload.edit}</Link>
            <Link href="/Dashboard/resto/delete-order">{payload.delete}</Link>
          </>
        )
      }
    }
  ]


  // // coba search
  // const [allMenus] = useState(menus);
  const [search, setSearch] = useState('');


  // console.log('all menu: ', allMenus);

  // const resultSearch = (data:any) => {
  //   return data.filter(
  //     (item:any) => {
  //       item.remeName.toLOwerCase().includes(search)
  //     }
  //   )
  // }


  return (
    <Dashboard>
      <div className=''>
        <div className=''>
          <Tabs>
            <Tabs.TabPane tab='Menu' key='menu'>
              <div className='text-2xl text-center py-3'>Resto Menu</div>
              
              <div className='my-4 px-4'>
                <div className='float-right right-0 items-right'>
                  <Link href='/Dashboard/resto/add-menu' className='bg-slate-400'>
                    <div className='bg-sky-400 hover:bg-sky-300 text-white rounded-lg py-2 w-32 text-center font-bold'>
                      Add New Menu <PlusOutlined />
                    </div>
                  </Link>
                </div>
                <Input.Search onChange={ (e:any) => setSearch(e.target.value)} placeholder='Search here..' style={{width:400}} />
              </div>
              <Table
                      dataSource={ menus }
                      columns={columnsMenu}
              >

              </Table>
            </Tabs.TabPane>

            
            <Tabs.TabPane tab='Menu Photo' key='photo'>
              <div className='text-2xl py-3 text-center'>Resto Menu Photo</div>

              
              <div className='my-4 px-4'>
                <div className='float-right right-0 items-right'>
                  <Link href='/Dashboard/resto/add-menu-photo' className='bg-slate-400'>
                    <div className='bg-sky-400 hover:bg-sky-300 text-white rounded-lg py-2 w-32 text-center font-bold'>
                      Add Menu Photo
                    </div>
                  </Link>
                </div>
                <Input.Search placeholder='Search here..' style={{width:400}} />
              </div>

              <Table
                      dataSource={dataPhoto}
                      columns={columnPhoto}
              >
              </Table>
            </Tabs.TabPane>
            
            <Tabs.TabPane tab='Order' key='order'>
              <div className='text-2xl text-center py-3'>Data Order Menu Resto</div>
              
              <div className='my-4 px-4'>
                <Input.Search placeholder='Search here..' style={{width:400}} />
              </div>

              <Table
                      dataSource={dataOrder}
                      columns={columnOrder}
              >
              </Table>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Dashboard>
  )
}
