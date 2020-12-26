import React from 'react';
import ReactDom from 'react-dom';

import App from './app'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
// import 'antd/dist/antd.css'  //配置了按需打包之后不用引入，babel会自动映入

//当点击页面刷新时，把localStroage的用户信息保存到内存中，维持登录状态
const user = storageUtils.getUser();
if(user && user._id){
    memoryUtils.user = user
}

ReactDom.render(<App />,document.getElementById('root'));