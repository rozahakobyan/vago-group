import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import { carsDeleteRequest } from '../../store/actions/cars';
import UpdateItemCar from './UpdateItemCar';

function Car({car, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(carsDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((car) => () => {
        setUpdateItem(car)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${car.image}`} alt={car.name}/>
            <h3>Car - {car.name}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(car)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(car.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemCar
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Car;