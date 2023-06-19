import { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "./profile.module.css";
import { getLastMessages } from "../../functions/getLastMessages";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ListGroupItem } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { AxiosResponse } from "axios";

interface Iinfo {
  emailAddress: string;
  messagesTotal: number;
  status: number;
}

export interface MyMessages {
  messages?: [
    {
      id?: string;
    }
  ];
}

const Profile: FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<string | undefined>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [descriptions, setDescriptions] = useState<Array<AxiosResponse>>();

  const login = useGoogleLogin({
    onSuccess: (data) => {
      data
        ? (localStorage.setItem("auth", data.access_token), setUserInfo(""))
        : "";
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    axios
      .get<Iinfo>("https://www.googleapis.com/gmail/v1/users/me/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
        switch (response.status) {
          case 200: {
            console.log(response.status);
            setUserInfo(response.data.emailAddress);
            break;
          }

          default:
            console.log("Что то пошло не так...");
            break;
        }
      })
      .catch(() => login());
  }, [userInfo]);

  async function getDescriptions(ids: any) {
    let descArr = [];
    for (let index = 0; index < ids.length; index++) {
      const idExactMessage = ids[index].id;
      let message = await axios.get(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${idExactMessage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      descArr.push(message);
    }
    setDescriptions(descArr);
  }

  return (
    <>
      <div className={styles.myComponent}>
        <h1 style={{ fontSize: "50px" }}>Привет, {userInfo}!</h1>
        <div className="imgWrapper">
          <img src="/img/profile.jpg" alt="" />
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setShowLoader(true);
            getLastMessages()
              .then((data) => {
                getDescriptions(data.data.messages);
              })
              .catch((e) => console.log(e));
            /* getDescriptions(getLastMessages()); */
            console.log(descriptions);
          }}
        >
          Получить последние сообщения
        </Button>{" "}
        {descriptions ? (
          <ListGroup>
            {descriptions.map((message) => (
              <Link
                to={`/profile/${message.data.id}`}
                key={`${message.data.id}`}
                className={styles.listGroupItem}
              >
                <ListGroupItem>{message.data.snippet}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        ) : (
          <ColorRing
            visible={showLoader}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ display: "block", margin: "0 auto" }}
            wrapperClass="blocks-wrapper"
            colors={["#0d6efd", "#0d6efd", "#0d6efd", "#0d6efd", "#0d6efd"]}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
