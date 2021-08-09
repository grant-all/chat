import React, {FC} from 'react';
import {Badge, BadgeOrigin, withStyles} from "@material-ui/core";

const styles = (props: any) => ({
    badge: {
        backgroundColor: props.isOnline ? "#44b700" : "gray",
        boxShadow: `0 0 0 2px ${props.theme.palette.background.paper}`
    }
})

const withStylesProps = (isOnline: boolean) =>
    withStyles(theme => styles({isOnline, theme}))(Badge)

interface CustomBadgeProps {
    isOnline: boolean,
    anchorOrigin?: BadgeOrigin
}

const CustomBadge:FC<CustomBadgeProps> = ({isOnline, anchorOrigin, children}) => {
    const Component = withStylesProps(isOnline);

    return (
        <Component
            overlap="circle"
            variant="dot"
            anchorOrigin={anchorOrigin}
        >
            {children}
        </Component>
    )
}

export default CustomBadge;