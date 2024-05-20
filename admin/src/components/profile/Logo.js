import React, {useCallback, useMemo} from 'react';
import logo from '../../assets/images/logo.png';

const Logo = ({open, setOpen}) => {
    const handleClick = useCallback((e) => {
        e.preventDefault();
        if(window.screen.availWidth <= 640){
            setOpen(!open);
        }else{
            setOpen(false)
        }
    }, [open])

    return (
        <div className={'logo'}>
            <img src={logo || ""} alt={""} onClick={handleClick}/>
        </div>
    );
};

export default Logo;
