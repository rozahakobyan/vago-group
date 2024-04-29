import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import { projectsDeleteRequest } from '../../store/actions/projects';
import UpdateItemProject from './UpdateItemProject';

function Project({project, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(projectsDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((project) => () => {
        setUpdateItem(project)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${project.image}`} alt={project.name}/>
            <h3>Project - {project.name}</h3>
            <h3>Status - {project.status}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(project)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(project.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemProject
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Project;