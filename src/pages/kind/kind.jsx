import React from 'react';
import {Card,Table,Button} from 'antd';
import NewKind from './new-kind';


const dataSource = [
    {
      id: '1',
      kindName: '设计师',
    },
    {
        id: '2',
        kindName: '泥瓦工',
      },
]
const columns = [
    {
        title:'id',
        dataIndex:'id',
        key:'id',
    },
    {
      title: '工种名称',
      dataIndex: 'kindName',
      key: 'kindName',
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text,record) => ([
            <NewKind kindId = {record.id} type='添加'/>,
            <NewKind kindId = {record.id} type='编辑'/>,
            <Button type='link' >删除</Button>
        ])
    },
]
class kind extends React.Component {
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
export default kind;