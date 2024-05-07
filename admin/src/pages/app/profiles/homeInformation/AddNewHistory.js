import React, {useCallback, useState} from 'react';
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Account} from "../../../../helpers/account";
import Button from "../../../../components/Button";
import {historiesAddRequest} from "../../../../store/actions/histories";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

const AddNewHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [history, setHistory] = useState({
        description: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        active: false});
    const [descOpen, setDescOpen] = useState(false);
    
    const errors = useSelector(state => state.histories.errors);
    const loading = useSelector(state => state.histories.loading);
    
    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setHistory({...history, [path]: {...history[path], [val]: text}});
    }, [history]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setHistory({...history, [path]: text});
    }, [history]);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(historiesAddRequest(history));
        if (payload?.status === 'ok') {
            navigate('/information/histories')
            Account.setNavbarUrlPathSub('histories')
        }
    }, [history]);

    return (
        <div className={'add-new-history childrenWidth'}>
            <Helmet>
                <title>add new history</title>
            </Helmet>
            <div className="add_con">
                <form onSubmit={handleSubmitSave}>
                    <div className="left_row">
                        <h3 onClick={() => {
                            setDescOpen(!descOpen)
                        }}>Description {descOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {descOpen && <div className={"open_input"}>
                            <div className={'desc_text'}>
                                <textarea
                                    value={history.description.en}
                                    onChange={(e) => handleChangeText(e, "description", "en")}
                                    placeholder={'English Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={history.description.ru}
                                    onChange={(e) => handleChangeText(e, "description", "ru")}
                                    placeholder={'Russian Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={history.description.am}
                                    onChange={(e) => handleChangeText(e, "description", "am")}
                                    placeholder={'Armenian Description text...'}/>
                            </div>
                            <div className={'desc_text'}>
                                <textarea
                                    value={history.description.pl}
                                    onChange={(e) => handleChangeText(e, "description", "pl")}
                                    placeholder={'Polish Description text...'}/>
                            </div>
                        </div>}

                        <div className={'input_item'}>
                            <label> Active History
                                <input
                                    checked={history.active}
                                    onChange={(e) => handleChangeActive(e, "active")}
                                    type="checkbox"/>
                            </label>
                        </div>

                        <Button title={'Save'} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewHistory;
