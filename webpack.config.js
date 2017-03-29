/**
 * Created by Yuan on 2017/3/29.
 */
var  webpack = require('webpack');
var path = require('path');//引入node的path库

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    //入口文件
    entry:{
        app:['./app/index.js'],
    },
    output: {
        path: path.resolve(__dirname, './'),//指定编译后的代码位置为/bundle.js
        publicPath:"/",
        filename: 'bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'devPage'
        }),

    ],
}

module.exports = config;