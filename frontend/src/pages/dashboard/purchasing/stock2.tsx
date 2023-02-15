import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface DataType {
    name: string;
    desc: string;
    quantity: number;
    reorder_point: number;
    used: number;
    scrap: number;
    price: number;
    standard_cost: number;
    size: string;
    color: string;
    modified_date: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        name: 'John Brown',
        desc: 'Lorem Ipsum',
        quantity: 20,
        reorder_point: 20,
        used: 10,
        scrap: 10,
        price: 10000,
        standard_cost: 10000,
        size: 'medium',
        color: 'white',
        modified_date: '2023/02/04',
    },{
        name: 'Joe Black',
        desc: 'Lorem Ipsum',
        quantity: 20,
        reorder_point: 20,
        used: 10,
        scrap: 10,
        price: 10000,
        standard_cost: 10000,
        size: 'medium',
        color: 'white',
        modified_date: '2023/02/04',
    },{
        name: 'Jim Green',
        desc: 'Lorem Ipsum',
        quantity: 20,
        reorder_point: 20,
        used: 10,
        scrap: 10,
        price: 10000,
        standard_cost: 10000,
        size: 'medium',
        color: 'white',
        modified_date: '2023/02/04',
    }, {
        name: 'Jim Red',
        desc: 'Lorem Ipsum',
        quantity: 20,
        reorder_point: 20,
        used: 10,
        scrap: 10,
        price: 10000,
        standard_cost: 10000,
        size: 'medium',
        color: 'white',
        modified_date: '2023/02/04',
    },
];

const Stock: React.FC = () => {
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
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: '20%',
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
            ...getColumnSearchProps('quantity'),
            sorter: (a, b) => a.quantity - b.quantity,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Reorder Point',
            dataIndex: 'reorder_point',
            key: 'reorder_point',
            width: '20%',
            ...getColumnSearchProps('reorder_point'),
            sorter: (a, b) => a.reorder_point - b.reorder_point,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Used',
            dataIndex: 'used',
            key: 'used',
            width: '20%',
            ...getColumnSearchProps('used'),
            sorter: (a, b) => a.used - b.used,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Scrap',
            dataIndex: 'scrap',
            key: 'scrap',
            width: '20%',
            ...getColumnSearchProps('scrap'),
            sorter: (a, b) => a.scrap - b.scrap,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Standard Cost',
            dataIndex: 'standard_cost',
            key: 'standard_cost',
            width: '20%',
            ...getColumnSearchProps('standard_cost'),
            sorter: (a, b) => a.standard_cost - b.standard_cost,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: '20%',
            ...getColumnSearchProps('size'),
            sorter: (a, b) => a.size.length - b.size.length,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            width: '20%',
            ...getColumnSearchProps('color'),
            sorter: (a, b) => a.color.length - b.color.length,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Modified Date',
            dataIndex: 'modified_date',
            key: 'modified_date',
            width: '20%',
            ...getColumnSearchProps('modified_date'),
            sorter: (a, b) => a.modified_date.length - b.modified_date.length,
            sortDirections: ['descend', 'ascend'],
        }
    ];

    return <Table className="flex h-screen justify-center items-center" columns={columns} dataSource={data} />;
};

export default Stock;
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
