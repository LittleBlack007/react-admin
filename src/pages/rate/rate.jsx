import React from 'react';
import { Card, Table, Tooltip, Button, Image,message, Modal, Select } from 'antd';
import '../../config/index.less';
import {getRate,deleteRate} from '../../api/index'
import moment from 'moment';

const {confirm} = Modal;
const {Option} = Select;
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
        render: text => moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
        title: '内容',
        dataIndex: 'rateContent',
        key: 'rateContent',
        ellipsis:true
    },
    {
        title: '评价',
        dataIndex: 'rateGrade',
        key: 'rateGrade',
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
        title: '图片',
        dataIndex: 'rateImgs',
        key: 'rateImgs',
        render: text => text !=='' ?text.slice(0,-1).split(",").map(item => <Image src={item} width='50px' />):null
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
                        const result = await deleteRate(record.id);
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
class Rate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            grade:null
        };
    }

    getData = async () => {

    }

    async componentDidMount() {
        const result = await getRate();
        this.setState({data:result.data.data})
    }

    onChange = async value => {
        this.setState({grade:value})
        const result = await getRate(1,value);
        this.setState({data:result.data.data})
    }

    render() {
        return (
            <Card extra={
                <Select placeholder="全部" onChange={this.onChange}>
                    <Option value={null}>全部</Option>
                    <Option value={1}>好评</Option>
                    <Option value={2}>中评</Option>
                    <Option value={3}>差评</Option>
                </Select>
            }>
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
                            const result = await getRate(value,this.state.grade);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Rate;