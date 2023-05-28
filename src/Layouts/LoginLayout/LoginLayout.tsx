import React from 'react';
import BaseLayout from "../BaseLayout/BaseLayout";
import Login from "../../Components/Authentication/Login/Login";

const LoginLayout = () => {
    return (
        <BaseLayout>
            <Login/>
        </BaseLayout>
    );
};

export default LoginLayout;