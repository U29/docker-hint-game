import express from 'express';
import * as path from 'path'
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

// サーバー側ホットリロード
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');
const devServerEnabled = false;

if (devServerEnabled) {
  config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

// ルート
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Socket.io
io.on('connection', socket => {
  console.log('a user connected ' + socket.id);
  socket.on('hello', message => {
    console.log(message);
  });
});

// サーバー起動
app.listen(process.env.PORT || 3001, function(){
    console.log('express app is started!');
});