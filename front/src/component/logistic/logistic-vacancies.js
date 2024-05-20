import React, { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { worksListRequest } from "../../store/actions/works";
import { API_URL } from "../../Api"
import ReactPaginate from "react-paginate";
import { Account } from "../../helpers/Account";
import translation from "../../assets/data/translation";


function Vacancieces() {
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    const worksList = useSelector(state => state.works.worksList)
    const loading = useSelector(state => state.works.loading)
    const pages = useSelector(state => state.works.pages)

    const language = Account.getLanguage();

    useEffect(() => {
        dispatch(worksListRequest({ department: "Logistic", limit: 4, page }))
    }, [page])

    return (
        <div className="vacanciesArea">
            <div className="vacanciesTitle">
                <h2>{worksList && translation.vacancies[language]}</h2>
            </div>
            <div className="vacancies-blocks">
                {worksList && !loading ? worksList.map(w => (
                    <div key={w.id}>
                        <table className="vacancie">
                            <tbody>
                                <tr className="vacancie-text">
                                    <td>
                                        <div className="vacancieImgArea">
                                            <img src={`${API_URL}/${w.image}`} alt={""} />
                                        </div>
                                        <div className="vacancie-title">
                                            <h3>{w.translation[language].name}</h3>
                                        </div>
                                        <div className="vacancie-price-hours">
                                            <p><strong>{translation.vacanciesPrice[language]}</strong> - {w.price}<br />
                                                <strong>{translation.vacanciesHAW[language]}</strong> - {w.hoursWeek}{translation.vacanciesHour[language]}</p>
                                        </div>
                                        <div className="vacancie-workSchedule">
                                            <strong>{translation.vacanciesWorkSchedule[language]}</strong>
                                        </div>
                                        {w.schedules && w.schedules.map(ws => (
                                            <p key={ws.id}>
                                                {ws.date}
                                            </p>
                                        ))}
                                        <div className="vacancie-join-area">
                                            <NavLink to={`/vacancies-detales/${w.id}`}>
                                                <div className="vacancie-join">
                                                    <strong>{translation.vacanciesJoin[language]}</strong>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>)) : <div>
                    <div className="loader"></div>
                </div>}
            </div>
            <div className={"pages-list"}>
                {pages && pages > 1 ? <ReactPaginate
                    activeClassName={'items active '}
                    breakClassName={'items break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"items next "}
                    nextLabel={">"}
                    initialPage={page - 1}
                    onPageChange={(ev) => setPage(ev.selected + 1)}
                    pageCount={pages}
                    pageClassName={'items pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"items previous"}
                    previousLabel={"<"} /> : null}
            </div>
        </div>
    )
}


export default Vacancieces