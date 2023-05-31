import React from 'react';
import classess from "./style.module.scss";

const PreLoader = () => {
    return (
        <div className={classess.page}>
            <div className={classess.page__loader}>
                <div className={classess.page__loader__bar}></div>
                <div className={classess.page__loader__bar}></div>
                <div className={classess.page__loader__bar}></div>
                <div className={classess.page__loader__bar}></div>
                <div className={classess.page__loader__bar}></div>
                <div className={classess.page__loader__ball}></div>
            </div>
        </div>
    )
}

export default PreLoader