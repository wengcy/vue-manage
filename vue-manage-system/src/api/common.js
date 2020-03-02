import request from '../utils/request';
import config from '@/config/index'

// export const fetchData = () => {
//     return request({
//         url: 'price/queryPrice',
//     })
// }

export const crudData = (url, params = {}, method='get') => {
    let paramName = (method === 'get' ? "params" : "params")
    return request({
        url: url,
        method: method,
        [paramName]: params
    })
}




// //查询数据
// export const queryData = (url, params) => {
//     return request({
//         url: url,
//         method: 'post',
//         data: params
//     })
// }

// //新增数据
// export const addData = (url, params) => {
//     return request({
//         url: url,
//         method: 'post',
//         data: params
//     })
// }

// //修改数据
// export const updateData = (url, params) => {
//     return request({
//         url: url,
//         method: 'post',
//         data: params
//     })
// }


// //删除数据
// export const updateData = (url, params) => {
//     return request({
//         url: url,
//         method: 'post',
//         data: params
//     })
// }