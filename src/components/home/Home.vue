<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo_box">
        <img src="../../assets/images/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click='logout'>退出</el-button>
    </el-header>
    <!-- 内容区域 -->
    <el-container>
      <!-- 左侧菜单区域 -->
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="skyblue" :unique-opened="true" :router="true">
          <el-submenu :index="item.id + ''" v-for="(item, i) in menuList" :key="item.id">
            <!-- 一级菜单 -->
            <template slot="title">
              <i :class="['iconfont',iconList[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mix from './Home-mix.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo_box {
      justify-content: space-between;
      color: #fff;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-submenu {
  width: 200px;
}
.el-submenu .el-menu-item {
  min-width: 0px;
}
</style>
