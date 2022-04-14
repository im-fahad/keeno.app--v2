const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
let fs = require('fs');
const pagess = fs.readdirSync('./src/views');

const pages = pagess.map(name => {
    let path = 'src/views'
    return new HtmlWebpackPlugin({
        filename: `${name}`,
        template: `${path}/${name}`,
    })
})


module.exports = {
    entry: {
        'page': './app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/build'),
        filename: 'bundle.js',
    },
    devServer: {
        static: path.resolve(__dirname, 'src'),
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: `src/views/index.html`,
        })
    ].concat(pages)
};