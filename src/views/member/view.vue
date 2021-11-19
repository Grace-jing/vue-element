<template>
  <div class="view-container">
    <div class="search">
      <el-input v-model="searchValue" class="ed_search" clearable
        :placeholder="$t('member.search_placeholder')" size="small" @clear="clearSearch" />
      <el-button type="primary" size="small" icon="el-icon-search" :loading="searchLoading"
        @click="searchMember">
        {{ $t('member.search') }}
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-search" @click="toShowAdvanceSearch">
        高级搜索
      </el-button>
      <el-button type="primary" size="medium" icon="el-icon-user" class="recruit-member"
        @click="toRecruitMember">
        会员招募
      </el-button>
    </div>
    <!-- 高级搜索内容 -->
    <div v-if="isShowAdvanceSearch" class="high-search">
      <el-row>
        <el-form ref="form" :model="form" size="small" label-width="90px" :inline="true"
          class="demo-form-inline form-data">
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="会员编号:">
              <el-input v-model="form.id" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="手机号:">
              <el-input v-model="form.phoneNum" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="邮箱:">
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="名字:">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="姓氏:">
              <el-input v-model="form.familyName" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="性别:">
              <el-select v-model="form.sex" style="width:193px" clearable placeholder="请选择">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="生日:">
              <el-date-picker v-model="form.birthDay" type="date" placeholder="选择日期"
                style="width:193px" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="国家/省/市:">
              <el-input v-model="form.city" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xs="24">
            <el-form-item label="注册渠道:">
              <el-input v-model="form.registerChannel" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="btn-group">
        <el-button size="medium" style="min-width: 88px!important;" @click="resetAdvanceSearch">
          重置
        </el-button>
        <el-button type="primary" size="medium" style="min-width: 88px!important;"
          @click="advanceSearch">
          搜索
        </el-button>
      </div>
    </div>

    <!-- 表格数据 -->
    <div class="wrap-table">
      <el-table :data="tableData" style="width: 100%" highlight-current-row
        :header-cell-style="{color:'#606266'}">
        <el-table-column prop="id" label="会员编号" align="center" show-overflow-tooltip />
        <el-table-column prop="name" label="会员名称" align="center" show-overflow-tooltip />
        <el-table-column prop="phoneNum" label="手机号" align="center" show-overflow-tooltip
          min-width="100" />
        <el-table-column prop="level" label="等级" align="center" show-overflow-tooltip />
        <el-table-column prop="integral" label="积分" align="center" show-overflow-tooltip />
        <el-table-column prop="birthDay" label="生日" align="center" show-overflow-tooltip />
        <el-table-column prop="city" label="城市" align="center" show-overflow-tooltip />
        <el-table-column prop="registerDate" label="注册日期" align="center" show-overflow-tooltip />
        <el-table-column prop="registerChannel" label="注册渠道" align="center" show-overflow-tooltip
          min-width="120" />
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格分页 -->
    <div v-if="total" class="page">
      <el-pagination :current-page="pageOptions.currentPage" :page-sizes="[10, 20, 50, 100]"
        :page-size="pageOptions.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getMemberViewList } from '@/api/member';
export default {
  name: 'MemberView',
  data() {
    return {
      searchValue: '',
      searchLoading: false,
      total: null,
      form: {
        id: '',
        phoneNum: '',
        email: '',
        name: '',
        familyName: '',
        sex: '',
        birthDay: '',
        city: '',
        registerChannel: ''
      },
      pageOptions: {
        currentPage: 1,
        pageSize: 10
      },
      tableData: [],
      sexOptions: [{
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
      }, {
        value: '2',
        label: '未说明'
      }],
      // 高级搜索表单是否展示
      isShowAdvanceSearch: false
    };
  },
  created() {
    this.getMemberViewList();
    console.log(this.$i18n.locale);
  },
  methods: {
    // 会员信息搜索
    searchMember() {
      if (this.searchValue) {
        this.searchLoading = true;
        this.getMemberViewList();
      }
    },
    // 清空搜索值
    clearSearch() {
      console.log(1233);
      this.getMemberViewList();
    },
    // 高级搜索
    advanceSearch() {
      this.getMemberViewList(true);
    },
    // 重置高级搜索值
    resetAdvanceSearch() {
      this.$refs['form'].resetFields();
      this.getMemberViewList();
    },
    // 显示/隐藏高级搜索表单
    toShowAdvanceSearch() {
      this.isShowAdvanceSearch = !this.isShowAdvanceSearch;
    },
    // 招募会员
    toRecruitMember() {
      this.$router.push('/member/recruitMember');
    },
    handleSizeChange(val) {
      this.pageOptions.pageSize = val;
      this.getMemberViewList();
    },
    handleCurrentChange(val) {
      this.pageOptions.currentPage = val;
      this.getMemberViewList();
    },
    /**
     * 获取表格数据
     * @param isAdvancedSearch 有参数为高级搜索
     */
    getMemberViewList(isAdvancedSearch) {
      let params = {
        ...this.pageOptions,
        searchValue: this.searchValue
      };
      if (isAdvancedSearch) {
        params = {
          ...params,
          ...this.form
        };
      }
      getMemberViewList(params).then(res => {
        this.tableData = res.data;
        this.total = this.tableData.length;
        this.searchLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.view-container {
  padding: 20px 10px 20px 20px;
  height: 100%;
  background: #fafafa;
}
.wrap-table {
  margin-top: 20px;
  box-shadow: 0 5px 15px -3px #ccc;
}
.high-search {
  background: #fff;
  padding: 15px 20px;
  margin-top: 10px;
  box-shadow: 0 5px 15px -3px #ccc;
  .btn-group {
    text-align: center;
    font-size: 0;
    margin-top: 6px;
  }
}
.page {
  padding: 16px 0;
  text-align: right;
}
::v-deep .el-form-item__label {
  font-size: 13px !important;
}
.recruit-member {
  margin-left: auto;
}
.search {
  display: flex;
  .ed_search {
    min-width: 200px;
    width: 30%;
    margin-right: 10px;
  }
}
</style>
