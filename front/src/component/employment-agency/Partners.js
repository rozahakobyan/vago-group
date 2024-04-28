import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnersListRequest } from "../../store/actions/partners";
import { API_URL } from "../../Api";

function Partners() {
    const dispatch = useDispatch();

    const partnersList = useSelector(state => state.partners.partnersList);

    useEffect(() => {
        dispatch(partnersListRequest())
    }, []);
    console.log(partnersList);

    return (
        <section>
            <div className="EmploymentAgency-partners-area">
                <div className="EmploymentAgency-partner-info">
                    <div className="EmploymentAgency-partners-title">
                        <h1>Services</h1>
                    </div>
                    <div className="EmploymentAgency-partners-blocks">
                        {partnersList && partnersList.map(p => (

                            <div key={p.id}>
                                <div className="EmploymentAgency-block"><img src={`${API_URL}/${p.image}`} alt={""} /></div>
                                <div className="Partners-name"><strong>{p.name}</strong></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Partners;

