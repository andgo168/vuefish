<template>
  <!--collapse 是否水準折疊收起菜單-->
  <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <!--是否水準折疊收起功能表 會影響這裡欄位的顯示 -->
    <h3 v-show="isCollapse">光年</h3>
    <h3 v-show="!isCollapse">光年後台管理系統</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //計算屬性
  computed: {
    //沒有子功能表
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有子功能表 (這樣設置會有一個問題 就是有子功能表的 永遠會在沒有子功能表的下面
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      // 這裡的資料就是從vuex取得
      return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首頁',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用戶管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '頁面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '頁面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]

    }
  },
  methods: {
    //跳轉路由 根據名稱跳轉
    clickMenu(item) {
      this.$store.commit('selectMenu', item)
      this.$router.push({ name: item.name })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

