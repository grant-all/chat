import React from 'react';

import useTypedSelector from "../hooks/useTypedSelector";
import {Box, Container, makeStyles, Paper, Typography} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import {Redirect, useHistory} from "react-router-dom";
import Home from "../page/Home/Home";

const useStyle = makeStyles(theme => ({
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    paper: {
        display: "flex",
        alignItems: "center",
        height: "517px",
        padding: "54px 45px",
        boxSizing: "border-box"
    },
    confirmBox: {
        maxWidth: "355px",
    },
    infoIcon: {
        fontSize: "100px",
    },
    titleConfirm: {
        margin: "14px 0"
    },
    subtitleConfirm: {
        opacity: 0.5
    }
}))

interface CheckEmailInfoProps {
    isActivated: boolean
}

const CheckEmailInfo : React.FC<CheckEmailInfoProps> = ({isActivated}) => {
    const classes = useStyle()

    return (
        isActivated ? <Home /> :
            <Box className={classes.root}>
                <Container className={classes.container}>
                    <Paper className={classes.paper}>
                        <Box className={classes.confirmBox}>
                            <InfoIcon
                                className={classes.infoIcon}
                                color={"primary"}
                            />
                            <Typography
                                className={classes.titleConfirm}
                                variant={"h5"}
                            >Подтвердите свой аккаунт
                            </Typography>
                            <Typography className={classes.subtitleConfirm}>
                                На Вашу почту отправлено письмо с ссылкой на подтверждение
                                аккаунта.
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>

    )

};

export default CheckEmailInfo;