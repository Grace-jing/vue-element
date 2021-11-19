<template>
  <div class="user-container">
    <!-- 头部搜索框 -->
    <div>
      <el-input v-model="searchValue" placeholder="请输入查询名称" style="width: 320px;margin-right:10px"
        size="small">
      </el-input>
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" @click="dialogVisible = true">
        新建角色
      </el-button>
      <el-button type="danger" size="small" @click="multipleDelete"
        :disabled="multipleSelection.length===0">
        删除角色
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="wrap-table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(item, index) in tableFields" :key="index" :label="item.label">
          <template slot-scope="scope">
            <div v-if="item.name!=='operation'">
              {{ scope.row[item.name] }}
            </div>
            <!-- 操作栏 -->
            <div v-if="item.name==='operation'">
              <el-button type="primary" plain size="mini"
                @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button type="danger" plain size="mini" @click="handleDelete(scope.row.id)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建角色弹出框 -->
    <el-dialog v-if="dialogVisible" ref="dailog" title="新增角色" :visible.sync="dialogVisible"
      width="600px" @close="close" @opened="open">
      <div>
        <el-form ref="form" :model="form" :rules="roleRules" label-width="120px" size="small"
          class="form-data">
          <!-- 角色名称 -->
          <el-row>
            <el-col :span="21">
              <el-form-item label="角色名称：" prop="roleName">
                <el-input v-model="form.roleName" placeholder="请输入角色名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 权限分配 -->
          <el-row>
            <el-col :span="21">
              <el-form-item label="权限分配：" required>
                <el-card shadow="hover">
                  <el-tree ref="tree" :data="permissionAssignData" show-checkbox node-key="id"
                    highlight-current :props="defaultProps" />
                </el-card>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 备注 -->
          <el-row>
            <el-col :span="21">
              <el-form-item label="备注：">
                <el-input v-model="form.remark" type="textarea" :rows="4" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" center>
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="roleFormConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesList, getPermissionAssign } from "@/api/systemSetting";
export default {
  name: 'RoleManage',
  data() {
    return {
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' },
        ],
      },
      // 定义表格头内容
      tableFields: [
        {
          label: '角色名称',
          name: 'roleName'
        },
        {
          label: '创建人',
          name: 'roleCreator'
        }, {
          label: '创建时间',
          name: 'createTime'
        },
        {
          label: '操作',
          name: 'operation'
        }
      ],
      tableData: [],
      multipleSelection: [], // 表格选中的数据
      dialogVisible: false, // 弹出框是否隐藏
      form: {
        roleName: '',
        remark: ''
      },
      permissionAssignData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchValue: ''
    };
  },
  created() {
    this.getRolesManagementList();
  },
  methods: {
    // 获取角色管理列表数据
    getRolesManagementList() {
      getRolesList().then(res => {
        this.tableData = res.data;
      })
      getPermissionAssign().then(res => {
        this.permissionAssignData = res.data;
      })
    },
    // 点击表格多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 对话框打开之后的回调
    open() {
      console.log('open');
      this.$nextTick(() => {
        console.log(2345);
      })
    },
    close() {
      console.log('close');
    },
    // 确定新建角色
    roleFormConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        // 没有选择权限分配，展示提示信息
        if (this.$refs.tree.getCheckedKeys().length === 0) {
          this.$message.error('请选择权限');
        }
        // this.dialogVisible = false;
        console.log(this.form);
        console.log(this.$refs.tree.getCheckedKeys());
      });

    },
    // 编辑表格数据
    handleEdit(index, data) {
      this.dialogVisible = true;
      let permission = [1, 4, 9, 10, 5, 11, 12, 13, 14];
      let obj = { roleName: 'sss', remark: 'aaa' };
      this.form = obj;
      // 树形控件还没有渲染到dom，这时$refs.tree值为undefined
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(permission);
      })
    },
    // 删除表格行数据
    handleDelete(id) {
      console.log(id);
      this.$confirm('是否确定要删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        // 已取消删除
      });
    },
    // 批量删除表格数据
    multipleDelete() {
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      })
      this.handleDelete(ids);
    }
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  padding: 20px 20px 20px 20px;
  height: calc(100vh - 84px);
  background: #fafafa;
}
.wrap-table {
  margin-top: 12px;
  box-shadow: 0 5px 15px -3px #ccc;
}
::v-deep .el-dialog__body {
  padding-top: 10px;
}
.form-data {
  color: #333;
}
::v-deep .el-form-item__label {
  color: #000;
  font-weight: normal;
}
</style>
