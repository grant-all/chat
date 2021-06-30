import React, {useState} from 'react';
import {Box, Button, Container, IconButton, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Form, FormikProps} from "formik";
import FormField from "../../../components/FormField";
import InfoIcon from '@material-ui/icons/Info';

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
        display: "flex",
        alignItems: "center",
        height: "517px",
        padding: "54px 45px",
        boxSizing: "border-box"
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


export interface FormValues {
    name: string
    email: string;
    password: string;
    password2: string;
}

interface RegistrationProps {
    formik: FormikProps<FormValues>,
    success: boolean,
    setSuccess: (success: boolean) => void
}


const Registration: React.FC<RegistrationProps> = ({formik, success, setSuccess}) => {
    const
        {
            values,
            handleBlur,
            handleChange,
            touched,
            errors,
            isSubmitting,
            isValid,
            handleSubmit
        } = formik;

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e)
        if (isValid) {
            setSuccess(true)
        }
    }

    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Container className={classes.container}>
                <Box className={classes.titleBox}>
                    <Typography
                        variant={"h5"}
                    >
                        Регистрация
                    </Typography>
                    <Typography
                        className={classes.titleBoxSubtitle}
                        variant={"subtitle2"}
                    >
                        Для входа в чат, вам нужно зарегистрироваться
                    </Typography>
                </Box>
                <Paper className={classes.paper}>
                    <Form
                        onSubmit={handleSubmitForm}
                        className={classes.form}
                    >
                        <FormField
                            className={classes.textField}
                            name={"email"}
                            placeholder={"Введите Email"}
                            errors={errors.email!}
                            touched={touched.email!}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.email}
                        />
                        <FormField
                            className={classes.textField}
                            name={"name"}
                            placeholder={"Введите имя"}
                            errors={errors.name!}
                            touched={touched.name!}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.name}
                        />
                        <FormField
                            className={classes.textField}
                            name={"password"}
                            placeholder={"Введите пароль"}
                            errors={errors.password!}
                            touched={touched.password!}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.password}
                            password
                        />
                        <FormField
                            name={"password2"}
                            placeholder={"Повторить пароль"}
                            errors={errors.password2!}
                            touched={touched.password2!}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.password2}
                            password
                        />
                        <Button
                            className={classes.button}
                            color={"primary"}
                            variant={"contained"}
                            disabled={isSubmitting}
                            type={"submit"}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </Button>
                        <Link
                            className={classes.link}
                            to='/login'
                        >
                            <Typography className={classes.linkText}>Войти в аккаунт</Typography>
                        </Link>
                    </Form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Registration;