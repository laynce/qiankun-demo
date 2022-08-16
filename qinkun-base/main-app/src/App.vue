<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
       <el-header style="height: auto;padding-left:0">
          <div class="clearfix">
            <h3>用户信息</h3>
          </div>
          <div v-for="(v, k) in user.userInfo" :key="k" class="text item">
            <span>{{k}}</span>: {{v}}
          </div>
        </el-header>
      <el-container>
       <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
        <el-menu 
          mode="vertical" 
          :router="true"   
          background-color="#545c64"
          :default-active="activeUrl"
          text-color="#fff"
          active-text-color="#ffd04b">
            <el-menu-item index="/vue-sub">vue应用</el-menu-item>
            <el-menu-item index="/react-sub">react应用</el-menu-item>
      </el-menu>
      </el-aside>
        <el-main>
          <!-- 子应用插入的地方 -->
          <div id="app1"></div>
          <div id="app2"></div>
        </el-main>
      </el-container>
  </el-container>

  </div>
</template>

<script>
import action from './store'
export default {
  name: 'App',
  data(){
    return {
      activeUrl: '',
      user: action.getGlobalState()
    }
  },
  created() {
    setTimeout(()=> {
      this.activeUrl = location.pathname
    })
  }
}
</script>

<style scoped>
  .item {
    line-height: 32px;
    float: left;
    width: 160px;
    margin-bottom: 10px;
  }
  .clearfix {
    clear: both;
  }
</style>
<style>
  /* span {
    color: red;
  } */
</style>
