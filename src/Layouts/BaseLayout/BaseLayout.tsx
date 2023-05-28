import React from "react";
import styles from "./BaseLayout.module.scss";
import Header from "../../Components/Header/Header";
import {useSelector} from "react-redux";
import {AppStates} from "../../Reducers/General";
import Spinner from "../../Components/Spinner/Spinner";

const BaseLayout = ({
                        children,
                    }: {
    children?: JSX.Element | [JSX.Element];
}) => {
    const theme: string[] = useSelector((state: any) => state.general.theme);
    const appState = useSelector((state: any) => state.general.appState);
    let elements;

    switch (appState) {
        case AppStates.Nominal:
            elements = <div className={styles.container}>
                <Header/>
                {children}
            </div>
            break;
        case AppStates.Loading:
            elements = <Spinner/>
            break;
    }

    return (
        <div
            className={styles.body}
            style={{
                background: `linear-gradient(135deg, ${theme[0]}, ${theme[1]})`,
            }}
        >
            {elements}
        </div>
    );
};

export default BaseLayout;
