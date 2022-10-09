// Webpack 配置文件

// 导入node.js路径模块 path
const { type } = require('os')
const path = require('path')
// 引入插件
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 因为是在node.js 环境中运行的 所以要用 module.export
module.exports ={
    // 入口
    entry: './src/miani.js', //相对路径
    // 输出
    output: {
        // 开发模式没有输出 (za)
        path:undefined,
        // 入口文件打包输出文件的名
        filename:'js/jiuli.js',
   
    },

    // 加载器
    module: {
        rules:[
            {
                // Webpack内置的处理图片资源 (不需要下载loader)
                test:/\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        //优点:减少请求数量 
                        //缺点:体积会变得更大
                        maxSize:10*1024, //10kb
                    }
                },
                generator: {
                    // 输出图片的名字
                    // [hash:10] 哈希值只取前10位
                    filename: 'static/images/[hash:10][ext][query]',
                }
            },
            {
                // 处理其他资源字体图标和视频
                test:/\.(ttf|woff2?|map3|Map4|avi)$/,
                type: 'asset/resource', //对文件原封不动的输出
                generator: {
                    // 输出文件夹和文件名称
                    filename: 'static/media/[hash:10][ext][query]',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_module/, //排除node_module 中的 js 文件(这些不处理)
                use: {
                    loader: 'babel-loader',
                    // options :{
                    //     presets:['@babel/preset-env'],
                    // }
                }

            },
            // loader 的配置与规则
            {
                test: /\.css$/, //检测.css结尾的文件
                use: [  //执行顺序:从右到左 (从下到上)
                // use:[] 可以使用多个loader
                    'style-loader',  //将js 中css 通过创建 style 标签添加到 html 中生效
                    'css-loader', //将css资源编译到commonjs的模块到 js 中
                    
                 ],
            },
            {
                test: /\.less$/,
                use: [{
                    // {loader: 'xxxx}, // 只能使用一个loader
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" //将 less 编译成 css
                }]

            },
            {
                test: /\.s[ac]ss$/,
                use: [                
                    "style-loader", // creates style nodes from JS strings              
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" ,//将 sass 编译成 css
                ]
            },
            {
                test: /\.styl$/,
                use: [                
                    "style-loader", // creates style nodes from JS strings              
                    "css-loader", // translates CSS into CommonJS
                    "stylus-loader" ,//将 stylus 编译成 css
                ]
            }


        ]
    },

    // 插件
    plugins: [
        // plugin的配置
        new ESLintPlugin({
            // context 检测那些文件
            context: path.resolve(__dirname,'../src'),
        }),

        new HtmlWebpackPlugin({
            // 以指定目录下的html为模板,生成新的html文件,
            // 新html的特点: 1.结构和原来一致 2.第二个自动引入打包的资源
            template:path.resolve(__dirname,'../public/index.html'),
        }),
    ],
    // 

    // 开发服务器
    devServer: {
        host: 'localhost', //启动服务器域名
        port: '3000', //启动服务器端口号
        open:true, //是否自动打开浏览器
    },

    // 模式
    mode: 'development', //开发模式
}