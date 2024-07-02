import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {massagerAddRequest} from "../../../../store/actions/massagers";

const AddNewMassagers = () => {
    const [massager, setMassager] = useState({name: "", headerIcon: null, footerIcon: null});
    const errors = useSelector(state => state.massagers.errors);
    const loading = useSelector(state => state.massagers.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e) => {
        const text = e.target.value
        setMassager({...massager, name: text});
    }, [massager]);

    const handleChangeFile = useCallback((e, path) => {
        const file = e.target.files[0]
        setMassager({...massager, [path]: file})
    }, [massager]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        console.log(massager)
        const {payload} = await dispatch(massagerAddRequest(massager));
        if (payload?.status === 'ok') {
            navigate('/massagers')
            Account.setNavbarUrlPathSub('massagers')
        }
    }, [massager]);

    return (
        <div className={'add-new-massagers childrenWidth'}>
            <Helmet>
                <title>add new massagers</title>
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
                        {errors?.name ? <small>{errors?.name}</small> : null}
                        <p>Header Icon</p>
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={(e) => handleChangeFile(e, "headerIcon")}
                                name={'files'}
                                accept="image/*"
                                id="file-upload"
                                type="file"/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>
                        <p>Footer Icon</p>
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload2"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={(e) => handleChangeFile(e, "footerIcon")}
                                name={'files'}
                                accept="image/*"
                                id="file-upload2"
                                type="file"/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>
                        <Button title={'Save'} loading={loading}/>
                    </div>
                    <div>
                        {
                            massager.headerIcon ?
                                <figure className={'icon_file_img'}>
                                    <img src={URL.createObjectURL(massager?.headerIcon)} alt={""}/>
                                </figure>
                                : null
                        }
                        {
                            massager.footerIcon ?
                                <figure className={'icon_file_img'}>
                                    <img src={URL.createObjectURL(massager?.footerIcon)} alt={""}/>
                                </figure>
                                : null
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewMassagers;
