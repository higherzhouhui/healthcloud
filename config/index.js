//在config/index.js
 const LINK = "http://47.242.197.116"
// 请求的基本路径
const URL = "http://47.242.197.116:8000"
// const URL = "http://192.168.2.166:8000"

const baseURL = process.env.NODE_ENV === "development" ?
(window ? 'http://192.168.2.166:8000' : URL)://测试环境(请求接口的代理路径)
URL;//上线环境
 
export {baseURL, URL, LINK}