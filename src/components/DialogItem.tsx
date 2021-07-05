import React from 'react';
import {Badge, Box, makeStyles, Typography} from "@material-ui/core";
import CustomAvatar from "./CustomAvatar";
import {IMessage} from "../models/IMessage";
import {IUser} from "../models/IUser";
import {format, isToday, isYesterday} from 'date-fns'
import {Link} from 'react-router-dom'

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
        opacity: "0.4",
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
    }
}))

interface DialogItemProps {
    id: string
    partner: IUser,
    lastMessage: IMessage,
    date: Date,
    countUnread: number
}

const getMessageTime = (date: Date) => {
    console.log(date)
    if (isToday(new Date(date)) || isYesterday(new Date(date))) {
        return format(new Date(date), "HH:mm")
    }

    return format(new Date(date), "dd.MM.YYYY")
}

const DialogItem: React.FC<DialogItemProps> = ({id, partner, lastMessage, date, countUnread}) => {
    const classes = useStyle()

    return (
        <Link to={`/dialogs/${id}`}>
            <Box className={classes.root}>
                <Box className={classes.avatar}>
                    <CustomAvatar/>
                    <Box className={classes.box}>
                        <Typography className={classes.name}>{partner.name}</Typography>
                        <Typography className={classes.lastMessage}>{lastMessage.text}</Typography>
                    </Box>
                </Box>
                <Typography
                    className={classes.dateMessage}
                    variant={"subtitle2"}
                >
                    {getMessageTime(date)}
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