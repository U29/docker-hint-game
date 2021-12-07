import express from 'express';
import * as path from 'path'
const app = express();
import http from 'http';
import socketio from 'socket.io';
const server = http.createServer(app);
const io = new socketio.Server(server);

// クラス読み込み
import Room from './Room';
import Player from './Player'

// ルート
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// roomオブジェクトの配列
const rooms: Array<Room> = [];

// Socket.io
io.on('connection', socket => {
  // 接続確認
  console.log(`${socket.id} is connected`);
  // 切断確認
  socket.on('disconnecting', () => {
    console.log('🔽切断した人の部屋🔽');
    console.dir(socket.rooms, {depth: 3});
    const room = socket.rooms.size > 1 ? getRoom([...socket.rooms][1]) : null;
    console.log(room);
    room?.sessions[room?.currentSessionNum].removePlayer(socket.id);
    room && io.sockets.in(room.roomId).emit('resRoomData', room);
  });
  socket.on('disconnect', () => {
    
    console.log(`${socket.id} is disconnected.`);
  });

  // ルーム作成ボタン押されたとき
  socket.on('createRoom', playerName => {
    console.log(`${socket.id} is Created Room.`);
    const newRoomId = generateRoomId(4);
    const room = new Room(newRoomId, socket.id);
    const player = new Player(socket.id, playerName, true);
    room.getCurrentSession().addPlayer(player);
    rooms.push(room);
    socket.join(room.roomId);
    console.log(`${socket.id} joined Room#${room.roomId}`);
    console.log(room);
    socket.emit('loadRoomPage', room);
    socket.emit('roomData', room);
  });

  // ルーム参加ボタンが押されたとき
  socket.on('joinRoom', data => {
    if (rooms.map(room => room.roomId === data.roomId && room)) {
      console.log(`${socket.id} is Joined Room#${data.roomId}`);
      const room = rooms.find(room => room.roomId === data.roomId && room);
      if (typeof(room) !== 'undefined') {
        const player = new Player(socket.id, data.playerName);
        room.getCurrentSession().addPlayer(player);
        rooms.push(room);
        socket.join(room.roomId);
        console.log(`${socket.id} joined Room#${room.roomId}`);
        console.log(room);
        socket.emit('loadRoomPage', room);
        socket.emit('roomData', room);
      }
    }
  });


  // ルーム情報取得API
  socket.on('reqRoomData', roomId => {
    // ルームに入っているかのチェック（不正防止）
    console.log(roomId);
    console.log(socket.rooms);
    if (socket.rooms.has(roomId)) 
    {
      if (rooms.map(room => room.roomId === roomId && room)) {
        const resRoom = rooms.find(room => room.roomId === roomId && room);
        io.sockets.in(roomId).emit('resRoomData', resRoom);
      }
    }
  });
});

// サーバー起動
const PORT = 3001
server.listen(process.env.PORT || PORT, function(){
    console.log(`${PORT} express app is started!`);
});

/**
 * 任意の桁数のルームID(数字)を生成する関数
 * @param digits ルームIDの桁数
 * @returns ルームIDを返す
 */
 const generateRoomId = (digits: number): string => {
  const numbers = '0123456789';

  let newId = '';
  for (let i = 0, k = numbers.length; i < digits; i++ ) {
      newId += numbers.charAt(Math.floor(k * Math.random()));
  }

  // ルームIDの重複チェック
  if ( typeof(rooms.find( room => room.roomId === newId )) === 'undefined' ) {
      // 重複したルームIDが無い場合
      return newId;
  } else {
      // ルームIDが重複した場合、新たに実行
      return generateRoomId(digits);
  }
}

/**
 * ルームIDからルームオブジェクトを返す関数
 * @param _roomId 検索するルームID
 * @returns ルームオブジェクト
 */
const getRoom = (_roomId: string): Room | null => {
  const _room = rooms.find(room => room.roomId === _roomId);
  if (typeof(_room) !== 'undefined'){
    return _room;
  } else {
    return null;
  }
}