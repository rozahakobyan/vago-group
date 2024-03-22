import React from "react";
import Price from "../component/logistic/Price";
import Wrapper from "../component/Wrapper";
import Logistic_banner from "../component/logistic/logistic-banner";


function Logistic(){
    return(
        <Wrapper>
            <Logistic_banner/>
            <Price/>            
        </Wrapper>
    )
}

export default Logistic