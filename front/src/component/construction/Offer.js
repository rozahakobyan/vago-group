import React, {useCallback} from "react";
import LogoutWrapper from "../LogoutWrapper";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";

function Offer() {
    const navigate = useNavigate();
    const token = useSelector(state => state.users.token);

    const handleSend = useCallback(() => {
        console.log(token)
        if(!token){
            return navigate("/login");
        }
    }, [])
    const language = Account.getLanguage();

    return (
        <div className="offersArea">
            <div className="formArea">
                <div className="offers-title">
                    <h2>{translation.offer[language]}</h2>
                </div>
                <form>
                    <input type={"text"} placeholder={translation.offerName[language]} />
                    <input type={"email"} placeholder={"Email"} />
                    <input type={"text"} placeholder={translation.offerPhone[language]} />
                    <textarea placeholder={translation.offerMessage[language]} /><br />
                    <button className="wide" type={"submit"} onClick={handleSend}>{translation.submit[language]}</button>
                </form>
            </div>
        </div>
    )
}

export default Offer