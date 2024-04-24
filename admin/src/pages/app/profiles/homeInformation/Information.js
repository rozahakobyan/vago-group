import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {homeInfoListRequest} from "../../../../store/actions/homeInfo";
import {API_URL} from "../../../../Api";

function Information() {
    const dispatch = useDispatch()
    const list = useSelector(state => state.homeInfo.infoList);

    useEffect(() => {
        dispatch(homeInfoListRequest())
    }, []);

    console.log(list)

    return (
        <div>
            {list.map(l => (
                <video src={`${API_URL}/${l.video}`} playsInline={true}/>
            ))}
        </div>
    );
}

export default Information;