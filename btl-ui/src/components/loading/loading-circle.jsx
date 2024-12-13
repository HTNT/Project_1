import React from 'react';
import '../../styles/loading/loading-circle.css';

function LoadingCircle(props) {
    return (
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    );
}

export default LoadingCircle;