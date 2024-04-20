import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {worksDeleteRequest} from "../../store/actions/works";
import UpdateItemWork from "./UpdateItemWork";
import {API_URL} from "../../Api";

function Work({work, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(worksDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((work) => () => {
        setUpdateItem(work)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${work.image}`} alt={""}/>
            <h3>Work - {work.name}</h3>
            <h3>Department - {work.department}</h3>
            <h3>Price - {work.price}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(work)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(work.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemWork
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Work;