import React, {FC} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
        width: "100px",
        height: "100px",
        marginRight: "20px",
        border: "3px solid #ccc",
        borderRadius: "4px",
        "&:hover": {
            "&>$cancelIcon": {
                opacity: 1
            }
        }
    },
    cancelIcon: {
        position: "absolute",
        top: "-15px",
        right: "-15px",
        opacity: 0,
        transition: "opacity 0.3s",
        cursor: "pointer"
    }
}))

interface FileCardProps {
    url: string,
    index: number,
    handleRemoveFileCard: (index: number) => void
}

const FileCard: FC<FileCardProps> = React.memo(({url, index, handleRemoveFileCard}) => {
    const classes = useStyles()

    return (
        <Box
            className={classes.root}
            style={{backgroundImage: `url("${url}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
        >
            <CancelIcon
                className={classes.cancelIcon}
                fontSize={"large"}
                color={"secondary"}
                onClick={() => handleRemoveFileCard(index)}
            />
        </Box>
    );
});

export default FileCard;