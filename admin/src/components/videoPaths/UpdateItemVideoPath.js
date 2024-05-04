import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {isLoading, videoPathsUpdateRequest } from '../../store/actions/videoPath';
import Select from "react-select";
import videoPage from "../../assets/data/videoPage";
import {NavLink} from "react-router-dom";

function UpdateItemVideoPath({path, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [text, setText] = useState("");

    useEffect(() => {
        if(text.trim().match(/^https?:\/\/(w{3})?.?youtu.be(\/.+)?/gm)){
            setUpdateItem({...updateItem, path: text});
        }
    }, [updateItem, text]);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, pageVideo: selectedOption.label})
    }, [updateItem])

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(videoPathsUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_video-path container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <NavLink to={updateItem.path}>{updateItem.path}</NavLink>
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                    placeholder={"Path..."}
                                    type="text"
                                />
                            </div>
                            <Select defaultValue={{value: updateItem.pageVideo, label: updateItem.pageVideo}}
                                    options={videoPage}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Page...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                            />
                            <div className={'row_img'}>
                                <div>
                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemVideoPath;