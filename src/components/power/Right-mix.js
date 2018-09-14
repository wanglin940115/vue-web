export default {
  data () {
    return {
      powerList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const {data: res} = await this.$http.get('rights/list')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.powerList = res.data
    }
  }
}
