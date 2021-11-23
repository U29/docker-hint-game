import express from 'express';
import * as path from 'path'
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, function(){
    console.log('express app is started!');
});