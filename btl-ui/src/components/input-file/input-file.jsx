/************************************************************************/
/*                                                                      */
/*   Copyright (C) 2024. All rights reserved                            */
/*   Author     : [Đỗ Viết Tuế], [viettuekk123@gmail.com]               */
/*                                                                      */
/*   Created    : 20-04-2024 14:31:12.                                  */
/*   Modified   : 20-04-2024 14:31:12.                                  */
/*                                                                      */
/************************************************************************/
// eslint-disable-next-line
'use strict';

/************************************************************************/
/*   Import for package on network                                      */
/************************************************************************/
import { useEffect, useRef, useState } from 'react';
// import { Resizable } from 'react-resizable';

/************************************************************************/
/*   Import for project component use ./ or ../ first                   */
/************************************************************************/
import { Chip, Button } from '..';
import '../../styles/input-file-component/input-file-component.css';
import { iconUpLoad } from '../../assets';
// import generalAPI from '../../api/general-api';

export const InputFileComponent = (props) => {
// console.log(props.olddata);
    const {
        label = 'Label',
        name,
        form,
        olddata = [],
    } = props;

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [urlSelectedFiles, setUrlSelectedFiles] = useState([]);
    const [urlOldFiles, setUrlOldFiles] = useState([...olddata]);
    // const [selectedUrlFiles, setSelectedUrlFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };
    useEffect(() => {
        const uploadFile = async () => {
            const urls = [];
            for (const item of selectedFiles) {
                try {
                    console.log(item);
                    // const urlFile = await generalAPI.upload(item);
                    // urls.push({ ...urlFile.data, "name": item.name });
                } catch (error) {
                    console.log(error.message);
                }
            }
            setUrlSelectedFiles([...urls]);
            // props.setValue(name, urlSelectedFiles);
        };
        uploadFile();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        // setSelectedUrlFiles([...urlOldFiles,...urlSelectedFiles]);
        props.setValue(name, [...urlOldFiles, ...urlSelectedFiles]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlSelectedFiles, urlSelectedFiles]);

    const handleRemoveFile = (index) => {
        const arrUrlFilesTemp = [...urlSelectedFiles];
        arrUrlFilesTemp.splice(index, 1);
        setSelectedFiles(arrUrlFilesTemp);
        if (index <= urlOldFiles.length) {
            const arrUrlFilesTemp = [...urlOldFiles];
            arrUrlFilesTemp.splice(index, 1);
            setUrlOldFiles(arrUrlFilesTemp);
        } else if (index > urlOldFiles.length) {
            const arrUrlFilesTemp = [...urlSelectedFiles];
            arrUrlFilesTemp.splice(urlSelectedFiles.length - index, 1);
            setUrlSelectedFiles(arrUrlFilesTemp);
        }

    }

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (

        <div className='wrapper-input' >
            <label className='wrapper-input__label'>{label}</label>
            <div className="file-input" id={selectedFiles.length === 0 ? `wrapper-input-height` : ``}>
                <div className="file-input__list">
                    {[...urlOldFiles, ...urlSelectedFiles].length === 0 &&
                        <span className="file-input__list-placeholder">There is no files here yet.</span>
                    }
                    {[...urlOldFiles, ...urlSelectedFiles].map((file, index) => (
                        <div className="file-input__list-item" key={index}>
                            <Chip
                                key={index}
                                className="file-list-item"
                                label={`${file.name}`}
                                showDeleteButton
                                handleClickDelete={() => handleRemoveFile(index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="file-input__button">
                    <Button
                        type={'button'}
                        color='primary'
                        variant='outlined'
                        label='Upload'
                        onClick={handleButtonClick}
                        icon={iconUpLoad}
                        iconPosition='left'
                    />
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    className="file-input-upload"
                    multiple
                    onChange={handleFileChange}
                    id={name}
                    form={form}
                    name={name}
                    {...props}
                />
            </div>
        </div>

    );
}