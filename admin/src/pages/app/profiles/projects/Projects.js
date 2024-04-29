import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Project from "../../../../components/projects/Project";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { projectsListRequest } from '../../../../store/actions/projects';
import ReactPaginate from "react-paginate";

function Projects() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);
    const [page, setPage] = useState(1);

    const loading = useSelector(state => state.projects.loading);
    const projectsList = useSelector(state => state.projects.projectsList);
    const pages = useSelector(state => state.projects.pages);

    useEffect(() => {
        dispatch(projectsListRequest({page}))
    }, [page]);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'projects childrenWidth'}>
            <Helmet>
                <title>all projects</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : projectsList.map(item =>
                            <Project
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                project={item}/>)
                }
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
                        previousLabel={"<"}/> : null}
                </div>
            </div>
        </div>
    );
}

export default Projects;

