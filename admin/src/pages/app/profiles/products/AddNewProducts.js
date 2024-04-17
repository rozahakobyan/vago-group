import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {massagerAddRequest} from "../../../../store/actions/massagers";
import { productsAddRequest } from '../../../../store/actions/products';

const AddNewProducts = () => {
    const [product, setProduct] = useState({name: "", price: null, image: null});
    const errors = useSelector(state => state.products.errors);
    const loading = useSelector(state => state.products.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
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
                <title>add new products</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={product.name}
                                onChange={(e) => handleChangeText(e, "name")}
                                placeholder={'name...'}
                                type="text"/>
                        </div>
                        {errors.name ? <small>{errors.name}</small> : null}

                        <div className={'input_item'}>
                            <input
                                value={product.price}
                                onChange={(e) => handleChangeText(e, "price")}
                                placeholder={'price...'}
                                type="number"/>
                        </div>
                        {errors.number ? <small>{errors.number}</small> : null}

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
                            {errors.file ? <small>{errors.file}</small> : null}
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
