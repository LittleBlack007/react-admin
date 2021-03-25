import React from 'react';
import {Card,Table,Switch,Button, Image} from 'antd';
import './index.less';
import NewAdvertisement from './new-advertisement';


const dataSource = [
    {
      id: '1',
      adTitle: '胡彦斌',
      adUrl: 32,
      adPicture: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
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
        dataIndex: 'adLaunch',
        key: 'adLaunch',
        render: () => (<Switch checkedChildren="投放" unCheckedChildren="撤回" defaultChecked />)
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (record) => ([
            <NewAdvertisement />,
            <Button type='link' >删除</Button>
        ])
    },
]
class Advertisement extends React.Component {
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
                        return (record.id || record.id + Date.now()) //在这里加上一个时间戳就可以了
                    }}
                    columns={columns}
                    dataSource={dataSource}
                />
            </Card>
        )
    }
}
export default Advertisement;