import axios from "axios";

export function getLastMessages(idMessages: any, setIdMessages: any): any {
  axios
    .get(
      "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      }
    )
    .then((res) => {
      setIdMessages(res.data);
    })
    .catch((e) => console.log(e));
}
