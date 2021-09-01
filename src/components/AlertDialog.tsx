import React, {FC} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AlertDialogState} from "../redux/types/alertDialog";
import useTypedSelector from "../hooks/useTypedSelector";

interface AlertDialogProps {
    handleClose: () => void
}

const AlertDialog: FC<AlertDialogProps> = ({handleClose}) => {
    const {open, title, text, handleAgree, data}: AlertDialogState = useTypedSelector<AlertDialogState>(({alertDialog}) => alertDialog)

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