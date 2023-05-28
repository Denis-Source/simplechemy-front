import React from "react";
import styles from "./TextInput.module.scss";

const TextInput = ({
    value,
    setString,
    placeholder,
}: {
    value?: string,
    setString: (value: string) => void;
    placeholder: string;
}) => {
    return (
        <div className={styles.searchWrapper}>
            <input
                placeholder={placeholder}
                className={styles.input}
                type="text"
                onChange={(event) => setString(event.target.value)}
                defaultValue={value}
            />
        </div>
    );
};

export default TextInput;
