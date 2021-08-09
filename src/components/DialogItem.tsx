import React from 'react';
import {Badge, Box, makeStyles, Typography} from "@material-ui/core";
import CustomAvatar from "./CustomAvatar";
import {IMessage} from "../models/IMessage";
import {IUser} from "../models/IUser";
import {format, isToday, isYesterday} from 'date-fns'
import {Link} from 'react-router-dom'
import reactStringReplace from "react-string-replace";
import {Emoji} from "emoji-mart";
import classNames from "classnames";

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        padding: "13px 20px",
        color: "#202020",
        cursor: "pointer",
        fontSize: "14px",
        "& p": {
            fontSize: "inherit"
        },
        "&:hover": {
            backgroundColor: "#F3F7FF"
        }
    },
    selected: {
        backgroundColor: "#F3F7FF"
    },
    avatar: {
        display: "flex",
        alignItems: "center"
    },
    box: {
        marginLeft: "11px"
    },
    name: {
        fontWeight: 600
    },
    lastMessage: {
        whiteSpace: "nowrap",
    },
    dateMessage: {
        position: "absolute",
        top: "7px",
        right: "22px",
        opacity: "0.4"
    },
    badge: {
        position: "absolute",
        bottom: "24px",
        right: "29px",
    },
    link: {
        textDecoration: "none"
    }
}))

const getMessageTime = (date: Date) => {
    if (isToday(new Date(date)) || isYesterday(new Date(date))) {
        return format(new Date(date), "HH:mm")
    }
    console.log("Date" + date)
    return format(new Date(date), "dd.MM.yyyy")
}

interface DialogItemProps {
    id: string
    partner: IUser,
    lastMessage: IMessage,
    countUnread: number,
    selected: boolean
}

const DialogItem: React.FC<DialogItemProps> = ({id, partner, lastMessage, countUnread, selected}) => {
    const classes = useStyle()

    return (
        <Link to={`/dialogs/${id}`} className={classes.link}>
            <Box className={classNames(classes.root, {[classes.selected]: selected})}>
                <Box className={classes.avatar}>
                    <CustomAvatar avatar={partner.avatar} isOnline={partner.isOnline}/>
                    <Box className={classes.box}>
                        <Typography className={classes.name}>{partner.name}</Typography>
                        <Typography className={classes.lastMessage}>
                            {reactStringReplace(lastMessage?.text, /:(.+?):/g, match => (
                                <Emoji key={match} emoji={match} size={16}/>
                            ))}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    className={classes.dateMessage}
                    variant={"subtitle2"}
                >
                    {lastMessage && getMessageTime(lastMessage.createdAt)}
                </Typography>
                {
                    countUnread &&
                    <Badge
                        className={classes.badge}
                        badgeContent={countUnread > 9 ? "+9" : countUnread}
                        color={"secondary"}
                    />
                }
            </Box>
        </Link>
    );
};

export default DialogItem;