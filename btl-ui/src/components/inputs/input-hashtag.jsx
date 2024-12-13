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
// import { FormGroup } from 'reactstrap';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/

import '../../styles/inputs/input-hashtag.css';
import { Controller } from 'react-hook-form';
import { TagsInput } from 'react-tag-input-component';


export function InputHashtag(props) {
    const { name, form, hashtag } = props;
    const { control } = form;
    return (
        <div className='position-relative'>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange } }) => (
                    <TagsInput
                        classNames="input__text"
                        placeHolder='Enter your hashtag'
                        value={hashtag}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    );
}
