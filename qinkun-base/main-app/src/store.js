import { initGlobalState } from 'qiankun';


const initState = {
  userInfo: {
    name: 'laynce',
    age: 28,
    addr: '陕西西安'
  }
}

const action = initGlobalState(initState)

action.onGlobalStateChange((state, prev) => {
  console.log(state, prev, '主应用state', initState)
})

action.getGlobalState = (key) => {
  const getVal = () => initState[key] || initState.userInfo[key]
  return key ? getVal() : initState
}

export default action