import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdDeleteForever, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {galleriesAddRequest} from "../../../../store/actions/galleries";
import Select from "react-select";
import galleryPage from "../../../../assets/data/galleryPage";

const AddNewGallery = () => {
    const [galleries, setGalleries] = useState({
        gallery: [],
        pageGallery: ""
    });
    const [selected, setSelected] = useState(null);

    const errors = useSelector(state => state.galleries.errors);
    const loading = useSelector(state => state.galleries.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFilesSelect = useCallback((ev) => {
        const filesArray = Array.from(ev.target.files);
        setGalleries((prevState) => ({...prevState, gallery: [...prevState.gallery, ...filesArray]}));
        ev.target.value = '';
    }, []);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setGalleries({...galleries, pageGallery: selectedOption.label})
    }, [galleries])

    const handleDeleteFiles = useCallback((index) => (e) => {
        e.preventDefault();
        galleries.gallery.splice(index, 1);
        setGalleries({...galleries, gallery: [...galleries.gallery]});
    }, [galleries]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        console.log(galleries)
        const {payload} = await dispatch(galleriesAddRequest(galleries));
        if (payload?.status === 'ok') {
            navigate('/information/galleries')
            Account.setNavbarUrlPathSub('galleries')
        }
    }, [galleries]);

    return (
        <div className={'add-new-galleries childrenWidth'}>
            <Helmet>
                <title>add new galleries</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <Select value={selected}
                                options={galleryPage}
                                onChange={handleSelectChange}
                                placeholder={<div>Page...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />
                        <div className={'item_file_cat'}>
                            <label
                                htmlFor="file-upload"
                                className="custom-file">
                                <MdOutlineDriveFolderUpload
                                    className={'icon'}/>
                                Choose file
                            </label>
                            <input
                                onChange={handleFilesSelect}
                                name={'files'}
                                accept="image/*"
                                id="file-upload"
                                type="file"
                                multiple/>
                            {errors?.file ? <small>{errors?.file}</small> : null}
                        </div>
                        <Button title={'Save'} loading={loading}/>
                    </div>
                    {
                        galleries.gallery.length !== 0
                            ?
                            <ul className={'gallery_list'}>
                                {
                                    galleries.gallery.map((item, index) => {
                                        const symbols = Object.getOwnPropertySymbols(item)
                                        return (
                                            <li key={item[symbols[0]]}>
                                                <figure>
                                                    <img src={URL.createObjectURL(item)}
                                                         alt={item.name}/>
                                                    <span className={'delete'} onClick={handleDeleteFiles(index)}>
                                            <MdDeleteForever/>
                                       </span>
                                                </figure>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            : null
                    }

                </form>
            </div>
        </div>
    );
};

export default AddNewGallery;
