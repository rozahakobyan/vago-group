import React, {useCallback, useEffect, useState} from "react";
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userSendContactMessageRequired} from "../../store/actions/users";
import Button from "../Button";

function Contacts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const language = Account.getLanguage();

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
        department: "Construction",
        contact: "Contacts"
    })
    const [error, setError] = useState("");

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
        if(token){
            const {payload} = await dispatch(userSendContactMessageRequired(message))
            if(payload?.status === "ok"){
                setMessage({
                    name: "",
                    phone: "",
                    email: "",
                    secondEmail: "",
                    message: "",
                    department: "Construction",
                    contact: "Contacts"
                })
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
                <h2>{translation.contacts[language]}</h2>
            </div>
            <div className="contactsMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d378.5530309927235!2d43.97141182851843!3d40.62052497993605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sam!4v1708019536063!5m2!1sru!2sam" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

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
                        
                        <Button title={translation.submit[language]} loading={loading}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contacts