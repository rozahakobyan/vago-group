import React, { useRef } from "react";
import Taxi_banner from "../component/taxi/banner";
import Services from "../component/taxi/services";
import TaxiCars from "../component/taxi/taxi-cars";
import Contacts from "../component/taxi/taxiContacts";
import Advantages from "../component/taxi/аdvantages"
import TaxiDriver from "../component/taxi/becomeATaxiDriver"
import Wrapper from "../component/Wrapper";

function Taxi() {


    return (
        <Wrapper helmetTitle={"construction"}>
            <Taxi_banner />
            <Services />
            <TaxiCars />
            <Advantages />
            <TaxiDriver />
            <Contacts />
        </Wrapper>

    )
}

export default Taxi