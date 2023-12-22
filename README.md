# PeerWrittingApp

## Details:
Created a writing application that allows more than two users with the same link to edit a particular document in real-time and also save changes automatically to a NoSQL database. It automatically creates a new document when you log onto the server with a unique ID. That link can be sent to others to view the same document and edit it as well. Since it is saved to a database, all the changes are saved even when the page refreshes. 

This project utilizes a server and client feature, where all the backend code is in the server and the frontend is in the client portion, both are communicating with cors. 

## Tech Stack:
Fronend:
 - Reactjs

Backend:
- Nodejs
- Express
- Socket.io
- MongoDB (NoSQL Database)
- cors (to connect client and server)
