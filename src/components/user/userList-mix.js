export default {
  data () {
    return {
      // 用户数据列表
      userList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }]
      },
      editDialogVisible: false,
      editForm: {
        email: '',
        mobile: ''
      },
      editFormRules: {
        email: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const {
        data: res
      } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    // 每页条数改变触发的方法
    handleSizeChange (newpagesize) {
      this.queryInfo.pagesize = newpagesize
      this.getList()
    },
    handleCurrentChange (newpagenum) {
      this.queryInfo.pagenum = newpagenum
      this.getList()
    },
    async stateChange (id, state) {
      const {
        data: res
      } = await this.$http.put(`users/${id}/state/${state}`)
      if (res.meta.status !== 200) return this.$message.error(this.meta.msg)
    },
    addFormClose () {
      this.$refs.addFormRef.resetFields()
    },
    addUser () {
      this.$refs.addFormRef.validate(async req => {
        if (!req) return
        const {data: res} = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.addDialogVisible = false
        this.getList()
      })
    },
    async remove (id) {
      const res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const {data: req} = await this.$http.delete(`users/${id}`)
      if (req.meta.status !== 200) return this.$message.error(req.meta.msg)
      this.$message.success(req.meta.msg)
      this.getList()
    },
    async showEditDialog (id) {
      const {data: res} = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) return
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editFormClose () {
      this.$refs.editFormRef.resetFields()
    },
    async editUser () {
      const {data: res} = await this.$http.put(`users/${this.editForm.id}`, {email: this.editForm.email, mobile: this.editForm.mobile})
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.editDialogVisible = false
      this.getList()
    }
  }
}
