import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import Button from "../../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Account} from "../../../../helpers/account";
import {addHomeInfoRequest} from "../../../../store/actions/homeInfo";

function AddNewHomeInfo() {
    const [loginImage, setLoginImage] = useState({title: "", video: null});
    const errors = useSelector(state => state.homeInfo.errors);
    const loading = useSelector(state => state.homeInfo.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setLoginImage({...loginImage, [path]: text});
    }, [loginImage]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setLoginImage({...loginImage, video: file})
        console.log(e)
    }, [loginImage]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        console.log(loginImage)
        const {payload} = await dispatch(addHomeInfoRequest(loginImage));
        if (payload?.status === 'ok') {
            navigate('/information')
            Account.setNavbarUrlPathSub('information')
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
                        <div className={'input_item'}>
                            <input
                                value={loginImage.title}
                                onChange={(e) => handleChangeText(e, "title")}
                                placeholder={'title...'}
                                type="text"/>
                        </div>
                        {errors.title ? <small>{errors.title}</small> : null}
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
                                accept="video/*"
                                id="file-upload"
                                type="file"/>
                            {errors.file ? <small>{errors.file}</small> : null}
                        </div>
                        <Button title={'Save'} loading={loading}/>
                    </div>
                    {
                        loginImage.video ?
                            <figure className={'icon_file_img'}>
                                <video src={URL.createObjectURL(loginImage?.video)} playsInline={true}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
}

export default AddNewHomeInfo;