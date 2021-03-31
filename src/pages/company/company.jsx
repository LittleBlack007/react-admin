import React from 'react';
import {Card,Table,Switch,Button, Image, Modal, message} from 'antd';
import '../../config/index.less';
import {getCompany,updateCompany,deleteCompany} from '../../api/index'

const {confirm} = Modal;

const dataSource = [
    {
      id: '1',
      companyPetName:'ppp',
      companyName:'知己设计',
      companyPwd:'123456',
      companyPhone:'13232672652',
      companyAddress:'广东金融学院',
      companyStatus:0,
      companyImg: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
      companyQualification:'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg,http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg,'
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
        title: '标志',
        dataIndex: 'companyImg',
        key: 'companyImg',
        render: text => (<Image src={text} width='80px' />)
    },
    {
        title: '公司名',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    {
      title: '账户名',
      dataIndex: 'companyPetName',
      key: 'companyPetName',
    },
    {
      title: '密码',
      dataIndex: 'companyPwd',
      key: 'companyPwd',
    },
    {
        title: '电话',
        dataIndex: 'companyPhone',
        key: 'companyPhone',
    },
    {
        title: '详细地址',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        ellipsis:true
    },
    {
        title: '公司证明',
        dataIndex: 'companyQualifications',
        key: 'companyQualifications',
        render: text => text !==''&& text!== null?text.slice(0,-1).split(",").map(item => <Image src={item} width='50px' />):null
    },
    {
        title: '审批状态',
        dataIndex: 'companyStatus',
        key: 'companyStatus',
        render: (text,row) => (
            <Switch 
                checkedChildren="通过" unCheckedChildren="不通过" defaultChecked={text === 1}  
                onChange={async (value)=> {
                    let status = value === true?1:0;
                    row.companyStatus = status;
                    const result = await updateCompany(row);
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
                        const result = await deleteCompany(record.id);
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
        const result = await getCompany();
        this.setState({data:result.data.data})
    }

    render() {
        return (
            <Card>
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
                            const result = await getCompany(value);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Company;