import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, servicesUpdateRequest } from '../../store/actions/services';

function UpdateItemService({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, image: file})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(servicesUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_service container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "name")}
                                    value={updateItem.name}
                                    placeholder={"name services..."}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "number")}
                                    value={updateItem.number}
                                    placeholder={"number..."}
                                    type="text"
                                />
                            </div>
                            <button onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemService;