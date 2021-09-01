import React, {FC, useMemo} from 'react';
import {makeStyles} from "@material-ui/core";
import List from "./List";
import FileCard from "./FileCard";

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        marginBottom: "10px"
    }
}))

interface AttachmentsProps {
    urls: string[],
    handleRemoveFileCard: (index: number) => void
}

const Attachments: FC<AttachmentsProps> = ({urls, handleRemoveFileCard}) => {
    const classes = useStyles()

    return (
        <List
            styles={classes.list}
            items={urls}
            renderItem={(item, index) =>
                <FileCard
                    key={item}
                    index={index!}
                    url={item}
                    handleRemoveFileCard={handleRemoveFileCard}
                />}
        />
    );
}

export default Attachments;