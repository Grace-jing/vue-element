<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <svg-icon icon-class="avator" />
          <span>Jack</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="checkLanguage">
            <span style="display: block">个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <svg-icon icon-class="language" />
          <span>{{ language.alias }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-element-admin/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <el-dropdown-item
            v-for="item in languageList"
            :key="item.key"
            @click.native="checkLanguage(item.key)"
          >
            <span style="display: block">{{ item.value }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      languageList: [{
        key: 'zh',
        value: 'cn 简体中文',
        alias: '简体'
      }, {
        key: 'hk',
        value: 'hk 繁體中文',
        alias: '繁體'
      }, {
        key: 'en',
        value: 'en English',
        alias: 'English'
      }],
      language: null
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  created() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'zh');
    }
    this.language = this.languageList.find(item => item.key === localStorage.getItem('lang'));
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    checkLanguage(ev) {
      console.log(123);
      if (this.$i18n.locale !== ev) {
        this.$i18n.locale = ev;
        // 对应main.js配置文件中的localStorage的get方法
        localStorage.setItem('lang', ev);
        this.language = this.languageList.find(item => item.key === localStorage.getItem('lang'));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-right: 20px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      padding: 0 8px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
