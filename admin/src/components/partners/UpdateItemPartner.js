import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, partnersUpdateRequest } from '../../store/actions/partners';
import {NavLink} from "react-router-dom";

function UpdateItemPartner({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [nameOpen, setNameOpen] = useState(false);

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setNameOpen(false)
    }, [updateItem]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setUpdateItem({...updateItem, translation: {...updateItem.translation,
                [path]: {...updateItem.translation[path], [val]: text}}});
    }, [updateItem]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, image: file})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(partnersUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_partner container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <h3 onClick={() => {
                                setNameOpen(!nameOpen)
                            }}>Name  {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                            {nameOpen && <div className={"open_input"}>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.en.name}
                                        onChange={(e) => handleChangeText(e, "en", "name")}
                                        placeholder={'English name...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.ru.name}
                                        onChange={(e) => handleChangeText(e, "ru", "name")}
                                        placeholder={'Russian name...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.am.name}
                                        onChange={(e) => handleChangeText(e, "am", "name")}
                                        placeholder={'Armenian name...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.pl.name}
                                        onChange={(e) => handleChangeText(e, "pl", "name")}
                                        placeholder={'Polish name...'}
                                        type="text"/>
                                </div>
                            </div>
                            }
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

export default UpdateItemPartner;