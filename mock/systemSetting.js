const rolesManagementData = [{
  id: 12,
  roleName: '总部超级管理员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}, {
  id: 13,
  roleName: '总部管理员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}, {
  id: 14,
  roleName: '分部超级管理员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}, {
  id: 15,
  roleName: '运营管理员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}, {
  id: 16,
  roleName: '运营专员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}, {
  id: 17,
  roleName: '数据分析专员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}, {
  id: 15,
  roleName: '服务专员',
  roleCreator: 'root',
  createTime: '2021/11/02'
}]
const permissionAssignData = [{
  id: 1,
  label: '会员中心',
  children: [{
    id: 4,
    label: '会员画像',
    children: [{
      id: 9,
      label: '详情'
    }, {
      id: 10,
      label: '删除'
    }]
  }, {
    id: 5,
    label: '会员视图',
    children: [{
      id: 11,
      label: '新增'
    }, {
      id: 12,
      label: '列表'
    }, {
      id: 13,
      label: '删除'
    }, {
      id: 14,
      label: '编辑'
    }]
  }]
}, {
  id: 2,
  label: '系统设置',
  children: [{
    id: 6,
    label: '角色管理'
  }, {
    id: 7,
    label: '用户管理'
  }]
}]

module.exports = [
  {
    url: '/vue-element-admin/role-management-list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: rolesManagementData
      };
    }
  },  {
    url: '/vue-element-admin/role-permission-assign',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: permissionAssignData
      };
    }
  }

];

