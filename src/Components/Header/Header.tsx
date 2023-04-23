import React from "react";
// import UserName from "./UserName/UserName";
import {Strings} from "../../strings";
import styles from "./Header.module.scss";
import {Link} from "react-router-dom";
import {RouterPaths} from "../../router";

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <Link to={RouterPaths.Info}>
                <h1 className={styles.header}>{Strings.Header}</h1>
            </Link>
        </div>
    );
};

export default Header;
