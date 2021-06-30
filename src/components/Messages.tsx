import React from 'react';
import {Box, Container, IconButton, makeStyles, TextField} from "@material-ui/core";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import Message from './Message'

const useStyle = makeStyles(theme => ({
    root: {
        padding: "29px 35px 37px 35px"
    },
    messages: {
        marginBottom: "30px"
    },
    inputBox: {
        display: "flex",
        alignItems: "flex-end"
    },
    textField:{
        marginRight: "5px"
    }
}))

const Messages = () => {
    const classes = useStyle()

    return (
        <Box className={classes.root}>
            <Container>
                <Box className={classes.messages}>
                    <Message/>
                    <Message isMe/>
                </Box>
                <Box className={classes.inputBox}>
                    <IconButton>
                        <SentimentVerySatisfiedIcon fontSize={"large"}/>
                    </IconButton>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        multiline
                        label={"Введите текст сообщения…"}
                        variant="outlined"
                    />
                    <IconButton>
                        <PhotoCameraIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton>
                        <MicIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton>
                        <SendIcon fontSize={"large"}/>
                    </IconButton>
                </Box>
            </Container>
        </Box>

    );
};

export default Messages;