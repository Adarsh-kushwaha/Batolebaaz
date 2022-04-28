import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext'
import CopyToClipboard from "react-copy-to-clipboard";

const Options = ({ children }) => {
    const {  name, setName, me, callAccepted, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [callId, setCallId] = useState("");
    return (
        <div className='flex w-[90%] flex-column justify-center items-center gap-10'>
            <div className='flex flex-row gap-6 items-center'>
                <div>
                    <p>Account Info</p>
                    <input type="text" className="rounded text-pink-500" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <div className='mt-2'>
                        <CopyToClipboard text={me}>
                            <button className='bg-blue-400 p-2 rounded-md'>Click Here to copy</button>
                        </CopyToClipboard>
                    </div>

                </div>
                <div>
                    <p>Make A call</p>
                    <input type="text" className="rounded text-pink-500" placeholder='Caller ID' value={callId} onChange={(e) => setCallId(e.target.value)} />
                    <div className='mt-2'>
                        {
                            callAccepted & !callEnded ? (<button className='bg-blue-400 p-2 rounded-md' onClick={leaveCall} >Hang Up</button>) :
                                (<button className='bg-blue-400 p-2 rounded-md' onClick={() => callUser(callId)}>Call Someone</button>)
                        }
                    </div>
                </div>
            </div>
            {children}
        </div>

    )
}

export default Options