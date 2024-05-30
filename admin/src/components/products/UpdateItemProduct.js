import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import { isLoading, productsUpdateRequest } from '../../store/actions/products';
import activePricePage from "../../assets/data/activePricePage";
import Select from "react-select";
import currencyList from "../../assets/data/currencyList";

function UpdateItemProduct({updateItem, setUpdateItem}) {
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

    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setUpdateItem({...updateItem, [path]: text})
    }, [updateItem]);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, currency: selectedOption.label})
    }, [updateItem])

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(productsUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_product container_modal'}>
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
                            <div className={'input_item'}>
                                <input
                                    onChange={(e) => handleChange(e, "price")}
                                    value={updateItem.price || ''}
                                    type="number"
                                />
                            </div>

                            <Select defaultValue={{value: updateItem.currency, label: updateItem.currency}}
                                    options={currencyList}
                                    onChange={handleSelectChange}
                                    placeholder={<div>Currency...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                            />

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

export default UpdateItemProduct;