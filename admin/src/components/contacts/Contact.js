import React, {useCallback} from 'react';
import {NavLink} from "react-router-dom"
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {contactsDeleteRequest} from "../../store/actions/contacts";
import UpdateItemContact from "./UpdateItemContact";
import {API_URL} from "../../Api";

function Contact({contact, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(contactsDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((contact) => () => {
        setUpdateItem(contact)
    }, []);
    
    return (
        <div className={`item${contact.activeContact ? " active" : ""}`}>
            <h3>Email - {contact.email}</h3>
            <h3>Phone - {contact.phone}</h3>
            {contact.massagersList && contact.massagersList.map(m => (
                <NavLink key={m.id} to={m.path}>{m.massager.name}</NavLink>
            ))}
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(contact)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(contact.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemContact
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Contact;