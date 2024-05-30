import React from "react";
import Price from "../component/logistic/Price";
import Wrapper from "../component/Wrapper";
import Logistic_banner from "../component/logistic/logistic-banner";
import Logistic_contacts from "../component/logistic/logistic-contacts";
import Calculator from "../component/logistic/calculator";
import Vacancieces from "../component/logistic/logistic-vacancies";
import Services from "../component/logistic/sevices";


function Logistic(){
    return(
        <Wrapper>
            <Logistic_banner/>
            <Calculator/>
            <Price/>    
            <Services/>
            <Vacancieces/>
            <Logistic_contacts/>        
        </Wrapper>
    )
}

export default Logistic