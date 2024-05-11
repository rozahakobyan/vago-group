import React from "react";
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";

const language = Account.getLanguage();

function Contacts() {
    return (
        <div className="contactsArea">
            <div className="contactsTitle">
                <h2>{translation.contacts[language]}</h2>
            </div>
            <div className="contactsMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d378.5530309927235!2d43.97141182851843!3d40.62052497993605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sam!4v1708019536063!5m2!1sru!2sam" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className="contactsFormArea">
                <div className="contacts-Area">
                    <form>
                        <input type={translation.offerName[language]} placeholder={"Name"} />
                        <input type={"email"} placeholder={"Email"} />
                        <input type={"text"} placeholder={translation.offerPhone[language]} />
                        <textarea placeholder={translation.offerMessage[language]} /><br/>
                        <button type={"submit"}>{translation.submit[language]}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contacts