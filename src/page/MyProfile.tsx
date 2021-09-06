import React from 'react';
import {Avatar, Box, makeStyles, Typography} from "@material-ui/core";
import useTypedSelector from "../hooks/useTypedSelector";
import {IUser} from "../models/IUser";

const useStyles = makeStyles(({
    root: {

    },
    avatar: {
        cursor: "pointer"
    }
}))

const MyProfile = () => {
    const classes = useStyles()
    const user = useTypedSelector<IUser>(({user}) => user.user)

    console.log(user)

    return (
        <Box className={classes.root}>
            <Avatar className={classes.avatar} alt={user.name} src={user.avatar}/>
            <Typography>{user.name}</Typography>
            <Typography variant={"subtitle1"}>{user._id}</Typography>
        </Box>
    );
};

export default MyProfile;