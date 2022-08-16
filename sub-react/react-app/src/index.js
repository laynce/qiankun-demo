import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './public-path';
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

let root = null
const render = (props) => {
  const {container, message} = props
  root = ReactDOM.createRoot(container ? container.querySelector('#react-app') : document.getElementById('react-app'));
  
  root.render(
    <React.StrictMode>
      <BrowserRouter basename={window.__POWERED_BY_QIANKUN__? "react-sub" : '/'}>
        <App msg={message} />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props) {
  console.log(props, 555)
  render(props);
}

export async function unmount() {
  root.unmount();
}