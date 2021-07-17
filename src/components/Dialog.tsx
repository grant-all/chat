import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Box, Container, IconButton, makeStyles, TextField, Typography} from "@material-ui/core";
import Status from "./Status";
import Messages from "./Messages";
import {IUser} from "../models/IUser";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import useActions from "../hooks/useActions";
import socket from "../socket";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {IDialog} from "../models/IDialog";
import useTypedSelector from "../hooks/useTypedSelector";
import {IMessage} from "../models/IMessage";
import getTypeAlertDialog from "../utils/getTypeAlertDialog";
import {ALERT_DIALOG_DELETE_MESSAGE} from "../redux/types/alertDialog";
import classNames from "classnames";
import 'emoji-mart/css/emoji-mart.css'
import {BaseEmoji, Picker} from 'emoji-mart'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import fileApi from "../utils/api/file"
import {AxiosResponse} from "axios";
import {IFile} from "../models/IFile";

const useStyle = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "37px",
        boxSizing: "border-box"
    },
    messagesBox: {
        //padding: "29px 0 37px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden"
    },
    form: {
        position: "relative",
        display: "flex",
        alignItems: "flex-end"
    },
    textField: {
        marginRight: "5px"
    },
    personAddIcon: {
        fontSize: "7rem"
    },
    text: {
        fontSize: "20px"
    },
    emptyDialog: {
        justifyContent: "center",
        alignItems: "center"
    },
    emojiBox: {
        position: "absolute",
        bottom: "56px",
        width: "230px"
    },
    iconButton: {
        display: "flex"
    },
    icon: {
        transition: "all 0.5s",
        opacity: "1"
    },
    hiddenIcon: {
        opacity: "0",
        zIndex: -1
    },
    contanier: {
        overflowY: "hidden",
        height: "100%"
    },
    iconBox: {
        display: "flex"
    },
    sendIconButton: {
        left: "-50%"
    }
}))

interface DialogProps {
    user: IUser,
    currentDialog: IDialog
}

const Dialog: FC<DialogProps> = ({user, currentDialog}) => {
    const classes = useStyle()
    const [value, setValue] = useState<string>("")
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false)
    const [isRecord, setIsRecord] = useState<boolean>(false)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const {
        fetchMessages,
        fetchSendMessage,
        addMessage,
        fetchDeleteMessage,
        setReadedStatusLastMessages,
        setReadedStatusLastMessage,
        setAlertDialog
    } = useActions()
    const isLoading: boolean = useTypedSelector<boolean>(({message}) => message.isLoading)
    const items: IMessage[] = useTypedSelector<IMessage[]>(({message}) => message.items)
    const emojiRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    let typingTimeoutId: number | null = null

    useEffect(() => {
        document.body.addEventListener("click", (event: MouseEvent) => {
            console.log(emojiRef.current)
            console.log(event.composedPath())
            console.log(event.composedPath().includes(emojiRef.current as Node))
            if (!event.composedPath().includes(emojiRef.current as Node))
                setVisiblePopup(false)
        })
    }, [])

    useEffect(() => {
        socket.on("dialog:typing", toggleIsTyping)
    }, [])

    useEffect(() => {
        if (currentDialog?._id)
            fetchMessages()

        socket.on("message:created", handleAddMessage)
        socket.on("messages:readed", (dialogId: string, userId: string) => {
            if (userId === user._id) return

            setReadedStatusLastMessage(dialogId)
            setReadedStatusLastMessages(dialogId)
        })
        socket.on("message:readed", (dialogId: string) => {
            setReadedStatusLastMessages(dialogId)
        })

        return () => {
            socket.off("message:created")
            socket.off("messages:readed")
            socket.off("message:readed")
        }
    }, [currentDialog?._id])

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const handleAddMessage = (message: IMessage) => {
        if (message.user._id === user._id) return

        if (message.dialog._id === currentDialog?._id) {
            addMessage(message)

            if (message.user._id !== user._id)
                socket.emit("message:read", currentDialog._id)
        }
    }

    const handleDeleteMessage = (messageId: string): void => {
        setAlertDialog({
            ...getTypeAlertDialog(ALERT_DIALOG_DELETE_MESSAGE),
            handleAgree: fetchDeleteMessage,
            data: messageId
        })
    }

    const handleSubmit = (e: SyntheticEvent): void => {
        console.log("Hello")
        e.preventDefault()
        fetchSendMessage(value)
        setValue("")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        socket.emit("dialog:typing")
        setValue(e.target.value)
    }

    const handleClickEmoji = (emoji: BaseEmoji) => {
        setValue(prevState => prevState + emoji.native)
    }

    const toggleIsTyping = () => {
        setIsTyping(true)
        if (typeof typingTimeoutId === "number") {
            clearTimeout(typingTimeoutId)
        }

        typingTimeoutId = window.setTimeout(() => {
            setIsTyping(false)
        }, 2000)
    }

    const handleRecord = async () => {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
            const recorder: MediaRecorder = new MediaRecorder(stream)
            setMediaRecorder(recorder)
            setIsRecord(true)
            recorder.start()

            recorder.ondataavailable = async e => {
                const file: File = new File([e.data], "audio.webm")
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)

                fileReader.onload = async () => {
                    console.log(fileReader.result)
                    const response:AxiosResponse<IFile> = await fileApi.upload(fileReader.result)
                    fetchSendMessage("", response.data._id)
                };

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleStopRecord = () => {
        mediaRecorder?.stop()
        setIsRecord(false)
    }

    return (
        <Box className={classes.root}>
            <Status/>
            <Container className={classes.contanier}>
                <Box className={classNames(classes.messagesBox, {[classes.emptyDialog]: !currentDialog})}>
                    {!isLoading && (!currentDialog?._id ? (
                            <>
                                <PersonAddIcon
                                    className={classes.personAddIcon}
                                    color={"primary"}
                                />
                                <Typography

                                    variant={"h4"}
                                >
                                    Выберите диалог, чтобы начать общение
                                </Typography>
                            </>
                        )
                        :
                        (<>
                            <Messages
                                user={user}
                                items={items}
                                isTyping={isTyping}
                                partner={user?._id === currentDialog?.author?._id ? currentDialog?.partner : currentDialog?.author}
                                handleDeleteMessage={handleDeleteMessage}
                            />
                            <form className={classes.form} onSubmit={handleSubmit}>
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
                                            onClick={toggleVisiblePopup}
                                        />
                                    </IconButton>
                                </div>
                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    multiline
                                    label={"Введите текст сообщения…"}
                                    variant="outlined"
                                    value={value}
                                    onChange={handleChange}
                                />
                                <IconButton>
                                    <PhotoCameraIcon fontSize={"large"}/>
                                </IconButton>
                                <Box className={classes.iconBox}>
                                    <IconButton
                                        className={classNames(classes.icon, {[classes.hiddenIcon]: value})}
                                    >
                                        {isRecord ?
                                            <FiberManualRecordIcon
                                                fontSize={"large"}
                                                onClick={handleStopRecord}
                                            /> :
                                            <MicIcon
                                                fontSize={"large"}
                                                onClick={handleRecord}
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
                        </>))
                    }
                </Box>
            </Container>
        </Box>
    );
};

export default Dialog;