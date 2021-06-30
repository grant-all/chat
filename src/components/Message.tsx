import React from 'react';
import {Avatar, Box, makeStyles, Typography} from "@material-ui/core";
import classNames from "classnames";

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
        display: "flex",
        marginBottom: "8px"
    },
    avatar: {
        alignSelf: "flex-end"
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
    }
}))

interface MessageProps {
    isMe?: boolean
}

const Message: React.FC<MessageProps> = ({isMe}) => {
    const classes = useStyle()

    return (
        <Box className={classNames(classes.root, {[classes.rootIsME]: isMe})}>
            <Box className={classes.box}>
                <Avatar className={classes.avatar}/>
                <Typography
                    className={classNames(classes.message, {[classes.messageIsMe]: isMe})}
                >
                    Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻
                </Typography>
            </Box>
            <Typography
                className={classNames(classes.visitDate, {[classes.visitDateIsMe]: isMe})}
            >
                Вчера, в 12:31
            </Typography>
        </Box>
    );
};

export default Message;