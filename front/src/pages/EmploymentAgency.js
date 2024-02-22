import React from "react";
import Wrapper from "../component/Wrapper";
import Vacancies from "../component/employment-agency/Vacancies";

function EmploymentAgency(){
    return(
        <Wrapper helmetTitle={"employment-agency"}>
            <Vacancies/>
        </Wrapper>
    )
}


export default EmploymentAgency