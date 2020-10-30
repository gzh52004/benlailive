const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, './pbulic'),
        port: 2001,
        open: true
    },
    resolve: {
        //默认扩展名
        extensions: ['.js', '.jsx'],
        //路径别名
        alias: {
            '@': path.resolve('./src')
        }
    },
    module: {
        rules: [
            //加载编译js jsx 文件
            {
                test: /\.jsx?$/,// .js .jsx
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],//插件集合
                            plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], ['@babel/plugin-proposal-class-properties', { legacy: true }, "@babel/plugin-syntax-dynamic-import"]
                            ]
                        }
                    }
                ]
            },
            //编译css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //编译sass文件 sass->css->style
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html')
        })
    ]
}