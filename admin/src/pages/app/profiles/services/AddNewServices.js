import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { servicesAddRequest } from '../../../../store/actions/services';

const AddNewServices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [service, setService] = useState({
        name:{
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        number: ""});
    const [nameOpen, setNameOpen] = useState(false);

    const errors = useSelector(state => state.services.errors);
    const loading = useSelector(state => state.services.loading);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setService({...service, [path]: {...service[path], [val]: text}});
    }, [service]);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setService({...service, [path]: text});
    }, [service]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(servicesAddRequest(service));
        if (payload?.status === 'ok') {
            window.location.reload(false)
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
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={service.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={service.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={service.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={service.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }
                        
                        <div className={'input_item'}>
                            <input
                                value={service.number}
                                onChange={(e) => handleChange(e, "number")}
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
