import React, {useCallback, useState} from 'react'
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from '../Button';
import axios from "axios";

function Application() {
    const navigate = useNavigate();

    const language = Account.getLanguage();

    const profile = useSelector(state => state.users.profile)
    const token = useSelector(state => state.users.token)

    const [message, setMessage] = useState({
        department: "Employment Agency",
        contact: "Application",
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
            setMessage({...message, email: profile.user.email, [path]: text})
        }else{
            setMessage({...message, [path]: text})
        }
    }, [message, profile, token])

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
                    department: "Employment Agency",
                    contact: "Application",
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
            <div className="contactsTitle">
                <h2>{translation.application[language]}</h2>
            </div>
            <div className="contactsFormArea">
                <div className="contacts-Area">
                    <form onSubmit={submit}>
                        <input type={translation.offerName[language]} placeholder={"Name"}
                               onChange={(e) => handleChange(e, "name")}/>
                        <input type={"email"} placeholder={"Email"}
                               onChange={(e) => handleChange(e, "second email")}/>
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


export default Application


