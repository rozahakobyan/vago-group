import React, { useEffect, useState } from "react";
import axios from 'axios'


function Prices() {
    /* const [product, setProduct] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('https://reqres.in/api/users', { page: pageNumber })
            setProduct(data.data)
            console.log(data)
            setPageCount(data.total_pages)
        })()
    }, [pageNumber]) */



    return (
        <div className="priceList">
            <div className="priceList-area">
                <h2 className="priceList-title">Prices List</h2>
                <div className="priceList-area">
                    <table className="Prices-table">
                        <thead>
                            <tr>
                                <th >Packages</th>
                                <th>Advanced</th>
                                <th>Premium</th>
                                <th>Standard</th>
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
                                <td className="service-name">Prices</td>
                                <td>850 EUR</td>
                                <td>999 EUR</td>
                                <td>650 EUR</td>
                            </tr>
                            <tr>
                                <td className="service-name">Legal consultation on work immigration to Poland</td>
                                <td>🗸</td>
                                <td>🗸</td>
                                <td>🗸</td>
                            </tr>


                            <tr className="order-button">
                                <td className="service-name"></td>
                                <td><button>ORDER</button></td>
                                <td><button>ORDER</button></td>
                                <td><button>ORDER</button></td>
                            </tr>
                        </tbody>

                    </table>


                </div>
            </div>
        </div>
    )
}

export default Prices