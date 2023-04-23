import React from 'react';
import styles from "./Game.module.scss"
import Tray from "./Tray/Tray";
import Field from "./Field/Field";

const Game = () => {
    return (
        <div className={styles.game}>
            <Field/>
            <Tray/>
        </div>
    );
};

export default Game;