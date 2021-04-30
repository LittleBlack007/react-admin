/*
    功能：
    使用封装好的ajax发送各种请求
    每个函数返回的是promise
*/

import ajax from './ajax';
import jsonp from 'jsonp';

//登录
// export const reqLogin = user => ajax("/api/login",user,'POST')

//登录
export const login = (name,password) => ajax("/admin/login",{adminName:name,adminPwd:password},"POST")

/**
 * 广告
 * */
//获取所有广告
export const getAdvertisements = (pageNum=1,title='',status=-1) => ajax("/advertisement/get-advertisement",{pageNum,title,status});
//更新广告
export const updateAdvertisement = ad => ajax("/advertisement/update-advertisement",ad,'POST');
//删除广告
export const deleteAdvertisement = id => ajax("/advertisement/delete-advertisement",{id});
//添加广告
export const addAdvertisement = ad => ajax("/advertisement/insert-advertisement",ad,'POST');

/**
 * 案例
*/
//查询所有案例
export const getCases = (pageNum=1,title='') => ajax("/case/get-case",{pageNum,title});
//删除案例
export const deleteCase = id => ajax("/case/delete-case",{id});
//置顶设置
export const updateCase = c => ajax("/case/update-case",c,'POST');


/**
 * 公司
*/
//查询所有
export const getCompany = (pageNum=1,companyName='') =>ajax("/company/get-company",{pageNum,companyName})
//删除
export const deleteCompany = id => ajax("/company/delete-company",{id})
//更新
export const updateCompany = company => ajax("/company/update-company",company,"POST")

/**
 * 用户
*/
//查询
export const getUser = (pageNum=1,name='') => ajax("/user/get-user", {pageNum,name});
//删除
export const deleteUser = id => ajax('/user/delete-user',{id});
//更新
export const updateUser = user => ajax("/user/update-user",user,"POST")

/**
 * 订单
*/
//根据类型查询，不传则查全部
export const getOrder = (pageNum=1,orderType='',orderStatus='') => ajax("/order/get-order",{pageNum,orderType,orderStatus})
//删除订单
export const deleteOrder = id => ajax("/order/delete-order",{id})

/**
 * 评价
*/
//删除评价
export const deleteRate = id => ajax("/rate/delete-rate",{id});
//根据评价等级查询评价，为空查全部
export const getRate =(pageNum=1,rateGrade=null) => ajax("/rate/get-rate",{pageNum,rateGrade});

/*
*员工
*/
//根据名字查询，传空串查全部
export const getStaff = (pageNum=1,staffName='',kindId=null) => ajax("/staff/get-staff",{pageNum,staffName,kindId});
//删除员工
export const deleteStaff = id => ajax("/staff/delete-staff",{id});
//更新
export const updateStaff = staff => ajax("/staff/update-staff", staff,"POST")

/*
*职业
*/
//查询全部
export const getKind = (pageNum=1) => ajax("/kind/get-kind",{pageNum});
//删除
export const deleteKind = id => ajax("/kind/delete-kind",{id});
//更新
export const updateKind = kind => ajax("/kind/update-kind", kind,"POST")
//添加
export const addKind = kind => ajax("/kind/add-kind",kind,"POST")


/**
 * 帖子
*/
//通过板块和用户和帖子标题查询帖子，传空查所有
export const getPostAndUserByTNT = (pageNum=1,typeId=null,userName='',postTitle='') => ajax('/post/get-post-and-user-by-TNT',{pageNum,userName,postTitle}); 


















//天气查询
export function reqWeather(city){
     //百度天气查询api
     const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=48cf29a25f50107241630e99ff061338&city=${city}&extensions=base&ouput=JSON`
     return new Promise((resolve, reject) => {
         jsonp(url, {param:'callback'}, (error, response) => {
             if(!error && response.status === '1'){
                 console.log(response);
                const {city,weather} = response.lives[0];
                resolve({city, weather})
             }else{
                 alert('获取天气失败！')
             }
         })
     })
}