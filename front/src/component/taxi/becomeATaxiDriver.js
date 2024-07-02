import React, { useCallback, useEffect, useState } from "react";
import translation from "../../assets/data/translation";
import { Account } from "../../helpers/Account";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ourAdvantagesListRequest } from "../../store/actions/ourAdvantages";
import { ourAdvantagesTaxiListRequest } from "../../store/actions/ourAdvantagesTaxi";
import { API_URL } from "../../Api";
import { useNavigate } from "react-router-dom";


function TaxiDriver() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = Account.getLanguage();

    const ourAdvantagesTaxiList = useSelector(state => state.ourAdvantagesTaxi.ourAdvantagesTaxiList)
    const loading = useSelector(state => state.users.loading)



    const car = useSelector(state => state.cars.car)
    const profile = useSelector(state => state.users.profile)
    const token = useSelector(state => state.users.token)

    const [message, setMessage] = useState({
        "department": "Taxi",
        name: "",
        phone: "",
        email: '',
    })
    const [error, setError] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        dispatch(ourAdvantagesTaxiListRequest({ active: true }))
    }, []);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        if (token) {
            setMessage({ ...message, email: profile.email, [path]: text })
        } else {
            setMessage({ ...message, [path]: text })
        }
    }, [message, car, profile, token])


    const submit = useCallback(async (e) => {
        e.preventDefault()
        console.log(message)
        const formID = 'xleqqvoy';
        const formURL = `https://formspree.io/f/${formID}`;
        if (token) {
            const response = await axios.post(formURL, message);
            console.log(response)
            if (response?.status === 200) {
                setMessage({
                    "department": "taxi",
                    name: "",
                    phone: "",
                    email: "",
                })
                setMessages("Successfully massage")
            } else {
                setMessages("")
            }
            setError("")

        } else {
            setError("Login your account")
            setTimeout(() => {
                return navigate("/login");
            }, 5000)
        }
    }, [message, token])

    return (
        <>
            {ourAdvantagesTaxiList && ourAdvantagesTaxiList.map(tb => (
                <div className="becomeTaxiDriver" key={tb.id}>
                    <div className="becomeTaxiDriverBox" >
                        <div className="imageBoxArea" style={{
                            width: "320px",
                            backgroundImage: `url(${API_URL}/${tb.image})`,
                            backgroundRepeat: "none",
                            backgroundPosition: "center",
                            margin: "25px",
                            backgroundSize: "cover",
                            textAlign: "center",
                            height: "400px",
                            color: `${tb.color}`,
                        }}>
                            <strong>{tb.translation[language].text}</strong>
                        </div>
                        <div className="FormBoxArea">
                            <form onSubmit={submit}>
                                <label><strong>{translation.BecomATaxiDriverInfo[language]}</strong></label>
                                <input type={'text'} placeholder={translation.offerName[language]}
                                    onChange={(e) => handleChange(e, "name")} />
                                <input type={"text"} placeholder={translation.offerPhone[language]}
                                    onChange={(e) => handleChange(e, "phone")} />
                                {error && <p>{error}</p>}
                                {messages && <p>{messages}</p>}

                                <Button title={translation.submit[language]} />
                            </form>
                        </div>

                    </div>
                </div>
            ))}
        </>


    )
}

export default TaxiDriver