import axios, { AxiosStatic } from "axios";
import { base64Decoder } from "./Base64Decoder";
import { checkMsgOnLinks } from "./checkMsgOnLinks";
import { getAttachments } from "./getAttachment";

export interface iOneMessage {
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
        body: {
          data: string;
          attachmentId: string;
        };
      };
    };
  };
}
/* data.payload.parts[1].body.attachmentId */
interface IMsgContent {
  body: {
    data: string;
  };
  mimeType: string;
  partId: string;
}

export interface ImsgData {
  markUp?: string;
  links?: RegExpMatchArray | null;
  snippet?: string;
}

export async function getMessageById(id: string | undefined) {
  const message = await axios.get<iOneMessage>(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    }
  );
  /* .catch(() => login()); */
  /* console.log(base64Decoder(message.data.payload.parts[0].body.data)); */
  /* console.log(message.data.snippet); */

  if (
    message.data.payload.parts != undefined &&
    message.data.payload.parts[1].body?.attachmentId != undefined &&
    message.data.payload.parts[1].body?.attachmentId != null
  ) {
    getAttachments(message);
  }

  function findStringInObjectTree(obj: any, str: string): IMsgContent | null {
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
    message.data,
    "text/plain"
  );

  const msgHtml: IMsgContent | null = findStringInObjectTree(
    message.data,
    "text/html"
  );

  const snippet = message.data.snippet;

  const markUp: string = base64Decoder(msgHtml!.body.data);
  console.log(base64Decoder(msgContent!.body.data));
  if (msgContent?.body.data != undefined && msgContent?.body.data != null) {
    const links: RegExpMatchArray | null = checkMsgOnLinks(
      base64Decoder(msgContent!.body.data)
    );
    console.log(links);
    return { markUp, links, snippet };
  }

  if (msgContent == null) {
    return { markUp, snippet };
  }

  /* if (links) {
       
      } else {
        console.log("ссылок не найдено");
      } */
}
