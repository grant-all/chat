import React from 'react';
import {Box, darken, IconButton, lighten, makeStyles, Typography} from "@material-ui/core";
import PauseIcon from '@material-ui/icons/Pause';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import wave from "../assets/img/wave.png"

const useStyle = makeStyles(theme => ({
    root: {
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "296px",
        height: "63px",
        padding: "18px",
        background: "#3674FF",
        borderRadius: "12px 12px 12px 0px",
        boxSizing: "border-box"
    },
    duration: {
        opacity: 0.5,
        fontSize: "12px"
    },
    iconButton: {
        background: "#0F3997",
        "&:hover": {
            background: darken("#0F3997", 0.2)
        }
    },
    icon: {
        color: "white"
    }
}))

const MessageAudio = () => {
    const classes = useStyle()

    return (
        <Box className={classes.root}>
            <IconButton className={classes.iconButton} size={"small"}>
                <PauseIcon className={classes.icon}/>
            </IconButton>
            <img src={wave}/>
            <Typography className={classes.duration}>00:19</Typography>
        </Box>
    );
};

export default MessageAudio;