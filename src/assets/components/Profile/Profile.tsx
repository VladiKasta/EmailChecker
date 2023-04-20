import { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "./profile.module.css";
import { getLastMessages } from "../../functions/getLastMessages";
import ListGroup from "react-bootstrap/ListGroup";

interface Iinfo {
  emailAddress: string;
}

interface MyMessages {
  messages: [
    {
      id: string;
    }
  ];
}

const Profile: FC = () => {
  const [userInfo, setUserInfo] = useState<string>();
  const [IdMessages, setIdMessages] = useState<MyMessages>();

  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.googleapis.com/gmail/v1/users/me/profile");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("auth")
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response: Iinfo = JSON.parse(xhr.responseText);
        // обрабатываем полученный ответ от Gmail API
        setUserInfo(response.emailAddress);
      }
    };
    xhr.send();
  }, []);

  return (
    <>
      <div className={styles["my-component"]}>
        <h1>Hi, {userInfo}!</h1>
        <div className="imgWrapper">
          <img src="/img/profile.jpg" alt="" />
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            getLastMessages(IdMessages, setIdMessages);
          }}
        >
          Получить последние сообщения
        </Button>{" "}
        {IdMessages ? (
          <ListGroup className={styles["list-group"]}>
            {IdMessages.messages.map((message) => (
              <ListGroup.Item action key={message.id}>
                {message.id}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Profile;
