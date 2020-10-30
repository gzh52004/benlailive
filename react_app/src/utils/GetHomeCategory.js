/*
    首页导航栏数据
*/
import axios from 'axios'

// const baseurl = 'https://api.benlai.com'
// const request = axios.create({
//     baseURL: baseurl + '/v5/IHome'
// })

const baseUrl = 'http://47.115.142.170:60005'

const request = axios.create({
    baseURL: baseUrl

})
export default request