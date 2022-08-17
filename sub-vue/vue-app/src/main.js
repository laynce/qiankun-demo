import { createApp } from 'vue'
import './public-path'
import App from './App.vue'
import router from '../router'
import { setStore, changeStoreSate } from './store/index'

let instance = null

const render = (props) => {
  const { container, message, getGlobalState, onGlobalStateChange } = props;
  const store = setStore(getGlobalState()) // 传递主应用的state作为子应用的初始值
  changeStoreSate(onGlobalStateChange, store)

  instance = createApp(<App msg={message} />);
  instance.use(store)
  instance.use(router)
  instance.mount(container ? container.querySelector('#app-vue') : '#app-vue')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({getGlobalState: ()=> ({
    userInfo: {
      name: 'laynce',
      age: 28,
      addr: '陕西西安'
    }
  }), onGlobalStateChange: ()=>({})})
}

export async function bootstrap() {
  console.log('vue子应用 app bootstraped');
}


export async function mount(props) {
  console.log('vue子应用 app mount');
  render(props)
}


export async function unmount() {
  instance.unmount()
  instance = null
}