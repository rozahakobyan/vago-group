import React, { useEffect, useState } from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';

function Services() {
    const [product, setProduct] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('https://reqres.in/api/users', { page: pageNumber })
            setProduct(data.data)
            console.log(data)
            setPageCount(data.total_pages)
        })()
    }, [pageNumber])



    return (
        <div className="logistic-priceList">
            <h2 className="logistic-priceList-title">Services</h2>
            <div className="logistic-priceList-area">
                <table className="logistic-Price-table">
                    <thead>
                        <tr>
                            <th>first name</th>
                            <th>second name</th>
                            <th>image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map(p => (
                            <tr key={p.id}>
                                <td>{p.first_name}</td>
                                <td>{p.last_name}</td>
                                <td><img src={p.avatar} alt={""} width={50} height={50} /></td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                <div className={"pages-list"}>
                    <ReactPaginate
                        pageRangeDisplayed={2}
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={">"}
                        initialPage={pageNumber - 1}
                        onPageChange={(ev) => setPageNumber(ev.selected + 1)}
                        pageCount={pageCount}
                        pageClassName={'item pagination-page '}
                        previousClassName={"item previous"}
                        previousLabel={"<"} />
                </div>
            </div>
        </div>
    )
}

export default Services