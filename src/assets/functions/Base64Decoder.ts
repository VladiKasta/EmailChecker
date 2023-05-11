export function base64Decoder(stringToDecode: string): string {
  const base64String = stringToDecode;
  if (base64String) {
    const decodedString = atob(
      base64String.replace(/-/g, "+").replace(/_/g, "/")
    );

    // Convert to UTF-8 encoded string
    const utf8String = new TextDecoder().decode(
      new Uint8Array([...decodedString].map((char) => char.charCodeAt(0)))
    );
    return utf8String;
  } else {
    return "";
  }
}
