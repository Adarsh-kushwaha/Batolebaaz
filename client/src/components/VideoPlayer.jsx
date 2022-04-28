import React, { useContext } from 'react';
// import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { SocketContext } from '../SocketContext';
import classes from "./VideoPlayer.module.css"

const VideoPlayer = () => {

  const { myVideo, callerVideo, name, call, stream, callAccepted, callEnded } = useContext(SocketContext);
  console.log(callerVideo);
  console.log(myVideo)
  return (

    <div className={classes.container}>
      <div className={classes.video}>
        <video playsInline ref={myVideo} autoPlay style={{ width: "550px", height: "400px" }} />
        <p>{name || 'User Name'}</p>
      </div>

      {callAccepted && (
        <div className={classes.video}>
          <video playsInline ref={callerVideo} autoPlay style={{ width: "550px", height: "400px" }} />
          <p>{call.name || 'Caller Name'}</p>
        </div>
      )}

    </div>

  )
}

export default VideoPlayer