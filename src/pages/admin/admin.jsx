import React, {Component} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home' ;
import User from '../user/user' ;
import Advertisement from '../advertisement'
import Case from '../case';
import Company from '../company';
import Order from '../order';
import Comment from '../comment';
import Rate from '../rate';
import Staff from '../staff';
import Kind from '../kind';
import Post from '../post';

const {Content, Footer, Sider } = Layout;

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        const user = memoryUtils.user;
        if(!user.id){
            return <Redirect to='/login'/>
        }
        return(
            <Layout >
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header style={{backgroundColor:'#fff'}}>
                        Header
                    </Header>
                    <Content style={{backgroundColor:"#fff", margin: '20px 20px 0'}}>
                        <Switch>
                        <Route path="/page/post" component={Post} />
                        <Route path="/page/kind" component={Kind} />
                        <Route path="/page/staff" component={Staff} />
                        <Route path="/page/rate" component={Rate} />
                        <Route path="/page/comment" component={Comment} />
                        <Route path="/page/order" component={Order} />
                            <Route path="/page/company" component={Company} />
                            <Route path="/page/case" component={Case} />
                            <Route path="/page/advertisement" component={Advertisement} />
                            <Route path='/page/user' component={User} />
                            <Route path='/page/home' component={Home} />
                            <Redirect to='/page/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}} >
                        @balbala后台管理系统
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin;