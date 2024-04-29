import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {galleriesAddRequest, galleriesListRequest} from "../../../../store/actions/galleries";
import LogImage from "../../../../components/homeInformation/LogImage";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import Gallery from "../../../../components/galleries/Gallery";
import ReactPaginate from "react-paginate";

function Galleries() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);
    const [page, setPage] = useState(1);

    const loading = useSelector(state => state.galleries.loading);
    const galleriesList = useSelector(state => state.galleries.galleriesList);
    const pages = useSelector(state => state.galleries.pages);

    useEffect(() => {
        dispatch(galleriesListRequest({page}))
    }, [page]);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'galleries childrenWidth'}>
            <Helmet>
                <title>all galleries</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : galleriesList.map(item =>
                            <Gallery
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                gallery={item}/>)
                }
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
                        previousLabel={"<"}/> : null}
                </div>
            </div>
        </div>
    );
}

export default Galleries;

