import React from 'react';
import Wrapper from "../component/Wrapper";

function HomeInfo() {
    return (
        <Wrapper helmetTitle={"Home Info"}>
            <section className={"homeInfo"}>
                <form>
                    <input type={"text"} placeholder={"title"}/>
                    <input type={"text"} placeholder={"description"}/>
                    <input type={"file"} />
                    <button type={"submit"}></button>
                </form>
            </section>
        </Wrapper>
    );
}

export default HomeInfo;