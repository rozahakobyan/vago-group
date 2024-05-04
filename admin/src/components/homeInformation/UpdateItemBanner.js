import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import {bannerUpdateRequest, isLoading} from "../../store/actions/banner";

function UpdateItemBanner({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value;
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleChangeFile = useCallback((e, path) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, [path]: file})
    }, [updateItem]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(bannerUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_banner container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChangeText(e, "title")}
                                    value={updateItem.title || ''}
                                    type="text"
                                />
                            </div>

                            <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.description}
                                    onChange={(e) => handleChangeText(e, "description")}
                                    placeholder={'Description text...'}/>
                            </div>

                            <div className={'input_item'}>
                                <label> Active Login Image
                                    <input
                                        checked={updateItem.active}
                                        onChange={(e) => handleChangeActive(e, "active")}
                                        type="checkbox"/>
                                </label>
                            </div>

                            <div className={'row_img'}>
                                <div>
                                    <p>Home Image</p>
                                    <div className={'item_file_cat'}>
                                        <label
                                            htmlFor="file-upload"
                                            className="custom-file">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "homeImage")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload"
                                            type="file"/>
                                    </div>
                                    <p>Construction Image</p>
                                    <div className={'item_file_cat'}>
                                        <label
                                            htmlFor="file-upload2"
                                            className="custom-file">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "constructionImage")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload2"
                                            type="file"/>
                                    </div>
                                    <p>Employment Agency Image</p>
                                    <div className={'item_file_cat'}>
                                        <label
                                            htmlFor="file-upload3"
                                            className="custom-file">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "employmentAgencyImage")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload3"
                                            type="file"/>
                                    </div>
                                    <p>Logistic Image</p>
                                    <div className={'item_file_cat'}>
                                        <label
                                            htmlFor="file-upload4"
                                            className="custom-file">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "logisticImage")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload4"
                                            type="file"/>
                                    </div>
                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                                <div>
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.homeImage?.name
                                                ? URL.createObjectURL(updateItem.homeImage)
                                                : `${API_URL}/${updateItem.homeImage}`}
                                             alt={""}/>
                                    </div>
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.constructionImage?.name
                                                ? URL.createObjectURL(updateItem.constructionImage)
                                                : `${API_URL}/${updateItem.constructionImage}`}
                                             alt={""}/>
                                    </div>
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.employmentAgencyImage?.name
                                                ? URL.createObjectURL(updateItem.employmentAgencyImage)
                                                : `${API_URL}/${updateItem.employmentAgencyImage}`}
                                             alt={""}/>
                                    </div>
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.logisticImage?.name
                                                ? URL.createObjectURL(updateItem.logisticImage)
                                                : `${API_URL}/${updateItem.logisticImage}`}
                                             alt={""}/>
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

export default UpdateItemBanner;