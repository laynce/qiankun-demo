import {createRouter, createWebHistory} from 'vue-router'
import Home from '../src/components/Home.vue'
import About from '../src/components/About.vue'
import { getMicroApp } from "../qiankunLegancy"

const microApp = getMicroApp("vueApp")
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(microApp.__POWERED_BY_QIANKUN__ ? 'vue-sub': '/'),
  routes, // `routes: routes` 的缩写
})

export default router