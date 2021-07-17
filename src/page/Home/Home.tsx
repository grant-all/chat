import React, {useEffect} from 'react';
import {Box, makeStyles} from '@material-ui/core'
import _ from 'lodash'

import Sidebar from "../../components/Sidebar";
import Dialog from "../../components/Dialog";
import useActions from "../../hooks/useActions";
import CheckEmailInfo from "../../components/CheckEmailInfo";
import useTypedSelector from "../../hooks/useTypedSelector";
import {useLocation} from "react-router-dom";
import {IUser} from "../../models/IUser";
import {IDialog} from "../../models/IDialog";
import socket from "../../socket";


const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100%"
    }
}))

const Home = () => {
    const classes = useStyle()
    const {fetchDialogs, fetchLogoutUser, setCurrentDialog} = useActions()
    const user = useTypedSelector<IUser>(({user}) => user.user)
    const isActivated = useTypedSelector<boolean>(({user}) => user.user.isActivated)
    const currentDialog = useTypedSelector<IDialog>(({dialog}) => _.find(dialog.items, {_id: dialog.currentDialogId})!)
    const location = useLocation()

    useEffect(() => {
        fetchDialogs()
    }, [])

    useEffect(() => {
        const dialogId: string | undefined = location.pathname.split("dialogs/")[1]

        if(!dialogId) return

        setCurrentDialog(dialogId)
    }, [location.pathname])

    return (
        isActivated ?
            (
                <Box className={classes.root}>
                <button onClick={() => fetchLogoutUser()}>dsadsa</button>
                <Sidebar
                    user={user}
                />
                <Dialog
                    currentDialog={currentDialog}
                    user={user}
                />
            </Box>
            )
            : <CheckEmailInfo isActivated={isActivated}/>
    )
};

export default Home;