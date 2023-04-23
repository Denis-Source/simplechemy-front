import {ElementModel} from "./Element.model";

export interface ElementPosition {
    element: ElementModel;
    x: number;
    y: number;
    uuid: string;
    name: string;
}