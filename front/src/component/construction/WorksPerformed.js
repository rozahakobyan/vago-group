import React, {useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsListRequest } from "../../store/actions/projects";
import { API_URL } from "../../Api"

function WorksPerformed() {
    const dispatch = useDispatch();

    const list = useSelector(state => state.projects.projectsList);

    const projectsList = useMemo(() => {
        return list.filter(l => {
            if(l.status === "ended"){
                return l;
            }
        })
    }, [list])

    useEffect(() => {
        dispatch(projectsListRequest())
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