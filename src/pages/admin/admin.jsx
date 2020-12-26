import React, {Component} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home' ;
import Category from '../category/category'; 
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user' ;
import Bar from '../charts/bar' ;
import Pie from '../charts/pie';
import Line from '../charts/line'

const {Content, Footer, Sider } = Layout;

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        const user = memoryUtils.user;
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header style={{backgroundColor:'#fff'}}>
                        Header
                    </Header>
                    <Content style={{backgroundColor:"#fff", margin: '20px 20px 0'}}>
                        <Switch>
                            <Route path='/page/user' component={User} />
                            <Route path='/page/home' component={Home} />
                            <Route path='/page/charts/bar' component={Bar} />
                            <Route path='/page/charts/line' component={Line} />
                            <Route path='/page/charts/pie' component={Pie} />
                            <Route path='/page/role' component={Role} />
                            <Route path='/page/products' component={Product} />
                            <Route path='/page/category' component={Category} />
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