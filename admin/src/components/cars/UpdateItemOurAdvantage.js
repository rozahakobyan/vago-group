import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, ourAdvantagesUpdateRequest } from '../../store/actions/ourAdvantages';

function UpdateItemOurAdvantage({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [textOpen, setTextOpen] = useState(false);
    
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setTextOpen(false)
    }, [updateItem]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setUpdateItem({...updateItem, translation: {...updateItem.translation,
                [path]: {...updateItem.translation[path], [val]: text}}});
    }, [updateItem]);

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
        const {payload} = await dispatch(ourAdvantagesUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_advantage container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <h3 onClick={() => {
                                setTextOpen(!textOpen)
                            }}>Text {textOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                            {textOpen && <div className={"open_input"}>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.en.text}
                                        onChange={(e) => handleChangeText(e, "en", "text")}
                                        placeholder={'English text...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.ru.text}
                                        onChange={(e) => handleChangeText(e, "ru", "text")}
                                        placeholder={'Russian text...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.am.text}
                                        onChange={(e) => handleChangeText(e, "am", "text")}
                                        placeholder={'Armenian text...'}
                                        type="text"/>
                                </div>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.translation.pl.text}
                                        onChange={(e) => handleChangeText(e, "pl", "text")}
                                        placeholder={'Polish text...'}
                                        type="text"/>
                                </div>
                            </div>
                            }
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "color")}
                                    value={updateItem.color}
                                    type="text"
                                />
                            </div>

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

export default UpdateItemOurAdvantage;