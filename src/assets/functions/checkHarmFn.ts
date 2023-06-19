import axios from "axios";

export function checkUrl(links: RegExpMatchArray | null | undefined): string[] {
  let malwareArr: string[] = [
  ];

  const url = "http://www.urltocheck2.org/";
  const apiKey = "AIzaSyAq7q1NTgEo--MxsdmYsunHnWj8ksW7Tss";
  /*  let ob = links?.reduce(function (acc: any, link: any, index: any) {
    acc[link] = index;
    return acc;
  }, {}); */
  try {
    if (links != null && links != undefined) {
      for (let index = 0; index < links.length; index++) {
        axios
          .post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
            {
              client: {
                clientId:
                  "940265733927-02dd7samee814s895af2sg5rmngf8rc5.apps.googleusercontent.com",
                clientVersion: "1.5.2",
              },
              threatInfo: {
                threatTypes: [
                  "MALWARE",
                  "SOCIAL_ENGINEERING",
                  "POTENTIALLY_HARMFUL_APPLICATION",
                  "UNWANTED_SOFTWARE",
                ],
                platformTypes: ["WINDOWS"],
                threatEntryTypes: ["URL"],
                threatEntries: [
                  {
                    url: links[index],
                  },
                ],
              },
            }
          )
          .then((response) => {
            if (Object.keys(response.data).length === 0) {
              console.log("safe");
            } else {
              malwareArr.push(links[index]);
            }
          })
          .catch(() => {
            console.log("Что то пошло не так...");
          });
      }
      return malwareArr;
    }
    return malwareArr;
  } catch (error) {
    throw error;
  }
}
