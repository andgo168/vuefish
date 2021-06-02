<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用戶' : '更新用戶'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">確 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!--依次是: 表格資料 表格標籤資料 分頁資料  清單方法 更新方法 刪除方法-->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import CommonTable from '../../components/CommonTable'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年齡'
        },
        {
          prop: 'sexLabel',
          label: '性別'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年齡',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性別',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ]
    }
  },
  methods: {
    getList(name = '') {
      this.config.loading = true
      // 搜索時，頁碼需要設置為1，才能正確返回資料，因為資料是從第一頁開始返回的
      name ? (this.config.page = 1) : ''
      this.$http
          .get('/api/user/getUser', {
            params: {
              page: this.config.page,
              name
            }
          })
          .then(res => {
            this.tableData = res.data.list.map(item => {
              item.sexLabel = item.sex === 0 ? '女' : '男'
              return item
            })
            this.config.total = res.data.count
            this.config.loading = false
          })
    },
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm() {
      if (this.operateType === 'edit') {
        console.log(this.operateForm)
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/api/user/add', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      }
    },
    delUser(row) {
      this.$confirm('此操作將永久刪除該檔, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            let id = row.id
            this.$http
                .get('/api/user/del', {
                  params: {
                    id
                  }
                })
                .then(res => {
                  console.log(res.data)
                  this.$message({
                    type: 'success',
                    message: '刪除成功!'
                  })
                  this.getList()
                })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消刪除'
            })
          })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/common';
</style>

