import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import { isLoading, packagesUpdateRequest } from '../../store/actions/packages';
import Button from "../Button";
import activePricePage from "../../assets/data/activePricePage";
import Select from "react-select";

function UpdateItemPackages({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, activePage: selectedOption.label})
    }, [updateItem])

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(packagesUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_package container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "name")}
                                    value={updateItem.name}
                                    placeholder={"name updateItem..."}
                                    type="text"
                                />
                            </div>

                            <Select defaultValue={{value: updateItem.activePage, label: updateItem.activePage}}
                                    options={activePricePage}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Page...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                            />

                            <div className={'input_item'}>
                                <label> Active advanced
                                    <input
                                        checked={updateItem.advanced}
                                        onChange={(e) => handleChangeActive(e, "advanced")}
                                        type="checkbox"/>
                                </label>
                            </div>

                            <div className={'input_item'}>
                                <label> Active premium
                                    <input
                                        checked={updateItem.premium}
                                        onChange={(e) => handleChangeActive(e, "premium")}
                                        type="checkbox"/>
                                </label>
                            </div>

                            <div className={'input_item'}>
                                <label> Active standard
                                    <input
                                        checked={updateItem.standard}
                                        onChange={(e) => handleChangeActive(e, "standard")}
                                        type="checkbox"/>
                                </label>
                            </div>
                            <Button title={'Save'} onClick={handleSave}/>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemPackages;