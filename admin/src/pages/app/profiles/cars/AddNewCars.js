import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { carsAddRequest } from '../../../../store/actions/cars';

const AddNewCars = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [car, setCar] = useState({
        name: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        image: null,
        price: "",
        fuel: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        transmission: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        bac: "",
        documents: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        bonusSystem: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        rules: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        }});
    const [nameOpen, setNameOpen] = useState(false);
    const [fuelOpen, setFuelOpen] = useState(false);
    const [transmissionOpen, setTransmissionOpen] = useState(false);
    const [documentsOpen, setDocumentsOpen] = useState(false);
    const [bonusSystemOpen, setBonusSystemOpen] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false);

    const errors = useSelector(state => state.cars.errors);
    const loading = useSelector(state => state.cars.loading);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setCar({...car, [path]: text});
    }, [car]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setCar({...car, [path]: {...car[path], [val]: text}});
    }, [car]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setCar({...car, image: file})
    }, [car]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(carsAddRequest(car));
        if (payload?.status === 'ok') {
            navigate('/cars')
            Account.setNavbarUrlPathSub('cars')
        }
    }, [car]);

    return (
        <div className={'add-new-cars childrenWidth'}>
            <Helmet>
                <title>add new cars</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave} className={"form "}>
                    <div className="left_row">
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                            setFuelOpen(false)
                            setTransmissionOpen(false)
                            setDocumentsOpen(false)
                            setBonusSystemOpen(false)
                            setRulesOpen(false)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={car.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }
                        <h3 onClick={() => {
                            setNameOpen(false)
                            setFuelOpen(!fuelOpen)
                            setTransmissionOpen(false)
                            setDocumentsOpen(false)
                            setBonusSystemOpen(false)
                            setRulesOpen(false)
                        }}>Fuel {fuelOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {fuelOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={car.fuel.en}
                                    onChange={(e) => handleChangeText(e, "fuel", "en")}
                                    placeholder={'English fuel...'}
                                    type="text"/>
                            </div>
                            {errors?.fuel?.en ? <small>{errors.fuel.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.fuel.ru}
                                    onChange={(e) => handleChangeText(e, "fuel", "ru")}
                                    placeholder={'Russian fuel...'}
                                    type="text"/>
                            </div>
                            {errors?.fuel?.ru ? <small>{errors.fuel.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.fuel.am}
                                    onChange={(e) => handleChangeText(e, "fuel", "am")}
                                    placeholder={'Armenian fuel...'}
                                    type="text"/>
                            </div>
                            {errors?.fuel?.am ? <small>{errors.fuel.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.fuel.pl}
                                    onChange={(e) => handleChangeText(e, "fuel", "pl")}
                                    placeholder={'Polish fuel...'}
                                    type="text"/>
                            </div>
                            {errors?.fuel?.pl ? <small>{errors.fuel.pl}</small> : null}
                        </div>
                        }
                        <h3 onClick={() => {
                            setNameOpen(false)
                            setFuelOpen(false)
                            setTransmissionOpen(!transmissionOpen)
                            setDocumentsOpen(false)
                            setBonusSystemOpen(false)
                            setRulesOpen(false)
                        }}> Transmission {transmissionOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {transmissionOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={car.transmission.en}
                                    onChange={(e) => handleChangeText(e, "transmission", "en")}
                                    placeholder={'English transmission...'}
                                    type="text"/>
                            </div>
                            {errors?.transmission?.en ? <small>{errors.transmission.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.transmission.ru}
                                    onChange={(e) => handleChangeText(e, "transmission", "ru")}
                                    placeholder={'Russian transmission...'}
                                    type="text"/>
                            </div>
                            {errors?.transmission?.ru ? <small>{errors.transmission.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.transmission.am}
                                    onChange={(e) => handleChangeText(e, "transmission", "am")}
                                    placeholder={'Armenian transmission...'}
                                    type="text"/>
                            </div>
                            {errors?.transmission?.am ? <small>{errors.transmission.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={car.transmission.pl}
                                    onChange={(e) => handleChangeText(e, "transmission", "pl")}
                                    placeholder={'Polish transmission...'}
                                    type="text"/>
                            </div>
                            {errors?.transmission?.pl ? <small>{errors.transmission.pl}</small> : null}
                        </div>
                        }
                        <div className={'input_item'}>
                            <input
                                value={car.price}
                                onChange={(e) => handleChange(e, "price")}
                                placeholder={'price...'}
                                type="text"/>
                        </div>
                        {errors?.price ? <small>{errors.price}</small> : null}

                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload"
                                className="custom-file">
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

                            {errors?.file ? <small>{errors?.file}</small> : null}

                        </div>
                        {
                            car.image ?
                                <figure className={'icon_file_img'}>
                                    <img src={URL.createObjectURL(car?.image)} alt={""}/>
                                </figure>
                                : null
                        }
                    </div>
                    <div className={"right_item"}>
                        <div className={'input_item'}>
                            <input
                                value={car.bac}
                                onChange={(e) => handleChange(e, "bac")}
                                placeholder={'bac...'}
                                type="text"/>
                        </div>
                        {errors?.bac ? <small>{errors.bac}</small> : null}

                        <h3 onClick={() => {
                            setNameOpen(false)
                            setFuelOpen(false)
                            setTransmissionOpen(false)
                            setDocumentsOpen(!documentsOpen)
                            setBonusSystemOpen(false)
                            setRulesOpen(false)
                        }}>Documents {documentsOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {documentsOpen && <div className={"open_input"}>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.documents.en}
                                    onChange={(e) => handleChangeText(e, "documents", "en")}
                                    placeholder={'English Documents text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.documents.ru}
                                    onChange={(e) => handleChangeText(e, "documents", "ru")}
                                    placeholder={'Russian Documents text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.documents.am}
                                    onChange={(e) => handleChangeText(e, "documents", "am")}
                                    placeholder={'Armenian Documents text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.documents.pl}
                                    onChange={(e) => handleChangeText(e, "documents", "pl")}
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
                        }}>Bonus System {bonusSystemOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {bonusSystemOpen && <div className={"open_input"}>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.bonusSystem.en}
                                    onChange={(e) => handleChangeText(e, "bonusSystem", "en")}
                                    placeholder={'English Bonus System text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.bonusSystem.ru}
                                    onChange={(e) => handleChangeText(e, "bonusSystem", "ru")}
                                    placeholder={'Russian Bonus System text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.bonusSystem.am}
                                    onChange={(e) => handleChangeText(e, "bonusSystem", "am")}
                                    placeholder={'Armenian Bonus System text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.bonusSystem.pl}
                                    onChange={(e) => handleChangeText(e, "bonusSystem", "pl")}
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
                        }}>Rules {rulesOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {rulesOpen && <div className={"open_input"}>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.rules.en}
                                    onChange={(e) => handleChangeText(e, "rules", "en")}
                                    placeholder={'English Rules text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.rules.ru}
                                    onChange={(e) => handleChangeText(e, "rules", "ru")}
                                    placeholder={'Russian Rules text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.rules.am}
                                    onChange={(e) => handleChangeText(e, "rules", "am")}
                                    placeholder={'Armenian Rules text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={car.rules.pl}
                                    onChange={(e) => handleChangeText(e, "rules", "pl")}
                                    placeholder={'Polish Rules text...'}/>
                            </div>
                        </div>}

                        <Button title={'Save'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewCars;
