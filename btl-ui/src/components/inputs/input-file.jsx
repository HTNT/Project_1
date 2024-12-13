/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]    */
/*                                                                      */
/*   Created    : 06-04-2024 18:42:05.                                  */
/*   Modified   : 06-04-2024 18:42:05.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import React, { useEffect, useState } from 'react';
import { FormGroup} from 'reactstrap';
import { useParams } from 'react-router-dom';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/inputs/input-hashtag.css';


export function InputFile(props) {
    const { taskID } = useParams();
    const {  name, form, hashtag } = props;
    const { setValue } = form;
    const [outputHashtag, setOutputHashtag] = useState([]);
    // const inputRef = useRef(null);
    const handleOnChage = (e) => {
        // const arrHashtag = inputRef.current.value.split(' ').join("").split(',');
        const arrTemp = [...e.target.files];
        // console.log(arrTemp[0].name);
        setOutputHashtag((prev) => [...prev, ...arrTemp]);
        e.target.value = "";

    }
    const handleRemoveHashtag = (index) => {
        const arrHashtagTemp = [...outputHashtag];
        arrHashtagTemp.splice(index, 1);
        setOutputHashtag(arrHashtagTemp);
    }

    useEffect(() => {
        setOutputHashtag(hashtag || []);
    }, [taskID, hashtag])

    useEffect(() => {
        setValue(name, outputHashtag);
        // eslint-disable-next-line
    }, [JSON.stringify(outputHashtag)])

    return (
        <FormGroup className='position-relative input__hashtag'>
            <FormGroup className='input'>
                <input className="form-control" type="file" id="formFileMultiple" multiple onChange={e => handleOnChage(e)}></input>
            </FormGroup>
            {
                (outputHashtag && outputHashtag.length > 0) &&

                <div className="tags-input-container">
                    {
                        outputHashtag.map((file, idx) => (
                            <div className="tag-item" key={idx}>
                                <span className="text">{file.name}</span>
                                <span className="close" onClick={() => handleRemoveHashtag(idx)}>&times;</span>
                            </div>
                        ))
                    }
                </div>
            }
        </FormGroup>
    );
}
