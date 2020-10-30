import axios from 'axios'
const com = axios.create({
    baseURL: 'http://47.115.142.170:60005'
});

//登录
export const login = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/user/login', {
        ...config,
        params
    })
    return data
}

//首页数据
export const homedata = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/home/Gethomepage', {
        ...config,
        params
    })
    return data
}
export default {
    login,
    homedata
}