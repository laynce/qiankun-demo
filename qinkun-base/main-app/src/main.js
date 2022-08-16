import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import action from './store';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


const getGlobalState = action.getGlobalState
// activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。
const app = [
  {
    name: 'vue-app', // app name registered
    entry: '//localhost:5000',
    container: '#app1',
    activeRule: '/vue-sub',
    props: {
      message: '来自主应用的问候to-vue',
      getGlobalState
    },
  },
  {
    name: 'react-app', 
    entry: '//localhost:9000',
    container: '#app2',
    activeRule: '/react-sub',
    props: {
      message: '来自主应用的问候to-react',
      getGlobalState
    },
  }
]


// 注册子应用
registerMicroApps(app,
  {
    beforeLoad: (app) => {
      
      console.log('before load', app.name)
    },
    beforeMount: (app) => {
      console.log('before mount', app.name)
    }
  }) 


// 设置默认挂载
setDefaultMountApp("/vue-sub")

// 启动
start({
  sandbox: { experimentalStyleIsolation: true  }  // 样式隔离
})