import React, {useEffect} from 'react';

import useRoute from "./useRoute";
import useActions from "./hooks/useActions";
import useTypedSelector from "./hooks/useTypedSelector";
import {Box, makeStyles} from "@material-ui/core";
import AlertDialog from "./components/AlertDialog";
import CustomizedSnackbars from "./components/CustomizedSnackbars";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100%"
    }
}))

function App() {
    const classes = useStyle()
    const {initializeApp, closeAlertDialog, closeAlert} = useActions()
    const initialized = useTypedSelector<boolean>(({app}) => app.initialized)
    const isAuth = useTypedSelector<boolean>(({user}) => user.isAuth)
    const routes = useRoute(isAuth, initialized)

    useEffect(() => {
        initializeApp()
    }, [])

    return (
        <Box className={classes.root}>
            {routes}
            <AlertDialog
                handleClose={closeAlertDialog}
            />
            <CustomizedSnackbars
                handleClose={closeAlert}
                />
        </Box>
    )
}

export default App;
