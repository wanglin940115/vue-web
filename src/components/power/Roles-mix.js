export default {
  data () {
    return {
      RolesList: [],
      addRolesDialogVisible: false,
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      addRolesFormRules: {
        roleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      editRolesDialogVisible: false,
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      editRolesFormRules: {
        roleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      powerTree: [],
      allotDialogVisible: false,
      powerProps: {
        label: 'authName',
        children: 'children'
      },
      checkedIDs: [],
      infoID: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const {data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.RolesList = res.data
    },
    addRoles () {
      this.addRolesDialogVisible = true
    },
    addRolesFormClose () {
      this.$refs.addRolesFormRef.resetFields()
    },
    async addNewRoles () {
      const {data: res} = await this.$http.post('roles', this.addRolesForm)
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.addRolesDialogVisible = false
      this.getRolesList()
    },
    editRolesFormClose () {
      this.$refs.editRolesFormRef.resetFields()
    },
    async editNewRoles () {
      const {data: res} = await this.$http.put(`roles/${this.editRolesForm.roleId}`, {
        roleName: this.editRolesForm.roleName,
        roleDesc: this.editRolesForm.roleDesc
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success('修改成功')
      this.editRolesDialogVisible = false
      this.getRolesList()
    },
    async edit (id) {
      const {data: res} = await this.$http.get(`roles/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editRolesForm = res.data
      this.editRolesDialogVisible = true
    },
    async removeRoles (id) {
      const confirm = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirm !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const {data: res} = await this.$http.delete(`roles/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getRolesList()
    },
    async removePower (info, id) {
      const confirm = await this.$confirm('此操作将取消该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirm !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const {data: res} = await this.$http.delete(`roles/${info.id}/rights/${id}`)
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      info.children = res.data
    },
    async allotPower (data) {
      this.infoID = data.id
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // console.log(res)
      this.powerTree = res.data
      const checkedID = []
      this.getCheckedID(data, checkedID)
      // console.log(checkedID)
      this.checkedIDs = checkedID
      this.allotDialogVisible = true
    },
    getCheckedID (node, IDArry) {
      if (!node.children) {
        return IDArry.push(node.id)
      }
      node.children.forEach(item => this.getCheckedID(item, IDArry))
    },
    async allotRight () {
      const K1 = this.$refs.tree.getCheckedKeys()
      const K2 = this.$refs.tree.getHalfCheckedKeys()
      const keysStr = [...K1, ...K2].join(',')
      const {data: res} = await this.$http.post(`roles/${this.infoID}/rights`, {rids: keysStr})
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getRolesList()
      this.allotDialogVisible = false
    }
  }
}
