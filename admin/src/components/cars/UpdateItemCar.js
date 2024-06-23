import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import { isLoading, carsUpdateRequest } from '../../store/actions/cars';
import {API_URL} from "../../Api";

function UpdateItemCar({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [nameOpen, setNameOpen] = useState(false);
    const [fuelOpen, setFuelOpen] = useState(false);
    const [transmissionOpen, setTransmissionOpen] = useState(false);
    const [documentsOpen, setDocumentsOpen] = useState(false);
    const [bonusSystemOpen, setBonusSystemOpen] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false);

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setNameOpen(false)
        setFuelOpen(false)
        setTransmissionOpen(false)
        setDocumentsOpen(false)
        setBonusSystemOpen(false)
        setRulesOpen(false)
    }, [updateItem]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setUpdateItem({...updateItem, translation: {...updateItem.translation,
                [path]: {...updateItem.translation[path], [val]: text}}});
    }, [updateItem]);
    
    const handleChange = useCallback((e, path) => {
        const text = e.target.value;
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);
    
    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, image: file})
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(carsUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_car container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className="left_row">
                                <h3 onClick={() => {
                                    setNameOpen(!nameOpen)
                                    setFuelOpen(false)
                                    setTransmissionOpen(false)
                                    setDocumentsOpen(false)
                                    setBonusSystemOpen(false)
                                    setRulesOpen(false)
                                }}>Name {nameOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
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
                                <h3 onClick={() => {
                                    setNameOpen(false)
                                    setFuelOpen(!fuelOpen)
                                    setTransmissionOpen(false)
                                    setDocumentsOpen(false)
                                    setBonusSystemOpen(false)
                                    setRulesOpen(false)
                                }}>Fuel {fuelOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                                {fuelOpen && <div className={"open_input"}>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.en.fuel}
                                            onChange={(e) => handleChangeText(e, "en", "fuel")}
                                            placeholder={'English fuel...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.ru.fuel}
                                            onChange={(e) => handleChangeText(e, "ru", "fuel")}
                                            placeholder={'Russian fuel...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.am.fuel}
                                            onChange={(e) => handleChangeText(e, "am", "fuel")}
                                            placeholder={'Armenian fuel...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.pl.fuel}
                                            onChange={(e) => handleChangeText(e, "pl", "fuel")}
                                            placeholder={'Polish fuel...'}
                                            type="text"/>
                                    </div>
                                </div>
                                }
                                <h3 onClick={() => {
                                    setNameOpen(false)
                                    setFuelOpen(false)
                                    setTransmissionOpen(!transmissionOpen)
                                    setDocumentsOpen(false)
                                    setBonusSystemOpen(false)
                                    setRulesOpen(false)
                                }}> Transmission {transmissionOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                                {transmissionOpen && <div className={"open_input"}>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.en.transmission}
                                            onChange={(e) => handleChangeText(e, "en", "transmission")}
                                            placeholder={'English transmission...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.ru.transmission}
                                            onChange={(e) => handleChangeText(e, "ru", "transmission")}
                                            placeholder={'Russian transmission...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.am.transmission}
                                            onChange={(e) => handleChangeText(e, "am", "transmission")}
                                            placeholder={'Armenian transmission...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.pl.transmission}
                                            onChange={(e) => handleChangeText(e, "pl", "transmission")}
                                            placeholder={'Polish transmission...'}
                                            type="text"/>
                                    </div>
                                </div>
                                }
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.price}
                                        onChange={(e) => handleChange(e, "price")}
                                        placeholder={'price...'}
                                        type="text"/>
                                </div>

                            </div>
                            <div className={"right_item"}>
                                <div className={'input_item'}>
                                    <input
                                        value={updateItem.bac}
                                        onChange={(e) => handleChange(e, "bac")}
                                        placeholder={'bac...'}
                                        type="text"/>
                                </div>

                                <h3 onClick={() => {
                                    setNameOpen(false)
                                    setFuelOpen(false)
                                    setTransmissionOpen(false)
                                    setDocumentsOpen(!documentsOpen)
                                    setBonusSystemOpen(false)
                                    setRulesOpen(false)
                                }}>Documents {documentsOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                                {documentsOpen && <div className={"open_input"}>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.en.documents}
                                    onChange={(e) => handleChangeText(e, "en", "documents")}
                                    placeholder={'English Documents text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.ru.documents}
                                    onChange={(e) => handleChangeText(e, "ru", "documents")}
                                    placeholder={'Russian Documents text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.am.documents}
                                    onChange={(e) => handleChangeText(e, "am", "documents")}
                                    placeholder={'Armenian Documents text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.pl.documents}
                                    onChange={(e) => handleChangeText(e, "pl", "documents")}
                                    placeholder={'Polish Documents text...'}/>
                                    </div>
                                </div>}

                                <h3 onClick={() => {
                                    setNameOpen(false)
                                    setFuelOpen(false)
                                    setTransmissionOpen(false)
                                    setDocumentsOpen(false)
                                    setBonusSystemOpen(!bonusSystemOpen)
                                    setRulesOpen(false)
                                }}>Bonus System {bonusSystemOpen ? <MdKeyboardArrowUp/> :
                                    <MdKeyboardArrowDown/>}</h3>
                                {bonusSystemOpen && <div className={"open_input"}>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.en.bonusSystem}
                                    onChange={(e) => handleChangeText(e, "en", "bonusSystem")}
                                    placeholder={'English Bonus System text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.ru.bonusSystem}
                                    onChange={(e) => handleChangeText(e, "ru", "bonusSystem")}
                                    placeholder={'Russian Bonus System text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.am.bonusSystem}
                                    onChange={(e) => handleChangeText(e, "am", "bonusSystem")}
                                    placeholder={'Armenian Bonus System text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.pl.bonusSystem}
                                    onChange={(e) => handleChangeText(e, "pl", "bonusSystem")}
                                    placeholder={'Polish Bonus System text...'}/>
                                    </div>
                                </div>}

                                <h3 onClick={() => {
                                    setNameOpen(false)
                                    setFuelOpen(false)
                                    setTransmissionOpen(false)
                                    setDocumentsOpen(false)
                                    setBonusSystemOpen(false)
                                    setRulesOpen(!rulesOpen)
                                }}>Rules {rulesOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                                {rulesOpen && <div className={"open_input"}>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.en.rules}
                                    onChange={(e) => handleChangeText(e, "en", "rules")}
                                    placeholder={'English Rules text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.ru.rules}
                                    onChange={(e) => handleChangeText(e, "ru", "rules")}
                                    placeholder={'Russian Rules text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.am.rules}
                                    onChange={(e) => handleChangeText(e, "am", "rules")}
                                    placeholder={'Armenian Rules text...'}/>
                                    </div>
                                    <div className={'desc_text'}>
                                <textarea
                                    value={updateItem.translation.pl.rules}
                                    onChange={(e) => handleChangeText(e, "pl", "rules")}
                                    placeholder={'Polish Rules text...'}/>
                                    </div>
                                </div>}

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
                        </div>
                    </form>
                </div>
            </CustomsPortal> : null);
}

export default UpdateItemCar;