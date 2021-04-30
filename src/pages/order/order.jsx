import React from 'react';
import {Card,Table,Tooltip,Button, message, Modal, Select} from 'antd';
import '../../config/index.less';
import {getOrder,deleteOrder} from '../../api/index';
import moment from 'moment';

const {confirm} = Modal;
const {Option} = Select;

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
        render: text => moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
        title: '类型',
        dataIndex: 'orderType',
        key: 'orderType',
        //render: text => text===0?'设计':'施工'
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
        render: (text,record) => ([
            <Button type='link'onClick={() => {
                confirm({
                    okText:'确定',
                    cancelText:'取消',
                    content: '确定删除？',
                    async onOk() {
                        const result = await deleteOrder(record.id);
                        if(result.data && result.data.data === 1){
                            message.success('删除成功');
                            window.location.reload();
                        }
                    },
                    onCancel() {
                      //console.log('Cancel');
                    },
                  });
            }} >
                删除
            </Button>
        ])
    },
]
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            type:'',
            status:'',
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){
        const result = await getOrder();
        this.setState({data:result.data.data})
    }

    onChange = async value => {
        this.setState({type:value})
        const result = await getOrder(1,value,this.state.status);
        this.setState({data:result.data.data})
    }

    onStatusChange = async value => {
        this.setState({status:value})
        const result = await getOrder(1,this.state.status,value);
        this.setState({data:result.data.data})
    }

    render() {
        return (
            <Card 
                extra={[
                    '订单类型：',<Select placeholder='全部' onChange={this.onChange}>
                        <Option value=''>全部</Option>
                        <Option value='施工'>施工</Option>
                        <Option value='设计'>设计</Option>
                    </Select>,' ',
                    '订单状态：',<Select placeholder='全部' onChange={this.onStatusChange}>
                        <Option value=''>全部</Option>
                        <Option value='0'>准备中</Option>
                        <Option value='1'>进行中</Option>
                        <Option value='2'>已完成</Option>
                    </Select>
                ]}>
                <Table
                    rowKey={(record) => {
                        return (record.id || record.id + Date.now()) //在这里加上一个时间戳就可以了
                    }}
                    columns={columns}
                    dataSource={this.state.data.list}
                    pagination={{
                        pageSize:this.state.data.pageSize,
                        pageNum:this.state.data.pageNum,
                        total:this.state.data.total,
                        onChange:async (value) => {
                            const result = await getOrder(value,this.state.type,this.state.status);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Order;