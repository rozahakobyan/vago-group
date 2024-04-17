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
        <div className="priceList">
        <div className="priceList-area">
            <h2 className="priceList-title">Services</h2>
            <div className="priceList-area">
                <table className="Price-table">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Price</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {/* product.map(p => (
                        <tr key={p.id}>
                            <td>{p.first_name}</td>
                            <td>{p.last_name}</td>
                            <td><img src={p.avatar} alt={""} width={50} height={50} /></td>
                        </tr>
                    )) */}
                        <tr>
                            <td className="service-name">esim inch</td>
                            
                            <td>650 EUR</td>
                        </tr>
                        
                    </tbody>

                </table>


            </div>
        </div>
    </div>
    )
}

export default Services