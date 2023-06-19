import axios from "axios";

export async function getLastMessages() {
  let ids = await axios.get(
    "https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=50",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    }
  );

  return ids;
}
