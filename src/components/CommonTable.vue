<template>
  <div class="common-table">
    <!--stripe 是否為斑馬紋  v-loading在請求資料未返回的時間有個載入的圖案,提高使用者體驗-->
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <!--第一行為序號 默認寫死-->
      <el-table-column label="序號" width="85">
        <!--slot-scope="scope" 這裡取到目前的儲存格,scope.$index就是索引 預設從0開始這裡從1開始-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!--show-overflow-tooltip 當內容過長被隱藏時顯示 tooltip-->
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
        <!--其實可以在上面:prop="item.prop"就可以顯示表單數據 這裡設置插槽的方式話更加靈活 我們可以寫樣式-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="min" @click="handleEdit(scope.row)">編輯</el-button>
          <el-button size="min" type="danger" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分頁-->
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20"></el-pagination>
  </div>
</template>

<script>
// config分頁資料，這裡面至少包括當前頁碼 總數量
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    //更新
    handleEdit(row) {
      this.$emit('edit', row)
    },
    //刪除
    handleDelete(row) {
      this.$emit('del', row)
    },
    //分頁
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 65px);
  position: relative;
  .pager {
    margin-top: 20px;
    position: absolute;
    left: 50%;
    margin-left: -180px;
  }
}
</style>

