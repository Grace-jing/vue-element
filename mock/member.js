const memberViewList = [{
  id: '3984566f3984566f3984566f3984566f3984566f3984566f',
  name: '王小虎3984566f3984566f3984566f',
  phoneNum: '13681981219',
  level: 'Silver13681981219136819812191368198121913681981219',
  integral: 229,
  birthDay: '1970-01-19',
  city: '浦东新区',
  registerDate: '2016-05-02',
  registerChannel: 'Member portal'
}, {
  id: '3984566g',
  name: '王小虎',
  phoneNum: '13681981219',
  level: 'Silver',
  integral: 229,
  birthDay: '1970-01-19',
  city: '浦东新区',
  registerDate: '2016-05-02',
  registerChannel: 'Member portal'
}, {
  id: '3984566j',
  name: '王小虎',
  phoneNum: '13681981219',
  level: 'Silver',
  integral: 229,
  birthDay: '1970-01-19',
  city: '浦东新区',
  registerDate: '2016-05-02',
  registerChannel: 'Member portal'
}, {
  id: '3984566k',
  name: '王小虎',
  phoneNum: '13681981219',
  level: 'Silver',
  integral: 229,
  birthDay: '1970-01-19',
  city: '浦东新区',
  registerDate: '2016-05-02',
  registerChannel: 'Member portal'
}, {
  id: '3984566gff',
  name: '王小虎',
  phoneNum: '13681981219',
  level: 'Silver',
  integral: 229,
  birthDay: '1970-01-19',
  city: '浦东新区',
  registerDate: '2016-05-02',
  registerChannel: 'Member portal'
}, {
  id: '3984566jff',
  name: '王小虎',
  phoneNum: '13681981219',
  level: 'Silver',
  integral: 229,
  birthDay: '1970-01-19',
  city: '浦东新区',
  registerDate: '2016-05-02',
  registerChannel: 'Member portal'
}];

module.exports = [
  {
    url: '/vue-element-admin/member-view-list',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: memberViewList
      };
    }
  }

];

