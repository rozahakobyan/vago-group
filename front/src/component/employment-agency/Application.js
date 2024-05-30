import React from 'react'
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";

const language = Account.getLanguage();

function Application() {
    return (
        <div className="contactsArea">
            <div className="contactsTitle">
                <h2>{translation.application[language]}</h2>
            </div>
            <div className="contactsFormArea">
                <div className="contacts-Area">
                    <form>
                        <input type={"text"} placeholder={translation.offerName[language]} />
                        <input type={"email"} placeholder={"Email"} />
                        <input type={"text"} placeholder={translation.offerPhone[language]} />
                        <textarea placeholder={translation.offerMessage[language]} /><br />
                        <button type={"submit"}>{translation.submit[language]}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Application


