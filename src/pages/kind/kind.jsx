import React from 'react';
import {Card,Table,Button,message,Modal} from 'antd';
import NewKind from './new-kind';
import {getKind,deleteKind} from '../../api/index';

const {confirm} = Modal

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
            <NewKind data={record} type='编辑'/>,
            <Button type='link'onClick={() => {
                confirm({
                    okText:'确定',
                    cancelText:'取消',
                    content: '确定删除？',
                    async onOk() {
                        const result = await deleteKind(record.id);
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
        const result = await getKind();
        this.setState({data:result.data.data})
    }

    render() {
        return (
            <Card extra={<NewKind type='添加'/>}>
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
                            const result = await getKind(value);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default kind;