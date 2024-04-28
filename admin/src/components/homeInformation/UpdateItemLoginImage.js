import React, {useCallback} from 'react';
import {isLoading, massagerUpdateRequest} from "../../store/actions/massagers";
import {useDispatch} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import classNames from "classnames";
import {API_URL} from "../../Api";
import {loginImageUpdateRequest} from "../../store/actions/loginImage";

function UpdateItemLoginImage({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
    }, [updateItem]);

    const handleChangeFile = useCallback((e) => {
        const file = e.target.files[0]
        setUpdateItem({...updateItem, image: file})
    }, [updateItem]);

    const handleChangeActive = useCallback((e, path) => {
        const text = e.target.checked
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(loginImageUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_login_image container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className={'input_item'}>
                                <label> Active Login Image
                                    <input
                                        checked={updateItem.active}
                                        onChange={(e) => handleChangeActive(e, "active")}
                                        type="checkbox"/>
                                </label>
                            </div>

                            <div className={'row_img'}>
                                <div>
                                    <div className={'custom-file'}>
                                        <label
                                            htmlFor="file-upload"
                                            className="custom-file-upload">
                                            <MdOutlineDriveFolderUpload
                                                className={'icon'}/>
                                            Choose file
                                        </label>
                                        <input
                                            onChange={handleChangeFile}
                                            name={'files'}
                                            accept="image/*"
                                            id="file-upload"
                                            type="file"/>
                                    </div>

                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                                <div className={'images'}>
                                    <img src={
                                        updateItem?.image?.name
                                            ? URL.createObjectURL(updateItem.image)
                                            : `${API_URL}/${updateItem.image}`}
                                         alt={""}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemLoginImage;