import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { partnersAddRequest, isLoading } from '../../../../store/actions/partners';

const AddNewPartners = () => {
    const [partner, setPartner] = useState({name: "", image: null});
    const errors = useSelector(state => state.partners.errors);
    const loading = useSelector(state => state.partners.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setPartner({...partner, [path]: text});
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
                                value={partner.name}
                                onChange={(e) => handleChangeText(e, "name")}
                                placeholder={'name partners...'}
                                type="text"/>
                        </div>
                        {errors.name ? <small>{errors.name}</small> : null}

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
