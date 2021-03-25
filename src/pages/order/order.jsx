import React from 'react';
import {Card,Table,Tooltip,Button, Image} from 'antd';
import '../../config/index.less';


const dataSource = [
    {
      id: '1',
      userId:12,
      staffId:123,
      userName: '王晓红',
      orderStatus:1,
      orderCommission:8888888,
      orderCreateTime: '2020-01-01 23:33:12',
      orderType:1,
      orderRatedStatus:2,
      orderContent:'完成130平米的地板贴砖'
     }
]
const columns = [
    {
        title:'id',
        dataIndex:'id',
        key:'id',
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
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: text => {
            let show = '';
            if(text===0){
                show='准备中'
            }else if(text === 1){
                show = '进行中'
            }else{
                show = '已完成'
            }
            return show
        }
      },
    {
      title: '佣金￥',
      dataIndex: 'orderCommission',
      key: 'orderCommission',
    },
    {
        title: '创建时间',
        dataIndex: 'orderCreateTime',
        key: 'orderCreateTime',
    },
    {
        title: '类型',
        dataIndex: 'orderType',
        key: 'orderType',
        render: text => text===0?'设计':'施工'
    },
    {
        title: '评价',
        dataIndex: 'orderRatedStatus',
        key: 'orderRatedStatus',
        render: text => {
            let show =''
            if(text === 0){
                show = '未评价'
            }
            else if(text === 1){
                show = '好评'
            }
            else if(text === 2){
                show = '中评'
            }
            else {
                show = '差评'
            }
            return show
            
        }
    },
    {
        title: '内容',
        dataIndex: 'orderContent',
        key: 'orderContent',
        render: text => <Tooltip title={text} >查看</Tooltip>
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (record) => ([
            <Button type='link' >编辑</Button>,
            <Button type='link' >删除</Button>
        ])
    },
]
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){

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
export default Order;