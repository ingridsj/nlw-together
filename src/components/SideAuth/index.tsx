import { illustrationImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

export function SideAuth() {
  return (
    <aside className={styles.aside}>
      <img
        src={illustrationImg}
        alt="Ilustração simbolizando perguntas e respostas"
      />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </aside>
  );
}
