/**
 * Created by Yuan on 2017/3/29.
 */
var webpack = require('webpack');
var path = require('path');//引入node的path库

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取样式插件

var config = {
    //入口文件
    entry: {
        app: ['./app/index.js'],
        vendors: ['jquery', 'react', 'moment'] //第三方库
    },
    output: {
        path: path.resolve(__dirname, './'),//指定编译后的代码位置为/bundle.js
        publicPath: "/",
        filename: 'bundle_[name].js'
    },

    //配置简写，配置过后，文件后缀自动补全
    resolve: {
        extensions: [' ','.js', '.jsx','.less','.css']
    },

    module: {
        loaders: [
            {
                test:/\.jsx|.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015']
                }
            },
            {
                test: /\.css$/,
                //loader: 'style-loader!css-loader',
                loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                exclude:/node_modules/
            },
            {
                test:/\.less/,
                //loader:"style!css-loader!less",
                loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' }),
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader?limit=1024', //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        //自动生成html插件
        new HtmlWebpackPlugin({
            title: 'devPage', //设置页面的title
            filename: 'indexDev.html',   //设置这个html的文件名
            template: 'indexTemp.html', //要使用的模块的路径
            inject: 'body', //把模板注入到哪个标签后
            minify: false, //是否压缩
            hash: true, //是否hash化
            cache: false, //是否缓存
            showErrors: false //是否显示错误
        }),

        //提取公共部分资源
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', //与entry的vendors对应
            filename: 'common.bundle.js',//输出的公共资源名字
            //公共模块被使用的最小次数。比如配置为3，
            // 也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks
            //设置为Infinity，对所有entry实用
            minChunks: Infinity
        }),

        //全部挂载插件，把jQuery作为全局变量插入到所有的代码中，然后就可以直接在页面中使用jQuery了
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        //分离css，使用<link>插入到页面
        new ExtractTextPlugin(
            {
                filename:'app/[name].bundle.css',
                allChunks: true
            }
        ),
    ],

    devServer: {
        contentBase: "./",
        //在这里配置有时不好使，最好配置在package.json的快捷方式里；inline选项会为入口页面添加“热加载”功能；
        //hot选项则开启“热替换”，即尝试重新加载组件改变的部分（而不是重新加载整个页面）；如果两个参数都传入，
        // 当资源改变时，webpack-dev-server将会先尝试“热替换”，如果失败则重新加载整个入口页面
        //hot: true, //开启热点
        //inline: true, //开启页面自动刷新
        //progress: true, //显示打包的进度
        quiet: false, //控制台中不输出打包的信息，设置为false方便调试
        port: '8088' //设置端口号
    },
}

module.exports = config;