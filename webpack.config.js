module.exports = {
    entry: [
        "babel-polyfill",
        'whatwg-fetch',
        "./Client/index.js"
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015",
                            ["env", {
                                targets: {
                                    "safari": 10,
                                    "ie": 10
                                    // browsers: ["IE 10"]
                                }
                            }]
                        ],
                        plugins: ["transform-es2015-template-literals"]
                    }
                }
            }
        ]
    }
};