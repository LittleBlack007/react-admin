import React from 'react';
import {Card,Table,Switch,Button, Image} from 'antd';
import '../../config/index.less';


const dataSource = [
    {
      id: '1',
      staffPetName:'ppp',
      staffName:'张楚岚',
      staffPwd:'123456',
      staffPhone:'13232672652',
      staffAddress:'广东金融学院',
      staffStatus:1,
      companyId:3,
      staffStart:'2020-01-04 23:23:00',
      staffProfile:'本人从业10年',
      kindId:1,
      staffImg: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
    },
]
const columns = [
    {
        title:'id',
        dataIndex:'id',
        key:'id',
        // className:'noShow'
    },
    {
        title: '头像',
        dataIndex: 'staffImg',
        key: 'staffImg',
        render: text => (<Image src={text} width='80px' />)
    },
    {
        title: '姓名',
        dataIndex: 'staffName',
        key: 'staffName',
      },
    {
      title: '账户名',
      dataIndex: 'staffPetName',
      key: 'staffPetName',
    },
    {
      title: '密码',
      dataIndex: 'staffPwd',
      key: 'staffPwd',
    },
    {
        title: '电话',
        dataIndex: 'staffPhone',
        key: 'staffPhone',
    },
    {
        title: '工种',
        dataIndex: 'kindId',
        key: 'kindId',
    },
    {
        title: '所属公司id',
        dataIndex: 'companyId',
        key: 'companyId',
    },
    {
        title:'入驻时间',
        dataIndex:'staffStart',
        key:'staffStart'
    },
    {
        title: '个人简介',
        dataIndex: 'staffProfile',
        key: 'staffProfile',
    },
    {
        title: '详细地址',
        dataIndex: 'staffAddress',
        key: 'staffAddress',
        ellipsis:true
    },
    {
        title: '状态',
        dataIndex: 'staffStatus',
        key: 'staffStatus',
        render: (text) => (<Switch checkedChildren="激活" unCheckedChildren="封禁" defaultChecked={text===1} />)
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
class Staff extends React.Component {
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
export default Staff;