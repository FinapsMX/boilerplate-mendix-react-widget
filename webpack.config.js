'use strict';

var webpack   = require('webpack'),
    path      = require('path'),
    widget    = require('./package.json').name,
    jsPath    = 'src/widget',
    jsEntry   = widget+'.jsx',
    buildPath = 'build/'+widget+'/widget',
    buildFile = widget+'.js';

var config = {
    target: 'web',
    entry: {
        app: path.join(__dirname, jsPath, jsEntry)
    },
    output: {
        libraryTarget: 'amd',
        path: path.resolve(__dirname, buildPath),
        publicPath: '',
        filename: buildFile
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'eslint-loader']
            }
        ]
    },
    externals: {
        dojoBaseDeclare: "dojo/_base/declare",
        widgetBase: "mxui/widget/_WidgetBase"
    }
};

module.exports = config;
