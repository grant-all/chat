import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, darken, duration, IconButton, lighten, makeStyles, Typography} from "@material-ui/core";
import PauseIcon from '@material-ui/icons/Pause';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import wave from "../assets/img/wave.png"
import classNames from "classnames";

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
        boxSizing: "border-box",
        position: "relative",
    },
    duration: {
        opacity: 0.5,
        fontSize: "12px",
        position: "relative",
        zIndex: 1
    },
    iconButton: {
        background: "#0F3997",
        position: "relative",
        zIndex: 1,
        "&:hover": {
            background: darken("#0F3997", 0.2)
        }
    },
    icon: {
        color: "white"
    },
    isPlay: {
        background: "transparent",
    },
    img: {
        position: "relative",
        zIndex: 1
    },
    progress: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "#418FFF",
        borderRadius: "12px 0px 0px 0px",

    }
}))

interface MessageAudioProp {
    url: string;
    duration: number;
}

const MessageAudio:FC<MessageAudioProp> = ({url, duration}) => {
    const classes = useStyle()
    const refAudio = useRef<HTMLAudioElement | null>(null);
    const [isPlay, setIsPlay] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const refDiv = useRef<HTMLDivElement | null>(null)
    const date = new Date(0)
    date.setSeconds(Math.floor(currentTime))


    useEffect(() => {
        refAudio.current!.ontimeupdate = (e) => {
            console.log(refAudio.current!.currentTime * 100 / duration)
            setCurrentTime(refAudio.current!.currentTime)
        }
        refAudio.current!.onended = () => {
            setIsPlay(false)
            setCurrentTime(duration)
        }
    }, []);

    const handlePlay = () => {
        setIsPlay(true)
        setInterval(() => {
            refDiv.current!.style.width = refAudio.current!.currentTime * 100 / duration + "%"
        }, 10)
        refAudio.current?.play()
    }

    const handlePause = () => {
        refAudio.current?.pause()
        setIsPlay(false)
    }

    return (
        <Box className={classes.root}>
            <IconButton
                className={classNames(classes.iconButton, {[classes.isPlay]: !isPlay})}
                size={"small"}
                onClick={isPlay ? handlePause : handlePlay}
            >
                {isPlay ?
                    <PauseIcon className={classes.icon}/> :
                    <PlayCircleFilledIcon className={classes.icon}/>}
            </IconButton>
            <img src={wave} className={classes.img}/>
            <Typography className={classes.duration}>
                {date.toISOString().slice(14, 19)}
            </Typography>
            <audio ref={refAudio} src={url}></audio>
            <div 
                className={classes.progress} 
                //style={{width: currentTime * 100 / duration + "%"}}
                ref={refDiv}
            />
        </Box>
    );
};

export default MessageAudio;