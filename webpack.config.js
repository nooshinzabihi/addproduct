
    const path = require('path');

    module.exports ={
        entry : [
            './src/index.js',
            './src/function.js',
            './src/edit-product.js'

        ],
        output :{
            path : path.resolve(__dirname , 'public/scripts'),
            filename: "web.js"
        },
        module :{
            rules :[{
                test: /\.js$/,
                exclude: /node_modules/,
                use :{
                    loader : 'babel-loader',
                    options :{
                        presets :['env']
                    }
                }
            }
            ]
        },
        devServer: {
            contentBase : path.resolve(__dirname , 'public'),
            publicPath : '/scripts/'
        }
    }