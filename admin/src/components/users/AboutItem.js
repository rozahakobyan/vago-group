import React, {useCallback, useState} from "react";
import {API_URL} from "../../Api";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {usersDeleteRequest, usersUpdateRequest} from "../../store/actions/users";
import {useParams} from "react-router-dom";
import usersRole from "../../assets/data/usersRole";
import Select from "react-select";
import usersStatus from "../../assets/data/usersStatus";

const AboutItem = ({item, updateItem, setUpdateItem}) => {
    const dispatch = useDispatch();

    const { page } = useParams();

    const profile = useSelector(state => state.users.profile);

    const handleSelectChange = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, role: selectedOption.value, id: item.id, page})
    }, [updateItem, item, page])

    const handleSelectChangeStatus = useCallback((selectedOption) => {
        setUpdateItem({...updateItem, status: selectedOption.value, id: item.id, page})
    }, [updateItem, item, page])

    const handleDeleteGetId = useCallback( (id) => () => {
        dispatch(usersDeleteRequest({id, page}))
    }, [page]);

    const handleSave = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(usersUpdateRequest({updateItem}))
        if (!payload?.errors) {
            setUpdateItem({...updateItem, isActive: true})
        }
    }, [updateItem]);

    return (
        <figure className={`item${item.status === "active" ? " active" : ""}`}>
            <img src={`${API_URL}/${item.photo}`} alt={item.email} width={50} height={50}/>
            <figcaption className={'about_text'}>
                <p>Users email: <span>{item.email}</span></p>
                <p>Users first name: <span>{item.firstName}</span></p>
                <p>Users last name: <span>{item.lastName}</span></p>
                <div className={"select"}><p className={"p"}>Users role: <span>{item.role}</span>
                </p>{profile?.role !== "admin" && item?.role !== "super-admin" ? <>
                    <Select options={usersRole}
                            defaultValue={{value: item.role, label: item.role}}
                            onChange={handleSelectChange}
                            placeholder={<div>Users Role...</div>}
                            className="react-select-containers"
                            classNamePrefix="react-selects"
                    />
                </> : null}</div>
                <div className={"select"}><p className={"p"}>Users status: <span>{item.status}</span>
                </p>{profile?.role !== "admin" && item?.role !== "super-admin" ? <>
                    <Select options={usersStatus}
                            defaultValue={{value: item.status, label: item.status}}
                            onChange={handleSelectChangeStatus}
                            placeholder={<div>Users Status...</div>}
                            className="react-select-containers"
                            classNamePrefix="react-selects"
                    />
                </> : null}</div>
            </figcaption>
            <ul className="icon_row">
                {profile?.role !== "admin" && item?.role !== "super-admin" ? <li
                    onClick={handleSave}
                    className={'icon'}>
                    <BiEdit/>
                </li> : null}

                {profile?.role !== "admin" && item?.role !== "super-admin" ? <li
                    onClick={handleDeleteGetId(item.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li> : null}

                {profile?.role === "admin" && item?.role === "user" ? <li
                    onClick={handleDeleteGetId(item.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li> : null}
            </ul>
        </figure>
    )
};

export default AboutItem;