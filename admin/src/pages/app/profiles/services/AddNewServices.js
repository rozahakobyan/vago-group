import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { servicesAddRequest, isLoading } from '../../../../store/actions/services';

const AddNewServices = () => {
    const [service, setService] = useState({name: "", number: ""});
    const errors = useSelector(state => state.services.errors);
    const loading = useSelector(state => state.services.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setService({...service, [path]: text});
    }, [service]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(servicesAddRequest(service));
        if (payload?.status === 'ok') {
            navigate('/services')
            Account.setNavbarUrlPathSub('services')
        }
    }, [service]);

    return (
        <div className={'add-new-services childrenWidth'}>
            <Helmet>
                <title>add new services</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={service.name}
                                onChange={(e) => handleChangeText(e, "name")}
                                placeholder={'name services...'}
                                type="text"/>
                        </div>
                        {errors?.name ? <small>{errors?.name}</small> : null}
                        
                        <div className={'input_item'}>
                            <input
                                value={service.number}
                                onChange={(e) => handleChangeText(e, "number")}
                                placeholder={'Price...'}
                                type="text"/>
                        </div>
                        {errors?.number ? <small>{errors?.number}</small> : null}

                        <Button title={'Save'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewServices;
