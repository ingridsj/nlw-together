import { useParams } from "react-router";

import { RoomCode } from "../RoomCode";

import { logoImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

type RoomParams = {
  id: string;
};

export function Header() {
  const params = useParams<RoomParams>();

  return (
    <header>
      <div className={styles.content}>
        <img src={logoImg} alt="Letmeask" />

        <RoomCode code={params.id} />
      </div>
    </header>
  );
}
