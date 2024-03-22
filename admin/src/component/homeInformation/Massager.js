import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import Modal from "react-modal";
import IsLoading from "../IsLoading";

import { ReactComponent as EditIcon} from "../../assets/icon/edit.svg";
import { ReactComponent as DeleteIcon} from "../../assets/icon/delete.svg";
import { ReactComponent as CloseIcon} from "../../assets/icon/close.svg";
import {massagerDeleteRequest, massagerUpdateRequest} from "../../store/actions/massagers";

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

const { REACT_APP_API_URL } = process.env;

function Massager({massager}) {
    const dispatch = useDispatch();

    const [updateMassager, setUpdateMassager] = useState({
        name: massager.name,
        icon: {}
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});

    const loading = useSelector(state => state.massagers.loading);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setUpdateMassager({...updateMassager, icon: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [updateMassager]);

    const handleDeleteImage = useCallback(() => {
        setUpdateMassager({...updateMassager, icon: {}})
        setFile("")
    }, [updateMassager])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(massagerUpdateRequest({id: massager.id, updateMassager}));
            if(payload.status === "ok"){
                setErrors({})
                setFile("")
                setIsEdit(false)
            }
            if(payload.errors){
                setErrors(payload.errors)
            }
        }catch (e) {
            console.log(e)
        }
    }, [updateMassager])

    const handleDelete = useCallback(() => {
        dispatch(massagerDeleteRequest({id: massager.id}))
    }, [massager])

    return (
        <>
            <tr>
                <td>{massager.id}</td>
                <td>{massager.name}</td>
                <td><img src={`${REACT_APP_API_URL}/${massager.icon}`} alt={""} onClick={() => setOpen(true)} width={40} height={40}/></td>
                <td>
                    <EditIcon onClick={() => setIsEdit(true)} />
                    <DeleteIcon onClick={handleDelete} />
                </td>
            </tr>
            {isEdit ? createPortal(<>
                <Modal
                    isOpen={isEdit}
                    onRequestClose={() => setIsEdit(false)}
                    style={customStyles}>
                    <div className="update">
                        <CloseIcon  onClick={() => setIsEdit(false)} className="close"/>
                        <form onSubmit={submit}>
                            <h3>Update Massager</h3> <br/>
                            <input type={"text"} value={updateMassager.name}
                                   onChange={(ev) => setUpdateMassager({...updateMassager, name: ev.target.value})}/><br/>

                            <div>
                                <label className="input-file">
                                    <input type="file" onChange={handleFileSelect} accept="image/*"/>
                                    <span>Choose file</span>
                                    {errors.icon && <p>{errors.icon}</p>}
                                </label>

                                {file !== "" ? <div className={'photo'}>
                                    <DeleteIcon onClick={handleDeleteImage}/>
                                    <img src={file} alt={""} onClick={() => setOpen(true)} width={40} height={40}/>
                                </div> : <div className={'photo'}>
                                    <img src={`${REACT_APP_API_URL}/${massager.icon}`} alt={""} onClick={() => setOpen(true)} width={40} height={40}/>
                                </div>}
                            </div>

                            <button type="submit" className={"save"}>{
                                loading ? <IsLoading color={'#E88716'} size={14}/>
                                    : "Save"
                            }</button>
                        </form>
                    </div>
                </Modal>
            </>, document.getElementById("root")) : null}

            {open ? createPortal(<>
                <Modal
                    isOpen={open}
                    onRequestClose={() => setOpen(false)}
                    style={customStyles}>
                    <div className="image">
                        <CloseIcon  onClick={() => setOpen(false)} className="close"/>
                        {file !== "" ?
                            <img src={file} alt={""} onClick={() => setOpen(true)} width={40} height={40}/>
                            : <img src={`${REACT_APP_API_URL}/${massager.icon}`} alt={""} onClick={() => setOpen(true)} width={100} height={100}/>}
                    </div>
                </Modal>
            </>, document.getElementById("root")) : null}

        </>
    );
}

export default Massager;