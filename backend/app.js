const app = require('express')();

//creating a server from http module on app
const server = require('http').createServer(app);

//now creating a connection with options
const io = require('socket.io')(server , {
    cors: {
      origin: "*",
    //   allowedHeaders: ["my-custom-header"],
    //   credentials: true
     }
});

//we have just right now enabled the connection but this is npt enough you need to listen to certain events to pass on the certain information that you want
io.on('connection',(socket) =>{
  console.log("what is socket", socket);
  console.log("socket has got the info");

  //events triggered by the client 
  socket.on('chat',(payload)=>{ 
    console.log('payload', payload);
    //we also need to respond to this event 
    io.emit('chat',payload);
  });
})


server.listen(4000,()=>{
   console.log("server is running on port 4000");
});