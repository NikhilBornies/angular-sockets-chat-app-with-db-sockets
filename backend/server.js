const app = require('express')();
const httpServer = require('http').createServer(app);
const con = require("./config");
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', async (message) => {

 
    const sql = "INSERT INTO sms (msg) VALUES (?)";
    const val = await [message];

    await con.query(sql, [val], (err, result) => {
      
   
  });

  
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
    // io.emit('message', `${'nikhil'}: ${message}`);  (to pass static key)

  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));