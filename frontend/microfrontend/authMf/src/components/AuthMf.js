import React from "react";
import { useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

function AuthMf({ type }) {
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");
    const history = useHistory();

    function handleRegister({ email, password }) {
        auth
            .register(email, password)
            .then((res) => {
                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);
                history.push("/signin");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function handleLogin({ email, password }) {
        auth
            .login(email, password)
            .then((res) => {
                // После успешного входа отправляем событие с JWT
                window.dispatchEvent(
                    new CustomEvent("jwt-login", {
                        detail: { token: res.token, email: email },
                    })
                );
                history.push("/");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function closeInfoTooltip() {
        setIsInfoToolTipOpen(false);
    }

    return (
        <>
            {type === "register" ? (
                <Register onRegister={handleRegister} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={closeInfoTooltip}
                status={tooltipStatus}
            />
        </>
    );
}

export default AuthMf;
