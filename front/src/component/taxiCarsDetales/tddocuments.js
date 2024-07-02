import React, {useEffect} from "react";
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {carGetByIdRequest} from "../../store/actions/cars";

function DocumentsList () {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    const car = useSelector(state => state.cars.car)
    const language = Account.getLanguage();
   

    
    useEffect(() => {
        dispatch(carGetByIdRequest(id))
    }, [id]);

    return(
        <div className="taxiInfoArea">
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.carInfo[language]}</h2>
                    <p><strong>{translation.price[language]} - </strong> {car.price}</p>
                    <p><strong>{translation.transmission[language]} - </strong> {car.translation && car.translation[language].transmission}</p>
                    <p><strong>{translation.fuel[language]} - </strong>{car.translation && car.translation[language].fuel}</p>
                    <p><strong>{translation.bac[language]} - </strong> {car.bac}{translation.bacL[language]}</p>
                </div>
            </div>
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.requiredDocuments[language]}</h2>
                    <p>{car.translation && car.translation[language].documents}</p>
                </div>
            </div>
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.taxiBonusSystem[language]}</h2>
                    <p>{car.translation && car.translation[language].bonusSystem}</p>
                </div>
            </div>
            <div className="DocumentsListArea">
                <div className="DocumentsListBlock">
                    <h2>{translation.taxiRules[language]}</h2>
                    <p>{car.translation && car.translation[language].rules}</p>
                </div>
            </div>
        </div>

        
    )
}

export default DocumentsList