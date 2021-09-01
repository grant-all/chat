import React, {ChangeEvent, FC, ReactNode, SyntheticEvent, useEffect, useRef, useState} from 'react';
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
import {Socket} from "socket.io-client";
import Attachments from "./Attachments";
import {ALERT_FILE_LIMIT_EXCEEDED, SetAlertPayload} from "../redux/types/alert";
import EmojiPicker from "./EmojiPicker";
import {log} from "util";

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
    },
    input: {
        display: "none"
    },
    attachments: {
        display: "flex",
        alignItems: "center"
    }
}))

interface FormSendMessageProps {
    fetchSendMessage: (text: string, attachments?: string[]) => AppThunk<MessageActions | DialogActions>
    refDiv: React.RefObject<HTMLDivElement>;
    socket: Socket | null,
    setAlert: ({text, severity}: SetAlertPayload) => void
}

const FormSendMessage: FC<FormSendMessageProps> = ({fetchSendMessage, refDiv, socket, setAlert}) => {
    const classes = useStyle()
    const [value, setValue] = useState<string>("")
    const [isRecord, setIsRecord] = useState<boolean>(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const [attachments, setAttachments] = useState<File[]>([])
    const emojiRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const refInputFile: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    let range: Range = new Range();
    const array: number[] = []
    const urls = React.useMemo(
        () => attachments?.map(item => URL.createObjectURL(item)),
        []
    )

    const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault()

        const text: string = refDiv.current?.innerHTML.replace(/<img .+? alt="(.+?)".+?>/g, (match, p1) => p1)!
        let files: AxiosResponse<IFile>[] | null = null

        if (attachments.length > 0)
            files = await Promise.all(attachments.map(item => fileApi.upload(item)))

        fetchSendMessage(text, files?.map(item => item.data._id));

        refDiv.current!.innerText = ""
        setAttachments([])
        urls.forEach(item => URL.revokeObjectURL(item))
        urls.splice(0)
    }

    const handleStopRecord = () => {
        console.log("Stop record")
        mediaRecorder?.stop()
        setIsRecord(false)
    }

    const handleRecord = async (): Promise<void> => {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
            const recorder: MediaRecorder = new MediaRecorder(stream)
            setMediaRecorder(recorder)
            setIsRecord(true)
            recorder.start()

            recorder.ondataavailable = async e => {
                // const file: File = new File([e.data], "audio.mp4")
                // const fileReader: FileReader = new FileReader()
                // fileReader.readAsDataURL(file)
                //
                // fileReader.onload = async () => {
                //     const response: AxiosResponse<IFile> = await fileApi.upload(fileReader.result as string)
                //     fetchSendMessage("", [response.data._id])
                // };

                const file: File = new File([e.data], "audio.mp4")
                const response: AxiosResponse<IFile> = await fileApi.upload(file)
                fetchSendMessage("", [response.data._id])
            }

            recorder.onstop = () => stream.getTracks()[0].stop()

        } catch (e) {
            console.log(e)
        }
    }

    const handleInput = (e: ChangeEvent<HTMLDivElement>): void => {
        setValue(refDiv.current!.innerHTML)
        socket?.emit("dialog:typing")
    }

    const handleClickEmoji = (emoji: BaseEmoji): void => {
        const img = document.createElement("img")
        img.setAttribute("src", `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-64/${emoji.unified}.png`)
        img.setAttribute("alt", emoji.colons)
        img.classList.add(classes.img)

        if(document.getSelection()?.anchorNode === refDiv.current!) {
            range!.setStart(refDiv.current!, document.getSelection()?.focusOffset!)
        }
        else {
            const lastChild = refDiv.current?.lastChild
            lastChild ? range.setStartAfter(lastChild!) : range.setStart(refDiv.current!, 0)
        }

        document.getSelection()?.removeAllRanges()
        document.getSelection()?.addRange(range)

        range.insertNode(img)
        range.setStartAfter(img)

        setValue(refDiv.current!.innerHTML!)
    }

    const handleAttachFile = (): void => {
        refInputFile.current?.click()
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e?.target.files?.length! + attachments.length > 5) return setAlert({
            text: ALERT_FILE_LIMIT_EXCEEDED,
            severity: "warning"
        })

        const files = Array.from(e.target.files!)
        urls.push(...files.map(item => URL.createObjectURL(item)))
        setAttachments(prevState => [...prevState, ...files])
        e.target.value = ""
    }

    const handleRemoveFileCard = React.useCallback((index: number): void => {
        URL.revokeObjectURL(urls[index])
        urls.splice(index, 1)
        setAttachments(prevState => prevState.filter((item, i) => index !== i))
    }, [])

    return (
        <>
            <Attachments
                urls={urls}
                handleRemoveFileCard={handleRemoveFileCard}
            />
            <form
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <EmojiPicker emojiRef={emojiRef} handleClickEmoji={handleClickEmoji}/>
                <CustomInput
                    refDiv={refDiv}
                    handleInput={handleInput}
                />
                <input
                    className={classes.input}
                    onChange={handleChangeInput}
                    ref={refInputFile}
                    type={"file"}
                    accept={"image/*, video/*"}
                    multiple
                />
                <IconButton>
                    <PhotoCameraIcon
                        onClick={handleAttachFile}
                        fontSize={"large"}
                    />
                </IconButton>
                <Box className={classes.iconBox}>
                    <IconButton
                        className={classNames(classes.icon, {[classes.hiddenIcon]: value || attachments.length})}
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
                        className={classNames([classes.icon, classes.sendIconButton], {[classes.hiddenIcon]: !value && !attachments.length})}
                        type={"submit"}
                    >
                        <SendIcon fontSize={"large"}/>
                    </IconButton>
                </Box>
            </form>
        </>
    );
};

export default FormSendMessage;