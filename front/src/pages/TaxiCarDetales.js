import React from "react";
import TDContacts from "../component/taxiCarsDetales/taqxiDetalesContacts";
import { Account } from "../helpers/Account";
import DocumentsList from "../component/taxiCarsDetales/tddocuments"


import Wrapper from "../component/Wrapper";


function TaxiCarDetales(){
    return(
        <Wrapper helmetTitle={'Taxi'}>
            <DocumentsList/>
            <TDContacts/>
        </Wrapper>
    )
}

export default TaxiCarDetales
