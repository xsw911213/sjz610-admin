'use strict';

// var axios = require('axios');
import axios from 'axios';
import { Message } from 'element-ui';

var bky  = {
  http:function(method,url,body,successFun,errorFun,selfParam,debug){

    method = method.toUpperCase();
    successFun = successFun || console.log;
    errorFun = errorFun || console.log;
    debug = debug || false;

    var token = sessionStorage.getItem('Authorization');

    var defaultHeaders = {};

    if(token){
      defaultHeaders = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : token
      }
    }else{
      defaultHeaders = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      }
    }
    var headers = JSON.parse(JSON.stringify(body.requestHeaders || defaultHeaders));

    //删除requestHeader属性，防止使用GET请求时头部参数出现在请求链接里面
    delete body.requestHeaders;

    var data = {};
    var para = {};

    if(method === 'POST' || method === 'PUT'){
      data = body;
    }else{
      para = body;
    }

    axios({
      url: url,
      method: method,
      headers: headers,
      params: para,
      data: data,
    }).then(function(res){
      var data = res.data;

      if(debug){
        console.log("响应数据为：",res);
        console.log("返回成功的数据为：",data);
        console.log("传入的私有参数为：",selfParam);
      }

      if(data){
        typeof successFun === 'function' ? successFun(data,selfParam):null;
      }else{
        console.warn('请求成功，没有返回数据，响应数据：',res);
        typeof successFun === 'function' ? successFun(res):null;
      }

    }).catch(function(error){
      //console.log(error.response.headers);
      errorFun(arguments);
      // Message({
      //   showClose: true,
      //   message: error.response.data.message,
      //   // message:'11',
      //   type: 'error',
      //   duration:5000
      // })
      
      console.error(error);
    })
  },
}
// module.exports = bky;

export default bky;
