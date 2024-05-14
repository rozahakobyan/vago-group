import React, {useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsListRequest } from "../../store/actions/projects";
import { API_URL } from "../../Api"
import {Account} from "../../helpers/Account";
import translation from "../../assets/data/translation";


function CurrentProjects() {
    const dispatch = useDispatch();

    const list = useSelector(state => state.projects.projectsList);

    const language = Account.getLanguage();

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

    

    return (
        <div className="currentProjects-area">
            <div className="currentProjects-title">
                <h2>{translation.completedProjects[language]}</h2>
            </div>
            <div className="currentProjects-blocks">
                {projectsList && projectsList.map(p => (
                    <div className="currentProject" key={p.id}>
                        <div className="currentProjectImg">
                            <img src={`${API_URL}/${p.image}`} alt={""} />
                        </div>
                        <div className="currentProject-title">
                            <h2>{p.translation[language].name}</h2>
                        </div>
                        <div className="currentProject-text" style={{
                                textAlign: "center"
                            }}>
                            <p>{p.translation[language].description}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default CurrentProjects