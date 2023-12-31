import React, {useCallback, useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css" //import quil style sheet
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";

const SAVE_INTERVAL = 2000
export default function TextEditor() {
    const [socket, setSocket] = useState()
    const [quil, setQuil] = useState()
    const {id: documentId} = useParams()

    useEffect(()=>{
        const urlSocket = io("http://localhost:3001") //this will return a socket, this is the backend URL
        setSocket(urlSocket)
        return() =>{
            urlSocket.disconnect() //when we want to cleanup, we want to disconnect the socket.
        }
    },[])


    //need to take care of when there is a text change on the server:
    useEffect(() => {

        if(socket == null || quil == null) return //if they are empty we don't want to run anything
        const handler = (delta, oldDelta, source) =>{
            if(source !== 'user') return //we don't want to send changes that didn't come from a user
            socket.emit("send-changes",delta)
        }

        quil.on("text-change", handler)
        return()=>{
            quil.off("text-change", handler)
        }
    }, [socket, quil]);


    //now we need to take care of the receiving end

    useEffect(() => {

        if(socket == null || quil == null) return //if they are empty we don't want to run anything
        const handler = (delta) =>{
           quil.updateContents(delta)
        }

        socket.on("receive-changes", handler)
        return()=>{
            socket.off("receive-changes", handler)
        }
    }, [socket, quil]);


   //send the people to the corresponding 'rooms' so we don't have the changes being broadcasted to all documents:
    useEffect(()=>{
        if(socket == null || quil == null) return //if its empty we don't want to do anything

        socket.once("load-document", document=>{
            quil.setContents(document)
            quil.enable()
        })
        socket.emit("get-document", documentId)


    },[socket, quil, documentId])

    useEffect(()=>{
        if(socket == null || quil == null) return //if its empty we don't want to do anything

        const interval = setInterval(()=>{
            socket.emit('save-document', quil.getContents())
        }, SAVE_INTERVAL)

        return()=>{
            clearInterval(interval)
        }


    },[socket,quil])
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const createQuil = new Quill(editor, {theme: "snow"})
        createQuil.disable()
        createQuil.setText('Loading...')
        setQuil(createQuil)
    }, [])
    return (
        <div className="container" ref={wrapperRef}></div>
    )
}