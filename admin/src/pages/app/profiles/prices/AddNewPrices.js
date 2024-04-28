import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { pricesAddRequest } from '../../../../store/actions/prices';
import Select from "react-select";
import activePricePage from "../../../../assets/data/activePricePage";

const AddNewPrices = () => {
    const [price, setPrice] = useState({
        name: "",
        advanced: "",
        premium: "",
        standard: "",
        activePage: "",
        active: false
    });
    const [selected, setSelected] = useState(null);

    const errors = useSelector(state => state.prices.errors);
    const loading = useSelector(state => state.prices.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setPrice({...price, [path]: text});
    }, [price]);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setPrice({...price, activePage: selectedOption.label})
    }, [price])

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setPrice({...price, [path]: text});
    }, [price]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(pricesAddRequest(price));
        if (payload?.status === 'ok') {
            navigate('/prices')
            Account.setNavbarUrlPathSub('prices')
        }
    }, [price]);

    return (
        <div className={'add-new-prices childrenWidth'}>
            <Helmet>
                <title>add new prices</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={price.name}
                                onChange={(e) => handleChangeText(e, "name")}
                                placeholder={'name prices...'}
                                type="text"/>
                        </div>
                        {errors?.name ? <small>{errors?.name}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.advanced}
                                onChange={(e) => handleChangeText(e, "advanced")}
                                placeholder={'advanced prices...'}
                                type="text"/>
                        </div>
                        {errors?.advanced ? <small>{errors?.advanced}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.premium}
                                onChange={(e) => handleChangeText(e, "premium")}
                                placeholder={'premium prices...'}
                                type="text"/>
                        </div>
                        {errors?.premium ? <small>{errors?.premium}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.standard}
                                onChange={(e) => handleChangeText(e, "standard")}
                                placeholder={'standard prices...'}
                                type="text"/>
                        </div>
                        {errors?.standard ? <small>{errors?.standard}</small> : null}

                        <Select value={selected}
                                options={activePricePage}
                                onChange={handleSelectChange}
                                placeholder={<div>Page...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />

                        <div className={'input_item'}>
                            <label> Active Price
                                <input
                                    checked={price.active}
                                    onChange={(e) => handleChangeActive(e, "active")}
                                    type="checkbox"/>
                            </label>
                        </div>

                        <Button title={'Save'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewPrices;
