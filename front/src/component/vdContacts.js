import React, {useCallback, useEffect, useState} from "react";
import { Account } from "../helpers/Account";
import translation from "../assets/data/translation";
import {useDispatch, useSelector} from "react-redux";
import {userSendMessageRequired} from "../store/actions/users";
import {useNavigate} from "react-router-dom";

const language = Account.getLanguage();

function VDContacts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const work = useSelector(state => state.works.work)
    const errors = useSelector(state => state.users.errors)
    const loading = useSelector(state => state.users.loading)
    const messages = useSelector(state => state.users.message)
    const profile = useSelector(state => state.users.profile)
    const token = useSelector(state => state.users.token)

    const [message, setMessage] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        vacancyName: ""
    })
    const [error, setError] = useState("");

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setMessage({...message, [path]: text, vacancyName: work.name})
    }, [message])

    const submit = useCallback((e) => {
        e.preventDefault()
        console.log(message)
        if(token){
            dispatch(userSendMessageRequired(message))
            setError("")
        }else{
            setError("Login your account")
            setTimeout(() => {
                return navigate("/login");
            }, 5000)
        }
    }, [message, token])

    return (
        <div className="contactsArea">
            <div className="contactsFormArea">
                <div className="contacts-Area">
                    <form onSubmit={submit}>
                        <input type={translation.offerName[language]} placeholder={"Name"}
                               onChange={(e) => handleChange(e, "name")}/>
                        <input type={"email"} placeholder={"Email"}
                               onChange={(e) => handleChange(e, "email")}/>
                        <input type={"text"} placeholder={translation.offerPhone[language]}
                               onChange={(e) => handleChange(e, "phone")}/>
                        <textarea placeholder={translation.offerMessage[language]}
                                  onChange={(e) => handleChange(e, "message")}/><br/>
                        {errors?.exsist && <p>{errors.exsist}</p>}
                        {error && <p>{error}</p>}
                        {messages && <p>{messages}</p>}
                        <button type={"submit"}>{translation.submit[language]}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VDContacts