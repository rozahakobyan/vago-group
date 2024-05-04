import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Account} from "../../../../helpers/account";
import {Helmet} from "react-helmet";
import Button from "../../../../components/Button";
import {videoPathsAddRequest} from "../../../../store/actions/videoPath";
import Select from "react-select";
import videoPage from "../../../../assets/data/videoPage";

function AddNewVideoPath() {
    const [videoPath, setVideoPath] = useState({
        path: "",
        pageVideo: "",
    });
    const [text, setText] = useState("");
    const [selected, setSelected] = useState(null);
    const loading = useSelector(state => state.videoPath.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(text.trim().match(/^https?:\/\/(w{3})?.?youtu.be(\/.+)?/gm)){
            setVideoPath({...videoPath, path: text});
        }
    }, [videoPath, text]);

    const handleSelectChange = useCallback((selectedOption) => {
        setSelected(selectedOption)
        setVideoPath({...videoPath, pageVideo: selectedOption.label})
    }, [videoPath])
    
    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(videoPathsAddRequest(videoPath));
        if (payload?.status === 'ok') {
            navigate('/information/video-paths')
            Account.setNavbarUrlPathSub('video-paths')
        }
    }, [videoPath]);

    return (
        <div className={'add-new-video-path childrenWidth'}>
            <Helmet>
                <title>add new video paths</title>
            </Helmet>
            <div className="add_con">
                <form>
                    <div className="left_row">
                        <div className={'input_item'}>
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={'iframe...'}
                                type="text"/>
                        </div>

                        <Select value={selected}
                                options={videoPage}
                                onChange={handleSelectChange}
                                placeholder={<div>Page...</div>}
                                className="react-select-containers"
                                classNamePrefix="react-selects"
                        />
                        <Button title={'Save'} loading={loading} onClick={handleSubmitSave}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewVideoPath;