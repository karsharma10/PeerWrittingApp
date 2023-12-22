const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect('mongodb://127.0.0.1/my_database');

const io = require('socket.io')(3001, { //pass the port you want to run it on
    cors: {
        origin: "http://localhost:3000",  //where we are want to receive, so we want to use cors for frontend and backend
        methods: ["GET", "POST"] //what methods we want it to use.
    }
})
const defaultVal = ''
io.on("connection",  socket =>{
    socket.on("get-document", async documentId =>{
        const document = await findOrCreate(documentId)
        socket.join(documentId)
        socket.emit("load-document", document.data)
        socket.on("send-changes", delta =>{
            socket.broadcast.to(documentId).emit("receive-changes", delta) //on this socket, broadcast to everyone else that there are changes being made except for us.
        })
        socket.on("save-document", async data =>{
            await Document.findByIdAndUpdate(documentId,{data})
        })

    })

    console.log("connected")
}) //everytime our io connect it will run this connection

//we want to either find the document in the database, or just create a new one:
async function findOrCreate(id){
    if(id == null) return null

    const document = await Document.findById(id)
    if(document) return document
    return await Document.create({_id: id, data: defaultVal})
}