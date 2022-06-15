import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chat from "../css/Chat.module.css";

type PropsType ={
   setPopup : any;
}

export default function ChatModal(props: PropsType) {
  return (
    <div className={chat.dropdownContent}>
      <div className={chat.modalHeader}>
        <div className={chat.leftChat}>
          <div className={chat.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className={chat.chat}>CHAT</div>
        </div>
        <div className={chat.rightChat}>Drama Roastery</div>
        <button
          className={chat.buttonClose}
          onClick={() => props.setPopup(false)}
        >
          X
        </button>
      </div>
      <div className={chat.modalContent}>
        <div className={chat.leftChat}>
          <div>Close</div>
          <div>TEST</div>
          <div>TEST</div>
          <div>TEST</div>
        </div>
        <div className={chat.rightChat}>
         <p>Aku adalah seorang kapiten yang mempunyai pedang panjang, kalau berjalan prok prok prok aku seorang kapiten</p>
        </div>
      </div>
    </div>
  );
}
