import React, {FC, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Box, Container,  makeStyles, Typography} from "@material-ui/core";
import Status from "./Status";
import Messages from "./Messages";
import {IUser} from "../models/IUser";
import useActions from "../hooks/useActions";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {IDialog} from "../models/IDialog";
import useTypedSelector from "../hooks/useTypedSelector";
import {IMessage} from "../models/IMessage";
import getTypeAlertDialog from "../utils/getTypeAlertDialog";
import {ALERT_DIALOG_DELETE_MESSAGE} from "../redux/types/alertDialog";
import classNames from "classnames";
import 'emoji-mart/css/emoji-mart.css'
import FormSendMessage from "./FormSendMessage";
import {Socket} from "socket.io-client";

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
    iconButton: {
        display: "flex"
    },
    contanier: {
        overflowY: "hidden",
        height: "100%"
    }
}))

interface DialogProps {
    user: IUser,
    currentDialog: IDialog,
    socket: Socket | null,
    handleLogoutUser: () => void
}

const Dialog: FC<DialogProps> = ({user, currentDialog, socket, handleLogoutUser}) => {
    const classes = useStyle()
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const {
        fetchMessages,
        fetchSendMessage,
        addMessage,
        fetchDeleteMessage,
        fetchDeleteDialog,
        setReadedStatusLastMessages,
        setReadedStatusLastMessage,
        setAlertDialog,
        setIsOnline,
        setAlert
    } = useActions()
    const isLoading: boolean = useTypedSelector<boolean>(({message}) => message.isLoading)
    const items: IMessage[] = useTypedSelector<IMessage[]>(({message}) => message.items)
    let typingTimeoutId: number | null = null
    const partner = user?._id === currentDialog?.author?._id ? currentDialog?.partner : currentDialog?.author
    const refDiv: React.RefObject<HTMLDivElement> = useRef(null)

    useEffect(() => {
        socket?.on("dialog:typing", toggleIsTyping)
        socket?.on("user:online", (userId: string) => {
            console.log("onLine")
            setIsOnline(userId, true)
        })
        socket?.on("user:disconnected", (userId: string) => {
            console.log(userId)
            console.log("discontect")
            setIsOnline(userId, false)
        })
    }, [])

    useEffect(() => {
        if (currentDialog?._id)
            fetchMessages()

        socket?.on("message:created", handleAddMessage)
        socket?.on("messages:readed", (dialogId: string, userId: string) => {
            if (userId === user._id) return

            setReadedStatusLastMessage(dialogId)
            setReadedStatusLastMessages(dialogId)
        })
        socket?.on("message:readed", (dialogId: string) => {
            setReadedStatusLastMessages(dialogId)
        })

        return () => {
            socket?.off("message:created")
            socket?.off("messages:readed")
            socket?.off("message:readed")
        }
    }, [currentDialog?._id])

    const handleAddMessage = (message: IMessage) => {
        if (message.user._id === user._id) return

        if (message.dialog._id === currentDialog?._id) {
            addMessage(message)

            if (message.user._id !== user._id)
                socket?.emit("message:read", currentDialog._id)
        }
    }

    const handleDeleteMessage = (messageId: string): void => {
        setAlertDialog({
            ...getTypeAlertDialog(ALERT_DIALOG_DELETE_MESSAGE),
            handleAgree: fetchDeleteMessage,
            data: messageId
        })
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

    return (
        <Box className={classes.root}>
            <Status
                name={partner?.name}
                isOnline={partner?.isOnline}
                handleDeleteDialog={fetchDeleteDialog}
                currentDialog={currentDialog}
                handleLogoutUser={handleLogoutUser}
            />
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
                                partner={partner}
                                handleDeleteMessage={handleDeleteMessage}
                            />
                            <FormSendMessage
                                fetchSendMessage={fetchSendMessage}
                                refDiv={refDiv}
                                socket={socket}
                                setAlert={setAlert}
                            />
                        </>))
                    }
                </Box>
            </Container>
        </Box>
    );
};

export default Dialog;