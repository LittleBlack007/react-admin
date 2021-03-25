import {HomeOutlined, AppstoreOutlined, BarChartOutlined,ToolOutlined,
    SafetyOutlined, AreaChartOutlined, BarsOutlined, LineChartOutlined, 
    PieChartOutlined,UserOutlined,
} from '@ant-design/icons'

const menuList = [
    { 
        title: '首页', // 菜单标题名称 
        key: '/page/home', // 对应的 path 
        icon: <HomeOutlined />, // 图标名称 
    },
    { 
        title: '广告管理', 
        key: '/page/advertisement', 
        icon: <AppstoreOutlined />, 
        // children: [ // 子菜单列表 
        //     { 
        //         title: '品类管理', 
        //         key: '/page/products/category', 
        //         icon: <BarsOutlined /> 
        //     },
        //     { 
        //         title: '商品管理', 
        //         key: '/page/products/manage', 
        //         icon: <ToolOutlined /> 
        //     }, 
        // ] 
    },
    { 
        title: '案例管理', 
        key: '/page/case', 
        icon: <ToolOutlined /> 
    },
    { 
        title: '公司管理', 
        key: '/page/company', 
        icon: <LineChartOutlined /> 
    },
    { 
        title: '用户管理', 
        key: '/page/user', 
        icon: <UserOutlined /> 
    },
    { 
        title: '订单管理', 
        key: '/page/order', 
        icon: <LineChartOutlined /> 
    },
    { 
        title: '评价管理', 
        key: '/page/comment', 
        icon: <AreaChartOutlined /> 
    },
    { 
        title: '员工管理', 
        key: '/page/staff', 
        icon: <SafetyOutlined />, 
    },
    { 
        title: '工种管理', 
        key: '/page/kind', 
        icon: <BarsOutlined /> 
    },
    { 
        title: '帖子管理', 
        key: '/page/forum/post', 
        icon: <BarChartOutlined /> 
    },
    { 
        title: '评论管理', 
        key: '/page/forum/comment', 
        icon: <PieChartOutlined /> 
    },
    
]

export default menuList;