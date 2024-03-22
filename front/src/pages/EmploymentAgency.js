import React from "react";
import Wrapper from "../component/Wrapper";
import Vacancies from "../component/employment-agency/Vacancies";
import Price from "../component/employment-agency/Price";
import Contacts from "../component/employment-agency/Contacts";
import Application from "../component/employment-agency/Application";
import Gallery from "../component/employment-agency/Gallery";
import Partners from "../component/employment-agency/Partners";
import History from "../component/employment-agency/History";
import EA_banner from "../component/employment-agency/emplomentAgency-banner";

function EmploymentAgency(){
    return(
        <Wrapper helmetTitle={"employment-agency"}>
            <EA_banner/>
            <Vacancies/>
            <Price />
            <Application/>
            <Gallery/>
            <Partners/>
            <History/>
            <Contacts/>
        </Wrapper>
    )
}


export default EmploymentAgency