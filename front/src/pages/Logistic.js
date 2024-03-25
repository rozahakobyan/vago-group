import React from "react";
import Price from "../component/logistic/Price";
import Wrapper from "../component/Wrapper";
import Logistic_banner from "../component/logistic/logistic-banner";
import Logistic_contacts from "../component/logistic/logistic-contacts";


function Logistic(){
    return(
        <Wrapper>
            <Logistic_banner/>
            <Price/>    
            <Logistic_contacts/>        
        </Wrapper>
    )
}

export default Logistic