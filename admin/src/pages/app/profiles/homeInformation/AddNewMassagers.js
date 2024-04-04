import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {loginImageAddRequest} from "../../../../store/actions/loginImage";
import {massagerAddRequest} from "../../../../store/actions/massagers";

const AddNewMassagers = () => {
    const [massager, setMassager] = useState({name: "", icon: null});
    const errors = useSelector(state => state.massagers.errors);
    const loading = useSelector(state => state.massagers.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e) => {
        const text = e.target.value
        setMassager({...massager, name: text});
    }, [massager]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setMassager({...massager, icon: file})
    }, [massager]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(massagerAddRequest(massager));
        if (payload?.status === 'ok') {
            navigate('/information/massagers')
            Account.setNavbarUrlPathSub('massagers')
        }
    }, [massager]);

    return (
        <div className={'add-new-massagers childrenWidth'}>
            <Helmet>
                <title>add new login image</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={massager.name}
                                onChange={handleChangeText}
                                placeholder={'name...'}
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
                        massager.icon ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(massager?.icon)} alt={""}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewMassagers;
