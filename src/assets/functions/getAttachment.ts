import axios, { AxiosResponse } from "axios";
import { iOneMessage } from "./getMessageById";

import { Buffer } from "buffer";

interface IAttachment {
  data: {
    size: number;
    data: string;
  };
}

export function getAttachments(msg: AxiosResponse<iOneMessage, any>): void {
  /* GET https://gmail.googleapis.com/gmail/v1/users/{userId}/messages/{messageId}/attachments/{id} */
  console.log("вложения");

  axios
    .get(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/187e8b7b0de9f617/attachments/${msg.data.payload.parts[1].body?.attachmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      }
    )
    .then((data) => {
      const dat = data.data.data;

      const blobArr = Buffer.from(dat, "base64");
      let signArr = blobArr.filter((value, index) => {
        return index <= 3;
      });

      let signature = "";
      for (let i = 0; i < signArr.length; i++) {
        signature += signArr[i].toString(16).toUpperCase();
      }

      let mime = "";

      switch (signature) {
        case "89504E47":
          mime = "image/png";
          break;

        case "47494638":
          mime = "image/gif";
          break;

        case "25504446":
          mime = "application/pdf";
          break;

        case "FFD8FFE0":
          mime = "image/jpeg";
          break;

        case "FFD8FFE1":
          mime = "image/jpeg";
          break;

        case "FFD8FFE2":
          mime = "image/jpeg";
          break;

        case "FFD8FFE3":
          mime = "image/jpeg";
          break;

        case "FFD8FFE8":
          mime = "image/jpeg";
          break;

        case "D0CF11E0":
          mime =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;

        case "504B34":
          mime =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;

        case "52617221":
          mime = "application/vnd.rar";
          break;
      }

      const blob = new Blob([blobArr], {
        type: mime,
      });

      const url = URL.createObjectURL(blob);
      console.log(url);

      //скачать, предпросмотр файла
      window.open(url);

      URL.revokeObjectURL(url);
    })
    .catch(() => console.log("нет вложений"));
}
