import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historiesListRequest } from "../../store/actions/histories";

function History() {
    const dispatch = useDispatch();

    const historiesList = useSelector(state => state.histories.historiesList)

    useEffect(() => {
        dispatch(historiesListRequest({ active: true }))
    }, []);

    console.log(historiesList)

    return (
        <div className="history-area">
            <div className="history-title">
                <h1><strong>History</strong></h1>
            </div>
            {historiesList && historiesList.map(h => (
                <div className="history-text" key={h.id}>
                    <p style={{ color: '#999999' }}>{h.description}</p>
                </div>
            ))}

        </div>
    )
}

export default History