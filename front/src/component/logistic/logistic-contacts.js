import React, {useCallback, useState} from "react";
import { Account } from "../../helpers/Account";
import translation from "../../assets/data/translation";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "../Button";
import axios from "axios";

function Logistic_contacts({refOrder}){
    const navigate = useNavigate();

    const language = Account.getLanguage();

    const profile = useSelector(state => state.users.profile)
    const token = useSelector(state => state.users.token)

    const [message, setMessage] = useState({
        department: "Logistic",
        contact: "Contacts",
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
                    department: "Logistic",
                    contact: "Contacts",
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

    return(
        <div className="contactsArea">
            <div className="contactsTitle">
                <h2>{translation.contacts[language]}</h2>
            </div>
            <div className="contactsMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d378.5530309927235!2d43.97141182851843!3d40.62052497993605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sam!4v1708019536063!5m2!1sru!2sam" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className="contactsFormArea" ref={refOrder}>
                <div className="contacts-Area">
                    <form onSubmit={submit}>
                        <input type={'text'} placeholder={translation.offerName[language]}
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

export default Logistic_contacts