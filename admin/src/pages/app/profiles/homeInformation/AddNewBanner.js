import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import Button from "../../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Account} from "../../../../helpers/account";
import {bannerAddRequest} from "../../../../store/actions/banner";

function AddNewBanner() {
    const [banner, setBanner] = useState({
        title: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        description: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        homeImage: null,
        constructionImage: null,
        employmentAgencyImage: null,
        logisticImage: null,
        active: false
    });
    const [titleOpen, setTitleOpen] = useState(false);
    const [descOpen, setDescOpen] = useState(false);

    const errors = useSelector(state => state.banner.errors);
    const loading = useSelector(state => state.banner.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setBanner({...banner, [path]: {...[path], [val]: text}});
    }, [banner]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setBanner({...banner, [path]: text});
    }, [banner]);

    const handleChangeFile = useCallback((e, path) => {
        const file = e.target.files[0]
        setBanner({...banner, [path]: file})
    }, [banner]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        console.log(banner)
        const {payload} = await dispatch(bannerAddRequest(banner));
        console.log(payload.banner)
        if (payload?.status === 'ok') {
            navigate('/information')
            Account.setNavbarUrlPathSub('information')
        }
    }, [banner]);

    return (
        <div className={'add-new-banner childrenWidth'}>
            <Helmet>
                <title>add new login image</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <p onClick={() => setTitleOpen(!titleOpen)}>Title  {titleOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</p>
                        {titleOpen && <div>
                            <div className={'input_item'}>
                                <input
                                    value={banner.title.en}
                                    onChange={(e) => handleChangeText(e, "title", "en")}
                                    placeholder={'title...'}
                                    type="text"/>
                            </div>
                            {errors?.title?.en ? <small>{errors?.title.en}</small> : null}
                        </div>
                        }
                        <p>Description {descOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</p>


                        {/*<div className={'desc_text'}>*/}
                        {/*        <textarea*/}
                        {/*            value={banner.description}*/}
                        {/*            onChange={(e) => handleChangeText(e, "description")}*/}
                        {/*            placeholder={'Description text...'}/>*/}
                        {/*</div>*/}
                        <p>Home Image</p>
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={(e) => handleChangeFile(e, "homeImage")}
                                name={'files'}
                                accept="image/*"
                                id="file-upload"
                                type="file"/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>
                        <p>Construction Image</p>
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload2"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={(e) => handleChangeFile(e, "constructionImage")}
                                name={'files'}
                                accept="image/*"
                                id="file-upload2"
                                type="file"/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>
                        <p>Employment Agency Image</p>
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload3"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={(e) => handleChangeFile(e, "employmentAgencyImage")}
                                name={'files'}
                                accept="image/*"
                                id="file-upload3"
                                type="file"/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>
                        <p>Logistic Image</p>
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload4"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={(e) => handleChangeFile(e, "logisticImage")}
                                name={'files'}
                                accept="image/*"
                                id="file-upload4"
                                type="file"/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>

                        <div className={'input_item'}>
                            <label> Active Banner
                                <input
                                    checked={banner.active}
                                    onChange={(e) => handleChangeActive(e, "active")}
                                    type="checkbox"/>
                            </label>
                        </div>

                        <Button title={'Save'} loading={loading}/>
                    </div>
                    <div>
                        {
                            banner.homeImage ?
                                <figure className={'icon_file_img'}>
                                    <img src={URL.createObjectURL(banner?.homeImage)} alt={""}/>
                                </figure>
                                : null
                        }
                        {
                           banner.constructionImage ?
                               <figure className={'icon_file_img'}>
                                   <img src={URL.createObjectURL(banner?.constructionImage)} alt={""}/>
                               </figure>
                               : null
                       }
                       {
                           banner.employmentAgencyImage ?
                               <figure className={'icon_file_img'}>
                                   <img src={URL.createObjectURL(banner?.employmentAgencyImage)} alt={""}/>
                               </figure>
                               : null
                       }
                       {
                           banner.logisticImage ?
                               <figure className={'icon_file_img'}>
                                   <img src={URL.createObjectURL(banner?.logisticImage)} alt={""}/>
                               </figure>
                               : null
                       }
                   </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewBanner;