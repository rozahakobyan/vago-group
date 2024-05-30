import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { productsAddRequest } from '../../../../store/actions/products';
import Select from "react-select";
import currencyList from "../../../../assets/data/currencyList";

const AddNewProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState({
        name:{
            en: "",
            ru: "",
            am: "",
            pl: ""
        }, 
        price: null,
        currency: ""});
    const [nameOpen, setNameOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const errors = useSelector(state => state.products.errors);
    const loading = useSelector(state => state.products.loading);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setProduct({...product, [path]: {...product[path], [val]: text}});
    }, [product]);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setProduct({...product, [path]: text});
    }, [product]);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setProduct({...product, currency: selectedOption.label})
    }, [product])

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(productsAddRequest(product));
        if (payload?.status === 'ok') {
            navigate('/products')
            Account.setNavbarUrlPathSub('products')
        }
    }, [product]);

    return (
        <div className={'add-new-products childrenWidth'}>
            <Helmet>
                <name>add new products</name>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={product.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={product.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={product.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={product.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }

                        <div className={'input_item'}>
                            <input
                                value={product.price}
                                onChange={(e) => handleChange(e, "price")}
                                placeholder={'price...'}
                                type="number"/>
                        </div>
                        {errors?.price ? <small>{errors.price}</small> : null}

                        <Select value={selected}
                                options={currencyList}
                                onChange={handleSelectChange}
                                placeholder={<div>Currency...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />

                        <Button title={'Save'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewProducts;
