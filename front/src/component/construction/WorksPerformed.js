import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsListRequest } from "../../store/actions/projects";
import { API_URL } from "../../Api"

function WorksPerformed() {
    const dispatch = useDispatch();

    const projectsList = useSelector(state => state.projects.projectsList);

    useEffect(() => {
        dispatch(projectsListRequest({ status: "ended" }))
    }, []);

    console.log(projectsList)

    return (
        <div className="worksPerformed-area">
            <div className="worksPerformed-title">
                <h2>Works Performed</h2>
            </div>
            <div className="worksPerformed-blocks">
                {projectsList && projectsList.map(p => (
                    <div className="worksPerformed" key={p.id}>
                        <div className="worksPerformedImg">
                            <img src={`${API_URL}/${p.image}`} alt={""} />
                        </div>
                        <div className="workPerformed-title">
                            <h2>{p.name}</h2>
                        </div>
                        <div className="worksPerformed-text">
                            <p>{p.description}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default WorksPerformed