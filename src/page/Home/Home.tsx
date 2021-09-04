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
import {Socket} from "socket.io-client";


const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100%"
    }
}))

const Home = () => {
    const classes = useStyle()
    const {fetchDialogs, fetchLogoutUser, setCurrentDialog, setSocket} = useActions()
    const user:IUser = useTypedSelector<IUser>(({user}) => user.user)
    const isActivated:boolean = useTypedSelector<boolean>(({user}) => user.user.isActivated)
    const currentDialog:IDialog = useTypedSelector<IDialog>(({dialog}) => _.find(dialog.items, {_id: dialog.currentDialogId})!)
    const socket: Socket | null = useTypedSelector<Socket | null>(({socket}) => socket.socket)
    const location = useLocation()
    
    useEffect(() => {
        fetchDialogs()
        setSocket(user._id)
    }, [])

    useEffect(() => {
        const dialogId: string | undefined = location.pathname.split("dialogs/")[1]

        if(!dialogId) return

        setCurrentDialog(dialogId)
    }, [location.pathname])

    const handleLogoutUser = (): void => {
        socket?.disconnect()
        fetchLogoutUser()
    }

    return (
        isActivated ?
            (
                socket && <Box className={classes.root}>
                    <button onClick={handleLogoutUser}>dsadsa</button>
                    <Sidebar
                        user={user}
                    />
                    <Dialog
                        currentDialog={currentDialog}
                        user={user}
                        socket={socket}
                        handleLogoutUser={handleLogoutUser}
                    />
                </Box>
            )
            : <CheckEmailInfo isActivated={isActivated}/>
    )
};

export default Home;