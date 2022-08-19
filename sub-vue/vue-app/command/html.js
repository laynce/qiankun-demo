const fs = require('fs');
const path = require("path")
const process = require("process")

if (process.argv.includes("vite")) {
  fs.rm(path.resolve(path.dirname(__dirname), "./public/index.html"), () => {
    console.log("删除完成")
  })
} else {
  fs.copyFile(path.resolve(path.dirname(__dirname), "./index.html"), path.resolve(path.dirname(__dirname), "./public/index.html"), () => {
    console.log("完成")
  })
  
}
