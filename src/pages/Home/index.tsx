import { Button } from "../../components/Button";
import { SideAuth } from "../../components/SideAuth";

import { logoImg, googleIconImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

export function Home() {
  return (
    <div className={styles.pageAuth}>
      <SideAuth />
      <main>
        <div className={styles.mainContent}>
          <img src={logoImg} alt="Letmeask" />
          <button className={styles.createRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className={styles.separator}>ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
