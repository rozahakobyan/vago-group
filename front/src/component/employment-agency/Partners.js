import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { partnersListRequest } from "../../store/actions/partners";
import { API_URL } from "../../Api";

function Partners() {
    const dispatch = useDispatch();

    const partnersList = useSelector(state => state.partners.partnersList);

    useEffect(() => {
        dispatch(partnersListRequest())
    }, []);

    return (
        <section>
            <div className="EmploymentAgency-partners-area">
                <div className="EmploymentAgency-partner-info">
                    <div className="EmploymentAgency-partners-title">
                        <h1>Partners</h1>
                    </div>
                    <div className="EmploymentAgency-partners-blocks">
                        {partnersList && partnersList.map(p => (
                            <div className="EmploymentAgency-block"><img src={`${API_URL}/${p.image}`} alt={""} /></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Partners;

