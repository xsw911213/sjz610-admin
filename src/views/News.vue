<template>
	<section class="meeting-notice">
    <el-button type="primary" @click="goEditor('add')">添加新闻</el-button>
    <p class="title">新闻列表</p>
    <ul class="list">
      <li class="list-item" v-for="(item,index) in noticeList" :key="index">
        <el-button type="text" @click="goEditor(item._id)">{{item.title}}</el-button>
      </li>
    </ul>
	</section>
</template>

<script>
export default {
  data() {
    return {
      noticeList: []
    }
  },
  methods: {
    getNews () {
      let _this = this
      let succ = (res) => {
        console.log(res)
        _this.noticeList = res.data
      }

      let error = (err) => {
        console.log(err)
      }
      let reqConfig = {
        method: 'get',
        path: _this.host.baseUrl+'/news'
      }
      _this.ajax.http(reqConfig.method, reqConfig.path, {}, succ, error)
    },
    goEditor (id) {
      this.$router.push({
        name:'编辑',
        params:{
          from: 'news',
          id
        }
      })
    }
  },
  mounted() {
    this.getNews() 
  }
};
</script>

<style lang="scss">
.meeting-notice{
  position: relative;

  .title{
    position: relative;
    font-size: 20px;
  }
  .list{
    position: relative;
    &-item{
      position: relative;
      list-style: none;
    }
  }
}
</style>