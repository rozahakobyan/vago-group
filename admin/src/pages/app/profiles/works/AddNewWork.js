import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Account} from "../../../../helpers/account";
import {Helmet} from "react-helmet";
import Button from "../../../../components/Button";
import {AiFillDelete} from "react-icons/ai";
import {worksAddRequest} from "../../../../store/actions/works";
import Select from "react-select";
import departments from "../../../../assets/data/departments"
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineDriveFolderUpload} from "react-icons/md";

function AddNewWork() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [work, setWork] = useState({
        name: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        department: "",
        description: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        price: "",
        hoursWeek: null,
        image: null,
        schedule: [],
    });
    const [selected, setSelected] = useState(null);
    const [text, setText] = useState("");
    const [textError, setTextError] = useState("");
    const [nameOpen, setNameOpen] = useState(false);
    const [descOpen, setDescOpen] = useState(false);

    const errors = useSelector(state => state.works.errors);
    const loading = useSelector(state => state.works.loading);

    const handleChange = useCallback((text, path) => {
        setWork({...work, [path]: text});
    }, [work]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setWork({...work, [path]: {...work[path], [val]: text}});
    }, [work]);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setWork({...work, department: selectedOption.label})
    }, [work])

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setWork({...work, image: file})
    }, [work]);

    const handleSchedule = useCallback((e) => {
        e.preventDefault()
        if(text.trim().match(/^\d{2}:\d{2}(\s?)-\1\d{2}:\d{2}$/gm)){
            setWork({...work, schedule: [...work.schedule, text]})
            setText("")
            setTextError("")
        }else{
            setTextError("Invalid format !!")
        }
    }, [work, text]);

    const handleDeleteSchedule = useCallback((e, index) => {
        e.preventDefault();
        work.schedule.splice(index, 1);
        setWork({...work, schedule: [...work.schedule]});
    }, [work])

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(worksAddRequest(work));
        if (payload?.status === 'ok') {
            navigate('/works')
            Account.setNavbarUrlPathSub('works')
        }
    }, [work]);

    return (
        <div className={'add-new-works childrenWidth'}>
            <Helmet>
                <title>add new works</title>
            </Helmet>
            <div className="add_con">
                <form>
                    <div className="left_row">
                        <h3 onClick={() => {
                            setNameOpen(!nameOpen)
                        }}>Name {nameOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {nameOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={work.name.en}
                                    onChange={(e) => handleChangeText(e, "name", "en")}
                                    placeholder={'English name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.en ? <small>{errors.name.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={work.name.ru}
                                    onChange={(e) => handleChangeText(e, "name", "ru")}
                                    placeholder={'Russian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.ru ? <small>{errors.name.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={work.name.am}
                                    onChange={(e) => handleChangeText(e, "name", "am")}
                                    placeholder={'Armenian name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.am ? <small>{errors.name.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={work.name.pl}
                                    onChange={(e) => handleChangeText(e, "name", "pl")}
                                    placeholder={'Polish name...'}
                                    type="text"/>
                            </div>
                            {errors?.name?.pl ? <small>{errors.name.pl}</small> : null}
                        </div>
                        }
                        <Select value={selected}
                                options={departments}
                                onChange={handleSelectChange}
                                placeholder={<div>Departments...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />
                        <div className={'input_item'}>
                            <input
                                value={work.hoursWeek}
                                onChange={(e) => handleChange(e.target.value, "hoursWeek")}
                                placeholder={'hoursWeek...'}
                                type="number"/>
                        </div>
                        {errors?.hoursWeek ? <small className={'errors_message'}>{errors.hoursWeek}</small> : null}
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
                            {errors?.file ? <small>{errors.file}</small> : null}
                        </div>
                        {
                            work.image ?
                                <figure className={'icon_file_img'}>
                                    <img src={URL.createObjectURL(work?.image)} alt={""}/>
                                </figure>
                                : null
                        }
                    </div>
                    <div className="right_item">
                        <div className={"work_schedule"}>
                            <div className={"schedule"}>
                                <div className={"input_item"}>
                                    <input
                                        placeholder={'00:00 - 00:00'}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        type="text"/>
                                </div>
                                <Button title={"Add"} onClick={handleSchedule}/>
                            </div>
                            {textError ? <small className={'errors_message'}>{textError}</small> : null}
                            {work.schedule && <div className={"list"}>
                                {work.schedule.map((text, i) => (<div key={i}>
                                        <p key={i}>{text}</p>
                                        <AiFillDelete onClick={(e) => handleDeleteSchedule(e, i)}/>
                                    </div>
                                ))}
                            </div>}
                        </div>
                        <div className="input_item_right">
                            <div className={'price_row'}>
                                <input
                                    placeholder={'Price...'}
                                    value={work.price}
                                    onChange={(e) => handleChange(e.target.value, "price")}
                                    type="text"/>
                            </div>
                        </div>
                        {errors?.price ? <small className={'errors_message'}>{errors.work}</small> : null}

                        <h3 onClick={() => {
                            setDescOpen(!descOpen)
                            setNameOpen(false)
                        }}>Description {descOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {descOpen && <div className={"open_input"}>
                            <div className={'desc_text'}>
                                <textarea
                                    value={work.description.en}
                                    onChange={(e) => handleChangeText(e, "description", "en")}
                                    placeholder={'English Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={work.description.ru}
                                    onChange={(e) => handleChangeText(e, "description", "ru")}
                                    placeholder={'Russian Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={work.description.am}
                                    onChange={(e) => handleChangeText(e, "description", "am")}
                                    placeholder={'Armenian Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={work.description.pl}
                                    onChange={(e) => handleChangeText(e, "description", "pl")}
                                    placeholder={'Polish Description text...'}/>
                            </div>
                        </div>}
                        <Button title={'Save'} loading={loading} onClick={handleSubmitSave}/>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewWork;