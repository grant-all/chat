import React, {useEffect, useLayoutEffect} from 'react';
import {Box, makeStyles} from '@material-ui/core'
import Sidebar from "../../components/Sidebar";
import Dialog from "../../components/Dialog";
import useActions from "../../hooks/useActions";
import CheckEmailInfo from "../../components/CheckEmailInfo";
import useTypedSelector from "../../hooks/useTypedSelector";
import {useHistory, useLocation} from "react-router-dom";
import dialog from "../../api/dialogs";

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
    }
}))

const Home = () => {
    const classes = useStyle()
    const {fetchLogoutUser, setCurrentDialogById} = useActions()
    const isActivated = useTypedSelector<boolean>(({user}) => user.user.isActivated)
    const location = useLocation()

    useEffect(() => {
        const dialogId = location.pathname.split("dialogs/")[1]
        setCurrentDialogById(dialogId)
    }, [location.pathname])

    return (
        isActivated ?
            (<Box className={classes.root}>
                <button onClick={() => fetchLogoutUser()}>dsadsa</button>
                <Sidebar/>
                <Dialog/>
            </Box>)
            : <CheckEmailInfo isActivated={isActivated}/>
    )
};

export default Home;