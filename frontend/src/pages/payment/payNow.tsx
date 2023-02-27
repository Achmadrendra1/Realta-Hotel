import Layouts from '@/layouts/layout'
import { Col, Row, Select, Space } from 'antd'
import React from 'react'

export default function pay() {
  return (
    <Layouts>
        <Row gutter={12}>
            <Col span={8} className=''>
                <div className='w-full h-screen bg-white drop-shadow-lg'>
                    test
                </div>
            </Col>
            <Col span={16}>
                <div className='border-2 w-full h-screen bg-slate-300 drop-shadow-lg p-8'>
                    <p className='text-xl font-bold'>Payment</p>
                  
                </div>
            </Col>
        </Row>
    </Layouts>
  )
}
