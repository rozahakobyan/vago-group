import React from "react";
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";


function DocumentsList () {
    const language = Account.getLanguage();


    return(
        <div className="taxiInfoArea">
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.carInfo[language]}</h2>
                    <p><strong>{translation.price[language]} - </strong> 250$/weak</p>
                    <p><strong>{translation.transmission[language]} - </strong> automatic</p>
                    <p><strong>{translation.fuel[language]} - </strong> Gas</p>
                    <p><strong>{translation.bac[language]} - </strong> 5l</p>
                </div>
            </div>
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.requiredDocuments[language]}</h2>
                    <p>inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban </p>
                </div>
            </div>
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.taxiBonusSystem[language]}</h2>
                    <p>inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban </p>
                </div>
            </div>
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.taxiRules[language]}</h2>
                    <p>inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban inch vor ban </p>
                </div>
            </div>
        </div>

        
    )
}

export default DocumentsList