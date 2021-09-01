import React, {ChangeEvent, RefObject, useCallback, useEffect, useRef} from 'react';
import TextField from "@material-ui/core/TextField";
import Hint from "./Hint";
import {IUser} from "../models/IUser";
import userApi from "../utils/api/user";
import useActions from "../hooks/useActions";

const FormCreateDialog = () => {
    const [value, setValue] = React.useState<string>("")
    const [foundUsers, setFoundUsers] = React.useState<IUser[]>([])
    const [coords, setCoords] = React.useState<{ top: number, left: number, width: number }>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const {fetchCreateDialog} = useActions()
    let el: Element;

    useEffect(() => {
        const f = measuredRef.bind(null, el)

        window.addEventListener("resize", f)

        return () => {
            window.removeEventListener("resize", f)
        }
    }, [])

    const measuredRef = useCallback((node: Element) => {
        if (node !== null) {
            el = node;
            const rect = node.getBoundingClientRect()

            setCoords({
                top: rect.top,
                left: rect.left,
                width: rect.width
            });
        }
    }, []);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setValue(val)

        if (!val) {
            setFoundUsers([])
            return
        }

        setLoading(true)
        const users: IUser[] = (await userApi.searchNewUser(val)).data
        setLoading(false)
        setFoundUsers(users)
    }


    console.log(foundUsers)


    return (
        <>
            <TextField
                inputRef={measuredRef}
                autoFocus
                margin="dense"
                type="email"
                fullWidth
                value={value}
                onChange={handleChange}
            />
            {value && <Hint handleCreateDialog={fetchCreateDialog} loading={loading} foundUsers={foundUsers} coords={coords!}/>}
        </>
    )
};

export default FormCreateDialog;