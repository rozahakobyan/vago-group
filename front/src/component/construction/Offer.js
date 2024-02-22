import React from "react";

function Offer() {
    return (
        <div className="offersArea">
            <div className="formArea">
                <div className="offers-title">
                    <h2>Offer</h2>
                </div>
                <form>
                    <input type={"text"} placeholder={"Name"} />
                    <input type={"email"} placeholder={"Email"} />
                    <input type={"text"} placeholder={"Phone"} />
                    <textarea placeholder={"Massage"} />
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Offer