module.exports = {
    entry: "./app/routes.js",
    output: {
        filename: "public/js/bundle.js"
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}