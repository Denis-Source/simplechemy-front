import {ElementModel} from "./Element.model";

export interface ElementPositionModel {
    element: ElementModel;
    x: number;
    y: number;
    uuid: string;
    name: string;
}