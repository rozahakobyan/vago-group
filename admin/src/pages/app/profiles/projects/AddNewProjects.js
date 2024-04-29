import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import { projectsAddRequest } from '../../../../store/actions/projects';
import Select from "react-select";
import status from "../../../../assets/data/status";

const AddNewProjects = () => {
    const [project, setProject] = useState({name: "", description: "", status: "", image: null});
    const [selected, setSelected] = useState(null);
    const errors = useSelector(state => state.projects.errors);
    const loading = useSelector(state => state.projects.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((e, path) => {
        const text = e.target.value
        setProject({...project, [path]: text});
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
                        <div className={'input_item'}>
                            <input
                                value={project.name}
                                onChange={(e) => handleChangeText(e, "name")}
                                placeholder={'name...'}
                                type="text"/>
                        </div>
                        {errors?.name ? <small>{errors?.name}</small> : null}

                        <div className={'desc_text'}>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => handleChangeText(e, "description")}
                                    placeholder={'Description text...'}/>
                        </div>
                        {errors?.description ? <small>{errors?.description}</small> : null}

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
