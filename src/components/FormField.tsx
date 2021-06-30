import React, {ChangeEvent, FC} from 'react';
import {TextField} from "@material-ui/core";

interface IFormFieldProps {
    className?: string
    name: string,
    placeholder: string,
    errors: string,
    touched: boolean,
    handleChange: (e: any) => void,
    handleBlur: (e: React.ChangeEvent<any>) => void
    value: any,
    password?: boolean
}

const FormField: FC<IFormFieldProps> = (props) => {
    const {
        className,
        placeholder,
        name,
        value,
        touched,
        errors,
        handleChange,
        handleBlur,
        password
    } = props;

    return (
        <TextField
            className={className}
            placeholder={placeholder}
            variant={"outlined"}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched && !!errors}
            helperText={touched && errors}
            type={password ? "password" : "string"}
            />
    )

};

export default FormField;