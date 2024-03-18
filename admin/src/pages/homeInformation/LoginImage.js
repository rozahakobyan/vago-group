import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../../component/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import Modal from "react-modal";

import {ReactComponent as DeleteIcon} from "../../assets/icon/delete.svg";
import {ReactComponent as CloseIcon} from "../../assets/icon/close.svg";
import IsLoading from "../../component/IsLoading";
import {loginImageAddRequest, loginImageListRequest} from "../../store/actions/loginImage";
import LogImage from "../../component/homeInformation/LogImage";

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

function LoginImage() {
    const dispatch = useDispatch();

    const [loginImage, setLoginImage] = useState({
        image: {},
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [errors, setErrors] = useState({});

    const loading = useSelector(state => state.loginImage.loading);
    const loginImagesList = useSelector(state => state.loginImage.loginImagesList);

    useEffect(() => {
        dispatch(loginImageListRequest())
    }, []);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setLoginImage({image: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [loginImage]);

    const handleDeleteImage = useCallback(() => {
        setLoginImage({image: {}})
        setFile("")
    }, [loginImage])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(loginImageAddRequest(loginImage));
            if(payload.status === "ok"){
                setLoginImage({
                    image: {},
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
    }, [loginImage])

    return (
        <Wrapper helmetTitle={"All Login Image"}>
            <div className="table-wrapper">
                <table className="fl-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {loginImagesList.map(loginImage => (
                            <LogImage loginImage={loginImage} key={loginImage.id}/>
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
                            <h3>Add new login image</h3> <br/>
                            <div>
                                <label className="input-file">
                                    <input type="file" onChange={handleFileSelect} accept="image/*"/>
                                    <span>Choose file</span>
                                    {errors.video && <p>{errors.video}</p>}
                                </label>

                                {file !== "" ? <div className={'photo'}>
                                    <DeleteIcon onClick={handleDeleteImage}/>
                                    <img src={file} alt={""} onClick={() => setOpen(true)}/>
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
                        <img src={file} alt={""}/>
                    </div>
                </Modal>
            </>, document.getElementById("root")) : null}
        </Wrapper>
);
}

export default LoginImage;

