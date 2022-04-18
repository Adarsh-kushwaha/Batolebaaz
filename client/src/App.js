import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notification from './components/Notification';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({

}))

const App = () => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            Batolebaaz
          </Typography>
        </Toolbar>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
    </div>
  )
}

export default App