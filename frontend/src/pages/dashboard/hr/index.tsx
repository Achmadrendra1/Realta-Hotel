import Department from "@/components/hr/department"
import Dashboard from "@/layouts/dashboard"
import { Tabs } from "antd"

const Human = () => {
    return(
        <Dashboard>
            <h1 className="text-2xl font-semibold">Human Resources</h1>
            <Tabs items={[
                {
                    key: '1',
                    label: 'Department',
                    children: <Department/>
                },
                {
                    key: '2',
                    label: 'Employees',
                    children: <div>Test</div>
                },
                {
                    key: '3',
                    label: 'Work Orders',
                    children: <div>Test</div>
                }
            ]}/>
        </Dashboard>
    )
}

export default Human