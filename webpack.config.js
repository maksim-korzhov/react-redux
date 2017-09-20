var HtmlWebpackPlugin = require('html-webpack-plugin'); // для работы с html
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // для отделения css в отдельный файл
const path = require('path'); // для работы с путями

module.exports = {
    entry: {
        first: './src/first/index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"],
                    publicPath: __dirname + '/dist/',
                    filename: "[name].[ext]"
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    // Настройки сервера разработки
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true, // gzip all files
        //port: 9000,
        stats: 'errors-only', // не показывать весь лог, только ошибки,
        open: true // Всегда открывать в новом окне
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            chunks: ['first'],
            template: './src/first/index.html'
        }),
        new ExtractTextPlugin({
            filename: "[name].css",
            //disabled: false,
            allChunks: true
        })
    ]
};