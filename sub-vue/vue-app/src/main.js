import { createApp } from 'vue'
import './public-path'
import App from './App.vue'
import router from '../router'

let instance = null

const render = (props) => {
  console.log(props, 111)
  const { container, message } = props;
  instance = createApp(<App msg={message}/>);
  instance.use(router)
  instance.mount(container ? container.querySelector('#app-vue') : '#app-vue')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
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
  console.log(instance, 777)
}