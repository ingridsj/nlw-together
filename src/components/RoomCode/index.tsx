import { copyImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

type RoomCodeProps = {
  roomId: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.roomId);
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>

      <span>Sala #{props.roomId}</span>
    </button>
  );
}
