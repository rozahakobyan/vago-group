import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../../../../components/LoadingPage";
import Contact from "../../../../components/contacts/Contact";
import {Helmet} from "react-helmet";
import {contactsListRequest} from "../../../../store/actions/contacts";

function Contacts() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.contacts.loading);
    const contactsList = useSelector(state => state.contacts.contactsList);

    useEffect(() => {
        dispatch(contactsListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'contacts childrenWidth'}>
            <Helmet>
                <title>all contacts</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : contactsList.map(item =>
                            <Contact
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                contact={item}/>)
                }
            </div>
        </div>
    );
}

export default Contacts;