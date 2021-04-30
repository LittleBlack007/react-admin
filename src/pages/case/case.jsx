import React from 'react';
import {Card,Table,Switch,Button, Image,Modal,message} from 'antd';
import '../../config/index.less';
import {getCases,deleteCase,updateCase} from '../../api/index'

const {confirm} = Modal

const dataSource = [
    {
      id: '1',
      caseTitle: '世纪花园',
      caseBudget: 32,
      caseArea:123,
      staffId:1,
      CasePosition:1,
      caseIndexImg: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
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
      title: '标题',
      dataIndex: 'caseTitle',
      key: 'caseTitle',
    },
    {
      title: '建成预算￥',
      dataIndex: 'caseBudget',
      key: 'caseBudget',
    },
    {
        title: '面积',
        dataIndex: 'caseArea',
        key: 'caseArea',
        render: text => (<span>{text}m<sup>2</sup></span>)
    },
    {
        title: '设计者id',
        dataIndex: 'staffId',
        key: 'staffId',
    },
    {
        title: '是否置顶',
        dataIndex: 'casePosition',
        key: 'casePosition',
        render: (text,row) => (
            <Switch 
            checkedChildren="置顶" unCheckedChildren="不置顶" defaultChecked={text === 1}  
            onChange={async (value)=> {
                let status = value === true?1:0;
                row.casePosition = status;
                const result = await updateCase(row);
                if(result.data && result.data.data === 1){
                    message.success('成功')
                }
            }}
        />)
    },
    {
        title: '案例封面',
        dataIndex: 'caseIndeximg',
        key: 'caseIndeximg',
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
                        const result = await deleteCase(record.id);
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
class Case extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{list:[]}
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){
        const result =await getCases(1,'');
        this.setState({data:result.data.data});
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
                            const result = await getCases(value);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Case;