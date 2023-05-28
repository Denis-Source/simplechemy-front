import React from 'react';
import styles from "./LoadingLayout.module.scss"
import Spinner from "../../Components/Spinner/Spinner";

const LoadingLayout = () => {
    return (
        <div className={styles.container}>
            <Spinner/>
        </div>
    );
};

export default LoadingLayout;