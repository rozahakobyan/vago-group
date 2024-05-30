import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FaWindowClose} from "react-icons/fa";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import Button from "../Button";
import {AiFillDelete} from "react-icons/ai";
import {isLoading, contactsPathDeleteRequest, contactsUpdateRequest } from '../../store/actions/contacts';
import Select from "react-select";
import Path from "./Path";
import {massagerListRequest} from "../../store/actions/massagers";
import {NavLink} from "react-router-dom";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

function UpdateItemContact({updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [addressOpen, setAddressOpen] = useState(false);
    
    const massagersList = useSelector(state => state.massagers.massagersList);
    const errors = useSelector(state => state.contacts.errors);
    
    useEffect(() => {
        dispatch(massagerListRequest())
    }, []);

    const handleClose = useCallback(() => {
        setUpdateItem({...updateItem, isActive: true})
        setAddressOpen(false)
    }, [updateItem]);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setUpdateItem({...updateItem, translation: {...updateItem.translation,
                [path]: {...updateItem.translation[path], [val]: text}}});
    }, [updateItem]);
    
    const handleChange = useCallback((text, path) => {
        setUpdateItem({...updateItem, [path]: text});
    }, [updateItem]);

    const handleDeletePath = useCallback((e, index) => {
        e.preventDefault();
        updateItem.pathList.splice(index, 1);
        setUpdateItem({...updateItem, pathList: [...updateItem.pathList]})
    }, [updateItem])

    const handleDeleteOriginalPath = useCallback(async(e, item) => {
        e.preventDefault();
        const filterDate = updateItem.massagersList.filter(i => {
            if (i.id !== item.id) {
                return item
            }
        });
        const {payload} = await dispatch(contactsPathDeleteRequest(item.id))
        if(payload.status === "ok"){
            setUpdateItem({...updateItem, massagersList: filterDate})
        }
    }, [updateItem])

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        dispatch(isLoading('of'))
        const {payload} = await dispatch(contactsUpdateRequest(updateItem))
        if (!payload.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        updateItem ?
            <CustomsPortal className={'update_contact container_modal'}>
                <div className={classNames('modal', {
                    isActive: updateItem.isActive
                })}>
                    <FaWindowClose onClick={handleClose} className={'close'}/>
                    <form>
                        <div className={'cont'}>
                            <div className="left_row">
                                <div className={"path_list"}>
                                    {massagersList && massagersList.map(m => (
                                        <Path m={m} contact={updateItem} setContact={setUpdateItem} key={m.id}/>
                                    ))}

                                    {updateItem.massagersList && <div className={"list"}>{updateItem.massagersList.map(m => (
                                                <div key={m.id}>
                                                    <p>{m.massager.name}</p>
                                                    <NavLink to={m.path}>{m.path}</NavLink>
                                                    <AiFillDelete onClick={(e) => handleDeleteOriginalPath(e, m)}/>
                                                </div>
                                            ))}
                                    </div>}

                                    {updateItem.pathList && <div className={"list"}>
                                        {updateItem.pathList.map((p, i) => (<div key={p.massagerId}>
                                                <p>{p.path}</p>
                                                <AiFillDelete onClick={(e) => handleDeletePath(e, i)}/>
                                            </div>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                            <div className="right_item">
                                <h3 onClick={() => {
                                    setAddressOpen(!addressOpen)
                                }}>Address  {addressOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                                {addressOpen && <div className={"open_input"}>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.en.address}
                                            onChange={(e) => handleChangeText(e, "en", "address")}
                                            placeholder={'English address...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.ru.address}
                                            onChange={(e) => handleChangeText(e, "ru", "address")}
                                            placeholder={'Russian address...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.am.address}
                                            onChange={(e) => handleChangeText(e, "am", "address")}
                                            placeholder={'Armenian address...'}
                                            type="text"/>
                                    </div>
                                    <div className={'input_item'}>
                                        <input
                                            value={updateItem.translation.pl.address}
                                            onChange={(e) => handleChangeText(e, "pl", "address")}
                                            placeholder={'Polish address...'}
                                            type="text"/>
                                    </div>
                                </div>
                                }

                                <div className={'input_item'}>
                                    <input
                                        placeholder={'Phone...'}
                                        value={updateItem.phone}
                                        onChange={(e) => handleChange(e.target.value, "phone")}
                                        type="text"/>
                                </div>
                                {errors.phone ? <small className={'errors_message'}>{errors.phone}</small> : null}

                                <div className={'input_item'}>
                                    <input
                                        placeholder={'Email...'}
                                        value={updateItem.email}
                                        onChange={(e) => handleChange(e.target.value, "email")}
                                        type="text"/>
                                </div>
                                {errors.email ? <small className={'errors_message'}>{errors.email}</small> : null}

                                <div className={'input_item'}>
                                    <label> Active contact
                                        <input
                                            checked={updateItem.activeContact}
                                            onChange={(e) => handleChange(e.target.checked, "activeContact")}
                                            type="checkbox"/>
                                    </label>
                                </div>

                                <Button title={'Save'} onClick={handleSave}/>
                            </div>
                        </div>
                    </form>
                </div>
            </CustomsPortal>
            : null
    );
}

export default UpdateItemContact;