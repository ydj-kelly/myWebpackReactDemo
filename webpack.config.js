/**
 * Created by Yuan on 2017/3/29.
 */
var webpack = require('webpack');
var path = require('path');//引入node的path库

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    //入口文件
    entry: {
        app: ['./app/index.js'],
        vendors:['jquery','react','moment'] //第三方库
    },
    output: {
        path: path.resolve(__dirname, './'),//指定编译后的代码位置为/bundle.js
        publicPath: "/",
        filename: 'bundle_[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'devPage',
            filename: 'indexDev.html',   //设置这个html的文件名
            template: 'indexTemp.html', //要使用的模块的路径
            inject: 'body', //把模板注入到哪个标签后
            minify: false, //是否压缩
            hash: true, //是否hash化
            cache: false, //是否缓存
            showErrors: false //是否显示错误
        }),

    ],
}

module.exports = config;