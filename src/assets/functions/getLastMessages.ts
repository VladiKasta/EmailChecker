import axios from "axios";
import { MyMessages } from "../components/Profile/Profile";

export function getLastMessages(
  setIdMessages: React.Dispatch<React.SetStateAction<MyMessages | undefined>>
) {
  axios
    .get(
      "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=50",
      /*  "https://gmail.googleapis.com/gmail/v1/users/me/messages/187a78daa0d9179b", */
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      }
    )
    .then((res) => {
      setIdMessages(res.data);
      console.log(res.data);
    })
    .catch((e) => console.log(e));
}
