const isDugger = process.env.NODE_ENV !== 'production';

// console.log(window.location.hostname)
var development = {
  baseUrl: 'http://' + window.location.hostname + ':3012/api',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/',
  qrBaseUrl:'http://' + window.location.hostname + ':3012/#/shop'
};
var production = {
  baseUrl: '/api',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/',
  //qrBaseUrl:'http://hotel.xushaoweisite.com/#/shop'
  qrBaseUrl:'http://hotel.kuaidianfuwu.cn/#/shop'
};


export default isDugger ? development : production;
