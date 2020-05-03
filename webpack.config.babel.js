import webpack from 'webpack';
import path from 'path';

const { NODE_ENV } = process.env;

const plugins = [
new webpack.DefinePlugin({
'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
}),
];

const filename = `change-nested-param${NODE_ENV === 'production' ? '.min' : ''}.js`;

export default {
mode: NODE_ENV === 'production' ? 'production' : 'development',

module: {
rules: [
{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
],
},

entry: [
'./src/index',
],

optimization: {
minimize: NODE_ENV === 'production',
},

output: {
path: path.join(__dirname, 'dist'),
filename,
library: 'ChangeNestedParam',
libraryTarget: 'umd',
},

plugins,
};