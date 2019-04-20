const ip = require('ip');
let IPv4 = 'localhost';
const webpack = require('webpack');
const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');
const Entry_File = path.resolve(__dirname, 'entryFile');
const NODE_MODULE = path.resolve(__dirname, 'node_module');
module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: APP_DIR + "/entry_wap.js",
        plugin: APP_DIR+"/plugin/utils/main.js",

        noServiceEntry: APP_DIR + "/noService.js",//非法访问页面

    }, // 入口文件
    // 输出文件 build下的bundle.js
    output: {
        path: BUILD_DIR+"/static_wap",
        filename: "[name].[hash].js",
        publicPath:"/",
    },
    resolve: {
        alias: {
            "configureStore":path.resolve(__dirname,"./src/store/configureStore.dev_wap"),
            "globalConfig":path.resolve(__dirname,"./config/config_Wap"),//配置文件
            "CacheHelper":path.resolve(__dirname,"./src/store/CacheHelper"),//
            "globalRouter":path.resolve(__dirname,"./src/router/RouterWap"),//路由
            "globalAction":path.resolve(__dirname,"./src/actions/index"),//action
            "provincesJson":path.resolve(__dirname,"./config/provincesJson"),//省市的JSON数据
            "offlineTransferJson":path.resolve(__dirname,"./config/offlineTransferJson"),//转账类型JSON
            "wapNavJson":path.resolve(__dirname,"./config/wapNavJson"),//转账类型JSON
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
                                ['import',{libraryName:'antd-mobile', libraryDirectory: "es", "style": "css"}]
                            ],
                            cacheDirectory: true,
                        },
                    }
                ],
                exclude:NODE_MODULE,
            },
            {
                test: /\.(css|scss|less)$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader:'less-loader' // 引入less-loader
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                }
            }
        },
        // 为每个入口提取出webpack runtime模块
        runtimeChunk: { name: 'manifest' }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery':"jquery"
        }),
        new HtmlWebpackPlugin({
            template: 'public/index_wap.html', // 模版文件
            filename:"index.html",
            chunksSortMode: function (chunk1, chunk2) {
                var order =  ["manifest","commons",'plugin','bundle'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            chunks: ["manifest","commons","bundle", "plugin"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/gameUrlLoading.html', //请求游戏接口时的loading页面
            filename:"gameUrlLoading.html",
            chunks: ["plugin","gameUrlLoading"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/servicePage.html', //非法访问页面
            filename:"NoServicePage.html",
            chunks: ["manifest","commons","noServiceEntry"]
        }),
    ],
    // 配置devServer各种参数
    devServer: {
        host: '0.0.0.0',
        port:"8081",
        useLocalIp: true,
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        open: false,//自动打开浏览器
        proxy: {//重定向
            // '/api/v0/Pay/**': {target: 'http://43.255.191.5:1144/', secure: true },//.net測試環境
            // '/api/**': {target: 'http://43.255.191.5:1133/', secure: false,changeOrigin:true },//.net測試環境
            '/api/v0/Pay/**': {//.net生產環境[支付]
               target: 'http://wy8.net.wap.cgtest06.com/',//测试站
            //    target: 'https://m.ybdemo.com/',//测试站
            //    target: 'https://m.4776888.cn/',//XHTD新濠天地
                // target: 'http://43.255.191.5:1133/',//测试站
                // target: 'http://m.nilaiying.com/',//代理地址
                // target: 'https://838795.com/',//BBT365代理地址
                // target: 'http://m.sun88183.com/', // 莱得利
                // target: 'http://xpj.ybapi.club/',//代理地址新葡京xpj-xpj
               // target:"https://asa-pay-1.xpjcdn.in/",
                secure: false,//若地址为https，需要设置为false
                changeOrigin:true //是否跨域
            },
            '/api/**': {//.net生產環境
                // target: 'https://dafabt6.ybapi.club/',//代理地址大发'
                // target: 'http://xpj.ybapi.club/',//代理地址新葡京xpj-xpj
                // target: 'http://m.nilaiying.com',//代理地址威尼斯UZI
                // target: 'http://m.sun88183.com/', // 莱得利
                // target: 'http://vv8.ybapi.club/',//代理地址美高梅vv8
                // target: 'https://838795.com/',//BBT365代理地址
                // target: 'http://asa.ybapi.club/',//代理地址新葡京asa
                // target: 'http://dbb.net.pc.cgtest06.com/',//代理地址DBBB
                // target: 'http://bt6.tyc.pc.cgtest06.com/',//代理地址
                target: 'http://wy8.net.wap.cgtest06.com/',//测试站
                // target: 'https://m.4776888.cn/',//XHTD新濠天地
                // target: 'https://m.ybdemo.com/',//测试站
                // target: 'http://43.255.191.5:1133/',//测试站
                // target: 'http://vn2.ybapi.club/',//代理地址vn2
                // headers: {host:"www.w9188.com"}, target: 'http://43.255.191.27/',    //kyy利达国际
                //target: 'http://xhtd.ybapi.club/',//代理地址xhtd-xhtd
                // target: 'http://ppp.ybapi.club/',//代理地址ppp
                // target: 'http://jjh.ybapi.club/',//金濠jjh
                // target: 'http://xin1.ybapi.club/',// 代理地址 xhtd-xin
                //  target: 'http://bbt.ybapi.club/',//代理地址BBT
                //   target: 'http://ldl-dafa.net.app.cgtest06.com/',//代理地址LDL的大发
                secure: false,//若地址为https，需要设置为false
                changeOrigin:true //是否跨域
            },
            // '/api/**':{target:'https://dbb.ybapi.club/'}

        },
    },
    performance: {
        hints: false
    }
};