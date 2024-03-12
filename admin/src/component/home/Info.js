import React, {useState} from 'react';

import { ReactComponent as EditIcon} from "../../assets/icon/edit.svg";
import { ReactComponent as DeleteIcon} from "../../assets/icon/delete.svg";
import { ReactComponent as ViewIcon} from "../../assets/icon/view.svg";
import { ReactComponent as CloseIcon} from "../../assets/icon/close.svg";

const { REACT_APP_API_URL } = process.env;

function Info({info}) {
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr>
                <td>{info.id}</td>
                <td>{info.title}</td>
                {/*<img src={`${REACT_APP_API_URL}/${info.image}`} alt={""} width={50} height={50}/>*/}
                <td>
                    <EditIcon onClick={() => setIsEdit(true)} />
                    <DeleteIcon />
                    <ViewIcon onClick={() => setIsOpen(true)} />
                </td>
            </tr>
        </>
    );
}

export default Info;