import React, {useEffect} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import DialogItem from "./DialogItem";
import useActions from "../hooks/useActions";
import useTypedSelector from "../hooks/useTypedSelector";
import {IDialog} from "../models/IDialog";
import dialog from "../api/dialogs";
import {useHistory} from "react-router-dom";

const useStyle = makeStyles(theme => ({
    root: {}
}))

const Dialogs = () => {
    const {fetchDialogs} = useActions()
    const dialogs = useTypedSelector<IDialog[]>(({dialog}) => dialog.items)
    const isLoading = useTypedSelector<boolean>(({dialog}) => dialog.isLoading)

    useEffect(() => {
        fetchDialogs()
    }, [])

    const handleSelectedDialogItem = (dialogId: string): void => {

    }

    return (
        <Box>
            {!isLoading && dialogs.map((dialogObj: IDialog) => (
                <DialogItem
                    key={dialogObj._id}
                    id={dialogObj._id}
                    partner={dialogObj.partner}
                    date={dialogObj.createdAt}
                    lastMessage={dialogObj.lastMessage}
                    countUnread={dialogObj.countUnread}
                />
            ))}
        </Box>
    );
};

export default Dialogs;