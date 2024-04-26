import React, {useCallback} from 'react';
import {isLoading, massagerUpdateRequest} from "../../store/actions/massagers";
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";

function UpdateItemMassager({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChange = useCallback((e) => {
        const text = e.target.value
        setUpdateItem({...updateItem, name: text})
    }, [updateItem]);

    const handleChangeFile = useCallback((e, path) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, [path]: file})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(massagerUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_massager container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={handleChange}
                                    value={updateItem.name || ''}
                                    type="text"
                                />
                            </div>
                            <div className={'row_img'}>
                                <div>
                                    <p>Header Icon</p>
                                    <div className={'custom-file'}>
                                        <label
                                            htmlFor="file-upload"
                                            className="custom-file-upload">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "headerIcon")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload"
                                            type="file"/>
                                    </div>
                                    <p>Footer Icon</p>
                                    <div className={'custom-file'}>
                                        <label
                                            htmlFor="file-upload2"
                                            className="custom-file-upload">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "footerIcon")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload2"
                                            type="file"/>
                                    </div>
                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                                <div style={{marginTop: 30}}>
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.headerIcon?.name
                                                ? URL.createObjectURL(updateItem.headerIcon)
                                                : `${API_URL}/${updateItem.headerIcon}`}
                                             alt={updateItem.name}/>
                                    </div>
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.footerIcon?.name
                                                ? URL.createObjectURL(updateItem.footerIcon)
                                                : `${API_URL}/${updateItem.footerIcon}`}
                                             alt={updateItem.name}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemMassager;