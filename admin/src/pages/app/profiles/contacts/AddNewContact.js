import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Account} from "../../../../helpers/account";
import {Helmet} from "react-helmet";
import Button from "../../../../components/Button";
import {AiFillDelete} from "react-icons/ai";
import {contactsAddRequest} from "../../../../store/actions/contacts";
import Select from "react-select";
import {massagerListRequest} from "../../../../store/actions/massagers";
import _ from "lodash";
import Path from "../../../../components/contacts/Path";
import {contactsUpdateRequest} from "../../../../store/actions/contacts";

function AddNewContact() {
    const [contact, setContact] = useState({
        address: "",
        email: "",
        phone: "",
        activeContact: false,
        pathList: [],
    });

    const errors = useSelector(state => state.contacts.errors);
    const loading = useSelector(state => state.contacts.loading);
    const massagersList = useSelector(state => state.massagers.massagersList);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(massagerListRequest())
    }, []);

    const handleChangeText = useCallback((text, path) => {
        setContact({...contact, [path]: text});
    }, [contact]);

    const handleDeletePath = useCallback((e, index) => {
        e.preventDefault();
        contact.pathList.splice(index, 1);
        setContact({...contact, pathList: [...contact.pathList]});
    }, [contact])

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        console.log(contact)
        const {payload} = await dispatch(contactsAddRequest(contact));
        if (payload?.status === 'ok') {
            navigate('/contacts')
            Account.setNavbarUrlPathSub('contacts')
        }
    }, [contact]);

    return (
        <div className={'add-new-contacts childrenWidth'}>
            <Helmet>
                <title>add new contacts</title>
            </Helmet>
            <div className="add_con">
                <form>
                    <div className="left_row">
                        <div className={"path_list"}>
                            {massagersList && massagersList.map(m => (
                                <Path m={m} contact={contact} setContact={setContact} key={m.id}/>
                            ))}

                            {contact.pathList && <div className={"list"}>
                                {contact.pathList.map((p, i) => (<div key={p.massagerId}>
                                        <p key={p.massagerId}>{p.path}</p>
                                        <AiFillDelete onClick={(e) => handleDeletePath(e, i)}/>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                    <div className="right_item">
                        <div className={'input_item'}>
                            <input
                                value={contact.address}
                                onChange={(e) => handleChangeText(e.target.value, "address")}
                                placeholder={'address...'}
                                type="text"/>
                        </div>
                        {errors.address ? <small className={'errors_message'}>{errors.address}</small> : null}

                        <div className={'input_item'}>
                            <input
                                placeholder={'Phone...'}
                                value={contact.phone}
                                onChange={(e) => handleChangeText(e.target.value, "phone")}
                                type="text"/>
                        </div>
                        {errors.phone ? <small className={'errors_message'}>{errors.phone}</small> : null}

                        <div className={'input_item'}>
                            <input
                                placeholder={'Email...'}
                                value={contact.email}
                                onChange={(e) => handleChangeText(e.target.value, "email")}
                                type="text"/>
                        </div>
                        {errors.email ? <small className={'errors_message'}>{errors.email}</small> : null}

                        <div className={'input_item'}>
                            <label> Active Contact
                                <input
                                    checked={contact.activeContact}
                                    onChange={(e) => handleChangeText(e.target.checked, "activeContact")}
                                    type="checkbox"/>
                            </label>
                        </div>

                        <Button title={'Save'} loading={loading} onClick={handleSubmitSave}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewContact;