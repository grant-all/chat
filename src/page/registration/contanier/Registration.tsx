import {FormikProps, withFormik} from "formik";
import * as Yup from 'yup';
import {connect} from "react-redux";
import * as _ from 'lodash'
import React, {useState} from "react";

import Registration from "../component/Registration";
import {FormValues} from "../component/Registration";
import {fetchRegistrationUser} from "../../../redux/actions/user";
import {RegistrationRequest} from "../../../models/request/RegistrationRequest";
import {ThunkDispatch} from "redux-thunk";
import rootReducer from "../../../redux/reducers";
import {UserActions} from "../../../redux/types/user";

interface MyFormProps {
    registration: (user: RegistrationRequest) => void
}

const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    email: Yup.string().email('Неверный адрес электронной почты').required('Почта обязательна'),
    password: Yup.string().required('Пароль обязателен'),
    password2: Yup.string()
        .test('', 'Пароли не совпадают', function (value) {
            return this.parent.password === value
        })
})

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof rootReducer>, unknown, UserActions>) => {
    return {
        registration: (user: RegistrationRequest) => {
            dispatch(fetchRegistrationUser(user));
        }
    };
};

const RegistrationContainer : React.FC<FormikProps<FormValues>> = (props) => {
    const [success, setSuccess] = useState<boolean>(false)

    return (
        <Registration
            formik={props}
            success={success}
            setSuccess={setSuccess}
        />
    )
}

export default connect(null, mapDispatchToProps)(withFormik<MyFormProps, FormValues>({
    mapPropsToValues: () =>
        ({name: "", email: "", password: "", password2: ""}),

    validationSchema: RegistrationSchema,

    handleSubmit: async (values: FormValues, {props, setSubmitting},) => {
        const user = _.pick(values, ["name", "password", "email"])
        await props.registration(user)
        setSubmitting(false)

    }
})(RegistrationContainer))
