import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {Box, Button, Container, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import {LoginRequest} from '../models/request/LoginRequest'
import useTypedSelector from "../hooks/useTypedSelector";
import useActions from "../hooks/useActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
    titleBox: {
        marginBottom: "50px",
        textAlign: "center"
    },
    titleBoxSubtitle: {
        opacity: 0.5,
        letterSpacing: "0.128571px"
    },
    paper: {
        padding: "54px 45px"
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        marginBottom: "15px"
    },
    button: {
        width: "340px",
        height: "56px",
        margin: "25px 0 30px"
    },
    link: {
        textDecoration: "none"
    },
    linkText: {
        color: "#ADADAD",
    }
}))

const Login = () => {
    const classes = useStyles()
    const [formValue, setFormValue] = useState<LoginRequest>({} as LoginRequest)
    const isLoading = useTypedSelector<boolean>(({user}) => user.loading)
    const {fetchLoginUser} = useActions()
    const isAuth = useTypedSelector(({user}) => user.isAuth)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "email")
            return setFormValue(prevState => ({
                ...prevState,
                email: e.target.value
            }))

        setFormValue(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }

    const handleSubmit = () => {
        fetchLoginUser(formValue)
    }

    if(isAuth)
        return <Redirect to={"/"} />

    return (
        <Box className={classes.root}>
            <Container className={classes.container}>
                <Box className={classes.titleBox}>
                    <Typography
                        variant={"h5"}
                    >
                        Войти в аккаунт
                    </Typography>
                    <Typography
                        className={classes.titleBoxSubtitle}
                        variant={"subtitle2"}
                    >
                        Пожалуйста, войдите в свой аккаунт
                    </Typography>
                </Box>
                <Paper className={classes.paper}>
                    <form
                        className={classes.form}
                    >
                        <TextField
                            name={"email"}
                            placeholder={"E-Mail"}
                            className={classes.textField}
                            variant={"outlined"}
                            onChange={handleChange}
                        />
                        <TextField
                            name={"password"}
                            placeholder={"Password"}
                            variant={"outlined"}
                            type={"password"}
                            onChange={handleChange}
                        />
                        <Button
                            className={classes.button}
                            color={"primary"}
                            variant={"contained"}
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            ВОЙТИ В АККАУНТ
                        </Button>
                        <Link
                            className={classes.link}
                            to='/registration'
                        >
                            <Typography className={classes.linkText}>Зарегистрироваться</Typography>
                        </Link>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;