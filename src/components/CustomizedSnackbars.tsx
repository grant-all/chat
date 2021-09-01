import React, {FC} from 'react';
import {Snackbar} from "@material-ui/core";
import {Alert, Color} from "@material-ui/lab";
import {AlertState} from "../redux/types/alert";
import useTypedSelector from "../hooks/useTypedSelector";

interface CustomizedSnackbarsProps {
    handleClose: () => void
}

const CustomizedSnackbars: FC<CustomizedSnackbarsProps> = ({handleClose}) => {
    const {open, text, severity}: AlertState = useTypedSelector<AlertState>(({alert}) => alert)

    const onClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        handleClose();
    };

    return (
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default CustomizedSnackbars;