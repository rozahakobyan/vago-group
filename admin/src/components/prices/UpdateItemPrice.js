import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import { isLoading, pricesUpdateRequest } from '../../store/actions/prices';
import Button from "../Button";

function UpdateItemPrice({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

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
        const {payload} = await dispatch(pricesUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_price container_modal'}>
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
                                    placeholder={"name prices..."}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "advanced")}
                                    value={updateItem.advanced}
                                    placeholder={"advanced prices..."}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "premium")}
                                    value={updateItem.premium}
                                    placeholder={"premium prices..."}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "standard")}
                                    value={updateItem.standard}
                                    placeholder={"standard prices..."}
                                    type="text"
                                />
                            </div>
                            <div className={'input_item'}>
                                <label> Active Price
                                    <input
                                        checked={updateItem.active}
                                        onChange={(e) => handleChangeActive(e, "active")}
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

export default UpdateItemPrice;