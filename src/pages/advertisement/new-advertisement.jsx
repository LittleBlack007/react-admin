import React from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';

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

    onFinish = (values) => {
        values.adPicture = this.state.picUrl;
    };

    componentDidMount() {
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>
                <Button type="link" onClick={this.showModal} disabled={this.props.disabled}>
                    添加
                </Button>
                <Modal title="广告" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                    <Form
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
                                            this.setState({ picUrl: data })
                                        }
                                    }
                                }}
                                showUploadList={true}
                            >
                                +上传照片    
                            </Upload>
                        </Form.Item>
                        
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                确定添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
export default NewAdvertisement;