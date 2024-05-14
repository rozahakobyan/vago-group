import React, {useCallback} from 'react';
import logo from '../../assets/images/logo.png';

const Logo = ({open, setOpen}) => {
    const handleClick = useCallback((e) => {
        e.preventDefault();
        setOpen(!open);
    }, [open])

    return (
        <div className={'logo'}>
            <img src={logo || ""} alt={""} onClick={handleClick}/>
        </div>
    );
};

export default Logo;
