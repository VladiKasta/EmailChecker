export function checkMsgOnLinks(textMsg: string): RegExpMatchArray | null {
  if (textMsg) {
    const regex = /(https?:\/\/[^\s]+)/g;
    const links: RegExpMatchArray | null = textMsg.match(regex);
    return links;
  } else {
    const links = null;
    return links;
  }
}
