/**
 * Created by zaoyu on 2018/1/25.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

config.entry.unshift( "webpack/hot/dev-server","webpack-dev-server/client?http://localhost:3000/");
new WebpackDevServer(webpack(config), {
    contentBase:'../app',
    hot: true,
    inline:true,
    progress:true,
    stats: {color:true},
    historyApiFallback: true
}).listen(3000, 'localhost', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000...');
});
