<template>
  <div id="app">
    <el-menu 
      mode="horizontal" 
      :router="true"   
      background-color="#545c64"
      :default-active="activeUrl"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="/vue-sub">vue应用</el-menu-item>
        <el-menu-item index="/react-sub">react应用</el-menu-item>
    </el-menu>
    <!-- 子应用插入的地方 -->
    <div id="app1"></div>
    <div id="app2"></div>
   
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data(){
    return {
      activeUrl: ''
    }
  },
  created() {
    this.activeUrl = location.pathname
  }
}
</script>

<style>

</style>
