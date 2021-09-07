import React, {FC, useState} from 'react';
import {Avatar, Box, Drawer, IconButton, makeStyles, TextField, Typography, withStyles} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import useTypedSelector from "../hooks/useTypedSelector";
import {IUser} from "../models/IUser";
import {boolean} from "yup";
import {AppThunk} from "../redux/store";
import {UserActions} from "../redux/types/user";
import {UpdateUserRequest} from "../models/request/UpdateUserRequest";
import {IFile} from "../models/IFile";
import fileApi from "../utils/api/file"

const useStyles = makeStyles(({
    root: {},
    header: {
        padding: "0 30px 0 30px",
        display: "flex",
        alignItems: "center"
    },
    headerTitle: {
        fontSize: "20px",
        fontWeight: 400
    },
    avatar: {
        position: "relative",
        margin: "auto",
        width: "200px",
        height: "200px",
        cursor: "pointer",
        "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(110, 115, 119, 0.8)"
        }
    },
    avatarBox: {
        position: "relative",
    },
    drawer: {
        "& .MuiDrawer-paper": {
            paddingTop: "50px",
            width: "30%",
            color: "#fff",
            backgroundColor: "#323739"
        }
    },
    iconButtonArrowBackIcon: {
        marginRight: "10px",
        color: "#fff",
    },
    info: {
        paddingTop: "30px",
        height: "100%",
        backgroundColor: "#131C21",
    },
    iconButton: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        "&:hover": {
          backgroundColor: "transparent"
        },
        "& .MuiIconButton-label": {
            flexDirection: "column"
        },
        "& .MuiTouchRipple-root": {
            display: "none"
        }
    },
    nameBox: {
        padding: "0 30px 0 30px",
        marginTop: "20px"
    },
    title: {
      color: "#009688"
    },
    padding: {
        paddingLeft: "30px"
    },
    cursor: {
        cursor: "pointer"
    },
    textField: {
        display: "none"
    }
}))

interface MyProfileProps {
    handleUpdateUser: (userData: UpdateUserRequest) => AppThunk<UserActions, void>
}

const MyProfile: FC<MyProfileProps> = ({handleUpdateUser}) => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false)
    const inputRef: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)
    const user = useTypedSelector<IUser>(({user}) => user.user)

    console.log(user)

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
        setOpen(open)
    }

    const handleClick = (): void => {
        inputRef.current?.click()
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files?.length)
        if(!e.target.files?.length) return

        const file: IFile = (await fileApi.upload(e.target.files[0])).data
        console.log("file: " + file.url)
        handleUpdateUser({avatar: file.url})
    }

    return (
        <Box className={classes.root}>
            <Avatar
                className={classes.cursor}
                onClick={toggleDrawer(true)}
                src={user.avatar}
                alt={user.name}

            />
            <Drawer
                className={classes.drawer}
                anchor={"left"}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Box className={classes.header}>
                    <IconButton className={classes.iconButtonArrowBackIcon} onClick={toggleDrawer(false)}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography className={classes.headerTitle}>Профиль</Typography>
                </Box>
                <Box className={classes.info}>
                    <Box className={classes.avatarBox} onClick={handleClick}>
                        <Avatar
                            className={classes.avatar}
                            alt={user.name}
                            src={user.avatar}
                        />
                        <IconButton className={classes.iconButton}>
                            <CameraAltIcon
                                fontSize={"large"}
                            />
                            <Typography>Изменить фото профиля</Typography>
                        </IconButton>
                        <input
                            className={classes.textField}
                            ref={inputRef}
                            onChange={handleChange}
                            accept={"image/*"}
                            type={"file"}
                        />
                    </Box>
                    <Box className={classes.nameBox}>
                        <Typography className={classes.title}>Имя:</Typography>
                        <Typography className={classes.padding} variant={"subtitle1"}>{user.name}</Typography>
                        <Typography className={classes.title}>id:</Typography>
                        <Typography className={classes.padding} variant={"subtitle1"}>{user._id}</Typography>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MyProfile;