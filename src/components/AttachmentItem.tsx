import React, {FC} from 'react';
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        width: "45px",
        height: "45px",
        "&+div": {
            marginLeft: "5px",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
}))

interface AttachmentItemProps {
    url: string
}

const AttachmentItem: FC<AttachmentItemProps> = ({url}) => {
    const classes = useStyles()

    return (
        <Box className={classes.root} style={{backgroundImage: `url(${url})`}}/>
    );
};

export default AttachmentItem;