import { RoomCode } from "../RoomCode";

import { logoImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

type HeaderProps = {
  roomId: string;
};

export function Header(props: HeaderProps) {
  return (
    <header>
      <div className={styles.content}>
        <img src={logoImg} alt="Letmeask" />

        <RoomCode {...props} />
      </div>
    </header>
  );
}
