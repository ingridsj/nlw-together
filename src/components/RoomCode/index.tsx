import { copyImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  );
}
