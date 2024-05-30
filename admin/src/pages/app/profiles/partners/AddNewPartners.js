import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { partnersAddRequest } from '../../../../store/actions/partners';

const AddNewPartners = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [partner, setPartner] = useState({
        name:{
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        image: null});
    const [nameOpen, setNameOpen] = useState(false);
    
    const errors = useSelector(state => state.partners.errors);
    const loading = useSelector(state => state.partners.loading);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setPartner({...partner, [path]: {...partner[path], [val]: text}});
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
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={partner.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={partner.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={partner.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={partner.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }

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
                            {errors?.file ? <small>{errors?.file}</small> : null}
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
