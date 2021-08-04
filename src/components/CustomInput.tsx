import React, { ChangeEvent, FC, FormEvent, FormEventHandler, useRef, useState } from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core"
import { Emoji, EmojiData } from "emoji-mart";
import reactStringReplace from "react-string-replace";

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        width: "100%",
    },
    div: {
        width: "100%",
        height: "45px",
        padding: "10px",
        border: "1px solid #E9E9E9",
        boxSizing: "border-box",
        borderRadius: "4px",
        "&:not(:empty)": {
            "&+$placeholder": {
                display: "none"
            }
        }
    },
    placeholder: {
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: -1,
        color: "#B4B4B4"
    }
}))

interface CustomInputProps {
    refDiv: React.RefObject<HTMLDivElement>
    handleInput: (e: ChangeEvent<HTMLDivElement>) => void
}

const CustomInput: FC<CustomInputProps> = ({ refDiv, handleInput }) => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <div
                className={classes.div}
                ref={refDiv}
                onInput={handleInput}
                contentEditable={true}
                suppressContentEditableWarning={true}
            />
                {/* {reactStringReplace(value, /:(.+?):/g, (match, i) => (
                    <img
                        draggable={false} 
                        className={classes.img} 
                        src={`https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-64/${match + ".png"}`} alt="emoji" 
                    />
                ))} */}
            <Typography className={classes.placeholder}>Введите сообщение</Typography>
        </Box>
    );
};

export default CustomInput;