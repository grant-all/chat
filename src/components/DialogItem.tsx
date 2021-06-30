import React from 'react';
import { Badge, Box, makeStyles, Typography} from "@material-ui/core";
import CustomAvatar from "./CustomAvatar";

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        padding: "13px 20px",
        color: "#202020",
        cursor: "pointer",
        fontSize: "14px",
        "& p": {
          fontSize: "inherit"
        },
        "&:hover": {
            backgroundColor: "#F3F7FF"
        }
    },
    selected: {
        backgroundColor: "#F3F7FF"
    },
    avatar: {
        display: "flex",
        alignItems: "center"
    },
    box: {
        marginLeft: "11px"
    },
    name: {
        fontWeight: 600
    },
    lastMessage: {
        opacity: "0.4",
        whiteSpace: "nowrap",
    },
    dateMessage: {
        position: "absolute",
        top: "7px",
        right: "22px",
        opacity: "0.4"
    },
    badge: {
        position: "absolute",
        bottom: "24px",
        right: "29px",
    }
}))

const DialogItem = () => {
    const classes = useStyle()

    return (
        <Box className={classes.root}>
            <Box className={classes.avatar}>
                <CustomAvatar/>
                <Box className={classes.box}>
                    <Typography className={classes.name}>Jack the Ripper</Typography>
                    <Typography className={classes.lastMessage}>Я ща стрепсилс тебе куплю, п…</Typography>
                </Box>
            </Box>
            <Typography
                className={classes.dateMessage}
                variant={"subtitle2"}
            >
                Сейчас
            </Typography>
            <Badge
                className={classes.badge}
                badgeContent={3}
                color={"secondary"}
            />
        </Box>
    );
};

export default DialogItem;