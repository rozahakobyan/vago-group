import React from 'react';
import Wrapper from "../component/Wrapper";

function HomeInfo() {
    return (
        <Wrapper helmetTitle={"Home Info"}>
            <section className={"homeInfo"}>
                <form>
                    <h3>Add new info</h3> <br/>
                    <input type={"text"} placeholder={"title"}/> <br/>
                    <input type={"textarea"} placeholder={"description"}/> <br/>

                    <label className="input-file">
                        <input type="file"/>
                        <span>Choose file</span>
                    </label>
                    <input type={"submit"} value={"Save"}/>

                </form>
            </section>
        </Wrapper>
    );
}

export default HomeInfo;