import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, IconButton, makeStyles} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FormCreateDialog from "./FormCreateDialog";
import useActions from "../hooks/useActions";

const CreateDialog = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const {fetchCreateDialog} = useActions()

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleCreateDialog = (partnerId: string): void => {
        fetchCreateDialog(partnerId, "Hello!")
        setOpen(false)
    }

    return (
        <Box>
            <IconButton
                onClick={handleClickOpen}
            >
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Создание диалога</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите имя пользователя для создания диалога
                    </DialogContentText>
                    <FormCreateDialog handleCreateDialog={handleCreateDialog}/>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default CreateDialog