import React from "react";
import styles from "./Message.module.css";

const Message = ({ message, type }) => {
  return (
    <div className={`${styles.messageContainer} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Message;
