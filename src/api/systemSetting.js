import request from '@/utils/request';

// 角色管理-表格数据
export function getRolesList() {
  return request({
    url: '/vue-element-admin/role-management-list',
    method: 'get',
  });
}

// 角色管理-权限分配列表
export function getPermissionAssign() {
  return request({
    url: '/vue-element-admin/role-permission-assign',
    method: 'get',
  });
}

// 用户管理-表格数据展示
export function getUserTable(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  });
}

// 用户管理-获取部门列表
export function getDepartmentData() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  });
}

// 用户管理-添加用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data
  });
}

// 用户管理-修改用户
export function editUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data
  });
}

// 用户管理-删除用户
export function delUser(userId) {
  return request({
    url: `/system/user/${userId}`,
    method: 'delete',
  });
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: `/system/user/${userId}`,
    method: 'get'
  })
}
