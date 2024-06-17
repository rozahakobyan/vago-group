import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import translation from "../../assets/data/translation";
import {Account} from "../../helpers/Account";
import {userSendContactMessageRequired} from "../../store/actions/users";
import Button from "../Button";

function Offer() {
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
        contact: "Offer"
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
                    contact: "Offer"
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
        <div className="offersArea">
            <div className="formArea">
                <div className="offers-title">
                    <h2>{translation.offer[language]}</h2>
                </div>
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
                    
                    <Button title={translation.submit[language]} loading={loading} className='submit-button'/>
                </form>
            </div>
        </div>
    )
}

export default Offer