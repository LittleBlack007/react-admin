import React from 'react';
import { Modal, Form, Input, Button, Upload ,message} from 'antd';
import {addAdvertisement,updateAdvertisement} from '../../api/index'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 6,
        },
    },
};

class NewAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgStatus:null,
            modalVisible: false,
            picUrl:'',
        };
        this.formRef = React.createRef();
    }

    showModal = () => {
        this.setState({ modalVisible: true })
    };

    handleOk = () => {
        this.setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setState({ modalVisible: false })
    };

    onFinish = async(values) => {
        if(this.props.type === '添加'){
            values.adPicture = this.state.picUrl;
            values.adStatus = 1;
            const result = await addAdvertisement(values);
            if(result.data && result.data.data === 1){
                message.success('添加成功');
                window.location.reload();
            }
        }else{
            values.id = this.props.data.id
            values.adPicture = this.state.picUrl;
            const result = await updateAdvertisement(values);
            if(result.data && result.data.data === 1){
                message.success('更新成功');
                window.location.reload();
            }
        }
        
    };

    componentDidMount() {
        let t = this.props.data?true:false;
        this.setState({imgStatus:t})
        if(t){
            this.setState({picUrl:this.props.data.adPicture})
        }
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>
                <Button type="link" onClick={this.showModal} disabled={this.props.disabled}>
                    {this.props.type}
                </Button>
                <Modal title="广告" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                    <Form
                        initialValues={this.props.data}
                        {...formItemLayout}
                        ref={this.formRef}
                        name="new_rated"
                        onFinish={this.onFinish}
                        // initialValues={
                        scrollToFirstError
                    >
                        <Form.Item
                            label='广告标题'
                            name='adTitle'
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='广告url'
                            name='adUrl'
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='上传图片'
                            name='adPicture'
                        >
                            <Upload
                                maxCount={1}
                                action="http://localhost:8080/user/upload_pic"
                                accept="image/*"
                                listType="picture-card"
                                name='pic' //发到后台的文件参数名
                                //onPreview={this.handlePreview} 
                                onChange={({ file, fileList }) => {
                                    if (file.status === "done") {
                                        if (file.response.status === 'success') {
                                            const { data } = file.response;
                                            this.setState({ picUrl: data,imgStatus:false })
                                        }
                                    }
                                }}
                                showUploadList={true}
                            >
                                {this.state.imgStatus?<img src={this.props.data.adPicture} style={{width:'100px',height:'100px'}} />:'+上传照片'}
                            </Upload>
                        </Form.Item>
                        
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
export default NewAdvertisement;