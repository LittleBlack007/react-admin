import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Menu } from 'antd';
import './left-nav.less';
import logo from '../../assets/images/logo.jpg';
import menuConfig from '../../config/menuConfig';

const {SubMenu} = Menu;

class LeftNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuNodes:[],
            openStatus:false,
        }
    }

    getMenuNodes = (menuList) => {
        //得到当前请求的path
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            {[item.icon,item.title]}
                        </Link>
                    </Menu.Item>
                )
            }else{
                if(item.children.find(cItem => path.indexOf(cItem.key) === 0)){
                    this.setState({myOpenKeys:[item.key]});
                    console.log("12312313"+this.state.myOpenKeys);
                }
                return(
                    <SubMenu 
                        key={item.key} 
                        title={
                            <span>
                                {[item.icon,item.title]}
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentDidMount(){
        this.setState({menuNodes:this.getMenuNodes(menuConfig)});
    }

    render(){
        
        const pathnameArr = this.props.location.pathname.split('/');
        const openKey = `/${pathnameArr[1]}/${pathnameArr[2]}`
        return (
            <div className='left-nav'>
                <Link className='logo-link' to='/page/home'>
                    <img src={logo} alt='logo' />
                    <h1>balabala后台管理</h1>
                </Link>
                <Menu 
                    theme='dark' 
                    mode="inline"
                    selectedKeys={[this.props.location.pathname]}
                    //openKeys = {myOpenKeys}
                    // onOpenChange = {(openKeys) => {
                    //     console.log("myopenKeys:"+myOpenKeys);
                    //     console.log("openKeys:"+openKeys);
                    //     let isIn = myOpenKeys.find(item => item === openKeys.shift())
                    //     console.log("isIn:"+isIn)
                    //     if(isIn){
                    //         this.setState(prevState =>{
                    //             const result = {...prevState};
                    //             result.myOpenKeys.shift();
                    //             return result;
                    //         });
                    //     }else{
                    //         this.setState(prevState => {
                    //             const result = {...prevState};
                    //             result.myOpenKeys.shift();
                    //             result.myOpenKeys.push(openKeys.shift());
                    //             return result;
                    //         });  
                    //     }
                    // }}
                    defaultOpenKeys={[openKey]}
                >
                    {this.state.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav);