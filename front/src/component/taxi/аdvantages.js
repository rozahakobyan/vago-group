import React, {useEffect} from 'react';
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";
import Icon from "../../assets/icon/icon.jpg"
import {useDispatch, useSelector} from "react-redux";
import {ourAdvantagesListRequest} from "../../store/actions/ourAdvantages";
import { API_URL } from "../../Api";


function Advantages() {
    const dispatch = useDispatch();

    const language = Account.getLanguage();

    const ourAdvantagesList = useSelector(state => state.ourAdvantages.ourAdvantagesList)

    useEffect(() => {
        dispatch(ourAdvantagesListRequest())
    }, []);

   

    return (
        <div className='advantagesArea'>
            <h2><strong>{translation.advantagesc[language]}</strong></h2>
            <div className='advantagesBlocks'>
                {ourAdvantagesList && ourAdvantagesList.map(oa =>(
                    <div key={oa.id} className='advantagesBlock' style={{
                        backgroundImage: `url(${API_URL}/${oa.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        color:`${oa.color}`,
                    }}>
                        <p><strong>{oa.text}</strong></p>
                    </div>          
                ))}
                
                    
            </div>
            
        </div>
    )
}

export default Advantages