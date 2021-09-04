import React, {FC, useEffect} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import DialogItem from "./DialogItem";
import useActions from "../hooks/useActions";
import useTypedSelector from "../hooks/useTypedSelector";
import {IDialog} from "../models/IDialog";
import dialog from "../utils/api/dialogs";
import {useHistory} from "react-router-dom";
import {IUser} from "../models/IUser";

const useStyle = makeStyles(theme => ({
    root: {}
}))

interface DialogsProps {
    user: IUser,
    currentDialogId: string,
    dialogs: IDialog[]
}

const Dialogs: FC<DialogsProps> = ({user, currentDialogId, dialogs}) => {
    const handleSelectedDialogItem = (dialogId: string): void => {

    }


    return (
        <Box>
            {dialogs.map((dialogObj: IDialog) => (
                <DialogItem
                    key={dialogObj._id}
                    id={dialogObj._id}
                    partner={user._id === dialogObj.author._id ? dialogObj.partner : dialogObj.author}
                    lastMessage={dialogObj.lastMessage}
                    countUnread={dialogObj.countUnread}
                    selected={dialogObj._id === currentDialogId}
                />
            ))}
        </Box>
    );
};

export default Dialogs;