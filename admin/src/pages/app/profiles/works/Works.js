import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../../../../components/LoadingPage";
import Work from "../../../../components/works/Work";
import {Helmet} from "react-helmet";
import {worksListRequest} from "../../../../store/actions/works";
import ReactPaginate from "react-paginate";

function Works() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);
    const [page, setPage] = useState(1);

    const loading = useSelector(state => state.works.loading);
    const worksList = useSelector(state => state.works.worksList);
    const pages = useSelector(state => state.works.pages);

    useEffect(() => {
        dispatch(worksListRequest({page}))
    }, [page]);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'works childrenWidth'}>
            <Helmet>
                <title>all works</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : worksList.map(item =>
                            <Work
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                work={item}/>)
                }
                <div className={"pages-list"}>
                    {pages && pages > 1 ? <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={">"}
                        initialPage={page - 1}
                        onPageChange={(ev) => setPage(ev.selected + 1)}
                        pageCount={pages}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={"<"}/> : null}
                </div>
            </div>
        </div>
    );
}

export default Works;