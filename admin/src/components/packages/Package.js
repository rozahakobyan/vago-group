import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import { packagesDeleteRequest } from '../../store/actions/packages';
import UpdateItemPackages from "./UpdateItemPackages";

function Package({packages, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(packagesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((packages) => () => {
        setUpdateItem(packages)
    }, []);

    return (
        <div className={"item"}>
            <h3>{packages.name}</h3>
            <h3>Page - {packages.activePage}</h3>
            <h3>Advanced - {packages.advanced ? "✔️" : "❌"}</h3>
            <h3>Premium - {packages.premium ? "✔️" : "❌"}</h3>
            <h3>Standard - {packages.standard ? "✔️" : "❌"}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(packages)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(packages.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemPackages
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Package;