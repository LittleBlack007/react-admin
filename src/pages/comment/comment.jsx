import React from 'react';
import { Card, Table, Tooltip, Button, Image } from 'antd';
import '../../config/index.less';


const dataSource = [
    {
        id: '1',
        commentContent: '装修师傅完成的很好，我很满意，师傅的技术一流',
        postId: 3,
        userId: 4,
        commentCreateTime: '2020-01-01 23:12:01'
    }
]
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '用户id',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '帖子id',
        dataIndex: 'postId',
        key: 'postId',
    },
    {
        title: '内容',
        dataIndex: 'commentContent',
        key: 'commentContent',
        ellipsis: true,
    },
    {
        title: '创建时间',
        dataIndex: 'commentCreateTime',
        key: 'commentCreateTime',
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
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    getData = async () => {

    }

    async componentDidMount() {

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
export default Comment;