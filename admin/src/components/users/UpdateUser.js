import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, usersUpdateRequest } from '../../store/actions/users';
import {NavLink} from "react-router-dom";
import usersRole from "../../assets/data/usersRole";
import Select from "react-select";

function UpdateUser({updateItem, setUpdateItem, page}) {
    const dispatch = useDispatch();

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, role: selectedOption.value})
    }, [updateItem])

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(usersUpdateRequest({updateItem, page}))
        if (!payload?.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_user container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <Select options={usersRole}
                                    defaultValue={{value: updateItem.role, label: updateItem.role}}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Users Role...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                            />
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

export default UpdateUser;