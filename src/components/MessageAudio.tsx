import React, {FC, MouseEventHandler, RefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Box, darken, duration, IconButton, lighten, makeStyles, Typography} from "@material-ui/core";
import PauseIcon from '@material-ui/icons/Pause';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import wave from "../assets/img/wave.png"
import classNames from "classnames";
import Wave from "./Wave";
import axios from "axios";

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
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const MessageAudio: FC<MessageAudioProp> = ({url, duration, isLoading, setIsLoading}) => {
    const classes = useStyle()
    const refAudio = useRef<HTMLAudioElement | null>(null);
    const [isPlay, setIsPlay] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const refDiv = useRef<HTMLDivElement | null>(null)
    const refSvg: RefObject<SVGSVGElement> = useRef<SVGSVGElement>(null)
    const buckets: RefObject<number[]> = useRef([])
    const date = new Date(0)

    date.setSeconds(Math.floor(currentTime))

    useEffect(() => {
        refAudio.current!.ontimeupdate = (e) => {
            setCurrentTime(refAudio.current!.currentTime)
        }

        refAudio.current!.onended = () => {
            setCurrentTime(duration)
        }
    }, [isLoading]);

    useEffect(() => {
        const audioContext = new AudioContext()

        const f = async () => {
            const audioData: ArrayBuffer = (await axios(url, {responseType: "arraybuffer"})).data
            const audioBuffer = await audioContext.decodeAudioData(audioData)
            const nowBuffering = audioBuffer.getChannelData(0)

            const COUNT_OF_LINE = 50;

            let bucketDataSize = Math.floor(nowBuffering.length / COUNT_OF_LINE);

            for (let i = 0; i < COUNT_OF_LINE; i++) {
                const startingPoint = i * bucketDataSize;
                const endingPoint = i * bucketDataSize + bucketDataSize;
                const size = Math.abs(Math.max(...Array.from(nowBuffering.slice(startingPoint, endingPoint))));
                buckets.current!.push(size / 2);
            }

            setIsLoading(false)
        }

        f()
    }, [])

    useEffect(() => {
        if (isLoading) return

        const SPACE_BETWEEN_BARS = 0.5;

        refSvg.current!.innerHTML = buckets.current!.map((bucket, i) => {
            const bucketSVGWidth = 100.0 / buckets.current!.length;
            const bucketSVGHeight = bucket * 100.0;

            return `<rect
                            x=${bucketSVGWidth * i + SPACE_BETWEEN_BARS / 2.0}
                            y=${(100 - bucketSVGHeight) / 2.0}
                            width=${bucketSVGWidth - SPACE_BETWEEN_BARS}
                            height=${bucketSVGHeight} />`;
        }).join('');

    }, [isLoading])

    useEffect(() => {
        if (isPlay) {
            let requestId: number = 0;

            const f = () => {
                refDiv.current!.style.width = +refAudio.current!.currentTime.toFixed(2) * 100 / duration + "%"
                if (parseFloat(refDiv.current!.style.width) < 100)
                    requestId = requestAnimationFrame(f)
                else {
                    refDiv.current!.style.width = "100%"
                    setCurrentTime(duration)
                    setIsPlay(false)
                }
            }

            requestAnimationFrame(f)
            return () => cancelAnimationFrame(requestId)
        }
    }, [isPlay])

    const handlePlay = (): void => {
        refAudio.current?.play()
        setIsPlay(true)
    }

    const handlePause = (): void => {
        refAudio.current?.pause()
        setIsPlay(false)
    }

    const handleRewind = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svgElement: SVGSVGElement = (e.target as HTMLElement).closest("svg")!
        const coords: DOMRect = svgElement.getBoundingClientRect()
        refAudio.current!.currentTime = duration / coords.width * (e.pageX - coords.left)
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
            <Wave
                refSvg={refSvg}
                handleRewind={handleRewind}
            />
            <Typography className={classes.duration}>
                {date.toISOString().slice(14, 19)}
            </Typography>
            <audio ref={refAudio} src={url}/>
            <div
                className={classes.progress}
                ref={refDiv}
            />
        </Box>
    )

}


export default MessageAudio;