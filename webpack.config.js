/**
 * Created by Yuan on 2017/3/29.
 */
var webpack = require('webpack');
var path = require('path');//����node��path��

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //��ȡ��ʽ���

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

    //���ü�д�����ù����ļ���׺�Զ���ȫ
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
                loader:'url-loader?limit=1024', //ע������Ǹ�limit�Ĳ���������ͼƬ��СС��������Ƶ�ʱ�򣬻��Զ�����base64����ͼƬ
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
        }),

        //����css��ʹ��<link>���뵽ҳ��
        new ExtractTextPlugin(
            {
                filename:'app/[name].bundle.css',
                allChunks: true
            }
        ),
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