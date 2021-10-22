import { Link } from "react-router-dom";

import { Button } from "../../components/Button";
import { SideAuth } from "../../components/SideAuth";

import { logoImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

export function NewRoom() {
  return (
    <div className={styles.pageAuth}>
      <SideAuth />
      <main>
        <div className={styles.mainContent}>
          <img src={logoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
