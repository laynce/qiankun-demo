<template>
  <div>
    <h2>V3微应用</h2>
    <ul>
      <li><h3>主应用传递---{{msg}}</h3></li>
      <li><router-link to="/">Home页面</router-link></li>
      <li><router-link to="about">About页面</router-link></li>
    </ul>
    <router-view></router-view>
    特殊服务： <button @click="change">更改用户姓名</button>
    <span>4534554</span>
  </div>
</template>

<script>

import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  props: ['msg'],
  setup() {
    const store = useStore()
    const change = ()=> {
      let originName = store.state.userInfo.name
      console.log(originName)
      store.commit('updateUser', ['name', originName + '@'])
    }

    const user = store.state.userInfo
    
    return {
     change,
     user
    }
  },
}
</script>

<style>
  ul {
    margin: 20px auto;
  }
  span {
    background: green;
  }
</style>
