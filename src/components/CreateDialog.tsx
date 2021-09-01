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

const CreateDialog = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <FormCreateDialog />
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Отмена*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Создать диалог*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </Box>
    );
}

export default CreateDialog