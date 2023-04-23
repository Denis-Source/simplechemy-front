import React, {useState} from 'react';
import styles from "./Tray.module.scss"
import Element from "../Element/Element";
import Input from "../../Input/Input";
import {useSelector} from "react-redux";
import {ElementModel} from "../../../Models/Element.model";

const Tray = () => {
    const [elementFilter, setElementFilter] = useState<string>("");
    const unlockedElements: ElementModel[] = useSelector((state: any) => state.game.unlockedElements);


    return (
        <div className={styles.tray}>
            <Input setString={setElementFilter} placeholder={"Search"}/>
            <div className={styles.elements}>
                {unlockedElements.filter(element => element.name.toLowerCase().includes(elementFilter.toLowerCase()))
                    .map((element, index) =>
                        <Element element={element} key={index}/>
                    )}
            </div>
        </div>
    );
};

export default Tray;