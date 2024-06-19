import React from "react";
import translation from "../../assets/data/translation";
import { Account } from "../../helpers/Account";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../assets/images/taxi.jpg"

function TaxiDriver() {
    const language = Account.getLanguage();
    const loading = useSelector(state => state.users.loading)

    return (
        <div className="becomeTaxiDriver">
            <div className="becomeTaxiDriverBox">
                <div className="imageBoxArea" style={{
                    width: "320px",
                    backgroundImage: `url(${Image})`,
                    backgroundRepeat: "none",
                    backgroundPosition: "center",
                    margin: "25px",
                    backgroundSize: "cover",
                    textAlign: "center",
                    height: "400px",
                    color: "red",

                }}>
                    <strong>Becom A Taxi Driver</strong>
                </div>
                <div className="FormBoxArea">
                    <form onSubmit={''}>
                        <label><strong>напишите ваше име и номер и мыпазвоним вам в течении 30 минут</strong></label>
                        <input type={'text'} placeholder={translation.offerName[language]} />
                        <input type={"text"} placeholder={translation.offerPhone[language]} />
                        <Button title={translation.submit[language]} loading={loading} />
                    </form>
                </div>

            </div>
        </div>
    )
}

export default TaxiDriver