import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { ourAdvantagesAddRequest } from '../../../../store/actions/ourAdvantages';

const AddNewOurAdvantages = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [ourAdvantage, setOurAdvantage] = useState({
        text:{
            en: "",
            ru: "",
            am: "",
            pl: ""
        }, 
        image: null,
        color: ""});
    const [textOpen, setTextOpen] = useState(false);

    const errors = useSelector(state => state.ourAdvantages.errors);
    const loading = useSelector(state => state.ourAdvantages.loading);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setOurAdvantage({...ourAdvantage, [path]: {...ourAdvantage[path], [val]: text}});
    }, [ourAdvantage]);

    const handleChange = useCallback((e, path) => {
        const text = e.target.value
        setOurAdvantage({...ourAdvantage, [path]: text});
    }, [ourAdvantage]);
    
    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setOurAdvantage({...ourAdvantage, image: file})
    }, [ourAdvantage]);
    
    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(ourAdvantagesAddRequest(ourAdvantage));
        if (payload?.status === 'ok') {
            navigate('/cars/our-advantages')
            Account.setNavbarUrlPathSub('our-advantages')
        }
    }, [ourAdvantage]);

    return (
        <div className={'add-new-advantages childrenWidth'}>
            <Helmet>
                <title>add new advantages</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave} className={"form"}>
                    <div className="left_row">
                        <h3 onClick={() => {
                            setTextOpen(!textOpen)
                        }}>Text {textOpen ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}</h3>
                        {textOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={ourAdvantage.text.en}
                                    onChange={(e) => handleChangeText(e, "text", "en")}
                                    placeholder={'English text...'}
                                    type="text"/>
                            </div>
                            {errors?.text?.en ? <small>{errors.text.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={ourAdvantage.text.ru}
                                    onChange={(e) => handleChangeText(e, "text", "ru")}
                                    placeholder={'Russian text...'}
                                    type="text"/>
                            </div>
                            {errors?.text?.ru ? <small>{errors.text.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={ourAdvantage.text.am}
                                    onChange={(e) => handleChangeText(e, "text", "am")}
                                    placeholder={'Armenian text...'}
                                    type="text"/>
                            </div>
                            {errors?.text?.am ? <small>{errors.text.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={ourAdvantage.text.pl}
                                    onChange={(e) => handleChangeText(e, "text", "pl")}
                                    placeholder={'Polish text...'}
                                    type="text"/>
                            </div>
                            {errors?.text?.pl ? <small>{errors.text.pl}</small> : null}
                        </div>
                        }

                        <div className={'input_item'}>
                            <input
                                value={ourAdvantage.color}
                                onChange={(e) => handleChange(e, "color")}
                                placeholder={'text color...'}
                                type="text"/>
                        </div>
                        {errors?.price ? <small>{errors.price}</small> : null}
                        
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
                        ourAdvantage.image ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(ourAdvantage?.image)} alt={""}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewOurAdvantages;
