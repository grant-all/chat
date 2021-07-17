import React, {FC} from 'react';
import {formatDistanceToNowStrict} from "date-fns";

interface TimeProps {
    date: Date
}

const Time: FC<TimeProps> = ({date}) => {
    return (
        <>
            {formatDistanceToNowStrict(new Date(date))}
        </>
    );
};

export default Time;