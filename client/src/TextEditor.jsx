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