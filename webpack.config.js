var path = require('path');

module.exports = {
    entry: 'index',
    output: {
        path: 'build/',
        filename: 'index.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.json?$/, loader: 'json'},
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: babelQuery},
            {test: /\.(css|html|appcache)$/, exclude: /node_modules/, loader: 'file?name=[name].[ext]'},
        ]
    },
    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js', '.jsx'],
    },
};

const babelQuery = {
    plugins: [
        ['react-transform', {
            transforms: [
                {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                }
            ]
        }]
    ]
}
