import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {pricesListRequest} from "../../store/actions/prices";

function Prices() {
    const dispatch = useDispatch();

    const pricesList = useSelector(state => state.prices.pricesList);

    useEffect(() => {
        dispatch(pricesListRequest({active: true}))
    }, []);

    console.log(pricesList)

    return (
        <div className="priceList">
            <div className="priceList-area">
                <h2 className="priceList-title">Packages List</h2>
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
                                <td className="service-name">Packages</td>
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