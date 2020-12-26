import React,{Component} from 'react';
import {AimOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom';
import {Button,Modal } from 'antd';
import {formateDate} from '../../utils/dateUtils';
import menoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import {reqWeather} from '../../api/index';
import './index.less';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            SYSTime:'2020-12-16 10:35',
            weather:'晴朗',
            dayPictureUrl:'',
        }
    }

    componentDidMount(){
        this.getSysTime();
        this.getWeather('广州');
    }

    componentWillUnmount(){
        //清除定时器
        clearInterval(this.intervalId);
    }

    getWeather = async (_city) => {
        const {city,weather} = await reqWeather(_city);
        this.setState({
            weather,
            city,
        })
    }

    logout = () => {
        Modal.confirm({
            content: '确定退出？',
            okText:'确定',
            cancelText:'取消',
            onOk: () => {
                storageUtils.removeUser();
                menoryUtils.user = {};
                this.props.history.replace('/login');
            },
            onCancel: () => {}
        })
    }

    getTitle = path => {
        let title;
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title;
            }else if(item.children){
                item.children.forEach(cItem => {
                    if(cItem.key === path){
                        title = cItem.title;
                    }
                })
            }
        })
        return title;
    }

    getSysTime = () => {
        this.intervalId = setInterval(() => {
            this.setState({SYSTime:formateDate(Date.now())})
        },1000)
    }

    render(){
        const title = this.getTitle(this.props.location.pathname)
        const user = menoryUtils.user;
        const {SYSTime,city,weather} = this.state;
        return(
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，<a href='javasrcipt:'>{user.username}</a></span>
                    <Button type='link' onClick={this.logout}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{SYSTime}</span>
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723476239,2504378195&fm=26&gp=0.jpg" alt="weather-images"/>
                        <span>{weather}&nbsp;<AimOutlined />{city}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);