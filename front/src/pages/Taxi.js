import React, { useRef } from "react";
import Taxi_banner from "../component/taxi/banner";
import Services from "../component/taxi/services";
import TaxiCars from "../component/taxi/taxi-cars";
import Wrapper from "../component/Wrapper";

function Taxi() {

    
    return (
        <Wrapper helmetTitle={"construction"}>
           <Taxi_banner/>
           <Services/>
           <TaxiCars/>

      
        </Wrapper>
        
    )
}

export default Taxi