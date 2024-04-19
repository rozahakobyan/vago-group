import React, {useCallback, useState} from 'react';
import Button from "../Button";

function Path({m, contact, setContact}) {
    const [text, setText] = useState("");
    const [textError, setTextError] = useState("");

    const handlePathList = useCallback((e, id) => {
        e.preventDefault()
        if(text.trim().match(/^https?:\/\/w{3}.\w+.\w{1,5}(\/\.+)?/gm)){
            if(contact.pathList){
                setContact({...contact, pathList: [...contact.pathList, {massagerId: id, path: text}]})
            }else{
                setContact({...contact, pathList: [{massagerId: id, path: text}]})
            }
            setText("")
            setTextError("")
        }else{
            setTextError("Invalid format !!")
        }
    }, [contact, text]);

    return (
        <>
            <div className={"path"}>
                <div className={"input_item"}>
                    <input
                        placeholder={`${m.name} account path`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"/>
                </div>
                <Button title={"Add"} onClick={(e) => handlePathList(e, m.id)}/>
            </div>
            {textError ? <small className={'errors_message'}>{textError}</small> : null}
        </>
    );
}

export default Path;