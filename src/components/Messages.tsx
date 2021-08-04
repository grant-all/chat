import React, {FC, useEffect, useState} from 'react';
import {Box, Container, IconButton, makeStyles, TextField} from "@material-ui/core";


import Message from './Message'
import {IMessage} from "../models/IMessage";
import {IUser} from "../models/IUser";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100%",
        padding: "29px 35px 37px 35px",
        overflowY: "auto"
    },
    messages: {
        marginBottom: "30px"
    }
}))

interface MessagesProps {
    user: IUser,
    items: IMessage[],
    isTyping: boolean,
    partner: IUser,
    handleDeleteMessage: (messageId: string) => void
}

const Messages: FC<MessagesProps> = ({user, items,  partner, isTyping, handleDeleteMessage}) => {
    const classes = useStyle()

    return (
        <Box className={classes.root}>
            <Container>
                <Box className={classes.messages}>
                    {items?.map((messageObj: IMessage) => (
                        <Message
                            key={messageObj._id}
                            id={messageObj._id}
                            isMe={user._id === messageObj.user._id}
                            text={messageObj.text}
                            date={messageObj.createdAt}
                            read={messageObj.read}
                            avatar={user._id === messageObj.user._id ? user.avatar :partner.avatar}
                            handleDeleteMessage={handleDeleteMessage}
                            attachments={messageObj.attachments}
                        />
                    ))}
                    {isTyping && <Message
                        isTyping={isTyping}
                        isMe={false}
                        avatar={user.avatar}
                    />}
                </Box>
            </Container>
        </Box>

    );
};

export default Messages;