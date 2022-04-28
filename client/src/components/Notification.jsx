import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'

const Notification = () => {
  const { call, callAccepted, answerCall } = useContext(SocketContext);
  console.log(call)
  console.log(callAccepted)
  return (
    <div>
      <h3 className='font-bold text-lg'>Notification</h3>
      {
        !callAccepted && call.isRecievedCall && <div>
          <p><span className='text-red-500'>{call.name}</span> is calling</p>
          <button onClick={answerCall} className="bg-green-500 p-2 rounded-md">Answer Call</button>
        </div>
      }



    </div>
  )
}

export default Notification