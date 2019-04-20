
const ip = require('ip');
let IPv4 = 'localhost';
const webpack = require('webpack');
const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');
const NODE_MODULE = path.resolve(__dirname, 'node_module');

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: APP_DIR + "/entry.js",
        plugin: APP_DIR+"/plugin/index.js",
        common:['jquery','react', 'react-dom','redux', 'react-redux', 'react-router', 'react-router-redux'],
        help: APP_DIR + "/help.js",//帮助中心 入口文件
        hongBao: APP_DIR + "/hongBao.js",//紅包頁面  入口文件
        noServiceEntry: APP_DIR + "/noService.js",//非法访问页面
        maintain: APP_DIR + "/maintain.js",//网站维护中  入口文件
        agent: APP_DIR + "/agent.js", //代理页面
        gameUrlLoading: APP_DIR + "/gameUrlLoading.js", //请求游戏接口时的loading页面
        // nav: APP_DIR + "/nav.js",
         promotionCenter: APP_DIR + "/promotionCenter.js"
    }, // 入口文件
    // 输出文件 build下的bundle.js
    output: {
        path: BUILD_DIR+"/static",
        filename: "[name].[hash].js",
        publicPath:"/",
    },
    resolve: {
        alias: {
            "configureStore":path.resolve(__dirname,"./src/store/configureStore.prod"),
            "globalConfig":path.resolve(__dirname,"./config/config"),//配置文件
            "globalRouter":path.resolve(__dirname,"./src/router/Router"),//路由
            "globalAction":path.resolve(__dirname,"./src/actions/index"),//action
            "provincesJson":path.resolve(__dirname,"./config/provincesJson"),//省市的JSON数据
            "offlineTransferJson":path.resolve(__dirname,"./config/offlineTransferJson"),//转账类型JSON

        }
    },
    // 使用loader模块
    module: {
        rules: [
            {
                test: /\.(gif|jpg|png)\??.*$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit:1,
                            name:"images/[path][name].[ext]?v=[hash:12]"
                        }
                    }
                ],
                exclude: NODE_MODULE
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit:1,
                            name:"font/[path][name].[ext]?v=[hash:12]"
                        }
                    }
                ],
                exclude: NODE_MODULE
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader:"babel-loader",
                        options: {
                            "presets": ["es2015", "react", "stage-1"],
                            plugins:[
                                "transform-runtime",
                                ['import',{libraryName:'antd', libraryDirectory: "es", "style": "css"}]
                            ],
                            cacheDirectory: true,
                        }
                    }
                ],
                exclude:NODE_MODULE,
                // include: [
                //     APP_DIR
                // ]
            },
            {
                test: /\.(css|scss|less)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }
                ]
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery':"jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html', // 模版文件
            filename:"index.html",
            chunksSortMode: function (chunk1, chunk2) {
                var order =  ["common",'plugin','bundle'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            chunks: ["common","bundle", "plugin"]
        }),

        new HtmlWebpackPlugin({
            template: 'public/help.html', //幫助頁面
            filename:"help.html",
            chunks: ["help"]
        }),

        new HtmlWebpackPlugin({
            template: 'public/agent.html', //代理頁面
            filename:"agent.html",
            chunks: ["plugin","agent"]
        }),

        new HtmlWebpackPlugin({
            template: 'public/maintainPage.html', //模版文件
            filename:"maintainPage.html",
            chunks: ["maintain"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/hongBao.html', //紅包文件
            filename:"hongBao.html",
            chunks: ["common", "hongBao"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/servicePage.html', //非法访问页面
            filename:"NoServicePage.html",
            chunks: ["noServiceEntry"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/gameUrlLoading.html', //请求游戏接口时的loading页面
            filename:"gameUrlLoading.html",
            chunks: ["plugin","gameUrlLoading"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/promotionCenter.html', //优惠活动办理中心
            filename:"promotionCenter.html",
            chunks: ["common", "promotionCenter"]
        }),
        // new HtmlWebpackPlugin({
        //     template: 'public/nav.html', //導航頁面
        //     chunks: ["common", "nav"]
        // }),
    ],
    // 配置devServer各种参数
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        open: false,//自动打开浏览器
        //openPage: "",
        host: IPv4,
        proxy: {//重定向
             // '/api/v0/Pay/**': {target: 'http://43.255.191.5:1144/', secure: true },//.net測試環境
             // '/api/**': {target: 'http://43.255.191.5:1133/', secure: false,changeOrigin:true },//.net測試環境

            //  '/api/v0/Pay/**': { target: 'http://43.255.191.5:1144/', secure: true },    //测试多渠道支付
            //  '/api/**': { target: 'http://43.255.191.5:1133/', secure: true },    //测试多渠道支付

            // '/api/v0/Pay/**': {//.net生產環境[支付]
            //     target: 'http://paynew.df8.in/',//dbb大发
            //     secure: false,//若地址为https，需要设置为false
            //     changeOrigin:true //是否跨域
            // },
            // '/api/**': {//.net生產環境
            //         target: 'http://dbb.ybapi.club/',//dbb大发
            //         secure: false,//若地址为https，需要设置为false
            //         changeOrigin:true //是否跨域
            // },

            
            '/api/v0/Pay/**': {//.net生產環境[支付]
                // target: 'http://wy8.net.pc.cgtest06.com/',//wy8测试demo站'
                // target: 'http://bt6.tyc.pc.cgtest06.com/',//代理地址大发'
                // target: 'http://43.255.191.12:1133/',//测试站
                // target: 'https://5967700.com/', // ASA新葡京
                // target: 'http://bt6.dafa.pc.cgtest06.com/',//代理地址大发'
                // target: 'http://df52083.com/', // 莱得利
                // target: 'http://0.xpjcdn.in/',//代理地址新葡京xpj-xpj
                // target: 'http://uzi1.vnsrcdn.in/',//代理地址威尼斯UZI
                // target: 'http://vv88.mgmcdn.in/',//代理地址美高梅vv8
                // target: 'http://asa-pay-1.xpjcdn.in/',//代理地址新葡京asa
                // target: 'http://kyy1.lilaicdn.in/',//代理地址kyy利达国际
                // target: 'https://cndf1.com/',//大发DBB
                // target: 'http://vn2.net.pc.cgtest06.com',//威尼斯人vn2
                target: 'https://47761110.com/',//xhtd-xhtd
                // target: 'http://ppp1.pufacdn.in/',//浦发ppp
                // target: 'http://pay1.jhcdn.in/',// 金濠jjh
                // target: 'http://xin1.xhtdcdn.in/', // 代理地址 xhtd-xin
                // target: 'http://wy8-pay.cgtest06.com/', // WY8测试后台
                // target: 'http://bet365-pc-demo.dbet.bet',   //newbet365-BBT
                secure: false,//若地址为https，需要设置为false
                changeOrigin:true //是否跨域
            },
            '/api/**': {//.net生產環境
                // target: 'http://wy8.net.pc.cgtest06.com/',//wy8测试demo站'
                // target: 'http://43.255.191.12:1133/',//代理地址大发'
                // target: 'http://bt6.dafa.pc.cgtest06.com/',//代理地址大发'
                // target: 'http://df52083.com/', // 莱得利
                // target: 'https://5967700.com/', // ASA新葡京
                // target: 'http://xpj.ybapi.club/',//代理地址新葡京xpj-xpj
                // target: 'http://uzi.ybapi.club/',//代理地址威尼斯UZI
                // target: 'http://vv8.ybapi.club/',//代理地址美高梅vv8
                // target: 'http://asa.ybapi.club/',//代理地址新葡京asa
            //    target: 'https://cndf1.com/',//大发DBB
                // target: 'http://kyy.ybapi.club/',//代理地址kyy利达国际
                // target: 'http://vn2.net.pc.cgtest06.com',//代理地址vn2
                // target: 'http://xhtd.ybapi.club/',//代理地址xhtd-xhtd
                // target: 'http://ppp.ybapi.club/',//代理地址ppp
                // target: 'http://jjh.ybapi.club/',//金濠jjh
                target: 'https://47761110.com/',//xhtd-xhtd
                // target: 'http://xin1.ybapi.club/',// 代理地址 xhtd-xin
                // target: 'http://wy8.ybapi.club/', // WY8测试后台
                // target: 'http://bet365-pc-demo.dbet.bet',   //newbet365-BBT
                secure: false,//若地址为https，需要设置为false
                changeOrigin:true //是否跨域
            },

            // '/api/v0/Pay/**': {//.net生產環境[支付]
            //     target: 'http://bt6.dafa.pc.cgtest06.com/',//大发
            //     secure: false,//若地址为https，需要设置为false
            //     changeOrigin:true //是否跨域
            // },
            // '/api/**': {//.net生產環境
            //         target: 'http://bt6.dafa.pc.cgtest06.com/',//大发
            //         secure: false,//若地址为https，需要设置为false
            //         changeOrigin:true //是否跨域
            // },



            // '/api/v0/Pay/**': {//.net莱得利
            //     target: 'http://df52085.com/',//代理地址
            //     secure: false,//若地址为https，需要设置为false
            //     changeOrigin:true //是否跨域
            // },
            // '/api/**': {//.net莱得利
            //         target: 'http://df52085.com/',//代理地址
            //         secure: false,//若地址为https，需要设置为false
            //         changeOrigin:true //是否跨域
            // },

        },
    },
    performance: {
        hints: false
    }
};