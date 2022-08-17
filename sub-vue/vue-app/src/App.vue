<template>
  <div>
    <h2>V3微应用</h2>
    <ul>
      <li><h3>主应用传递---{{msg}}</h3></li>
      <li><router-link to="/">Home页面</router-link></li>
      <li><router-link to="about">About页面</router-link></li>
    </ul>
    <router-view></router-view>
    <h3>特殊服务</h3>
    <p>qiankun沙箱样式隔离: <span>样式测验</span></p>
    <h3>同步主应用信息</h3>
    <ul>
      <li v-for="(v, k) in user" :key="k">
        <label>{{k}}</label>: {{v}}
      </li>
    </ul>
    主应用信息修改: <button @click="change">更改用户姓名</button>
  </div>
</template>

<script>
import { computed } from 'vue'

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
      store.commit('updateUser', ['name', originName + '@'])
    }

    const user = computed(()=> {
      return store.state.userInfo
    })
    
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
