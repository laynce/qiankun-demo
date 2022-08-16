import { Component } from 'react';

class Home extends Component {
  msg = null
  constructor() {
    super()
    this.msg = '更多信息详情...'
  }

  render() {
    const { msg } = this
    
    return (
      <div>
        <h3>React-Home页面信息</h3>
        <div>{msg}</div>
      </div>
    )
  }
}

export default Home