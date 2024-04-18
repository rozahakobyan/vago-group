import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import Button from "../Button";
import {AiFillDelete} from "react-icons/ai";
import {isLoading, schedulesDeleteRequest, worksUpdateRequest } from '../../store/actions/works';
import Select from "react-select";

const departments = [
    {value: "Construction", label: "Construction"},
    {value: "EmploymentAgency", label: "Employment Agency"},
    {value: "Logistic", label: "Logistic"}
]

function UpdateItemWork({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [textError, setTextError] = useState("");

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, department: selectedOption.label})
    }, [updateItem])

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChange = useCallback((text, path) => {
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleDeleteSchedule = useCallback((e, index) => {
        e.preventDefault();
        updateItem.schedule.splice(index, 1);
        setUpdateItem({...updateItem, schedule: [...updateItem.schedule]})
    }, [updateItem])

    const handleDeleteSchedules = useCallback(async(e, item) => {
        e.preventDefault();
        const filterDate = updateItem.schedules.filter(i => {
            if (i.id !== item.id) {
                return item
            }
        });
        const {payload} = await dispatch(schedulesDeleteRequest(item.id))
        if(payload.status === "ok"){
            setUpdateItem({...updateItem, schedules: filterDate})
        }
    }, [updateItem])

    const handleSchedule = useCallback((e) => {
        e.preventDefault()
        if(text.trim().match(/^\d{2}:\d{2}(\s?)-\1\d{2}:\d{2}$/gm)){
            if(updateItem.schedule){
                setUpdateItem({...updateItem, schedule: [...updateItem.schedule, text]})
            }else{
                setUpdateItem({...updateItem, schedule: [text]})
            }
            setText("")
            setTextError("")
        }else{
            setTextError("Invalid format !!")
        }
    }, [updateItem, text]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(worksUpdateRequest(updateItem))
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
                            <Select defaultValue={{value: updateItem.department, label: updateItem.department}}
                                    options={departments}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Departments...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                            />
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
                                        <div key={d.id}>
                                            <p>{d.date}</p>
                                            <AiFillDelete onClick={(e) => handleDeleteSchedules(e, d)}/>
                                        </div>
                                    ))}
                                </div>}

                                {updateItem.schedule && <div className={"list"}>
                                    {updateItem.schedule.map((text, i) => (
                                        <div key={i}>
                                            <p>{text}</p>
                                            <AiFillDelete onClick={(e) => handleDeleteSchedule(e, i)}/>
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