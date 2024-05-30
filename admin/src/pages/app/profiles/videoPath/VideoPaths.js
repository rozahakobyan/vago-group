import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../../../../components/LoadingPage";
import {Helmet} from "react-helmet";
import {videoPathsListRequest} from "../../../../store/actions/videoPath";
import VideoPath from "../../../../components/videoPaths/VideoPath";

function VideoPaths() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.videoPath.loading);
    const videoPathsList = useSelector(state => state.videoPath.videoPathsList);

    useEffect(() => {
        dispatch(videoPathsListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'video-paths childrenWidth'}>
            <Helmet>
                <title>all video paths</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : videoPathsList.map(item =>
                            <VideoPath
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                videoPath={item}/>)
                }
            </div>
        </div>
    );
}

export default VideoPaths;