
//var ip = 'http://uat-egrowth.life.ehuatai.com';
// var ip = 'http://prod-egrowth.life.ehuatai.com';
var ip = 'http://sit-egrowth.life.ehuatai.com';

localStorage.setItem("elearning_api_IP", ip + '/api/interworking');
localStorage.setItem("elearning_lesson_api_IP", ip + '/api/lesson');
localStorage.setItem("elearning_getFile_IP", ip + '/api/lesson/ceph/ceph/');
localStorage.setItem("elearning_upload_IP", ip + '/api/zuul/lesson');
localStorage.setItem("elearning_upload_interwork_IP", ip + '/api/zuul/interworking');
localStorage.setItem("elearning_IP", ip);

/*
UAT:com.sinosoft.huatai    
SIT:com.sinosoft.huataisit     
PRO:com.sinosoft.huataipro
 */
localStorage.setItem("android_package_name", 'com.sinosoft.huataisit');