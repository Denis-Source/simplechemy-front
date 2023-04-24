import React from 'react';
import styles from "./Element.module.scss";
import {ElementModel} from "../../../Models/Element.model";
import {useDrag, useDragDropManager} from "react-dnd";
import {DraggableTypes} from "../../../Reducers/Game";
import {useDispatch} from "react-redux";

const Element = ({element}: { element: ElementModel }) => {
    const dispatch = useDispatch();

    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();

    const [{isDragging}, drag] = useDrag(
        () => ({
            type: DraggableTypes.UNLOCKED,
            item: {
                element,
                top: 0,
                left: 0,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
    )

    return (
        <div title={element.name} className={styles.element} ref={drag}>
            <img className={styles.image} src={element.url} alt={element.name}/>
            <p className={styles.label}>{element.name}</p>
        </div>

    );
};

export default Element;