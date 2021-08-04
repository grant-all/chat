import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Box, IconButton, makeStyles} from "@material-ui/core";
import {BaseEmoji, Picker} from "emoji-mart";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import CustomInput from "./CustomInput";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import classNames from "classnames";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import {AxiosResponse} from "axios";
import {IFile} from "../models/IFile";
import fileApi from "../utils/api/file";
import {AppThunk} from "../redux/store";
import {MessageActions} from "../redux/types/message";
import {DialogActions} from "../redux/types/dialog";

const useStyle = makeStyles(theme => ({
    form: {
        position: "relative",
        display: "flex",
        alignItems: "center"
    },
    iconBox: {
        display: "flex"
    },
    sendIconButton: {
        left: "-50%"
    },
    emojiBox: {
        position: "absolute",
        bottom: "56px",
        width: "230px"
    },
    icon: {
        transition: "all 0.5s",
        opacity: "1"
    },
    hiddenIcon: {
        opacity: "0",
        zIndex: -1
    },
    img: {
        width: "16px",
        height: "16px",
        marginRight: "2px",
        pointerEvents: "none"
    }
}))

interface FormSendMessageProps {
    handleSubmit: (e: SyntheticEvent) => void,
    fetchSendMessage:( text: string, attachments?: string[]) => AppThunk<MessageActions | DialogActions>
    refDiv: React.RefObject<HTMLDivElement>;
}

const FormSendMessage: FC<FormSendMessageProps> = ({handleSubmit, fetchSendMessage, refDiv}) => {
    const classes = useStyle()
    const [value, setValue] = useState<string>("")
    const [isRecord, setIsRecord] = useState<boolean>(false)
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const emojiRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const range = new Range()

    useEffect(() => {
        document.body.addEventListener("click", (event: MouseEvent) => {
            if (!event.composedPath().includes(emojiRef.current as Node))
                setVisiblePopup(false)
        })
    }, [])

    const handleStopRecord = () => {
        mediaRecorder?.stop()
        setIsRecord(false)
    }

    const toggleVisiblePopup = (): void => {
        setVisiblePopup(!visiblePopup);
    };

    const handleRecord = async () => {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
            const recorder: MediaRecorder = new MediaRecorder(stream)
            setMediaRecorder(recorder)
            setIsRecord(true)
            recorder.start()

            recorder.ondataavailable = async e => {
                const file: File = new File([e.data], "audio.webm")
                const fileReader: FileReader = new FileReader()
                fileReader.readAsDataURL(file)

                fileReader.onload = async () => {
                    const response: AxiosResponse<IFile> = await fileApi.upload(fileReader.result as string)
                    console.log(response)
                    fetchSendMessage("", [response.data._id])
                };

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleInput = (e: ChangeEvent<HTMLDivElement>): void => {
        setValue(refDiv.current!.innerHTML)
        //socket?.emit("dialog:typing")
    }

    const handleClickEmoji = (emoji: BaseEmoji, event: React.MouseEvent<HTMLElement>) => {
        const img = document.createElement("img")
        const innerHTML = refDiv.current?.innerHTML!
        img.setAttribute("src", `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-64/${emoji.unified}.png`)
        img.setAttribute("alt", emoji.colons)
        img.classList.add(classes.img)
        range.setStart(document.getSelection()?.focusNode ?? refDiv.current!, !innerHTML ? 0 : document.getSelection()?.focusOffset!)
        range.setEnd(document.getSelection()?.focusNode ?? refDiv.current!, !innerHTML ? 0 : document.getSelection()?.focusOffset!)
        range.insertNode(img)
        range.setStartAfter(img)
        document.getSelection()?.removeAllRanges()
        document.getSelection()?.addRange(range)
        setValue(refDiv.current!.innerHTML!)
    }

    return (
        <form
            className={classes.form}
            onSubmit={handleSubmit}
        >
            <div ref={emojiRef}>
                {
                    visiblePopup &&
                    <Box className={classes.emojiBox}>
                        <Picker
                            style={{width: "100%"}}
                            onClick={handleClickEmoji}
                            showPreview={false}
                            showSkinTones={false}
                        />
                    </Box>
                }
                <IconButton onClick={toggleVisiblePopup}>
                    <SentimentVerySatisfiedIcon
                        fontSize={"large"}
                    />
                </IconButton>
            </div>
            <CustomInput
                refDiv={refDiv}
                handleInput={handleInput}
            />
            <IconButton>
                <PhotoCameraIcon fontSize={"large"}/>
            </IconButton>
            <Box className={classes.iconBox}>
                <IconButton
                    className={classNames(classes.icon, {[classes.hiddenIcon]: value})}
                    onClick={isRecord ? handleStopRecord : handleRecord}
                >
                    {isRecord ?
                        <FiberManualRecordIcon
                            fontSize={"large"}
                        /> :
                        <MicIcon
                            fontSize={"large"}
                        />}
                </IconButton>
                <IconButton
                    className={classNames([classes.icon, classes.sendIconButton], {[classes.hiddenIcon]: !value})}
                    type={"submit"}
                >
                    <SendIcon fontSize={"large"}/>
                </IconButton>
            </Box>
        </form>
    );
};

export default FormSendMessage;