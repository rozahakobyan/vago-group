import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historiesListRequest } from "../../store/actions/histories";
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";




function History() {
    const dispatch = useDispatch();
    
    const historiesList = useSelector(state => state.histories.historiesList)
    const language = Account.getLanguage();
    useEffect(() => {
        dispatch(historiesListRequest({ active: true }))
    },[historiesList, language]);

    console.log(historiesList)

    return (
        <div className="history-area">
            <div className="history-title">
                <h1><strong>{translation.history[language]}</strong></h1>
            </div>
            {historiesList && historiesList.map(h => (
                <div className="history-text" key={h.id}>
                    <p style={{ color: '#999999' }}>{h.translation[language].description}</p>
                </div>
            ))}

        </div>
    )
}

export default History