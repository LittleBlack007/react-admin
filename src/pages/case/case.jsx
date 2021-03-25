import React from 'react';
import {Card,Table,Switch,Button, Image} from 'antd';
import '../../config/index.less';


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
        render: (text) => (<Switch checkedChildren="置顶" unCheckedChildren="不置顶" defaultChecked={text===1} />)
    },
    {
        title: '案例封面',
        dataIndex: 'caseIndexImg',
        key: 'caseIndexImg',
        render: text => <Image src={text} width='100px' />
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
class Case extends React.Component {
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
export default Case;