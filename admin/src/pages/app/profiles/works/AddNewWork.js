import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {massagerAddRequest} from "../../../../store/actions/massagers";
import {Account} from "../../../../helpers/account";
import {Helmet} from "react-helmet";
import Button from "../../../../components/Button";
import {worksAddRequest} from "../../../../store/actions/works";

function AddNewWork() {
    const [work, setWork] = useState({
        name: "",
        department: "",
        description: "",
        price: null,
        hoursWeek: null,
        schedule: [],
    });
    const [text, setText] = useState("");
    const [textError, setTextError] = useState("");
    const errors = useSelector(state => state.works.errors);
    const loading = useSelector(state => state.works.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeText = useCallback((text, path) => {
        setWork({...work, [path]: text});
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
                        <div className={'input_item'}>
                            <input
                                value={work.name}
                                onChange={(e) => handleChangeText(e.target.value, "name")}
                                placeholder={'name...'}
                                type="text"/>
                        </div>
                        {errors.name ? <small className={'errors_message'}>{errors.name}</small> : null}
                        <div className={'input_item'}>
                            <input
                                value={work.department}
                                onChange={(e) => handleChangeText(e.target.value, "department")}
                                placeholder={'department...'}
                                type="text"/>
                        </div>
                        {errors.department ? <small className={'errors_message'}>{errors.department}</small> : null}
                        <div className={'input_item'}>
                            <input
                                value={work.hoursWeek}
                                onChange={(e) => handleChangeText(e.target.value, "hoursWeek")}
                                placeholder={'hoursWeek...'}
                                type="number"/>
                        </div>
                        {errors.hoursWeek ? <small className={'errors_message'}>{errors.hoursWeek}</small> : null}
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
                            {work.schedule !== [] && <div className={"list"}>
                                {work.schedule.map((text, i) => (
                                    <p key={i}>{text}</p>
                                ))}
                            </div>}
                        </div>
                        <div className="input_item_right">
                            <div className={'price_row'}>
                                <input
                                    placeholder={'Price...'}
                                    value={work.price}
                                    onChange={(e) => handleChangeText(e.target.value, "price")}
                                    type="number"/>
                            </div>
                        </div>
                        {errors.price ? <small className={'errors_message'}>{errors.price}</small> : null}

                        <div className={'desc_text'}>
                                <textarea
                                    onChange={(e) => handleChangeText(e.target.value, "description")}
                                    value={work.description}
                                    placeholder={'Description text...'}/>
                        </div>
                        {errors.description ?
                            <small className={'errors_message'}>{errors.description}</small> : null}
                        <Button title={'Save'} loading={loading} onClick={handleSubmitSave}/>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewWork;