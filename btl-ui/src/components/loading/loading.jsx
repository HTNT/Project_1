import React from 'react';
import '../../styles/loading/loading.css';
export function Loading(props) {
    return (
        <div className="wrapper__loading">
            <div className="wrapper__loading-circle"></div>
            <div className="wrapper__loading-circle"></div>
            <div className="wrapper__loading-circle"></div>
            <div className="wrapper__loading-shadow"></div>
            <div className="wrapper__loading-shadow"></div>
            <div className="wrapper__loading-shadow"></div>
            <span>Loading</span>
        </div>
    );
}
