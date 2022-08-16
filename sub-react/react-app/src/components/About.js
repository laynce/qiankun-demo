import { Component } from 'react';

class About extends Component {
  msg = null
  constructor() {
    super()
    this.msg = '更多信息详情...'
  }

  render() {
    const { msg } = this
    
    return (
      <div>
        <h3>React-About页面信息</h3>
        <div>{msg}</div>
      </div>
    )
  }
}

export default About