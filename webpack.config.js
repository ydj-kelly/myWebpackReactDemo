/**
 * Created by Yuan on 2017/3/29.
 */
var webpack = require('webpack');
var path = require('path');//����node��path��

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    //����ļ�
    entry: {
        app: ['./app/index.js'],
        vendors: ['jquery', 'react', 'moment'] //��������
    },
    output: {
        path: path.resolve(__dirname, './'),//ָ�������Ĵ���λ��Ϊ/bundle.js
        publicPath: "/",
        filename: 'bundle_[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        //�Զ�����html���
        new HtmlWebpackPlugin({
            title: 'devPage', //����ҳ���title
            filename: 'indexDev.html',   //�������html���ļ���
            template: 'indexTemp.html', //Ҫʹ�õ�ģ���·��
            inject: 'body', //��ģ��ע�뵽�ĸ���ǩ��
            minify: false, //�Ƿ�ѹ��
            hash: true, //�Ƿ�hash��
            cache: false, //�Ƿ񻺴�
            showErrors: false //�Ƿ���ʾ����
        }),

        //��ȡ����������Դ
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', //��entry��vendors��Ӧ
            filename: 'common.bundle.js',//����Ĺ�����Դ����
            //����ģ�鱻ʹ�õ���С��������������Ϊ3��
            // Ҳ����ͬһ��ģ��ֻ�б�3�������ҳ��ͬʱ����ʱ�Żᱻ��ȡ������Ϊcommon chunks
            //����ΪInfinity��������entryʵ��
            minChunks: Infinity
        }),

        //ȫ�����ز������jQuery��Ϊȫ�ֱ������뵽���еĴ����У�Ȼ��Ϳ���ֱ����ҳ����ʹ��jQuery��
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    devServer: {
        contentBase: "./",
        //������������ʱ����ʹ�����������package.json�Ŀ�ݷ�ʽ�inlineѡ���Ϊ���ҳ����ӡ��ȼ��ء����ܣ�
        //hotѡ�����������滻�������������¼�������ı�Ĳ��֣����������¼�������ҳ�棩������������������룬
        // ����Դ�ı�ʱ��webpack-dev-server�����ȳ��ԡ����滻�������ʧ�������¼����������ҳ��
        //hot: true, //�����ȵ�
        //inline: true, //����ҳ���Զ�ˢ��
        //progress: true, //��ʾ����Ľ���
        quiet: false, //����̨�в�����������Ϣ������Ϊfalse�������
        port: '8088' //���ö˿ں�
    },
}

module.exports = config;