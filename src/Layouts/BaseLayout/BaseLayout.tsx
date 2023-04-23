import React from "react";
import styles from "./BaseLayout.module.scss";
import Header from "../../Components/Header/Header";
import {useSelector} from "react-redux";
// import { AppStates, ErrorMessages } from "../../Reducers/General";
// import Spinner from "../../Components/Spinner/Spinner";
// import ErrorTab from "../../Components/Tabs/ErrorTab/ErrorTab";

const BaseLayout = ({
                        children,
                    }: {
    children?: JSX.Element | [JSX.Element];
}) => {
    const theme: string[] = useSelector((state: any) => state.general.theme);

    return (
        <div
            className={styles.body}
            style={{
                background: `linear-gradient(135deg, ${theme[0]}, ${theme[1]})`,
            }}
        >
            <div className={styles.container}>
                <Header/>
                {children}
            </div>
        </div>
    );
};

export default BaseLayout;
