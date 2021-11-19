<template>
  <div class="user-container">
    <el-card shadow="hover" class="form-container">
      <el-row class="el-row-form">
        <el-form :model="userForm" :rules="roleUserForm" ref="userForm" label-width="200px"
          size="small" class="form-data">
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="用户昵称：" prop="nickName" class="form-item">
              <el-input v-model="userForm.nickName" placeholder="请输入用户昵称" />
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="归属部门：" prop="deptId">
              <treeselect v-model="userForm.deptId" :options="deptOptions" :show-count="true"
                placeholder="请选择归属部门" />
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="手机号码：" prop="phonenumber">
              <el-input placeholder="请输入手机号码" v-model="userForm.phonenumber">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="邮箱：" prop="email">
              <el-input placeholder="请输入邮箱" v-model="userForm.email">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="用户名称：" prop="userName" class="form-item">
              <el-input v-model="userForm.userName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12" v-if="!isEdit">
            <el-form-item label="用户密码：" prop="password">
              <el-input placeholder="请输入密码" v-model="userForm.password" show-password>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="用户性别：" prop="sex">
              <el-select v-model="userForm.sex" placeholder="请选择" clearable>
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="状态：" prop="status">
              <el-radio v-model="userForm.status" label="0">正常</el-radio>
              <el-radio v-model="userForm.status" label="1">停用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="岗位：" prop="postIds">
              <el-select v-model="userForm.postIds" multiple placeholder="请选择">
                <el-option v-for="item in postOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="11" :xs="24" :sm="12">
            <el-form-item label="角色：" prop="roleIds">
              <el-select v-model="userForm.roleIds" multiple placeholder="请选择">
                <el-option v-for="item in roleOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="20">
            <el-form-item label="备注：">
              <el-input type="textarea" placeholder="请输入内容" v-model="userForm.remark" rows="2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div style="margin:0 0 20px 200px">
        <el-button type="primary" size="medium" @click="confirmUserForm">
          确认
        </el-button>
        <el-button size="medium" @click="cancelSubmitUserForm">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDepartmentData, addUser, getUser, editUser } from '@/api/systemSetting';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'UserForm',
  components: { Treeselect },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userForm: {
        nickName: '',
        deptId: null,
        phonenumber: '',
        email: '',
        userName: '',
        password: '123456',
        sex: '',
        status: '0',
        postIds: [2],
        roleIds: [2],
        remark: ''
      },
      postOptions: [
        {
          label: '董事长',
          value: 0,
        }, {
          label: '项目经理',
          value: 1,
        }, {
          label: '人力资源',
          value: 2,
        }, {
          label: '普通员工',
          value: 3,
        }
      ],
      sexOptions: [
        {
          label: '男',
          value: '1',
        }, {
          label: '女',
          value: '2',
        }
      ],
      roleOptions: [{
        label: '普通角色',
        value: 2,
      }],
      deptOptions: undefined,
      roleUserForm: {
        nickName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' },
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: ['blur', 'change'] },
        ],
        phonenumber: [
          { validator: this.validatePhonenumber, trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: this.validateUserName, trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    confirmUserForm() {
      console.log(this.userForm);
      this.$refs.userForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.isEdit) {
          editUser(this.userForm).then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$message({
                message: '编辑用户成功',
                type: 'success'
              });
              this.$router.back();
            }
          })
        } else {
          addUser(this.userForm).then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$message({
                message: '新建用户成功',
                type: 'success'
              });
              this.$router.back();
            }
          })
        }
      });
    },
    cancelSubmitUserForm() {
      this.$router.back();
    },
    validateUserName(rule, value, callback) {
      let reg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\u4E00-\u9FA5])[a-zA-Z\d\u4E00-\u9FA5]{1,40}$/;
      if (!reg.test(value)) {
        callback(new Error('用户名含中文、英文大小写、数字，长度在40字符以内'));
      }
      callback();
    },
    validatePhonenumber(rule, value, callback) {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (value && !reg.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      }
      callback();
    },
    // 获取部门列表
    getDepartmentData() {
      getDepartmentData().then(res => {
        this.deptOptions = res.data;
      })
    }
  },
  created() {
    // 编辑用户时，需要请求对应的接口数据
    if (this.isEdit) {
      getUser(this.$route.query.id).then(res => {
        this.userForm = res.data;
        this.userForm.postIds = res.postIds
        this.userForm.roleIds = res.roleIds
      })
    }
    this.getDepartmentData();
  },
  mounted() { },
}
</script>

<style lang='scss' scoped>
.user-container {
  padding: 20px 20px 20px 20px;
  height: calc(100vh - 84px);
  background: #fafafa;
}
.form-container {
  width: 100%;
  min-width: 768px;
  .el-row-form {
    padding: 20px 0;
  }
  .el-row-form .el-select {
    width: 100%;
  }
}
::v-deep .el-form-item__label {
  color: #000;
  font-weight: normal;
}
</style>