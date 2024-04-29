import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {projectsListRequest} from "../../store/actions/projects";

function WorksPerformed() {
    const dispatch = useDispatch();

    const projectsList = useSelector(state => state.projects.projectsList);

    useEffect(() => {
        dispatch(projectsListRequest({status: "started"}))
    }, []);

    console.log(projectsList)

    return (
        <div className="worksPerformed-area">
            <div className="worksPerformed-title">
                <h2>Works Performed</h2>
            </div>
            <div className="worksPerformed-blocks">
                <div className="worksPerformed">
                    <div className="worksPerformedImg">
                        <img src="./img/gortsiq.jpg" alt={""} />
                    </div>
                    <div className="workPerformed-title">
                        <h2>Project</h2>
                    </div>
                    <div className="worksPerformed-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default WorksPerformed