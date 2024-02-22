import Wrapper from "../component/Wrapper";
import Banner from "../component/construction/Banner";
import Vacancies from "../component/construction/Vacancies";
import CurrentProjects from "../component/construction/CurrentProjects";
import WorksPerformed from "../component/construction/WorksPerformed";
import Offer from "../component/construction/Offer";
import Gallery from "../component/construction/Gallery";
import Contacts from "../component/construction/Contacts";

function Construction(){
    return(
        <Wrapper helmetTitle={"construction"}>
            <Banner />
            <Vacancies />
            <WorksPerformed/>
            <CurrentProjects/>
            <Offer />
            <Gallery/>
            <Contacts/>
        </Wrapper>
    )
}



export default Construction