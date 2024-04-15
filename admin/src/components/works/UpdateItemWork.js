import React, {useCallback, useState} from 'react';
import {isLoading, massagerUpdateRequest} from "../../store/actions/massagers";
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import Button from "../Button";
import {AiFillDelete} from "react-icons/ai";

function UpdateItemWork({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [textError, setTextError] = useState("");

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChange = useCallback((text, path) => {
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleSchedule = useCallback((e) => {
        e.preventDefault()
        if(text.trim().match(/^\d{2}:\d{2}(\s?)-\1\d{2}:\d{2}$/gm)){
            // setUpdateItem({...updateItem, schedule: [...updateItem?.schedule, text]})
            setText("")
            setTextError("")
        }else{
            setTextError("Invalid format !!")
        }
    }, [updateItem, text]);

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
            <CustomsPortal className={'update_work container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "name")}
                                    value={updateItem.name || ''}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "department")}
                                    value={updateItem.department || ''}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "price")}
                                    value={updateItem.price || ''}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "hoursWeek")}
                                    value={updateItem.hoursWeek || ''}
                                    type="number"
                                />
                            </div>
                            <div className={"work_schedule"}>
                                <div className={"schedule"}>
                                    <div className={"input_item"}>
                                        <input
                                            placeholder={'00:00 - 00:00'}
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            type="text"/>
                                    </div>
                                    <Button title={"Add"} onClick={handleSchedule}/>
                                </div>
                                {textError ? <small className={'errors_message'}>{textError}</small> : null}
                                {updateItem?.schedules && <div className={"list"}>
                                    {updateItem?.schedules.map(d => (
                                        <div>
                                            <p key={d.id}>{d.date}</p>
                                            <AiFillDelete />
                                        </div>
                                    ))}
                                </div>}

                                {updateItem.schedule && <div className={"list"}>
                                    {updateItem.schedule.map((text, i) => (
                                        <div>
                                            <p key={i}>{text}</p>
                                            <AiFillDelete />
                                        </div>
                                    ))}
                                </div>}
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    onChange={(e) => handleChange(e.target.value, "description")}
                                    value={updateItem.description}
                                    placeholder={'Description text...'}/>
                            </div>
                            <div className={'row_img'}>
                                <div>
                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemWork;