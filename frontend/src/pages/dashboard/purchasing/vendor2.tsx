import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface DataType {
    name: string;
    active: number;
    priority: number;
    register_date: string;
    web_url: string;
    modified_date: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        name: 'John Brown',
        active: 1,
        priority: 1,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
    {
        name: 'Joe Black',
        active: 1,
        priority: 0,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
    {
        name: 'Jim Green',
        active: 0,
        priority: 1,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
    {
        name: 'Jim Red',
        active: 0,
        priority: 0,
        register_date: '2023/01/01',
        web_url: 'http/www.blablabla.com',
        modified_date: '2023/02/02'
    },
];

const Vendor: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        }, {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: '20%',
            ...getColumnSearchProps('active'),
            sorter: (a, b) => a.active - b.active,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: '20%',
            ...getColumnSearchProps('priority'),
            sorter: (a, b) => a.priority - b.priority,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Register Date',
            dataIndex: 'register_date',
            key: 'register_date',
            width: '20%',
            ...getColumnSearchProps('register_date'),
            sorter: (a, b) => a.register_date.length - b.register_date.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'WebURL',
            dataIndex: 'web_url',
            key: 'web_url',
            ...getColumnSearchProps('web_url'),
            sorter: (a, b) => a.web_url.length - b.web_url.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Modified Date',
            dataIndex: 'modified_date',
            key: 'modified_date',
            ...getColumnSearchProps('modified_date'),
            sorter: (a, b) => a.modified_date.length - b.modified_date.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    return <Table className="flex h-screen justify-center items-center" columns={columns} dataSource={data} />;
};

export default Vendor;
// export default function stock() {
//     const dataSource = [
//         {
//             key: '1',
//             name: 'Mike',
//             age: 32,
//             address: '10 Downing Street',
//         },
//         {
//             key: '2',
//             name: 'John',
//             age: 42,
//             address: '10 Downing Street',
//         },
//     ];

//     const columns = [
//         {
//             title: 'Id',
//             dataIndex: 'stockId',
//             key: 'id',
//         },
//         {
//             title: 'Name',
//             dataIndex: 'stockName',
//             key: 'name',
//         },
//         {
//             title: 'Description',
//             dataIndex: 'stockDescription',
//             key: 'stockDescription',
//         },
//         {
//             title: 'Quantity',
//             dataIndex: 'stockQuantity',
//             key: 'stockQuantity',
//         },
//         {
//             title: 'Reorder-Point',
//             dataIndex: 'stockReorderPoint',
//             key: 'stockReorderPoint',
//         },
//         {
//             title: 'Used',
//             dataIndex: 'stockUsed',
//             key: 'stockUsed',
//         },
//         {
//             title: 'Scrap',
//             dataIndex: 'stockScrap',
//             key: 'stockScrap',
//         },
//         {
//             title: 'Price',
//             dataIndex: 'stockPrice',
//             key: 'stockPrice',
//         },
//         {
//             title: 'Standar Cost',
//             dataIndex: 'stockStandarCost',
//             key: 'stockStandarCost',
//         },
//         {
//             title: 'Size',
//             dataIndex: 'stockSize',
//             key: 'stockSize',
//         },
//         {
//             title: 'Color',
//             dataIndex: 'stockColor',
//             key: 'stockColor',
//         },
//         {
//             title: 'Modified-Date',
//             dataIndex: 'stockModifiedDate',
//             key: 'stockModifiedDate',
//         },
//     ];
//     return (
//         <div className="flex h-screen justify-center items-center">
//             <Table dataSource={dataSource} columns={columns} />
//         </div>
//     )
// };
