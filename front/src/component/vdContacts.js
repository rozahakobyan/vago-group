import React, {useCallback, useEffect, useState} from "react";
import { Account } from "../helpers/Account";
import translation from "../assets/data/translation";
import {useDispatch, useSelector} from "react-redux";
import {userSendMessageRequired} from "../store/actions/users";
import {useNavigate} from "react-router-dom";
import Button from "./Button";

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
        secondEmail: "",
        message: "",
        vacancyName: ""
    })
    const [error, setError] = useState("");

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setMessage({...message, [path]: text, vacancyName: work.name})
        if(token){
            setMessage({...message, email: profile.email})
        }
    }, [message, work, profile, token])

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
                        <input type={'text'} placeholder={translation.offerName[language]}
                               onChange={(e) => handleChange(e, "name")}/>
                        <input type={"email"} placeholder={"Email"}
                               onChange={(e) => handleChange(e, "secondEmail")}/>
                        <input type={"text"} placeholder={translation.offerPhone[language]}
                               onChange={(e) => handleChange(e, "phone")}/>
                        <textarea placeholder={translation.offerMessage[language]}
                                  onChange={(e) => handleChange(e, "message")}/><br/>
                        {errors?.exsist && <p>{errors.exsist}</p>}
                        {error && <p>{error}</p>}
                        {messages && <p>{messages}</p>}
                        
                        <Button title={translation.submit[language]}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VDContacts