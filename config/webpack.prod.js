// Webpack 配置文件

// 导入node.js路径模块 path
const { type } = require('os')
const path = require('path')
// 引入插件
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const loader = require('sass-loader')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")



// 封装了一个处理样式的loader
function getStyleLoader (pre){
    return [ 
        MiniCssExtractPlugin.loader, //提取css成单独的文件
        'css-loader', //将css资源编译到commonjs的模块到 js 中
        {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                    "postcss-preset-env", //能解决大多数样式兼容性问题                             
                        ],
                    },
                },
            }, 
            pre,      
        ].filter(Boolean); //过滤空的
}

// 因为是在node.js 环境中运行的 所以要用 module.export
module.exports ={
      // 模式
      mode: 'production', //生产模式

    // 入口
    entry: './src/miani.js', //相对路径

    // 输出
    output: {
        // 所有文件的输出路径 (绝对路径)
        // __dirname node.js的变量, 代表当前文件夹目录
        path: path.resolve(__dirname, '../dist'),
        // 入口文件打包输出文件的名
        filename:'js/jiuli.js',
        // 打包的时候自动清空 上次打包的结果
        // 原理:在打包前,将path整个目录内容清空,在进行打包
        clean: true,
    },

    // 加载器
    module: {
        // loader 的配置与规则
        rules:[
            // Webpack内置的处理图片资源 (不需要下载loader)
            {               
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

            // 处理其他资源字体图标和视频
            {                
                test:/\.(ttf|woff2?|map3|Map4|avi)$/,
                type: 'asset/resource', //对文件原封不动的输出
                generator: {
                    // 输出文件夹和文件名称
                    filename: 'static/media/[hash:10][ext][query]',
                }
            },

            // babel-loader
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

            
            {
                test: /\.css$/, //检测.css结尾的文件
                use: getStyleLoader(), //执行顺序,(从上到下)
                },
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
                },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader('sass-loader')
                },
            {
                test: /\.styl$/,
                use: getStyleLoader('stylus-loader')
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

        new  MiniCssExtractPlugin({
            filename:'static/css/mani.css'
        }),

        new CssMinimizerPlugin()
    ],

  
}