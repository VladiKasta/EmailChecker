import { useGoogleLogin } from "@react-oauth/google";
import Button from "react-bootstrap/Button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

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
    <div className={styles.App}>
      <Button size="lg" onClick={() => login()}>
        Sign in with Google 🚀
      </Button>
    </div>
  );
};

export default App;
