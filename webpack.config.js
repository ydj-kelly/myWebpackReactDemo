/**
 * Created by Yuan on 2017/3/29.
 */
var webpack = require('webpack');
var path = require('path');//����node��path��

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    //����ļ�
    entry: {
        app: ['./app/index.js'],
        vendors:['jquery','react','moment'] //��������
    },
    output: {
        path: path.resolve(__dirname, './'),//ָ�������Ĵ���λ��Ϊ/bundle.js
        publicPath: "/",
        filename: 'bundle_[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'devPage',
            filename: 'indexDev.html',   //�������html���ļ���
            template: 'indexTemp.html', //Ҫʹ�õ�ģ���·��
            inject: 'body', //��ģ��ע�뵽�ĸ���ǩ��
            minify: false, //�Ƿ�ѹ��
            hash: true, //�Ƿ�hash��
            cache: false, //�Ƿ񻺴�
            showErrors: false //�Ƿ���ʾ����
        }),

    ],
}

module.exports = config;