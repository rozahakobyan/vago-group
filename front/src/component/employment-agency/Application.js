import React from 'react'


function Application() {
    return (
        <div className="contactsArea">
            <div className="contactsTitle">
                <h2>Application</h2>
            </div>
            <div className="contactsFormArea">
                <div className="contacts-Area">
                    <form>
                        <input type={"text"} placeholder={"Name"} />
                        <input type={"email"} placeholder={"Email"} />
                        <input type={"text"} placeholder={"Phone"} />
                        <textarea placeholder={"Massage"} /><br />
                        <button type={"submit"}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Application


