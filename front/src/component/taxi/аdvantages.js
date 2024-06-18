import React from 'react';
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";
import Icon from "../../assets/icon/icon.jpg"

function Advantages() {
    const language = Account.getLanguage();

   

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