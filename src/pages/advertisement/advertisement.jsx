import React from 'react';
import {Card,Table,Switch,Button, Image, message,Modal} from 'antd';
import './index.less';
import {getAdvertisements,updateAdvertisement,deleteAdvertisement} from '../../api/index'
import NewAdvertisement from './new-advertisement';
import huo1 from '../../assets/images/huodong1.jpg'
import huo2 from '../../assets/images/huodong2.jpg'
import huo3 from '../../assets/images/huodong3.jpg'

const { confirm } = Modal;
const dataSource = [
    {
      id: '1',
      adTitle: '活动1',
      adUrl: 'meituan.com',
      adPicture: huo1,
    },
    {
        id: '2',
        adTitle: '活动2',
        adUrl: 'aiqiyi.com',
        adPicture: huo2,
      },
      {
        id: '3',
        adTitle: '活动3',
        adUrl: 'taobao.com',
        adPicture: huo3,
      },
    
]
const columns = [
    {
        title:'id',
        dataIndex:'id',
        key:'id',
        className:'noShow'
    },
    {
      title: '广告标题',
      dataIndex: 'adTitle',
      key: 'adTitle',
    },
    {
      title: '广告超链接',
      dataIndex: 'adUrl',
      key: 'adUrl',
    },
    {
        title: '广告图片',
        dataIndex: 'adPicture',
        key: 'adPicture',
        render: text => <Image src={text} width='100px' />
    },
    {
        title: '是否投放',
        dataIndex: 'adStatus',
        key: 'adStatus',
        render: (text,row) => (
            <Switch 
                checkedChildren="投放" unCheckedChildren="撤回" defaultChecked={text === 1}  
                onChange={async (value)=> {
                    let status = value === true?1:0;
                    row.adStatus = status;
                    const result = await updateAdvertisement(row);
                    if(result.data && result.data.data === 1){
                        message.success('成功')
                    }
                }}
            />
        )
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text,record) => ([
            <NewAdvertisement data={record} type='更新'/>,
            <Button type='link'onClick={() => {
                confirm({
                    okText:'确定',
                    cancelText:'取消',
                    content: '确定删除？',
                    async onOk() {
                        const result = await deleteAdvertisement(record.id);
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
class Advertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{list:[]}
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){
        const result = await getAdvertisements();
        this.setState({data:result.data.data})
    }

    render() {
        return (
            <Card extra={<NewAdvertisement type='添加' />} >
                <Table
                    rowKey={(text,record) => {
                        return (record.id || record.id + Date.now()) //在这里加上一个时间戳就可以了
                    }}
                    columns={columns}
                    dataSource={this.state.data.list}
                    pagination={{
                        pageSize:this.state.data.pageSize,
                        pageNum:this.state.data.pageNum,
                        total:this.state.data.total,
                        onChange:async (value) => {
                            const result = await getAdvertisements(value);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Advertisement;