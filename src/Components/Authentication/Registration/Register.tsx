import React, {FormEvent, useState} from 'react';
import styles from './Register.module.scss'
import {Strings} from "../../../strings";
import TextInput from "../../Input/TextInput/TextInput";
import Submit from "../../Input/Submit/Submit";
import {APIRoutes, fetchAPI} from "../../../api";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserUUID} from "../../../Reducers/Authentication";
import {useCookies} from "react-cookie";
import {AppStates, setAppState} from "../../../Reducers/General";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["userUUID"]);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(setAppState(AppStates.Loading))
        const params = {
            "name": username,
            "password": password
        }
        const options = {
            method: "POST"
        }
        const response = await fetchAPI(APIRoutes.register, options, params);
        const user = response.instance;
        dispatch(setUserUUID(user.uuid));

        setCookie("userUUID", user.uuid, {
            path: "/",
            maxAge: 356 * 24 * 60 * 60,
        });
        dispatch(setAppState(AppStates.Nominal))
        navigate(APIRoutes.login);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.header}>
                    {Strings.RegisterHeader}
                </h1>
                <form className={styles.form} onSubmit={onSubmit}>
                    <label className={styles.label}>{Strings.FormUsernameL}</label>
                    <TextInput setString={setUsername} placeholder={Strings.FormUsernameP}/>
                    <label className={styles.label}>{Strings.FormPasswordL}</label>
                    <TextInput setString={setPassword} placeholder={Strings.FormPasswordP}/>
                    <Submit text={Strings.RegisterSubmit}/>
                </form>
                <p className={styles.loginLink}>
                    {Strings.RegisterLoginDesc}&nbsp;
                    <Link to={APIRoutes.login}>{Strings.RegisterLogin}</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;