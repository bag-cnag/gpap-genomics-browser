

var HtmlWebpackPlugin =  require('html-webpack-plugin');


module.exports = {
    entry :  './app/index.js',
    devServer: {
        inline:true,
        port: 7000,
        historyApiFallback: true,
    },
    watch:false,
    module : {
        rules : [
            {
                test : /\.(js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-syntax-dynamic-import"]
                    }
                }
            },
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {
                test: /\.(jpe?g|png|gif|svg|xlsx)$/i,
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]',
                }
            }
        ]
    },
    mode:'development',
    plugins :
        [
            new HtmlWebpackPlugin ({template : 'app/public/asset/index.html'})
        ]



}
