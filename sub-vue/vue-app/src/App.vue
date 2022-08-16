<template>
  <div>
    <h2>V3微应用</h2>
    <ul>
      <li><h3>主应用传递---{{msg}}</h3></li>
      <li><router-link to="/">Home页面</router-link></li>
      <li><router-link to="about">About页面</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  props: ['msg'],
  setup() {
    return {
      list_v3: {
        id: 90
      }
    }
  },
  data() {
    return {
      a_v3: 100
    }
  }
}
</script>

<style>
  ul {
    margin: 20px auto;
  }
</style>
