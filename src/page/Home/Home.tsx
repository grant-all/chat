import React, {useEffect} from 'react';
import {Box, makeStyles} from '@material-ui/core'
import Sidebar from "../../components/Sidebar";
import Dialog from "../../components/Dialog";
import useActions from "../../hooks/useActions";
import CheckEmailInfo from "../../components/CheckEmailInfo";
import useTypedSelector from "../../hooks/useTypedSelector";

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
    }
}))

const Home = () => {
    const classes = useStyle()
    const {fetchLogoutUser} = useActions()
    const isActivated = useTypedSelector<boolean>(({user}) => user.user.isActivated)

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