const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

//js  压缩工具
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//文件压缩配置
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
//判断运行环境
const IS_PROD = process.env.NODE_ENV === 'production';
//配置CDN
let cdn = {
    css: [
        // // element-ui css
        // '/staticfile/element-ui/index.css'
    ],
    js: [
        // // // element-ui js
        // '/staticfile/element-ui/index.js',
    ]
};

module.exports = {
    publicPath: IS_PROD ? '/' : '/', // 默认'/'，部署应用包时的基本 URL,
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'static',
    outputDir: process.env.outputDir,
    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: false,
    // 通过这个选项可以显式转译一个依赖。
    transpileDependencies: [/* string or regex */],
    // 是否为生产环境构建生成 source map？
    productionSourceMap: IS_PROD,
    //原生webpack的相关配置
    chainWebpack: config => {
        // set svg-sprite-loader
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
            // .use('style-loader!css-loader')
            // .test(/\.css$/)
            // .loader('style-loader!css-loader')
            // .exclude('/node_modules/')
            // .end()
            // .test(/\.(woff|svg|eot|ttf)\??.*$/)
            // .loader('url-loader')
            // .end()

        if (IS_PROD) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
            config.plugin('html').tap(args => {
                args[0].cdn = cdn;
                args[0].minify.removeComments = false;
                return args;
            })

            config.plugins.delete('prefetch');
            config.plugins.delete('prefetch-index');
            config.plugins.delete('preload-index');

            //关联依赖配置
            config.resolve.symlinks(true);
            config.resolve.alias
                .set('@', resolve('./src'))
        }
    },
    configureWebpack: config => {
        var plugins = []
        if (IS_PROD) {
            //打包 压缩配置
            plugins = [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log'] // 移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                }),
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jQuery: "jquery",
                    "windows.jQuery": "jquery"
                })
            ];
        }
        //jQuery配置
        plugins.push(new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        }))
        config.plugins = [...config.plugins, ...plugins];

        //devtool: 'cheap-module-eval-source-map', 这是默认值 导致我每次都找不到debugger
        config.devtool = 'source-map'
    },
    // CSS 相关选项
    css: {
        sourceMap: !IS_PROD,
        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        requireModuleExtension: false
    },
    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,

    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
    pwa: {},

    // 配置 webpack-dev-server 行为。
    devServer: {
        disableHostCheck: true,
        // open: process.platform === 'darwin',
        open: true,
        host: '0.0.0.0',
        // host: '192.168.8.137',
        port: 8001,
        https: false,
        hotOnly: true,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        // string | Object
        // change 设置跨域代理
        proxy: {
            '/rasp': {
                target: 'http://localhost:8080/',   //测试服务
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    //'^/api': ''
                }
            }
        },
        // change 增加 mock 模拟数据
        before: app => {
            //本地node 有响应, 就不会再请求目标后端了
            app.all('/rasp/mock/*', (req, res) => {
                res.setHeader('Content-Type', 'application/json;charset=UTF-8');
                const originalUrl = (req.originalUrl.split('/')[req.originalUrl.split('/').length - 1]).split('?')[0]
                res.status(200).send(fs.readFileSync(`./mock/${originalUrl}.json`).toString('UTF-8'))
            })
        }
    },
    //多页面配置
    pages: {
        index: {
            // page 的入口
            entry: "src/pages/index/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Index Page",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "index"]
        },
        demo: {
            // page 的入口
            entry: "./src/pages/demo/main.js",
            // 模板来源
            template: "public/demo.html",
            // 在 dist/index.html 的输出
            filename: "demo.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Demo Page",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "demo"]
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: "src/subpage/main.js"
    },
    // 三方插件的选项
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/styles/vairable.less')]
        }
    }
}
