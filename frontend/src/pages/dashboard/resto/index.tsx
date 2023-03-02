import Dashboard from '@/layouts/dashboard'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Input, Menu, MenuProps, Modal, Pagination, Select, Space, Switch, Tabs, Upload } from 'antd';
import Link from 'next/link';

import { Table } from 'antd'
import { CloseOutlined, DeleteOutlined, DownOutlined, EditOutlined, InboxOutlined, MoreOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doAddMenu, doDeleteMenu, doMenuRequest, doUpdateMenu } from '@/Redux/Action/Resto/restoMenuAction';
import axios from 'axios';
import { API } from '@/Redux/Configs/consumeApi';
import { useRouter } from 'next/router';
import { configuration } from '@/Redux/Configs/url';
import { doAddPhoto, doDeletePhoto, doGetPhoto, doUpdatePrimary } from '@/Redux/Action/Resto/menuPhotoAction';

import dayjs from 'dayjs';
import 'dayjs/locale/id'; // impor lokalisasi untuk bahasa Indonesia
import Buttons from '@/components/Button';
import { doRestoRequest } from '@/Redux/Action/Resto/restoAction';
import { doGetUser } from '@/Redux/Action/User/GetDataUser';
import Unauthorized from '@/components/Unauthorized';

export default function restoMenu() {
  const dispatch = useDispatch();

  let photos = useSelector((state: any) => state.menuPhotoReducer.menuPhoto);
  let menus = useSelector((state: any) => state.restoMenuReducer.restoMenus);
  let list_restaurant = useSelector((state: any) => state.restoReducer.resto);
  let user = useSelector((state: any) => state.GetUserReducer.getUser);
  let role = user[0]?.role_name;

  // console.log(user);
  useEffect(() => {
    dispatch(doGetUser())
  },[user])
  
  useEffect(() => {
    dispatch(doMenuRequest());
    dispatch(doGetPhoto());
    dispatch(doRestoRequest())

  }, [menus])


  // console.warn('ini photos: ', photos); // isi photos semua file di resto menu photos
  // console.warn('ini menus:', menus);

  // photos.map( (photo:any, index:number) => {
  //   console.warn(photo.rempUrl, ' ke ' , index);

  // })


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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      edit: <EditOutlined style={{ color: '#13c2c2' }} />,
      delete: <DeleteOutlined style={{ color: 'red' }} />
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
      render: (payload: any) => {
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


  let [search, setSearch] = useState('');

  // ------------------------------------------------------------------------------------- EDIT MENU

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showEdit = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = (e: any) => {
    console.warn('ini onfinish', e);
    e.preventDefault()

    console.warn()
    console.log(e.target.rempurl);

  }




  let [getMenu, setGetMenu] = useState({
    remeFaciId: 0,
    remeId: 0,
    remeName: '',
    remeDescription: '',
    remePrice: 0,
    remeStatus: ''
  })

  // console.log('getMenu',getMenu);
  const editMenu = async (id: number) => {
    showEdit()
    // debugger;
    // const data = await axios(API('Get',`/resto-menus/${id}`, null))
    await axios(API('Get', `/resto-menus/${id}`, null))
      .then((res: any) => {
        // console.warn(res.data);
        setGetMenu({
          // res.data
          ...getMenu,
          remeFaciId: res.data.remeFaciId,
          remeId: res.data.remeId,
          remeName: res.data.remeName,
          remeDescription: res.data.remeDescription,
          remePrice: res.data.remePrice,
          remeStatus: res.data.remeStatus,
        })
        // console.log(getMenu.remeName, ": ini nama menu stlh get")

      })
      .catch((err) => alert(err))
    // console.log(data.data.remeName,'ini data')
  }

  const [addMenu, setAddMenu] = useState({
    remeFaciId: 0,
    remeName: '',
    remeDescription: '',
    remePrice: 0,
    remeStatus: 'EMPTY'
  });


  const eventHandler = (nama: any) => (event: any) => {
    setAddMenu({ ...addMenu, [nama]: event.target.value })
    setGetMenu({ ...getMenu, [nama]: event.target.value })
  }

  const handleSelection = (selected: any, nama: any) => {
    // console.log([nama][0])
    setGetMenu({
      ...getMenu,
      remeFaciId: selected
    })
    setAddMenu({
      ...addMenu,
      remeFaciId: selected
    })
  }


  const handleSelection2 = (selected: any, nama: any) => {
    // console.log([nama][0])
    setGetMenu({
      ...getMenu,
      remeStatus: selected
    })
    setAddMenu({
      ...addMenu,
      remeStatus: selected
    })
  }


  const handleUpdateMenu = (e: any) => {
    e.preventDefault();
    dispatch(doUpdateMenu(getMenu))
    // buat nutup modal
    setIsModalOpen(false)
  }


  // console.warn('ini id faci',getMenu.remeFaciId, ' reme name ' , getMenu.remeName)

  // ------------------------------------------------------------------------------------- ADD MENU
  const [isModalAddMenu, setIsModalAddMenu] = useState(false);
  const showAddMenu = () => {
    setIsModalAddMenu(true)
  }
  const handleAddMenu = (e: any) => {
    console.log('ini add menu di handle add menu: ', addMenu)
    e.preventDefault();
    // disini tambahin id menunya, diambil dari db
    // dispatch(doAddMenu(addMenu))
    setIsModalAddMenu(false)
  }
  const handleCancelAddMenu = () => {
    setIsModalAddMenu(false)
  }

  // ------------------------------------------------------------------------------------- DELETE MENU
  const router = useRouter();


  const deleteMenu = (id: number) => {
    dispatch(doDeleteMenu(id));
    router.push('/Dashboard/resto')
  }

  let [addImage, setAddImage] = useState([])
  const [isModalPhoto, setIsModalPhoto] = useState(false);
  let [getPhoto, setGetPhoto] = useState({
    remeFaciId: 0,
    remeId: 0,
    remeName: '',
    remeDescription: '',
    remePrice: 0,
    remeStatus: '',
    rempUrl: ''
  })

  // console.log(getPhoto,' ini get photo')

  const showPhotoMenu = () => {
    setIsModalPhoto(true)
  }

  let [viewPhoto, setViewPhoto] = useState([]);
  // let newPhoto:any = [];
  // photos.map( (photo:any, index:number) => {
  //   // console.warn(photo.rempUrl, ' ke ' , index);
  //   let rowPhoto = {rempId: photo.rempId, rempUrl: `${configuration.BASE_URL}/${photo.rempurl}`}
  //     // console.warn(photo.rempurl, ' satu satu');
  //     newPhoto.push(rowPhoto);
  // })

  // setViewPhoto([...newPhoto]);

  // console.warn('ini view photo ', viewPhoto);


  // function photoMenu(data:any){

  // }




  // waktu di klik ... di tabel
  // menampilkan deretan photo yang nama menunya sama
  const photoMenu = async (data: any) => {
    console.warn(data, ' ini dataa')
    showPhotoMenu(); // menampilkan modal

    const result = await axios(API('Get', `/resto-menu-photos/${data.reme_id}`, null));
    // console.warn('result', result.data);  // ini untuk mengetahui list foto yang bisa ditampilkan
    let photos = result.data;
    // ambil tiap baris photonya (get 1 row) lalu push ke array di viewPhoto

    // for(let i=0; i<result.data.length; i++){
    //   console.warn(result.data[0].rempurl, ' satu satu');

    //   setViewPhoto([...viewPhoto, result.data[i].rempurl])
    // }

    let migratePhoto: any = [];
    photos.map((photo: any) => {
      console.warn('ini photo ', photo.rempid);

      let newDataPhoto = { rempId: photo.rempid, rempUrl: `${configuration.BASE_URL}/${photo.rempurl}` }
      // console.warn(photo.rempurl, ' satu satu');
      migratePhoto.push(newDataPhoto)
    })
    // console.warn(migratePhoto, 'migrate photo');

    setViewPhoto([...migratePhoto]);

    // console.warn('ini view photo ', viewPhoto);


    let urlPhoto = '';
    // kalau url ada, isi url. kalau gaada kosongin aja (defaultnya null kan)


    if (result.data.length !== 0) {
      urlPhoto = `${configuration.BASE_URL}/${result.data[0].rempurl}`;
    }


    setGetPhoto({
      remeFaciId: data.faci_id,
      remeId: data.reme_id,
      remeName: data.reme_name,
      remeDescription: data.reme_description,
      remePrice: data.reme_price,
      remeStatus: data.reme_status,
      rempUrl: urlPhoto
    })


  }

  // viewPhoto.map( (photo) => {
  //   console.warn('coba map 1: ', photo);

  // })


  // console.warn('view photo di luar ', viewPhoto);

  // console.warn(getPhoto, ' ini get photo');
  const handlePhoto = (e: any) => {
    // console.log('ini get menu: ', getMenu)
    e.preventDefault();
    // disini tambahin id menunya, diambil dari db
    // dispatch(doAddMenu(getMenu))
    setIsModalPhoto(false)
  }
  const handleCancelPhoto = () => {
    setIsModalPhoto(false)
  }


  // const normFile = (e: any) => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

  // const [image, setImage] = useState("https://fakeimg.pl/350x200");

  // const [image, setImage] = useState([]);


  // let gambar:any = [];

  let [insertPhoto, setInsertPhoto] = useState({
    rempThumbnailFilename: '',
    rempPrimary: 0,
    rempUrl: '',
    remeId: 0
  });

  // menampilkan gambar ke layar user
  let [image, setImage] = useState('');

  // menginput data gambar ke backend
  let [imageInput, setImageInput] = useState('');


  // mengubah input type file untuk gambar
  function handleUploadChange(e: any) {
    // console.log(e.target.files[0]);

    // input data ke BE nantinya
    let uploaded = e.target.files[0];
    setImageInput(uploaded);

    const fileReader = new FileReader();
    fileReader.onload = function (event: any) {
      setImage(event.target.result);
    };
    fileReader.readAsDataURL(uploaded)


    // let url = URL.createObjectURL(uploaded);
    // console.log('ini url: ', url);
    // setImage(URL.createObjectURL(uploaded))
    // // gambar.push(url)
    // // setAddImage([...addImage, url])


    setGetPhoto({
      ...getPhoto,
      rempUrl: uploaded
    });

    setInsertPhoto({
      rempThumbnailFilename: getPhoto.remeName,
      rempPrimary: 0,
      rempUrl: uploaded,
      remeId: getPhoto.remeId

    })
    // setAddImage([...addImage, url])
  }
  // console.log('ini gambar: ', addImage);

  function saveNewPhoto(e: any) {
    e.preventDefault();
    const form = new FormData();
    form.append('rempThumbnailFilename', insertPhoto.rempThumbnailFilename);
    form.append('rempPrimary', insertPhoto.rempPrimary.toString());
    form.append('rempUrl', imageInput);
    form.append('remeId', insertPhoto.remeId.toString());

    axios.post('http://localhost:3500/resto-menu-photos', form, {
      headers: {
        'constant-type': 'multipart/form-data'
      }
    })
      .then((res: any) => {
        console.warn('post success ', res);
      })
      .catch((err: any) => {
        console.warn('error ', err);

      })

    // console.warn('ini addImage: ', addImage[0]);

    // setGetPhoto({
    //   ...getPhoto,
    //   rempUrl: addImage[0]
    // });

    // console.warn('ini getPhoto.rempUrl', getPhoto.rempUrl);


    // dispatch(doAddPhoto(form))

    setIsModalPhoto(false);
    // panggil add menu photo saga
  }

  // -------------------------------------------- DELETE PHOTO
  function deletePhoto(id: number) {
    dispatch(doDeletePhoto(id))
    setisThumbnail(false);
  }

  // console.log('ini get menu: ', getMenu)
  const [form] = Form.useForm()

  // switch menu available or not
  let [available, setAvailable] = useState('EMPTY')

  // console.log('available',available);

  // let status = false;
  const switchMenu = (checked: boolean) => {
    if (checked == true) {
      setAddMenu({ ...addMenu, remeStatus: 'AVAILABLE' })
      setGetMenu({ ...getMenu, remeStatus: 'AVAILABLE' })
      // setAvailable('AVAILABLE');
    } else {
      setAddMenu({ ...addMenu, remeStatus: 'EMPTY' })
      setGetMenu({ ...getMenu, remeStatus: 'EMPTY' })
      // setAvailable('EMPTY');
    }

    // setAddMenu({...addMenu, remeStatus:available})
  };

  // console.log('addmenu', addMenu);

  // console.log(photos);
  // --------------------------------------------------------------------------------------- PAGINATION LIST PHOTO 
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageListPhoto = (page: any) => {
    setCurrentPage(page);
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = photos.slice(startIndex, endIndex);


  // --------------------------------------------------------------------------------------- THUMBNAIL PHOTO 

  const [isThumbnail, setisThumbnail] = useState(false);
  const [viewThumbnailPhoto, setViewThumbnailPhoto] = useState([]); // all photo not primary
  const [thumbnail, setThumbnail] = useState({
    remename: '',
    rempid: 0,
    rempphotofilename: '',
    rempprimary: '',
    rempreme: '',
    rempthumbnailfilename: '',
    rempurl: ``
  })  // photo primary

  const [newPrimary, setNewPrimary] = useState({
    remename: '',
    rempid: 0,
    rempphotofilename: '',
    rempprimary: '0',
    rempreme: '',
    rempthumbnailfilename: '',
    rempurl: ``
  })

  const thumbnailMenu = async (reme: any) => {
    setisThumbnail(true);
    const result = await axios(API('Get', `/resto-menu-photos/${reme.reme_id}`, null));
    let photos = result.data;

    // isi semua data yang bukan primary
    let migratePhoto: any = [];
    photos.map((photo: any) => {
      // if (photo.rempprimary == '1') {
      let newDataPhoto = {
        remename: photo.rempname,
        rempid: photo.rempid,
        rempphotofilename: photo.rempphotofilename,
        rempprimary: '0',
        rempreme: photo.rempreme,
        rempthumbnailfilename: photo.rempthumbnailfilename,
        rempurl: `${configuration.BASE_URL}/${photo.rempurl}`
      }
      migratePhoto.push(newDataPhoto)
      // } else {
      if (photo.rempprimary == '1') {
        setNewPrimary({
          remename: photo.rempname,
          rempid: photo.rempid,
          rempphotofilename: photo.rempphotofilename,
          rempprimary: '1',
          rempreme: photo.rempreme,
          rempthumbnailfilename: photo.rempthumbnailfilename,
          rempurl: `${configuration.BASE_URL}/${photo.rempurl}`
        })
      }
    })
    setViewThumbnailPhoto(migratePhoto)


  }

  function handleCancelThumbnail() {
    setisThumbnail(false);
  }

  function setPrimary(photo: any) {
    setNewPrimary({
      remename: photo.rempname,
      rempid: photo.rempid,
      rempphotofilename: photo.rempphotofilename,
      rempprimary: '1',
      rempreme: photo.rempreme,
      rempthumbnailfilename: photo.rempthumbnailfilename,
      rempurl: photo.rempurl
    })

  }

  function updatePhoto() {
    let newPhotoPrimary: any = [];

    viewThumbnailPhoto.map((listphoto: any) => {
      // kalau datanya sama berarti input yang primarynya 1 (newPrimary)
      if (listphoto.rempid == newPrimary.rempid) {
        newPhotoPrimary.push(newPrimary);
      } else {
        newPhotoPrimary.push(listphoto)
      }
    })

    dispatch(doUpdatePrimary(newPhotoPrimary))

    // console.log('newPhotoPrimary',newPhotoPrimary);

    setisThumbnail(false);

  }
  // console.log(role);
  
  return (
    <>
      {
        role == 'Manager' || role == 'Admin' ?

          <Dashboard>
            {/* <Tabs> */}
            {/* TABEL MENU */}
            {/* <Tabs.TabPane tab='Menu' key='menu'> */}
            <div className='text-2xl text-center py-3 font-bold'>Resto Menu</div>

            <div className='my-4 px-4'>
              <div className='float-right right-0 items-right'>
                {/*<a className='bg-slate-400' onClick={showAddMenu}>
                 <div className='bg-sky-600 hover:bg-sky-500 text-white rounded-md p-3 w-32 text-center font-bold'> */}
                <Buttons funcs={showAddMenu}>
                  <PlusOutlined /> Add Menu
                </Buttons>
                {/* </div>
              </a> */}
              </div>
              <Input.Search value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder='Search here..' style={{ width: 400 }} />
            </div>

            <Table dataSource={menus} className='py-4'>
              <Table.Column title='ID' dataIndex='reme_id' key='reme_id'
                filteredValue={[search]} onFilter={(value: any, record: any) => {
                  return String(record.reme_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.hotel_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.faci_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.reme_price).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.reme_description).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.reme_status).toLowerCase().includes(value.toLowerCase())
                }}
              />
              <Table.Column title='Hotel Name' dataIndex='hotel_name' key='hotel_name' />
              <Table.Column title='Facility' dataIndex='faci_name' key='faci_name' />
              <Table.Column title='Menu' dataIndex='reme_name' key='reme_name' />
              <Table.Column title='Price' dataIndex='reme_price' key='reme_price' render={((rp) => { return rp.replace('$', 'Rp.') })} />
              <Table.Column title='Description' dataIndex='reme_description' key='reme_description' />
              <Table.Column title='Status' dataIndex='reme_status' key='reme_status' />
              <Table.Column title='Modified Date' dataIndex='reme_modified_date' key='reme_modified_date' render={(dateString) => {
                const formattedDate = dayjs(dateString).locale('id').format('DD MMMM YYYY');
                return formattedDate;
              }}
              />
              <Table.Column title="Action" key="action"
                render={(_: any, record: any) => (

                  <Space size="middle">
                    {/* <Button onClick={() => editMenu(record.reme_id)}>Edit</Button>
                  <Button onClick={() => deleteMenu(record.reme_id)}>Delete</Button> */}

                    <Dropdown overlay={
                      <Menu>
                        <Menu.Item key={'edit'} onClick={() => editMenu(record.reme_id)}>Edit Menu</Menu.Item>
                        <Menu.Item key={'add'} onClick={() => photoMenu(record)}>Upload photo</Menu.Item>
                        <Menu.Item key={'update'} onClick={() => thumbnailMenu(record)}>Edit Photo Menu</Menu.Item>
                      </Menu>
                    }
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <MoreOutlined />
                        </Space>
                      </a>
                    </Dropdown>


                    {/* <Select value="Select option">
                    <Select.Option value={'edit'} onClick={() => editMenu(record.reme_id)} className='w-48'>Edit</Select.Option>
                    <Select.Option value={'upload'} onClick={() => photoMenu(record.reme_id)}>Upload Photo</Select.Option>
                  </Select> */}

                    {/* <Button onClick={() => photoMenu(record)}><MoreOutlined /></Button> */}
                  </Space>
                )}
              />
            </Table>
            {/* 
          ----------------------SEBELUMNYA PAKE INI TAPI GA BISA BUAT KOLOM MODIFIED
          <Table
                  dataSource={ menus }
                  columns={columnsMenu}
          >
          </Table> */}
            {/* ------------------------------------------------------------------------------------- MODALS EDIT MENU */}
            <Modal
              title="Update Menu"
              open={isModalOpen}
              onOk={handleUpdateMenu}
              onCancel={handleCancel}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancel}>Cancel</Button>
                  <Button key="submit" onClick={handleUpdateMenu}>Update Menu</Button>
                </>
              ]}

            >
              <Form
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                className="mx-auto"
              >
                <p className='text-center text-xl py-5 font-bold'>
                  Update Menu Resto
                </p>
                <>
                  <Form.Item name="remeFaciId" label="Facility"
                    rules={[{ required: true, message: 'Please select restaurant!!' }]}>
                    <Select value={getMenu.remeFaciId} onChange={(e) => handleSelection(e, 'remeFaci')}>
                      <>
                        {
                          list_restaurant.map((resto: any) => (
                            <Select.Option value={resto.faci_id} >{resto.hotel_name} - {resto.faci_name}</Select.Option>

                          ))
                        }
                      </>
                      {/* <Select.Option value={1} >1</Select.Option>
                  <Select.Option value={2} >2</Select.Option>
                  <Select.Option value={3} >3</Select.Option> */}
                    </Select>
                    {/* <select value={(getMenu.remeFaciId).toString()} placeholder={(getMenu.remeFaciId).toString()} onChange={eventHandler('remeFaciId')}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select> */}
                  </Form.Item>

                  <Form.Item
                    name={"remeName"} label='Name Menu'
                    rules={[{ required: true, message: 'Please input name menu!' }]}
                  >
                    <Input type="text" value={getMenu.remeName} onChange={eventHandler('remeName')} />
                    <p className='pl-3 text-slate-500'>Previous: {getMenu.remeName}</p>

                    {/* <Input type="text" onChange={eventHandler('remeName')} /> */}
                    {/* <Input /> */}
                    {/* <Input value={getMenu.remeName} /> */}

                  </Form.Item>

                  <Form.Item
                    name="remeDescription" label='Description'
                    rules={[{ required: true, message: 'Please input description!' }]}
                  >
                    {/* <textarea rows={3} value={getMenu.remeDescription} onChange={eventHandler('remeDescription')} > </textarea> */}
                    <Input.TextArea onChange={eventHandler('remeDescription')} rows={3} value={getMenu.remeDescription} />
                    <p className='pl-3 text-slate-500'>Previous: {getMenu.remeDescription}</p>
                  </Form.Item>


                  <Form.Item
                    name="remePrice" label='Price'
                    rules={[{ required: true, message: 'Please input price!' }]}
                  >
                    <Input onChange={eventHandler('remePrice')} value={(getMenu.remePrice).toString()} />
                    <p className='pl-3 text-slate-500'>Previous: {getMenu.remePrice}</p>
                  </Form.Item>

                  <Form.Item
                    name="remeStatus" label='Status'
                    rules={[{ required: true, message: 'Please select status!' }]}
                  >

                    <Switch onChange={switchMenu} className='bg-slate-400' />
                    <p className='pl-3 text-slate-500'>Previous: {getMenu.remeStatus}</p>

                    {/* <Select placeholder={getMenu.remeStatus} onChange={(e) => handleSelection2(e, 'remeStatus')}>
                    <Select.Option value='AVAILABLE'>AVAILABLE</Select.Option>
                    <Select.Option value='EMPTY'>EMPTY</Select.Option>
                  </Select> */}
                  </Form.Item>
                </>
                {/* <div className='flex justify-center'>
                <Link href=''>
                  <div className='bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-2 w-40 text-center'>
                      Update Menu
                  </div>
                </Link>
              </div> */}
              </Form>

            </Modal>

            {/* </Tabs.TabPane> */}

            {/* TABEL MENU PHOTO */}
            {/* <Tabs.TabPane tab='List Photo' key='photo'> */}
            {/* <p className='text-xl font-bold'>List photo resto menu</p>

          <div>
            {
              currentData.map((photo: any) => (
                <div className='border rounded-lg shadow my-4'>
                  <p>Remp id: {photo.remp_id}</p>
                  <p>Reme id: {photo.remp_reme_id}</p>
                  <p>Remp rempPhotoFilename: {photo.remp_photo_filename}</p>
                  <p>rempPrimary: {photo.remp_primary}</p>
                  <p>
                    rempUrl: {configuration.BASE_URL + photo.remp_url}
                    <img src={configuration.BASE_URL + "/" + photo.remp_url} alt={photo.remp_thumbnail_filename} className='h-48' />
                  </p>
                </div>
              ))
            }
          </div>

          <Pagination onChange={handlePageListPhoto} current={currentPage} pageSize={10} total={photos.length}></Pagination> */}


            {/*// ------------------------------------------------------------------ mnu photo awal
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
          </Table> */}
            {/* </Tabs.TabPane> */}
            {/* TABEL ORDER */}
            {/* <Tabs.TabPane tab='Order' key='order'> */}
            {/* <div className='text-2xl text-center py-3'>Data Order Menu Resto</div>

          <div className='my-4 px-4'>
            <Input.Search placeholder='Search here..' style={{ width: 400 }} />
          </div>

          <Table
            dataSource={dataOrder}
            columns={columnOrder}
          >
          </Table> */}
            {/* </Tabs.TabPane> */}
            {/* </Tabs> */}
            {/* -------------------------------------------- MODAL ADD MENU */}
            <Modal
              title="Add Menu"
              open={isModalAddMenu}
              onOk={handleAddMenu}
              onCancel={handleCancelAddMenu}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancel}>Cancel</Button>
                  <Button key="submit" onClick={handleAddMenu}>Add Menu</Button>
                </>
              ]}

            >
              <Form
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                className="mx-auto"
              >
                <p className='text-center text-xl py-5 font-bold'>
                  Add Menu Resto
                </p>
                <>
                  <Form.Item name="remeFaciId" label="Facility"
                    rules={[{ required: true, message: 'Please select restaurant!!' }]}>
                    <Select placeholder={'Select restaurant'} onChange={(e) => handleSelection(e, 'remeFaci')} value={list_restaurant.faci_name}>
                      {
                        list_restaurant.map((resto: any) => (
                          <Select.Option value={resto.faci_id}>{resto.faci_name} - {resto.hotel_name}</Select.Option>
                        ))
                      }
                    </Select>
                    {/* <select value={(getMenu.remeFaciId).toString()} placeholder={(getMenu.remeFaciId).toString()} onChange={eventHandler('remeFaciId')}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select> */}
                  </Form.Item>

                  <Form.Item
                    name={"remeName"} label='Name Menu'
                    rules={[{ required: true, message: 'Please input name menu!' }]}
                  >
                    <Input type="text" onChange={eventHandler('remeName')} />
                    {/* <Input /> */}
                    {/* <Input value={getMenu.remeName} /> */}

                  </Form.Item>

                  <Form.Item
                    name="remeDescription" label='Description'
                    rules={[{ required: true, message: 'Please input description!' }]}
                  >
                    {/* <textarea rows={3} value={getMenu.remeDescription} onChange={eventHandler('remeDescription')} > </textarea> */}
                    <Input.TextArea onChange={eventHandler('remeDescription')} rows={3} placeholder={getMenu.remeDescription} />
                  </Form.Item>


                  <Form.Item
                    name="remePrice" label='Price'
                    rules={[{ required: true, message: 'Please input price!' }]}
                  >
                    <Input onChange={eventHandler('remePrice')} placeholder={(getMenu.remePrice).toString()} />
                  </Form.Item>

                  <Form.Item
                    name="remeStatus" label='Status'
                    rules={[{ required: true, message: 'Please select status!' }]}
                  >
                    <Switch onChange={switchMenu} className='bg-slate-400' />
                    {/* <Select placeholder={getMenu.remeStatus} onChange={(e) => handleSelection2(e, 'remeStatus')}>
                  <Select.Option value='AVAILABLE'>AVAILABLE</Select.Option>
                  <Select.Option value='EMPTY'>EMPTY</Select.Option>
                </Select> */}
                  </Form.Item>
                </>
                {/* <div className='flex justify-center'>
                <Link href=''>
                  <div className='bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-2 w-40 text-center'>
                      Update Menu
                  </div>
                </Link>
              </div> */}
              </Form>

            </Modal>

            {/* ------------------------------------------ MODAL PHOTO---------------------------- */}

            <Modal
              title="Upload Photo"
              open={isModalPhoto}
              onOk={handlePhoto}
              onCancel={handleCancelPhoto}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancelPhoto}>Cancel</Button>
                  <Button key="submit" onClick={handlePhoto}>OK</Button>
                </>
              ]}
            >
              <p className='text-xl text-center font-bold'> {getPhoto.remeName} </p>

              <Form
                onFinish={saveNewPhoto}
                // labelCol={{ span:8 }}  
                // wrapperCol={{ span:14 }}
                layout="horizontal"
                // style={{ maxWidth: 600}}
                className="py-5 mx-auto"
                encType='multipart/form-data'
              // onSubmitCapture={onFinish}

              >
                {/* menampilkan photo, tombol delete belum berfungsi*/}
                {getPhoto.rempUrl ?
                  <div className='flex'>
                    {/* menampilkan gambar 
              {viewPhoto && viewPhoto.map((photo: any, index: number) =>
                <div key={photo.rempId} className='border shadow rounded-lg w-80 mx-auto text-center object-cover object-center mr-4'>
                  <div className='h-64 bg-red-500 object-center'>
                    <img src={photo.rempUrl} className='h-64 object-center'></img>
                  </div>
                  <Button onClick={() => deletePhoto(photo.remp_id)} className='text-red-500'>Delete</Button>

                </div>
              )}*/}
                  </div>
                  :
                  <img src={addImage[0]} width='300px' height='300px'></img>
                }
                {/* <Form.Item name='rempUrl' label={'Upload Image Here'}>
            <Upload id='upload' accept="image/*"  onChange={handleUploadChange}>
              
                  <div className=' p-6 border border-dashed border-slate-500 text-center'>
                    <PlusOutlined />
                    <div>Upload</div>
                  </div>
            </Upload>
            <br />
            <a className='bg-slate-400 p-4 w-24 rounded mt-5' onClick={saveNewPhoto}>
              Save my photo
            </a>
          </Form.Item> */}

                {/* upload gambar udah berhasil nih */}

                <Form.Item name='rempUrl' label={''}>


                  {image ?
                    <img src={image} className='h-80 w-96 object-cover mx-auto'></img>
                    : ' '
                  }
                  <input className='file:w-24 file:border file:border-dashed file:border-slate-500 file:bg-white ' type="file"
                    id='primary'
                    accept="image/*"
                    onChange={handleUploadChange}>
                  </input>
                  <br /> <br />
                  <Buttons funcs={saveNewPhoto}>
                    Save Photo
                  </Buttons>
                  {/* <button type='button' onClick={saveNewPhoto}>Save my photo</button> */}
                </Form.Item>

                {/* add more pict */}
                <Form.List name={'rempUrl'}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => {
                        return (
                          <>
                            <div>
                              <img src={addImage[index]} width='200px' height='200px'></img>
                            </div>
                            <Form.Item name={[field.name, 'rempUrl']} label={'first photo'}>
                              <label htmlFor="formFile">Upload Image Here</label>
                              <input type="file" id={index.toString()} accept="image/*" onChange={handleUploadChange}>
                              </input>
                              <button type='button'>Save my photo</button>
                            </Form.Item>
                            <button onClick={() => { remove(field.name); }}>Delete</button>
                          </>


                          // <Form.Item
                          //   key={field.key}
                          //   name={[field.name, 'photo']}
                          //   label={'Add photo'}
                          // >
                          // </Form.Item>

                          // <Form.Item name={[field.name, 'first']} label={'1 student'}>
                          //   <Input placeholder='First name'></Input>
                          // </Form.Item>

                          // <Form.Item label="Add Photo">
                          //     <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} required noStyle >
                          //         <Upload.Dragger name="files" action="/upload.do">
                          //         <p className="ant-upload-drag-icon">
                          //             <InboxOutlined />
                          //         </p>
                          //         <p className="ant-upload-text">Click or drag 1 picture here</p>
                          //         <p className="ant-upload-hint">Support for a single upload</p>
                          //         </Upload.Dragger>
                          //     </Form.Item>
                          // </Form.Item>
                        );
                      })}
                      <Form.Item>
                        <Button type='dashed' block icon={<PlusOutlined></PlusOutlined>}
                          onClick={() => { add() }}
                        >Add Photo</Button>
                      </Form.Item>
                    </>

                  )}

                </Form.List>
              </Form>
            </Modal>


            {/* // --------------------------------------------------------------------------------------- THUMBNAIL PHOTO  */}
            <Modal
              title="SET THUMBNAIL PHOTO"
              open={isThumbnail}
              onOk={updatePhoto} // belum tau mau diisi apa sama di button ok jga benerin
              onCancel={handleCancelThumbnail}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancelThumbnail}>Cancel</Button>
                  <Button key="submit" onClick={updatePhoto}>Update Photo</Button>
                </>
              ]}
            >
              <div className='my-4'>
                <div className='text-center w-full '>
                  <p className='font-bold text-xl py-4'>Thumbnail Photo - {getPhoto.remeName}</p>
                  <img src={newPrimary.rempurl} className='h-64 object-center text-center mx-auto'></img>
                </div>
              </div>
              <hr className='mb-4' />
              <div className='mb-4'>
                Guides:
                <ul>
                  <li>
                    - Select photo to set new thumbnail photo
                  </li>
                  <li>
                    - Klik delete to delete permanent photo
                  </li>
                </ul>
              </div>
              <div className='flex'>
                {
                  viewThumbnailPhoto.map((photo: any, i: number) => (
                    <div className=' border rounded-lg mr-3 transition ease-in-out delay-150 hover:scale-110 duration-300 hover:bg-slate-200'>
                      <a onClick={() => setPrimary(photo)}>
                        <div className=' p-2'>
                          <img src={photo.rempurl} alt={photo.rempthumbnailfilename} className='h-32' />
                          <p className='text-base text-center'>Photo {i + 1}</p>
                        </div>
                      </a>
                      <div className='text-center pb-2'>
                        <a onClick={() => deletePhoto(photo.rempid)} className='text-red-500 text-center'><CloseOutlined /> Delete</a>
                      </div>
                    </div>
                  ))
                }
              </div>
            </Modal>

          </Dashboard>
          :
          <Unauthorized />

      }

    </>
  )
}
