import React from "react";
import styles from "./AuthenticationLayout.module.scss"
import BaseLayout from "../BaseLayout/BaseLayout";

const AuthenticationLayout = () => {
    return (
        <BaseLayout>
            <div className={styles.wrapper}>
                <h2>Registration</h2>
                <div className={styles.box}>
                    <form action="">
                        <label htmlFor="">aa</label>
                    </form>
                </div>
            </div>
        </BaseLayout>
    );
};

export default AuthenticationLayout;