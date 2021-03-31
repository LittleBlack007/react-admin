import React from 'react';
import {Card,Table,Switch,Button, Image, message,Modal,Select,Input} from 'antd';
import '../../config/index.less';
import {getPostAndUserByTNT} from '../../api/index';
import moment from 'moment';

const {comfirm} = Modal;

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
        dataIndex: 'post_title',
        key: 'postTitle',
        ellipsis:true
    },
    {
        title: '分类',
        dataIndex: 'post_type_id',
        key: 'typeId',
    },
    {
      title: '收藏数',
      dataIndex: 'post_com_num',
      key: 'postComNum',
    },
    {
        title: '点赞数',
        dataIndex: 'post_likes_num',
        key: 'postLikesNum',
    },
    {
        title: '浏览量',
        dataIndex: 'post_viewed',
        key: 'postViewed',
    },
    {
        title: '创建时间',
        dataIndex: 'post_last_date',
        key: 'postLastDate',
        render: text => moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
        title: '置顶',
        dataIndex: 'post_status',
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
            data:[],
            userName:'',
            typeId:null,
            postTitle:'',
        };
    }

    getData = async () => {
        
    }

    async componentDidMount(){
        const result = await getPostAndUserByTNT();
        this.setState({data:result.data.data})
    }

    render() {
        const {typeId,postTitle,userName} = this.state;
        return (
            <Card>
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
                            const result = await getPostAndUserByTNT(value,typeId,userName,postTitle);
                            this.setState({data:result.data.data})
                        }
                    }}
                />
            </Card>
        )
    }
}
export default Post;