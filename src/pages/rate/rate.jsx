import React from 'react';
import { Card, Table, Tooltip, Button, Image } from 'antd';
import '../../config/index.less';


const dataSource = [
    {
        id: '1',
        rateContent: '装修师傅完成的很好，我很满意，师傅的技术一流',
        orderId: 3,
        userId: 4,
        companyId:1,
        rateTime: '2020-01-01 23:12:01',
        staffId:1,
        rateGrade:1,
        rateImgs:'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg,http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg,'
    }
]
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '用户id',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '员工id',
        dataIndex: 'staffId',
        key: 'staffId',
    },
    {
        title: '订单id',
        dataIndex: 'orderId',
        key: 'orderId',
        ellipsis: true,
    },
    {
        title: '创建时间',
        dataIndex: 'rateTime',
        key: 'rateTime',
    },
    {
        title: '内容',
        dataIndex: 'rateContent',
        key: 'rateContent',
        ellipsis:true
    },
    {
        title: '图片',
        dataIndex: 'rateImgs',
        key: 'rateImgs',
        render: text => text !=='' ?text.slice(0,-1).split(",").map(item => <Image src={item} width='50px' />):null
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (record) => ([
            <Button type='link' >删除</Button>
        ])
    },
]
class Rate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    getData = async () => {

    }

    async componentDidMount() {

    }

    render() {
        return (
            <Card>
                <Table
                    rowKey={(record) => {
                        return (record.order_id || record.dorder_id + Date.now()) //在这里加上一个时间戳就可以了
                    }}
                    columns={columns}
                    dataSource={dataSource}
                />
            </Card>
        )
    }
}
export default Rate;