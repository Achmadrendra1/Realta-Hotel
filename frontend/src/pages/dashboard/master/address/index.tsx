//Package lib
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Alert, Button, Form, Input, Layout, Modal, Radio, Table } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

//Artificial
import {
  doAddress,
  doAddAddress,
  doUpdateAddress,
  doDelAddress,
} from '@/Redux/Action/Master/actionAddress';
import { ColumnsType } from 'antd/es/table';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export default function index() {
  const router = useRouter();
  // const { TextArea } = Input;

  let dataAddress = useSelector((state: any) => state.addressReducer.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doAddress());
  }, []);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Modal Add
  const [modal2Open, setModal2Open] = useState(false);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //Modal Delete
  const { confirm } = Modal;
  const showDeleteConfirm = (id: any) => {
    confirm({
      title: 'Do you really want to delete this data?',
      icon: <ExclamationCircleFilled />,
      content: 'Some description',
      okText: 'YES',
      okType: 'danger',
      cancelText: 'NO',
      onOk() {
        dispatch(doDelAddress(id));
      },
      onCancel() {
      },
    });
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Form Inputan
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? { wrapperCol: { span: 14, offset: 4 } }
      : null;

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //Button Edit
  const showEdit = (id: any) => {
    //navigate('/edit address', {state:{id}})
    router.push(
      {
        pathname: 'address/updateAddress',
        query: { id },
      }
      //"address/updateAddress"
    );
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //Show Address
  /*
  const showAddress = (id:any)=>{
    router.push({
       pathname: 'address/Address',
      query: { id },
    })
  }
  */

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Data Tabel

  interface DataAddress {
    key: React.Key;
    addrLine1: string;
    addrLine2: string;
    addrPostalCode: string;
    addr_id: number;
  }

  const columns: ColumnsType<DataAddress> = [
    {
      title: 'ID',
      dataIndex: 'addr_id',
      sorter: {
        compare: (a: any, b: any) => a.addr_id - b.addr_id,
        multiple: 1,
      },
    },
    {
      title: 'Jalan',
      dataIndex: 'addrLine1',
      sorter: {
        compare: (a: any, b: any) => a.addr_id - b.addr_id,
        multiple: 1,
      },
    },
    {
      title: 'Kota',
      dataIndex: 'addrLine2',
      sorter: {
        compare: (a: any, b: any) => a.addr_id - b.addr_id,
        multiple: 1,
      },
    },
    {
      title: 'Kode Pos',
      dataIndex: 'addrPostalCode',
      sorter: (a: any, b: any) =>
        a.addrPostalCode.length - b.addrPostalCode.length,
    },
    // {
    //   title: 'address',
    //   dataInddex: 'addrSpatialLocation',
    //   key: 'addrSpatialLocation',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span className="flex">
          <>
            <Button
              className="h-10 px-6 font-semibold rounded-md text-yellow-500 text-2x1 hover:text-green-400"
              type="primary"
              onClick={() => showEdit(record.addr_id)}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => showDeleteConfirm(record.addr_id)}
              type="dashed"
              className="h-10 px-6 font-semibold rounded-md text-yellow-500 text-2x1 hover:text-green-400"
            >
              <DeleteOutlined />
            </Button>
          </>
        </span>
      ),
    },
  ];

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Value Input
  const [valueAddress, setValueAddress] = useState({
    addrLine1: '',
    addrLine2: '',
    addrPostalCode: 0,
    // addrSpatialLocation: { lat: '', lng: '' },
  });

  const evenHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setValueAddress({ ...valueAddress, [item]: event.target.value });
    };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Button Add
  const [visible, setVisible] = useState('hidden');

  const addData = (e: any) => {
    e.preventDefault();
    dispatch(doAddAddress(valueAddress));
    router.push('/Dashboar/master/address');
    setModal2Open(false);
    setVisible('');
    setTimeout(() => {
      setVisible('hidden');
    }, 2000);
  };
  return (
    <div className="w-3/4 mx-auto text-center">
      <Alert
        message="Success"
        description="Data Has been Successfully entered into the table."
        type="success"
        showIcon
        style={{ marginBottom: '16px' }}
        closable
        afterClose={() => setVisible('')}
        className={visible}
      />

      <div className="flex justify-start">
        {/* modal add data */}
        <>
          <Button
            className="bg-red-500 mb-5 w-28"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            Add
          </Button>
          <Modal
            title="Add Address"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
          >
            {/* Form */}
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{ layout: formLayout }}
              onValuesChange={onFormLayoutChange}
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="Form Layout" name="layout">
                <Radio.Group value={formLayout}>
                  <Radio.Button value="horizontal">Horizontal</Radio.Button>
                  <Radio.Button value="vertical">Vertical</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="addrLine1">
                <Input
                  placeholder=""
                  value={valueAddress.addrLine1}
                  onChange={evenHandler('addrLine1')}
                />
              </Form.Item>
              <Form.Item label="addrLine2">
                <Input
                  placeholder=""
                  value={valueAddress.addrLine2}
                  onChange={evenHandler('addrLine2')}
                />
              </Form.Item>
              <Form.Item label="addrPostalCode">
                <Input
                  placeholder=""
                  type="number"
                  min={0}
                  value={valueAddress.addrPostalCode}
                  onChange={evenHandler('addrPostalCode')}
                />
              </Form.Item>
              {/* <Form.Item label="addrSpatialLocation">
                <Input
                  placeholder=""
                  type="number"
                  min={0}
                  value={JSON.stringify(valueAddress.addrSpatialLocation)}
                  onChange={evenHandler('addrSpatialLocation')}
                />
              </Form.Item> */}
              <Form.Item {...buttonItemLayout}>
                <Button type="primary" className="bg-red-500" onClick={addData}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      </div>
      <div>
        <Table
          scroll={{ x: true }}
          size="middle"
          dataSource={dataAddress}
          columns={columns}
        />
      </div>
    </div>
  );
}
