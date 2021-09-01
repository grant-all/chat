import React from 'react';
import {Box, makeStyles} from "@material-ui/core"
import classNames from "classnames";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        marginRight: "10px"
    }
}))

interface ListProps<T> {
    styles?: string,
    items: T[],
    renderItem: (item: T, index?: number) => React.ReactNode
}

export default function List<T>({styles, items, renderItem}: ListProps<T>) {
    const classes = useStyles()

    return (
        <Box className={classNames(classes.root, {styles: styles})}>
            {items.map(renderItem)}
        </Box>
    )
}