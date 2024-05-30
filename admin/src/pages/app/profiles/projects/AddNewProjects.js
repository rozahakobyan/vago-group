import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { projectsAddRequest } from '../../../../store/actions/projects';
import Select from "react-select";
import status from "../../../../assets/data/status";

const AddNewProjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [project, setProject] = useState({
        name: {
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
        status: "",
        image: null});
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);
    const [nameOpen, setNameOpen] = useState(false);
    const [descOpen, setDescOpen] = useState(false);
    
    const errors = useSelector(state => state.projects.errors);
    const loading = useSelector(state => state.projects.loading);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        if(text.length <= 300){
            setProject({...project, [path]: {...project[path], [val]: text}});
            setError("")
        }else{
            setError("Text Long !!!")
        }
    }, [project]);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setProject({...project, status: selectedOption.label})
    }, [project])

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setProject({...project, image: file})
    }, [project]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(projectsAddRequest(project));
        if (payload?.status === 'ok') {
            navigate('/projects')
            Account.setNavbarUrlPathSub('projects')
        }
    }, [project]);

    return (
        <div className={'add-new-projects childrenWidth'}>
            <Helmet>
                <title>add new projects</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                            setDescOpen(false)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={project.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={project.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={project.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={project.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }
                        <h3 onClick={() => {
                            setDescOpen(!descOpen)
                            setNameOpen(false)
                        }}>Description {descOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {descOpen && <div className={"open_input"}>
                            <div className={'desc_text'}>
                                <textarea
                                    value={project.description.en}
                                    onChange={(e) => handleChangeText(e, "description", "en")}
                                    placeholder={'English Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={project.description.ru}
                                    onChange={(e) => handleChangeText(e, "description", "ru")}
                                    placeholder={'Russian Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={project.description.am}
                                    onChange={(e) => handleChangeText(e, "description", "am")}
                                    placeholder={'Armenian Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={project.description.pl}
                                    onChange={(e) => handleChangeText(e, "description", "pl")}
                                    placeholder={'Polish Description text...'}/>
                            </div>
                        </div>}
                        
                        {error ? <small>{error}</small> : null}


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

                        <Select value={selected}
                                options={status}
                                onChange={handleSelectChange}
                                placeholder={<div>Status...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />

                        <Button title={'Save'} loading={loading}/>
                    </div>
                    {
                        project.image ?
                            <figure className={'icon_file_img'}>
                                <img src={URL.createObjectURL(project?.image)} alt={""}/>
                            </figure>
                            : null
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNewProjects;
