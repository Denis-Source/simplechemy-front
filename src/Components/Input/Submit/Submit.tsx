import React from 'react';
import styles from './Submit.module.scss'

const Submit = ({text}: {text: string}) => {
    return (
        <input type={"submit"} className={styles.submit} value={text}/>
    );
};

export default Submit;