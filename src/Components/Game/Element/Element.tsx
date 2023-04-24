import React, {useState} from 'react';
import styles from "./Element.module.scss";
import {ElementModel} from "../../../Models/Element.model";
import {useDrag} from "react-dnd";
import {DraggableTypes} from "../../../Reducers/Game";

const Element = ({element}: { element: ElementModel }) => {
    const [item, setItem] = useState(
        {element, top: 0, left: 0}
    )

    const [, drag] = useDrag(
        () => ({
            type: DraggableTypes.UNLOCKED,
            item: item,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            })
        }),
        [element]
    )
    return (
        <div title={element.name} className={styles.element} ref={drag}
             onDrag={(e) => {
                 setItem({
                     ...item,
                     top: e.clientY,
                     left: e.clientX
                 })
             }}>
            <img className={styles.image} src={element.url} alt={element.name}/>
            <p className={styles.label}>{element.name}</p>
        </div>

    );
};

export default Element;