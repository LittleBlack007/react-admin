import React from 'react';
import { Modal, Form, Input, Button,message } from 'antd';
import {addKind,updateKind} from '../../api/index'

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

class NewKind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
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

    onFinish = async (values) => {
        if(this.props.type === "添加"){
            const result = await addKind(values)
            if(result.data && result.data.data === 1){
                message.success('添加成功');
                window.location.reload();
            }
        }else{
            values.id = this.props.data.id
            const result = await updateKind(values)
            if(result.data && result.data.data === 1){
                message.success('成功');
                window.location.reload();
            }
        }
    };

    componentDidMount() {
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>
                <Button type="link" onClick={this.showModal} disabled={this.props.disabled}>
                    {this.props.type}
                </Button>
                <Modal title="职业" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'50%'}>
                    <Form
                        {...formItemLayout}
                        ref={this.formRef}
                        name="new_rated"
                        onFinish={this.onFinish}
                        initialValues={this.props.data}
                        scrollToFirstError
                    >
                        <Form.Item
                            label='职业'
                            name='kindName'
                        >
                            <Input />
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
export default NewKind;