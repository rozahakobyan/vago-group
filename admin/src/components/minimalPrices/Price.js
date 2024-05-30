import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemPrice from "./UpdateItemPrice";
import {minimalPricesDeleteRequest} from "../../store/actions/minimalPrices";

function Price({price, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(minimalPricesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((price) => () => {
        setUpdateItem(price)
    }, []);

    return (
        <div className={`item${price.active ? " active" : ""}`}>
            <h3>{price.eur} eur</h3>
            <h3>{price.usd} usd</h3>
            <h3>{price.rub} rub</h3>
            <h3>{price.amd} amd</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(price)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(price.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemPrice
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Price;