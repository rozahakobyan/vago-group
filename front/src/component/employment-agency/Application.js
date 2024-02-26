import React from 'react'


function Application(){
    return(
        <div className="application-contactsArea">
            <div className="application-contactsTitle">
                <h2>Application</h2>
            </div>

            <div className="application-contactsFormArea">
                <div className="application-contacts-Area">
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


export default Application