import React, {useRef} from "react";
import Price from "../component/logistic/Price";
import Wrapper from "../component/Wrapper";
import Logistic_banner from "../component/logistic/logistic-banner";
import Logistic_contacts from "../component/logistic/logistic-contacts";
import Calculator from "../component/logistic/calculator";
import Vacancieces from "../component/logistic/logistic-vacancies";
import Services from "../component/logistic/sevices";

function Logistic(){
    const ref = useRef(null);

    return(
        <Wrapper helmetTitle={"Logistic"}>
            <Logistic_banner/>
            <Calculator/>
            <Price refOrder={ref}/>
            <Services/>
            <Vacancieces/>
            <Logistic_contacts refOrder={ref}/>
        </Wrapper>
    )
}

export default Logistic