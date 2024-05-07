import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { productsAddRequest } from '../../../../store/actions/products';

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
        image: null});
    const [nameOpen, setNameOpen] = useState(false);
    
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

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setProduct({...product, image: file})
    }, [product]);

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
                        {errors?.number ? <small>{errors.number}</small> : null}

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
                            {errors?.file ? <small>{errors.file}</small> : null}
                        </div>
                        <Button title={'Save'} loading={loading}/>
                    </div>
                    {
                        product.image ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(product?.image)} alt={""}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewProducts;
