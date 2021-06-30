import React from 'react';
import {Avatar, Badge, withStyles} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}))(Badge);

const CustomAvatar = () => {
    return (
        <StyledBadge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            variant="dot"
        >
            <Avatar/>
        </StyledBadge>
    );
};

export default CustomAvatar;