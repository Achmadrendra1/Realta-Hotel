import React from 'react'
import { Tabs, TabsProps } from 'antd';
import Dashboard from '@/layouts/dashboard';
import Stock from './stock';
import Vendor from './vendor';
import Pohe from './order';
import Cart from './cart';

export default function index() {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Vendor`,
      children: [<Vendor />]
    },
    {
      key: '2',
      label: 'Stock',
      children: [<Stock />]
    },
    {
      key: '3',
      label: `Purchase Order Header`,
      children: [<Pohe />]
    },
    // {
    //   key: '4',
    //   label: `Cart Order`,
    //   children: [<Cart />]
    // }
  ]

  return (
    <Dashboard>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Dashboard>
  )
}
