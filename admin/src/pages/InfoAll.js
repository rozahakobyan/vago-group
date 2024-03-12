import React, {useEffect} from 'react';
import Wrapper from "../component/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {homeInfoListRequest} from "../store/actions/homeInfo";
import Info from "../component/home/Info";

function InfoAll() {
    const dispatch = useDispatch();

    const infoList = useSelector(state => state.homeInfo.infoList);

    useEffect(() => {
        dispatch(homeInfoListRequest())
    }, [infoList]);

    return (
        <Wrapper helmetTitle={"All Info"}>
            <h2>Responsive Table</h2>
            <div className="table-wrapper">
                <table className="fl-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {infoList.map(info => (
                            <Info info={info} key={info.id}/>
                        )) }
                    </tbody>
                </table>
            </div>
        </Wrapper>
);
}

export default InfoAll;

