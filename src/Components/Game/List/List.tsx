import React, {useEffect, useState} from 'react';
import styles from "./List.module.scss"
import {GameModel} from "../../../Models/Game.model";
import {ViewportList} from "react-viewport-list";
import Item from "../Item/Item";
import useWebSocket from "react-use-websocket";
import {getAPIWSUrl} from "../../../api";

const List = () => {
    const [gamesList, setGamesList] = useState<GameModel[]>([]);

    const {sendJsonMessage} = useWebSocket(getAPIWSUrl(), {
        onMessage: (event) => {
            const message = JSON.parse(event.data);
            setGamesList(message.instances);
            },
        share: true,
    });

    useEffect(() => {
        console.log("sending message");
        sendJsonMessage({
            "message": "list_game"
        })
    }, [])

    return (
        <div className={styles.list}>
            <ViewportList items={gamesList}>
                {(game) => (
                    <Item
                        key={game.uuid}
                        game={game}
                    />
                )}
            </ViewportList>
        </div>
    );
};

export default List;