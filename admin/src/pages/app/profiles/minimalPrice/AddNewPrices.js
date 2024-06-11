import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { pricesAddRequest } from '../../../../store/actions/prices';
import {minimalPricesAddRequest} from "../../../../store/actions/minimalPrices";

const AddNewPrices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [price, setPrice] = useState({
        eur: null,
        usd: null,
        rub: null,
        amd: null,
        min: {
            eur: null,
            usd: null,
            rub: null,
            amd: null,
        },
        active: false
    });
    
    const errors = useSelector(state => state.minimalPrices.errors);
    const loading = useSelector(state => state.minimalPrices.loading);
    
    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setPrice({...price, [path]: text});
    }, [price]);

    const handleChangeMin = useCallback((e, path, val) => {
        const text = e.target.value
        setPrice({...price, [path]: {...price[path], [val]: text}});
    }, [price]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setPrice({...price, [path]: text});
    }, [price]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(minimalPricesAddRequest(price));
        if (payload?.status === 'ok') {
            navigate('/minimal-prices')
            Account.setNavbarUrlPathSub('minimal-prices')
        }
    }, [price]);

    return (
        <div className={'add-new-prices childrenWidth'}>
            <Helmet>
                <title>add new minimal prices</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={price.eur}
                                onChange={(e) => handleChange(e, "eur")}
                                placeholder={'eur price...'}
                                type="number"/>
                        </div>
                        {errors?.eur ? <small>{errors?.eur}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.usd}
                                onChange={(e) => handleChange(e, "usd")}
                                placeholder={'usd price...'}
                                type="number"/>
                        </div>
                        {errors?.usd ? <small>{errors?.usd}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.rub}
                                onChange={(e) => handleChange(e, "rub")}
                                placeholder={'rub price...'}
                                type="number"/>
                        </div>
                        {errors?.rub ? <small>{errors?.rub}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.amd}
                                onChange={(e) => handleChange(e, "amd")}
                                placeholder={'amd price...'}
                                type="number"/>
                        </div>
                        {errors?.amd ? <small>{errors?.amd}</small> : null}

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
                    <div className="right_item">
                        <div className={'input_item'}>
                            <input
                                value={price.min.eur}
                                onChange={(e) => handleChangeMin(e, "min","eur")}
                                placeholder={'eur min price...'}
                                type="number"/>
                        </div>
                        {errors?.min?.eur ? <small>{errors.min.eur}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.min.usd}
                                onChange={(e) => handleChangeMin(e, "min","usd")}
                                placeholder={'usd min price...'}
                                type="number"/>
                        </div>
                        {errors?.min?.usd ? <small>{errors.min.usd}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.min.rub}
                                onChange={(e) => handleChangeMin(e, "min","rub")}
                                placeholder={'rub min price...'}
                                type="number"/>
                        </div>
                        {errors?.min?.rub ? <small>{errors.min.rub}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={price.min.amd}
                                onChange={(e) => handleChangeMin(e, "min", "amd")}
                                placeholder={'amd min price...'}
                                type="number"/>
                        </div>
                        {errors?.min?.amd ? <small>{errors.min.amd}</small> : null}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewPrices;
