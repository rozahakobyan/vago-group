import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { packagesAddRequest, isLoading } from '../../../../store/actions/packages';

const AddNewPackages = () => {
    const [packages, setPackages] = useState({
        name: "",
        advanced: false,
        premium: false,
        standard: false,
    });
    const errors = useSelector(state => state.packages.errors);
    const loading = useSelector(state => state.packages.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setPackages({...packages, [path]: text});
    }, [packages]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setPackages({...packages, [path]: text});
    }, [packages]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(packagesAddRequest(packages));
        if (payload?.status === 'ok') {
            navigate('/packages')
            Account.setNavbarUrlPathSub('packages')
        }
    }, [packages]);

    return (
        <div className={'add-new-packages childrenWidth'}>
            <Helmet>
                <title>add new packages</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={packages.name}
                                onChange={(e) => handleChangeText(e, "name")}
                                placeholder={'name packages...'}
                                type="text"/>
                        </div>
                        {errors?.name ? <small>{errors?.name}</small> : null}

                        <div className={'input_item'}>
                            <label> Active advanced
                                <input
                                    checked={packages.advanced}
                                    onChange={(e) => handleChangeActive(e, "advanced")}
                                    type="checkbox"/>
                            </label>
                        </div>

                        <div className={'input_item'}>
                            <label> Active premium
                                <input
                                    checked={packages.premium}
                                    onChange={(e) => handleChangeActive(e, "premium")}
                                    type="checkbox"/>
                            </label>
                        </div>

                        <div className={'input_item'}>
                            <label> Active standard
                                <input
                                    checked={packages.standard}
                                    onChange={(e) => handleChangeActive(e, "standard")}
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

export default AddNewPackages;
