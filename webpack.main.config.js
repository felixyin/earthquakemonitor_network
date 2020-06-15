'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

/**
 * assign pollyfill
 * @param  {Object} target
 * @param  {Object} varArgs
 * @return
 */
function assign (target, varArgs) {
    if (typeof Object.assign !== 'function') {
        'use strict'
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object')
        }

        var to = Object(target)

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index]

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey]
                    }
                }
            }
        }
        return to
    } else {
        return Object.assign.apply(Object, arguments)
    }
}

let mainConfig = {
    entry: {
        main: path.join(__dirname, 'app/src/main/index.js')
    },
    externals: Object.keys(assign({}, pkg.dependencies, {'AMap': 'AMap'})),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.node$/,
                loader: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'app/dist')
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.node'],
        modules: [
            path.join(__dirname, 'app/node_modules')
        ]
    },
    target: 'electron-main'
}

module.exports = mainConfig
