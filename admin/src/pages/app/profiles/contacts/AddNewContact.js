import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Account} from "../../../../helpers/account";
import {Helmet} from "react-helmet";
import Button from "../../../../components/Button";
import {AiFillDelete} from "react-icons/ai";
import {contactsAddRequest} from "../../../../store/actions/contacts";
import {massagerListRequest} from "../../../../store/actions/massagers";
import Path from "../../../../components/contacts/Path";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

function AddNewContact() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [contact, setContact] = useState({
        address: {
            en: "",
            ru: "",
            am: "",
            pl: ""
        },
        email: "",
        phone: "",
        activeContact: false,
        pathList: [],
    });
    const [addressOpen, setAddressOpen] = useState(false);
    
    const errors = useSelector(state => state.contacts.errors);
    const loading = useSelector(state => state.contacts.loading);
    const massagersList = useSelector(state => state.massagers.massagersList);

    useEffect(() => {
        dispatch(massagerListRequest())
    }, []);

    const handleChangeText = useCallback((e, path, val) => {
        const text = e.target.value
        setContact({...contact, [path]: {...contact[path], [val]: text}});
    }, [contact]);

    const handleChange = useCallback((text, path) => {
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
                <address>add new contacts</address>
            </Helmet>
            <div className="add_con">
                <form className={"form"}>
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
                        <h3 onClick={() => {
                            setAddressOpen(!addressOpen)
                        }}>Address  {addressOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</h3>
                        {addressOpen && <div className={"open_input"}>
                            <div className={'input_item'}>
                                <input
                                    value={contact.address.en}
                                    onChange={(e) => handleChangeText(e, "address", "en")}
                                    placeholder={'English address...'}
                                    type="text"/>
                            </div>
                            {errors?.address?.en ? <small>{errors.address.en}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={contact.address.ru}
                                    onChange={(e) => handleChangeText(e, "address", "ru")}
                                    placeholder={'Russian address...'}
                                    type="text"/>
                            </div>
                            {errors?.address?.ru ? <small>{errors.address.ru}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={contact.address.am}
                                    onChange={(e) => handleChangeText(e, "address", "am")}
                                    placeholder={'Armenian address...'}
                                    type="text"/>
                            </div>
                            {errors?.address?.am ? <small>{errors.address.am}</small> : null}
                            <div className={'input_item'}>
                                <input
                                    value={contact.address.pl}
                                    onChange={(e) => handleChangeText(e, "address", "pl")}
                                    placeholder={'Polish address...'}
                                    type="text"/>
                            </div>
                            {errors?.address?.pl ? <small>{errors.address.pl}</small> : null}
                        </div>
                        }

                        <div className={'input_item'}>
                            <input
                                placeholder={'Phone...'}
                                value={contact.phone}
                                onChange={(e) => handleChange(e.target.value, "phone")}
                                type="text"/>
                        </div>
                        {errors?.phone ? <small className={'errors_message'}>{errors?.phone}</small> : null}

                        <div className={'input_item'}>
                            <input
                                placeholder={'Email...'}
                                value={contact.email}
                                onChange={(e) => handleChange(e.target.value, "email")}
                                type="text"/>
                        </div>
                        {errors?.email ? <small className={'errors_message'}>{errors?.email}</small> : null}

                        <div className={'input_item'}>
                            <label> Active Contact
                                <input
                                    checked={contact.activeContact}
                                    onChange={(e) => handleChange(e.target.checked, "activeContact")}
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