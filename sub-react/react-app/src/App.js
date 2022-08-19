import Home from "./components/Home"
import About from "./components/About"
import {Routes, Route, Link } from "react-router-dom";
console.log(window.aaa )
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React应用</h2>
        <div>
          <ul>
            <li><h3>主应用传递--{props.msg}</h3></li>
            <li><Link to="/">主页面</Link></li>
            <li><Link to="/about">About面</Link></li>
          </ul>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/about" element={<About></About>}></Route>
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
