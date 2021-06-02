<template>
  <div class="tabs">
    <!--closable這裡說明home是不能關閉的-->
    <el-tag
        :key="tag.name"
        size="small"
        v-for="(tag, index) in tags"
        :closable="tag.name !== 'home'"
        :disable-transitions="false"
        @close="handleClose(tag, index)"
        @click="changeMenu(tag)"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    //關閉標籤
    handleClose(tag, index) {
      let length = this.tags.length - 1
      //vuex調方法的另一種寫法
      this.close(tag)
      // 如果關閉的標籤不是當前路由的話，就不跳轉
      if (tag.name !== this.$route.name) {
        return
      }
      // 關閉的標籤是最右邊的話，往左邊跳轉一個
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        // 否則往右邊跳轉
        this.$router.push({ name: this.tags[index].name })
      }
    },

    //選擇標籤跳轉路由
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>

