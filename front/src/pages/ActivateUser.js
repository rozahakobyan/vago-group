import LogoutWrapper from "../component/LogoutWrapper";
import React, {useCallback,  useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userActivateRequired} from "../store/actions/users";

const ActivateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email} = useParams();

    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        code: ""
    });

    const handleChangeForm = useCallback((path) => (ev) => {
        setFormData({
            ...formData,
            [path]: ev.target.value,
        });
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (formData.code !== '') {
            const {payload} = await dispatch(userActivateRequired({
                email,
                code: formData.code
            }))
            if (payload.errors) {
                setErrors(payload.errors)
            } else if(payload.status === "ok") {
                setErrors({})
                navigate("/login")
            }
        }else {
            setErrors({code:"Please write activate code"})
        }
    }, [formData, email])

    return (
        <LogoutWrapper helmetTitle={"Activate"}>
            <section className={"activate"}>
                <form onSubmit={handleSubmit}>
                    <h1>Activate</h1>
                    <div className="row_input">
                        <div  className={'input_item_box'}>
                            <p>Enter your activate code</p>
                            <div className={"input-box"}>
                                <input
                                    value={formData.recoveryCode}
                                    placeholder={'code'}
                                    onChange={handleChangeForm('code')}/>
                                {errors.code && <p className={"error"}>{errors.code}</p>}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={"btn"}>Activate</button>
                </form>
            </section>
        </LogoutWrapper>
    );
}

export default ActivateUser;
