import React, {FC, useEffect, useState} from 'react';
import {Box, IconButton, makeStyles} from "@material-ui/core";
import {BaseEmoji, Picker} from "emoji-mart";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const useStyles = makeStyles({
    emojiBox: {
        position: "absolute",
        bottom: "56px",
        width: "230px"
    },
})

interface EmojiPickerProps {
    emojiRef: React.RefObject<HTMLDivElement>,
    handleClickEmoji: (emoji: BaseEmoji) => void
}

const EmojiPicker: FC<EmojiPickerProps> = ({emojiRef, handleClickEmoji}) => {
    const classes = useStyles()
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false)

    const toggleVisiblePopup = (): void => {
        setVisiblePopup(!visiblePopup);
    };

    const handleClose = (event: MouseEvent) => {
        if (!event.composedPath().includes(emojiRef.current as Node))
            setVisiblePopup(false)
    }

    useEffect(() => {
        document.body.addEventListener("click", handleClose)

        return () => {
            document.body.removeEventListener("click", handleClose)
        }
    }, [])

    return (
        <div ref={emojiRef}>
            {
                visiblePopup &&
                <Box className={classes.emojiBox}>
                    <Picker
                        style={{width: "100%"}}
                        onClick={handleClickEmoji}
                        showPreview={false}
                        showSkinTones={false}
                    />
                </Box>
            }
            <IconButton onClick={toggleVisiblePopup}>
                <SentimentVerySatisfiedIcon
                    fontSize={"large"}
                />
            </IconButton>
        </div>
    );
};

export default EmojiPicker;