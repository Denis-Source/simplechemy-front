import {useEffect, useRef} from 'react'
import type {XYCoord} from 'react-dnd'
import {useDrop} from 'react-dnd'
import styles from "./Field.module.scss"
import {ElementModel} from "../../../Models/Element.model";
import DraggableElement from "../Element/DraggableElement";
import {clamp, convertToFloat, convertToRelative} from "../../../utils";
import {useDispatch, useSelector} from "react-redux";
import {addPlacedElement, DraggableTypes, movePlacedElement, setGameFieldSize} from "../../../Reducers/Game";

export interface ContainerState {
    boxes: { [key: string]: { top: number; left: number; element: ElementModel } }
}

export interface DragItem {
    type: string,
    uuid: string,
    top: number,
    left: number,
    element: ElementModel | null
}

export const OFFSET = 30;

export const Field = () => {

    const placedElements = useSelector((state: any) => state.game.placedElements);
    const containerHeight = useSelector((state: any) => state.game.fieldHeight);
    const containerWidth = useSelector((state: any) => state.game.fieldWidth);
    const dispatch = useDispatch();


    const handleDrag = (event: any) => {
        console.log("Mouse coordinates:", event.clientX, event.clientY);
    };


    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            dispatch(setGameFieldSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            }))
        }
    })

    const [, drop] = useDrop(
        () => ({
            accept: [DraggableTypes.UNLOCKED, DraggableTypes.PLACED],
            drop(item: DragItem, monitor) {
                let delta, top, left, x, y;
                if (containerRef.current) {
                    switch (monitor.getItemType()) {
                        case DraggableTypes.PLACED:
                            delta = monitor.getDifferenceFromInitialOffset() as XYCoord
                            left = clamp(item.left + delta.x, 0, containerWidth - OFFSET);
                            top = clamp(item.top + delta.y, 0, containerHeight - OFFSET);
                            x = convertToFloat(left, containerWidth, OFFSET);
                            y = convertToFloat(top, containerHeight, OFFSET);
                            dispatch(movePlacedElement({
                                x,
                                y,
                                uuid: item.uuid
                            }))
                            break;
                        case DraggableTypes.UNLOCKED:
                            delta = monitor.getClientOffset() as XYCoord
                            left = clamp(
                                delta.x - containerRef.current.getBoundingClientRect().x - OFFSET,
                                0,
                                containerWidth - OFFSET);
                            top = clamp(
                                delta.y - containerRef.current.getBoundingClientRect().y - OFFSET,
                                0,
                                containerHeight - OFFSET);
                            x = convertToFloat(left, containerWidth, OFFSET);
                            y = convertToFloat(top, containerHeight, OFFSET);
                            if (item.element) {
                                dispatch(addPlacedElement(
                                    {
                                        uuid: "aaa",
                                        x,
                                        y,
                                        element: item.element
                                    }))
                            }
                            console.log(item.left, item.top)
                            break;
                    }
                }

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
                                uuid={key}
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