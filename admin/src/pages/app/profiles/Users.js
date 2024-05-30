import React, {useEffect, useMemo, useState} from 'react';
import {Helmet} from "react-helmet";
import AboutItem from "../../../components/users/AboutItem";
import LoadingPage from "../../../components/LoadingPage";
import {useDispatch, useSelector} from "react-redux";
import {usersListRequest} from "../../../store/actions/users";
import {useNavigate, useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateItem, setUpdateItem] = useState(null);
    const [search, setSearch] = useState("");

    const loading = useSelector(state => state.users.loading);
    const list = useSelector(state => state.users.usersList);
    const profile = useSelector(state => state.users.profile);
    const pages = useSelector(state => state.users.pages);

    const { page = 1 } = useParams();

    useEffect(()=>{
        setTimeout(() => {
            dispatch(usersListRequest({page, search}))
        }, 1000)
    },[page, search])

    const usersList = useMemo(() => {
        return list.filter(l => {
            if(l.id !== profile.id){
                return l;
            }
        })
    }, [list, profile])

    return (
        <div className={'users childrenWidth'}>
            <Helmet>
                <title>users</title>
            </Helmet>
            <input className={"input"} value={search} type={"text"} placeholder={"Search..."}
                   onChange={(e) => setSearch(e.target.value)}/>

            <div className="cont_cat">
                {
                    loading ? <LoadingPage/>
                        : usersList.map(item => <AboutItem key={item.id}
                                                           item={item}
                                                           updateItem={updateItem}
                                                           setUpdateItem={setUpdateItem}/>)
                }
                <div className={"pages-list"}>
                    {pages && pages > 1 ? <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={">"}
                        initialPage={page - 1}
                        onPageChange={(ev) => navigate(`/users/${ev.selected + 1}`)}
                        pageCount={pages}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={"<"}/> : null}
                </div>
            </div>

        </div>
    );
};

export default Users;
