import React from "react";
import API from "../utils /API";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect, user } = useAuth0();

  const logInWithDB = async () => {
    await loginWithRedirect();
    const creds = {
      email: user.email,
      name: user.name,
    };
    const { data } = await API.upsertUser(creds);
    console.log(data);
  };

  return <div onClick={() => logInWithDB()}>Login</div>;
}

export default LoginButton;
