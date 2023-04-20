import { useGoogleLogin } from "@react-oauth/google";
import "./App.css";
import { FC, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./assets/contexts/Context";

const App: FC = () => {
  interface authData {
    access_token: string;
    expires_in?: number;
  }

  const navigate = useNavigate();
  function handleLogin(data: authData) {
    console.log(data);
    localStorage.setItem("auth", data.access_token);

    return navigate("/profile");
  }

  const login = useGoogleLogin({
    onSuccess: (data) => {
      data ? handleLogin(data) : "";
    },
    onError: (err) => console.log(err),
  });

  return (
    <div className="App">
      Привет
      <button onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  );
};

export default App;
