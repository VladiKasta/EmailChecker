import { useGoogleLogin } from "@react-oauth/google";
import Button from "react-bootstrap/Button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

export interface authData {
  access_token: string;
  expires_in?: number;
}

const App: FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (data) => {
      data ? localStorage.setItem("auth", data.access_token) : "";
      return navigate("/profile");
    },
    onError: (err) => console.log(err),
  });

  return (
    <div className={styles.App}>
      <Button size="lg" onClick={() => login()}>
        Зайти в Google 🚀
      </Button>
    </div>
  );
};

export default App;
