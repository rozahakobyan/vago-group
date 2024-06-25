import React, { useCallback, useEffect } from "react";
import translation from "../../assets/data/translation";
import { Account } from "../../helpers/Account";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";

import { ourAdvantagesListRequest } from "../../store/actions/ourAdvantages";
import { ourAdvantagesTaxiListRequest } from "../../store/actions/ourAdvantagesTaxi";
import { API_URL } from "../../Api";



function TaxiDriver() {
    const dispatch = useDispatch();

    const language = Account.getLanguage();

    const ourAdvantagesTaxiList = useSelector(state => state.ourAdvantagesTaxi.ourAdvantagesTaxiList)
    const loading = useSelector(state => state.users.loading)

    useEffect(() => {
        dispatch(ourAdvantagesTaxiListRequest({ active: true }))
    }, []);

    

    const submit = useCallback(() => {

    }, [])

    return (
        <>
            {ourAdvantagesTaxiList && ourAdvantagesTaxiList.map(tb => (
                <div className="becomeTaxiDriver" key={tb.id}>
                    <div className="becomeTaxiDriverBox" >
                        <div className="imageBoxArea" style={{
                            width: "320px",
                            backgroundImage: `url(${API_URL}/${tb.image})`,
                            backgroundRepeat: "none",
                            backgroundPosition: "center",
                            margin: "25px",
                            backgroundSize: "cover",
                            textAlign: "center",
                            height: "400px",
                            color: `${tb.color}`,
                        }}>
                            <strong>{tb.translation[language].text}</strong>
                        </div>
                        <div className="FormBoxArea">
                            <form onSubmit={submit}>
                                <label><strong>{translation.BecomATaxiDriverInfo[language]}</strong></label>
                                <input type={'text'} placeholder={translation.offerName[language]} />
                                <input type={"text"} placeholder={translation.offerPhone[language]} />
                                <Button title={translation.submit[language]} loading={loading} />
                            </form>
                        </div>

                    </div>
                </div>
            ))}
        </>


    )
}

export default TaxiDriver