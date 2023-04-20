import React, { FC, useEffect } from "react";
import { auth } from "../contexts/Context";
import axios from "axios";

type Props = {};

const Profile: FC = () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("auth")}` },
  };
  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.googleapis.com/gmail/v1/users/me/profile");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("auth")
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // обрабатываем полученный ответ от Gmail API
        console.log(response);
      }
    };
    xhr.send();
  }, []);

  return <h1>Hi</h1>;
};

export default Profile;
