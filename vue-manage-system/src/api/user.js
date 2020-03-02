import request from '../utils/request';

export const login = (query) => {
    return request({
        url: '/api/login',
        method: 'get',
        params: query,
    })
}