import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { galleriesListRequest } from "../../store/actions/galleries";
import ReactPaginate from "react-paginate";
import { API_URL } from "../../Api"


function Gallery() {
    const dispatch = useDispatch();

    const [fullscreenImg, setFullscreenImg] = useState("");
    const [page, setPage] = useState(1);

    const pages = useSelector(state => state.galleries.pages);
    const galleriesList = useSelector(state => state.galleries.galleriesList);
    const loading = useSelector(state => state.galleries.loading);

    useEffect(() => {
        dispatch(galleriesListRequest({ page, limit: 4, pageGallery: "Construction" }))
    }, [page]);

    console.log(galleriesList)

    const openFullscreenImg = useCallback((src) => {
        setFullscreenImg(src);
    }, []);

    const closeFullscreenImg = useCallback(() => {
        setFullscreenImg("");
    }, [])

    return (
        <div className="galleryArea">
            <div className="gallery-title">
                <h2>Gallery</h2>
            </div>
            <div className="gallery-type">
                <h3>Photo</h3>
            </div>

            <div className="gallery-blocks" >
                {galleriesList && galleriesList.map(g => (
                    <img src={`${API_URL}/${g.src}`} onClick={() => openFullscreenImg(`${API_URL}/${g.src}`)} alt={""} key={g.id}/>
                ))}
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
            {fullscreenImg && (
                <div className="fullscreen-img-overlay" onClick={closeFullscreenImg}>
                    <div className="fullscreen-img-container">
                        <img src={fullscreenImg} alt="Fullscreen" />
                        <button className="close-btn" onClick={closeFullscreenImg}>✕</button>
                    </div>
                </div>
            )}

            <div className="gallery-type">
                <h3>Video</h3>
            </div>
            <div className="gallery-blocks">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/FwVx8PV3V0M?si=OyHsuVIac0WXC5Sm"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/FwVx8PV3V0M?si=OyHsuVIac0WXC5Sm"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}></iframe>
            </div>
        </div>
    );
}

export default Gallery;
