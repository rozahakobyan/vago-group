import React from 'react';
const ChangeEmail = ({children}) => {
    return (
        <div className={`input_item_box`}>
            <p>Enter your Email address</p>
            <div className={"input-box"}>
                {children}
            </div>
        </div>
    );
};

export default ChangeEmail;
