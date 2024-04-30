import React, {useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsListRequest } from "../../store/actions/projects";
import { API_URL } from "../../Api"

function CurrentProjects() {

    const dispatch = useDispatch();

    const list = useSelector(state => state.projects.projectsList);

    const projectsList = useMemo(() => {
        return list.filter(l => {
            if(l.status === "pending"){
                return l;
            }
        })
    }, [list])

    useEffect(() => {
        dispatch(projectsListRequest())
    }, []);

    console.log(projectsList)

    return (
        <div className="currentProjects-area">
            <div className="currentProjects-title">
                <h2>Current Projects</h2>
            </div>
            <div className="currentProjects-blocks">
                {projectsList && projectsList.map(p => (
                    <div className="currentProject" key={p.id}>
                        <div className="currentProjectImg">
                            <img src={`${API_URL}/${p.image}`} alt={""} />
                        </div>
                        <div className="currentProject-title">
                            <h2>{p.name}</h2>
                        </div>
                        <div className="currentProject-text">
                            <p>{p.description}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default CurrentProjects