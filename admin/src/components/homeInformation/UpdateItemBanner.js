import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import {bannerUpdateRequest, isLoading} from "../../store/actions/banner";

function UpdateItemBanner({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [titleOpen, setTitleOpen] = useState(false);
    const [descOpen, setDescOpen] = useState(false);

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setTitleOpen(false)
        setDescOpen(false)
    }, [updateItem]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setUpdateItem({...updateItem, translation: {...updateItem.translation,
                [path]: {...updateItem.translation[path], [val]: text}}});
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
                            <h3 onClick={() => {
                                setTitleOpen(!titleOpen)
                                setDescOpen(false)
                            }}>Title  {titleOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                            {titleOpen && <div className={"open_input"}>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.en.title}
                                        onChange={(e) => handleChangeText(e, "en", "title")}
                                        placeholder={'English title...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.ru.title}
                                        onChange={(e) => handleChangeText(e, "ru", "title")}
                                        placeholder={'Russian title...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.am.title}
                                        onChange={(e) => handleChangeText(e, "am", "title")}
                                        placeholder={'Armenian title...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.pl.title}
                                        onChange={(e) => handleChangeText(e, "pl", "title")}
                                        placeholder={'Polish title...'}
                                        type="text"/>
                                </div>
                            </div>
                            }
                            <h3 onClick={() => {
                                setDescOpen(!descOpen)
                                setTitleOpen(false)
                            }}>Description {descOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                            {descOpen && <div className={"open_input"}>
                                <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.en.description}
                                    onChange={(e) => handleChangeText(e, "en", "description")}
                                    placeholder={'English Description text...'}/>
                                </div>
                                <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.ru.description}
                                    onChange={(e) => handleChangeText(e, "ru", "description")}
                                    placeholder={'Russian Description text...'}/>
                                </div>
                                <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.am.description}
                                    onChange={(e) => handleChangeText(e, "am", "description")}
                                    placeholder={'Armenian Description text...'}/>
                                </div>
                                <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.pl.description}
                                    onChange={(e) => handleChangeText(e, "pl", "description")}
                                    placeholder={'Polish Description text...'}/>
                                </div>
                            </div>}

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
                                    <p>Taxi Image</p>
                                    <div className={'item_file_cat'}>
                                        <label
                                            htmlFor="file-upload5"
                                            className="custom-file">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={(e) => handleChangeFile(e, "taxiImage")}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload5"
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
                                    <div className={'images'}>
                                        <img src={
                                            updateItem?.taxiImage?.name
                                                ? URL.createObjectURL(updateItem.taxiImage)
                                                : `${API_URL}/${updateItem.taxiImage}`}
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