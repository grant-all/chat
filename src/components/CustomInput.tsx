import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {Box, makeStyles, Typography} from "@material-ui/core"
import {Emoji, EmojiData} from "emoji-mart";
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
        color: "#B4B4B4"
    }
}))

interface CustomInputProps {
    value: string,
    setValue: (value: string) => void,
    handleChange: (e: ChangeEvent<HTMLDivElement>) => void
}

const CustomInput: FC<CustomInputProps> = ({value, setValue, handleChange}) => {
    const classes = useStyle()
    const refDiv: React.RefObject<HTMLInputElement> = useRef(null)

    return (
        <Box className={classes.root}>
            <div
                ref={refDiv}
                className={classes.div}
                contentEditable={true}
                placeholder={"Введите текст сообщения…"}
                onChange={handleChange}
                suppressContentEditableWarning={true}
            >
                {reactStringReplace(value, /:(.+?):/g, (match: string | EmojiData, i: React.Key | null |
                    undefined) => (
                    <Emoji
                        key={i}
                        emoji={match}
                        set="apple"
                        size={16}
                    />
                ))}
            </div>
            <Typography className={classes.placeholder}>Введите сообщение</Typography>
        </Box>
    );
};

export default CustomInput;