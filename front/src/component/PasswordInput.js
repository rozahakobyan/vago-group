import React, {useCallback, useState} from 'react';
import {BiShowAlt} from "react-icons/bi";
import { BiHide } from "react-icons/bi";
const PasswordInput = ({styles,styItem,...props}) => {
    const [active, setActive] = useState(false)
    const toggle = useCallback(()=>{
        setActive(!active)
    },[active])
    return (
        <div style={styItem} className={styles}>
            <input {...props} type={active ? 'text' : 'password'}/>
            <button onClick={toggle}>{active ? <BiHide />:<BiShowAlt/>}</button>
        </div>
    );
};

export default PasswordInput;
