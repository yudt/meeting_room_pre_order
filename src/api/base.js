import axios from 'axios';
var base = 'https://vhsupply.test.viewchain.net/api1';
//持续集成环境
// if(process.env.NODE_ENV==="build"){
//     base = 'https://vhsupply.test.viewchain.net/api1';
// }else if(process.env.NODE_ENV==="staging"){//测试环境
//     base="https://vhsupply.staging.viewchain.net/api1"
// } else if(process.env.NODE_ENV === "production") {//生产环境
//     base = "https://gyb.viewsupplychain.com/api1"
// }else if(process.env.NODE_ENV === "demo") {//演示环境
//     base = "https://vhsupply.demo.viewchain.net/api1"
// }

base="http://127.0.0.1:3000";

export const httpClient = axios.create({
    baseURL: base,
    timeout: 60000
});