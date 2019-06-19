const isDugger = process.env.NODE_ENV !== 'production';

// console.log(window.location.hostname)
var development = {
  baseUrl: 'http://' + window.location.hostname + ':58684/api',
  imgBaseUrl:'http://518img.blu-rayvision.com/',
  qrBaseUrl:'http://' + window.location.hostname + ':58684/#/shop'
};
var production = {
  baseUrl: '/api',
  imgBaseUrl:'http://518img.blu-rayvision.com/',
  //qrBaseUrl:'http://hotel.xushaoweisite.com/#/shop'
  qrBaseUrl:'http://hotel.kuaidianfuwu.cn/#/shop'
};


export default isDugger ? development : production;
