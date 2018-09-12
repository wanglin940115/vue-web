export default {
  data () {
    return {
      menuList: [],
      iconList: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao']
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 退出登录功能
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
      this.$message.success('退出成功')
    },
    // 获取菜单数据
    async getList () {
      const {
        data: res
      } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.menuList = res.data
      console.log(res)
    }
  }
}
