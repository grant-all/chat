import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import DialogItem from "./DialogItem";

const useStyle = makeStyles(theme => ({
    root: {
    }
}))

const Dialogs = () => {
    return (
        <Box>
            <DialogItem />
            <DialogItem />
            <DialogItem />
        </Box>
    );
};

export default Dialogs;