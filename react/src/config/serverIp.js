export const ip = localStorage.getItem("sever_ip"); //from '/public/config.js'
console.log(`${ip}`)

export const api_Ip = `${ip}/api/interworking`;
export const lesson_api_IP = `${ip}/api/lesson`;
export const getFile_IP = `${ip}`;
export const upload_IP = `${ip}/api/zuul/lesson`;
export const upload_interwork_IP = `${ip}/api/zuul/interworking`;
