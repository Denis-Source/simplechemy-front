import {useEffect, useRef, useState} from 'react'
import type {XYCoord} from 'react-dnd'
import {useDrop} from 'react-dnd'
import styles from "./Field.module.scss"
import {ElementModel} from "../../../Models/Element.model";
import DraggableElement from "../Element/DraggableElement";
import {clamp, convertToFloat, convertToRelative} from "../../../utils";
import {useDispatch, useSelector} from "react-redux";
import {DraggableTypes, movePlacedElement} from "../../../Reducers/Game";

export interface ContainerState {
    boxes: { [key: string]: { top: number; left: number; element: ElementModel } }
}

export interface DragItem {
    type: string
    id: string
    top: number
    left: number
}

export const OFFSET = 30;

export const Field = () => {

    const placedElements = useSelector((state: any) => state.game.placedElements);
    const dispatch = useDispatch();


    const handleDrag = (event: any) => {
        console.log("Mouse coordinates:", event.clientX, event.clientY);
    };


    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.clientWidth);
            setContainerHeight(containerRef.current.clientHeight)
        }
    })

    const [, drop] = useDrop(
        () => ({
            accept: DraggableTypes.PLACED,
            drop(item: DragItem, monitor) {
                const dropResult = monitor.getItemType()
                const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
                const left = clamp(item.left + delta.x, 0, containerWidth - OFFSET);
                const top = clamp(item.top + delta.y, 0, containerHeight -OFFSET);

                dispatch(movePlacedElement({
                    x: convertToFloat(left, containerWidth, OFFSET),
                    y: convertToFloat(top, containerHeight, OFFSET),
                    uuid: item.id
                }))

                console.log( convertToFloat(left, containerWidth, OFFSET))
                console.log(dropResult)
            },
        }),
        [containerWidth, containerHeight],
    )

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={containerRef}>
                <div ref={drop} className={styles.field} onDrag={handleDrag}>
                    {Object.keys(placedElements).map((key) => {
                        const {x, y, element} = placedElements[key];
                        return (
                            <DraggableElement
                                id={key}
                                key={key}
                                left={convertToRelative(x, containerWidth, OFFSET)}
                                top={convertToRelative(y, containerHeight, OFFSET)}
                                element={element}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Field;