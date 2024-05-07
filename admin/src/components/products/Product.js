import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import { productsDeleteRequest } from '../../store/actions/products';
import UpdateItemProduct from './UpdateItemProduct';

function Product({product, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(productsDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((product) => () => {
        setUpdateItem(product)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${product.image}`} alt={product.name}/>
            <h3>Product - {product.translation.en.name}</h3>
            <h3>Price - {product.price}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(product)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(product.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemProduct
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Product;