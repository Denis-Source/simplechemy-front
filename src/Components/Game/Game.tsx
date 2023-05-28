import React, {useEffect} from 'react';
import styles from "./Game.module.scss"
import Tray from "./Tray/Tray";
import Field from "./Field/Field";
import {useSelector} from "react-redux";
import {APIRoutes} from "../../api";
import {useNavigate} from "react-router-dom";

const Game = () => {
    const authenticated = useSelector((state: any) => state.general.authenticated)
    const navigate = useNavigate();

    useEffect(()=> {
        !authenticated && navigate(APIRoutes.login);
    }, [authenticated])

    return (
        <div className={styles.game}>
            <Field/>
            <Tray/>
        </div>
    );
};

export default Game;