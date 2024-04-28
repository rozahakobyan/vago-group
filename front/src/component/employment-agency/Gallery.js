import React, { useState, useCallback } from "react";

function Gallery() {
    const [fullscreenImg, setFullscreenImg] = useState("");

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
            <div className="gallery-blocks">
                <img src={"./img/logo.jpg"} onClick={() => openFullscreenImg("./img/logo.jpg")} alt={""}/>
                <img src={"./img/gortsiq.jpg"} onClick={() => openFullscreenImg("./img/gortsiq.jpg")} alt={""}/>
                <img src={"./img/logo.jpg"} onClick={() => openFullscreenImg("./img/logo.jpg")} alt={""}/>
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
                <iframe width="560" height="315" src="https://www.youtube.com/embed/FwVx8PV3V0M?si=OyHsuVIac0WXC5Sm" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/FwVx8PV3V0M?si=OyHsuVIac0WXC5Sm" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            </div>
        </div>
    );
}

export default Gallery;
