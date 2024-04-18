import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {massagerAddRequest} from "../../../../store/actions/massagers";
import { productsAddRequest } from '../../../../store/actions/products';
import {partnersAddRequest} from "../../../../store/actions/partners";

const AddNewPartners = () => {
    const [product, setProduct] = useState({pathPartners: "", image: null});
    const [text, setText] = useState("");
    const errors = useSelector(state => state.products.errors);
    const loading = useSelector(state => state.products.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setText(text)
        if(text.trim().match(/^https?:\/\/w{3}.\w+.\w{1,5}(\/\.+)?/gm)){
            setProduct({...product, [path]: text});
        }
    }, [product]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setProduct({...product, image: file})
    }, [product]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(partnersAddRequest(product));
        if (payload?.status === 'ok') {
            navigate('/partners')
            Account.setNavbarUrlPathSub('partners')
        }
    }, [product]);

    return (
        <div className={'add-new-partners childrenWidth'}>
            <Helmet>
                <title>add new partners</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={text}
                                onChange={(e) => handleChangeText(e, "pathPartners")}
                                placeholder={'path partners...'}
                                type="text"/>
                        </div>
                        {errors.pathPartners ? <small>{errors.pathPartners}</small> : null}

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

export default AddNewPartners;
