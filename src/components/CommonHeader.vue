<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--很明顯 首頁 一定是存在的 所以這裡直接寫死-->
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <!--第二級功能表名稱 就要看左側元件有沒有點擊指定功能表，沒有那就只顯示首頁 點擊就顯示當前功能表名稱-->
        <el-breadcrumb-item :to="current.path" v-if="current" >{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>個人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    //控制左側功能表是否折疊
    collapseMenu() {
      this.$store.commit('collapseMenu')
    },
    //退出登陸
    logOut() {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
  }

  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}
</style>

