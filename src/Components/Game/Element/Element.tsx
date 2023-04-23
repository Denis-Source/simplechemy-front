import React from 'react';
import styles from "./Element.module.scss";
import {ElementModel} from "../../../Models/Element.model";

const Element = ({element}: { element: ElementModel }) => {
    return (
        <div title={element.name} className={styles.element}>
            <img className={styles.image} src={element.url} alt={element.name}/>
            <p className={styles.label}>{element.name}</p>
        </div>

    );
};

export default Element;