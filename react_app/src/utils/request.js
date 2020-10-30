import axios from 'axios';


const baseUrl = 'http://47.115.142.170:60005'

const request = axios.create({
    baseURL:baseUrl

})

export default request;