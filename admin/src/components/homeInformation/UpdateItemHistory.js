import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import { isLoading, historiesUpdateRequest } from '../../store/actions/histories';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

function UpdateItemHistory({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [descOpen, setDescOpen] = useState(false);

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setDescOpen(false)
    }, [updateItem]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setUpdateItem({...updateItem, translation: {...updateItem.translation,
                [path]: {...updateItem.translation[path], [val]: text}}});
    }, [updateItem]);
    
    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(historiesUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_history container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>

                            <h3 onClick={() => {
                                setDescOpen(!descOpen)
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
                                <label> Active History
                                    <input
                                        checked={updateItem.active}
                                        onChange={(e) => handleChangeActive(e, "active")}
                                        type="checkbox"/>
                                </label>
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

export default UpdateItemHistory;