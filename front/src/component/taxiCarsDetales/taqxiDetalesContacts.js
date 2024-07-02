import React, {useCallback, useEffect, useState} from "react";
import { Account } from "../../helpers/Account";
import translation from "../../assets/data/translation";
import {useDispatch, useSelector} from "react-redux";
import {userSendMessageRequired} from "../../store/actions/users";
import {useNavigate} from "react-router-dom";
import Button from "../Button";
import axios from "axios";

const language = Account.getLanguage();

function TDContacts() {

    const navigate = useNavigate();

    const car = useSelector(state => state.cars.car)
    const profile = useSelector(state => state.users.profile)
    const token = useSelector(state => state.users.token)

    const [message, setMessage] = useState({
        "department": "",
        "car's name": "",
        name: "",
        phone: "",
        email: "",
        "second email": "",
        message: "",
    })
    const [error, setError] = useState("");
    const [messages, setMessages] = useState("");

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        if(token){
            setMessage({...message, email: profile.email, [path]: text, "car's name": car.name,})
        }else{
            setMessage({...message, [path]: text, "car's name": car.name,})
        }
    }, [message, car, profile, token])

    const submit = useCallback(async (e) => {
        e.preventDefault()
        console.log(message)
        const formID = 'xleqqvoy';
        const formURL = `https://formspree.io/f/${formID}`;
        if(token){
            const response = await axios.post(formURL, message);
            console.log(response)
            if(response?.status === 200){
                setMessage({
                    "department": "",
                    "car's name": "",
                    name: "",
                    phone: "",
                    email: "",
                    "second email": "",
                    message: "",
                })
                setMessages("Successfully massage")
            }else{
                setMessages("")
            }
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
                        {error && <p>{error}</p>}
                        {messages && <p>{messages}</p>}
                        
                        <Button title={translation.submit[language]}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TDContacts