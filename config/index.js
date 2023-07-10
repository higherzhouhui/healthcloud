//在config/index.js
 const LINK = "http://web.jianxiangyunbao.cc/"
// 请求的基本路径
const URL = "http://domain.jxybao.com"
const baseURL = process.env.NODE_ENV === "development" ?
(window ? '/api' : URL)://测试环境(请求接口的代理路径)
URL;//上线环境

export {baseURL, URL, LINK}

