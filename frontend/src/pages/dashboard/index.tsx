//-------------------------------------------------------------------------------
//import from package
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnType } from 'antd/es/table';
import {
  Input,
  Modal,
  Tabs,
  Button,
  Table,
  Form,
  Alert,
  Radio,
  message,
  Divider,
  Select,
  Image,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import router, { useRouter } from 'next/router';

//-------------------------------------------------------------------------------
//import from src
//GET and DEL
import Dashboard from '@/layouts/dashboard';
import { doRegions, doDelRegions } from '@/Redux/Action/Master/actionRegions';
import { doCountry, doDelCountry } from '@/Redux/Action/Master/actionCountry';
import {
  doProvinces,
  doDelProvinces,
} from '@/Redux/Action/Master/actionProvinces';
import { doAddress, doDelAddress } from '@/Redux/Action/Master/actionAddress';
import { doDelPolicy, doPolicy } from '@/Redux/Action/Master/actionPolicy';
import {
  doCategoryGroup,
  doDelCategoryGroup,
  doUpdateCategoryGroup,
} from '@/Redux/Action/Master/actionCategoryGroup';
import {
  doPriceItems,
  doDelPriceItems,
} from '@/Redux/Action/Master/actionPriceItems';
import {
  doServiceTask,
  doDelServiceTask,
} from '@/Redux/Action/Master/actionServiceTask';

//Add
import AddRegions from './master/add/addRegions';
import AddCountry from './master/add/addCountry';
import AddProvinces from './master/add/addProvinces';
import AddCity from './master/add/addCity';
import AddPolicy from './master/add/addPolicy';
import AddCategory from './master/add/addCategory';
import AddPrice from './master/add/addPrice';
import AddService from './master/add/addService';
//Edit
import EditRegions from './master/edit/editRegions';
import EditCountry from './master/edit/editCountry';
import EditProvinces from './master/edit/editProvinces';
import EditAddress from './master/edit/editCity';
import EditPolicy from './master/edit/editPolicy';
import EditCategory from './master/edit/editCategory';
import EditPrice from './master/edit/editPrice';
import EditService from './master/edit/editService';
import ViewPolicy from './master/view/viewPolicy';
import ViewCategory from './master/view/viewCategory';
import ViewPrice from './master/view/viewPrice';
import { doLocations } from '@/Redux/Action/Master/actionLocations';
import { doLocationsRC } from '@/Redux/Action/Master/actionLocationsRC';
import { doLocationsRCP } from '@/Redux/Action/Master/actionLocationsRCP';
import axios from 'axios';
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
export default function menuMaster() {
  //-------------------------------------------------------------------------------
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //React Hooks

  const dispatch = useDispatch();
  //GET DATA FROM DATABASE

  let dataProvinces = useSelector(
    (state: any) => state.provincesReducer.provinces
  );

  let dataCity = useSelector((state: any) => state.addressReducer.address);

  let dataRegions = useSelector((state: any) => state.regionsReducer.regions);
  useEffect(() => {
    dispatch(doRegions());
  }, [dataRegions]);
  useEffect(() => {
    dispatch(doLocationsRC());
    dispatch(doLocationsRCP());
    dispatch(doLocations());
  },[]);
  let dataLocationsRC = useSelector(
    (state: any) => state.locationsRCReducer.locationsRC
  );
  let dataLocationsRCP = useSelector(
    (state: any) => state.locationsRCPReducer.locationsRCP
  );

  let dataLocationsAll = useSelector(
    (state: any) => state.locationsReducer.locations
  );

  let dataPolicy = useSelector((state: any) => state.policyReducer.policy);
  useEffect(() => {
    dispatch(doPolicy());
  }, [dataPolicy]);

  let dataCategory = useSelector(
    (state: any) => state.categoryGroupReducer.categoryGroup
  );
  useEffect(() => {
    dispatch(doCategoryGroup());
  }, [dataCategory]);

  let dataPrice = useSelector(
    (state: any) => state.priceItemsReducer.priceItems
  );
  useEffect(() => {
    dispatch(doPriceItems());
  }, [dataPrice]);

  let dataService = useSelector(
    (state: any) => state.serviceTaskReducer.serviceTask
  );
  useEffect(() => {
    dispatch(doServiceTask());
  }, [dataService]);

  const [messageApi, contextHolder] = message.useMessage();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ADD DATA FROM DATABASE

  //-------------------------------------------------------------------------------
  // Modal Add
  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const [AddModalOpen, showModalAdd] = useState(false);
  const [EditModalOpen, showModalEdit] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const router = useRouter();

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  //Alternati ADD
  const [isOpenAddRegions, setOpenAddRegions] = useState(false);
  const [isOpenAddCountry, setOpenAddCountry] = useState(false);
  const [isOpenAddProvinces, setOpenAddProvinces] = useState(false);
  const [isOpenAddCity, setOpenAddCity] = useState(false);
  const [isOpenAddPolicy, setOpenAddPolicy] = useState(false);
  const [isOpenAddCategory, setOpenAddCategory] = useState(false);
  const [isOpenAddPrice, setOpenAddPrice] = useState(false);
  const [isOpenAddService, setOpenAddService] = useState(false);

  //Alternati Edit
  const [isOpenEditRegions, setOpenEditRegions] = useState(false);
  const [isOpenEditCountry, setOpenEditCountry] = useState(false);
  const [isOpenEditProvinces, setOpenEditProvinces] = useState(false);
  const [isOpenEditCity, setOpenEditCity] = useState(false);
  const [isOpenEditPolicy, setOpenEditPolicy] = useState(false);
  const [isOpenEditCategory, setOpenEditCategory] = useState(false);
  const [isOpenEditPrice, setOpenEditPrice] = useState(false);
  const [isOpenEditService, setOpenEditService] = useState(false);

  //View
  const [isViewPolicy, setViewPolicy] = useState(false);
  const [isViewCategory, setViewCategory] = useState(false);
  const [isViewPrice, setViewPrice] = useState(false);

  //Get Id
  const [idRegions, setIdRegions] = useState(0);
  const [idCountry, setIdCountry] = useState(0);
  const [idProvinces, setIdProvinces] = useState(0);
  const [idCity, setIdCity] = useState(0);
  const [idPolicy, setIdPolicy] = useState(0);
  const [idCategory, setIdCategory] = useState(0);
  const [idPrice, setIdPrice] = useState(0);
  const [idService, setIdService] = useState(0);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Edit data

  const editDataRegions = (idRegions: number) => {
    setOpenEditRegions(true);
    setIdRegions(idRegions);
  };
  const editDataCountry = (idCountry: number) => {
    setOpenEditCountry(true);
    setIdCountry(idCountry);
  };
  const editDataProvinces = (idProvinces: number) => {
    setOpenEditProvinces(true);
    setIdProvinces(idProvinces);
  };
  const editDataCity = (idCity: number) => {
    setOpenEditCity(true);
    setIdCity(idCity);
  };

  const editDataPolicy = (idPolicy: number) => {
    setOpenEditPolicy(true);
    setIdPolicy(idPolicy);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Visible

  const [visibleCategory, setVisibleCategory] = useState(false);
  const editDataCategory = (idCategory: number) => {
    setOpenEditCategory(true);
    setIdCategory(idCategory);
    setVisibleCategory(!visibleCategory);
  };

  const [visiblePrice, setVisiblePrice] = useState(false);
  const editDataPrice = (idPrice: number) => {
    setOpenEditPrice(true);
    setIdPrice(idPrice);
    setVisiblePrice(!visiblePrice);

  };
  const editDataService = (idService: number) => {
    setOpenEditService(true);
    setIdService(idService);
  };

  const viewDataPolicy = (idPolicy: number) => {
    setViewPolicy(true);
    setIdPolicy(idPolicy);
  };
  const viewDataCategory = (idCategory: number) => {
    setViewCategory(true);
    setIdCategory(idCategory);
  };
  const viewDataPrice = (idPrice: number) => {
    setViewPrice(true);
    setIdPrice(idPrice);
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Button Add
  const [visible, setVisible] = useState('hidden');

  //-------------------------------------------------------------------------------
  // Modal Hanlde
  const handleOk = () => {
    setVisible('');

    setTimeout(() => {
      setOpenAddRegions(false);
      setOpenAddCountry(false);
      setOpenAddProvinces(false);
      setOpenAddCity(false);
      setOpenAddPolicy(false);
      setOpenAddCategory(false);
      setOpenAddPrice(false);
      setOpenAddService(false);
      setOpenEditRegions(false);
      setOpenEditCountry(false);
      setOpenEditProvinces(false);
      setOpenEditCity(false);
      setOpenEditPolicy(false);
      setOpenEditCategory(false);
      setOpenEditPrice(false);
      setOpenEditService(false);
      setVisible('hidden');
    }, 777);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Cancel

  const handleCancel = () => {
    setOpenAddRegions(false);
    setOpenAddCountry(false);
    setOpenAddProvinces(false);
    setOpenAddCity(false);
    setOpenAddPolicy(false);
    setOpenAddCategory(false);
    setOpenAddPrice(false);
    setOpenAddService(false);

    setOpenEditRegions(false);
    setOpenEditProvinces(false);
    setOpenEditCountry(false);
    setOpenEditCity(false);
    setOpenEditPolicy(false);
    setOpenEditCategory(false);
    setOpenEditPrice(false);
    setOpenEditService(false);

    setViewPolicy(false);
    setViewCategory(false);
    setViewPrice(false);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Close

  const handleClose = (data: boolean) => {
    setOpenAddRegions(data);
    setOpenAddCountry(data);
    setOpenAddProvinces(data);
    setOpenAddCity(data);
    setOpenAddPolicy(data);
    setOpenAddCategory(data);
    setOpenAddPrice(data);
    setOpenAddService(data);

    setOpenEditRegions(data);
    setOpenEditProvinces(data);
    setOpenEditCountry(data);
    setOpenEditCity(data);
    setOpenEditPolicy(data);
    setOpenEditCategory(data);
    setOpenEditPrice(data);
    setOpenEditService(data);

    setViewPolicy(data);
    setViewCategory(data);
    setViewPrice(data);
  };
  //----------------------------------------------------------------------------------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Modal Delete

  const { confirm } = Modal;

  const showDeleteRegions = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelRegions(id));
      },
      onCancel() {
      },
    });

  };

  const showDeleteCountry = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelCountry(id));
        window.location.reload();
      },
      onCancel() {
      },
    });
  };

  const showDeleteProvinces = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelProvinces(id));
        window.location.reload();
      },
      onCancel() {
      },
    });
  };

  const showDeleteCity = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelAddress(id)), window.location.reload();
      },
      onCancel() {
      },
    });
  };

  const showDeletePolicy = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelPolicy(id)); 
      },
      onCancel() {
      },
    });
  };

  const showDeleteCategory = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelCategoryGroup(id)); 
      },
      onCancel() {
      },
    });
  };

  const showDeletePrice = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {

        dispatch(doDelPriceItems(id)); 
      },
      onCancel() {
      },
    });
  };

  const showDeleteService = (id: any) => {
    confirm({
      title: 'Are you sure delete this Regions?',
      icon: <ExclamationCircleFilled />,
      content: 'The data for the regions will be deleted.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(doDelServiceTask(id)); 
      },
      onCancel() {
      },
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //SEARCH

  const [queryPrice, setQueryPrice] = useState('');
  // handleSearchPrice
  const handleSearchPrice = (e: any) => {
    const input = e.target.value.toLowerCase().replace(/\s/g, '');
    setQueryPrice(input);
  };
  // searchResultsPrice
  const searchResultsPrice = dataPrice.filter((item: any) =>
    item.pritName.toLowerCase().replace(/\s/g, '').includes(queryPrice)
  );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Select type Price

  const [selectType, setSelectType] = useState('');
  const handleTypeSelect = (value: string) => {
    setSelectType(value);
  };
  const filterPrice = searchResultsPrice.filter((item: any) =>
    selectType ? item.pritType === selectType : true
  );

  //-------------------------------------------------------------------------------
  // Radio  Select Regions
  const [selectedRow, setSelectedRow] = useState(false);
  const [filterRC, setFilterRC] = useState([]);
  const [regionNamee, setRegionNamee] = useState([]);
  const [regionId, setRegionId] = useState([]);

  const handleRadioClick = (record: any) => {
    setSelectedRow(record);
    const filterRC = dataLocationsRC
      .filter((item: any) => item.region_code == record.region_code)
      .sort((az: any, za: any) => az.country_id - za.country_id);
    setFilterRCP(filterRCP);

    setFilterRC(filterRC);
    setRegionNamee(record.region_name);
    setRegionId(record.region_code);

  };
  useEffect(() => {
    dispatch(doLocationsRC());
  }, [filterRC, dataLocationsRC]);

  //
  // Radio  Select Country
  const [selectedRowCountry, setSelectedRowCountry] = useState(false);
  const [filterRCP, setFilterRCP] = useState([]);
  const [countryNamee, setCountryNamee] = useState([]);
  const [countryId, setCountryId] = useState([]);

  const handleRadioClickCountry = (record: any) => {
    setSelectedRowCountry(record);
    const filterRCP = dataLocationsRCP
      .filter((item: any) => item.country_id == record.country_id)
      .sort((az: any, za: any) => az.prov_id - za.prov_id);
    setFilterRCP(filterRCP);
    setCountryNamee(record.country_name);
    setCountryId(record.country_id);
  };

  //Radio Select Provinces
  const [selectedRowProvince, setSelectedRowProvince] = useState(false);
  const [filterRCPA, setFilterRCPA] = useState([]);
  const [provNamee, setProvNamee] = useState([]);
  const [provId, setProvId] = useState([]);

  const handleRadioClickprovinces = (record: any) => {
    setSelectedRowProvince(record);
    const filterRCPA = dataLocationsAll.filter(
      (item: any) => item.prov_id == record.prov_id
    );
    setFilterRCPA(filterRCPA);
    setProvNamee(record.prov_name);
    setProvId(record.prov_id);
  };
  //Radio Select City
  const [selectedRowCity, setSelectedRowCity] = useState(false);
  const [filterRCPCJ, setFilterRCPCJ] = useState([]);
  const [cityNamee, setCityNamee] = useState([]);
  const [cityId, setCityId] = useState([]);

  const handleRadioClickCity = (record: any) => {
    setSelectedRowCity(record);

    const filterRCPCJ = filterRCPA.filter(
      (item: any) => item.addr_line2 == record.addr_line2
    );

    setFilterRCPCJ(filterRCPCJ);
    setCityNamee(record.addr_line2);
    setCityId(record.addr_line2);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE REGIONS

  const columnsRegions: ColumnType<any>[] = [
    {
      title: '',
      key: 'action',
      // align: 'right',

      width: '1%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <Radio
                style={{ marginLeft: '1%', textAlign: 'center' }}
                checked={record === selectedRow}
                onClick={() => handleRadioClick(record)}
              ></Radio>
            </>
          </span>
        );
      },
    },
    {
      title: 'Region Code',
      dataIndex: 'region_code',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      width: '90%',
      title: 'Region Name',
      dataIndex: 'region_name',
      key: 'region_name',
      // align: 'center',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddRegions(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Regions
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '30%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataRegions(record.region_code)}
              />
              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeleteRegions(record.region_code)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE COUNTRY

  const columnsCountry: ColumnType<any>[] = [
    {
      title: '',
      key: 'action',
      // align: 'right',

      width: '1%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <Radio
                style={{ marginLeft: '1%', textAlign: 'center' }}
                checked={record === selectedRowCountry}
                onClick={() => handleRadioClickCountry(record)}
              ></Radio>
            </>
          </span>
        );
      },
    },
    {
      title: 'Country Id',
      dataIndex: 'country_id',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      width: '90%',
      title: 'Country Name',
      dataIndex: 'country_name',
      key: 'country_name',
      // align: 'center',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddCountry(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Country
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '30%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataCountry(record.country_id)}
              />
              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeleteCountry(record.country_id)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE Provinces

  const columnsProvinces: ColumnType<any>[] = [
    {
      title: '',
      key: 'action',
      // align: 'right',

      width: '1%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <Radio
                style={{ marginLeft: '1%', textAlign: 'center' }}
                checked={record === selectedRowProvince}
                onClick={() => handleRadioClickprovinces(record)}
              ></Radio>
            </>
          </span>
        );
      },
    },
    {
      title: 'Provinces Id',
      dataIndex: 'prov_id',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      width: '90%',
      title: 'Provinces Name',
      dataIndex: 'prov_name',
      key: 'prov_name',
      // align: 'center',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddProvinces(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Provinces
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '30%',

      render: (_: any, record: { prov_id: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataProvinces(record.prov_id)}
              />
              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeleteProvinces(record.prov_id)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE City

  const columnsCity: ColumnType<any>[] = [
    {
      title: '',
      key: 'action',
      // align: 'right',

      width: '1%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <Radio
                style={{ marginLeft: '1%', textAlign: 'center' }}
                checked={record === selectedRowCity}
                onClick={() => handleRadioClickCity(record)}
              ></Radio>
            </>
          </span>
        );
      },
    },
    {
      title: 'City Id',
      dataIndex: 'addr_id',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      width: '50%',
      title: 'Jalan',
      dataIndex: 'addr_line1',
      key: 'addr_line1',
      // align: 'center',
    },
    {
      width: '40%',
      title: 'City',
      dataIndex: 'addr_line2',
      key: 'addr_line2',
      // align: 'center',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddCity(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add City
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '30%',

      render: (_: any, record: any) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataCity(record.addr_id)}
              />
              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeleteCity(record.addr_id)}
              />
            </>
          </span>
        );
      },
    },
  ];

  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE Policy

  const columnsPolicy: ColumnType<any>[] = [
    {
      title: 'Poli Id',
      dataIndex: 'poliId',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: 'Policy Name',
      dataIndex: 'poliName',
      key: 'poliName',
      width: '70%',

      // align: 'center',
    },

    {
      title: '',
      key: 'action',
      align: 'right',

      width: '10%',

      render: (_: any, record: { poliId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <Button onClick={() => viewDataPolicy(record.poliId)}>
                <EyeOutlined style={{ color: '#13c2c2' }} />
              </Button>
              {/* eksekusi Delete */}
            </>
          </span>
        );
      },
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddPolicy(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Policy
        </Button>
      ),
      key: 'action',
      align: 'right',

      width: '30%',

      render: (_: any, record: { poliId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataPolicy(record.poliId)}
              />
              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeletePolicy(record.poliId)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE Category

  const columnsCategory: ColumnType<any>[] = [
    {
      title: '',
      dataIndex: 'cagroIconUrl',
      width: '5%',
      render: (text: any, record: any) => (
        <Image
          src={record?.cagroIconUrl}
          alt={record?.cagroIconUrl}
          className="w-4/4"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: 'Category Id',
      dataIndex: 'cagroId',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
      align: 'center',
    },
    {
      title: 'Category Name',
      dataIndex: 'cagroName',
      key: 'cagroName',
      width: '45%',
    },

    {
      title: '',
      key: 'action',
      // align: 'right',

      width: '15%',

      render: (_: any, record: { cagroId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <Button onClick={() => viewDataCategory(record.cagroId)}>
                <EyeOutlined style={{ color: '#13c2c2' }} />
              </Button>
              {/* eksekusi Delete */}
            </>
          </span>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'cagroType',
      key: 'cagroType',
      // align: 'center',
      width: '15%',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddCategory(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Category
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '30%',

      render: (_: any, record: { cagroId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataCategory(record.cagroId)}
              />

              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeleteCategory(record.cagroId)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE Price

  const columnsPrice: ColumnType<any>[] = [
    {
      title: ' Id',
      dataIndex: 'pritId',
      width: '5%',

      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: 'Item Name',
      dataIndex: 'pritName',
      key: 'pritName',
      // align: 'center',
      width: '40%',
    },
    {
      title: '',
      key: 'action',
      // align: 'right',

      width: '15%',

      render: (_: any, record: { pritId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <Button onClick={() => viewDataPrice(record.pritId)}>
                <EyeOutlined style={{ color: '#13c2c2' }} />
              </Button>
              {/* eksekusi Delete */}
            </>
          </span>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'pritPrice',
      key: 'pritPrice',
      width: '15%',
    },
    {
      title: 'Type',
      dataIndex: 'pritType',
      key: 'pritType',
      width: '15%',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddPrice(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Price Items
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '30%',

      render: (_: any, record: { pritId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataPrice(record.pritId)}
              />

              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeletePrice(record.pritId)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Data TABLE Service

  const columnsService: ColumnType<any>[] = [
    {
      title: ' Id',
      dataIndex: 'setaId',
      width: '10%',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: 'Task Name',
      dataIndex: 'setaName',
      key: 'pritName',
      // align: 'center',
      width: '50%',
    },

    {
      title: 'Sequence Order',
      dataIndex: 'setSeq',
      key: 'setSeq',
      align: 'center',
      // align: 'center',
    },
    {
      title: (
        <Button
          icon
          style={{
            float: 'right',
            backgroundColor: '#EEEEEE',
            color: 'black',
            marginTop: '3%',
            marginBottom: '3%',
            marginRight: '9%',
          }}
          type="default"
          onClick={() => setOpenAddService(true)}
        >
          <PlusOutlined
            style={{
              backgroundColor: '#EEEEEE',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 'larger',
            }}
          />
          Add Service Task
        </Button>
      ),
      key: 'action',
      // align: 'right',

      width: '12%',

      render: (_: any, record: { setaId: any }) => {
        return (
          <span className="flex justify-center">
            <>
              <EditOutlined
                className="hover:text-blue-700 mr-4"
                onClick={() => editDataService(record.setaId)}
              />
              <DeleteOutlined
                className="hover:text-red-700"
                onClick={() => showDeleteService(record.setaId)}
              />
            </>
          </span>
        );
      },
    },
  ];
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //PICTURE

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Dashboard>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          transform: 'scale(1.5)',
        }}
      >
        {/* message */}

        <Alert
          message="Success"
          description="The data regions have been successfully updated"
          type="success"
          showIcon
          style={{ marginBottom: '10px' }}
          closable
          afterClose={() => setVisible('')}
          className={visible}
        />
      </div>
      {contextHolder}
      {isOpenAddRegions ? (
        <AddRegions
          show={isOpenAddRegions}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {isOpenAddCountry ? (
        <AddCountry
          show={isOpenAddCountry}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          regionNamee={regionNamee}
          regionId={regionId}
          dataLocationsRC={dataLocationsRC}
        />
      ) : null}
      {isOpenAddProvinces ? (
        <AddProvinces
          show={isOpenAddProvinces}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          countryNamee={countryNamee}
          countryId={countryId}
          dataProvinces={dataLocationsRCP}
        />
      ) : null}
      {isOpenAddCity ? (
        <AddCity
          show={isOpenAddCity}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          provNamee={provNamee}
          provId={provId}
          dataProvinces={dataLocationsAll}
        />
      ) : null}
      {isOpenAddPolicy ? (
        <AddPolicy
          show={isOpenAddPolicy}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {isOpenAddCategory ? (
        <AddCategory
          show={isOpenAddCategory}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          dataPolicy={dataPolicy}
        />
      ) : null}
      {isOpenAddPrice ? (
        <AddPrice
          show={isOpenAddPrice}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}
      {isOpenAddService ? (
        <AddService
          show={isOpenAddService}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
        />
      ) : null}

      {/* Modal Edit */}

      {isOpenEditRegions ? (
        <EditRegions
          show={isOpenEditRegions}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idRegions={idRegions}
          dataRegions={dataRegions}
        />
      ) : null}
      {isOpenEditCountry ? (
        <EditCountry
          show={isOpenEditCountry}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idCountry={idCountry}
          dataCountry={dataLocationsRC}
        />
      ) : null}
      {isOpenEditProvinces ? (
        <EditProvinces
          show={isOpenEditProvinces}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idProvinces={idProvinces}
          dataProvinces={dataLocationsRCP}
        />
      ) : null}
      {isOpenEditCity ? (
        <EditAddress
          show={isOpenEditCity}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idCity={idCity}
          provNamee={provNamee}
          dataCity={dataLocationsAll}
        />
      ) : null}
      {isOpenEditPolicy ? (
        <EditPolicy
          show={isOpenEditPolicy}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idPolicy={idPolicy}
          dataPolicy={dataPolicy}
        />
      ) : null}
      {isOpenEditCategory ? (
        <EditCategory
          show={isOpenEditCategory}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idCategory={idCategory}
          dataCategory={dataCategory}
        />
      ) : null}

      {isOpenEditPrice ? (
        <EditPrice
          show={isOpenEditPrice}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idPrice={idPrice}
          dataPrice={dataPrice}
        />
      ) : null}
      {isOpenEditService ? (
        <EditService
          show={isOpenEditService}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idService={idService}
          dataService={dataService}
        />
      ) : null}
      {isViewPolicy ? (
        <ViewPolicy
          show={isViewPolicy}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idPolicy={idPolicy}
          dataPolicy={dataPolicy}
        />
      ) : null}
      {isViewCategory ? (
        <ViewCategory
          show={isViewCategory}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idCategory={idCategory}
          dataCategory={dataCategory}
        />
      ) : null}
      {isViewPrice ? (
        <ViewPrice
          show={isViewPrice}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleClose={handleClose}
          idPrice={idPrice}
          dataPrice={dataPrice}
        />
      ) : null}
      <div className="">
        <div className="">
          {/* Tabs----------------------------------------------------------------------------------------------------------------------------------------------- */}
          <Tabs>
            {/* Tabs 1 ----------------------------------------------------------------------------------------------------------------------------------------- */}

            <Tabs.TabPane tab="Locations" key="locations">
              <div
                className="text-2xl text-center py-3 mb-20px"
                style={{ marginBottom: '35px' }}
              >
                Locations
              </div>

              {/* Button Add -------------------------------------------------------------------- */}
              <div className="right">{/* Modal ADD */}</div>
              {/* DATA TABLE------------------------------------------------------------------------------------------------------------------------------------ */}
              <Table
                //REGIONS
                scroll={{ x: true }}
                size="middle"
                dataSource={dataRegions}
                columns={columnsRegions}
              ></Table>
              <Table
                //COUNTRY
                scroll={{ x: true }}
                size="middle"
                dataSource={filterRC}
                columns={columnsCountry}
              ></Table>
              <Table
                //Provinces
                scroll={{ x: true }}
                size="middle"
                dataSource={filterRCP}
                columns={columnsProvinces}
              ></Table>
              <Table
                //CITY
                scroll={{ x: true }}
                size="middle"
                dataSource={filterRCPA}
                columns={columnsCity}
              ></Table>
            </Tabs.TabPane>
            {/* Tab 1 end-------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Tabs 2 ---------------------------------------------------------------------------------------------------------------------------------------- */}
            <Tabs.TabPane tab="Policy" key="policy">
              <div
                className="text-2xl text-center py-3 mb-20px"
                style={{ marginBottom: '35px' }}
              >
                Policy
              </div>

              <Table
                // Table Policy
                scroll={{ x: true }}
                size="middle"
                dataSource={dataPolicy}
                columns={columnsPolicy}
              ></Table>
            </Tabs.TabPane>
            {/* Tab 3 */}
            <Tabs.TabPane tab="Category Group" key="category">
              <div
                className="text-2xl text-center py-3 mb-20px"
                style={{ marginBottom: '35px' }}
              >
                Category Group
              </div>

              <Table
                // Table Category
                scroll={{ x: true }}
                size="middle"
                dataSource={dataCategory}
                columns={columnsCategory}
              ></Table>
            </Tabs.TabPane>
            {/* Tab 4 */}
            <Tabs.TabPane tab="Price Items" key="price">
              <div
                className="text-2xl text-center py-3 mb-20px"
                style={{ marginBottom: '1%' }}
              >
                Price Items
              </div>
              <Divider></Divider>
              <Form.Item style={{ marginTop: '1%' }} label="" name={'pritName'}>
                <div
                  style={{
                    marginLeft: '20%',
                    marginBottom: '1%',
                  }}
                >
                  <label style={{ marginRight: '1rem' }}>Search Items</label>
                  <Input
                    style={{
                      width: '30%',
                      marginLeft: '1%',
                      marginTop: '1%',
                    }}
                    placeholder="Nasi Goreng, Coffe"
                    type="search"
                    className="w-full"
                    value={queryPrice}
                    onChange={handleSearchPrice}
                  />
                  <Select
                    style={{
                      width: '10%',
                      marginLeft: '1%',
                      marginTop: '1%',
                    }}
                    placeholder="Type"
                    onChange={handleTypeSelect}
                  >
                    <Select.Option value="FACILITY">FACILITY</Select.Option>
                    <Select.Option value="FOOD">FOOD</Select.Option>
                    <Select.Option value="SERVICE">SERVICE</Select.Option>
                    <Select.Option value="SNACK">SNACK</Select.Option>
                    <Select.Option value="SOFTDRINK">SOFTDRINK</Select.Option>
                    {/* <Select.Option value="">ALL</Select.Option> */}
                  </Select>
                </div>
              </Form.Item>
              <Table
                // Table Price Items
                scroll={{ x: true }}
                size="middle"
                dataSource={filterPrice}
                columns={columnsPrice}
              ></Table>
            </Tabs.TabPane>
            {/* Tab 5 */}
            <Tabs.TabPane tab="Service Task" key="service">
              <div
                className="text-2xl text-center py-3 mb-20px"
                style={{ marginBottom: '35px' }}
              >
                Service Task
              </div>
              <Table
                // Table Service Task
                scroll={{ x: true }}
                size="middle"
                dataSource={dataService}
                columns={columnsService}
              ></Table>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Dashboard>
  );
}
