import React,{Component} from 'react';
import {Button} from 'antd';

class App extends Component {
    
    constructor(props){
        super(props)
        this.state = {

        }    
    }
    
    render(){
        return(
            <div style={{color:'red'}}><Button type="primary">按钮</Button></div>
        )
    }
}

export default App;