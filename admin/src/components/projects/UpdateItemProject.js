import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, projectsUpdateRequest } from '../../store/actions/projects';
import Select from "react-select";
import status from "../../assets/data/status";

function UpdateItemProject({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [nameOpen, setNameOpen] = useState(false);
    const [descOpen, setDescOpen] = useState(false);

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setNameOpen(false)
        setDescOpen(false)
    }, [updateItem]);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, status: selectedOption.label})
    }, [updateItem])

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        if(text.length <= 300){
            setUpdateItem({...updateItem, translation: {...updateItem.translation,
                    [path]: {...updateItem.translation[path], [val]: text}}});
            setError("")
        }else{
            setError("Text Long !!!")
        }
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
                            <h3 onClick={() => {
                                setNameOpen(!nameOpen)
                                setDescOpen(false)
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
                            </div>}
                            <h3 onClick={() => {
                                setDescOpen(!descOpen)
                                setNameOpen(false)
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
                            {error ? <small>{error}</small> : null}
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