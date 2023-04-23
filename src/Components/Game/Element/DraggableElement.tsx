import React, {FC} from 'react';
import styles from "./Element.module.scss";
import {ElementModel} from "../../../Models/Element.model";
import {useDrag} from "react-dnd";
import {DraggableTypes} from "../../../Reducers/Game";

export interface DraggableElementProps {
    id: any,
    left: number,
    top: number,
    element: ElementModel
}


export const DraggableElement: FC<DraggableElementProps> = (
    {
        id, left, top, element
    }) => {

    const [, drag] = useDrag(
        () => ({
            type: DraggableTypes.PLACED,
            item: {id, left, top},
            end: () => ({}),
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top],
    )
    return (
        <div ref={drag} className={styles.element} style={{position: "absolute", top, left}}>
            <img className={styles.image} src={element.url} alt={element.name}/>
            <p className={styles.label}>{element.name}</p>
        </div>
    );
};

export default DraggableElement;