import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {projectsListToEndedRequest} from "../../store/actions/projects";
import { API_URL } from "../../Api"
import { Account } from "../../helpers/Account";
import translation from "../../assets/data/translation";
import ReactPaginate from "react-paginate";

function CurrentProjects() {
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    const pages = useSelector(state => state.projects.pagesToEnded);
    const projectsList = useSelector(state => state.projects.projectsListToEnded);

    const language = Account.getLanguage();

    useEffect(() => {
        dispatch(projectsListToEndedRequest({ page, limit: 4 }))
    }, [page]);

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
            <div className={"pages-list"}>
                    {pages && pages > 1 ? <ReactPaginate
                        activeClassName={'items active '}
                        breakClassName={'items break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"items next "}
                        nextLabel={">"}
                        initialPage={page - 1}
                        onPageChange={(ev) => setPage(ev.selected + 1)}
                        pageCount={pages}
                        pageClassName={'items pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"items previous"}
                        previousLabel={"<"} /> : null}
                </div>
        </div>
    )
}


export default CurrentProjects