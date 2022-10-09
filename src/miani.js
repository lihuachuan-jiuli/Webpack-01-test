// 入口文件


// 引入模块
import count from './js/count'
import sum from './js/sum'

//要想webpack 打包资源, 必须要引入资源
import './css/iconfont.css'
import './css/index.css'
import './less/index.less'
import './sass/test1.scss'
import './sass/test2.sass'
import './stylus/index.styl'




// const result = count(1,2)
console.log(count(8,3))
console.log(sum(1,2,3,4,5))

