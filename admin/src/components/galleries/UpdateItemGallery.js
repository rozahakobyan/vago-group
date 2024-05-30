import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import {galleriesUpdateRequest, isLoading} from "../../store/actions/galleries";
import Select from "react-select";
import galleryPage from "../../assets/data/galleryPage";

function UpdateItemGallery({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, pageGallery: selectedOption.label})
    }, [updateItem])

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, src: file})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(galleriesUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_gallery container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <Select defaultValue={{value: updateItem.pageGallery, label: updateItem.pageGallery}}
                                    options={galleryPage}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Page...</div>}
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
                                        updateItem?.src?.name
                                            ? URL.createObjectURL(updateItem.src)
                                            : `${API_URL}/${updateItem.src}`}
                                         alt={""}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemGallery;