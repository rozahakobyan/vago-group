import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { worksListRequest } from "../../store/actions/works";
import { API_URL } from "../../Api"

function Vacancieces() {
    const dispatch = useDispatch();

    const worksList = useSelector(state => state.works.worksList)

    useEffect(() => {
        dispatch(worksListRequest({ department: "Logistic" }))
    }, [])

    console.log(worksList)



    return (
        <div className="vacanciesArea">
            <div className="vacanciesTitle">
                <h2>Vacancies</h2>
            </div>
            <div className="vacancies-blocks">
                {worksList && worksList.map(w => (
                    <div key={w.id}>
                        <table className="vacancie">
                            <tr className="vacancie-text">
                                <td >
                                    <div className="vacancieImgArea">
                                        <img src={`${API_URL}/${w.image}`} alt={""} />
                                    </div>
                                    <div className="vacancie-title">
                                        <h3>{w.name}</h3>
                                    </div>
                                    <div className="vacancie-price-hours">
                                        <p><strong>Price</strong> - {w.price}<br />
                                            <strong>Hours a Week</strong> - {w.hoursWeek}h</p>
                                    </div>
                                    <div className="vacancie-workSchedule">
                                        <strong>Work Schedule</strong>
                                    </div>
                                    {w.schedules && w.schedules.map(ws => (
                                        <p key={ws.id}>
                                            {ws.date}
                                        </p>
                                    ))}
                                    <div className="vacancie-join-area">
                                        <NavLink to={`/vacancies-detales/${w.id}`}>
                                            <div className="vacancie-join">
                                                <strong>Join</strong>
                                            </div>
                                        </NavLink>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Vacancieces