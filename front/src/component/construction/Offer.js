import React, {useCallback} from "react";
import LogoutWrapper from "../LogoutWrapper";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";

function Offer() {
    const navigate = useNavigate();
    const token = useSelector(state => state.users.token);

    const handleSend = useCallback(() => {
        console.log(token)
        if(!token){
            return navigate("/login");
        }
    }, [])

    return (
        <div className="offersArea">
            <div className="formArea">
                <div className="offers-title">
                    <h2>Offer</h2>
                </div>
                <form>
                    <input type={"text"} placeholder={"Name"} />
                    <input type={"email"} placeholder={"Email"} />
                    <input type={"text"} placeholder={"Phone"} />
                    <textarea placeholder={"Massage"} />
                    <button type={"submit"} onClick={handleSend}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Offer