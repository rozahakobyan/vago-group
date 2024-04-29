import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Project from "../../../../components/projects/Project";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { projectsListRequest } from '../../../../store/actions/projects';

function Projects() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.projects.loading);
    const projectsList = useSelector(state => state.projects.projectsList);

    useEffect(() => {
        dispatch(projectsListRequest())
    }, []);

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
            </div>
        </div>
    );
}

export default Projects;

