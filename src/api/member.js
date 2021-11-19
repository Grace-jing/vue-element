import request from '@/utils/request';

export function getMemberViewList(data) {
  return request({
    url: '/vue-element-admin/member-view-list',
    method: 'post',
    data
  });
}
