const io = require('socket.io')(3001, { //pass the port you want to run it on
    cors: {
        origin: "http://localhost:3000",  //where we are want to receive, so we want to use cors for frontend and backend
        methods: ["GET", "POST"] //what methods we want it to use.
    }
})

io.on("connection",  socket =>{
    console.log("connected")
}) //everytime our io connect it will run this connection