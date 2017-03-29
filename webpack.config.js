/**
 * Created by Yuan on 2017/3/29.
 */
var  webpack = require('webpack');
var path = require('path');//����node��path��

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    //����ļ�
    entry:{
        app:['./app/index.js'],
    },
    output: {
        path: path.resolve(__dirname, './'),//ָ�������Ĵ���λ��Ϊ/bundle.js
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