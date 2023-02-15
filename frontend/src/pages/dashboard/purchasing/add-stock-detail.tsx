import React, { useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    FormInstance,
    Button,
    Upload,
    Typography,
} from 'antd';
import Dashboard from '@/layouts/dashboard';
import { PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography;

const StockEdit: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };
    return (
        <Dashboard>
            <Title level={3} className='m-5'>Add Detail Stock</Title>
            <form className='m-5'>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="barcode_number" id="barcode_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="barcode_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Barcode Number</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="status" className="block mb-2 text-sm text-gray-500 dark:text-gray-400">Select status</label>
                    <select id="status" className="border border-gray-300 text-gray-500 dark:text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Stocked</option>
                        <option>Expired</option>
                        <option>Broken</option>
                        <option>Used</option>
                    </select>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="notes" className="block mb-2 text-sm text-gray-500 dark:text-gray-400">Notes</label>
                    <textarea id="notes" rows={4} className="block p-2.5 w-full text-sm border-gray-300 text-gray-500 dark:text-gray-600 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a notes..."></textarea>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="facilities" className="block mb-2 text-sm text-gray-500 dark:text-gray-400">Select Facilities</label>
                    <select id="facilities" className="border border-gray-300 text-gray-500 dark:text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Stocked</option>
                        <option>Expired</option>
                        <option>Broken</option>
                        <option>Used</option>
                    </select>
                </div>

                <button type="reset" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">Reset</button>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </Dashboard>
    );
};

export default () => <StockEdit />;