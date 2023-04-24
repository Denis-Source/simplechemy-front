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
    id: string,
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
                const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
                const left = clamp(item.left + delta.x, 0, containerWidth - OFFSET);
                const top = clamp(item.top + delta.y, 0, containerHeight - OFFSET);

                const x = convertToFloat(left, containerWidth, OFFSET);
                const y = convertToFloat(top, containerHeight, OFFSET);

                switch (monitor.getItemType()) {
                    case DraggableTypes.PLACED:
                        dispatch(movePlacedElement({
                            x,
                            y,
                            uuid: item.id
                        }))
                        console.log(delta.x, delta.y)
                        console.log(left, top)
                        break;
                    case DraggableTypes.UNLOCKED:
                        if (item.element) {
                            dispatch(addPlacedElement(
                                {
                                    uuid: "aaa",
                                    x,
                                    y,
                                    element: item.element
                                }))
                        }
                        console.log(delta.x, delta.y)
                        console.log(left, top)
                        // console.log(x, y)
                        break;
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