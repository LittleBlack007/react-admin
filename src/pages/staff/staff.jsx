import React from 'react';
import {Card,Table,Switch,Button, Image, message,Input,Modal} from 'antd';
import '../../config/index.less';
import {getStaff,deleteStaff,updateStaff} from '../../api/index';

const {confirm} = Modal;

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
        title: '所属公司id',
        dataIndex: 'companyId',
        key: 'companyId',
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
      ellipsis:true,
    },
    {
      title: '密码',
      dataIndex: 'staffPwd',
      key: 'staffPwd',
      ellipsis:true,
    },
    {
        title: '电话',
        dataIndex: 'staffPhone',
        key: 'staffPhone',
        ellipsis:true,
    },
    {
        title: '工种',
        dataIndex: 'kindId',
        key: 'kindId',
    },
    {
        title:'入驻时间',
        dataIndex:'staffStart',
        key:'staffStart',
        ellipsis:true,
    },
    {
        title: '个人简介',
        dataIndex: 'staffProfile',
        key: 'staffProfile',
        ellipsis:true,
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
        render: (text,row) => (
            <Switch 
                checkedChildren="激活" unCheckedChildren="拉黑" defaultChecked={text === 1}  
                onChange={async (value)=> {
                    let status = value === true?1:0;
                    row.staffStatus = status;
                    const result = await updateStaff(row);
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
            <Button type='link'onClick={() => {
                confirm({
                    okText:'确定',
                    cancelText:'取消',
                    content: '确定删除？',
                    async onOk() {
                        const result = await deleteStaff(record.id);
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
class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            name:'',
            kindId:null
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){
        const result = await getStaff(1);
        this.setState({data:result.data.data});
    }
    
    onSearch = async value => {
        const result = await getStaff(1,value,this.state.kindId);
        this.setState({name:value,data:result.data.data});
    }

    onChange = async value => {
        const result = await getStaff(1,this.state.name,value);
        this.setState({kindId:value,data:result.data.data});
    }

    render() {
        return (
            <Card extra={<Input.Search placeholder="输入员工名字" onSearch={this.onSearch} enterButton />}>
                <Table
                    rowKey={(record) => {
                        return (record.order_id || record.dorder_id + Date.now()) //在这里加上一个时间戳就可以了
                    }}
                    columns={columns}
                    dataSource={this.state.data.list}
                    pagination={{
                        pageSize:this.state.data.pageSize,
                        pageNum:this.state.data.pageNum,
                        total:this.state.data.total,
                        onChange:async (value) => {
                            const result = await getStaff(value,this.state.name,this.state.kindId);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Staff;