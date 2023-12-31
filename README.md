# PeerWrittingApp using React, Socket.io, MongoDB(NoSQL)

## Details:
Created a writing application that allows more than two users with the same link to edit a particular document in real-time and also save changes automatically to a NoSQL database. It automatically creates a new document when you log onto the server with a unique ID. That link can be sent to others to view the same document and edit it as well. Since it is saved to a database, all the changes are saved even when the page refreshes. 

This project utilizes a server and client feature, where all the backend code is in the server and the frontend is in the client portion, both are communicating with cors. 

## Tech Stack:
Fronend:
 - Reactjs
    - React Router
 - Quill

Backend:
- Nodejs
- Express
- Socket.io
- MongoDB (NoSQL Database)
- Mongoose
- cors (to connect client and server)




## Demonstration of the Application:

https://github.com/karsharma10/PeerWrittingApp/assets/64170090/8ebbf5c0-bf6c-406b-97ae-0843f52f3ded


## How to run:
- Firstly, you need to get the client side to run. To do so:
  - cd client
  - npm start
- Secondly, you need to get the server side to run. Please make sure to have MongoDB on your computer. Then:
  -  cd server
  -  npm run devStart
 

