import React from "react";

function Logistic_contacts(){
    return(
        <div className="logistic-contactsArea">
            <div className="logistic-contactsTitle">
                <h2>Contacts</h2>
            </div>
            <div className="logistic-contactsMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d378.5530309927235!2d43.97141182851843!3d40.62052497993605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sam!4v1708019536063!5m2!1sru!2sam" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className="logistic-contactsFormArea">
                <div className="logistic-contacts-Area">
                    <form>
                        <input type={"text"} placeholder={"Name"} />
                        <input type={"email"} placeholder={"Email"} />
                        <input type={"text"} placeholder={"Phone"} />
                        <textarea placeholder={"Massage"} /><br/>
                        <button type={"submit"}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Logistic_contacts