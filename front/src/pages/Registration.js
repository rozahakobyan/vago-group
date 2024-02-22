import React, {useCallback, useEffect, useState} from 'react';
import LogoutWrapper from "../component/LogoutWrapper";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {userLoginRequired, userRegisterRequired} from "../store/actions/users";
import IsLoading from "../component/IsLoading";

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const loading = useSelector(state => state.users.loading);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        const {payload} = await dispatch(userRegisterRequired(formData));
        if (payload.errors) {
            setErrors(payload.errors)
        }
        if (payload.token) {
            navigate('/home')
        }
    }, [formData]);

    const handleChange = useCallback((path) => (ev) => {
        setFormData({
            ...formData,
            [path]: ev.target.value,
        });
    }, [formData]);

    return (
        <LogoutWrapper helmetTitle={"Login"}>
            <section className={"login"}>
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    {errors.exsist && <p className={"error"}>{errors.exsist}</p>}
                    {errors.activateError && <p className={"error"}>{errors.activateError}</p>}

                    <div className={"input-box"}>
                        <input type="text" placeholder="First Name" onChange={handleChange("email")}/>
                        {errors.firstName ? <p className={"error"}>{errors.firstName.replaceAll('"', "")}</p> : null}
                    </div>

                    <div className={"input-box"}>
                        <input type="text" placeholder="Last Name" onChange={handleChange("email")}/>
                        {errors.lastName ? <p className={"error"}>{errors.lastName.replaceAll('"', "")}</p> : null}
                    </div>
                    
                    <div className={"input-box"}>
                        <input type="text" placeholder="Email" onChange={handleChange("email")}/>
                        {errors.email ? <p className={"error"}>{errors.email.replaceAll('"', "")}</p> : null}
                    </div>

                    <div className={"input-box"}>
                        <input type="password" placeholder="Password" onChange={handleChange("password")}/>
                        {errors.password ? <p className={"error"}>{errors.password.replaceAll('"', "")}</p> : null}
                    </div>

                    <div className={"input-box"}>
                        <input type="password" placeholder="Reset Password" onChange={handleChange("password")}/>
                        {errors.password ? <p className={"error"}>{errors.password.replaceAll('"', "")}</p> : null}
                    </div>

                   

                    <button type="submit" className={"btn"}>{
                        loading ? <IsLoading color={'blue'} size={16}/>
                            : "Registration"
                    }</button>
                    <div className=''>
                        <p style={{textAlign:'center'}}>Already have an account? <Link to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </section>
        </LogoutWrapper>
    );
};

export default Registration;
