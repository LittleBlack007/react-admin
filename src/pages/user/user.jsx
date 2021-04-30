import React from 'react';
import {Card,Table,Switch,Button, Image, message, Modal,Input} from 'antd';
import '../../config/index.less';
import {getUser,deleteUser,updateUser} from '../../api/index'

const {confirm} = Modal;

const dataSource = [
    {
      id: '1',
      userName: '王晓红',
      userPetName:'wangixoahong',
      userPwd:'wangxiaohong',
      userSex:'男',
      userStatus:1,
      userPhone:'13232762562',
      userImg: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
    },
]
const columns = [
    {
        title:'id',
        dataIndex:'id',
        key:'id',
    },
    {
      title: '用户账号',
      dataIndex: 'userPetName',
      key: 'userPetName',
    },
    {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userPetName'
      },
    {
      title: '密码',
      dataIndex: 'userPwd',
      key: 'userPwd',
    },
    {
        title: '性别',
        dataIndex: 'userSex',
        key: 'userSex',
    },
    {
        title: '电话',
        dataIndex: 'userPhone',
        key: 'userPhone',
    },
    {
        title: '是否激活',
        dataIndex: 'userStatus',
        key: 'casePosition',
        render: (text,row) => (
            <Switch 
                checkedChildren="激活" unCheckedChildren="拉黑" defaultChecked={text === 1}  
                onChange={async (value)=> {
                    let status = value === true?1:0;
                    row.userStatus = status;
                    const result = await updateUser(row);
                    if(result.data && result.data.data === 1){
                        message.success('成功')
                    }
                }}
            />
        )
    },
    {
        title: '头像',
        dataIndex: 'userImg',
        key: 'userImg',
        render: text => <Image src={text} width='100px' />
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
                        const result = await deleteUser(record.id);
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
class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){
        const result = await getUser();
        this.setState({data:result.data.data});
    }

    onSearch = async value =>{
        const result = await getUser(1,value);
        this.setState({data:result.data.data});
    }

    render() {
        return (
            <Card extra={<Input.Search placeholder="输入名字" onSearch={this.onSearch} enterButton />}>
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
                            const result = await getUser(value);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Company;