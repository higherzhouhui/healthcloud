//在config/index.js
// 请求的基本路径

const baseURL = process.env.NODE_ENV === "development" ?
(window ? '/api' : "https://338v828404.goho.co")://测试环境(请求接口的代理路径)
"https://338v828404.goho.co";//上线环境
 
export {baseURL}