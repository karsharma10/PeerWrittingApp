import React, {useCallback, useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css" //import quil style sheet
import {io} from "socket.io-client";

export default function TextEditor() {
    const [socket, setSocket] = useState()
    const [quil, setQuil] = useState()
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


    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const createQuil = new Quill(editor, {theme: "snow"})
        setQuil(createQuil)
    }, [])
    return (
        <div className="container" ref={wrapperRef}></div>
    )
}