import React from 'react';
import {Box, Container, makeStyles} from "@material-ui/core";
import Status from "./Status";
import Messages from "./Messages";

const useStyle = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    messagesBox: {
        padding: "29px 0 37px"
    }
}))

const Dialog = () => {
    const classes = useStyle()

    return (
        <Box className={classes.root}>
            <Status/>
            <Messages/>
        </Box>
    );
};

export default Dialog;