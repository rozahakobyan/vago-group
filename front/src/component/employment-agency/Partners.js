import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnersListRequest } from "../../store/actions/partners";
import { API_URL } from "../../Api";
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";


function Partners() {
    const dispatch = useDispatch();

    const partnersList = useSelector(state => state.partners.partnersList);
    const language = Account.getLanguage();
    useEffect(() => {
        dispatch(partnersListRequest())
    }, [partnersList, language]);
    console.log(partnersList);


    return (
        <section>
            <div className="EmploymentAgency-partners-area">
                <div className="EmploymentAgency-partner-info">
                    <div className="EmploymentAgency-partners-title">
                        <h1>{translation.partners[language]}</h1>
                    </div>
                    <div className="EmploymentAgency-partners-blocks">
                        {partnersList && partnersList.map(p => (

                            <div key={p.id}>
                                <div className="EmploymentAgency-block"><img src={`${API_URL}/${p.image}`} alt={""} /></div>
                                <div className="Partners-name"><strong>{p.translation[language].name}</strong></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Partners;

