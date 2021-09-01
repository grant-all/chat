import React, {FC, RefObject, useEffect, useMemo} from 'react';
import {Box, CircularProgress, makeStyles} from "@material-ui/core";
import List from "./List";
import {IUser} from "../models/IUser";
import FindUser from "./FindUser";
import {createPortal} from "react-dom";
import classNames from "classnames";
import {AppThunk} from "../redux/store";
import {DialogActions} from "../redux/types/dialog";

const useStyle = makeStyles(() => ({
    root: {
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        position: "absolute",
        zIndex: 9999,
        boxSizing: "border-box",
    },
    loading: {
        display: "flex",
        justifyContent: "center",
    }
}))

const modalRoot = document.getElementById('modal-root')!;

interface HintProps {
    loading: boolean
    foundUsers: IUser[],
    coords: { top: number, left: number, width: number },
    handleCreateDialog: (partner: string, text: string) => AppThunk<DialogActions>

}

const Hint: FC<HintProps> = React.memo(({loading, foundUsers, coords, handleCreateDialog}) => {
    const classes = useStyle()
    const el = useMemo(() => document.createElement("div"), [])

    useEffect(() => {
        modalRoot.appendChild(el)

        return () => {
            modalRoot.removeChild(el)
        }
    }, [])


    return createPortal(
        <Box className={classNames(classes.root, {[classes.loading]: loading || !foundUsers.length})}
             style={{...coords, top: coords.top + 50}}>
            {loading ?
                <CircularProgress/>
                :
                !foundUsers.length ? "Нет совпадений"
                    :
                    foundUsers.map(item => <FindUser
                        key={item._id}
                        id={item._id}
                        avatar={item.avatar}
                        name={item.name}
                        handleCreateDialog={handleCreateDialog}
                        />
                    )}
        </Box>,
        el
    )
});

export default Hint;