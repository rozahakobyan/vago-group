import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { packagesAddRequest, isLoading } from '../../../../store/actions/packages';
import Select from "react-select";
import activePricePage from "../../../../assets/data/activePricePage";

const AddNewPackages = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [packages, setPackages] = useState({
        name:{
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        activePage: "",
        advanced: false,
        premium: false,
        standard: false,
    });
    const [selected, setSelected] = useState(null);
    const [nameOpen, setNameOpen] = useState(false);
    
    const errors = useSelector(state => state.packages.errors);
    const loading = useSelector(state => state.packages.loading);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setPackages({...packages, [path]: {...packages[path], [val]: text}});
    }, [packages]);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setPackages({...packages, activePage: selectedOption.label})
    }, [packages])

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
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={packages.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={packages.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={packages.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={packages.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }

                        <Select value={selected}
                                options={activePricePage}
                                onChange={handleSelectChange}
                                placeholder={<div>Page...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />

                        <div className={'input_item'}>
                            <label> Active standard
                                <input
                                    checked={packages.standard}
                                    onChange={(e) => handleChangeActive(e, "standard")}
                                    type="checkbox"/>
                            </label>
                        </div>

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

                        <Button title={'Save'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewPackages;
