import React, {FormEvent, useEffect, useState} from 'react';
import styles from './Login.module.scss'
import {Strings} from "../../../strings";
import TextInput from "../../Input/TextInput/TextInput";
import Submit from "../../Input/Submit/Submit";
import {APIRoutes, fetchAPI} from "../../../api";
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {setAuthenticationToken} from "../../../Reducers/Authentication";
import {useDispatch, useSelector} from "react-redux";
import {AppStates, setAppState, setAuthenticated} from "../../../Reducers/General";

const Login = () => {
    const [userUUID, setUserUUID] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["userUUID", "authToken"]);

    useEffect(() => {
        cookies.userUUID && setUserUUID(cookies.userUUID);
    }, [setUserUUID, cookies]);
    const dispatch = useDispatch();

    const authenticated = useSelector((state: any) => state.general.authenticated)
    const navigate = useNavigate();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(setAppState(AppStates.Loading))
        const params = {
            "user_uuid": userUUID,
            "password": password
        }
        const options = {
            method: "POST"
        }
        const response = await fetchAPI(APIRoutes.login, options, params);
        const message = await response.json();
        const token = message.token

        dispatch(setAuthenticationToken(token));
        dispatch(setAuthenticated(true));
        setCookie("authToken", token, {
            path: "/",
            maxAge: 356 * 24 * 60 * 60,
        });
        navigate(APIRoutes.home);
    }

    useEffect(() => {
        authenticated && navigate(APIRoutes.home);
    }, [authenticated, navigate])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.header}>
                    {Strings.LoginHeader}
                </h1>
                <form className={styles.form} onSubmit={onSubmit}>
                    <label className={styles.label}>{Strings.FormUserUUIDL}</label>
                    <TextInput setString={setUserUUID} placeholder={Strings.FormUserUUIDP} value={userUUID}/>
                    <label className={styles.label}>{Strings.FormPasswordL}</label>
                    <TextInput setString={setPassword} placeholder={Strings.FormPasswordP}/>
                    <Submit text={Strings.LoginSubmit}/>
                </form>
                <p className={styles.registerLink}>
                    {Strings.LoginRegisterDesc}&nbsp;
                    <Link to={APIRoutes.register}>{Strings.LoginRegister}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;