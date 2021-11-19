<template>
  <div class="user-container">
    <!-- 左侧侧边栏-部门列表 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="searchValue" placeholder="请输入查询名称" size="small"
          style="margin-bottom: 20px" clearable prefix-icon="el-icon-search">
        </el-input>
        <el-tree :data="departmentData" default-expand-all class="depart-tree" :props="defaultProps"
          @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
        </el-tree>
      </el-col>
      <el-col :span="20">
        <!-- 按钮 -->
        <el-row :gutter="20" class="btn-group">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addUser" plain>新增
          </el-button>
          <el-button type="success" size="mini" icon="el-icon-edit" @click="editUserInfo"
            :disabled="multipleSelectionId.length!==1" plain>修改
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUserInfo"
            :disabled="!multipleSelectionId.length" plain>删除
          </el-button>
          <el-button type="info" size="mini" icon="el-icon-upload2" @click="addUser" plain>导入
          </el-button>
          <el-button type="warning" size="mini" icon="el-icon-download" @click="addUser" plain>导出
          </el-button>
        </el-row>
        <!-- 表格 -->
        <div class="wrap-table">
          <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
            highlight-current-row @selection-change="handleSelectionChange"
            :header-cell-style="{color:'#000','font-weight': 'normal',background: '#f8f8f9'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column type="index" label="编号" width="50" align="center">
            </el-table-column>
            <el-table-column v-for="(item, index) in tableColumns" :key="index" :label="item.label"
              show-overflow-tooltip :width="item.width" align="center">
              <template slot-scope="scope">
                <span v-if="item.name!=='operation' && item.name!=='status'">
                  {{ scope.row[item.name] }}
                </span>
                <div v-if="item.name==='status'">
                  <el-switch v-model="scope.row.statusValue">
                  </el-switch>
                </div>
                <div v-if="item.name==='operation'" class="table-operation">
                  <el-button type="text" icon="el-icon-edit" size="mini"
                    @click="editUserInfo(scope.row)">修改
                  </el-button>
                  <el-button type="text" icon="el-icon-delete" size="mini"
                    @click="deleteUserInfo(scope.row)">
                    删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pagination.pageNum" :page-sizes="[10, 20, 30, 50]"
            :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserTable, getDepartmentData, delUser } from '@/api/systemSetting';
export default {
  name: 'UserManage',
  data() {
    return {
      departmentData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchValue: '',
      userStatus: '0',
      // 定义表格列信息
      tableColumns: [
        {
          label: '用户名称',
          name: 'userName'
        },
        {
          label: '用户昵称',
          name: 'nickName'
        }, {
          label: '部门',
          name: 'deptName'
        }, {
          label: '手机号码',
          name: 'phonenumber',
          width: 120
        }, {
          label: '状态',
          name: 'status',
        }, {
          label: '创建时间',
          name: 'createTime',
          width: 140
        }, {
          label: '操作',
          name: 'operation',
          width: 140
        }
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      // 选中的数据id
      multipleSelectionId: []
    };
  },
  created() {
    this.getUserList();
    this.getDepartmentData();
  },
  watch: {
    searchValue(val) {
      this.$refs.tree.filter(val);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === '/ums/editUser' || from.path === '/ums/addUser') {
        vm.getUserList();
      }
    })
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.getUserList();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleSelectionChange(val) {
      this.multipleSelectionId = val.map(item => item.userId);
    },
    addUser() {
      this.$router.push('/ums/addUser');
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 获取用户表格数据
    getUserList() {
      getUserTable(this.pagination).then(res => {
        let data = res.rows;
        this.tableData = data.map(item => {
          item.deptName = item.dept ? item.dept.deptName : '--';
          item.statusValue = item.status === '0';
          return item;
        });
      })
    },
    // 获取部门列表
    getDepartmentData() {
      getDepartmentData().then(res => {
        this.departmentData = res.data;
      })
    },
    editUserInfo(data) {
      let id = data.userId || this.multipleSelectionId;
      this.$router.push({ path: '/ums/editUser', query: { id } })
    },
    deleteUserInfo(data) {
      let id = data.userId || this.multipleSelectionId;
      this.$confirm(`是否确认删除用户编号为"${id}"的数据项？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delUser(id)
      }).then(() => {
        this.getUserList();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  padding: 20px 20px 20px 20px;
  height: calc(100vh - 84px);
  background: #fafafa;
  width: 100%;
}
.depart-tree {
  background: #fafafa;
}
.btn-group {
  margin: 0 0px 10px !important;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.wrap-table {
  box-shadow: 0 -1px 5px -3px #ccc;
}
</style>