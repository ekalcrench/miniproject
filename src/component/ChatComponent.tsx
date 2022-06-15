import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import chat from "../css/Chat.module.css";
import ChatModal from "./ChatModal";

export default function ChatComponent() {
  const [popup, setPopup] = useState<boolean>(false);

  useEffect(() => {
    console.log("popup : ", popup);
  }, [popup]);

  return (
    <div className={chat.body}>
      <div className={chat.card}>
        <button className={chat.button} onClick={() => setPopup(true)}>
          <div className={chat.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className={chat.chat}>CHAT</div>
        </button>
        {popup && <ChatModal setPopup={setPopup}/>}
      </div>
    </div>
  );
}
