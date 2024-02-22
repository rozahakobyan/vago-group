import Partners from "../component/home/Partners";
import Main from "../component/home/Main";
import Wrapper from "../component/Wrapper";

function Home(){
    return (
        <Wrapper helmetTitle={"Home"}>
            <Main />
            <Partners/>
        </Wrapper>
    )
}

export default Home;