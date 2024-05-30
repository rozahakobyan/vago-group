import React from 'react'
import Wrapper from '../component/Wrapper'
import VacanciesDetalesArea from "../component/vacancies-detales-area"
import VDContacts from '../component/vdContacts'
import {useSelector} from "react-redux";


function VacanciesDetales(){
    return(
        <Wrapper helmetTitle={"vacancies-detales"}>
            <VacanciesDetalesArea/>
            <VDContacts/>
        </Wrapper>
    )
}

export default VacanciesDetales