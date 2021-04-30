import React, { Component } from 'react';
import {Row,Col,Card,Statistic,message} from 'antd';
import './home.less';
import BarChart from '../../components/echarts/BarChart'

const category = ['巧妙装修','工匠大师','精装装饰','极度设计','超级施工','小马施工','蚂蚁建房','蜜蜂基建'];
const value =[150,145,100,42,31,20,15,12];

const category1 = ['张三','李师','王屋','陈建','郑居','李超','孙峰','梁工'];
const value1 =[25,15,10,14,13,11,5,2];

const colPhone ={
    xl:24,
    ls:24,
    sm:24,
    lg:24
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div >
                {message.success('欢迎来到巴拉巴拉后台管理系统首页',3)}
                <Row gutter={24} justify='center' style={{margin:'20px 0px'}} >
                    <Col span={6}>
                        <Card style={{backgroundColor:'orange',borderRadius:'8px'}}>
                            <Statistic title="平台订单总收入(￥)" value={112893} precision={2} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{backgroundColor:'#91CC75',borderRadius:'8px'}}>
                            <Statistic title="平台昨日订单总收入(￥)" value={1893} precision={2} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{backgroundColor:'#73C0DE',borderRadius:'8px'}}>
                            <Statistic title="平台订单成交数" value={111893}  />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{backgroundColor:'pink',borderRadius:'8px'}}>
                            <Statistic title="平台昨日订单成交数" value={183}  />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop:'20px'}}>
                    <Col {...colPhone} xl={12}>
                        <Card title="优秀公司前十榜单">
                            <BarChart data={{category,value,label:'完成订单总数'}}/>
                        </Card>
                    </Col>
                    <Col {...colPhone} xl={12}>
                        <Card title="优秀员工前十榜单">
                            <BarChart data={{category:category1,value:value1,label:'完成工地总数'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;