import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  });
}

export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  });
}
