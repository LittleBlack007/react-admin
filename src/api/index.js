/*
    功能：
    使用封装好的ajax发送各种请求
    每个函数返回的是promise
*/

import ajax from './ajax';
import jsonp from 'jsonp';

//登录
export const reqLogin = user => ajax("/api/login",user,'POST')

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