import React, {useEffect} from 'react';
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";
import Icon from "../../assets/icon/icon.jpg"
import {useDispatch, useSelector} from "react-redux";
import {ourAdvantagesListRequest} from "../../store/actions/ourAdvantages";

function Advantages() {
    const dispatch = useDispatch();

    const language = Account.getLanguage();

    const ourAdvantagesList = useSelector(state => state.ourAdvantages.ourAdvantagesList)

    useEffect(() => {
        dispatch(ourAdvantagesListRequest())
    }, []);

    console.log(ourAdvantagesList)

    return (
        <div className='advantagesArea'>
            <h2><strong>{translation.advantagesc[language]}</strong></h2>
            <div className='advantagesBlocks'>
                <div className='advantagesBlock' style={{
                    backgroundImage: `url(${Icon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}>
                    <p>inch vor aravelutyun voy chunen mnacatsy</p>
                </div>          
                    
            </div>
            
        </div>
    )
}

export default Advantages