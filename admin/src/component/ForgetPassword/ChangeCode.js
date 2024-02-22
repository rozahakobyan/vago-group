import React from 'react';

const ChangeCode = ({children}) => {
    return (
        <div  className={'input_item_box'}>
            <p>Enter your recovery code</p>
            <div className={"input-box"}>
                {children}
            </div>
        </div>
    );
};

export default ChangeCode;
