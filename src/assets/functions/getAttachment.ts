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

  if (msg.data.payload.parts[1].body?.attachmentId) {
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
        const signatures: any = {
          "89504E47": "image/png",
          "47494638": "image/gif",
          "25504446": "application/pdf",
          FFD8FFE0: "image/jpeg",
          FFD8FFE1: "image/jpeg",
          FFD8FFE2: "image/jpeg",
          FFD8FFE3: "image/jpeg",
          FFD8FFE8: "image/jpeg",
        };

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
        for (const key in signatures) {
          if (Object.prototype.hasOwnProperty.call(signatures, key)) {
            if (signatures[key] === "image/jpeg") {
              mime = "image/jpeg";
            }
          }
        }

        console.log(signature.toUpperCase());
        const blob = new Blob([blobArr], {
          type: mime,
        });

        const url = URL.createObjectURL(blob);

        window.open(url);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Картинка");
        /* document.body.appendChild(link); */

        /* URL.revokeObjectURL(url); */

        link.click();
      });
  }
}
