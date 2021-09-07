import React, {FC, useEffect, useState} from 'react';
import {Avatar, Box, IconButton, makeStyles, TextField, Typography} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialogs from "./Dialogs";
import {IUser} from "../models/IUser";
import {IDialog} from "../models/IDialog";
import CreateDialog from "./CreateDialog";
import useTypedSelector from "../hooks/useTypedSelector";
import MyProfile from "./MyProfile";
import {AppThunk} from "../redux/store";
import {UserActions} from "../redux/types/user";
import {UpdateUserRequest} from "../models/request/UpdateUserRequest";
import {fetchUpdateUser} from "../redux/actions/user";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100vh",
        maxWidth: "319px",
        width: "100%",
        borderRight: "1px solid #F7F7F7"
    },
    headerBox: {
        maxHeight: "60px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "21px 17px",
        borderBottom: "1px solid #F7F7F7"
    },
    headerBoxText: {
        display: "flex",
        alignItems: "center",
        opacity: 0.65,
        fontSize: "14px"
    },
    textField: {
        margin: "22px 0 27px",
        padding: "0 17px",
        display: "flex"
    },
    peopleIcon: {
        marginRight: "7px"
    }
}))

interface SidebarProps {
    user: IUser,
    handleUpdateUser: (userData: UpdateUserRequest) => AppThunk<UserActions, void>

}

const Sidebar: FC<SidebarProps> = ({user, handleUpdateUser}) => {
    const classes = useStyle()
    const currentDialogId = useTypedSelector<string>(({dialog}) => dialog.currentDialogId)
    const dialogs = useTypedSelector<IDialog[]>(({dialog}) => dialog.items)
    const [filter, setFiler] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFiler(e.target.value)
    }

    const checkDialog = (dialog: IDialog, filter: string): boolean => {
        const f = (user: IUser): boolean => {
            return user.name.startsWith(filter)
        }

        return dialog.author._id !== user._id ? f(dialog.author) : f(dialog.partner)
    }

    const filterDialogs = (dialogs: IDialog[]): IDialog[] => dialogs.filter(dialog => checkDialog(dialog, filter))

    return (
        <Box className={classes.root}>
            <Box className={classes.headerBox}>
                <Typography
                    className={classes.headerBoxText}
                >
                    <MyProfile handleUpdateUser={handleUpdateUser}/>
                </Typography>
                <CreateDialog />
            </Box>
            <TextField
                className={classes.textField}
                InputProps={{
                    startAdornment:
                        <InputAdornment
                            position="start"
                        >
                            <SearchIcon/>
                        </InputAdornment>,
                }}
                placeholder={"Поиск среди контактов"}
                onChange={handleChange}
            />
            <Dialogs
                user={user}
                currentDialogId={currentDialogId}
                dialogs={filterDialogs(dialogs)}
            />
        </Box>
    );
};

export default Sidebar;