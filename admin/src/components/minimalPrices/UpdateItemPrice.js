import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import Button from "../Button";
import {isLoading, minimalPricesUpdateRequest} from "../../store/actions/minimalPrices";

function UpdateItemPrice({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleChangeMin = useCallback((e, path) => {
        const text = e.target.value;
        setUpdateItem({...updateItem, min: {...updateItem.min, [path]: text}});
    }, [updateItem]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(minimalPricesUpdateRequest(updateItem))
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
                                    onChange={(e) => handleChange(e, "eur")}
                                    value={updateItem.eur}
                                    placeholder={"eur price..."}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "usd")}
                                    value={updateItem.usd}
                                    placeholder={"usd price..."}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "rub")}
                                    value={updateItem.rub}
                                    placeholder={"rub price..."}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "amd")}
                                    value={updateItem.amd}
                                    placeholder={"amd price..."}
                                    type="number"
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
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChangeMin(e, "eur")}
                                    value={updateItem.min.eur}
                                    placeholder={"eur min price..."}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChangeMin(e, "usd")}
                                    value={updateItem.min.usd}
                                    placeholder={"usd min price..."}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChangeMin(e, "rub")}
                                    value={updateItem.min.rub}
                                    placeholder={"rub min price..."}
                                    type="number"
                                />
                            </div>
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChangeMin(e,"amd")}
                                    value={updateItem.min.amd}
                                    placeholder={"amd min price..."}
                                    type="number"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemPrice;