import React, {useCallback, useState} from 'react';
import LogoutWrapper from "../component/LogoutWrapper";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {userRegisterRequired} from "../store/actions/users";
import IsLoading from "../component/IsLoading";

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const loading = useSelector(state => state.users.loading);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        const {payload} = await dispatch(userRegisterRequired(formData));
        if (payload.errors) {
            setErrors(payload.errors)
        }
        if (payload.status === "ok") {
            navigate(`/activate-user/${formData.email}`)
        }
    }, [formData]);

    const handleChange = useCallback((path) => (ev) => {
        setFormData({
            ...formData,
            [path]: ev.target.value,
        });
    }, [formData]);

    return (
        <LogoutWrapper helmetTitle={"Registration"}>
            <section className={"login"} style={{
                background: "url(../assets/images/login.jpg)"
            }}>
                <form onSubmit={handleSubmit}>

                    {errors.exsist && <p className={"error"}>{errors.exsist}</p>}

                    <div className={"input-box"}>
                        <input type="text" placeholder="First Name" onChange={handleChange("firstName")}/>
                        {errors.firstName ? <p className={"error"}>{errors.firstName.replaceAll('"', "")}</p> : null}
                    </div>

                    <div className={"input-box"}>
                        <input type="text" placeholder="Last Name" onChange={handleChange("lastName")}/>
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
                        <input type="password" placeholder="Confirm Password" onChange={handleChange("confirmPassword")}/>
                        {errors.confirmPassword ? <p className={"error"}>{errors.confirmPassword.replaceAll('"', "")}</p> : null}
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
