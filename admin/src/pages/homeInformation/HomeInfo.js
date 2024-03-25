import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../../component/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {addHomeInfoRequest, homeInfoListRequest} from "../../store/actions/homeInfo";
import Info from "../../component/homeInformation/Info";
import {createPortal} from "react-dom";
import Modal from "react-modal";

import {ReactComponent as DeleteIcon} from "../../assets/icon/delete.svg";
import {ReactComponent as CloseIcon} from "../../assets/icon/close.svg";
import IsLoading from "../../component/IsLoading";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: "#bebebe",
        borderRadius: "35px 10px 35px 10px",
    },
};

function HomeInfo() {
    const dispatch = useDispatch();

    const [info, setInfo] = useState({
        title: "",
        video: {},
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [errors, setErrors] = useState({});

    const loading = useSelector(state => state.homeInfo.loading);
    const infoList = useSelector(state => state.homeInfo.infoList);

    useEffect(() => {
        dispatch(homeInfoListRequest())
    }, []);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setInfo({...info, video: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [info]);

    const handleDeleteImage = useCallback(() => {
        setInfo({...info, video: {}})
        setFile("")
    }, [info])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(addHomeInfoRequest(info));
            if(payload.status === "ok"){
                setInfo({
                    title: "",
                    video: {},
                })
                setErrors({})
                setFile("")
                setIsAdd(false)
            }
            if(payload.errors){
                setErrors(payload.errors)
            }
        }catch (e) {
            console.log(e)
        }
    }, [info])

    return (
        <Wrapper helmetTitle={"Info"}>
            <div className="table-wrapper">
                <table className="fl-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Video</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {infoList.map(info => (
                            <Info info={info} key={info.id}/>
                        )) }
                    </tbody>
                </table>
                <button className={"add"} onClick={() => setIsAdd(true)}>Add</button>
            </div>

            {isAdd ? createPortal(<>
                <Modal
                    isOpen={isAdd}
                    onRequestClose={() => setIsAdd(false)}
                    style={customStyles}>
                    <section className={"infoAdd"}>
                        <CloseIcon  onClick={() => setIsAdd(false)} className="close"/>
                        <form onSubmit={submit}>
                            <h3>Add new info</h3> <br/>
                            <input type={"text"} placeholder={"title"} value={info.title}
                                   onChange={(ev) => setInfo({...info, title: ev.target.value})}
                            /> <br/>
                            {errors.title && <p>{errors.title}</p>}

                            <div>
                                <label className="input-file">
                                    <input type="file" onChange={handleFileSelect} accept="video/*"/>
                                    <span>Choose file</span>
                                    {errors.video && <p>{errors.video}</p>}
                                </label>

                                {file !== "" ? <div className={'photo'}>
                                    <DeleteIcon onClick={handleDeleteImage}/>
                                    <video src={file} onClick={() => setOpen(true)}/>
                                </div> : null}
                            </div>

                            <button type="submit" className={"save"}>{
                                loading ? <IsLoading color={'#E88716'} size={14}/>
                                    : "Save"
                            }</button>
                        </form>
                    </section>
                </Modal>
            </>, document.getElementById("root")) : null}

            {open ? createPortal(<>
                <Modal
                    isOpen={open}
                    onRequestClose={() => setOpen(false)}
                    style={customStyles}>
                    <div className="image">
                        <CloseIcon  onClick={() => setOpen(false)} className="close"/>
                        <video src={file}/>
                    </div>
                </Modal>
            </>, document.getElementById("root")) : null}
        </Wrapper>
    );
}

export default HomeInfo;