import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState("");
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");

    const myVideo = useRef();
    const callerVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        //getting a request to access a audio and video
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on("me", (id) => { setMe(id) })
        //getting the call details
        socket.on("calluser", ({ signal, from, name: callerName }) => {
            setCall({ isRecievedCall: true, signal, from, name: callerName })
        })

    }, [])

    const answerCall = () => {

        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream })
        //once we recieve the signal, we will try to get required data about that signal, use socket to eastablish video connection
        peer.on("signal", (data) => {
            socket.emit("answercall", { signal: data, to: call.from })
        })

        //we will get the video stream using useref after succesfully getting signal
        peer.on("stream", (currentStream) => {
            //poping the caller video
            callerVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;

    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on("signal", (data) => {
            socket.emit("calluser", { userToCall: id, signalData: data, from: me, name })
        })

        //we will get the video stream using useref after succesfully getting signal
        peer.on("stream", (currentStream) => {
            //poping the caller video
            callerVideo.current.srcObject = currentStream;
        })

        socket.on("callacepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;


    }

    const leaveCall = () => {
        setCallEnded(true);
        //destroy connection between user and caller
        connectionRef.current.destroy();
        //reloading the page will provide new id to us
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
            stream,
            name,
            setName,
            callAccepted,
            myVideo,
            callerVideo,
            connectionRef,
            callEnded,
            me,
            callUser,
            answerCall,
            leaveCall
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };
