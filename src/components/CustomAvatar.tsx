import React, {FC} from 'react';
import {Avatar, Badge, makeStyles, withStyles} from "@material-ui/core";
import classNames from "classnames";

const styles = (props: any) => ({
    badge: {
        backgroundColor: props.isOnline ? "#44b700" : "gray",
        boxShadow: `0 0 0 2px ${props.theme.palette.background.paper}`
    }
})

const withStylesProps = (styles: any) =>
        (isOnline: boolean) => {
            return withStyles(theme => styles({isOnline, theme}))(Badge)
        };

interface CustomAvatarProps {
    avatar: string,
    isOnline: boolean,
}
const CustomAvatar: FC<CustomAvatarProps> = ({avatar, isOnline}) => {
    const CustomBadge = withStylesProps(styles)(isOnline)

    return (
        <CustomBadge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            variant="dot"
        >
            <Avatar src={avatar}/>
        </CustomBadge>
    );
};

export default CustomAvatar;