import React, {FC} from 'react';
import styles from "./Element.module.scss";
import {ElementModel} from "../../../Models/Element.model";
import {useDrag} from "react-dnd";
import {DraggableTypes} from "../../../Reducers/Game";

export interface DraggableElementProps {
    uuid: any,
    left: number,
    top: number,
    element: ElementModel
}


export const DraggableElement: FC<DraggableElementProps> = (
    {
        uuid, left, top, element
    }) => {

    const [{isDragging}, drag] = useDrag(
        () => ({
            type: DraggableTypes.PLACED,
            item: {uuid: uuid, left, top},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [uuid, left, top],
    )
    return (
        isDragging ?
            <div ref={drag}/>
            :
            <div ref={drag} className={styles.element} style={{position: "absolute", top, left}}>
                <img className={styles.image} src={element.url} alt={element.name}/>
                <p className={styles.label}>{element.name}</p>
            </div>
    );
};

export default DraggableElement;