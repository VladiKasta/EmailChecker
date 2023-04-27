import React, { FC } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const MessagePage: FC = (props: Props) => {
  const { id } = useParams();
  return <div>{`${id}`}</div>;
};

export default MessagePage;
