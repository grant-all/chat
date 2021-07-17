import React, {FC} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AlertDialogState, CloseAlertDialog} from "../redux/types/alertDialog";

interface AlertDialogProps extends AlertDialogState {
    handleClose: () => CloseAlertDialog
}

const AlertDialog: FC<AlertDialogProps> = ({open, title, text, handleAgree, handleClose, data}) => {
    const onAgree = () => {
        handleAgree!(data)
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAgree} color="primary">
                    Подтвердить
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog