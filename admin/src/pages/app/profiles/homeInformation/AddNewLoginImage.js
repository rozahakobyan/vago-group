import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {loginImageAddRequest} from "../../../../store/actions/loginImage";

const AddNewLoginImage = () => {
    const [loginImage, setLoginImage] = useState({image: null});
    const errors = useSelector(state => state.loginImage.errors);
    const loading = useSelector(state => state.loginImage.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setLoginImage({...loginImage, image: file})
    }, [loginImage]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(loginImageAddRequest(loginImage));
        if (payload?.status === 'ok') {
            navigate('/information/login-image')
            Account.setNavbarUrlPathSub('login-image')
        }
    }, [loginImage]);

    return (
        <div className={'add-new-login-image childrenWidth'}>
            <Helmet>
                <title>add new login image</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
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
                        loginImage.image ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(loginImage?.image)} alt={""}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewLoginImage;
