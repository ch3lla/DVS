import React from "react";

const Login = (props) => {
    return (
        <div className='login-conatiner'>
            <h1 className="welcome-message">Welcome to decentralized voting application</h1>
            <button className="login-button" onClick={props.connectWallet}>Login Metamask</button>
        </div>
    )
}

export default Login;