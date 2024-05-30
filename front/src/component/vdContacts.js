import React, {useCallback, useEffect, useState} from "react";
import { Account } from "../helpers/Account";
import translation from "../assets/data/translation";
import {useDispatch, useSelector} from "react-redux";
import {userSendMessageRequired} from "../store/actions/users";

const language = Account.getLanguage();

function VDContacts() {
    const dispatch = useDispatch()

    const work = useSelector(state => state.works.work)
    const errors = useSelector(state => state.users.errors)
    const loading = useSelector(state => state.users.loading)
    const messages = useSelector(state => state.users.message)

    const [message, setMessage] = useState({
        name: "Roza",
        phone: "+3749989898",
        email: "rhakobyan290@gmail.com",
        message: "hello",
        vacancyName: "hgjbnj"
    })

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setMessage({...message, [path]: text})
    }, [message])

    const submit = useCallback((e) => {
        e.preventDefault()
        dispatch(userSendMessageRequired(message))
    }, [message])

    return (
        <div className="contactsArea">
            <div className="contactsFormArea">
                <div className="contacts-Area">
                    <form onSubmit={submit}>
                        <input type={translation.offerName[language]} placeholder={"Name"} />
                        <input type={"email"} placeholder={"Email"} />
                        <input type={"text"} placeholder={translation.offerPhone[language]} />
                        <textarea placeholder={translation.offerMessage[language]} /><br/>
                        {errors?.exsist && <p>{errors.exsist}</p>}
                        {messages && <p>{messages}</p>}
                        <button type={"submit"}>{translation.submit[language]}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VDContacts