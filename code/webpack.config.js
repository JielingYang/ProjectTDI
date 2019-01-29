module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // Transform all JavaScript files
                exclude: /node_modules/, // Except those under node_modules directory
                loader: 'babel-loader' // Transform using Bable
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[path][name].[ext]',
            //         },
            //     },],
            // }
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './build',
        port: 9000
    }
};
