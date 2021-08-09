import React from 'react';
import {Avatar, Box, Icon, IconButton, makeStyles, Menu, MenuItem, SvgIcon, Typography} from "@material-ui/core";
import classNames from "classnames";

import Time from "./Time";
import {ReactComponent as ReadIcon} from "../assets/img/read.svg"
import {ReactComponent as UnreadIcon} from "../assets/img/unread.svg"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MessageAudio from "./MessageAudio";
import {IFile} from "../models/IFile";
import reactStringReplace from 'react-string-replace'
import {Emoji} from 'emoji-mart'

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px"
    },
    rootIsME: {
        alignItems: "flex-end"
    },
    box: {
        position: "relative",
        display: "flex",
        marginBottom: "8px",
        alignItems: "center"
    },
    avatar: {
    },
    message: {
        marginLeft: "13px",
        maxWidth: "400px",
        background: "#3674FF",
        padding: "15px",
        fontSize: "14px",
        borderRadius: "12px 12px 12px 0px",
        color: "#fff",
        letterSpacing: "1px",
        boxShadow: "0px 5px 5px rgba(54, 116, 255, 0.196733)",
    },
    messageIsMe: {
        border: "1px solid #ECECEC",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.0220444)",
        borderRadius: "12px 12px 0px 12px",
        marginLeft: 0,
        marginRight: "13px",
        order: -1,
        background: "#fff",
        color: "#202020  "
    },
    visitDate: {
        paddingLeft: "56px",
        opacity: 0.4,
        fontSize: "12px"
    },
    visitDateIsMe: {
        paddingLeft: 0,
        paddingRight: "56px",
    },
    icon: {
        position: "absolute",
        bottom: "-15px",
        left: "-20px"
    },
    iconButton: {
        position: "absolute",
        left: "-48px",
        opacity: 0.5
    },
    attachments: {
        display: "flex",
        alignItems: "center",
        order: -1
    }
}))

interface MessageProps {
    id?: string
    text?: string
    date?: Date
    isMe: boolean
    read?: boolean
    isTyping?: boolean
    avatar: string,
    handleDeleteMessage?: (messageId: string) => void,
    attachments?: IFile[]
}

const Message: React.FC<MessageProps> =
    ({
         id,
         text,
         date,
         isMe,
         read,
         isTyping,
         avatar,
         handleDeleteMessage,
         attachments
     }) => {

        const classes = useStyle()
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const onDeleteMessage = () => {
            handleClose()
            handleDeleteMessage!(id!)
        }

        console.log(attachments)

        return (
            <Box className={classNames(classes.root, {[classes.rootIsME]: isMe})}>
                <Box className={classes.box}>
                    <Avatar className={classes.avatar} src={avatar}/>
                    {(text || isTyping) && <Typography
                        className={classNames(classes.message, {[classes.messageIsMe]: isMe})}
                    >
                        {reactStringReplace(text, /:(.+?):/g, match => (
                            <Emoji key={match} emoji={match} size={16}/>
                        )) ?? "печатает..."}
                    </Typography>}
                    {isMe && (read ? <SvgIcon className={classes.icon} component={ReadIcon}/> :
                        <SvgIcon className={classes.icon} component={UnreadIcon}/>)}
                    <Box className={classes.attachments}>
                        {attachments?.length !== 0 &&
                        <MessageAudio
                            url={attachments![0].url}
                            duration={attachments![0].duration}
                        />}
                    </Box>
                    {isMe &&
                    <>
                        <IconButton
                            className={classes.iconButton}
                            onClick={handleClick}
                        >
                            <MoreHorizIcon/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={onDeleteMessage}>Удалить сообщение</MenuItem>
                        </Menu>
                    </>
                    }
                </Box>
                <Typography
                    className={classNames(classes.visitDate, {[classes.visitDateIsMe]: isMe})}
                >
                    {date && <Time date={date}/>}
                </Typography>
            </Box>
        );
    };

export default Message;