import React from 'react';
import {Card,Table,Switch,Button, Image} from 'antd';
import '../../config/index.less';


const dataSource = [
    {
      id: 1,
      userId:2,
      postTitle:'知己设计',
      postcontent:'<p>123</p>',
      postViewed:999,
      postComNum:888,
      postLastDate:'2020-01-09 23:32:16',
      postLikesNum:100,
      postPosition:1,
    },
]
const columns = [
    {
        title:'id',
        dataIndex:'id',
        key:'id',
    },
    {
        title: '标题',
        dataIndex: 'postTitle',
        key: 'postTitle',
    },
    {
        title: '分类',
        dataIndex: 'typeId',
        key: 'typeId',
    },
    {
      title: '内容',
      dataIndex: 'postContent',
      key: 'postContent',
      ellipsis:true
    },
    {
      title: '收藏数',
      dataIndex: 'postComNum',
      key: 'postComNum',
    },
    {
        title: '点赞数',
        dataIndex: 'postLikesNum',
        key: 'postLikesNum',
    },
    {
        title: '浏览量',
        dataIndex: 'postViewed',
        key: 'postViewed',
    },
    {
        title: '创建时间',
        dataIndex: 'postLastDate',
        key: 'postLastDate',
    },
    {
        title: '置顶',
        dataIndex: 'postStatus',
        key: 'postStatus',
        render: (text) => (<Switch checkedChildren="置顶" unCheckedChildren="不置顶" defaultChecked={text===1} />)
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => ([
            <Button type='link' >删除</Button>
        ])
    },
]
class Post extends React.Component {
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
export default Post;