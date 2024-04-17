import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Product from "../../../../components/products/Product";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { productsListRequest } from '../../../../store/actions/products';
import ReactPaginate from "react-paginate";

function Products() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);
    const [page, setPage] = useState(1);

    const loading = useSelector(state => state.products.loading);
    const productsList = useSelector(state => state.products.productsList);
    const pages = useSelector(state => state.products.pages);

    useEffect(() => {
        dispatch(productsListRequest({page}))
    }, [page]);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'products childrenWidth'}>
            <Helmet>
                <title>all products</title>
            </Helmet>
            
            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : productsList.map(item =>
                            <Product
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                product={item}/>)
                }
                {pages !== 1 && <div className={"pages-list"}>
                    <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={">"}
                        initialPage={page - 1}
                        onPageChange={(ev) => setPage(ev.selected + 1)}
                        pageCount={pages}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={"<"} />
                </div>}
            </div>
        </div>
);
}

export default Products;

