import axios from "axios";

export async function checkUrl() {
  const apiKey = "AIzaSyAq7q1NTgEo--MxsdmYsunHnWj8ksW7Tss";
  /* const url = "http://www.urltocheck2.org/"; */

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
              url: "https://vsetam.net/8230-mazhor_3_smotret_onlajn_besplatno.html",
            },
          ],
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
