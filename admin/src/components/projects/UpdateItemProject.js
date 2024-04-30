import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, projectsUpdateRequest } from '../../store/actions/projects';
import Select from "react-select";
import status from "../../assets/data/status";

function UpdateItemProject({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, status: selectedOption.label})
    }, [updateItem])

    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setUpdateItem({...updateItem, [path]: text})
    }, [updateItem]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, image: file})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(projectsUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_project container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "name")}
                                    value={updateItem.name || ''}
                                    type="text"
                                />
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.description}
                                    onChange={(e) => handleChange(e, "description")}
                                    placeholder={'Description text...'}/>
                            </div>
                            <Select defaultValue={{value: updateItem.status, label: updateItem.status}}
                                    options={status}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Status...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                            />
                            <div className={'row_img'}>
                                <div>
                                    <div className={'custom-file'}>
                                        <label
                                            htmlFor="file-upload"
                                            className="custom-file-upload">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={handleChangeFile}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload"
                                            type="file"/>
                                    </div>
                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                                <div className={'images'}>
                                    <img src={
                                        updateItem?.image?.name
                                            ? URL.createObjectURL(updateItem.image)
                                            : `${API_URL}/${updateItem.image}`}
                                         alt={updateItem.name}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemProject;