import React, {useCallback, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { partnersAddRequest } from '../../../../store/actions/partners';

const AddNewPartners = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [partner, setPartner] = useState({pathPartners: "", image: null});
    const [text, setText] = useState("");
    
    const errors = useSelector(state => state.partners.errors);
    const loading = useSelector(state => state.partners.loading);

    const handleChangeText = useCallback((e) => {
        const text = e.target.value;
        setText(text);
        if(text.match(/^https?:\/\/w{3}.\w+.\w{1,5}(\/\w+)?/gm)){
            setPartner({...partner, pathPartners: text});
        }
        console.log(partner)
    }, [partner]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setPartner({...partner, image: file})
    }, [partner]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(partnersAddRequest(partner));
        if (payload?.status === 'ok') {
            navigate('/partners')
            Account.setNavbarUrlPathSub('partners')
        }
    }, [partner]);

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
                                onChange={handleChangeText}
                                placeholder={'path partner...'}
                                type="text"/>
                        </div>
                        {errors.pathPartners ? <small>Path partners{errors.pathPartners}</small> : null}

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
                        partner.image ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(partner?.image)} alt={""}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewPartners;
