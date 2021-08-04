import React, {useEffect} from 'react';

import useRoute from "./useRoute";
import useActions from "./hooks/useActions";
import useTypedSelector from "./hooks/useTypedSelector";
import {Box, makeStyles} from "@material-ui/core";
import AlertDialog from "./components/AlertDialog";
import {AlertDialogState} from "./redux/types/alertDialog";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100%"
    }
}))

function App() {
    const classes = useStyle()
    const {initializeApp, closeAlertDialog} = useActions()
    const initialized = useTypedSelector<boolean>(({app}) => app.initialized)
    const isAuth = useTypedSelector<boolean>(({user}) => user.isAuth)
    const routes = useRoute(isAuth, initialized)
    const {open, text, title, handleAgree, data}: AlertDialogState = useTypedSelector<AlertDialogState>(({alertDialog}) => alertDialog)

    useEffect(() => {
        initializeApp()
    }, [])

    return (
        <Box className={classes.root}>
            {routes}
            <AlertDialog
                open={open}
                title={title}
                text={text}
                handleAgree={handleAgree}
                handleClose={closeAlertDialog}
                data={data}
            />
        </Box>
    )
}

export default App;
