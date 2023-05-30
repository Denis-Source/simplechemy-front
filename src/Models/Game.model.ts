import {UserModel} from "./User.model";
import {ElementPositionModel} from "./ElementPosition.model";
import {ElementModel} from "./Element.model";

export interface GameModel {
    uuid: string,
    name: string,
    users: UserModel[],
    elementPositions?: ElementPositionModel[],
    unlockedElements?: ElementModel
}