import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {videoPathsDeleteRequest} from "../../store/actions/videoPath";
import UpdateItemVideoPath from "./UpdateItemVideoPath";

function VideoPath({videoPath, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(videoPathsDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((videoPath) => () => {
        setUpdateItem(videoPath)
    }, []);

    return (
        <div className={'item'}>
            <h3>Page - {videoPath.pageVideo}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(videoPath)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(videoPath.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemVideoPath
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default VideoPath;