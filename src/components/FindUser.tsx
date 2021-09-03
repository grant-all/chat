import React, {FC} from 'react';
import {Avatar, Box, Divider, IconButton, makeStyles, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Add} from "@material-ui/icons";
import useActions from "../hooks/useActions";
import {IUser} from "../models/IUser";
import {AppThunk} from "../redux/store";
import {DialogActions} from "../redux/types/dialog";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inner: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        marginRight: "10px"
    },
    name: {
        fontWeight: 700,
    },
    id: {
        marginTop: "10px",
        paddingLeft: "2px"
    }
}))

interface FindUserProps {
    id: string,
    avatar: string,
    name: string,
    handleCreateDialog: (partner: string, text: string) => void
}

const FindUser: FC<FindUserProps> = ({id, avatar, name, handleCreateDialog}) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box className={classes.box}>
                <Box className={classes.inner}>
                    <Avatar className={classes.avatar} src={avatar}/>
                    <Typography className={classes.name}>{name}</Typography>
                </Box>
                <IconButton onClick={() => handleCreateDialog(id, "Hello!")} color={"primary"}>
                    <Add fontSize={"large"}/>
                </IconButton>
            </Box>
            <Typography className={classes.id} variant={"subtitle2"}>{"id: " + id}</Typography>
            <Divider/>
        </Box>
    );
};

export default FindUser;