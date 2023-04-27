import axios, { AxiosStatic } from "axios";
import { base64Decoder } from "./Base64Decoder";
import { checkMsgOnLinks } from "./checkMsgOnLinks";

interface iOneMessage {
  id: string;
  snippet: string;
  payload: {
    parts: {
      [0]: {
        body: {
          data: string;
        };
      };
      [1]: {
        body?: {
          data?: string;
        };
      };
    };
  };
}

interface IMsgContent {
  body: {
    data: string;
  };
  mimeType?: string;
  partId?: string;
}

export function getMessageById(id: string): void {
  axios
    .get<iOneMessage>(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      }
    )
    .then((response) => {
      function findStringInObjectTree(
        obj: any,
        str: string
      ): IMsgContent | null {
        for (let key in obj) {
          const value = obj[key];
          if (typeof value === "object") {
            const result = findStringInObjectTree(value, str);
            if (result) {
              return result;
            }
          } else if (typeof value === "string" && value.includes(str)) {
            return obj;
          }
        }
        return null;
      }

      const msgContent: IMsgContent | null = findStringInObjectTree(
        response.data,
        "text/plain"
      );
      if (msgContent) {
        const text: string | null = base64Decoder(msgContent.body.data);
        const links = checkMsgOnLinks(text);
        if (links) {
          console.log(links);
        } else {
          console.log("ссылок не найдено");
        }
      } else {
        console.log("В теле сообщения не найдено текста");
      }
      /* console.log(msgContent); */
    })

    .catch((e) => console.log(e));
}
