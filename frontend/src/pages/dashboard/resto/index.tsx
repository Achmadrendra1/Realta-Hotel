import Dashboard from '@/layouts/dashboard'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Dropdown, Form, Input, Menu, MenuProps, message, Modal, Pagination, Popconfirm, Select, Space, Switch, Tabs, Upload } from 'antd';
import { Table } from 'antd'
import { CloseOutlined, DeleteOutlined, DownOutlined, EditOutlined, InboxOutlined, MoreOutlined, PictureOutlined, PlusOutlined, UploadOutlined, WarningOutlined } from '@ant-design/icons';
import {  useDispatch, useSelector } from 'react-redux';
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
import withAuth from '@/PrivateRoute/WithAuth';

export default withAuth( function restoMenu() {
  const dispatch = useDispatch();

  let photos = useSelector((state: any) => state.menuPhotoReducer.menuPhoto);
  let menus = useSelector((state: any) => state.restoMenuReducer.restoMenus);
  let restaurant = useSelector((state: any) => state.restoReducer.resto);
  let user = useSelector((state: any) => state.GetUserReducer.getUser);
  let role = user[0]?.role_name;

  let [search, setSearch] = useState('');
  let list_restaurant = restaurant.data;
  
  
  // ------------------------ PAGINATION
  const [currentpage, setCurrentPage] = useState(1);
  const handlePagination = (page: any) => { 
    setCurrentPage(page);
  };
  
  // get user login
  useEffect(() => {
    dispatch(doGetUser())
  },[user])
  
  useEffect(() => {
    let data = {
      search,
      currentpage
    }

    dispatch(doMenuRequest(data));
    dispatch(doGetPhoto());
    dispatch(doRestoRequest(1))

  }, [menus, search, currentpage])
 


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
    e.preventDefault() 
    // console.log(e.target.rempurl);

  } 

  let [getMenu, setGetMenu] = useState({
    remeFaciId: 0,
    remeId: 0,
    remeName: '',
    remeDescription: '',
    remePrice: 0,
    remeStatus: 'EMPTY'
  })

  const [formEdit] = Form.useForm()
  const [firstValue, setFirstValue] = useState('')  
  const editMenu = async (id: number) => {
    showEdit()
    // debugger; 
    const menu:any = await axios(API('Get', `/resto-menus/${id}`, null))
      .then((res: any) => {
        // console.log('res',res.data[0]);
        let getmenu = res.data[0];
        
        let data = {
          remeFaciId: getmenu.reme_faci_id,
          remeId: getmenu.reme_id,
          remeName: getmenu.reme_name,
          remeDescription: getmenu.reme_description,
          remePrice: getmenu.reme_price,
          remeStatus: 'AVAILABLE'
          // remeStatus: getmenu.reme_status
        }
        setGetMenu(data)
        return data;
      })
      .catch((err) => alert(err))
    
    list_restaurant && list_restaurant.map( (resto:any) => {
      if(resto.faci_id == menu.remeFaciId){
        let restaurant = resto.faci_name + ' - ' + resto.hotel_name
        setFirstValue(restaurant)          
      }
    })
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
    
    messageApi.open({
      type: 'success',
      content: 'Menu successfully updated!',
      duration: 5,
    });
    // buat nutup modal
    setIsModalOpen(false)
  }

  // ------------------------------------------------------------------------------------- ADD MENU
  const [isModalAddMenu, setIsModalAddMenu] = useState(false);
  const showAddMenu = () => {
    setIsModalAddMenu(true)
  }
  // [form] disini karena di Form modal add menu pake form=form
  const [form]:any = Form.useForm()
  const handleAddMenu = (e: any) => { 
    e.preventDefault();
    // disini tambahin id menunya, diambil dari db
    dispatch(doAddMenu(addMenu))
    
    messageApi.open({
      type: 'success',
      content: 'Menu added successfully!',
      duration: 5,
    });
    // reset form
    form.resetFields()
    setIsModalAddMenu(false)
  }
  const handleCancelAddMenu = () => {
    // reset form
    form.resetFields()
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

  let [showAddMore, setShowAddMore] = useState(false)
  // console.log(getPhoto,' ini get photo')

  const showPhotoMenu = () => {
    setIsModalPhoto(true)
  }

  let [viewPhoto, setViewPhoto] = useState<any[]>([]);  
  // waktu di klik ... di tabel
  // menampilkan deretan photo yang nama menunya sama
  const photoMenu = async (data: any) => {
    // console.warn(data, ' ini dataa')
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

      let newDataPhoto = { rempId: photo.rempid, rempUrl: `${configuration.BASE_URL}/resto-menu-photos/menu/${photo.rempphotofilename}` }
      // console.warn(photo.rempurl, ' satu satu');
      migratePhoto.push(newDataPhoto)
    })
    // console.warn(migratePhoto, 'migrate photo');

    setViewPhoto([...migratePhoto]);

    // console.warn('ini view photo ', viewPhoto);


    let urlPhoto = '';
    // kalau url ada, isi url. kalau gaada kosongin aja (defaultnya null kan)


    if (result.data.length !== 0) {
      urlPhoto = `${configuration.BASE_URL}/resto-menu-photos/menu/${result.data[0].rempphotofilename}`;
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
  const handlePhoto = (e: any) => { 
    e.preventDefault();
    // disini tambahin id menunya, diambil dari db 
    setIsModalPhoto(false)
  }
  const handleCancelPhoto = () => {
    setIsModalPhoto(false)
  } 

  let [insertPhoto, setInsertPhoto] = useState({
    rempThumbnailFilename: '',
    rempPrimary: 0,
    rempUrl: '',
    remeId: 0
  });

  // menampilkan gambar ke layar user
  let [image, setImage] = useState('https://fakeimg.pl/350x200');

  // menginput data gambar ke backend
  let [imageInput, setImageInput] = useState('');


  // mengubah input type file untuk gambar
  function handleUploadChange(e: any) { 
    // input data ke BE nantinya
    let uploaded = e.target.files[0];
    setImageInput(uploaded);

    const fileReader = new FileReader();
    fileReader.onload = function (event: any) {
      setImage(event.target.result);
    };
    fileReader.readAsDataURL(uploaded)
 
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
  } 

  function saveNewPhoto(e: any) {
    e.preventDefault();
    setShowAddMore(true);
    setImage('https://fakeimg.pl/350x200')
    const formData = new FormData();
    formData.append('rempThumbnailFilename', insertPhoto.rempThumbnailFilename);
    formData.append('rempPrimary', insertPhoto.rempPrimary.toString());
    formData.append('rempUrl', imageInput);
    formData.append('remeId', insertPhoto.remeId.toString());

    // console.log(formData,'isi form');
    
    axios.post('http://localhost:3501/resto-menu-photos', formData, {
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
 
  }

  // switch menu available or not
  let [available, setAvailable] = useState('EMPTY') 
  const switchMenu = (checked: boolean) => {
    if (checked == true) {
      setAddMenu({ ...addMenu, remeStatus: 'AVAILABLE' })
      setGetMenu({ ...getMenu, remeStatus: 'AVAILABLE' }) 
    } else {
      setAddMenu({ ...addMenu, remeStatus: 'EMPTY' })
      setGetMenu({ ...getMenu, remeStatus: 'EMPTY' }) 
    } 
  }; 

  // --------------------------------------------------------------------------------------- THUMBNAIL PHOTO 

  const [isThumbnail, setisThumbnail] = useState(false);
  const [viewThumbnailPhoto, setViewThumbnailPhoto] = useState([]); // all photo not primary
  const [primaryPhoto, setPrimaryPhoto] = useState({
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
    setGetPhoto({...getPhoto, remeName : reme.reme_name})
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
        rempurl: `${configuration.BASE_URL}/resto-menu-photos/menu/${photo.rempphotofilename}`
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
          rempurl: `${configuration.BASE_URL}/resto-menu-photos/menu/${photo.rempphotofilename}`
        })
        setPrimaryPhoto(newDataPhoto)
      }
    })
    setViewThumbnailPhoto(migratePhoto)


  }

  function handleCancelThumbnail() {
    setNewPrimary({
      remename: '',
      rempid: 0,
      rempphotofilename: '',
      rempprimary: '0',
      rempreme: '',
      rempthumbnailfilename: '',
      rempurl: ``
    })
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
      rempurl: `${configuration.BASE_URL}/resto-menu-photos/menu/${photo.rempphotofilename}`
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
    messageApi.open({
      type: 'success',
      content: 'Thumbnail photo successfully updated!',
      duration: 5
    });
    
    setNewPrimary({
      remename: '',
      rempid: 0,
      rempphotofilename: '',
      rempprimary: '0',
      rempreme: '',
      rempthumbnailfilename: '',
      rempurl: ``
    })
    setisThumbnail(false);

  }

  // delete photo
  const [messageApi, contextHolder] = message.useMessage();

  // -------------------------------------------- DELETE PHOTO
  function deletePhoto(id: number) {
    dispatch(doDeletePhoto(id))
    messageApi.open({
      type: 'success',
      content: 'Photo successfully deleted!',
      duration: 5,
    });
    setisThumbnail(false);
  } 
 
  // --------- MULTIPLE PHOTO
  const [showAddMultiple, setShowAddMultiple] = useState(false);
  const [addPhotos, setAddPhotos] = useState([]);
  const [uploadMultiple,setUploadMultiple] = useState([])
  const [dataReme,setDataReme] = useState({
    reme_name: '',
    reme_id: 0
  })
  const [readPhoto, setReadPhoto]:any = useState([])
  const [imageUrl, setImageUrl] = useState('')
  // const inputRef = useRef(null);
  // const [formMultiplePhoto]:any = Form.useForm()
  function cancelAddMultiple(){
    // formMultiplePhoto.resetFields()
    // Reset value of file input
    // if(inputRef.current){
    //   inputRef.current.reset();
    // }
    setAddPhotos([])
    setReadPhoto([])
    setShowAddMultiple(false)
  } 
  function handleInputMultiple(e:any){ 
    // console.log('ini e', e);
    
    let multiple:any = []
    let uploaded = e.target.files;
    // let uploaded = e.fileList
    // buat baca gambar di layar
    const fileReader = new FileReader()
    let readUrl = []; 

    // masukkan semua gambar ke file upladed 
    for(let i=0; i<uploaded.length; i++){
      multiple.push(e.target.files[i])
      // multiple.push(e.fileList[i])
      readUrl.push(URL.createObjectURL(e.target.files[i]))
    } 
    
    setAddPhotos(multiple)
    setReadPhoto(readUrl)
  }
  function addMultiple(reme:any){
    // debugger;
    setShowAddMultiple(true);
    setDataReme({
      reme_name: reme.reme_name,
      reme_id: reme.reme_id
    })
  } 
  function saveMultiplePhoto(){
    // console.log('masuk save');
    
    let dataMultiple:any = [];
    const form = new FormData(); 
    form.append('rempThumbnailFilename', dataReme.reme_name);
    form.append('remeId', dataReme.reme_id.toString());
    form.append('rempPrimary', '0');

    addPhotos.map((photo:any) => {
      form.append('rempUrl', photo);
      // dataMultiple.push(form)
    })  

    dispatch(doAddPhoto(form)) 
    messageApi.open({
      type: 'success',
      content: 'Photo successfully added!',
      duration: 5,
    });
    
    // formMultiplePhoto.resetFields()
    setAddPhotos([])
    setReadPhoto([])
    setShowAddMultiple(false)
  } 
  return (
    <>
      {
        role == 'Manager' || role == 'Admin' ?

          <Dashboard> 
            <div className='text-2xl text-center py-3 font-bold'>Restaurant Menu</div>

            <div className='my-4 px-4'>
              <div className='float-right right-0 items-right'> 
              </div>
              <Input.Search value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder='Search here..' style={{ width: 400 }} />
            </div>

            <Table dataSource={menus.data} pagination={{current: currentpage, onChange: handlePagination, total: menus.counts}} className='py-4'>
              <Table.Column title='ID' dataIndex='reme_id' key='reme_id'/>
              <Table.Column title='Hotel Name' dataIndex='hotel_name' key='hotel_name' />
              <Table.Column title='Restaurant' dataIndex='faci_name' key='faci_name' />
              <Table.Column title='Menu' dataIndex='reme_name' key='reme_name' />
              <Table.Column title='Price' dataIndex='reme_price' key='reme_price' render={((rp) => { return rp.replace('$', 'Rp.') })} />
              <Table.Column title='Description' dataIndex='reme_description' key='reme_description' />
              <Table.Column title='Status' dataIndex='reme_status' key='reme_status' />
              <Table.Column title='Modified Date' dataIndex='reme_modified_date' key='reme_modified_date' render={(dateString) => {
                const formattedDate = dayjs(dateString).locale('id').format('DD MMMM YYYY');
                return formattedDate;
              }}  
              />
              <Table.Column title={<button onClick={showAddMenu} className='bg-slate-200 hover:bg-slate-300 rounded-lg w-24 py-3'><PlusOutlined /> Add menu</button>} key="add" 
                
                render={(_: any, record: any) => (

                  <Space size="middle"> 
                    <Dropdown overlay={
                      <Menu>
                        <Menu.Item key={'edit'} onClick={() => editMenu(record.reme_id)}> <EditOutlined className='mr-2'/>Edit Menu</Menu.Item>
                        {/* <Menu.Item key={'add'} onClick={() => photoMenu(record)}><UploadOutlined className='mr-2'/>Upload photo</Menu.Item> */}
                        <Menu.Item key={'addmultiple'} onClick={() => addMultiple(record)}><UploadOutlined className='mr-2'/>Upload Photo</Menu.Item>
                        <Menu.Item key={'update'} onClick={() => thumbnailMenu(record)}><PictureOutlined className='mr-2'/>Edit Photo Menu</Menu.Item>
                      </Menu>
                      }
                      trigger={['click']} 
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className='mx-10'>
                          <MoreOutlined />
                        </Space>
                      </a>
                    </Dropdown> 
                  </Space>
                )}
              />
            </Table>
            
            {/* ------------------------------------------------------------------------------------- MODALS EDIT MENU */}
            <Modal
              title="Update Menu Restaurant"
              open={isModalOpen}
              onOk={handleUpdateMenu}
              onCancel={handleCancel}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancel}>Cancel</Button>
                  {contextHolder}
                  <Button key="submit" onClick={handleUpdateMenu} className='bg-sky-500 text-white' onMouseEnter={(e:any) => { e.target.style.color = '#fff'; }}>Update Menu </Button>
                </>
              ]}

            >
              <Form
                form={formEdit}
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                // initialValues={getMenu}
                className="mx-auto"
              >
                <p className='text-center text-xl py-5 font-bold'>
                  Update Menu Restaurant
                </p>
                <>
                  <Form.Item name="remeFaciId" label="Facility"
                    rules={[{ required: true, message: 'Please select restaurant!!' }]}>
                    <Select value={firstValue} onChange={(e) => handleSelection(e, 'remeFaci')}>
                      <>
                        {
                          list_restaurant && list_restaurant.map((resto: any) => (
                            <Select.Option value={resto.faci_id} >{resto.hotel_name} - {resto.faci_name}</Select.Option>

                          ))
                        }
                      </>
                    </Select>
                    <p hidden>fist value{firstValue}</p>
                  </Form.Item>

                  <Form.Item
                    name={"remeName"} label='Name Menu'
                    rules={[{ required: true, message: 'Please input name menu!' }]}
                  >
                    <Input type="text" onChange={eventHandler('remeName')} value={getMenu.remeName}/>
                    <p className='pl-3 text-black' hidden>Previous: {getMenu.remeName}</p>
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
                    <p className='pl-3 text-white' hidden>Previous: {getMenu.remeDescription}</p>
                  </Form.Item>


                  <Form.Item
                    name="remePrice" label='Price'
                    rules={[{ required: true, message: 'Please input price!' }]}
                  >
                    <Input onChange={eventHandler('remePrice')} value={(getMenu.remePrice).toString()} />
                    <p className='pl-3 text-white' hidden>Previous: {getMenu.remePrice}</p>
                  </Form.Item>

                  <Form.Item
                    name="remeStatus" label='Status'
                    rules={[{ required: true, message: 'Please select status!' }]}
                  > 
                    <Switch onChange={switchMenu} className='bg-slate-400' defaultChecked/>
                    <p className='pl-3 text-white' hidden>Previous: {getMenu.remeStatus}</p>
                    
                  </Form.Item>
                </> 
              </Form>

            </Modal>

            {/* -------------------------------------------- MODAL ADD MENU */}
            <Modal
              title="Add Menu Restaurant"
              open={isModalAddMenu}
              onOk={handleAddMenu}
              onCancel={handleCancelAddMenu}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancelAddMenu}>Cancel</Button>
                    {contextHolder}
                  <Button key="submit" onClick={handleAddMenu} className='bg-sky-500 text-white' onMouseEnter={(e:any) => { e.target.style.color = '#fff'; }}>Add Menu</Button>
                </>
              ]}

            >
              <Form
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                className="mx-auto"
              >
                <p className='text-center text-xl py-5 font-bold'>
                  Add Menu Restaurant
                </p>
                <>
                  <Form.Item name="remeFaciId" label="Restaurant"
                    rules={[{ required: true, message: 'Please select restaurant!!' }]}>
                    <Select placeholder={'Select restaurant'} onChange={(e) => handleSelection(e, 'remeFaci')} >
                      {
                        list_restaurant && list_restaurant.map((resto: any) => (
                          <Select.Option value={resto.faci_id} key={resto.faci_id}>{resto.faci_name} - {resto.hotel_name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={"remeName"} label='Name Menu'
                    rules={[{ required: true, message: 'Please input name menu!' }]}
                  >
                    <Input type="text" onChange={eventHandler('remeName')} placeholder='Name of menu'/>
                  </Form.Item>

                  <Form.Item
                    name="remeDescription" label='Description'
                    rules={[{ required: true, message: 'Please input description!' }]}
                  >
                    <Input.TextArea onChange={eventHandler('remeDescription')} rows={3} placeholder='Menu description' />
                  </Form.Item>


                  <Form.Item
                    name="remePrice" label='Price'
                    rules={[{ required: true, message: 'Please input price!' }]}
                  >
                    <Input type='number' onChange={eventHandler('remePrice')} placeholder='Price (number)' />
                  </Form.Item>

                  <Form.Item
                    name="remeStatus" label='Status'
                    rules={[{ required: true, message: 'Please select status!' }]}
                  >
                    <Switch onChange={switchMenu} className='bg-slate-400' />
                  </Form.Item>
                </>
              </Form>

            </Modal>

            {/* ------------------------------------------ MODAL ADD PHOTO---------------------------- */}

            <Modal
              title="Upload Photo"
              open={isModalPhoto}
              onOk={handlePhoto}
              onCancel={handleCancelPhoto}
              width={1000}
              footer={[
                <>
                  <Button key="back" onClick={handleCancelPhoto}>Cancel</Button>
                  <Button key="submit" onClick={handlePhoto} className='bg-sky-500 text-white' onMouseEnter={(e:any) => { e.target.style.color = '#fff'; }}>OK</Button>
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
                {/* upload gambar udah berhasil nih */}

                <Form.Item name='rempUrl' label={''}>

                  <div className='h-96 w-64 border text-center'>
                    <p className='text-base py-2'>Add photo and set as thumbnail</p>
                    <img src={image} className='h-48 w-64 object-cover bg-slate-200'></img>
                    <br></br>
                    <input className='file:w-24 file:border file:border-dashed file:border-slate-500 file:bg-white ' type="file"
                      id='primary'
                      accept="image/*"
                      onChange={handleUploadChange}>
                    </input>
                    <br /> 
                    <Buttons funcs={saveNewPhoto}>
                      Save Photo
                    </Buttons>
                  </div>
                </Form.Item>

                {/* add more pict */}
                { showAddMore && 
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
                          );
                        })}
                        <Form.Item className=''>
                          <Button type='dashed' block icon={<PlusOutlined></PlusOutlined>}
                            onClick={() => { add() }}
                          >Add Photo</Button>
                        </Form.Item>
                      </> 
                    )} 
                  </Form.List>
                } 
              </Form>
            </Modal>


      {/* // --------------------------------------------------------------------------------------- THUMBNAIL PHOTO  */}
      <Modal
        title="SET THUMBNAIL PHOTO"
        open={isThumbnail}
        onOk={updatePhoto}
        onCancel={handleCancelThumbnail}
        width={1000}
        footer={[
          <>
            <Button key="back" onClick={handleCancelThumbnail}>Cancel</Button>
            { viewThumbnailPhoto.length > 0 ? 
              <>
                {contextHolder}
                <Button key="submit" onClick={updatePhoto} className='bg-sky-500 text-white' onMouseEnter={(e:any) => { e.target.style.color = '#fff'; }}>Set as thumbnail</Button>
              </>
            : '' }
          </>
        ]}
      >
        { viewThumbnailPhoto.length > 0 ? 
        <>
          <div className='my-4'>
            <div className='text-center w-full '>
              <p className='font-bold text-xl py-4'>Thumbnail Photo - {getPhoto.remeName}</p>
              <img src={newPrimary.rempurl} className='h-64 object-center text-center mx-auto'></img>
            </div>
          </div>
          <hr className='mb-4'/>
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
          <div className='flex flex-wrap justify-center'>
            {
              viewThumbnailPhoto?.map((photo: any, i:number) => (
                <div key={i} className='w-48 border rounded-lg m-2 transition hover:bg-slate-200 hover:text-black-500 hover:font-bold'>
                  <button onClick={()=>setPrimary(photo)}>
                    <div  className=' p-2'>
                      <img src={photo.rempurl} alt={photo.rempthumbnailfilename} className='h-32 w-48 object-cover' />
                      <p className='text-base text-center'>Photo {i+1}</p> 
                    </div>
                  </button>
                  { photo.rempid != primaryPhoto.rempid ? 
                    <div className='text-center pb-2'>
                      <Popconfirm
                        placement="bottomRight"
                        title={'Delete Photo'}
                        description={'Are you sure to delete this photo?'}
                        onConfirm={() => deletePhoto(photo.rempid)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ 
                          style: { backgroundColor: '#1890ff', color: '#fff'}
                          }}
                      >
                        {/* <Button>BR</Button> */}
                        {contextHolder}
                        <button className='text-red-500 text-center'><CloseOutlined /> Delete</button>
                      </Popconfirm>
                      {/* <button onClick={() => deletePhoto(photo.rempid)} className='text-red-500 text-center'><CloseOutlined /> Delete</button> */}
                    </div>
                    :
                    ''
                  }
                </div>
              ))
            }
          </div>
        </>
        : 
        <div className='text-slate-300 text-center py-10 h-96 '>
          No photos available
          <p>Please upload photo</p>
        </div>
        }
      </Modal>
      
      {/* ------------------------- ADD MULTIPLE PHOTO ------------------------------- */}
      <Modal
        title="Upload Photo"
        open={showAddMultiple}
        onOk={saveMultiplePhoto}
        onCancel={cancelAddMultiple}
        width={1000}
        footer={[
          <>
            <Button key="back" onClick={cancelAddMultiple}>Cancel</Button>
            {contextHolder}
            <Button key="submit" onClick={saveMultiplePhoto} className='bg-sky-500 text-white' onMouseEnter={(e:any) => { e.target.style.color = '#fff'; }}>Upload Photo</Button>
          </>
        ]}
      >
              <Form
                // ref={inputRef}
                // form={formMultiplePhoto}
                // onFinish={}
                labelCol={{ span:5 }}  
                wrapperCol={{ span:17 }}
                layout="horizontal"
                // style={{ maxWidth: 600}}
                className="py-5 mx-auto"
                encType='multipart/form-data'>

                  <Form.Item label='Menu name'>
                    <Input value={dataReme.reme_name} readOnly/>
                  </Form.Item>

                  <Form.Item label='Upload photo'>
                    <label htmlFor="formFile"></label>
                    <input  type="file" id='rempUrl' name='rempUrl' accept='image/*' onChange={handleInputMultiple} multiple
                            className='file:w-24 file:border file:border-dashed file:border-slate-500 file:bg-white '
                    />
                    <div className='flex flex-wrap justify-left'>
                      {
                        readPhoto.map((photo:any) =>
                          <img src={photo} className='h-48 w-64 object-cover bg-slate-200 m-2'></img>
                        
                        )
                      }
                    </div>
                  </Form.Item>


                <div>
                  {/* <br />
                  <Buttons funcs={saveMultiplePhoto}>
                    Upload Photo
                  </Buttons> */}
                </div>

                {/* <div>
                  <Upload
                    action={'http://localhost:3600/restomenuphotos'}
                    listType="picture"
                    multiple
                    id='rempUrl'
                    name='rempUrl'
                    accept='image/*'
                    onChange={handleInputMultiple}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  <br />
                </div> */}

              </Form> 
            </Modal>

          </Dashboard>


          :
          <Unauthorized />

      }

    </>
  )
}
)