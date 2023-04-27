export function checkMsgOnLinks(textMsg: string): RegExpMatchArray | null {
  const regex = /(https?:\/\/[^\s]+)/g;
  const links: RegExpMatchArray | null = textMsg.match(regex);
  return links;
}
