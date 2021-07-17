import React, {FC} from 'react';
import {Avatar, Badge, withStyles} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}))(Badge);

interface CustomAvatarProps {
    avatar: string
}

const CustomAvatar: FC<CustomAvatarProps> = ({avatar}) => {
    return (
        <StyledBadge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            variant="dot"
        >
            <Avatar src={avatar}/>
        </StyledBadge>
    );
};

export default CustomAvatar;