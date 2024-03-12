import React, {useCallback, useState} from 'react';
import Wrapper from "../component/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {addHomeInfoRequest} from "../store/actions/homeInfo";
import IsLoading from "../component/IsLoading";

function HomeInfo() {
    const dispatch = useDispatch();
    const [info, setInfo] = useState({
        title: "",
        description: "",
        image: {},
    })

    const [file, setFile] = useState("");
    const [errors, setErrors] = useState({});
    const loading = useSelector(state => state.homeInfo.loading);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setInfo({...info, image: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [info]);

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(addHomeInfoRequest(info));
            if(payload.status === "ok"){
                setInfo({
                    title: "",
                    description: "",
                    image: {},
                })
                setErrors({})
                setFile("")
            }
            if(payload.errors){
                setErrors(payload.errors)
            }
        }catch (e) {
            console.log(e)
        }
    }, [info])

    return (
        <Wrapper helmetTitle={"Home Info"}>
            <section className={"homeInfo"}>
                <form onSubmit={submit}>
                    <h3>Add new info</h3> <br/>
                    <input type={"text"} placeholder={"title"}
                           onChange={(ev) => setInfo({...info, title: ev.target.value})}
                    /> <br/>
                    {errors.title && <p>{errors.title}</p>}
                    <input type={"textarea"} placeholder={"description"}
                           onChange={(ev) => setInfo({...info, description: ev.target.value})}
                    /> <br/>
                    {errors.description && <p>{errors.description}</p>}

                    <label className="input-file">
                        <input type="file" onChange={handleFileSelect} />
                        <span>Choose file</span>
                        {file !== "" ? <img src={file} alt={""} width={50} height={50}/> : null}
                        {errors.image && <p>{errors.image}</p>}
                    </label>
                    <button type="submit" className={"save"}>{
                        loading ? <IsLoading color={'#E88716'} size={14}/>
                            : "Save"
                    }</button>
                </form>
            </section>
        </Wrapper>
    );
}

export default HomeInfo;