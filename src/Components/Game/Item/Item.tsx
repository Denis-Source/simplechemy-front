import React from 'react';
import styles from "./Item.module.scss"
import {GameModel} from "../../../Models/Game.model";

const Item = ({game}: {game: GameModel}) => {
    return (
        <div className={styles.game}>
            <p className={styles.name}>
                {game.name}
            </p>
        </div>
    );
};

export default Item;