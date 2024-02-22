import React from 'react';
import {BeatLoader} from "react-spinners";

const IsLoading = ({...props}) => {
    return (
        <BeatLoader  {...props} loading={true} />
    );
};

export default IsLoading;
