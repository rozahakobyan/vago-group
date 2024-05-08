import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {workGetByIdRequest} from "../store/actions/works";
import {Account} from "../helpers/Account";

function VacanciesDetalesArea(){
    const dispatch = useDispatch();
    const {id} = useParams();

    const work = useSelector(state => state.works.work)
    const language = Account.getLanguage();

    useEffect(() => {
        dispatch(workGetByIdRequest(id))
    }, [id, work]);

    return(
        <div className="vacancies-detales-area">
            <div className="vacancies-detales">
                <div className="VD-name">
                    <h2>{work.translation && work.translation[language].name}</h2>
                </div>
                <div className="VD-text">
                    <p>{work.translation && work.translation[language].description}</p>
                </div>
            </div>
        </div>
    )
}
export default VacanciesDetalesArea