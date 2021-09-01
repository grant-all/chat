import React, {FC, RefObject} from 'react';
import {makeStyles} from "@material-ui/core";

interface WaveProps {
    refSvg: RefObject<SVGSVGElement>,
    handleRewind: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

const useStyles = makeStyles(theme => ({
    root: {
        fill: "#fff",
        zIndex: 1,
        cursor: "pointer"
    }
}))

const Wave: FC<WaveProps> = ({refSvg, handleRewind}) => {
    const classes = useStyles()

    return (
        <svg
            className={classes.root}
            ref={refSvg}
            onClick={handleRewind}
            viewBox="0 0 100 100"
            width={150}
            height={100}
            preserveAspectRatio="none"
        />
    );
};

export default Wave;