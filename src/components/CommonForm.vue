<template>
  <!--是否行內表單-->
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <!--標籤顯示名稱-->
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
      <!--根據type來顯示是什麼標籤-->
      <el-input v-model="form[item.model]" :placeholder="'請輸入' + item.label" v-if="item.type==='input'"></el-input>
      <el-select v-model="form[item.model]" placeholder="請選擇" v-if="item.type === 'select'">
        <!--如果是select或者checkbox 、Radio就還需要選項資訊-->
        <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
      <el-date-picker v-model="form[item.model]" type="date" placeholder="選擇日期" v-if="item.type === 'date'" value-format="yyyy-MM-dd"> </el-date-picker>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  //inline 屬性可以讓表單欄位變為行內的表單欄位
  //form 表單數據 formLabel 是標籤數據
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array
  }
}
</script>
<style lang="scss" scoped></style>

